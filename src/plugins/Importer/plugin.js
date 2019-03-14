(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.Importer = new Promise(finalResolve, finalReject) {

	};

})(window.DocNinja = window.DocNinja || {});
	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							CONVERSION
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */

					if ("zip" === subtype) {
						JSZip.loadAsync(drop.result)
						.then(function(zip) {  // which FileReader loads as an ArrayBuffer; can also dataURItoArrayBuffer(drop.result));

							if ("object" === typeof zip.files) {

								// order of processing is important. We MUST do ninja files, THEN manifest, THEN raw files

								liElem.parentNode.removeChild(liElem); // drop created a node we don't need anymore

								var manifest = zip.file("imsmanifest.xml"),
									docninja = zip.file("doc.ninja"),
									vidninja = zip.file("vid.ninja"),
									quizninja = zip.file("quiz.ninja");
								//	plainhtml = zip.file(/[.]htm(?:l)?/);
								if (null !== vidninja) {
									throw new Error("Importing from Media Scormification Ninja is not yet supported.");

								} else if (null !== quizninja) {
									throw new Error("Importing from Quiz Scormification Ninja is not yet supported.");

								} else if (null !== docninja) {
									docninja.async("string").then(function(text) {
										var data = JSON.parse(text);
										if (!data || (data.creator && data.creator !== "docninja")) {
											throw new Error("Unable to parse docninja manifest");
										}
										return Promise.resolve(data);
									}).then(function (ninja) {
										// move nodes from precached order back to actual nodes in dom, in order, with all the cached properties - except the file content
										var frag = document.createElement("ul");
										frag.innerHTML = ninja.order;
										[].forEach.call(frag.querySelectorAll("li[data-fileid]"), function (node) {
											var fileId = node.getAttribute("data-fileid"),
												gob = getObjects(ninja.files, "key", fileId)[0],
												fileInfo = JSON.parse(gob.value);
											DocNinja.PurityControl.Nav.Add(DocNinja.navItems, fileId, fileInfo, null, "cache");
										});
										frag = null;

										// file.asyncEach will call in order, but folder.file may return OUT of order, but we are now updating nodes so that is ok
										ninja.files.asyncEach(function(file, index, resume) {
											var fileinfo = JSON.parse(file.value),
												fileid = file.key,
												folder = zip.folder("data");
											folder.file(fileid + ".html").async("string").then(function(text) {
												// console.log("asynceach grabbed string from file", fileid, text.length);
												var dom = (new DOMParser()).parseFromString(text, "text/html");
												DocNinja.PurityControl.ReImportNinjaFile(folder, dom, fileid, fileinfo).then(function(results) {
													// console.log("resuming from reimport");
													resume();
												});
											});
										}, function() {
											// asycheach has slowed us down but has given us a guarenteed order, so it's now safe to save
											// console.log(" after all resumes");
											DocNinja.reloadSettingsFromCache(ninja.settingsCache); // overwrite existing settings I guess
											setItemOrder();
										});
									});

								} else if (null !== manifest) {
									manifest.async("string").then(function(text) {
										// console.log("inside manifest check", text);
										if (-1 !== text.toLowerCase().indexOf("<schema>adl scorm</schema>")) {
											throw new Error("Can't embed SCORM package. Only IMSCP 1.1 packages are supported at this time.");
										} else if (-1 !== text.indexOf("http://www.imsglobal.org/xsd/imscp_v1p1")) {
											var doc = (new DOMParser()).parseFromString(text, "text/xml");

											// set option-course-name if blank
											var ocn = document.getElementById("ocn");
											if ($.trim(ocn.value)==="") ocn.value = doc.querySelector("title").textContent;

											// querySelector seems easier than document.evaluate()
											[].slice.call(doc.querySelectorAll("file[href$='.html']")).asyncEach(function(node, index, resume) {
											// [].forEach.call(, function (node, index) {
												var href = node.getAttribute("href");
												zip.file(href).async("string").then(function(html) {
													var dom = (new DOMParser()).parseFromString(html, "text/html");

													DocNinja.PurityControl.ConvertZipForHtml(zip, node, dom).then(function(results) {

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
												resolve(true);
											}); // foreach
										} else {
											throw new Error("An unsupported manifest version was encountered.");

										}
									}).catch(function(message) {
										_finishConversion({
											status: "error",
											error: message,
											fileInfo: null,
											fileId: this_fileid
										});
									});
								} else {
									_finishConversion({
										status: "error",
										error: "Sorry, I didn't understand the files inside that zip - cannot continue.\nError: " + message,
										fileInfo: null,
										fileId: this_fileid
									});
								}
							}
						});