(function (DocNinja, undefined) {

	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							CONVERSION
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */
	DocNinja.fileConversion = (function () {
		_success = function(liElem, data) {
			var this_fileid = liElem.getAttribute("data-fileid");
			liElem.setAttribute("data-converted","true");
			//localforage.setItem(this_fileid, JSON.stringify(data), function (err, value) {

			if (DocNinja.options.AUTOSPLIT && data.payload.html && data.payload.html.indexOf("pdf2htmlEX") !== -1) {
				DocNinja.Page.Split(liElem, data).then(function(result) {

					// remove original LI
					liElem.parentNode.removeChild(liElem);

					// re-cache the new items (otherwise they are orphaned)
					setItemOrder();

					// since the document preview is now not actually what is stored, reset the preview
					DocNinja.filePreview.Reset();

					// finally, remove the overlay
					$("#blocking").remove();

					// if the process has crashed by now, we might be able to refresh the page and try again,
					// hence leaving unconverted item removal until the last item
					localforage.removeItem(this_fileid); // async, so it shouldn't block
				});
			} else {
				if (!DocNinja.options.AUTOSPLIT && data.payload.html && data.payload.html.indexOf("pdf2htmlEX") !== -1) {
					// Ticket #260224 : target hrefs externally on unsplit pdf's
					var doc = document.implementation.createHTMLDocument(data.payload.name);
					doc.documentElement.innerHTML = data.payload.html;
					[].forEach.call(doc.querySelectorAll("a:not([target])"), function (n) {
						if (n.getAttribute("href").indexOf("script:")===-1) {
							n.setAttribute("target","_blank");
							n.setAttribute("rel","noopener");
						}
					});
					data.payload.html = "<!doctype html>" + doc.documentElement.outerHTML;
				}
				localforage.setItem(this_fileid, data, function (err, value) {
					if (typeof data.name !== "undefined" && data.name.length === 0) data.name = this_fileid;
					DocNinja.PurityControl.Nav.Update(liElem, data, "ready");
					setItemOrder();
				});
			}
			return liElem;
		};

		_failure = function (liElem, err) {
			alert("Sorry, this document type was not able to be converted.\n"+ err+"\nFor more information please consult the user guide.\nhttps://guide.coursesuite.ninja/documentninja");
			liElem.remove();
			checkDummyItem();
		};

		_performConversion = function (data) {
			var initialOutputFormat = "html",
				// simpleHtml = 0,
				CLOUD_CONVERT_APIKEY = "8pxT0DHRE5lpcVzildrPoEbztL9rc5Es89xG0incUfPNB93LLZueEr7zTK7PTuZmcV1hXkRMITbhjS-U1NnnzQ";

			// if it's a format that doesn't convert well to html initially (based on trial and error)
			// first convert it to PDF, then convert the result to HTML
			var extn = (data.website) ? "website" : (data.extn) ? data.extn : data.name.split(".").pop().toLowerCase();
			switch (extn) {
				case "odd": case "epub": case "mobi": case "lit": case "pages":
				case "numbers": case "ods": case "cdr": case "eps":
					// simpleHtml = 1;
					// no break
				case "psd": case "tiff": case "webp": case "ps": case "svg": case "wps": case "azw":
				case "bmp": case "nef": case "raw": case "xps":
				// case "jpg": case "jpeg": case "png": case "gif": // do NOT convert images to pdf! If you are seeing images in this function, there is a bug earlier in the process
				case "website":
					initialOutputFormat = "pdf";
					break;
				case "ppt": case "pptx": case "key":
					// simpleHtml = 1;
			}

			// tim: simplehtml means the document *may* download as a zip
			// but produces a significantly smaller document
			// and the document pages are seperated by <!-- Page 1 --> etc
			// so it needs a different splitter
			//  ... disabling for now
			var formData = new FormData(),
				qs = xhrFields({
				    "apikey": CLOUD_CONVERT_APIKEY,
				    "input": (extn === "website") ? "url" : (data.url) ? "download" : "upload",
				    "file": (data.url) ? data.url : null,
				    "delete": "true",
				    "download": (initialOutputFormat=="pdf") ? false : "",
				    "inputformat": extn, // e.g. "pdf"
				    "outputformat": initialOutputFormat,
				    //"converteroptions[bg_format]" : "jpg", // default png, possible values png, jpg, svg
				    // https://api.cloudconvert.com/conversiontypes?inputformat=pdf&outputformat=html
				    // "converteroptions[page_width]": 960, // hard coded maximum pdf width, todo: make options page
				    // "preset": "VJPNDLbcru" // embed all @ 960; DocumentNinja preset
				});
			if (data.website)  qs += "&wait=true";
			if (data.filename) qs += "&filename=" + encodeURIComponent(data.filename);
			// console.log(initialOutputFormat, extn);
			if (initialOutputFormat=="pdf" || extn == "pdf") qs+= "&converteroptions[bg_format]=jpg";
			// if (simpleHtml==1) qs += "&converteroptions[simple_html]=1";
			if (data.blob) formData.append("file", data.blob, data.name);

			// console.log("qs", qs, data);
			// the file conversion proccess

			// while I could make or use a generic object and hang off promises for results,
			// we only ever need to make at most two calls, so it's hardly worth it
			// however, occasionally we get a CORS header error as a result and the process needs
			// to handle this somehow, so we may re-work this routine to have retries, thus making it generic -> todo
			var xhr = new XMLHttpRequest(); // ie10+
			xhr.open('POST', 'https://api.cloudconvert.com/convert?' + qs, true);
			xhr.onload = function() {

				if (xhr.status == 200) {

					// console.log("xhr",xhr);
					if (initialOutputFormat == "pdf") {

						// NOW we have to do it again, except to HTML this time
						// but the PDF is now hosted on CloudConvert, so we set that location as the file pickup URL, saving time & bandwidth
						var resp = JSON.parse(xhr.responseText);
						qs = xhrFields({
						    "apikey": CLOUD_CONVERT_APIKEY,
						    "input": "download",
						    "file": resp.output.url + "/" + resp.output.filename,
						    "delete": "true",
						    "inputformat": "pdf",
						    "outputformat": "html",
						});
						xhr.open('POST', 'https://api.cloudconvert.com/convert?' + qs, true);
						xhr.onload = function () {
							if (xhr.status == 200) {
								fileinfo = {
									payload: { html: xhr.responseText },
									format: initialOutputFormat,
									name: data.name.trimExtn(),
									kind: "file",
									type: data.type,
									src: data.src || {}
								};
								_finishConversion({
									status: "ready",
									error: null,
									fileInfo: fileinfo,
									fileId: data.fileId
								});
							} else {
								_finishConversion({
									status: "error",
									error: (JSON.parse(xhr.responseText)).error,
									fileInfo: null,
									fileId: data.fileId
								});
							}
						}
						xhr.send(); // no formdata this time

					} else { // file has been converted to html, process it
						fileinfo = {
							payload: { html: xhr.responseText },
							format: initialOutputFormat,
							name: data.name.trimExtn(),
							kind: "file",
							type: data.type,
							src: data.src || {}
						};
						_finishConversion({
							status: "ready",
							error: null,
							fileInfo: fileinfo,
							fileId: data.fileId
						});
					}
				} else {
					_finishConversion({
						status: "error",
						error: (JSON.parse(xhr.responseText)).error,
						fileInfo: null,
						fileId: data.fileId
					});
				}
			}
			xhr.send(formData);

		}

		_finishConversion = function(obj) {
			var liElem = document.querySelector("li[data-fileid='" + obj.fileId + "']");
			if (liElem == null) return;
			if ("error" === obj.status) {
				return _failure(liElem, obj.error);
			} else {
				obj.fileInfo = DocNinja.PurityControl.Clean(obj.fileInfo);
				return _success(liElem, obj.fileInfo);
			}
		};

		/*
		drop - reader object, generally we want drop.result
		raw - {files: [{ lastModified, lastModifiedDate, name, type (file mime), size ]}
		liElem - DOM node
		kind - first part of mime, same as raw.files[0].type.split("/")[0]
		subtype - second part of mime same as raw.files[0].type.split("/")[1]
		*/
		_beginConversion = function (drop, raw, liElem, kind, subtype) {
			var this_fileid = liElem.getAttribute("data-fileid"),
				fileinfo = {};
				// initialOutputFormat = "html";

			// console.log("_beginConversion", drop, raw, liElem, kind, subtype);

			if (subtype === "x-markdown") kind = "application"; // so it gets converted

			// todo: regexp match the raw.files[0].type instead and call conversion from a library

			switch (kind) {
				case "dropbox":
					liElem.setAttribute("data-converted","false");
					PurityControl.Nav.Update(liElem, {"name": raw.files[0].name, "depth": 0}, "conversion");

					// liElem.innerHTML = DocNinja.PurityControl.Nav.
					// liElem.innerHTML = Handlebars.templates["msg-converting"]({"id":this_fileid});


					_performConversion({
						name: raw.files[0].name,
						url: raw.files[0].url,
						type: Mime.get( raw.files[0].name.split(".").pop().toLowerCase() ), // could be done inside _performConversion I guess
						fileId: this_fileid // string ref to dom node
					});
					break;


				case "image":
					if (DocNinja.options.AUTOOPTIMISE && raw.files[0].name.trimUntilExtn().toLowerCase() !== "gif") {
						new AutoScaler(drop.result, {
							maxWidth: window.innerWidth,
							maxHeight: window.inerHeight,
							quality: 0.9,
							format: raw.files[0].type,
							onComplete: function (scaledImage) {
								fileinfo = {
									payload: {
										name: md5(scaledImage) + "." + raw.files[0].name.trimUntilExtn(),
										image: scaledImage
									},
									format: scaledImage.split(";")[0].replace(/image\//,""), // raw.files[0].type.replace(/image\//,""),
									name: raw.files[0].name.trimExtn(),
									kind: "image"
								}
								return _success(liElem, fileinfo);
							}
						});
					} else {
						fileinfo = {
							payload: {
								name: md5(drop.result) + "." + raw.files[0].name.trimUntilExtn(),
								image: drop.result
							},
							format: raw.files[0].type.replace(/image\//,""),
							name: raw.files[0].name.trimExtn(),
							kind: "image"
						}
						return _success(liElem, fileinfo);
					}
					break;

				case "text":
					var rawHtml = Base64.decode(drop.result.split("base64,")[1]);
					if ("plain"===subtype) rawHtml = DocNinja.PurityControl.Conversion.TextToHtml({
						title: raw.files[0].name.trimExtn(),
						html: rawHtml
					});
					fileinfo = {
						payload: { html: rawHtml },
						format: raw.files[0].type.replace(/text\//,""),
						name: raw.files[0].name.trimExtn(),
						kind: "file"
					}
					return _success(liElem, fileinfo);
					break;

				case "url":
					_convertURL(raw, liElem)
					break;

				case "audio":
				case "video":
					_finishConversion({
						status: "error",
						error: "Video & Audio can't be [yet] directly embedded. Please upload the item to YouTube or Vimeo or SoundCloud and drag the URL instead",
						fileInfo: null,
						fileId: this_fileid
					});
					break;

				default:

					if ("zip" === subtype) {
						if (DocNinja.Plugins.Import(drop)) {
								liElem.parentNode.removeChild(liElem); // drop created a node we don't need anymore
						}
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

					} else { // zip was not subtype, try a standard conversion

						// else store and process the conversion result of the dropped file
						liElem.setAttribute("data-converted","false");
						DocNinja.PurityControl.Nav.Update(liElem, {"name": raw.files[0].name, "depth": 0}, "conversion");

						_performConversion({
							name: raw.files[0].name,
							type: raw.files[0].type,
							blob: dataURItoBlob(drop.result),  // convert the base64 string to a Blob
							fileId: this_fileid // string ref to dom node
						});
					};
			}
		};

		_performOpenGraphEmbed = function (fileinfo, opengraph, liElem) {

			// the meta is stored against the original - fileinfo.source
			// but we also have the download link - opengraph.url
			liElem.setAttribute("data-converted","false");
			DocNinja.PurityControl.Nav.Update(liElem, {"name": "Importing", "depth": 0}, "conversion");

			if (opengraph.fetch !== false) {
				fetch(opengraph.fetch.url,opengraph.fetch.options||{}).then(function(response) {
					return response.text();
				}).then(function(html) {
					var doc = document.implementation.createHTMLDocument("foo");
					doc.documentElement.innerHTML = html;
					return doc.querySelector(opengraph.fetch.selector).getAttribute(opengraph.fetch.attribute);
				}).then(function(value) {
					DocNinja.PurityControl.Nav.Update(liElem, {"name": value, "depth": 0}, "conversion");
					_performConversion({
						src: opengraph,
						name: value,
						url: opengraph.url,
						extn: "pdf",
						type: Mime.get("pdf"),
						fileId: liElem.getAttribute("data-fileid"),
						filename: value + ".pdf", // not important, but cloudconvert needs a filename when it isn't handed a blob
					});
				}).catch(function(error) {
					console.log("fetch.catch", error);
					_failure(liElem, "Url was not understood, not found, or was private");
				});

			} else {

				$.getJSON("https://query.yahooapis.com/v1/public/yql?"
				          + "q=SELECT%20*%20FROM%20htmlstring%20WHERE%20url=%27"
				          + encodeURIComponent(fileinfo.source)
				          + "%27%20AND%20xpath=%27descendant-or-self::meta%27"
				          + "&diagnostics=false&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys" // important to make htmlstring work on supported tables
				          + "&format=json&callback=?"
				  , function(data) {

				  	if (!data.query.results) {
				  		console.warn("opengraph.failure",data);
						_failure(liElem, "Opengraph Url was not understood, not found, or was private");
				  	}
				  	// query matched only meta tags, and put it in
				  	// data.query.results.meta
					var res = $.grep(data.query.results.meta, function(obj, index) {
						return obj.hasOwnProperty("itemprop") && obj.itemprop === "name";
					});

					if (res.length > 0) {
						fileinfo.name = res[0].content;
					}

					DocNinja.PurityControl.Nav.Update(liElem, {"name": fileinfo.name, "depth": 0}, "conversion");
					var fileId = liElem.getAttribute("data-fileid");

					if (opengraph.export === "html") {
						var xhr = new XMLHttpRequest();
						xhr.open("GET", opengraph.url, true);
						// xhr.responseType = "arraybuffer";
						xhr.onload = function(oEvent) {
							if (xhr.status === 200) {
								if (opengraph.export === "html") {
									fileinfo = {
										payload: { html: xhr.responseText },
										format: opengraph.format,
										name: fileinfo.name.trimExtn(),
										kind: "file",
										type: data.type
									};
									_finishConversion({
										status: "ready",
										error: null,
										fileInfo: fileinfo,
										fileId: fileId
									});
								} else {
									_performConversion({
										name: fileinfo.name.trimExtn(),
										url: opengraph.url,
										type: Mime.get( fileinfo.name.split(".").pop().toLowerCase() ), // could be done inside _performConversion I guess
										fileId: fileId // string ref to dom node
									});
								}
							}
						};
						xhr.send();
					} else {
						_performConversion({
							name: fileinfo.name.trimExtn(),
							url: opengraph.url,
							extn: "pdf", // even though it might be a pptx, the url should provide the pdf version
							type: Mime.get( "pdf" ), //  fileinfo.name.split(".").pop().toLowerCase() ), // from the opengraph data, the original format
							fileId: fileId // string ref to dom node
						});
					}

				});
			}

		}

		_performOembed = function (fileinfo, oembed, liElem) {
			if (oembed.url == "") oembed.url = "/404/"; // cause failure
			var data = {},
		    	endpoint = oembed.url + "?url=" + encodeURIComponent(fileinfo.source) + (oembed.format ? "&format=" + oembed.format : "");
		    // if (oembed.url.indexOf("noembed")===-1) {
		    // 	oembed.url += "&maxwidth=" + oembed.width + "&maxheight=" + oembed.height;
		    // }
			// on January 3 2019, yahoo killed off yql.
			//if (oembed.yql) {
				// data = {
				// 	q: "select * from json where url = '" + endpoint + "'",
				// 	format: "json"
				// };
				// endpoint = 'https://query.yahooapis.com/v1/public/yql';
			// }

			fileinfo.src = oembed;
			$.ajax({
			    type: "GET",
			    url: endpoint,
			    data: data,
			    dataType: oembed.dataType
			}).done(function(obj) {
console.dir(obj);
				// if (oembed.yql && !obj.query.results) return _failure(liElem, "Was not able to embed document (may be blocked, or other error at provider)");
				// if (oembed.yql) obj = obj.query.results.json;
				var doc,ifr,src;
				switch (fileinfo.format) { // inject API commands to the wrappers
					case "youtube":
						doc = document.implementation.createHTMLDocument("foo");
						doc.documentElement.innerHTML = obj.html;
						ifr = doc.querySelector("iframe");
						src = ifr.getAttribute("src").replace( /(http(s?))\:/gi, "" ); // http(s):// -> //

						fileinfo.videoId = src.split("/embed/")[1].split("?")[0];
						src = "https://www.youtube.com/embed/" + fileinfo.videoId + "?enablejsapi=1&rel=0&showinfo=0&playsinline=1"

						ifr.setAttribute("src", src); //  += "&enablejsapi=1&rel=0&showinfo=0"); modestbranding=1&
						ifr.setAttribute("id","player1");
						obj.html = doc.querySelector("body").innerHTML;
						break;

					case "vimeo":
						doc = document.implementation.createHTMLDocument("foo");
						doc.documentElement.innerHTML = obj.html;
						ifr = doc.querySelector("iframe");
						src = ifr.getAttribute("src");
						ifr.setAttribute("src", src); // froogaloop required += "?api=1&player_id=player1");
						ifr.setAttribute("id","player1");
						obj.html = doc.querySelector("body").innerHTML.replace(/&amp;/g, '&');
						break;

					case "soundcloud":
						doc = document.implementation.createHTMLDocument("foo");
						doc.documentElement.innerHTML = obj.html;
						ifr = doc.querySelector("iframe");
						src = ifr.getAttribute("src");
						var scurl = src.split("url=")[1].split("&")[0];

						ifr.setAttribute("id","sc-widget");
						ifr.setAttribute("width","100%");
						ifr.setAttribute("height","166");
						src = "https://w.soundcloud.com/player/?url=" + scurl + "&show_artwork=true&auto_play=true&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=false";
						ifr.setAttribute("src",src);
						obj.html = doc.querySelector("body").innerHTML;
						break;

					case "slideshare":
						doc = document.implementation.createHTMLDocument("foo");
						doc.documentElement.innerHTML = obj.html;
						var href = doc.querySelector("a").getAttribute("href");
						// seems like a round trip to get the href, but we also get title and total_slides..
						// first href in document is the actual link, which picoSlides.js requires
						obj.html = "<div id='slides' data-src='" + href + "'></div>";
						fileinfo.payload["total_slides"] = obj.total_slides;
						fileinfo.score = ~~obj.total_slides;
						// console.log(obj);
						break;

					case "edocr":
						// that's cool, nothing to do here
						break;

					case "imgur":
						if (!obj.html) _failure(liElem, "Imgur doesn't know what this is. Did you copy the URL?");
						doc = document.implementation.createHTMLDocument("foo");
						doc.documentElement.innerHTML = obj.html;
						// console.log(obj.html);
						var el = doc.querySelector("blockquote"),
							link = el.querySelector("a");
						link.setAttribute("target","_blank");
						obj.title = link.textContent;
						var s;
						// console.log(obj.title, link.textContent);
						if (link.getAttribute("href").indexOf(".com/a/")!==-1) { // aha, this is an album, leave it alone
							s = document.createElement("style");
							s.setAttribute("type","text/css");
							s.textContent = "#imgur-embed-iframe-pub-" + el.dataset.id.replace(/\//,'-') + "{width:100% !important}";
							doc.querySelector("body").insertAdjacentElement('beforeend',s);
						} else { // replace the textbody with the [linked] preview image
							// could do a second xhr to grab and parse the title, on a promise, then update the liElem later on ...
							link.innerHTML = "<img alt='" + obj.title + "' src='" + link + ".jpg' srcset='" + link + "s.jpg 90w, " + link + "m.jpg 320w, " + link + "l.jpg 640w' />";
							s = doc.querySelector("body>script");
							s.parentNode.removeChild(s);
							el.parentNode.innerHTML = el.innerHTML; // unwrap link
						}
						obj.html = doc.querySelector("body").innerHTML;
						// switch (obj.type) {
						// 	case "rich":
						// 		var doc = document.implementation.createHTMLDocument("foo");
						// 		doc.documentElement.innerHTML = obj.html;
						// 		var video = doc.getElementsByTagName("video");
						// 		if (video.length) { // add video controls to oembed/video
						// 			video[0].setAttribute("controls",true);
						// 			obj.html = doc.querySelector("body").innerHTML;
						// 		}
						// 		obj.html = ["<style>",
						// 					"body{background-color:#000;color:#fff;}",
						// 					"video{min-width:100%}",
						// 					"</style>",
						// 					obj.html.replace( /(http(s?))\:/gi, "" )].join("\n"); // http(s):// -> //
						// 		break;
						// 	case "photo":
						// 		obj.html = ["<style>",
						// 					"body{background-color:#000;font-family:sans-serif;}",
						// 					"a{color:#fff;text-decoration:none;display:block;padding:1em;text-shadow:1px 1px 0 #000;}",
						// 					"div{text-align:center;padding:.5em;}",
						// 					"img{max-width:100%;max-height:" + obj.height + "px;}",
						// 					"figure{border:3px solid #555;}figcaption{background-color:#555;margin:0;}",
						// 					"</style>",
						// 					"<div>",
						// 					"	<figure>",
						// 					"		<img src='" + obj.url + "'></p>",
						// 					"		<figcaption><a href='" + obj.url + "' target='_blank' title='Uploaded by " + obj.author_name + ", Hosted by http://imgur.com'>" + obj.title + "</a></figcaption>",
						// 					"	</figure>",
						// 					"</div>"].join("\n");
						// 		break;
						// }
						break;
				}

				fileinfo.payload.html = Handlebars.templates[oembed.renderer]({title:obj.title,body:obj.html,format:fileinfo.format,videoId:fileinfo.videoId});
				fileinfo.name = obj.title;
				return _success(liElem, fileinfo);

			}).fail(function (obj) {
				console.warn("error", obj);
				return _failure(liElem, "Url was not understood, not found, or was private");
			});
		};

		_convertURL = function(obj, liElem) {

			var fileinfo = {
					payload: { html: "" },
					source: obj.url,
					name: "",
					kind: "url",
					score: 1 // non-zero, generally the page or number of seconds to wait to get a view
				},
				oembed = {
					url: "https://noembed.com/embed",
					width: Math.max(1000, $(preview).width()),
					height: Math.max(1000, $(preview).height()),
					format: "json",
					renderer: "wrapper-raw",
					dataType: "jsonp",
				//	yql: false
				},
				og = {
					url: "",
					renderer: "wrapper-raw",
					subtype: "",
					export: "html",
					fetch: false,
				},
				embeddable = false,
				opengraph = false;
			// google docs have a mechanism for exporting to html/pdf built in - leverage that
			if (obj.url.indexOf(".google.com") != -1) {
				embeddable = false;
				opengraph = true;
				var parts = obj.url.split("://")[1].split("/"),
					loc = parts[0],// docs.google.com
					kind = parts[1],  // document, spreadsheets, presentation, file
					// command = parts[2], // always "d"
					doc = parts[3], // a hash of some kind - the document id
					// action = parts[4], // pub, embed, etc
					media = "https://" + loc + "/" + kind + "/d/" + doc + "/";

				fileinfo.inputformat = "google-" + kind;

				switch (kind) {
					case "presentation":
						og.fetch = {
							url: media + "edit?usp=sharing",
							selector: "meta[property='og:title']", // previously og:description
							attribute: "content",
							options: {mode: 'cors',method:'GET',cache:'no-store'},
							kind: "google-" + kind,
						}
						og.url = media + "export/pdf?id=" + doc;
						og.export = "pdf";
						break;

					case "file":
						og.url = "https://drive.google.com/uc?export=download&id=" + doc;
						break;

					case "spreadsheets":
					case "document":
						og.url = media + "export?format=" + og.export;
						break;

					default:
						return _failure(liElem, "Url was not understood, not found, or was not sharable with others.");
						break;

				}


				// you can use opengraph to pull the title and description
				// or just pull the page source eg.. https://docs.google.com/document/d/1eghvM9agyWX7RsqqL5lfBlkJytd8erG4pvo2c_cx608/edit?usp=sharing and read the meta tags

				// but check this out
				// https://docs.google.com/document/export?format=pdf&id=1eghvM9agyWX7RsqqL5lfBlkJytd8erG4pvo2c_cx608
				// automatic pdf conversion ... and if the "anyone with this link" is set, then it works unauthenticated!
				// hmm, this could be useful...
				// also
				// google docs can also be directly exported to html

				// forms aspect ration = 1 / Math.sqrt(2) ' a4 portrait'
				// file aspect ration = 1 / Math.sqrt(2) ' a4 portrait'
				// document aspect ration = 1 / Math.sqrt(2) ' a4 portrait'
				// spreadsheet aspect ratio = Math.sqrt(2) ' a4 landscape'
				// presentation aspect ratio = 4/3

				// https://drive.google.com/file/d/FILE_ID/edit?usp=sharing
				// becomes
				// https://drive.google.com/uc?export=download&id=FILE_ID

				// https://docs.google.com/document/d/FILE_ID/edit?usp=sharing
				// becomes
				// https://docs.google.com/document/d/FILE_ID/export?format=doc
				// https://docs.google.com/document/d/FILE_ID/export?format=pdf
				// https://docs.google.com/document/d/FILE_ID/export?format=html


				// https://docs.google.com/presentation/d/FILE_ID/edit?usp=sharing
				// becomes
				// https://docs.google.com/presentation/d/FILE_ID/export/pptx
				// https://docs.google.com/presentation/d/FILE_ID/export/pdf
				// https://docs.google.com/presentation/d/FILE_ID/export/html

				// https://docs.google.com/spreadsheets/d/FILE_ID/edit?usp=sharing
				// becomes
				// https://docs.google.com/spreadsheets/d/FILE_ID/export?format=xlsx
				// https://docs.google.com/spreadsheets/d/FILE_ID/export?format=pdf
				// https://docs.google.com/spreadsheets/d/FILE_ID/export?format=html

				// media += action;
				// if (qs > "") media += "?" + qs;


			} else if (obj.url.indexOf("vimeo") != -1) {
				embeddable = true;
				oembed.renderer = "wrapper-iframe";
//				oembed.url = "//vimeo.com/api/oembed.json";
				fileinfo.format = "vimeo";
				fileinfo.score = 50; // julie likes a default of 50%

			} else if (obj.url.indexOf("yout") != -1) {
				embeddable = true;
			//	oembed.yql = false;
				oembed.renderer = "wrapper-iframe";
				// oembed.url = "http://www.youtube.com/oembed";
//				oembed.url = "//noembed.com/embed";
				oembed.format = "json";
				oembed.dataType = "json";
				fileinfo.format = "youtube";
				fileinfo.score = 50;

			} else if (obj.url.indexOf("soundcloud") != -1) {
				embeddable = true;
//				oembed.url = "http://soundcloud.com/oembed";
				oembed.dataType = "json";
				oembed.renderer = "wrapper-iframe";
				fileinfo.format = "soundcloud";
				fileinfo.score = 50;

			} else if (obj.url.indexOf("slideshare") != -1) {
				embeddable = true;
//				oembed.yql = false;
				// oembed.url = "http://www.slideshare.net/api/oembed/2";
//				oembed.url = "https://noembed.com/embed";
				oembed.format = "jsonp";
				oembed.renderer = "wrapper-iframe";
				fileinfo.format = "slideshare";

// the embed you get is pretty hopeless now
// 			} else if (obj.url.indexOf("imgur") != -1) {
// 				embeddable = true;
// //				oembed.yql = true;
// 				oembed.url = "https://api.imgur.com/oembed.json";
// 				oembed.renderer = "wrapper-html5";
// 				fileinfo.format = "imgur";

			}

			// can't call http from https; we have to proxy it .,, luckily we have yql to do it for us
//			if (oembed.url.indexOf("http://")!==-1) {
//				oembed.yql = true;
//			}

			if (opengraph === true) {
				_performOpenGraphEmbed(fileinfo, og, liElem);
			} else if (embeddable === true) {
				_performOembed(fileinfo, oembed, liElem);
			} else {
				liElem.setAttribute("data-converted","false");
				DocNinja.PurityControl.Nav.Update(liElem, {"name": obj.url, "depth": 0}, "conversion");
				_performConversion({
					src: obj,
					name: DocNinja.PurityControl.Utils.UrlPath(obj.url),
					url: obj.url,
					website: true,
					type: "website",
					fileId: liElem.getAttribute("data-fileid")
				});
			}
		};

		_handleFileUpload = function(files) {
			for (var i = 0; i < files.length; i++) {
				(function (file, index) { // iife closure to protect reader object
					var mime = file.type,
						extn = file.name.substr(file.name.lastIndexOf(".") + 1).toLowerCase();
					mime = Mime.get(extn); // trust the extension more than the mime (becasue windows is bad at mime types) .. also means we get predictable results for application/zip variants
					var mimetype = mime.split("/"),
						reader = new FileReader(),
						li = document.createElement("li");
					li.innerHTML = file.name;
					li.setAttribute("data-fileid", DocNinja.PurityControl.Nav.GetFileId(index)); // "file-" + (new Date().getTime()).toString(36));
					DocNinja.navItems.appendChild(li);
					reader.onload = function (e) {
						_beginConversion(reader, {"files":[{name: file.name, type: mime} ]}, li, mimetype[0],mimetype[1]);
						reader = null;
					}
					if ("zip"===mimetype[1]) {
						reader.readAsArrayBuffer(file); // JSZip can accept ArrayBuffer
					} else {
						reader.readAsDataURL(file); // base64
					}
				}(files[i],i));
			}
		};

		_handleCloudUpload = function(name, data, mimetype) {
			var reader = new FileReader(),
				mimeAr = mimetype.split('/');
			reader.onload = function (e) {
				// var result = e.target.result,
				var li = document.createElement("li");
				li.innerHTML = name;
				li.setAttribute("data-fileid", DocNinja.PurityControl.Nav.GetFileId());
				DocNinja.navItems.appendChild(li);
				_beginConversion(reader, {"files": [ {"name":name, "type":mimetype} ]}, li, mimeAr[0], mimeAr[1]);
				reader = null;
			}
			if ("zip"===mimeAr[1]){
				reader.readAsArrayBuffer(data);
			} else {
				reader.readAsDataURL(data);
			}
		};

		_handleUrlUpload = function(name, url) {
			var li = document.createElement("li");
			li.innerHTML = name;
			li.setAttribute("data-fileid", DocNinja.PurityControl.Nav.GetFileId());
			DocNinja.navItems.appendChild(li);
			_beginConversion(null, {"files":[{"name":name, "url": url}] }, li, "dropbox", "");
		};

		_optimiseImage = function(dataurl, quality) {

			// data:image/png;base64,data... => image/png
			var mime_type = dataurl.substr(5, dataurl.indexOf(";") - 5);
			if (mime_type !== "image/png") return dataurl;

			var ready = false,
				result = dataurl,
				iter = 0;


			// wrap this in an async or promise or something that doesn't block like this
			var source_img_obj = new Image();
			source_img_obj.onload = function () {
				var cvs = document.createElement('canvas');
				cvs.width = source_img_obj.naturalWidth;
				cvs.height = source_img_obj.naturalHeight;
				var ctx = cvs.getContext("2d");
				ctx.fillStyle = '#fff';  /// set white fill style
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(source_img_obj, 0, 0);
				var newImageData = cvs.toDataURL("image/jpeg", quality/100);

				if (newImageData.length < dataurl.length) {
					result = newImageData;
				}

				ready = true;

			}
			source_img_obj.src = dataurl;
			while (ready === false && iter++ < 60000) {
				// do nothing, the image onload
				console.log("twiddling thumbs");
			}
			return result;

		}

		return {
			ConvertURL: _convertURL,
			BeginConversion: _beginConversion,
			HandleUrlUpload: _handleUrlUpload,
			HandleUpload: _handleFileUpload,
			HandleCloudUpload: _handleCloudUpload,
			OptimiseImageMaybe: _optimiseImage
		}

	})();

})(window.DocNinja = window.DocNinja || {});