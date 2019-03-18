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



		_convertURL_ext = function(obj, liElem) {

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