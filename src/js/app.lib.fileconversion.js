(function (DocNinja, undefined) {

	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							CONVERSION
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */
	DocNinja.fileConversion = (function () {
		_validateUrl = function(url, fileId) {
			// we only support http and https urls for conversion (no other protocols)
			if (!/^(http(s)?):\/\//.test(url)) {
				var msg = url.indexOf('://') === -1 ? "Wasn't a valid http:// or https:// URL" : "URL didn't contain supported link type";
				_finishConversion({
					status: "error",
					error: msg,
					fileInfo: null,
					fileId: fileId
				});
				return false;
			}
			return true;
		}

		_success = function(liElem, data) {
			var this_fileid = liElem.getAttribute("data-fileid");
			liElem.setAttribute("data-converted","true");
			//localforage.setItem(this_fileid, JSON.stringify(data), function (err, value) {

			if (DocNinja.options.AUTOSPLIT && data.payload.html && data.payload.html.indexOf("pdf2htmlEX") !== -1) {
				DocNinja.Page.Split(liElem, data).then(function fileconversion_autosplit_done(result) {

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
					let aa = [];
					// can't use more than one page audio so we use the first one and set the rest as attached files
					if (data.payload.hasOwnProperty("audio")) {
						for (const [i,[k,v]] of Object.entries(Object.entries(data.payload.audio))) {
							if (i.toString() === "0") {
								data.payload.mp3 = v;
							} else {
								aa.push({"name":k + "-audio.mp3", "file":v});
							}
						}
						if (aa.length) data.attachments = aa;
						delete data.payload.audio;
					}
					// Ticket #260224 : target hrefs externally on unsplit pdf's
					var doc = document.implementation.createHTMLDocument(data.payload.name);
					doc.documentElement.innerHTML = data.payload.html;
					for (n of doc.querySelectorAll("a:not([target])")) {
						if (n.getAttribute("href").indexOf("script:")===-1) {
							n.setAttribute("target","_blank");
							n.setAttribute("rel","noopener");
						}
					};
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
			if (err) err = "\n" + err;
			if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndfail);
			alert("Sorry, this document type was not able to be converted." + err + "\n\nFor more information on convertable document types please consult the documentation.");
			liElem.remove();
			checkDummyItem();
		};

		_performConversion = function (data, fn) {
			const fd = new FormData();
			fd.append("hash", App.Hash || "debug");
			for (const key in data) {
				if (key === "original") continue; // don't carry to server
				if (key === "blob") {
					fd.append(key, data[key], data.name);
				} else {
					fd.append(key.toLowerCase(), data[key])
				}
			}
			// for (const pair of fd.entries()) { console.dir(pair); }
			fetch(App.Backend, {
				method: 'POST',
				body: fd,
				headers: {
					"fileid": data.fileId,
					"hash": App.Hash
				},
				cache: 'no-store',
				referrerPolicy: 'no-referrer-when-downgrade'
			})
			// .then(response => response.arrayBuffer())
			// .then(buffer => new TextDecoder("utf-16be").decode(buffer))
 			// .then(text => LZString.decompressFromBase64(text))
			.then(response => {
				if (!response.ok) throw(response.statusText);
				return response;
			})
			.then(response => response.text())
			.then(data => JSON.parse(data))
			.then(function(fileinfo) {
				if (data.hasOwnProperty("original")) fileinfo['original'] = data.original;
				if (fn) fileinfo['fn', fn];
				_finishConversion({
					status: "ready",
					error: null,
					fileInfo: fileinfo,
					fileId: data.fileId
				})
			})
			.catch(function(message) {
				console.error(message);
				_finishConversion({
					status: "error",
					error: message,
					fileInfo: null,
					fileId: data.fileId
				});
			});
		}

		_finishConversion = function(obj) {
			var liElem = document.querySelector("li[data-fileid='" + obj.fileId + "']");
			if (liElem == null) return;
			if ("error" === obj.status) {
				return _failure(liElem, obj.error);
			} else {
				obj.fileInfo.fileId = obj.fileId;
				DocNinja.PurityControl.Clean(obj.fileInfo).then(function(info) { //obj.fileInfo =
					obj.fileInfo = info;
					return _success(liElem, obj.fileInfo);
				});
				//return _success(liElem, obj.fileInfo);
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
				fileinfo = {},
				extn = '',
				mime = 'application/octet-stream',
				name = '';
				// initialOutputFormat = "html";
			extn = (raw && raw.files && raw.files[0].name) ? raw.files[0].name.trimUntilExtn() : '';
			name = (raw && raw.files && raw.files[0].name) ? raw.files[0].name.trimExtn() : '';
			if (extn.length) mime = Mime.get( extn );

			if (subtype === "x-markdown") kind = "markdown";
			if (kind === "url" && raw.url && raw.url.indexOf("<iframe ")!==-1) kind = "iframe";

// console.log(drop,raw,liElem,kind,subtype, extn, mime);

			// todo: regexp match the raw.files[0].type instead and call conversion from a library
			switch (kind) {
				case "markdown":
					DocNinja.Plugins.Markdown.Import(liElem, raw.files[0].name, drop.result);
					break;

				case "dropbox":
					liElem.setAttribute("data-converted","false");
					PurityControl.Nav.Update(liElem, {"name": raw.files[0].name, "depth": 0}, "conversion");

					// liElem.innerHTML = DocNinja.PurityControl.Nav.
					// liElem.innerHTML = Handlebars.templates["msg-converting"]({"id":this_fileid});


					_performConversion({
						name: raw.files[0].name,
						url: raw.files[0].url,
						type: mime, // could be done inside _performConversion I guess
						fileId: this_fileid, // string ref to dom node
						original: drop
					}, "dropbox");
					break;


				case "image":
					const imgExt = raw.files[0].name.trimUntilExtn().toLowerCase();
					if (["ai","avg","psd","tiff","webp","ps","wps","azw","bmp","nef","raw","xps"].includes(imgExt)) {

						liElem.setAttribute("data-converted","false");
						DocNinja.PurityControl.Nav.Update(liElem, {"name": raw.files[0].name, "depth": 0}, "conversion");

						_performConversion({
							name: raw.files[0].name,
							type: raw.files[0].type,
							blob: dataURItoBlob(drop.result),  // convert the base64 string to a Blob
							fileId: this_fileid, // string ref to dom node
							original: drop.result
						}, "img");

					} else if (DocNinja.options.AUTOOPTIMISE && imgExt !== "gif") {
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
									name: name,
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
							name: name,
							kind: "image"
						}
						return _success(liElem, fileinfo);
					}
					break;

				case "text":
					var rawHtml = Base64.decode(drop.result.split("base64,")[1]);
					if ("plain"===subtype) rawHtml = DocNinja.PurityControl.Conversion.TextToHtml({
						title: name,
						html: rawHtml
					});
					fileinfo = {
						payload: { html: rawHtml },
						format: raw.files[0].type.replace(/text\//,""),
						name: name,
						kind: "file",
					}
					return _success(liElem, fileinfo);
					break;

				case "website": // explicitly set as a website (ticked box)
					if (!_validateUrl(raw.url, this_fileid)) break;
					DocNinja.PurityControl.Nav.Update(liElem, {"name": raw.url, "depth": 0}, "conversion");
					fileinfo = {
						name: raw.url.split('://')[1].split('/')[0],
						url: raw.url,
						website: true,
						kind: "website",
						fileId: this_fileid
					};
					_performConversion(fileinfo, "website");
					break;

				case "url":
					if (!_validateUrl(raw.url, this_fileid)) break;
					DocNinja.PurityControl.Nav.Update(liElem, {"name": raw.url, "depth": 0}, "conversion");
					DocNinja.Plugins.Oembed(raw, liElem).then(function(data) {
						if (!data.result.payload) { // try running it through conversion instead
							_performConversion(data.result, "oembed-no-payload");
						} else {
							_success(liElem, data.result);
						}
					}).catch(function(er) { // failed but may be able to resume
						console.warn(er);
						fileinfo = {
							name: raw.url.split('://')[1].split('/')[0],
							url: raw.url,
							website: true,
							kind: "website",
							fileId: this_fileid,
							original: drop ? drop.result : null
						};
						_performConversion(fileinfo, "oembed-catch");
					});
					break;

				case "audio":
					_finishConversion({
						status: "error",
						error: "You can't embed audio files directly. Try attach audio to an existing page.",
						fileInfo: null,
						fileId: this_fileid
					});
					break;

				case "video": // if the mimedb has gotten us this far it is a browser-supported type
					fileinfo = {
						name: name,
						payload: {
							// html: Handlebars.templates['wrapper-video']({
							// 	title: name,
							// 	format: 'video',
							// 	src: "blob.mp4",
							// 	mime: mime
							// }),
							src: drop.result,
							mime: mime
						},
						scrub: true,
						score: 50,
						format: "video",
						fileId: this_fileid,
					}
					return _success(liElem, fileinfo);
					break;

				case "iframe":
					var tmp = document.createElement("div");
					tmp.innerHTML = raw.url;
					var src = tmp.querySelector("iframe").src; // .firstChild.src; // handle if iframe is wrapped within other code, say a responsive wrapper (like Microsoft Stream does)
					fileinfo = {
						payload: {
							src: src
						},
						format: "text/html",
						name: "Embedded Document",
						kind: "iframe"
					}
					return _success(liElem, fileinfo);
					break;

				case "h5p":
					// var name = name;
					JSZip.loadAsync(drop.result.split("base64,")[1], {base64: true})
					.then(function(zip) {
						var h5pfile = zip.file("h5p.json");
						if (h5pfile) {
							h5pfile
								.async("string")
								.then(function(str) {
									return JSON.parse(str)
								}).then(function(json) {
									fileinfo = {
										payload: {
											html: Handlebars.templates['wrapper-h5p']({name: json.title, filename: raw.files[0].name}),
											src: drop.result
										},
										format: "package",
										name: json.title,
										kind: "h5p",
									}
									return _success(liElem, fileinfo);
								});
						} else {
							throw('No h5p.json file');
						}
					}).catch(function(error) {
						_failure(liElem, "Wasn't able to understand h5p package \n" + error);
					});
					break;

				default:
					if ("json" === subtype) {
						var rawJson = Base64.decode(drop.result.split("base64,")[1]);
						if (isJSON(rawJson)) {
							var obj = JSON.parse(rawJson);
							DocNinja.Plugins.ImportQuiz(obj).then(function fileconversion_importquiz_done(obj) {
								if (obj.ready) {
									_success(liElem, obj.result);
								} else {
									_failure(liElem,"Unable to load quiz (maybe bad data?)");
								}
							}).catch(function(error) {
								_failure(liElem,error);
							});
						} else {
							_failure(liElem,"Unable to understand this file type");
						}
					} else if ("zip" === subtype) {
						DocNinja.Plugins.ImportZip(drop.result)
						.then(function (status) {
							liElem.parentNode.removeChild(liElem); // drop created a node we don't need anymore
							setItemOrder();
						})
						.catch(function (error) {
							_finishConversion({
								status: "error",
								error: "Sorry, I didn't understand the files inside that zip.\nError: " + error,
								fileInfo: null,
								fileId: this_fileid
							});
						});
					} else { // zip was not subtype, try a standard conversion
						// else store and process the conversion result of the dropped file
						liElem.setAttribute("data-converted","false");
						DocNinja.PurityControl.Nav.Update(liElem, {"name": raw.files[0].name, "depth": 0}, "conversion");

						_performConversion({
							name: raw.files[0].name,
							type: raw.files[0].type,
							blob: dataURItoBlob(drop.result),  // convert the base64 string to a Blob
							fileId: this_fileid, // string ref to dom node
							original: drop.result
						}, "fallback");
					};
			}
		};

		_handleServerImport = function(name) {
			var fd = new URLSearchParams({
					"action": "loadcourse",
					"name": name
				}),
				li = document.createElement('li');
			fetch(App.Warehouse + "?hash=" + App.Hash, {
				method: "POST",
				body: fd
			}).then(function(response) {
				if (response.ok) {
					return response.blob();
				}
				throw response;
			}).then(function(blob) {
				var reader = new FileReader(),
					fileId = DocNinja.PurityControl.Nav.GetFileId(0);
				li.innerHTML = Handlebars.templates["nav-item"]({
					"state":"import",
					"id":fileId,
					"title":name
				});
				li.setAttribute("data-fileid", fileId); // "file-" + (new Date().getTime()).toString(36));
				DocNinja.navItems.appendChild(li);
				reader.onload = function (e) {
					_beginConversion(reader,
					                 {"files":[{name: name, type: "application/zip", extension: "zip"} ]},
					                 li,
					                 "application",
					                 "zip"
					                );
					reader = null;
				}
				reader.readAsArrayBuffer(blob);
			}).catch(function(msg) {
				console.dir(msg);
				alert("There was a problem importing the file from the server");
				if (li.parentNode) li.parentNode.removeChild(li);
			});
		};

		_handleFileUpload = function(files) {
			for (var i = 0; i < files.length; i++) {
				(function (file, index) { // iife closure to protect reader object
					var mime = file.type,
						extn = file.name.trimUntilExtn().toLowerCase();
					mime = Mime.get(extn); // trust the extension more than the mime (becasue windows is bad at mime types) .. also means we get predictable results for application/zip variants
					var mimetype = mime.split("/"),
						reader = new FileReader(),
						li = document.createElement("li"),
						fileId = DocNinja.PurityControl.Nav.GetFileId(index);

					if (extn === "h5p") mimetype[0] = "h5p";

					li.innerHTML = file.name;
					li.setAttribute("data-fileid", fileId); // "file-" + (new Date().getTime()).toString(36));
					DocNinja.navItems.appendChild(li);
					reader.onload = function (e) {
						_beginConversion(reader, // drop
						                 {"files":[{name: file.name, type: mime, extension: extn} ]}, // raw
						                 li,	// liElem
						                 mimetype[0], // kind
						                 mimetype[1] // subtype
						                );
						reader = null;
					}
					if ("zip"===mimetype[1] || (mime === 'video/mp4')) {
						reader.readAsArrayBuffer(file); // JSZip can accept ArrayBuffer
					} else {
						reader.readAsDataURL(file); // base64
					}
				}(files[i],i));
			}
		};

		// _handleCloudUpload = function(name, data, mimetype) {
		// 	var reader = new FileReader(),
		// 		mimeAr = mimetype.split('/');
		// 	reader.onload = function (e) {
		// 		// var result = e.target.result,
		// 		var li = document.createElement("li");
		// 		li.innerHTML = name;
		// 		li.setAttribute("data-fileid", DocNinja.PurityControl.Nav.GetFileId());
		// 		DocNinja.navItems.appendChild(li);
		// 		_beginConversion(reader, {"files": [ {"name":name, "type":mimetype} ]}, li, mimeAr[0], mimeAr[1]);
		// 		reader = null;
		// 	}
		// 	if ("zip"===mimeAr[1]){
		// 		reader.readAsArrayBuffer(data);
		// 	} else {
		// 		reader.readAsDataURL(data);
		// 	}
		// };

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
		//	ConvertURL: _convertURL,
			BeginConversion: _beginConversion,
			HandleUrlUpload: _handleUrlUpload,
			HandleUpload: _handleFileUpload,
			HandleServerImport: _handleServerImport,
		//	HandleCloudUpload: _handleCloudUpload,
			OptimiseImageMaybe: _optimiseImage
		}

	})();

})(window.DocNinja = window.DocNinja || {});