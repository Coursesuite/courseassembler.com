(function (DocNinja, undefined) {

	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							HTML ROUTINES
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */
	DocNinja.PurityControl = (function (document, undefined) {

		var _fileid = function (q) {
			var idx = +q || 0;
			var possible = "file-" + (new Date().getTime()).toString(36) + "-" + idx;
			var found = DocNinja.navItems.querySelector("li[data-fileid='" + possible + "']");
			while (found !== null) {
				idx++;
				possible = "file-" + (new Date().getTime()).toString(36) + "-" + idx;
				found = DocNinja.navItems.querySelector("li[data-fileid='" + possible + "']");
				if (idx > 100) return null;
			}
			return possible;
		}

		var indent = function (li) {
			if (!li.previousSibling) return;
			var depth = +li.getAttribute("data-depth") || 0;
			_set_depth(li, depth+1);
			var toggle = li.querySelector(".toggle-button-wrapper");
			classie.removeClass(toggle, "current-state-increase");
			classie.addClass(toggle, "current-state-decrease");
			toggle.querySelector("a.toggle-switch").setAttribute("title", "Outdent (make into a parent item)");
			toggle.querySelector("a.toggle-switch").setAttribute("data-action","item-decrease");
			setItemOrder();
		}
		var outdent = function (li) {
			var depth = +li.getAttribute("data-depth") || 0;
			_set_depth(li, depth-1);
			var toggle = li.querySelector(".toggle-button-wrapper");
			classie.removeClass(toggle, "current-state-decrease");
			classie.addClass(toggle, "current-state-increase");
			toggle.querySelector("a.toggle-switch").setAttribute("title", "Indent (make into a child item)");
			toggle.querySelector("a.toggle-switch").setAttribute("data-action","item-increase");
			setItemOrder();
		}

		// li.innerHTML = _nav_url(act, fileinfo.name, fileid, "import");
		var _nav_url = function (action, title, id, state, format, kind, hasAudio) {
			return Handlebars.templates["nav-item"]({"action": action, "title": title, "id": id, "state": state, "format": format, "kind": kind, "audio": hasAudio});
			// return '<span class="drag-handle"><i class="ninja-sort"></i></span><a href="javascript:;" data-action="item-' + action + '"><i class="ninja-' + action + '"></i></a><a href="javascript:;" data-action="preview">' + title + '</a>';
		}
		var _set_depth = function (li,depth) {
			var fileid = li.getAttribute("data-fileid");
			li.setAttribute("data-depth", depth);
			li.setAttribute("data-converted","true");
			li.setAttribute("data-state","ready");
			if (depth<1) {
				var toggle = li.querySelector(".toggle-button-wrapper");
				classie.removeClass(toggle, "current-state-decrease");
				classie.addClass(toggle, "current-state-increase");
				toggle.querySelector("a[data-action='item-decrease']").setAttribute("data-action","item-increase");
			}
			localforage.getItem(fileid, function purity_control_setdepth_get(err, value) {
				// var data = JSON.parse(value);
				var data = value;
				data.depth = depth;
				//localforage.setItem(fileid, JSON.stringify(data));
				localforage.setItem(fileid, data);
			});
		}
		var checkstructure = function () {

			checkDummyItem();
			checkCounters();

			/* our LI can look like:

			 <li draggable="false" data-depth="1" class="selected" data-converted="false" data-fileid="file-ijdeyhvn">
				<span class="drag-handle"><i class="ninja-reorder"></i></span>
				<a draggable="false" href="javascript:;" data-action="item-decrease"><i class="ninja-decrease"></i></a>
				<a draggable="false" href="javascript:;" data-action="preview">student_guide</a>
			 </li>

			 <li data-converted="false" data-fileid="file-ijdmqom1"><div class="file-conversion">
			     <p><a href="javascript:CancelConversion('file-ijdmqom1');" class="cancel">Cancel</a>Converting to html.</p>
			     </div>
			 </li>

			<li data-fileid="file-irr7003k-0" data-depth="0" data-converted="false" class="">
				<div class="nav-item display-flex flex-left-right">
				<span class="drag-handle" title="Drag up or down to re-order item"><i class="ninja-reorder"></i></span>
				<span class="indent"><span class="toggle-button-wrapper current-state-increase"><a class="toggle-switch" data-action="item-increase" href="javascript:;"><span></span></a></span></span>
				<span class="label flex-1"><a href="javascript:" data-action="preview">TW Student Manual V3 0_MG rework</a></span>
				<span class="status"><span></span></span>
			</div></li>
			*/

			// each li in container
			var curr = 0;
			[].forEach.call(DocNinja.navItems.querySelectorAll("li"), function (elm, idx) {
				if (elm.getAttribute("data-converted") === "false") return;  // continue; // don't mess with current conversions
				if (elm.getAttribute("data-converted") === "true" && !elm.hasAttribute("data-state")) elm.setAttribute("data-state","ready");
				var depth = +elm.getAttribute("data-depth") || 0;
				if (depth < 0 || (idx==0 && depth>0)) _set_depth(elm, 0);
				if (idx>0) {
					if (depth > curr+2) _set_depth(elm,curr+1);
				}
				curr = depth;
				var a = elm.querySelector("span.label>a");
				if (a && a.textContent.trim() === "") a.textContent = "(untitled)";
				/* seems unneccesary
				if (!elm.querySelector("a[data-action]")) { // upgrade link if previously cached
					if (elm.querySelector("a")) {
						var title = elm.querySelector("a").innerHTML ;
						elm.innerHTML = _nav_url("increase",title);
					}
				} */
			});
		}
		// Nav.Add
		var origin = function (container, fileid, fileinfo, node, state) {

			var li = document.createElement("li");
			li.setAttribute("data-fileid", fileid);
			li.setAttribute("data-depth", fileinfo.depth);
			li.setAttribute("data-state", state);
			// if (attrs) for (key in attrs) if attrs.hasOwnProperty(key) li.setAttribute(key, attrs[key]);

			var act = (fileinfo.depth > 0 ? 'decrease' : 'increase');
			// console.log(container, fileid, fileinfo, node);
			if (!state) state = "import";
			li.innerHTML = _nav_url(act, fileinfo.name, fileid, state, fileinfo.format, fileinfo.kind, fileinfo.payload && fileinfo.payload.hasOwnProperty("mp3"));
			if (!node) node = null; // undefined becomes null
			container.insertBefore(li,node); // null = insert at end, so same as appendChild
			return li;
		};

		var _update = function (node, fileinfo, state) {
			if (!node) return false;
			var act = (fileinfo.depth && fileinfo.depth > 0 ? 'decrease' : 'increase');
			node.innerHTML = _nav_url(act, fileinfo.name, node.getAttribute("data-fileid"), state, fileinfo.format, fileinfo.kind, fileinfo.payload && fileinfo.payload.hasOwnProperty("mp3"));
			node.setAttribute("data-state", state);
			return node;
		}

		// // ReImportNinjaFile - for reloading a single file in a published docninja packages
		// /* @returns: a promise that will resolve when it's processed all references within this file then saved it to localstorage */
		// var reImport = function (zipFolder, domDocument, fileId, fileInfo) {

		// 	return new Promise(function(reimportResolve, reimportReject) {

		// 		// img that is embedded using base64 style on a div (as opposed to an image tag) - we did this for a while, now we put the image into its own file, so over time this won't get used
		// 		if (fileInfo.kind === "image" && domDocument.querySelector("body > div")) {
		// 			var imgData = domDocument.querySelector("body > div").getAttribute("style");
		// 			imgData = "data:" + (imgData.split("url(data:")[1]);
		// 			imgData = imgData.split(") no-repeat center;")[0];
		// 			fileInfo.payload["image"] = imgData;
		// 			localforage.setItem(fileId, fileInfo, function() {
		// 				DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + fileId + "']"), fileInfo, "ready");
		// 				reimportResolve();
		// 			});
		// 		} else {

		// 			function replaceElements(elements, dom) { // each item in the selection criteria
		// 				return Promise.all(elements.map(selectElements.bind(this, dom)));
		// 			}

		// 			function selectElements(dom, element) { // each item in the dom document for this criteria
		// 				var  nodesArray = [].slice.call(dom.querySelectorAll(element.selector));
		// 				return Promise.all(nodesArray.map(processElement.bind(this, element, dom)));
		// 			}

		// 			function processElement(element, dom, instance) { // an instance of an item
		// 				return new Promise(function(resolve,reject) {
		// 					var filename = unescape(instance.getAttribute(element.attribute)); // the file name of the JS or CSS or IMAGE
		// 					zipFolder.file(filename).async(element.type).then(function(contents) { // the contents of the JS or CSS or IMAGE
		// 						switch(element.kind) {
		// 							case "script":
		// 								instance.removeAttribute(element.attribute); // no more src tag
		// 								instance.appendChild(document.createTextNode(contents));
		// 								break;
		// 							case "style":
		// 								var style = document.createElement("style");
		// 								style.appendChild(document.createTextNode(contents));
		// 								instance.parentNode.replaceChild(style,instance);
		// 								break;
		// 							case "image":
		// 								var extn = filename.substr(filename.lastIndexOf(".") + 1).toLowerCase();
		// 								instance.setAttribute("src", "data:image/" + extn + ";base64," + contents);
		// 								break;
		// 						}
		// 						resolve(dom);
		// 					}, function (e) {
		// 						// leave it alone I guess
		// 						console.log("reImport.processElement.zipFolder.async.Error",e);
		// 						resolve(dom); // still need to resolve at some point for promise.all to work
		// 					});
		// 				});
		// 			}

		// 			replaceElements([
		// 				{"selector":"script[src]:not([src*='//'])","attribute":"src","type":"string","kind":"script"},
		// 				{"selector":"link[href$='.css']:not([href*='//'])","attribute":"href","type":"string","kind":"style"},
		// 				{"selector":"img:not([src*='//'])","attribute":"src","type":"base64","kind":"image"}
		// 			], domDocument).then(function(results) {
		// 				if (fileInfo.kind === "image" && domDocument.querySelector("body > img.object-fit-contain")) { // todo: revise why we are storing the image payload this way
		// 					fileInfo.payload["image"] = domDocument.querySelector("body > img").getAttribute("src");
		// 				} else {
		// 					fileInfo.payload["html"] = "<!doctype html>" + domDocument.firstElementChild.outerHTML;
		// 				}
		// 				localforage.setItem(fileId, fileInfo, function () {
		// 					DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + fileId + "']"), fileInfo, "ready");
		// 					reimportResolve();
		// 				});
		// 			});
		// 		}
		// 	});


		// };



		// target all hyperlinks to external window
		// also mathiasbynens.github.io/rel-noopener
		var _mutation = function (doc) {
			var links = doc.documentElement.getElementsByTagName('a');
			for (var i=0; i < links.length; i++) {
				if (links[i].getAttribute('href')) {
					if (links[i].getAttribute('href').indexOf("javascript:")===-1 && !links[i].hasAttribute('target')) {
						links[i].setAttribute("target", "_blank");
						links[i].setAttribute("rel", "noopener");
					}
				}
			}
			return doc;
		}

		// ConvertHtmlForZip
		var erlenmeyer = function (key, filename, fold, obj, resource, destination) {

			if (!obj) return;
			if (!obj.payload) return;

// Variable 'obj' is null checked here, but its property is accessed without null check prior at line 660.
			var doc = document.implementation.createHTMLDocument(obj.payload.name);
			var _pageBgColour = (obj.payload.backgroundColour) ? obj.payload.backgroundColour.replace("#","") : '000000';
			doc.documentElement.innerHTML = obj.payload.html;

			doc = _mutation(doc);

			// ensure nothing is left contenteditable
			[].forEach.call(doc.querySelectorAll("[contenteditable]"), function (tag) {
				tag.removeAttribute("contenteditable");
			});

			// externalise all images
			[].forEach.call(doc.querySelectorAll("img[src*='data:image']"), function (img) {
				var src = img.getAttribute("src"),
					extn = src.substring(src.indexOf("/")+1, src.indexOf(";")).toLowerCase(),
					fn = md5(src) + "." + extn;
				// a "pdf" icon that pdf2htmlex seems to embed on every page - unneccesary and unsightly
				if (src === "data:image/png;base64,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") {
					img.parentNode.removeChild(img);
				} else {
					fold.file(fn, src.substring(src.indexOf("base64,")+7), {base64:true});
					img.setAttribute("src", fn);
					if (undefined !== resource) resource.files.push({href: resource.base + fn}); // imscp passes in resource object
				}
			});

			// externalise all embedded javascripts
			[].forEach.call(doc.querySelectorAll("script:not([src])"), function (js) {
				var src = js.innerHTML,
					fn = md5(src) + ".js";
				if (destination === "imscp" && fn === "cc66387f94dcecedce232560ee5716a9.js") return; // forEach's version of continue;
				if (fn === "52eccb38542a7dc50c8389764fcfcabd.js") return; // depricated version of resize script
				fold.file(fn, src);
				js.innerHTML = ""; // empty tag
				js.setAttribute("type","text/javascript");
				js.setAttribute("src", fn);
				if (undefined !== resource) resource.files.push({href: resource.base + fn}); // imscp passes in resource object
			});

			// externalise all embedded styles
			[].forEach.call(doc.querySelectorAll("style"), function (sty) {
				var src = sty.innerHTML,
					fn = md5(src) + ".css";
				fold.file(fn, src);
				var node = document.createElement("link");
				node.setAttribute("rel","stylesheet")
				node.setAttribute("type","text/css");
				node.setAttribute("href", fn);
				sty.parentNode.replaceChild(node,sty);
				if (undefined !== resource) resource.files.push({href: resource.base + fn}); // imscp passes in resource object
			});

			// re-inject frame resize script into PDF results (ensures latest version for re-published packages)
			// only scale+center if document is split; otherwise conversions that came from pdf always needs scale+margin transform
			var pagetype = obj.src&&obj.src.fetch&&obj.src.fetch.kind ? obj.src.fetch.kind : obj.type ? obj.type : "";
			var is_split = (obj.payload.split&&obj.payload.split===true) || false;
			var scr, sty;
			if (is_split &&((destination !== "imscp") && (pagetype.indexOf("powerpoint")!==-1||pagetype.indexOf("presentation")!==-1))) {
				scr = doc.querySelector("#transformScaleCenter"); if (scr) scr.parentNode.removeChild(scr); scr = null;
				sty = doc.querySelector("#styleTransformScaleCenter"); if (sty) sty.parentNode.removeChild(sty); sty = null;
				if (DocNinja.options.AUTOCENTER) {
console.log("split presentation, applying transform scale center");
					doc.querySelector("head").insertAdjacentHTML("beforeend", Handlebars.templates["style-transform-scale-center"]({backgroundColour:_pageBgColour}));
					doc.querySelector("body").insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-scale-center"]({}));
				}
			} else if ("pdf" === obj.format || null !== doc.querySelector(".pf")) {
				if (destination === "imscp") { // might still need to remove powerpoint scripts, then re-add the scaleStretch script - ugh!
					scr = doc.querySelector("#transformScaleCenter"); if (scr) scr.parentNode.removeChild(scr); scr = null;
					sty = doc.querySelector("#styleTransformScaleCenter"); if (sty) sty.parentNode.removeChild(sty); sty = null;
				}
				// search for old scripts (non-identified)
				[].forEach.call(doc.querySelectorAll("script"),function(el) {
					if (el.textContent && el.textContent.indexOf("scale(1,1) translateY(0px)")!==-1) {
// console.log("removing-style-stretch");
						el.parentNode.removeChild(el);
					}
				});
				if (is_split && !doc.querySelector("transformHorizontalScale")) { // split = scale horizontally only
console.log("split pdf, applying transform horizontal scale");
					// remove previous attempts
					["#transformScaleCenter","#styleTransformScaleCenter","#transformScaleStretch"].forEach(function(value) {
						var elm = doc.querySelector(value);
						if (elm) elm.parentNode.removeChild(elm);
					});
					doc.querySelector("body").insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-horizontal-scale"]({}));
					doc.querySelector("head").insertAdjacentHTML('beforeend', Handlebars.templates["style-transform-horizontal-scale"]({}));
				} else if (!doc.querySelector("#transformScaleStretch")) { // unsplit = scale both and set negative margins
console.log("non-split pdf, applying script transform scale");
					// remove previous attempts
					["#transformScaleCenter","#styleTransformScaleCenter","#transformScaleStretch"].forEach(function(value) {
						var elm = doc.querySelector(value);
						if (elm) elm.parentNode.removeChild(elm);
					});
					doc.querySelector("body").insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-scale"]({}));
				}
			}

			// Insert page audio mp3
			// if (obj.payload.mp3) {
			// 	doc.body.insertAdjacentHTML('beforeend', Handlebars.templates["page-audio-floating"]({audioSrc:obj.payload.mp3}));
			// }

			// export the modified html document
			fold.file(filename, "<!doctype html>" + doc.documentElement.outerHTML);
			if (undefined !== resource) resource.files.push({href: resource.base + filename}); // imscp passes in resource object
		};

		// insert page audio, if applicable
		// normally audio rendered by template, not embedded in page, but we need to zip the payload mp3
		var xfilesost = function (obj, fold, resource) {
			if (obj.payload.mp3) {
			// 	var doc = document.implementation.createHTMLDocument(obj.payload.name);
			// 	doc.documentElement.innerHTML = obj.payload.html;
			 	var src = obj.payload.mp3,
			 		fn = md5(obj.payload.mp3)+".mp3";
			 	fold.file(fn,src.substring(src.indexOf("base64,")+7), {base64:true});
			// 	doc.body.insertAdjacentHTML('beforeend', Handlebars.templates["page-audio-floating"]({audioSrc:fn}));
			// 	obj.payload.html = "<!doctype html>" + doc.documentElement.outerHTML;
			// 	doc = null;
			 	if (undefined !== resource) resource.files.push({href: resource.base + fn}); // imscp passes in resource object
			}
			return obj;
		}

		// Clean
		var talitha_cumi= function (fileInfo) {

			if (fileInfo.payload.html.indexOf("Created by pdf2htmlEX")!==-1) {

				// remove generator meta tag & other junk nodes
				var doc = document.implementation.createHTMLDocument(fileInfo.payload.name);
				doc.documentElement.innerHTML = fileInfo.payload.html;

				// remove junk nodes
				// TODO: figure out a way to remove #sidebar, .loading-indicator,
				[].forEach.call(doc.querySelectorAll("meta[name='generator']"), function (node) {
					node.parentNode.removeChild(node);
				});

				// (Google slides) Replace video image links with embeded video
				if (fileInfo.src.indexOf('docs.google.com/presentation') !== -1) {
					[].forEach.call(doc.querySelectorAll('a.l'), function(node) {
						if (node.href.indexOf('youtube') !== -1 || node.href.indexOf('docs.google.com/file') !== -1) {
							var embedLink = node.href.replace('watch?v=','embed/');
							var iframe = doc.createElement('iframe');
							var div = node.querySelector('div');
							iframe.src = embedLink;
							iframe.style = div.style.cssText;
							iframe.classList = div.classList;
							node.parentNode.appendChild(iframe);
							node.parentNode.removeChild(node);
						}
					});
				}
				// (PresentationML) Replace video images with embedded video

				var getVidInfo = function(xmlobj) {
					return new Promise(function(resolve, reject) {
						var pArray = [];
						var videoObjs = [];
						var regex = RegExp("(ppt\/slides\/([a-zA-Z0-9])*\.xml)","g");
						Object.keys(xmlobj.files).forEach(function(key, index) {
							if (regex.test(key)) {
								var slide = xmlobj.files[key].name.substring(xmlobj.files[key].name.lastIndexOf('/')+1).split('.')[0];
								pArray.push(new Promise(function(res, rej) {
									xmlobj.files[key].async('text').then(function(xmlText) {
										var xmlObj = tXml(xmlText);
										var vPicEls = tXml.filter(xmlObj, function(el) {
											if (el.tagName === 'p:pic') {
												var vid = {name:slide};
												var containsVid = false;
												el.children.forEach(function(child, index) {
													if (child.tagName === 'p:spPr') { // Geometry
														child.children.some(function(grandchild) {
															if (grandchild.tagName === 'a:xfrm') {
																grandchild.children.forEach(function(ggchild, index) {
																	if (ggchild.tagName === 'a:off') {
																		vid.width = emuToPix(ggchild.attributes.x);
																		vid.height = emuToPix(ggchild.attributes.y);
																	}
																	if (ggchild.tagName === 'a:ext') {
																		vid.x = emuToPix(ggchild.attributes.cx);
																		vid.y = emuToPix(ggchild.attributes.cy);
																	}
																});
																return true;
															}
														});
													}
													if (child.tagName === 'p:nvPicPr') { // video id
														child.children.some(function(grandchild) {
															if (grandchild.tagName === "p:nvPr") {
																if (grandchild.children) {
																	grandchild.children.some(function(ggchild) {
																		if (ggchild.tagName === "a:videoFile") {
																			vid.rId = ggchild.attributes["r:link"];
																			containsVid = true;
																			return true;
																		}
																	});
																}
																return true;
															}
														});
													}
												});
												if (containsVid) videoObjs.push(vid);
											}
										});
										res();
									});
								}));
							}
						});
						Promise.all(pArray).then(function() {
							resolve({xml:xmlobj, vidObj:videoObjs});
						});
					});
				}

				var getVidEmbed = function(xmlobj, videoObjs) {
					return new Promise(function(resolve, reject) {
						var pArray = [];
						var regex = RegExp("(ppt\/slides\/\_rels\/([a-zA-Z0-9])*\.xml.rels)","g");
						Object.keys(xmlobj.files).forEach(function(key) {
							if (regex.test(key)) {
								pArray.push(new Promise(function(res,rej) {
									xmlobj.files[key].async('text').then(function(xmlText) {
										var xmlObj = tXml(xmlText);
										videoObjs.forEach(function(vobj) {
											xmlObj[0].children[0].children.forEach(function(rel) {
												if (rel.attributes['Id'] === vobj.rId) {
													if (rel.attributes['Target'].startsWith('http')) {
														vobj.embed = rel.attributes['Target'];
													}
												}
											})
										});
										res();
									});
								}));
							}
						});
						Promise.all(pArray).then(function(){
							resolve(videoObjs);
						});
					});
				}


				if (fileinfo.type.indexOf('presentationml') !== -1) {
					var buffer = localforage.getItem(fileInfo.fileId + '-original').then(function(data) {
						JSZip.loadAsync(data)
						.then(function(obj) {
							// Extract video info and embed code
							getVidInfo(obj).then(function(obj) {
								return getVidEmbed(obj.xml, obj.vidObj);
							}).then(function(vobjs) {
								var imgEl = doc.querySelector("#page-container img.bi");
								for (var i = 0; i<vobjs.length;i++) {
									if (vobjs[i].embed) {
										var vidEl = doc.createElement('iframe');
										vidEl.height = vobjs[i].height;
										vidEl.width = vobjs[i].width;
										vidEl.src = vobjs[i].embed;
										vidEl.style.position = 'absolute';
										vidEl.style.top = vobjs[i].y;
										vidEl.style.left = vobjs[i].x;
										imgEl.insertAdjacentElement('beforebegin', vidEl); // literally the only thing that doesnt work
									}
								}
							})
						});
					});
				}

				// replace loading indicator image so it exists but is as tiny as possible - the 1px transparent gif
				doc.querySelector(".loading-indicator>img").setAttribute("src","data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
				fileInfo.payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;

				// mod the page background
				var _pageBgColour = (fileInfo.payload.backgroundColour) ? fileInfo.payload.backgroundColour.replace("#","") : null;
				fileInfo = DocNinja.Page.ModifyPageBackgroundColour(fileInfo, _pageBgColour);

				// node = doc.querySelector("head");
				// var ss = doc.createElement("style");
				// ss.setAttribute("media","screen");
				// ss.setAttribute("type","text/css");
				// ss.setAttribute("id","pdf-bgmod");
				// ss.appendChild(doc.createTextNode(Handlebars.templates["style-pdf-bgmod"]({split:false,backgroundColour:_pageBgColour})));
				// node.appendChild(ss);

			}

			return fileInfo;
		};

		// CleanSplitPDF
		var smokingman = function (doc, bgc) {

			if (typeof bgc === 'undefiend') bgc = null;

			// lose all scripts, sidebar, loading indicator
			var node; //  = doc.querySelectorAll("head > script");
			// [].forEach.call(node, function (n) {
			// 	n.parentNode.removeChild(n);
			// });
			// node = doc.getElementById("sidebar"); if (node) node.parentNode.removeChild(node);
			// node = doc.querySelector(".loading-indicator"); if (node) node.parentNode.removeChild(node);

			// target all links to new windows
			node = doc.querySelectorAll("a:not([target])");
			[].forEach.call(node, function (n) {
				n.setAttribute("target","_blank");
				n.setAttribute("rel","noopener");
			});

			// don't need scripts
			// [].forEach.call(doc.querySelectorAll("head > script"), function (node) {
			// 	node.parentNode.removeChild(node);
			// });

			// don't need whatever this thing is
			// [].forEach.call(doc.querySelectorAll("div.pi"), function (node) {
			// 	node.parentNode.removeChild(node);
			// });

			// don't need fancy styles (the fade-in nonsense)
			[].forEach.call(doc.querySelectorAll("style"), function (node) {
				if (node.textContent.indexOf("Fancy styles for pdf2htmlEX")!==-1) {
					node.parentNode.removeChild(node);
				}
			});

			// remove excess junk, sidebar and loading indicator and bg-mod - not used in split documents
			[].forEach.call(doc.querySelectorAll("meta[name='generator'], #sidebar, .loading-indicator, #pdf-bgmod, div.pi, head > script"), function (node) {
				node.parentNode.removeChild(node);
			});

			node = doc.querySelector("head");
			var ss = doc.createElement("style");
			ss.setAttribute("media","screen");
			ss.setAttribute("type","text/css");
			ss.setAttribute("id","pdf-bgmod");
			ss.appendChild(doc.createTextNode(Handlebars.templates["style-pdf-bgmod"]({split:true, backgroundColour: bgc})));
			node.appendChild(ss);

			// return modified doc object (I think it's byref anyway)
			return doc;
		};

		// InjectResizeScript
		// 20190605 - not used anymore in this way
		// var colonist = function (fileInfo) {

		// 	var doc = document.implementation.createHTMLDocument(fileInfo.payload.name);
		// 	doc.documentElement.innerHTML = fileInfo.payload.html;

		// 	// inject resize script, if we are a pdf
		// 	if ("pdf" === fileInfo.format || null !== doc.querySelector(".pf")) {
		// 		node = doc.querySelector("body");
		// 		node.insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-scale"]({}));
		// 	}

		// 	// return the modified document back to the payload
		// 	fileInfo.payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;

		// 	return fileInfo;

		// };

		// MayRequireJQuery
		var anasazi = function(fold, obj, resource) {
			if (obj.payload.html.indexOf('src="jquery.min.js') !== -1 || obj.payload.html.indexOf("src='jquery.min.js") !== -1) {
				fold.file("jquery.min.js", Handlebars.templates["script-jquery-min"]({}));
				if (undefined !== resource) resource.files.push({href: resource.base + "jquery.min.js"});
			}
		};

		var _txt2html = function (obj) {
			return Handlebars.templates["wrapper-html5"]({title:obj.title,body: "<pre>" + obj.html + "</pre>"})
		}

		// InjectAnalyticsCode
		var spook = function (obj, setup, kind) {
			if (setup['option-ga-id']) {
				var doc = document.implementation.createHTMLDocument(obj.payload.name);
				doc.documentElement.innerHTML = obj.payload.html;
				node = doc.querySelector("head");
				node.insertAdjacentHTML('beforeend', Handlebars.templates[kind](setup));
				obj.payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
			}
			return obj;
		}

		var pathname = function (url) {
			var a = document.createElement("a");
			a.href = url;
			return a.pathname;
		}

		return {
			MayRequireJQuery: anasazi,
			ConvertHtmlForZip: erlenmeyer,
			Clean: talitha_cumi,
			// ConvertZipForHtml: syndicate,
			// ReImportNinjaFile: reImport,
			// 20190605 InjectResizeScript: colonist,
			CleanSplitPDF: smokingman,
			Conversion: {
				TextToHtml: _txt2html
			},
			Nav: {
				Indent: indent,
				Outdent: outdent,
				Add: origin,
				Update: _update,
				Check: checkstructure,
				GetFileId: _fileid
			},
			Utils: {
				UrlPath: pathname
			},
			UpdateHyperlinks: _mutation,
			InjectAnalyticsCode: spook,
			InjectPageAudio: xfilesost
		}
	})(document);

})(window.DocNinja = window.DocNinja || {});
