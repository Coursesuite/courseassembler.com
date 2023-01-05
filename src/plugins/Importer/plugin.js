(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};

	// ReImportNinjaFile - for reloading a single file in a published docninja packages
	/* @returns: a promise that will resolve when it's processed all references within this file then saved it to localstorage */
	var _ReImportNinjaFile = function (zipFolder, domDocument, fileId, fileInfo) {
		return new Promise(function(reimportResolve, reimportReject) {

			// img that is embedded using base64 style on a div (as opposed to an image tag) - we did this for a while, now we put the image into its own file, so over time this won't get used
			// :not(#wDS3ed) avoids matching on a possible audio element (which has the unlikely id of wDS3ed)
			if (fileInfo.kind === "image" && domDocument.querySelector("body > div[style]:not(#wDS3ed)")) {
				var imgData = domDocument.querySelector("body > div[style]:not(#wDS3ed)").getAttribute("style");
				imgData = "data:" + (imgData.split("url(data:")[1]);
				imgData = imgData.split(") no-repeat center;")[0];
				fileInfo.payload["image"] = imgData;
				localforage.setItem(fileId, fileInfo, function() {
					DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + fileId + "']"), fileInfo, "ready");
					reimportResolve({fileInfo:fileInfo,fileId:fileId});
				});
			} else if (fileInfo.kind === "image" && domDocument.querySelector('img[src^="data:image"]')) {
				var imgData = domDocument.querySelector('img[src^="data:image"]').src;
				fileInfo.payload["image"] = imgData;
				localforage.setItem(fileId, fileInfo, function() {
					DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + fileId + "']"), fileInfo, "ready");
					reimportResolve({fileInfo:fileInfo,fileId:fileId});
				});

			} else if (fileInfo.kind === "plugin" && fileInfo.plugin === "Section") {
				localforage.setItem(fileId, fileInfo, function() {
					DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + fileId + "']"), fileInfo, "ready");
					reimportResolve({fileInfo:fileInfo,fileId:fileId});
				});

			} else if (fileInfo.kind === "plugin" && fileInfo.plugin === "Intro") {
				DocNinja.Plugins.Intro.Import(domDocument)
				.then(function(imageData) {
					fileInfo.payload["image"] = imageData;
					fileInfo.payload["html"] = "<!DOCTYPE html>" + domDocument.documentElement.outerHTML;
					localforage.setItem(fileId, fileInfo, function() {
						DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + fileId + "']"), fileInfo, "ready");
						reimportResolve({fileInfo:fileInfo,fileId:fileId});
					});
				});

			} else if (fileInfo.kind === "plugin" && fileInfo.plugin === "Picture") {
				DocNinja.Plugins.Picture.Import(domDocument)
				.then(function(imageData) {
					fileInfo.payload["image"] = imageData;
					fileInfo.payload["html"] = "<!DOCTYPE html>" + domDocument.documentElement.outerHTML;
					localforage.setItem(fileId, fileInfo, function() {
						DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + fileId + "']"), fileInfo, "ready");
						reimportResolve({fileInfo:fileInfo,fileId:fileId});
					});
				});

			} else {

				function replaceElements(elements, dom, fileInfo) { // each item in the selection criteria
					return Promise.all(elements.map(selectElements.bind(this, dom, fileInfo))); // bind sends the value as the last parameter
				}

				function selectElements(dom, fileInfo, element) { // each item in the dom document for this criteria
					var  nodesArray = [].slice.call(dom.querySelectorAll(element.selector));
					return Promise.all(nodesArray.map(processElement.bind(this, element, dom, fileInfo))); // nodesArray[n] passed as last parameter
				}

				function processElement(element, dom, fileInfo, instance) { // an instance of an item
					return new Promise(function(resolve,reject) {
						var filename = unescape(instance.getAttribute(element.attribute)); // the file name of the JS or CSS or IMAGE
						zipFolder.file(filename).async(element.type).then(function(contents) { // the contents of the JS or CSS or IMAGE
							switch(element.kind) {
								case "script":
									instance.removeAttribute(element.attribute); // no more src tag
									instance.appendChild(document.createTextNode(contents));
									break;
								case "style":
									var style = document.createElement("style");
									style.appendChild(document.createTextNode(contents));
									instance.parentNode.replaceChild(style,instance);
									break;
								case "image":
									var extn = filename.substr(filename.lastIndexOf(".") + 1).toLowerCase();
									instance.setAttribute("src", "data:image/" + extn + ";base64," + contents);
									break;
								case "audio": // note audio is almost never embedded in the document now
									fileInfo.payload["mp3"] = "data:audio/mp3;base64," + contents;
									if (instance.closest("#wDS3ed")) instance.closest("#wDS3ed").remove(); // the audio object ... man we need to fix that
									break;
							}
							resolve(dom);
						}, function (e) {
							// leave it alone I guess
							console.log("reImport.processElement.zipFolder.async.Error",e);
							resolve(dom); // still need to resolve at some point for promise.all to work
						});
					});
				}

				replaceElements([
					{"selector":"script[src]:not([src*='//'])","attribute":"src","type":"string","kind":"script"},
					{"selector":"link[href$='.css']:not([href*='//'])","attribute":"href","type":"string","kind":"style"},
					{"selector":"audio:not([src*='//'])","attribute":"src","type":"base64","kind":"audio"},
					{"selector":"img:not([src*='//'])","attribute":"src","type":"base64","kind":"image"}
				], domDocument, fileInfo).then(function(results) {
					if (fileInfo.kind === "image" && domDocument.querySelector("body > img.object-fit-contain")) { // todo: revise why we are storing the image payload this way
						fileInfo.payload["image"] = domDocument.querySelector("body > img").getAttribute("src");
					} else {
						fileInfo.payload["html"] = "<!doctype html>" + domDocument.firstElementChild.outerHTML;
					}
					localforage.setItem(fileId, fileInfo, function () {
						DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + fileId + "']"), fileInfo, "ready");
						reimportResolve({fileInfo:fileInfo,fileId:fileId});
					});
				});
			}
		});

	};

	// ConvertZipForHtml - for IMS CP packages
	// returns a promise ( of a promise ( of a promise ( of an async ) ) ) - yikes
	var _ConvertZipForHtml = function (zipObject, node, domDocument) {

		var folder = node.parentNode.getAttribute("xml:base");

		var body = domDocument.querySelector("body"),
			bs = body.getAttribute("style") || "";
		body.setAttribute("style", bs += "; background-color: #fff;");

		function replaceElements(elements, dom) {
			return Promise.all(elements.map(selectElements.bind(this, dom)));
		}

		function selectElements(dom, element) {
			var  nodesArray = [].slice.call(dom.querySelectorAll(element.selector));
			return Promise.all(nodesArray.map(processElement.bind(this, element, dom)));
		}

		function processElement(element, dom, instance) {
			return new Promise(function(resolve,reject) {
				if (element.type === "link") { // replace link with plain text
					var tNode = document.createTextNode(instance.textContent);
					instance.parentNode.replaceChild(tNode, instance);

				} else { // need to load from the linked document
					var value = unescape(instance.getAttribute(element.attribute)),
				     		path = null;

				     	// images that are already encoded can be ignored
				     	if (element.type==="base64" && (-1!==value.indexOf("data:image"))) return;

					if (value.indexOf("../")==0) { // resolve dependancy filename
						var dep = node.parentNode.querySelector("dependency");
						if (null !== dep) {
							var ref = node.parentNode.parentNode.querySelector("resource[identifier='" + dep.getAttribute("identifierref") + "']");
							if (null !== ref) {
								// var reffold = ref.getAttribute("xml:base"); // should be the same as folder anyway
								path = ref.querySelector("file[href]").getAttribute("href");
							}
						}
					} else { // resolve path from filename
						path = folder + value;
					}

					zipObject.file(path).async(element.type).then(function success(content) {
						if (element.attribute === "href") {
							// <link href="file.css"> => <style>(file contents)</style>
							var style = document.createElement("style");
							style.appendChild(document.createTextNode(content));
							instance.parentNode.replaceChild(style,instance);
						} else if (element.type === "base64") {
							// <img src="file.gif"> => <img src="data:image/gif;base64,(image-contents)">
							var extn = value.substr(value.lastIndexOf(".") + 1).toLowerCase(),
								b64h = "data:image/" + extn + ";base64,";
							var b64data = content; //  if content is base64
							// var b64data = window.btoa(content); // if content is uint8array
							// var b64data = window.btoa(String.fromCharCode.apply(null, new Uint8Array(content))); // if content is arraybuffer
							instance.setAttribute("src", b64h + b64data);
						} else {
							// <sript src="file.js"></script> => <script>(file-contents</script>)
							instance.removeAttribute(element.attribute);
							instance.appendChild(document.createTextNode(content));
						}
						resolve(dom);
					}, function error (e) {
						// leave it alone I guess
						resolve(dom); // still need to resolve at some point for promise.all to work
					});
				}
			}); // return promise
		}

		return replaceElements([
			{"selector":"script[src]:not([src*='//'])","attribute":"src","type":"string"},
			{"selector":"link[href$='.css']:not([href*='//'])","attribute":"href","type":"string"},
			{"selector":"img:not([src*='//'])","attribute":"src","type":"base64"},
			{"selector":"audio:not([src*='//'])","attribute":"src","type":"base64"},
			{"selector":"a[target='_blank']:not([href*='://'])","type":"link"}
		], domDocument);
	};

	DocNinja.Plugins.ImportQuiz = function (obj) {
		return new Promise(function(finalResolve, finalReject) {
			if (obj && obj.source && obj.source === "docninja.quiz") {
				var fileinfo = {
					depth: 0,
					kind: "plugin",
					name: obj.title,
					payload: {
						quiz: obj,
						html: DocNinja.Plugins.QuizBuilder.Compile(obj, Handlebars.templates['quiz.renderer'])
					},
					plugin: "QuizBuilder",
					supports: ["edit","view"]
				}
				finalResolve({
					ready:true,
					result:fileinfo
				});
			} else {
				finalReject("Unable to understand this file structure.");
			}
		});
	}

	DocNinja.Plugins.ImportZip = function(array_buffer) {
//console.dir(array_buffer);
		return new Promise(function(finalResolve, finalReject) {
			JSZip.loadAsync(array_buffer)
			.then(function(zip) {
				var manifest = zip.file("imsmanifest.xml"),
					docninja = zip.file("doc.ninja"),
					vidninja = zip.file("vid.ninja"),
					quizninja = zip.file("quiz.ninja"),
					v2scorm = zip.file("v2s.ninja");

				if (null !== vidninja) {
					finalReject("Package type [vid.ninja] is not yet supported.");

				} else if (null !== v2scorm) {
					zip.file("index.html").async("string").then(function(text) {
						var li = DocNinja.Navigation.Nodes.Last(),
							fileid = DocNinja.PurityControl.Nav.GetFileId(),
							fileinfo = {
								depth: 0,
								format: "plain",
								kind: "proxy",
								name: li.textContent.replace('.zip','').replace('_',' '),
								payload: { html: '' }
							},
							dom = (new DOMParser()).parseFromString(text, "text/html");

						// var li = document.createElement("li");
						// li.innerHTML = fileinfo.name;
						// li.setAttribute("data-fileid", );
						// DocNinja.navItems.appendChild(li);

						DocNinja.PurityControl.Nav.Add(DocNinja.navItems, fileid, fileinfo, null, "cache");
						_ReImportNinjaFile(zip, dom, fileid, fileinfo).then(function(results) {
							// create a new node in the dom for this ...
							DocNinja.PurityControl.Nav.Update(DocNinja.navItems.querySelector("li[data-fileid='" + results.fileId + "']"), results.fileInfo, "ready");
							// ... because the callee of importZip will remove the origin li for some reason
							finalResolve();
						});
					});

				} else if (null !== quizninja) {
					finalReject("Package type [quiz.ninja] is not yet supported.");

				} else if (null !== docninja) {
					docninja.async("string").then(function(text) {
						var data = JSON.parse(text);
						if (!data || (data.creator && data.creator !== "docninja")) {
							finalReject("Manifest type [doc.ninja] was not understood or was incompatible.");
						}
						return Promise.resolve(data);
					}).then(function (ninja) {
						// move nodes from precached order back to actual nodes in dom, in order, with all the cached properties - except the file content
						var frag = document.createElement("ul");
						frag.innerHTML = ninja.order; // TODO: create nodes, opposite of convertOrderForManifest
						for (const node of frag.querySelectorAll("li[data-fileid]")) {
							var fileId = node.getAttribute("data-fileid"),
								gob = getObjects(ninja.files, "key", fileId)[0],
								fileInfo = JSON.parse(gob.value);
							DocNinja.PurityControl.Nav.Add(DocNinja.navItems, fileId, fileInfo, null, "cache");
						}
						frag = null;

						// file.asyncEach will call in order, but folder.file may return OUT of order, but we are now updating nodes so that is ok
						ninja.files.asyncEach(function(file, index, resume) {
							var fileinfo = JSON.parse(file.value),
								fileid = file.key,
								folder = zip.folder("data");

							// Header plugins have no file to read
							if (fileinfo.kind === 'plugin' && fileinfo.plugin === 'Section') {
								_ReImportNinjaFile(folder, undefined, fileid, fileinfo).then(function(results) {
									resume();
								});

							} else {

								folder.file(fileid + ".html").async("string").then(function(text) {
									var dom = (new DOMParser()).parseFromString(text, "text/html");
									_ReImportNinjaFile(folder, dom, fileid, fileinfo).then(function(results) {
										/*
										results = {
											fileinfo: (json)
											fileId: (string)
										}
										*/


										var proms = [];
										// if has audio
											// wait till it has been re-imported
										if (results.fileInfo.hasOwnProperty("audio")) {
											proms.push(new Promise(function(audioResolve, audioReject) {
												var audioName = results.fileInfo.audio;
												// fileInfo might be stale by now
												localforage.getItem(results.fileId).then(function(o) {
													folder.file(audioName).async("base64").then(function(mp3data) {
														o.payload["mp3"] = "data:audio/mp3;base64," + mp3data;
														localforage.setItem(results.fileId,o).then(function () {
															// DocNinja.PurityControl.Nav.Check()
															// DocNinja.Navigation.Icons.Add('audio', results.fileId);
															audioResolve();
														});
													});
												})
												.catch(audioReject);
											}));
										}

										// TODO: support attachments in doc.ninja output
										// THEN: support bringing them back in here
										// if has attachments
											// wait till they all have been reimported
										if (results.fileInfo.hasOwnProperty("attachments")) {

											// attachResolve finishes when the object is written
											proms.push (new Promise(function(attachResolve,attachReject) {
												let innerPromises = [],
													attachments = results.fileInfo.attachments;

												// innerPromise resolves when the work of loading and modifying the attachments array is done
												attachments.map(function(instance,instanceIndex) {
													innerPromises.push(new Promise(function(loadResolve, loadReject) {
														const fileMime = Mime.get( instance.name.trimUntilExtn() );
														folder.file(results.fileId + "/" + instance.name).async("base64").then(function(filedata) {
															attachments[instanceIndex].file = `data:${fileMime};base64,${filedata}`;
															loadResolve();
														}).catch(loadReject)
													}));
												});

												// after all innerPromises resolve we are safe to save the final attachments array
												Promise.allSettled(innerPromises)
												.then(function(innerPromiseResults) {
													localforage.getItem(results.fileId)
													.then(function(fi) {
														fi.attachments = attachments;
														localforage.setItem(results.fileId, fi)
														.then(attachResolve);
													})
												}).catch(attachReject);
											}));
										}

										// resume - happens even if proms[] is empty
										Promise.all(proms)
										.then(resume);


										// } else {
										// 	resume();
										// }
									});
								});
							}
						}, function() {
							// asycheach has slowed us down but has given us a guarenteed order, so it's now safe to save
// console.log(" after all resumes");
							DocNinja.reloadSettingsFromCache(ninja.settingsCache); // overwrite existing settings I guess
							finalResolve();
							// setItemOrder();

						});
					});

				} else if (null !== manifest) {
					manifest.async("string")
					.then(function(text) {
						if (-1 !== text.toLowerCase().indexOf("<schema>adl scorm</schema>")) {
							finalReject("Can't embed SCORM package. Only IMSCP 1.1 packages are supported at this time.");

						} else if (-1 !== text.indexOf("http://www.imsglobal.org/xsd/imscp_v1p1")) {
							var doc = (new DOMParser()).parseFromString(text, "text/xml");

							// set option-course-name if blank
							var ocn = document.getElementById("ocn");
							if ($.trim(ocn.value)==="") ocn.value = doc.querySelector("title").textContent;

							// querySelector seems easier than document.evaluate()
							[].slice.call(doc.querySelectorAll("file[href$='.html']")).asyncEach(function(node, index, resume) {
								var href = node.getAttribute("href");
								zip.file(href).async("string").then(function(html) {
									var dom = (new DOMParser()).parseFromString(html, "text/html");

									_ConvertZipForHtml(zip, node, dom).then(function(results) {

										var resultDoc = results[1][0], // why? something to do with the resolve being nested in several promises perhaps?
											domTitle = resultDoc.querySelector("head > title").textContent,
											domOuterHtml = "<!doctype html>" + resultDoc.firstElementChild.outerHTML;

										// now we do what DocNinja.fileConversion.FinishConversion and DocNinja.fileConversion.Success would do, except in a loop
										var fileid = DocNinja.PurityControl.Nav.GetFileId(index);
										fileinfo = {
											payload: { html: domOuterHtml, naturalOrder: index },
											format: "html",
											name: domTitle || href || "untitled page " + index,
											kind: "file",
											depth: (index==0) ? 0 : 1
										}
										localforage.setItem(fileid, fileinfo, function (err, value) {
											DocNinja.PurityControl.Nav.Add(DocNinja.navItems, fileid, value, undefined, "ready");
											resume(); // even though the puritycontrol conversion might have happened for later pages, wait so we are in the correct order
										});
									}); // convert zip for html
								}); // zip.then
							}, function() {
								// asycheach has slowed us down but has given us a guarenteed order, so it's now save to save
								setItemOrder();
								finalResolve(true);
							}); // foreach
						} else {
							finalReject("An unsupported manifest version was encountered.");
						}
					});
				} else {
					finalReject("Unable to find compatible content within this package.");
				}

			}); // jszip

		}); // return
	};


})(window.DocNinja = window.DocNinja || {});