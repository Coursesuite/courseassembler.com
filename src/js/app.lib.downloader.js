(function (DocNinja, undefined) {

	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							DOWNLOAD
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */

	DocNinja.Downloader = (function () {

		// entry point - works out which button was clicked
		_init = function (uiButtonInstance) {
			var destination = uiButtonInstance.el.dataset.destination;
			switch (destination) {
				case "kloudless":
					// documentation: https://github.com/kloudless/file-explorer
					// var inst = window.Kloudless.explorer({
					// 	app_id: KLOUDLESS_APP_ID,
					// 	types: ["folders"],
					// 	//"flavor": "chooser",
					// 	retrieve_token: true,
					// });
					// inst.on("success", function (meta) {
					// 	if (!meta[0].bearer_token) {
					// 		alert("Sorry, was unable to properly authenticate. Please reload and try again.");
					// 		uiButtonInstance.stop(-1);
					// 	} else {
					// 		_createPackage(_kloudlessUpload, uiButtonInstance, meta);
					// 	}
					// });
					DocNinja.KLOUDLESS_OUTPUT.on("cancel", function() {
						uiButtonInstance.stop(-1);
					});
					DocNinja.KLOUDLESS_OUTPUT.on("success", function (meta) {
						_createPackage(_kloudlessUpload, uiButtonInstance, meta);
					})
					DocNinja.KLOUDLESS_OUTPUT.choose();

				break;

				case "download":
					_createPackage(_saveAs, uiButtonInstance);
				break;

				case "publish":
					_createPackage(_publishTo, uiButtonInstance);
				break;

				case "preview":
					_createPackage(_openIn, uiButtonInstance);
				break;
			}

		};

		// build the zip package in either IMSCP or SCORM mode
		_createPackage = function (fnResult, uiButtonInstance, metadata) {
			var setup = {"pages":[]},
				// appfiles = ["index.html","package.js","package.css"],
				zip = new JSZip(),
				fold,
				progress = 0,
				increment = 0.0,
				manifest = { "creator" : "docninja", "files": [], audio: true }; // always include plyr

			window.gatherSettings() // get form data
			.then(function buildSettingsModel(settings) { // build a model (setup)
				[].forEach.call(settings, function (setting) {
					setup[setting.name] = setting.value;
				});
				return Promise.resolve(setup);
			}).then(function ensureThemeIsCompiled(setup) {
				return new Promise(function(resolve,reject) {
					if (setup.hasOwnProperty('theme') && setup.theme.length) resolve(setup);
					if (!setup.template) setup.template = "menu";
					if (!setup.selected_theme) setup.selected_theme = "default";
					var user_theme = document.querySelector('textarea.theme-editor') ? document.querySelector('textarea.theme-editor').value : "";
					if (user_theme.length) {
						setup.theme = DocNinja.Plugins.Theme.compile(user_theme);
						return Promise.resolve(setup);
					} else {
						fetch("plugins/Theme/themes/" + setup.template + "/" + setup.selected_theme + ".theme").then(function(response) {
							if (!response.ok) throw response;
							response.text().then(function(theme) {
								setup.theme = DocNinja.Plugins.Theme.compile(theme);
								resolve(setup);
							});
						}).catch(function(m1ssing) {
							console.dir(m1ssing);
							reject(m1ssing);
						});
					}
				});
			}).then(function validateSettingsModel(setup) { // validate the data
				var seemsok = true;
				[].forEach.call(DocNinja.navItems.querySelectorAll("li"), function (el) {
					seemsok = seemsok && ((el.hasAttribute('data-state') && el.getAttribute('data-state')==='ready'));
				});
				if (!seemsok) {
					alert("Looks like there's still a conversion taking place - wait until that is finished, then try again.");
					throw new Error('Conversion in progress');
				}
				if (setup["option-course-name"] == "") {
					alert("Hold up there chief!\n\nYou need to at least name your course.");
					throw new Error('Course name was not specified');
				}
				return Promise.resolve(setup);
			}).then(function gatherResources(setup) { // start building the download
			    localforage.length().then(function(numberOfKeys) {
				// our progress bar increments between 0 and 1; how many items we are loading determine the number of increments
				increment = (1 / (numberOfKeys + 2)); // 10 files = increments of 0.08333; the 2 represent two operations that occur after these files are loaded

				if (setup.api === "imscp") { // this package has a different format, no scorm, and a different kind of manifest, and each page goes in its own folder (to be compatible with Moodle Book import format)
					setup["timestamp"] = (new Date().getTime()).toString(36);
					var resources = [];
					localforage.iterate(function imscp_iterate_localforage(value, key, iterationNumber) {
						if (key === "order") manifest["order"] = value;
						if (key === "settingsCache") manifest["settingsCache"] = value;
						if (key.indexOf("file-") != -1) { // only with this prefix, in case we store other things
							var li = $("li[data-fileid='" + key + "']"), // matching li
								// obj = JSON.parse(value),
								obj = value,
								filename = key + ".html";
							if (li.length) {
								var index = li.index() + 1,
									fold = zip.folder(index),
									resource = {
										order: index,
										title: $.trim(li.text().replace(/\s+/g, " ")),
										href: filename,
										identifier: setup.timestamp + "-" + index,
										base: index + "/",
										files: []
									}
								if ("iframe"==obj.kind) { // use a page that meta-redirects to the content
									obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
									obj = DocNinja.PurityControl.InjectPageAudio(obj,fold,resource);
									obj.payload.html =  Handlebars.templates["wrapper-redirect"](obj.payload);
									fold.file(filename, obj.payload.html);
									resource.files.push({
										href: resource.base + filename
									});
								} else if ("image"==obj.kind) { // convert it using the preview renderer
									fold.file(obj.payload.name, obj.payload.image.split(',')[1], {base64: true});
									resource.files.push({
										href: resource.base + obj.payload.name
									});
									obj.payload.html =  Handlebars.templates["wrapper-image"](obj.payload);
									obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
									obj = DocNinja.PurityControl.InjectPageAudio(obj,fold,resource);
									fold.file(filename,obj.payload.html);
									resource.files.push({
										href: resource.base + filename
									});
								} else if ("h5p"==obj.kind) {

								} else if ("file"==obj.kind) { // convert images to files and update HTML to point to files
									obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
									obj = DocNinja.PurityControl.InjectPageAudio(obj,fold,resource);
									DocNinja.PurityControl.ConvertHtmlForZip(key, filename, fold, obj, resource, "imscp");
									DocNinja.PurityControl.MayRequireJQuery(fold, obj, resource);
								} else if (isset(obj,'payload','html')) {  // includes plugins; just store the html, which will already be correct
									obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
									obj = DocNinja.PurityControl.InjectPageAudio(obj,fold);
									if (obj.plugin) switch (obj.plugin) {
										case "Markdown": // Markdown doesn't store final page, so re-render it
											obj.payload.html = Handlebars.templates['wrapper-page'](obj.payload);
											break;
										case "Intro":
											obj.payload.html = DocNinja.Plugins.Intro.Compile(obj.payload.html, obj.payload, setup);
											break;
									}
									fold.file(filename, obj.payload.html);
								} else { // just store the html, which will already be correct
									obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
									fold.file(filename, obj.payload.html);
									resource.files.push({
										href: resource.base + filename
									});
								}
								resources.push(resource);
							}

							// append to manifest, but without the payload
							if (obj.payload.image) delete obj.payload.image;
							if (obj.payload.html) delete obj.payload.html;
							if (obj.payload.mp3) {
								obj["audio"] = md5(obj.payload.mp3)+".mp3"; // store reference to file in manifest
								delete obj.payload.mp3;
							}
							// imscp doesn't support page attachments
							if (obj.hasOwnProperty("attachments")) delete obj.attachments;

							// push this record
							manifest["files"].push({"key":key,"value":JSON.stringify(obj)});

							progress += increment;
							uiButtonInstance.setProgress(progress);
						}

					}).then(function imscp_sort_pages(result) {
						// put the resources object in the order of resources.resource.order
						return resources.sort(function (x, y) {
							var a = safeGetProp(x, 'order', Infinity),
								b = safeGetProp(y, 'order', Infinity);
							return (a - b);
						});

					}).then(function imscp_set_resources(resources) {
						setup["resources"] = resources;
						return resources;
					}).then(function imscp_add_manifests() {
 						progress += increment;
						uiButtonInstance.setProgress(progress);
						return Promise.all([
							zip.file("imsmanifest.xml", Handlebars.templates[setup.api + "manifest"](setup)),
							zip.file("doc.ninja", JSON.stringify(manifest))
						]);
					}).then(function imscp_generate_zip() {
						return zip.generateAsync({type:"blob"})
					}).then(function imscp_final_result(content) {
						var zipname = setup["option-course-name"].replace(/\s/g,"_").replace(/[^a-z0-9_]/gi,"-");
						uiButtonInstance.stop(1); // >0 = success
						fnResult(content, zipname + ".zip", setup, metadata);
					}).catch(function(err) {
						console.log(err);
						uiButtonInstance.stop(-1);
					});

				} else { // was not imscp, so do this

					// we package all our user-generated resources into a 'data' folder inside the zip
					fold = zip.folder("data");

					localforage.iterate(function package_iterate_localforage(value, key, iterationNumber) {
						if (key === "order") manifest["order"] = value;
						if (key === "settingsCache") manifest["settingsCache"] = value;
						if (key.indexOf("file-") != -1) { // only with this prefix, in case we store other things
							var page = {},
								li = $("li[data-fileid='" + key + "']"), // matching li, as a jQuery object
								// obj = JSON.parse(value),
								obj = value,
								filename = key + ".html";

							if (li.length) {
								page["index"] = iterationNumber;
								page["title"] = $.trim(li.text().replace(/\s+/g, " "));
								page["score"] = ~~obj.score || 1; // convert to integer
								page["content"] = ("youtube vimeo soundcloud slideshare".indexOf(obj.format)!=-1) ? "media" : obj.kind; // media track timespent in the child frame
								page["href"] = "data/" + filename;
								page["depth"] = Math.max(0,+obj.depth||0); // must exist
								page["audio"] = obj.payload.hasOwnProperty("mp3") && obj.payload.mp3.length ? md5(obj.payload.mp3)+".mp3" : undefined; // name matches app.lib.puritycontrol.js line 341
								page["autonav"] = obj.hasOwnProperty("autoNav") && obj.autoNav;

								// find and attach all page attachments as files within the zip
								page["attachments"] = obj.hasOwnProperty("attachments") && obj.attachments.length ? (function () {
									return obj.attachments.map(function(attachment) {
										// store the attachment in a page subfolder
										zip.file("data/"+key+"/"+attachment.name,attachment.file.split(',')[1], {base64: true});

										// we only want a list of filenames
										return attachment.name;
									});
								})() : undefined;
								setup.pages[li.index()] = page; // push to index (nth LI) so it comes out in order in the template
							}
							if ("iframe"==obj.kind) { // use a page that meta-redirects to the content
								obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
								obj = DocNinja.PurityControl.InjectPageAudio(obj,fold);
								obj.payload.html =  Handlebars.templates["wrapper-redirect"](obj.payload);
								fold.file(filename, obj.payload.html);

							} else if ("image"==obj.kind) { // convert it using the preview renderer
								fold.file(obj.payload.name, obj.payload.image.split(',')[1], {base64: true});
								obj.payload.html =  Handlebars.templates["wrapper-image"](obj.payload); //TODO match preview-image with wrapper-image template
								obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
								obj = DocNinja.PurityControl.InjectPageAudio(obj,fold);
								fold.file(filename,obj.payload.html);

							} else if ("file"==obj.kind) { // convert images to files and update HTML to point to files
								// wow, surprising this even works since its adding the file to fold but not returning a promise ..
								obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
								obj = DocNinja.PurityControl.InjectPageAudio(obj,fold);
								DocNinja.PurityControl.ConvertHtmlForZip(key, filename, fold, obj);
								DocNinja.PurityControl.MayRequireJQuery(fold, obj);

							} else if ("h5p"==obj.kind) {
								var h5pFolder = fold.folder(key);
								setup.pages[li.index()].href = "data/" + key + "/index.html";
								DocNinja.Plugins.ExportH5P(obj, h5pFolder);

							} else if (isset(obj,'payload','html')) {  // includes plugins; just store the html, which will already be correct
								obj = DocNinja.PurityControl.InjectAnalyticsCode(obj,setup,'script-ga');
								obj = DocNinja.PurityControl.InjectPageAudio(obj,fold);
								if (obj.plugin) switch (obj.plugin) {
									case "Markdown": // Markdown doesn't store final page, so re-render it
										obj.payload.html = Handlebars.templates['wrapper-page'](obj.payload);
										break;
									case "Intro":
										obj.payload.html = DocNinja.Plugins.Intro.Compile(obj.payload.html, obj.payload, setup);
										break;
								}
								fold.file(filename, obj.payload.html);

							} else {
								alert("Uh-oh! The `" + page["title"] + "` page contains no data.");
								uiButtonInstance.stop(-1);
								// throw("Missing payload data", page); // no, promise doesn't catch a throw
								return Promise.reject("Missing payload data", page);
							}

							// append to manifest, but without the payload (no longer needed in memory)
							if (obj.payload.image) delete obj.payload.image;
							if (obj.payload.html) delete obj.payload.html;
							if (obj.payload.mp3) {
								manifest["audio"] = true; // flag that plyr needs to be included later on
								obj["audio"] = md5(obj.payload.mp3)+".mp3"; // store reference to file in manifest
								delete obj.payload.mp3;
							}
							if (obj.hasOwnProperty("attachments")) delete obj.attachments; // clean memory as we go
							manifest["files"].push({"key":key,"value":JSON.stringify(obj)});
							progress += increment;
							uiButtonInstance.setProgress(progress);
						}

					}).then(function package_add_template(result) {
						manifest["timestamp"] = (new Date().getTime());
						zip.file("doc.ninja", JSON.stringify(manifest));
						if (manifest.audio) { // include plyr to do web audio
							['plyr.js','plyr.css','plyr.svg'].map(function(name) {
								var p = $.ajax({url:'js/runtimes/'+name, dataType:"text"}); // $.ajax returns a promise of the file data
								zip.file(name, p);
							});
						 	setup["audio"] = true;
						}
						setup["timestamp"] = manifest["timestamp"].toString(36);
						setup["tier"] = App.Tier;

						var templates = Handlebars.templates = Handlebars.templates || {}, // in global scope, compiled during publish from the handlebars/ folder
							template = setup.template || $("#nav-selection figure.selected").attr("data-name"), // e.g. Menu, Continuous, Slides, etc
							promises = [];

						return new Promise(function package_template_compiler(outerResolve, outerReject) {

							function compile_template(name,file) {
								return new Promise(function(resolve, reject) {
									file.async("string").then(function(html) {
										Handlebars.templates[name] = Handlebars.compile(html);
										resolve(name);
									});
								});
							}

							function transfer_file(name,obj) {
								return new Promise(function(resolve,reject) {
									obj.async("blob").then(function(b) {
										zip.file(name,b);
										resolve(name);
									})
								});
							}

							// zip of template is hosted on an external location; grab it, unzip it into the download zip we are packing
							if (template.indexOf("://")!==-1) {
								new JSZip.external.Promise(function package_load_external_template(innerResolve, innerReject) {
								    JSZipUtils.getBinaryContent(template, function(err, data) {
								        if (err) {
								            innerReject(err);
								        } else {
								            innerResolve(data);
								        }
								    });
								}).then(function (bin) {
								    return JSZip.loadAsync(bin);
								})
								.then(function package_process_external_template(externalZip) {
									promises = [];
									externalZip.forEach(function(relativePath,file) {
										if (relativePath.startsWith("__MACOSX")) return; // skip
										switch (relativePath) {
											case "index.html": // compile these files into handlebars templates
											case "_package.js":
											case "_package.css":
												promises.push(compile_template(relativePath,file));
												break;
											default:
												promises.push(transfer_file(relativePath,file));
												break;
										}
									});
									Promise.all(promises).then(outerResolve);
								});

							} else {

								// reference to core files in selected template; theme is already compiled
								var urls = [
									// "designs/" + template + "/index.html",
									"plugins/Theme/themes/" + setup.template + "/index.html",
									"plugins/Theme/themes/" + setup.template + "/_package.js",
									"plugins/Theme/themes/" + setup.template + "/_package.css"
								];

								promises = urls.map(function package_process_internal_template(url) {
									return new Promise(function(resolve,reject) {
										var fh = new Headers(); fh.append('pragma','no-cache'); fh.append('cache-control','no-store'); // avoid caching templates until I can work out a better version control
										fetch(url, {method:'GET',headers:fh}).then(function(response) {
											if (!response.ok) throw response;
											var name = response.url.split("/").pop();
											return response.text().then(function(html) {
												templates[name] = Handlebars.compile(html);
												resolve(name);
											});
										}).catch(function(miss1ng) {
											console.dir(miss1ng);
											reject(miss1ng);
										});
									});
								});
								Promise.all(promises).then(function package_process_internal_resolve(result){outerResolve(result)});
							}
						});

					}).then(function package_include_manifests(result) {
						progress += increment;
						uiButtonInstance.setProgress(progress);
						if (setup['option-ga-id']) {
							setup['analytics-code'] = Handlebars.templates["script-ga-index"](setup);
						}
						return Promise.all([
							zip.file("index.html", Handlebars.templates["index.html"](setup)),
							zip.file("_package.js", Handlebars.templates["_package.js"](setup)),
							zip.file("_package.css", Handlebars.templates["_package.css"](setup)),
							zip.file("imsmanifest.xml", Handlebars.templates[setup.api + "manifest"](setup))
						]);

					}).then(function package_fetch_api() {
						return fetch("scorm/" + setup.api + ".zip");

					}).then(function package_fetch_api_buffer(response) {
						if (response.ok) {
							return response.arrayBuffer();
						}
						return Promise.reject(response);
					}).then(function package_load_api_zip(buffer) {
						return zip.loadAsync(buffer);

					}).then(function package_increment_progress(loadedZip) {
						progress += increment;
						uiButtonInstance.setProgress(progress);
						return loadedZip;

					}).then(function() {

						/* we are late-optimising files within the zip file before they get final compression - pulling out png's, replacing them with jpg's. */

						var worker = new Worker('js/workers/png2jpg/png2jpg.promiseworker.js');
						var pw =  new PromiseWorker(worker);

						var files = [], keys = manifest.files.filter(function(obj) { // find documents that were originally pdf
							return (obj.value.indexOf("application/pdf") !== -1);
						});
						// we dont really need this, but for clarity
						[].forEach.call(keys, function(obj) {
							files.push(obj.key + ".html");
						});
						// the things we have to do are each a promise which won't resolve until various internal promises resolve
						var promises = files.map(function package_pdf_optimisations(name) {
							return new Promise(function(html_resolve, html_reject) {
								fold.file(name).async("string").then(function package_pdf_optimisations_dom(str) {
									var doc = document.implementation.createHTMLDocument(name);
									doc.documentElement.innerHTML = str;
									var pngs = []; // the pngs inside this file that we will need to convert
									[].forEach.call(doc.querySelectorAll("img[src$='.png']"), function (img) {
										var src = img.getAttribute("src"),
											fn = md5(src) + ".jpg";
										pngs.push({png:src,jpg:fn});
										img.setAttribute("src", fn); // point to the new file name
									});
									fold.file(name, "<!doctype html>" + doc.documentElement.outerHTML); // update THIS html file

									// load any found pngs and convert them to jpeg
									var ops = pngs.map(function(src) {
										return new Promise(function (png_resolve, png_reject) {
											if (src.png==="1a0ce50c6a36a71332e9899e68f313ba.png") { png_resolve(); } // that pdf loading image
											fold.file(src.png).async("uint8array").then(function package_pdf_optimisations_png(imagedata) {

												// here's one way - instance the worker and create a listener. ugh, this could run out of memory or leak or who knows.
												/* var worker = new Worker('js/png2jpg.worker.js');
												worker.onmessage = function(e) {
													var response = e.data;
													var blob = new Blob([response.data], {type: "image/jpeg"});
													fold.file(src.jpg, blob);
													var bloburl = window.URL.createObjectURL(blob);
													fold.remove(src.png); // the original png has now been replaced by the jpg, so remove it
													png_resolve(); // resolve the inner promise
												}
												worker.postMessage({
													name: src.png,
													image: imagedata,
													quality: 75
												}); */

												// here's what we are going to do - user a shared promisable worker
												pw.postMessage({
													name: src.png,
													image: imagedata,
													quality: 75
												}).then(function package_pdf_optimisations_worker(response) {
													var blob = new Blob([response.data], {type: "image/jpeg"});
													fold.file(src.jpg, blob);
													//var bloburl = window.URL.createObjectURL(blob);
													fold.remove(src.png); // the original png has now been replaced by the jpg, so remove it
													png_resolve(); // resolve the inner promise
												});
											});
										});
									});
									// resolve outer promise when all innter promises finish
									Promise.all(ops).then(function () {
										html_resolve(true); // resolve the outer promise
									});
								});
							});
						});

						// only continue after all promises resolve
						return Promise.all(promises);

					}).then(function package_generate_zip(p) {

						// compress as best we can, it's not really important how much time this adds at this point
						return zip.generateAsync({
							type:"blob",
						    compression: "DEFLATE",
						    compressionOptions: {
						        level: 9
						    },
						    comment: setup["option-course-description"]
						}, function updateCallback(metadata) {
						    // console.log("progression: " + metadata.percent.toFixed(2) + " %");
						    //if(metadata.currentFile) {
						    //    console.log("current file = " + metadata.currentFile);
						    //}
						});

					}).then(function package_final_result(content) {
						var zipname = setup["option-course-name"].replace(/\s/g,"_").replace(/[^a-z0-9_]/gi,"-");
						uiButtonInstance.stop(1); // >0 = success
						fnResult(content, zipname + ".zip", setup, metadata);
						_notify(manifest);

					})
					.catch(function(err) {
						console.log(err);
						uiButtonInstance.stop(-1); // >0 = success
					});
/*
ES6
localforage.iterate(function( ... ) {
    // do stuff in loop
})
.then(result => $.getScript("/my/precompiled/template.js"))
.then(() => Promise.all([
    zip.file("file.js", Handlebars.templates["js"](config)),
    zip.file("file.css", Handlebars.templates["css"](config)),
    zip.file("file.html", Handlebars.templates["html"](config))
]))
.then(() => fetch("/" + config.somevalue + "/prepackaged.zip"))
.then(response => response.arrayBuffer())
.then(ab => zip.file("somefile.txt", Handlebars.templates[config.somevalue](config)).then(() => ab))
.then(ab => zip.loadAsync(ab))
.then(inst => zip.generateAsync({type:"blob"}))
.then(function(content) {
    // ... download as zip
});
*/

				} // if imscp

				// inform google about some stuff
				// if ("undefined" !== typeof ga) ga('send', 'event', {
				// 	'eventCategory': 'Download',
				// 	'eventAction': setup.api, // IMSCP, etc
				// 	'eventLabel': "{size: " + numberOfKeys + ", layout:" + setup.layout + "}",
				// 	'hitCallback': function() {
				// 	}
				// });

			    }); // localforage.length().then ...

			}).catch(function(err) {
				console.log(err);
				uiButtonInstance.stop(-1); // >0 = success
			}); // outer promise chain

		};


		// post back some stats about this download (only anonymous/abstract data)
		_notify = function (data) {
			var fd = new FormData();
			fd.append("timestamp", data.timestamp);
			fd.append("creator", data.creator);
			fd.append("hash",location.search);
			for (var i=0,k=Object.keys(data.settingsCache);i<k.length;i++){
				var name = data.settingsCache[k[i]].name,
					value = data.settingsCache[k[i]].value;
				switch (name) {
					case "template":
					case "navlock":
					case "rule":
					case "api":
						fd.append(name, value); // what is the value?
						break;
					case "option-ga-id":
					case "option-course-description":
					case "option-course-copyright":
						fd.append(name, value.length>0 ? "true" : "false"); // has a value?
						break;
				}
			}
			var tSplit=0, tAudio=0, tSrc=0, aKind=[], aFormat=[], aType=[];
			[].forEach.call(data.files,function(val) {
				var obj = JSON.parse(val.value);
				if (obj.hasOwnProperty("kind") && aKind.indexOf(obj.kind)===-1) aKind.push(obj.kind);
				if (obj.hasOwnProperty("format") && aFormat.indexOf(obj.format)===-1) aFormat.push(obj.format);
				if (obj.hasOwnProperty("type") && aType.indexOf(obj.type)===-1) aType.push(obj.type);
				tSplit += (obj.hasOwnProperty("payload") && obj.payload.hasOwnProperty("split") && obj.payload.split === true && obj.depth === 0) ? 1 : 0;
				tAudio += (obj.hasOwnProperty("audio")) ? 1 : 0;
				tSrc += (obj.hasOwnProperty("payload") && obj.payload.hasOwnProperty("src")) ? 1 : 0;
			});
			fd.append("pages",data.files.length); 	// total pages in package
			fd.append("split", tSplit);				// how many pages at depth=0 are split?
			fd.append("audio", tAudio);				// how many pages have audio?
			fd.append("src", tSrc);					// how many pages have a payload.src set?
			fd.append("kind", aKind.join(","));		// what are the kinds of templates rendered?
			fd.append("format", aFormat.join(","));	// what are the mime types of converions?
			fd.append("type", aType.join(","));		// what are the mime types of inputs?
			var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp');
			xhr.open("POST", "manifest.php");
			xhr.send(fd);
		}

		// call the Kloudless save process
		_kloudlessUpload = function (content, name, setup, metadata) {
			$.ajax({
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-Kloudless-Metadata", JSON.stringify({"parent_id": metadata[0].id, "name": name}))
				},
				url: "https://api.kloudless.com/v1/accounts/" + metadata[0].account + "/storage/files/?overwrite=false",
				method: "POST",
				contentType: "application/octet-stream",
				headers: {
					"Authorization": atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg==")
				},
				data: content,
				processData: false,
				success: function(status, xhr) {
					alert("Your package has been uploaded.");
				}
			});
		};

		// perform a PUT/POST to the destination url
		var _publishTo = function (content, name) {
			var div = document.querySelector("div.progress-button[data-destination='publish']"),
				$span = $(">button>span", div),
				_html = $span.html();
			$span.html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...");
			var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp'),
				fd = new FormData();
			fd.append("file", content, name);
			xhr.open(App.Method, App.Publish, true);
			xhr.onload = function (result) {
				if (this.status == 200) {
					$span.html("Uploaded");
				} else {
					$span.html("Failed");
				}
				setTimeout(function() {
					$span.html(_html);
					// bindDownloadButtons();
				},3456);

				// // console.dir(result);
				// if (this.status == 200) {
				// 	alert("Your package has been uploaded.");
				// }
			}
			xhr.onerror = function (result) {
				$span.html("<i class='fa fa-eye'></i> Upload error (too big?)");
				var ui = new UIProgressButton(div); ui.stop(-1);
				if (result.type === "error") {
					setTimeout(function() {
						$span.html(_html)
					},3456);
				}
			}
			xhr.setRequestHeader("Authorization", "Bearer " + App.Bearer);
			xhr.setRequestHeader("X-Filename", name);
			xhr.send(fd);
		};

		var _openIn = function (content, name) {
			var div = document.querySelector("div.progress-button[data-destination='preview']"),
				$span = $(">button>span", div),
				_html = $span.html();
			$span.html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...");
			var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp'),
				fd = new FormData();
			fd.append("file", content, name);
			xhr.open("POST", "preview/index.php" + location.search, true);
			// xhr.open("POST", "https://preview.coursesuite.ninja/", true);
			xhr.onload = function (e) {
				$span.html(_html);
				if (this.status == 200) {
					// var obj = JSON.parse(this.responseText);
					popIframe('preview/index.php' + location.search);
					// var popup = window.open(obj.href,'previewninja');
					// if (typeof popup == 'undefined' || popup == null) {
					// 	alert("We tried to popup up the window, but your browser has blocked it (check your browser location bar). Please allow popups from this site, or copy and open this link:\n\n" + obj.href);
					// }
				}
			}
			xhr.onerror = function (result) {
				$span.html("<i class='fa fa-eye'></i> Upload error (too big?)");
				var ui = new UIProgressButton(div); ui.stop(-1);
				if (result.type === "error") {
					setTimeout(function() {
						$span.html(_html)
					},3456);
				}
			}
			// xhr.setRequestHeader("Authorization", location.search);
			// xhr.setRequestHeader("X-Filename", name);
			xhr.send(fd);
		};

		// perform a browser save-as
		_saveAs = function (content, name, data) {
			var sa = saveAs(content, name);
			if (sa.readyState === 2) {
				content = null;
			}
		}

		// expose public methods
		return {
			Begin: _init
		}
	})();


})(window.DocNinja = window.DocNinja || {});