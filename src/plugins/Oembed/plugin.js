(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};

	var _nomoji = function(str) {
		return str.replace(/(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDD1-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])?|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF8]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD4C\uDD50-\uDD6B\uDD80-\uDD97\uDDC0\uDDD0-\uDDE6])\uFE0F/g,'');
	}

	// handlers to wrap extra html around provider-supplied code in order to do tracking (where possible)
	var _handlers = {
		"soundcloud": function (oembed, fileinfo) {
			return new Promise(function(resolve,reject) {
				var doc = document.implementation.createHTMLDocument(oembed.title);
				doc.documentElement.innerHTML = oembed.code;
				ifr = doc.querySelector("iframe");
				src = ifr.getAttribute("src");
				var scurl = src.split("url=")[1].split("&")[0];
				ifr.setAttribute("id","sc-widget");
				ifr.setAttribute("width","100%");
				ifr.setAttribute("height","166");
				src = "https://w.soundcloud.com/player/?url=" + scurl + "&show_artwork=true&auto_play=true&amp;hide_related=true&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=false";
				ifr.setAttribute("src",src);
				fileinfo.payload.html = Handlebars.templates["wrapper-iframe"]({
					title: oembed.title,
					description: oembed.description,
					body: doc.querySelector("body").innerHTML,
					format: "soundcloud"
				});
				fileinfo.name = _nomoji(oembed.title);
				fileinfo.src = oembed;
				resolve({
					ready: true,
					result: fileinfo
				});
			});
		},
		"vimeo": function (oembed, fileinfo) {
			return new Promise(function(resolve,reject) {
				var doc = document.implementation.createHTMLDocument(oembed.title);
				doc.documentElement.innerHTML = oembed.code;
				ifr = doc.querySelector("iframe");
				src = ifr.getAttribute("src");
				// ifr.setAttribute("src", src); // froogaloop required += "?api=1&player_id=player1");
				ifr.setAttribute("id","player1");
				fileinfo.payload.html = Handlebars.templates["wrapper-iframe"]({
					title: oembed.title,
					description: oembed.description,
					body: doc.querySelector("body").innerHTML.replace(/&amp;/g, '&'),
					format: "vimeo"
				});
				fileinfo.name = _nomoji(oembed.title);
				fileinfo.src = oembed;
				resolve({
					ready: true,
					result: fileinfo
				});
			});
		},
		"youtube": function (oembed, fileinfo) {
			return new Promise(function(resolve,reject) {
				var doc = document.implementation.createHTMLDocument(oembed.title);
				doc.documentElement.innerHTML = oembed.code;
				ifr = doc.querySelector("iframe");
				src = ifr.getAttribute("src").replace( /(http(s?))\:/gi, "" ); // http(s):// -> //
				fileinfo.videoId = src.split("/embed/")[1].split("?")[0];
				src = "https://www.youtube.com/embed/" + fileinfo.videoId + "?enablejsapi=1&rel=0&showinfo=0&playsinline=1"
				ifr.setAttribute("src", src); //  += "&enablejsapi=1&rel=0&showinfo=0"); modestbranding=1&
				ifr.setAttribute("id","player1");
				fileinfo.payload.html = Handlebars.templates["wrapper-iframe"]({
					title: oembed.title,
					description: oembed.description,
					body: doc.querySelector("body").innerHTML,
					format: "youtube"
				});
				fileinfo.name = _nomoji(oembed.title);
				fileinfo.src = oembed;
				resolve({
					ready: true,
					result: fileinfo
				});
			});
		},
		"microsoftonline": function (oembed, fileinfo) {
			return new Promise(function(resolve,reject) {

			});
		},
		"googledocs": function (oembed, fileinfo, node) {
			return new Promise(function(resolve,reject) {
				fileinfo.name = _nomoji(oembed.title);
				fileinfo.src = oembed;
				var parts = oembed.url.split("://")[1].split("/"),
					loc = parts[0],
					kind = parts[1],
					id = parts[3],
					url = "https://" + loc + "/" + kind + "/d/" + id + "/";
				switch (kind) {
					case "presentation":
						url += "export/pdf?id=" + id;
						break;
					case "file":
						url = "https://drive.google.com/uc?id=" + id + "&export=download";
						break;
					case "spreadsheets":
					case "document":
						url += "export?format=html";
						break;
					default:
						reject("Unknown Google document (perhaps it was not sharable?)");
				}
				DocNinja.PurityControl.Nav.Update(node, {"name": fileinfo.name, "depth": 0}, "conversion");
				resolve({
					ready: false,
					result: {
						src: url,
						name: fileinfo.name,
						url: url,
						extn: "pdf",
						type: Mime.get("pdf"),
						fileId: node.getAttribute("data-fileid"),
						filename: fileinfo.name + ".pdf", // not important, but cloudconvert needs a filename when it isn't handed a blob
					}
				});
			});
		},
		"imgur": function (oembed, fileinfo) {
			return new Promise(function(resolve,reject) {
				var doc = document.implementation.createHTMLDocument(oembed.title);
				doc.documentElement.innerHTML = oembed.code;
				var img = document.createElement("img"),
					a = doc.querySelector("a"),
					text = a.textContent;
				while(a.firstChild)a.removeChild(a.firstChild);
				a.setAttribute("title",text);
				img.setAttribute("src", oembed.image);
				a.appendChild(img);
				fileinfo.payload.html = Handlebars.templates["wrapper-html5"]({
					title: oembed.title,
					description: oembed.description,
					body: doc.querySelector("body").innerHTML,
					format: "imgur",
					normalize: true
				});
				fileinfo.name = _nomoji(oembed.title);
				fileinfo.src = oembed;
				resolve({
					ready: true,
					result: fileinfo
				});
			});
		},
		"slideshare": function (oembed, fileinfo) {
			return new Promise(function (resolve,reject) {
				var doc = document.implementation.createHTMLDocument(oembed.title);
				doc.documentElement.innerHTML = oembed.code;
				var href = doc.querySelector("a").getAttribute("href"); // first <a> always has the link we need
				fileinfo.payload.html = Handlebars.templates["wrapper-iframe"]({
					title: oembed.title,
					description: oembed.description,
					body: "<div id='slides' data-src='" + href + "'></div>",
					format: "slideshare",
					score: ~~oembed.total_slides,
					total_slides: oembed.total_slides
				});
				fileinfo.name = _nomoji(oembed.title);
				fileinfo.src = oembed;
				resolve({
					ready: true,
					result: fileinfo
				});
			});
		},
		"edocr": function (oembed, fileinfo) {
			return Promise.reject("eDocr has no public embed api");
		},
		"wistia": function (oembed, fileinfo) {
			return Promise.reject("Wistia is not yet supported");
		},
		"vzaar": function (oembed, fileinfo) {
			return Promise.reject("Vzaar is not yet supported");
		},
	}

	DocNinja.Plugins.Oembed = function(raw, liElem) {
		return new Promise(function(resolve, reject) {
			var fileInfo = {
				payload: { html: ""},
				source: raw.url.split("\n")[0].trim(),
				name: "",
				kind: "url",
				score: 1
			}
			var fh = new Headers();
			fh.append('pragma','no-cache');
			fh.append('cache-control','no-store');
			fh.append('x-requested-with','fetch');
			fetch("plugins/Oembed/provider.php?url=" + encodeURIComponent(raw.url), {method:'GET',headers:fh}).then(function(response) {
				if (!response) {
					throw new Error("Provider error");
				} else if (response.status !== 200) {
					throw new Error("Error in URL conversion", response);
				} else {
					return response.json();
				}
			}).then(function(obj) {
				if (!obj.providerName) reject("Provider not found");
				var fn = obj.providerName.toLowerCase().replace(/\s/g,"");
				_handlers[fn](obj,fileInfo,liElem).then(function(res) {
					resolve(res);
				}).catch(function(error) {
					console.warn(error);
				 	reject("Provider error");
				});
			}).catch(function (err0r) {
				console.warn(err0r);
				reject("Url was not understood, not found, not yet supported, or was private.");
			});
		});
	};

})(window.DocNinja = window.DocNinja || {});