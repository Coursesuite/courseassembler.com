;(function(DocNinja, $, App, undefined) {
	//testcomment
	DocNinja.KLOUDLESS_APP_ID = atob("VU5oR1p2bXpzc3VQQ25Kdm5NZ19FYlF5MVo5a0s1el9nUU1PRk01cXhUU0VnSmxx"), // https://developers.kloudless.com/applications/ninjasuite/details;
	DocNinja.KLOUDLESS_INPUT = window.Kloudless.explorer({app_id: DocNinja.KLOUDLESS_APP_ID}),
	DocNinja.KLOUDLESS_OUTPUT = window.Kloudless.explorer({app_id: DocNinja.KLOUDLESS_APP_ID});

	// cache frequently used selectors
	DocNinja.options = {
		pageWrap: document.getElementById( 'pagewrap' ),
		body: document.getElementsByTagName("body")[0],
		header: document.getElementById("banner"),
		nav: document.getElementById("tabs"),
		scrollArea: document.getElementById("scroll-area"),
		scrollAreaObj: new GeminiScrollbar({
		    element: document.getElementById("scroll-area"),
		    forceGemini: true
		}).create(),
		containers: [].slice.call( document.querySelectorAll( '#pagewrap div.container' ) ),
		tabSpeed: 398,
		bpx: ['5%','10%','20%','30%','60%','70%','80%','90%'],
		bpy: ['5%','center','bottom'],
		counters: [].slice.call( document.querySelectorAll( '.count-total' )),
		countSet: document.getElementById( 'count-set' ),
		fields: document.getElementById( 'fields' ),
		preview: document.getElementById( 'preview' ),
		courseNameField: document.querySelector( 'input[name="option-course-name"]' ),
		copyrightField: document.querySelector( 'input[name="option-course-copyright"]' ),
		descriptionField: document.querySelector( 'textarea[name="option-course-description"]' ),
		ninjas: [],
		ifrCache: {w:100,h:100},
		pasteUrlObj: document.getElementById("paste-url"),
		_pageIndex: 0,
		_pageCache: [],
		MUTED: false,
		AUTOOPTIMISE: true,
		AUTOSPLIT: true,
		AUTOCENTER: true,
		loader: new SVGLoader( document.getElementById( 'loader' ), { speedIn : 199, easingIn : mina.easeinout } ),
		snd: new Audio("swoosh_quiet.mp3"),
		sndpop: new Audio("pop.mp3"),
		sndtrash: new Audio("crumple.mp3"),
		pageBackgroundColour: '#ace1fc',
	};

	DocNinja.navItems = document.getElementById( 'nav-item-list' );

	// function abortRead() {
	// 	reader.abort();
	// }

	function errorHandler(evt) {
		switch(evt.target.error.code) {
			case evt.target.error.NOT_FOUND_ERR:
				alert('File Not Found!');
				break;
			case evt.target.error.NOT_READABLE_ERR:
				alert('File is not readable');
				break;
				case evt.target.error.ABORT_ERR:
				break; // noop
			default:
				alert('An error occurred reading this file.');
		};
	}


/* -----------------------------------------

	browser resize event handler

----------------------------------------- */

	// style containers to fit browser; additionally size internal elements if required
	DocNinja.routines = {
		Resize: sizeHax,
		// MoveNinja: function () {
		// 	$(DocNinja.options.containers).css("background-image","none").filter(".show").css({
		// 		"background-image": "url('" + randomElement(DocNinja.options.ninjas) + "')",
		// 		"background-position": randomElement(DocNinja.options.bpx) + " " + randomElement(DocNinja.options.bpy)
		// 	});
		// },
		PersistSettings: function(source) {
			window.gatherSettings().then(function(cache) {
			 	// localforage.config({
			 	//     name: 'DocumentNinja'
			 	// });
			 	//console.log("persisting settings", cache, source);
			 	localforage.setItem("settingsCache", cache);
			 	localforage.setItem("bodyclases", document.body.className);
			});
		},
		Statistics: function(destination) {
			// 		localforage.getItem("settingsCache").then(function(obj) {
			// 			var data = {};
			// // minifyjs doesn't fart syntax yet
			// //			Object.keys(obj).forEach(key => { data[obj[key].name] = obj[key].value; });
			// 			Object.keys(obj).forEach(function(key) { data[obj[key].name] = obj[key].value; });
			// 			data["app_key"] = "docninja";
			// 			data["destination"] = destination;
			// 			data["tier"] = App.Tier;
			// 			data["hash"] = Layer.url.split("/").pop();
			// 			$.ajax({
			// 			  beforeSend: function(jqXHR, settings) {
			// 			    jqXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			// 			  },
			// 			  method: 'POST',
			// 			  url: App.Home + "statistics/",
			// 			  data: data,
			// 			  crossDomain:true,
			// 			});
			// 		});
		}
	}

	var sizeHax = debounce(function() {
		var p = document.querySelector('div.container.show');

		// 	h = window.innerHeight - tabs.offsetHeight - DocNinja.options.header.offsetHeight,
		// 	divs = DocNinja.options.pageWrap.querySelectorAll("div.container");
		// if (!p) return; // maybe container isn't visible yet?
		// p.scrollTop = 0;
		// // destroy_preview();
		// for (var i=0,j=divs.length;i<j;i++) {
		// 	divs[i].style.height = h + "px";
		// }
		switch (p.getAttribute("id")) {
			case "add-documents":

				DocNinja.options.ifrCache['w'] = $(preview).width();
				DocNinja.options.ifrCache['h'] = $(preview).height();

				DocNinja.options.scrollAreaObj.update();

				// var sa = $("#scroll-area");
				// if (sa.length) {
				// 	var st = sa.scrollTop();
				// 	sa.slimScroll({
				// 		destroy:true
				// 	}).slimScroll({
				// 		height: sa.height(),
				// 		scrollTo: st
				// 	});
				// }
				break;

			case "change-settings":
				if (DocNinja.options.courseNameField.value.trim() === "") {
					var courseNameMaybe = $("li[data-fileid]:eq(0)", DocNinja.navItems).find("a[data-action='preview']").text();
					//console.dir(courseNameMaybe);
					if (courseNameMaybe.length) {
						DocNinja.options.courseNameField.value = courseNameMaybe;
					}
				}

				// positionSvgPreviewIframe();
				// update_preview();

				break;


		}
	}, 250);
	// bind resize trigger
	window.addEventListener('resize', DocNinja.routines.Resize, false);

	/* select one or more files using an upload control */
	window.manualUpload = function(files) {
		hideOverlays();
		DocNinja.fileConversion.HandleUpload(files);
	}

	/*
	 *	TODO
	 *	Separate the code for handling imports so that it invokes a separate routine instead
	 */
	window.manualImport = function(files) {
		hideOverlays();
		DocNinja.fileConversion.HandleUpload(files);
	}


	// store the item order by just caching the whole html... significantly faster
	// TODO: stop caching everything, rebuild nodes independantly
	function setItemOrder() {
		DocNinja.PurityControl.Nav.Check();
		localforage.setItem("order", DocNinja.navItems.innerHTML);
		DocNinja.routines.PersistSettings("setItemOrder");
	}

	// update the count of pages on the settings / completion area, which is based on the number of files
	function checkCounters() {
		var current = DocNinja.options.countSet.value;
		DocNinja.options.countSet.innerHTML = "";
		var fl = $("li[data-fileid]").length;
		for (var i=0;i<fl;i++) {
			var opt = document.createElement("option");
			opt.innerHTML = i+1;
			if (i==current-1) opt.setAttribute("selected", true);
			DocNinja.options.countSet.appendChild(opt);
		}
		$(DocNinja.options.counters).text(fl);
	}

	function checkDummyItem() {
		$("li[data-fileid]:empty", DocNinja.navItems).remove(); // something went wrong
		var liCount = DocNinja.navItems.querySelectorAll("li").length;
		if (0===liCount) {
			$(DocNinja.navItems).append($("<li>",{class:"dummy-item"}).text("Nothing here yet :("));
			localforage.removeItem("order"); // ensure that if we are adding the empty item, that cache is empty too
		}
		var notDummy = DocNinja.navItems.querySelectorAll("li:not(.dummy-item)").length;
		if (notDummy) {
			var dummyItem = DocNinja.navItems.querySelectorAll('.dummy-item');
			if (dummyItem.length) dummyItem.remove();
		}
	}

	// expose some functions out of closure (used by CancelConversion)
	// refactor to make these into public methods
	window.setItemOrder = setItemOrder;
	window.checkDummyItem = checkDummyItem;
	window.checkCounters = checkCounters;

	//  go through various forms and serialize them; return everything combined
	// do basic type conversion and value patching when completion setting is set to "last"
	window.gatherSettings = function () {
		var data = [],
			patch_count = false;
		$.each($("form").serializeArray(), function (idx, value, ar) {
			if ($.isNumeric(value.value)) value.value = parseFloat(value.value);
			if (value.value === "false") value.value = false;
			if (value.value === "true") value.value = true;
			if (value.name === "rule" && value.value === "last") patch_count = true;
			data.push(value);
		});
		if (patch_count) {
			for (prop in data) {
				if (data[prop].name === "enough-count")
					data[prop].value = document.querySelectorAll('#count-set>option').length;
			}
		}
		// $(".settings-panel").each(function(index, node) {
		// 	$.each($(node).closest("form").serializeArray(), function (idx, value, ar) {
		// 		data.push(value);
		// 	});
		// });
		//console.dir(data);
		return Promise.resolve(data);
	};



	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							TEMPLATE PREVIEW
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */

	// function update_preview() {
	// 	if (App.Tier < 2) return;
	// 	function display() {
	// 		if (DocNinja.options._pageIndex > DocNinja.options._pageCache.length - 1) DocNinja.options._pageIndex = 0;
	// 		if (DocNinja.options._pageIndex < 0) DocNinja.options._pageIndex = DocNinja.options._pageCache.length - 1;
	// 		localforage.getItem(DocNinja.options._pageCache[DocNinja.options._pageIndex], function (err, value) {
	// 			if (!value) return;

	// 			var blob = new Blob([(value.kind && value.kind == "image") ? "<!doctype html><html><body><img src='" + value.payload.image + "' /></body></html>" : value.payload.html],{type:"text/html"});
	// 			var burl = URL.createObjectURL(blob);
	// 			document.getElementById("layout-preview-iframe").setAttribute("src",burl);
	// 			setTimeout(URL.revokeObjectURL,100,burl);

	// 			// 	framedoc =  frame.contentDocument || frame.contentWindow.document,
	// 			// 	framewin = frame.contentWindow;
	// 			// framedoc.open(); framedoc.write(source); framedoc.close();
	// 			// [].forEach.call(framewin.document.querySelectorAll("script"), function (el, idx) {
	// 			// 	framewin.eval(el.textContent); // execute script tags in the content of the iframe
	// 			// });
	// 		});
	// 	};
	// 	// if (DocNinja.options._pageCache.length == 0) {
	// 	// 	localforage.iterate(function (value, key) {
	// 	// 		if (value.payload) {
	// 	// 			DocNinja.options._pageCache.push(key);
	// 	// 		}
	// 	// 	}).then(function () {
	// 	// 		display();
	// 	// 	});
	// 	// } else {
	// 	// 	display();
	// 	// }
	// }

	// function destroy_preview() {
	// 	// if (App.Tier < 2) return;
	// 	// DocNinja.options._pageCache = [];
	// 	// DocNinja.options._pageIndex = 0;
	// 	// var frame = document.getElementById("layout-preview-iframe"),
	// 	// 	framedoc =  frame.contentDocument || frame.contentWindow.document;
	// 	// framedoc.open(); framedoc.write(""); framedoc.close();
	// }

	// function positionSvgPreviewIframe() {

	// 	var cr = document.getElementById("svg-preview-iframe").getBoundingClientRect();
	// 	var svg = document.getElementById('layout-chooser').getBoundingClientRect();
	// 	$("#layout-preview-iframe").css({
	// 		"top": cr.top - svg.top + "px",
	// 		"left": cr.left - svg.left + "px",
	// 		"width": cr.width + "px",
	// 		"height": cr.height + "px"
	// 	});

	// }




	/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
							KLOUDLESS LOAD FILES
	--------------------------------------------------------------------------------------------------------------------------------------------------------- */

	DocNinja.KLOUDLESS_INPUT.on("success", function (files) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://api.kloudless.com/v1/accounts/" + files[0].account + "/storage/files/" + files[0].id + "/contents", true);
		// xhr.setRequestHeader("Authorization", "Bearer " + files[0].bearer_token.key);
		xhr.setRequestHeader("Authorization",atob("QVBJS2V5IGo2OXZCMW5ZcEFkZV9PM2pySDJPVzJfWTVJYk9ZU3VwaHR2NV9qM0pkc2hkS0hCWg=="));
		xhr.responseType = "arraybuffer";
		xhr.onload = function(oEvent) {
			if (xhr.status === 200) {
				var content = new Blob([xhr.response], {type: files[0].mime_type});
				DocNinja.fileConversion.HandleCloudUpload(files[0].name, content, files[0].mime_type);
			}
		};
		xhr.send();
	});


	DocNinja.reloadSettingsFromCache = function(cache) {
		if (cache) {  //console.dir(cache);
			for (var i=0,k=Object.keys(cache);i<k.length;i++){
				var name = cache[k[i]].name,
					value = cache[k[i]].value;

				var $inp = $("input[name='" + name + "']");
				//console.log(name,$inp.length,">",value,"<");

				if ($inp.is(":radio")) {
					$inp.filter("[value='" + value + "']").prop("checked", true);
				} else {
					$inp.val(value);
				}
				// if (name === "option-course-description") {
				// 	$("#ocd").val(value);
				// }
				if (name === "navbg") {
					$inp.get(0).jscolor.fromString(value);
					window.colourpreview($inp.get(0).jscolor);
				}
				if (name === "template") {
					selectTemplate(value);
				}
			}
		}
		// if (DocNinja.options.courseNameField.value.length == 0) DocNinja.options.courseNameField.value = ""; // leave it blank
		if (DocNinja.options.copyrightField.value.length == 0) DocNinja.options.copyrightField.value = $("<div>&copy; Anonymous " + new Date().getFullYear() + ". All rights reserved.</div>").text();
		if (DocNinja.options.descriptionField.value.length == 0) DocNinja.options.descriptionField.value = "This course was assembled at www.courseassembler.com";
	}

 	// fyi jquery normalises e.keyCode to e.which
	$("#nav-colour").bind('keypress keydown keyup', function(e) {
		if (e.which === 13) {e.preventDefault();} // prevent enter key from doing wierd things

	});
	// preview the selected colour by restyling the layout preview
	window.colourpreview = function(picker) {
		var style = document.getElementById("fiddle");
		style.innerHTML = "";
		style.appendChild(document.createTextNode(
		    "#nav-selection svg path," +
		    "#nav-selection svg rect {" +
		    "fill:" + picker.toRGBString() + ";stroke:#000000;stroke-width:4px;stroke-opacity:0.75;" +
		    "}" +
		    "#nav-selection svg circle {" +
		    "stroke: " + picker.toRGBString() + ";" +
		    "}"
		));
		$("input[name='navtext']").val(picker.isLight() ? "0,0,0" : "255,255,255");
	} // init()

	window.colourpersist = function (picker) {
		DocNinja.routines.PersistSettings("colourpersist");
	}

	// if ($("#tab-design-pro").length) $("#tab-design-pro figure:first").trigger("click");

	// http://stackoverflow.com/a/3943023/1238884
	// function getMatchingColour(colour) {
	// 	return (parseInt(colour.replace('#', ''), 16) > 0xffffff / 2) ? '#000' : '#fff';
	// }
	//	(rgb, 149)
	// function getContrastingColour(rgb, threshold) {
	// 	return ((rgb.r*0.299 + rgb.g*0.587 + rgb.b*0.114) > threshold) ? '0,0,0' : '255,255,255';
	// }

	$("#nav-selection").on("click", "figure", function (e) {
		selectTemplate(this.dataset.name);
		DocNinja.routines.PersistSettings("click figure");
	});

	function selectTemplate(name) {
		if (!name.length) return;
		$("input[name='template']").val(name);
		$("#nav-selection figure").removeClass("selected");
		$("#nav-selection figure").filter("[data-name='" + name + "']").addClass("selected");
	}

	// $(".design-tabs").on("click", "a", function (e) {
	// 	e.preventDefault();
	// 	$(e.target).addClass('selected').siblings('a').removeClass('selected');
	// 	$(e.target.getAttribute("href")).addClass('selected').siblings('div').removeClass('selected');
	// 	// if (e.target.getAttribute("href")!=="#tab-advanced-design") DocNinja.EditHandlers.UnloadCodeMirror(true);
	// 	if (e.target.getAttribute("href") === "#tab-design-pro") $("#tab-design-pro figure:first").trigger("click");
	// });
	// $("#tab-design-pro").on("click", "figure", function (e) {
	// 	$(this).addClass("selected").siblings("figure").removeClass("selected");
	// });
	// $("#tab-design-advanced").on("click", "a[data-loader]", function (e) {
	// 	e.preventDefault();
	// 	DocNinja.EditHandlers.LoadCodeMirror(e.target.getAttribute("data-loader"));
	// });

	/*----------------------------------------------------------------------------------------------------------------------------------------------------------
							APPLICATION START
	----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	(function () {

		// window.scrollTo(0,0);
		triggerResize();

		// for speed and simplicity, we cache the document list
		localforage.getItem("order", function core_order_get(error, value) {
			// console.log("order",value);
			value = DocNinja.Navigation.Upgrade(value);
			if (null !== value) DocNinja.navItems.insertAdjacentHTML('afterbegin', value);
			$("li",DocNinja.navItems).removeClass("selected");
			DocNinja.PurityControl.Nav.Check();
		});

		localforage.getItem("settingsCache", function core_cache_get(error, value) {
			if (null === value) {
				$("button[data-action='add-content']").click();
			} else {
				DocNinja.reloadSettingsFromCache(value);
			}
		});

		// settings page radio buttons highlight container label
		// $("label").on("click", ":radio", function (e) {
		// 	var $e=$(e.delegateTarget);
		// 	$e.closest("section").find("label").removeClass("active");
		// 	// $e.closest(".grid").find("label").removeClass("active");
		// 	$e.addClass("active");
		// 	// update_preview();
		// 	DocNinja.routines.PersistSettings();
		// });
	// $("input","#basic-options").on("change", function() {
	// 	DocNinja.routines.PersistSettings();
	// });

		// entering a value on a form should persist the form, and check some field logic
		$("input", "form").on("change blur", function (e) {
			// Disable preview ninja for IMS packages
			var previewButton = $("[data-destination='preview']");
			if (e.target.dataset.hasOwnProperty("compat")) {
				previewButton.addClass("disabled");
				$("#nav-selection").addClass("hidden");
			} else {
				previewButton.removeClass("disabled");
				$("#nav-selection").removeClass("hidden");
			}
			DocNinja.routines.PersistSettings("change blur");
		});

		// tab click handlers
		// $(DocNinja.options.nav).on("click","a[data-tab]", function (e) {
		// 	e.preventDefault();
		// 	// DocNinja.EditHandlers.Unload (false); // unbind any editors but persist their data
		// 	loader.show(); // svgloader data-opening
		// 	classie.removeClass(document.body, "settings");
		// 	if (!DocNinja.options.MUTED) snd.play(); // ninja sword sound to match loader effect
		// 	DocNinja.filePreview.Reset(); // and do some garbage collection
		// 	// destroy_preview(); // don't need this memory overhead
		// 	$("li",DocNinja.navItems).removeClass("selected");
		// 	setTimeout( function() {
		// 		$("a", DocNinja.options.nav).removeClass("current");
		// 		$("div.container", DocNinja.options.pageWrap).removeClass("show").css("background-image","none");
		// 		var tgt = $(e.target).addClass("current"),
		// 			tab = tgt.attr("data-tab");
		// 		$("#" + tab).addClass("show");
		// 		moveNinja();
		// 		triggerResize();
		// 		loader.hide();
		// 		DocNinja.routines.PersistSettings();
		// 	}, DocNinja.options.tabSpeed );
		// });

		// $("#completion-help").click(function (e) {
		// 	e.preventDefault();
		// 	$("#its-complicated").addClass("visible");
		// });

		// $(".box>a", "#its-complicated").click(function (e) {
		// 	$("#its-complicated").removeClass("visible");
		// });

		/* ---------------------------------------------------------------------------------------------------------------------------------------------------------
								FILE DROP HANDLER
		--------------------------------------------------------------------------------------------------------------------------------------------------------- */
		if (window.File && window.FileList && window.FileReader) { // if we allow dropping and acccessing the data
			if ((new XMLHttpRequest()).upload) { // not that we upload, this is an opera-incompatibility-check

				var dragHandler = {};
				//	thisObj = undefined;
				dragHandler.IsOver = false;
				dragHandler.DragEnter = function (e) {
					if (e.dataTransfer.effectAllowed == "move") return;
					e.preventDefault();
					dragHandler.IsOver=true;
					setTimeout(function(){dragHandler.IsOver=false},0);
					classie.addClass(document.body,"drag-over");
				};
				dragHandler.DragOver = function (e) {
					e.preventDefault();
				};
				dragHandler.DragLeave = function (e) {
					if (e.dataTransfer.effectAllowed == "move") return;
					if (!dragHandler.IsOver) {
						classie.removeClass(document.body,"drag-over");
					}
					dragHandler.IsOver = false;
				};

				dragHandler.LoadFile = function (elem, obj) {
					(function (li, file) {
						DocNinja.PurityControl.Nav.Update(li, {"name": "Reading file..."}, "import");
						var graph = li.querySelector("progress");
						var graphSpan = graph.getElementsByTagName("span")[0];

						var mime = file.type, // might be blank, i.e. Chrome on Windows as of 20151102; more info http://stackoverflow.com/questions/11182968
							extn = file.name.substr(file.name.lastIndexOf(".") + 1).toLowerCase();
						// if (0===mime.length)
						mime = Mime.get(extn); // trust the extension more than the mime (becasue windows is bad at mime types) .. also means we get predictable results for application/zip variants
						var mimetype = mime.split("/"),
							reader = new FileReader();
						reader.onerror = errorHandler;
						reader.onprogress = function (e) {
							if (e.lengthComputable) {
								var pc = Math.round((e.loaded / e.total) * 100);
								graph.setAttribute("value", pc);
								graphSpan.innerHTML = pc;
							}
						};
						reader.onabort = function(e) {
							li.remove();

						};
						reader.onloadstart = function(e) { // start
						};
						reader.onload = function(e) { // finish

							// seems like something here is lost, since li no longer is attached to the DOM befre/after conversion
							// console-log(isInDOMTree(li),li); says it is attached before the onload, but now it seems to be detached again somehow.
							// looks like you can only drag one file at a time.

							graph.remove();
							(function (fc) {
								fc.BeginConversion(reader, {files:[{name: file.name, type: mime} ]}, li, mimetype[0], mimetype[1]);
							}(DocNinja.fileConversion));
						}
						if ("zip"===mimetype[1]) {
							reader.readAsArrayBuffer(file); // obj.files[0]); // JSZip can accept ArrayBuffer
						} else {
							reader.readAsDataURL(file); // obj.files[0]); // base64
						}
					}(elem, obj));

				}
				dragHandler.Drop = function (e) {
					if (e.dataTransfer.effectAllowed == "move") return; // came from Sortable
					// if not the add-documents tab then return
					// if (!document.body.hasClass("add-content")) return;
					e.preventDefault();
					hideOverlays();
					dragHandler.IsOver = false;
					if (e.dataTransfer.files.length) {
						for (var i=0;i<e.dataTransfer.files.length;i++) {

							var li = DocNinja.PurityControl.Nav.Add(DocNinja.navItems, DocNinja.PurityControl.Nav.GetFileId(i), {"depth": 0, "name": "Analysing file ..."});

							// var li = document.createElement("li");
							// li.setAttribute("data-fileid", DocNinja.PurityControl.Nav.GetFileId(i));
							// DocNinja.navItems.appendChild(li);
//							(function (_file) { // shouldn't need the closure here
							dragHandler.LoadFile(li, e.dataTransfer.files[i]);
//							}());
						}
					} else {
						var li = document.createElement("li"),
							obj = {
								id: DocNinja.PurityControl.Nav.GetFileId(0),
								text: e.dataTransfer.getData("text/plain"),
								html: e.dataTransfer.getData("text/html"),
								url: e.dataTransfer.getData("url"),
								list: e.dataTransfer.getData("text/uri-list")
							};
						li.setAttribute("data-fileid", DocNinja.PurityControl.Nav.GetFileId());
						DocNinja.navItems.appendChild(li);
						if (0===obj.url.length && 0!==obj.text.length) {
							obj.url = obj.text; // Firefox populates TEXT instead of URL
						}
						DocNinja.fileConversion.BeginConversion(null, obj, li, "url", "");
					}
				}
				dragHandler.DragStart = function (e) {
					e.dataTransfer.effectAllowed = "move"; // don't let internal links self-drop
				}
				DocNinja.options.body.addEventListener("dragenter", dragHandler.DragEnter, false);
				DocNinja.options.body.addEventListener("dragover", dragHandler.DragOver, false);
				DocNinja.options.body.addEventListener("dragleave", dragHandler.DragLeave, false);
				DocNinja.options.body.addEventListener("drop", dragHandler.Drop, false);
				DocNinja.options.body.addEventListener("dragstart", dragHandler.DragStart, false);
			}
		}


		/* -----------------------------------------
			LEFT-HAND drag to change order
		----------------------------------------- */
		// var sortable =
		Sortable.create(DocNinja.navItems, {
			handle: '.drag-handle',
			animation: 150,
			onEnd: function sortable_drag_end(evt) {
				setItemOrder(); // stores "order" cache
			},
		});

		document.addEventListener("click", globalClickConsumer, false);

		// capture keyboard shortcuts on the add-documents tab
		// enter = begin rename (externally handled)
		// double-delete = trash page
		// up = select previous
		// shift+up = move node up
		// ctrl+shift+up = move to top
		// right/left = indent / outdent
		var pTime=0, kDelta=256, commandKey = false;
		$(document).bind('keyup', function core_keyboard_up(e) {
			if (e.which === 91) commandKey = false;
		})
		$(document).bind('keydown', function core_keyboard_down(e) {
			if (e.which === 91) commandKey = true;
			// backspace, delete, left, up, right, down, enter
			if (!(e.which === 8 || e.which === 46 || e.which === 37 || e.which === 38 || e.which === 39 ||  e.which === 40 || e.which === 13)) return;
			if (!classie.hasClass(document.body, "add-documents")) return;
			if (e.target.nodeName === "INPUT") return;
			var selected = document.querySelector("#nav-item-list>li.selected");
			if (!selected) return;
			//DocNinja.options.keyCode = e.which;
			//console.log("Set keycode", DocNinja.options.keyCode);
			switch (e.which) {
				case 13: // enter
					var n = $(selected).find("a[data-action='preview']");
					if (n.length) renameNode(n.closest('[data-fileid]').attr("data-fileid"), n.get(0));
					break;

				case 8: case 46: // backspace and delete
					var kTime = new Date();
					if (kTime - pTime <= kDelta) {
						var afterwards = $(selected).next("li").length ? $(selected).next("li").find("a[data-action='preview']").get(0) : $(selected).prev("li").length ? $(selected).prev("li").find("a[data-action='preview']").get(0) : null;
						if (afterwards) afterwards.click(); // select next and/or previous if exists
						trashPage(selected.dataset.fileid, e.shiftKey);
						kTime = 0;
					}
					pTime = kTime;
					break;

				case 37: // left arrow
					var n = $(selected).find("a.toggle-switch[data-action='item-decrease']");
					if (n.length) n.get(0).click(); // outdent
					break;

				case 38: // up arrow
					if (e.shiftKey && e.ctrlKey) { // move to top
						$(selected).insertBefore($("#nav-item-list>li:first"));
						setItemOrder();
					} else if (e.shiftKey && $(selected).prev("li").length) { // move up by one
						$(selected).insertBefore($(selected).prev("li"));
						setItemOrder();
					} else { // select previous
						var n = $(selected).prev("li").find("a[data-action='preview']");
						if (n.length) n.get(0).click();
					}
					break;

				case 39: // right arrow
					var n = $(selected).find("a.toggle-switch[data-action='item-increase']");
					if (n.length) n.get(0).click(); // indent
					break;

				case 40: // down arrow
					if (e.shiftKey && e.ctrlKey) { // move to bottom
						$(selected).insertAfter($("#nav-item-list>li:last"));
						setItemOrder();
					} else if (e.shiftKey && $(selected).next("li").length) { // move down by one
						$(selected).insertAfter($(selected).next("li"));
						setItemOrder();
					} else { // seect next
						var n = $(selected).next("li").find("a[data-action='preview']");
						if (n.length) n.get(0).click();
					}
					break
			}
		});

		/* -----------------------------------------
			jquery runtime action handlers
		----------------------------------------- */
		$(function () {

			// set the css variable that us used to determine height placement
			var h = ($("#banner").height() + $("#tabs").height()) + "px";
			document.documentElement.style.setProperty('--bannerHeight', h);

			// toggle settings and persist in body class
			$(document.body).on("change", "input[type='checkbox']", function (e) {
				hideOverlays(false);
				e.preventDefault();
				var action = (e.currentTarget.dataset.action ? e.currentTarget.dataset.action : e.currentTarget.parentNode.dataset.action).replace("toggle-", "");
				document.body.classList.toggle(action);
				localforage.setItem("bodyclases", document.body.className);
				DocNinja.options.MUTED = classie.hasClass(document.body, "mute");
				DocNinja.options.AUTOSPLIT = !classie.hasClass(document.body, "no-autosplit");
				DocNinja.options.AUTOOPTIMISE = !classie.hasClass(document.body, "no-autoresize"),
				DocNinja.options.AUTOCENTER = !classie.hasClass(document.body, "no-autocenter");
			});

			// load 20 ninjas in one svg, but make them into 20 svg images using spooky black magic
			// $.get("svg/poses.svg", function (data) {
			//     $(data).find("g").each(function (a,b) { // each ninja is a group
			// 	    var root = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			// 	    //root.setAttribute("style","visibility:hidden");
			// 	    document.body.appendChild(root); // needs to be part of body so getBBox will return, doesn't have to be visible
			// 		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
			// 		root.appendChild(g);
			// 		$(b).find("path").each(function(c,d){g.appendChild(d)});
			// 		var bbox = g.getBBox();
			// 		root.setAttribute("x", 0);
			// 		root.setAttribute("y", 0);
			// 		root.setAttribute("width", bbox.width);
			// 		root.setAttribute("height", bbox.height);
			// 		root.setAttribute("viewBox",[bbox.x,bbox.y,bbox.width,bbox.height].join(" "));
			// 		var svg = (new XMLSerializer).serializeToString(root);
			// 		DocNinja.options.ninjas.push("data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
			// 		document.body.removeChild(root);
			//     });
			//     DocNinja.routines.MoveNinja(); // init
			// });

			/* -----------------------------------------
				bind download button animation
			----------------------------------------- */
			[].forEach.call(document.querySelectorAll("div[data-destination]"), function (elm, idx) {
				new UIProgressButton(elm, {
					callback: function core_download_button_callback(instance) {
						DocNinja.routines.Statistics(instance.el.getAttribute("data-destination")); //,App);
					},
					onbegin: DocNinja.Downloader.Begin
				});
			});

			/* -----------------------------------------
				LOAD PAGE from cache (local storage)
			----------------------------------------- */
			localforage.config({
			    name: 'DocumentNinja'
			});
			// localforage.getItem("settingsCache", function (err, cache) {
			// 	DocNinja.reloadSettingsFromCache(cache);
			// });
			localforage.getItem("bodyclases", function core_bodyclasses(err, value) {
				if (value) document.body.className = value;
				DocNinja.options.MUTED = classie.hasClass(document.body, "mute");
				DocNinja.options.AUTOSPLIT = !classie.hasClass(document.body, "no-autosplit");
				DocNinja.options.AUTOOPTIMISE = !classie.hasClass(document.body, "no-autoresize");
				DocNinja.options.AUTOCENTER = !classie.hasClass(document.body, "no-autocenter");
			});

		});

		// mouse over one element in a group should hilight the group
		// $("[data-group]").hover(function() {
		// 	$("[data-group='" + $(this).attr("data-group") + "']").addClass("hover-animation");
		// }, function () {
		// 	$("[data-group]").removeClass("hover-animation");
		// }).on("click", function (e) {
		// 	e.preventDefault();
		// 	$("[data-group").removeClass("hover-animation selected");
		// 	$("[data-group='" + $(this).attr("data-group") + "']").addClass("selected");
		// 	$("input[name='layout']").val($(this).attr("data-group"));

		// 	DocNinja.routines.PersistSettings();
		// });

		// previous button functions - no reason these can't work
		// $("a[data-action='precede']").on("click", function (e) {
		// 	DocNinja.options._pageIndex -= 1;
		// 	update_preview()
		// });
		// $("a[data-action='advance']").on("click", function (e) {
		// 	DocNinja.options._pageIndex += 1;
		// 	update_preview()
		// });

	})();

})(window.DocNinja = window.DocNinja || {}, jQuery, App);

