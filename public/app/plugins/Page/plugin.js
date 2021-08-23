(function (DocNinja, undefined) {

	DocNinja.Page = (function() {

		function _getDocumentDimensions(doc) {
			var width = 0, height = 0;
			[].forEach.call(doc.querySelectorAll("style"), function (el) {
				var tc = el.textContent;
				if (tc.indexOf(".h0{height")!==-1) {
					height = Math.ceil(parseFloat(tc.match(/\.h0\{height\:([^}]*)px\;\}/)[1])),
					width = Math.ceil(parseFloat(tc.match(/\.w0\{width\:([^}]*)px\;\}/)[1]));
				}
			});
			return [width,height];
		}

		// figure out the average colour of a document by looking at its background image
		function _getAverageColour(doc) {
			return new Promise(function (resolve,reject) {
				var imgEl = new Image();
				imgEl.onload = function () {
				    var blockSize = 16, // only visit every N pixels for speed
				        canvas = document.createElement('canvas'),
				        context = canvas.getContext && canvas.getContext('2d'),
				        i = -4,
				        length,
				        rgb = {r:0,g:0,b:0},
				        count = 0,
				        defaultValue = "000000";

				    if (!context) resolve(returnValue);
				    canvas.width = imgEl.naturalWidth || imgEl.offsetWidth;
				    canvas.height = imgEl.naturalHeight || imgEl.offsetHeight;
					context.drawImage(imgEl, 0, 0);
					try {
						var data = context.getImageData(0, 0, canvas.width, canvas.height);
					} catch(e) { // e.g. cross-domain access, w/h was zero
						resolve(defaultValue); // rather than reject
					}
					length = data.data.length;
				    while ( (i += blockSize * 4) < length ) {
				        ++count;
				        rgb.r += data.data[i];
				        rgb.g += data.data[i+1];
				        rgb.b += data.data[i+2];
				    }

				    // return a normalised colour hex string, using ~~ to floor division
			    	resolve([
			    		("0" + Math.max(0, Math.min(255, parseInt(~~(rgb.r/count),10))).toString(16)).substr(-2),
			    		("0" + Math.max(0, Math.min(255, parseInt(~~(rgb.g/count),10))).toString(16)).substr(-2),
			    		("0" + Math.max(0, Math.min(255, parseInt(~~(rgb.b/count),10))).toString(16)).substr(-2)
			    	].join(""));
				}
				imgEl.src = doc.querySelector("img.bi").getAttribute("src");
		    });
		}

		// figure out the most used colour of a document by looking at its background image
		function _getDominantColour(fileid, doc) {
			return new Promise(function (resolve,reject) {
				var imgEl = new Image(),
					colorThief = new ColorThief(); // https://github.com/lokesh/color-thief
				imgEl.onload = function () {
					var rgb;
					try {
						rgb = colorThief.getColor(imgEl);
					} catch(error) { // Fallback to white
						rgb = [255,255,255];
					}
			    	resolve({"id":fileid,"colour":[
			    		("0" + rgb[0].toString(16)).substr(-2),
			    		("0" + rgb[1].toString(16)).substr(-2),
			    		("0" + rgb[2].toString(16)).substr(-2)
			    	].join("")});
				}
				var backgroundImage = doc.querySelector("img.bi");
				if (backgroundImage) {
					imgEl.src = backgroundImage.getAttribute("src");
				} else {
					var rgb = [255,255,255];
					resolve({"id":fileid,"colour":[
			    		("0" + rgb[0].toString(16)).substr(-2),
			    		("0" + rgb[1].toString(16)).substr(-2),
			    		("0" + rgb[2].toString(16)).substr(-2)
			    	].join("")});
				}
		    });
		}

		// an alternate to colorThief ...
		// _getPalette = (image) => {
		// 	  const canvas = document.createElement('canvas');
		// 	  const size = 16;
		// 	  const maxPaletteSize = 10;
		// 	  const context = canvas.getContext('2d');
		// 	  const pixelArray = []; // Contains arrays of [red, green, blue, freqency]
		// 	  const palette = []; // Contains arrays of [red, green, blue]

		// 	  canvas.width = size;
		// 	  canvas.height = size;
		// 	  context.imageSmoothingEnabled = false;
		// 	  context.drawImage(image, 0, 0, size, size);

		// 	  // Format is [r,g,b,a,r,g,b,a,...]
		// 	  const pixels = context.getImageData(0, 0, size, size).data;

		// 	  for (let i = 0; i < pixels.length / 4; i++) {
		// 	      const offset = i * 4;
		// 	      const red = pixels[offset];
		// 	      const green = pixels[offset + 1];
		// 	      const blue = pixels[offset + 2];
		// 	      const alpha = pixels[offset + 3];
		// 	      let matchIndex = undefined;

		// 	      // Skip this pixel if transparent or too close to white
		// 	      if (alpha === 0 || (red > 240 && blue > 240 && green > 240)) {
		// 	        continue;
		// 	      }

		// 	      // See if the color is already stored
		// 	      for (let j = 0; j < pixelArray.length; j ++) {
		// 	        if (red === pixelArray[j][0] &&
		// 	            green === pixelArray[j][1] &&
		// 	            blue === pixelArray[j][2]) {
		// 	          matchIndex = j;
		// 	          break;
		// 	        }
		// 	      }

		// 	      // Add the color if it doesn't exist, otherwise increment frequency
		// 	      if (matchIndex === undefined) {
		// 	        pixelArray.push([red, green, blue, 1]);
		// 	      } else {
		// 	        pixelArray[matchIndex][3]++;
		// 	      }
		// 	  }

		// 	  // Sort pixelArray by color frequency
		// 	  pixelArray.sort(function(a, b) {
		// 	    return b[3] - a[3];
		// 	  });

		// 	  // Fill array with [red, green, blue] values until maxPaletteSize or
		// 	  // until there are no more colors, whichever happens first
		// 	  for (let i = 0; i < Math.min(maxPaletteSize, pixelArray.length); i++) {
		// 	    palette.push([pixelArray[i][0], pixelArray[i][1], pixelArray[i][2]]);
		// 	  }

		// 	  return palette;
		// 	};

		return {

			ModifyIframeScrubber: function(obj, state) { // if state = true remove .noscrub
				var doc = document.implementation.createHTMLDocument(obj.name);
				doc.documentElement.innerHTML = obj.payload.html;
				doc.querySelector("body").classList[state ? "remove" : "add"]("noscrub");
				console.dir(doc.body.classList);
				obj.payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
				return obj;
			},

			/* wrapper-iframe.handlebars modifier */
			ModifyIframeBackgroundColour: function (obj, colour) {
				var doc = document.implementation.createHTMLDocument(obj.name);
				doc.documentElement.innerHTML = obj.payload.html;
				[].forEach.call(doc.querySelectorAll("style"),function(el) {
					var tc = el.textContent;
					if (tc.indexOf("body {")!==-1) {
						el.textContent = tc.replace(/background\-color\:(?:[^;]*);/,'background-color:#'+colour+';');
					}
				});
				obj.payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
				obj.payload.backgroundColour = colour;
				return obj;
			},

			/* when you recolour a page using the colour picker overlay */
			ModifyPageBackgroundColour: function (obj, colour) {
				var doc = document.implementation.createHTMLDocument(obj.name),
					split = obj.payload.hasOwnProperty("split") && obj.payload.split || false;
				doc.documentElement.innerHTML = obj.payload.html;
				var bgmod = doc.getElementById("pdf-bgmod"),
					node = doc.querySelector("head"),
					ss = doc.createElement("style");
				if (bgmod) bgmod.parentNode.removeChild(bgmod);
				ss.setAttribute("media","screen");
				ss.setAttribute("type","text/css");
				ss.setAttribute("id","pdf-bgmod");
				ss.appendChild(doc.createTextNode(Handlebars.templates["style-pdf-bgmod"]({split:split,backgroundColour:colour})));
				node.appendChild(ss);
				obj.payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
				obj.payload.backgroundColour = colour;
				return obj;
			},

			ModifyAllPageBackgroundColours: function (colour) {
				var promises = new Array();
				localforage.iterate(function(val, key, i) {
					if (key.startsWith('file')) {
						var obj = val;
						switch(obj.kind) {
							case "url":
								obj = DocNinja.Page.ModifyIframeBackgroundColour(obj, colour);
								break;
							case "file":
								obj = DocNinja.Page.ModifyPageBackgroundColour(obj, colour);
								break;
							case "plugin": case "image":
								obj.payload.backgroundColour = colour;
								break;
							default:
								alert("?!?!!?!?!");
								console.warn(obj);
						}
						promises.push(localforage.setItem(key, obj));
					}
				});
				return Promise.all(promises);
			},

			/* during a split operation, find the dominant colour and save the data */
			SetDefaultBackground: function (fileid, obj) {
				return new Promise(function(resolve, reject) {
					var doc = document.implementation.createHTMLDocument(obj.name);
					doc.documentElement.innerHTML = obj.payload.html;

					// _getAverageColour(doc)
					_getDominantColour(fileid, doc)
					.then(function (res) {
						DocNinja.Page.ModifyPageBackgroundColour(obj, res.colour);
						// store (for the first time) the split payload
						localforage.setItem(res.id, obj).then(function(val){
							val.id = fileid;
							resolve(val);
						});
					});
				});
			},

			// override the positioning control of a document (left, auto-center)
			ModifyDocumentCentering: function (obj, position) {
				if (typeof position === "undefined") position = "left";
				if (!obj.payload.hasOwnProperty("split")) return obj; // don't modify non-split documents

				var doc = document.implementation.createHTMLDocument("foo"),
					pagetype = obj.src&&obj.src.fetch&&obj.src.fetch.kind ? obj.src.fetch.kind : obj.type?obj.type:"";
				doc.documentElement.innerHTML = obj.payload.html;

				[].forEach.call(document.querySelectorAll("#styleTransformScaleCenter, #transformScaleStretch, #transformHorizontalScale"), function(node) {
					node.parentNode.removeChild(node);
				});

				delete obj.payload.layout;
				if (position === "center") {
					obj.payload.layout = position;
					doc.querySelector("head").insertAdjacentHTML("beforeend", Handlebars.templates["style-transform-scale-center"]({backgroundColour:obj.payload.backgroundColour}));
					doc.querySelector("body").insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-scale-center"]({}));
				} else if (position === "left") {
					obj.payload.layout = position;
					doc.querySelector("head").insertAdjacentHTML("beforeend", Handlebars.templates["style-transform-horizontal-scale"]({backgroundColour:obj.payload.backgroundColour}));
					doc.querySelector("body").insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-horizontal-scale"]({}));
				}
				obj.payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
				return obj;
			},

			Split: function(node, obj) {
				return new Promise(function(splitResolve, splitReject) {

					// these are going to be true in all copies, so set them once here
					obj.payload.split = true;
					obj.payload.flat = true;

					var doc = document.implementation.createHTMLDocument("foo"),
						docName = obj.name, // before it gets modified
						currentLI = node,
						id = node.getAttribute("data-fileid"),
						_pageBgColour = "ffffff"; // initial background colour

					doc.documentElement.innerHTML = obj.payload.html.replace("<!-- Created by pdf2htmlEX (https://github.com/coolwanglu/pdf2htmlex) -->", "");

					// starts identical for all copies but is modified after save
					obj.payload.backgroundColour = _pageBgColour;

					// gets most of the crug
					doc = DocNinja.PurityControl.CleanSplitPDF(doc, _pageBgColour);

					var pagetype = obj.src&&obj.src.fetch&&obj.src.fetch.kind ? obj.src.fetch.kind : obj.type?obj.type:"";

					if (DocNinja.options.AUTOCENTER &&(pagetype.indexOf("powerpoint")!==-1||pagetype.indexOf("presentation")!==-1)) {
						doc.querySelector("head").insertAdjacentHTML("beforeend", Handlebars.templates["style-transform-scale-center"]({backgroundColour:_pageBgColour}));
						doc.querySelector("body").insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-scale-center"]({}));
					} else if (DocNinja.options.AUTOCENTER) {
						doc.querySelector("head").insertAdjacentHTML("beforeend", Handlebars.templates["style-transform-horizontal-scale"]({backgroundColour:_pageBgColour}));
						doc.querySelector("body").insertAdjacentHTML('beforeend', Handlebars.templates["script-transform-horizontal-scale"]({}));
					}

					// and now start splitting the document
					var container = doc.getElementById("page-container"),
						pageLength = container.querySelectorAll("div[data-page-no]").length,
						promiseHolder = [],
						clone = container.cloneNode(true); // now we have twice as much in ram!

					for (var i=0,pageNo=1;i<pageLength;i++) {

						// will happen pageLength times for iteration 1, but only once from then on
						while (container.firstChild) { container.removeChild(container.firstChild); }

						// update the page title
						doc.querySelector("head > title").textContent = docName + " - Page " + pageNo;

						// move the original page back in (from the clone dom)
						var c = clone.querySelector("#pf"+dec2hex(pageNo)); // faster, marginally than div[data-page-no]
						if (c===null) continue;
						container.appendChild(c);

						// modify obj and save it as a copy ( avoids excess data clones)
						var newId = id + "-" + pageNo;
						obj.name = docName + " - Page " + pageNo;
						if (pageNo>1) obj.original = undefined; // ensure subsequent pages don't contain the original file

						// if we are supporting infinite depth, this is how you do it
						// obj.depth = (i===0) ? currentDepth : (currentDepth+1);
						obj.depth = (i === 0) ? 0 : 1;
						obj.payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;

						var cloneOfObj = Clone(obj);
					 	promiseHolder.push(DocNinja.Page.SetDefaultBackground(newId, cloneOfObj));

						pageNo += 1;
					}
					Promise.all(promiseHolder).then(function(arr) {
						arr.forEach(function(resObj){
							var li = DocNinja.PurityControl.Nav.Add(DocNinja.navItems, resObj.id, resObj, currentLI.nextSibling, "ready");
							currentLI = li;
						});
						// mark objects for garbage collection asap
						clone = null; doc = null;
						splitResolve();
					});
				}); // split promise
			},

			ModifyDocumentTransforms: function(fileKey, obj, transform, applyAll) {
				return new Promise(function(transformResolve, transformReject) {
					// obj.fileId will have the format
					// file-(some-value)-N
					// each of the siblings of this split will have the same obj.fileId but their file KEY will change
					let keys = [[fileKey, obj]], transforms = [];
					localforage.iterate(function(value,key) {
						if (applyAll && value.hasOwnProperty('fileId') && value.fileId === obj.fileId && key !== fileKey) {
							keys.push([key,value]);
						}
					})
					.then(function() {
						keys.map(function(item) {
							transforms.push(new Promise(function(itemResolve, itemReject) {
								let doc = document.implementation.createHTMLDocument(item[1].payload.name);
								doc.documentElement.innerHTML = item[1].payload.html;
								item[1].payload['transform'] = transform;
								DocNinja.PurityControl.ApplyTransform(doc, transform);
								item[1].payload.html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
								localforage.setItem(item[0], item[1]).then(function() {
									itemResolve(item[0]);
								});
							}));
						});
						Promise.all(transforms)
						.then(function(result) {
							transformResolve(true);
						})
						.catch(function(error) {
							transformReject(error);
						});
					});
				});
			}
		}

	})();

})(window.DocNinja = window.DocNinja || {});