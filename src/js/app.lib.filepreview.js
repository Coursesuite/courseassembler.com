(function (DocNinja, undefined) {

	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							PREVIEW
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */
	DocNinja.filePreview = (function() {

		_previewBackgroundColour = function (colour) {
			var frm = _getDocument(),
				el = frm.documentElement.querySelector("body");
			if (el) {
				el.style.backgroundColor = colour;
				if (el.querySelector("#page-container")) {
					el.querySelector("#page-container").style.backgroundColor = "transparent";
				}
			}
		}

		_reloadCurrentPage = function () {
			var a = document.createElement('a');
			a.dataset.fileid = _getFileId();
			_documentPreviewHandler(a,"view");
		}

		_documentPreviewHandler = function(a, pluginAction) {
			// var id = a.parentNode.getAttribute("data-fileid");
			$("#image-properties").empty();

			// garbage collect any objectUrls that will no longer be valid
			$("[src^='blob:']").each(function(index,value) {
				URL.revokeObjectURL(value.src);
			});

			var id = a.getAttribute("data-fileid");
			$("body").append($("<div id='blocking'>"));
			$("#blocking").addClass("active");
			localforage.getItem(id, function (err, value) {

				if (!value) { // item contains no data; must be removed.
					$("li[data-fileid='" + id + "']").remove();
					$("#blocking").remove();
					setItemOrder();
					return;
				}
				_releaseIframe();
				var frame = document.createElement("iframe"),
					checkSource = false;

				frame.setAttribute("seamless", true);
				frame.setAttribute("id", "preview-frame");
				frame.setAttribute("data-fileid", id);
				frame.setAttribute("name", id);
				frame.style.flex = 1;
				preview.appendChild(frame);

				var frameDoc = frame.contentDocument || frame.contentWindow.document;
				var data = value,
					parsedHtml = "",
					wasPdf = false,
					blobRender = true,
					useFrameDoc = false;

				data["id"] = id;

				// iterate plugins to find its supportable actions
				delete data.supports;
				for (var group in DocNinja.options.actions)
					if (typeof DocNinja.options.actions[group] === 'object')
						DocNinja.options.actions[group].forEach(function (v) {
							if (v.hasOwnProperty("plugin") && v.plugin === data.plugin)
								data["supports"] = v.supports;
						})

				if (data.payload.backgroundColour) { // need to normalise background colour format
					data.payload.backgroundColour = data.payload.backgroundColour.replace("#","");
				}
				data.score = ~~data.score || 1; // number of seconds you have to view the page before it is considered complete

				switch (data.kind) {
					case "image":
						parsedHtml = Handlebars.templates["preview-image"](data.payload);
						break;

					case "plugin": // may implement their own previewer
						if (data.hasOwnProperty("supports")) {
							blobRender = false;
							var has_payload = (Object.keys(data.payload).length>0);

							// Section only possible action; TODO: figure out plugins that can only edit, not view
							if (data.plugin === 'Section') {
								has_payload = true;
								pluginAction = 'view';
							};
							if (pluginAction === 'edit') has_payload = false; // even if it actually has one, as edit will load it

							if (data.supports.indexOf("view") !== -1 && has_payload) {
								frame.setAttribute("src","plugins/" + data.plugin + "/view.html?" + id);
							} else if (data.supports.indexOf("edit") !== -1 && !has_payload) {
								frame.setAttribute("src","plugins/" + data.plugin + "/edit.html?" + id);
							} else {
								var blob = new Blob(["<!doctype html><html><body>Error initialising " + data.plugin + ".</body></html>"],{type:"text/html"});
								var burl = URL.createObjectURL(blob);
								frame.setAttribute("src",burl);
								setTimeout(URL.revokeObjectURL,100,burl);
							}
						} else {
							// uh, plugin had no 'supports' function; what do we do? Hopefully there's a default processor
							frame.setAttribute("src", "plugins/" + data.plugin + "/?" + id);
						}
						break;

					case "iframe":
						blobRender = false;
						useFrameDoc = false;
						frame.setAttribute("src", data.payload.src);
						break;

					default:
						switch (data.format) {
							case "video":
								var vBlob = new Blob([data.payload.src], {type: data.payload.mime});
								var vUrl = URL.createObjectURL(vBlob);
								parsedHtml = Handlebars.templates['wrapper-video']({
									title: data.name,
									format: 'video',
									src: vUrl,
									mime: data.payload.mime
								});
								break;

							case "slideshare":
								blobRender = false;
								useFrameDoc = true;
//								break; // break here is erronous; we WANT to fall throught to default as well

							default:
								parsedHtml = Handlebars.templates["preview-html"](data.payload);
								break;
						}
				}
				if (blobRender) {
					var blob = new Blob([parsedHtml],{type:"text/html"});
					var burl = URL.createObjectURL(blob);
					frame.setAttribute("src",burl);
					setTimeout(URL.revokeObjectURL,100,burl);
				} else if (useFrameDoc) {
					frameDoc.open();
					frameDoc.write(parsedHtml);
					frameDoc.close();
				}

				// remove previous timeline objects
				reset_timeline();

				// the converter might have pre-converted to pdf
				wasPdf = (-1!==parsedHtml.indexOf("<!-- Created by pdf2htmlEX (https://github.com/coolwanglu/pdf2htmlex) -->"));
				if (data.type && (data.type.indexOf("application/pdf")!=-1||data.type.indexOf("application/x-pdf")!=-1||data.type.indexOf("x-iwork")!=-1)||wasPdf) data.format="pdf";

				// depreciated in favor of supports property, implemented per-plugin
				// data["supportsEdit"] = (data.kind === "file" && data.format && data.format !=="pdf"); // only FILE types are editable, but not if it was a PDF to begin with, since this format is normally uneditable
				// data["supportsZoom"] = false; // (data.format=="pdf")&&(window.navigator.userAgent.toLowerCase().indexOf("firefox")==-1); // todo: work out why, check others

				// sections are menu-only and don't support attachments
				data["supportsAttachments"] = (!(data.hasOwnProperty("plugin") && data.plugin === "Section"));

				// some page types support transforms (e.g. scaling)
				data['supportsTransform'] = data.hasOwnProperty('payload') && data.payload.hasOwnProperty('split') && data.payload.split;

				DocNinja.options.fields.innerHTML = Handlebars.templates["preview-toolbar"](data);
				data['supportsAudio'] = _supports_timeline(data);
				DocNinja.options.timeline.innerHTML = Handlebars.templates["preview-timeline"](data);
				if (data.supportsAudio) {
					initialise_timeline(data);
					setCSSVariable("--timelineHeight", DocNinja.options.timelineHeight +'px');
				} else {
					setCSSVariable("--timelineHeight", DocNinja.options.timelineMinHeight +'px');
				}

				data = null; // early GC
				$("#blocking").removeClass("active").remove();
				// triggerResize();
			});
		}

		/* Handlebars Logic: 
		if format in "youtube,vimeo,soundcloud,oembed,package,video"}}
			no
		else if kind in "plugin"
			if audio in supports -> yes
		else
			yes
		*/
		_supports_timeline = function (data) {
			if (!data) return false;

			// does the plugin say we support audio?
			if (data.hasOwnProperty("supports") && data.supports.indexOf("audio") !== -1) return true;

			// some formats intrinsically exclude audio
			if (data.hasOwnProperty("format") && "youtube,vimeo,soundcloud,oembed,package,video".indexOf(data.format) !== -1) return false;

			// does the plugin say we DON'T support audio (by excluding it explicitly)
			if (data.hasOwnProperty("supports") && data.supports.indexOf("audio") === -1) return false;

			// assume YES
			return true;
		}

		_saveContents = function (command) {
			// DocNinja.filePreview.resetZoom(); // important
			_unsetContentEditable();
			var frame = document.getElementById("preview-frame"),
			//	frameDoc = frame.contentDocument || frame.contentWindow.document,
				rawHTML = _getContents();

			if (frame !== null) {
				var id = frame.getAttribute("data-fileid");
				localforage.getItem(id, function preview_savecontent_save(err, value) {
					// var data = JSON.parse(value);
					var data = value;
					if (command) if (command == "noborder") {
						rawHTML = ""; // huh?
						data.payload.flat = true;
					}
					data.payload.html = rawHTML;
					// localforage.setItem(id, JSON.stringify(data));
					localforage.setItem(id, data);
				});
			}
		}
		// because our iframes are large in memory, try to force immediate GC by modifying content
		_releaseIframe = function() {
			var frame = document.getElementById("preview-frame");
			if (frame !== null) {
				try {
					// may encounter a cross-origin exception here, but try anyway
					var frameDoc = frame.contentDocument || frame.contentWindow.document;
					frameDoc.location.reload(); // effectively about:blank, force GC
				} catch (ex) {
					// catch is empty, but *must* exist; can't try{}finally{}
				} finally {
					frame.remove();
				}
			}
		}
		_getDocument = function () {
			var frame = document.getElementById("preview-frame");
			if (frame !== null) {
				return frame.contentDocument || frame.contentWindow.document;
			}
			return null;
		}
		_getContents = function () {
			_unsetContentEditable();
			var frame = document.getElementById("preview-frame");
			if (frame !== null) {
				var frameDoc = frame.contentDocument || frame.contentWindow.document;
				if (frameDoc.documentElement) {
					// <!-- Created by pdf2htmlEX (https://github.com/coolwanglu/pdf2htmlex) -->
					return "<!DOCTYPE html>" + frameDoc.documentElement.outerHTML;
				}
				var serializer = new XMLSerializer();
				return serializer.serializeToString(frameDoc); // full outer html, including doctype
			}
			return "";
		}

		_reset = function () {
			_releaseIframe();
			$("#fields,#preview,#timeline").html("");
			checkDummyItem();
		}
		_setContentEditable = function () {
			var frame = document.getElementById("preview-frame");
			if (frame !== null) {
				var frameDoc = frame.contentDocument || frame.contentWindow.document;
				if (frameDoc.documentElement) {
					var body = frameDoc.querySelector("body");
					if (null !== body) {
						document.getElementById("content-editable").className = "active";
						body.setAttribute("contenteditable","true");
					}
				}
			}
		}
		_unsetContentEditable = function () {
			var frame = document.getElementById("preview-frame");
			if (frame !== null) {
				var frameDoc = frame.contentDocument || frame.contentWindow.document;
				if (frameDoc.documentElement) {
					var body = frameDoc.querySelector("body");
					if (null !== body) {
						document.getElementById("content-editable").className = "inactive";
						body.removeAttribute("contenteditable");
					}
				}
			}
		}

		_observer = function (plugin,element,eventName,destination) {
			var dest = document.querySelector("#preview-frame");
			new MutationObserver(function(mutations) {
			  mutations.some(function filepreview_mutation_observer(mutation) {
			    if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
			    	// was plugin/view.html, went to blob:url
			    	if (mutation.oldValue.indexOf(plugin)!==-1 && mutation.target.src.indexOf("blob")!==-1) {
			    		var frameDoc = frame.contentDocument || frame.contentWindow.document;
			    		console.log("observer",frameDoc.documentElement, plugin,element,eventName,destination);
			    	}
					return true;
			    }
			    return false;
			  });
			}).observe(dest, {
			  attributes: true,
			  attributeFilter: ['src'],
			  attributeOldValue: true,
			  characterData: false,
			  characterDataOldValue: false,
			  childList: false,
			  subtree: true
			});
		}

		_select = function (NodeOrString, action) {
			var li = (typeof NodeOrString === "string")
					?
					DocNinja.navItems.querySelector("li[data-fileid='" + NodeOrString + "']")
					:
					NodeOrString;
			for (el of DocNinja.navItems.querySelectorAll("li.selected")) el.classList.remove("selected");
			li.classList.add("selected");
			li.scrollIntoView({block: "nearest", behavior: "smooth"});
			_documentPreviewHandler(li, action);
		}

		_getFileId = function () {
			var frame = document.getElementById("preview-frame");
			if (frame) {
				if (frame.dataset.fileid) return frame.dataset.fileid;
				if (frame.name) return frame.name;
			}
			return null;
		}

		// we want two splitters which work by modifying CSS variables:
		// 1. the splitter between the fields and the preview
		// 2. the splitter between the preview and the timeline
		_initPaneSplitters = function() {
			let axis = 'clientX'; // current direction after drag begins
			const global = typeof window !== 'undefined' ? window : null;
			const listen = 'addEventListener';
			const ignore = 'removeEventListener';
			const styleHax = ['userSelect', 'MozUserSelect', 'WebkitUserSelect', 'msUserSelect','pointerEvents'];

			// begin drag: define an bind move-related events to end/drag handlers
			function beginDrag() {
				const self = this; // so event binder function signatures can match
				self.stop = endDrag.bind(self);
				self.move = drag.bind(self);
				global[listen]('mouseup', self.stop);
				global[listen]('touchend', self.stop);
				global[listen]('mousemove', self.move);
				global[listen]('touchmove', self.move);
				styleHax.map((v) => {
					DocNinja.options.preview.style[v] = 'none';
					DocNinja.options.scrollArea.style[v] = 'none';
				});
				axis = self.id === 'split-h' ? 'clientX' : 'clientY';
				self.dragging = true;
				self.minSize = parseInt(document.getElementById(self.id).dataset.min);
				// this.value = parseInt(getCSSVariable(this.id === 'split-h' ? '--navPaneWidth' : '--timelineHeight'),10);
			}
			// end drag: remove move-related global events
			function endDrag() {
				const self = this;
				global[ignore]('mouseup', self.stop);
				global[ignore]('touchend', self.stop);
				global[ignore]('mousemove', self.move);
				global[ignore]('touchmove', self.move);
				styleHax.map((v) => {
					DocNinja.options.preview.style[v] = '';
					DocNinja.options.scrollArea.style[v] = '';
				});
				self.dragging = false;
				document.dispatchEvent(new CustomEvent("SplitEnd", {bubbles: true, cancelable: true, detail: self.id}));
			}
			function getMousePosition(e) {
				if ('touches' in e) return e.touches[0][axis];
				return e[axis];
			}
			function drag(e) {
				if (!this.dragging) return;
				window.requestAnimationFrame(() => {
					let position = getMousePosition(e); // - this.value;
					if (axis === 'clientY') {
						// timeline height is going to be modified from the position
						if (position <= 165 + this.minSize) position = 165 + this.minSize; // page-fixed-top + toolbar
						if (position >= document.body.clientHeight - 18 - this.minSize) position = document.body.clientHeight - 18 - this.minSize;
						position = document.body.clientHeight - 18 - position;
						setCSSVariable('--timelineHeight', position + 'px');
					} else {
						if (position <= this.minSize) position = this.minSize;
						if (position >= document.body.clientWidth - this.minSize) position = document.body.clientWidth - this.minSize;
						setCSSVariable('--navPaneWidth', position + 'px');
					}
				});
			}
			['split-h', 'split-v'].forEach(id => {
				let inst = {
					dragging: false,
					id: id
				}
				// bind START events to the splitter objects
				const node = document.getElementById(id);
				node[listen]('mousedown', beginDrag.bind(inst));
				node[listen]('touchstart', beginDrag.bind(inst));
			});
		}

		return {
			Editing: {
				Enable: _setContentEditable,
				Disable: _unsetContentEditable,
				ShowBgColour: _previewBackgroundColour
			},
			Reset: _reset,
			Save: _saveContents,
			Preview: _documentPreviewHandler,
			Refresh: _reloadCurrentPage,
			Observe: _observer,
			Select: _select,
			CurrentFile: _getFileId,
			CreateSplitPane: _initPaneSplitters
		}

	})();

})(window.DocNinja = window.DocNinja || {});