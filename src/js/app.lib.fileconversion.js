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
			if (err) err = "\n" + err;
			alert("Sorry, this document type was not able to be converted." + err + "\n\nFor more information on convertable document types please consult the documentation.");
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
					DocNinja.PurityControl.Nav.Update(liElem, {"name": raw.url, "depth": 0}, "conversion");
					DocNinja.Plugins.Oembed(raw, liElem).then(function(obj) {
						if (obj.ready) {
							_success(liElem, obj.result);
						} else {
							_performConversion(obj.result);
						}
					}).catch(function(error) {
						console.dir(error);
						_failure(liElem, "Url was not understood, not found, or was private.");
					})
					// _convertURL(raw, liElem)
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
						DocNinja.Plugins.ImportZip(drop.result)
						.then(function (status) {
							liElem.parentNode.removeChild(liElem); // drop created a node we don't need anymore
							setItemOrder();
						})
						.catch(function (error) {
							_finishConversion({
								status: "error",
								error: "Sorry, I didn't understand the files inside that zip.\nError: " + message,
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
							fileId: this_fileid // string ref to dom node
						});
					};
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
		//	ConvertURL: _convertURL,
			BeginConversion: _beginConversion,
			HandleUrlUpload: _handleUrlUpload,
			HandleUpload: _handleFileUpload,
			HandleCloudUpload: _handleCloudUpload,
			OptimiseImageMaybe: _optimiseImage
		}

	})();

})(window.DocNinja = window.DocNinja || {});