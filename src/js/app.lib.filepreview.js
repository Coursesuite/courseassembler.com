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

		_documentPreviewHandler = function(a, pluginAction) {
			// var id = a.parentNode.getAttribute("data-fileid");
			$("#image-properties").empty();
			var id = a.getAttribute("data-fileid");
			$("body").append($("<div id='blocking'>"));
			$("#blocking").addClass("active");
			localforage.getItem(id, function (err, value) {
// console.dir(value);
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
				var data = value,
					parsedHtml = "",
					wasPdf = false,
					useFrameDoc = true;
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
							useFrameDoc = false;
							var has_payload = (Object.keys(data.payload).length>0);
							if (data.plugin === 'Section') pluginAction = 'edit'; // only possible action; TODO: figure out plugins that can only edit, not view
							if (pluginAction === 'edit') has_payload = false; // even if it actually has one
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
						}
						break;

					case "iframe":
						useFrameDoc = false;
						frame.setAttribute("src", data.payload.src);
						break;

					default:
						parsedHtml = Handlebars.templates["preview-html"](data.payload);
						if (data.format === "slideshare") {
							useFrameDoc = false;
							var frameDoc = frame.contentDocument || frame.contentWindow.document;
							frameDoc.open();
							frameDoc.write(parsedHtml);
							frameDoc.close();
						}
				}
				if (useFrameDoc) {
					var blob = new Blob([parsedHtml],{type:"text/html"});
					var burl = URL.createObjectURL(blob);
					frame.setAttribute("src",burl);
					setTimeout(URL.revokeObjectURL,100,burl);
				}
				// the converter might have pre-converted to pdf
				wasPdf = (-1!==parsedHtml.indexOf("<!-- Created by pdf2htmlEX (https://github.com/coolwanglu/pdf2htmlex) -->"));
				if (data.type && (data.type.indexOf("application/pdf")!=-1||data.type.indexOf("application/x-pdf")!=-1||data.type.indexOf("x-iwork")!=-1)||wasPdf) data.format="pdf";

				// depreciated in favor of supports property, implemented per-plugin
				// data["supportsEdit"] = (data.kind === "file" && data.format && data.format !=="pdf"); // only FILE types are editable, but not if it was a PDF to begin with, since this format is normally uneditable
				// data["supportsZoom"] = false; // (data.format=="pdf")&&(window.navigator.userAgent.toLowerCase().indexOf("firefox")==-1); // todo: work out why, check others

				// sections are menu-only and don't support attachments
				data["supportsAttachments"] = (!(data.hasOwnProperty("plugin") && data.plugin === "Section"));

				fields.innerHTML = Handlebars.templates["preview-toolbar"](data);
				data = null; // early GC
				$("#blocking").removeClass("active").remove();
				// triggerResize();
			});
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
			$("#fields,#preview").html("");
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
			[].forEach.call(DocNinja.navItems.querySelectorAll("li.selected"),function(el){el.classList.remove("selected")});
			li.classList.add("selected");
			scrollIfNeeded(li, document.querySelector(".gm-scroll-view"));
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

		return {
			Editing: {
				Enable: _setContentEditable,
				Disable: _unsetContentEditable,
				ShowBgColour: _previewBackgroundColour
			},
			Reset: _reset,
			Save: _saveContents,
			Preview: _documentPreviewHandler,
			Observe: _observer,
			Select: _select,
			CurrentFile: _getFileId
		}

	})();

})(window.DocNinja = window.DocNinja || {});