(function (ROOT, undefined) {

	ROOT.Plugins = ROOT.Plugins || {};
	var methods = ROOT.Plugins.Theme = ROOT.Plugins.Theme || {};

	var nav_cache = [],
		presets = [];


	methods.loadPreset = function(name) {
		document.querySelector('.themePreviewOptions > .fields').empty();
		updateSettings(presets[name]);
		document.getElementById('colours').submit();
	}

	function clearNavCache() {
		nav_cache = [];
	}

	function getNavCache() {
		return new Promise(function(resolve,reject) {
			if (nav_cache.length) {
				resolve();
			} else {
				localforage.iterate(function (value, key, iterationNumber) {
					if (key.indexOf("file-") != -1) {
						nav_cache.push({
							"index": iterationNumber,
							"title": $.trim($("li[data-fileid='" + key + "']").text().replace(/\s+/g," ")),
							"score": ~~value.score||1,
							"content": ("youtube vimeo soundcloud slideshare".indexOf(value.format)!=-1) ? "media" : value.kind,
							"href": "preview.html?" + key,
							"depth": Math.max(0,+value.depth||0),
							"audio": value.payload.hasOwnProperty("mp3") && value.payload.mp3.length ? md5(value.payload.mp3)+".mp3" : undefined
			         	});
			        }
			    }).then(resolve);
			}
		});
	}

	function updateSettings(json) {
		var container = document.querySelector('.themePreviewOptions > .fields');
		for (area in json) {
			if (area === "base") continue;
			var node = document.createElement('div');
			var fieldset = document.createElement('fieldset');
			var l = document.createElement('legend'); 
			l.textContent = area;
			fieldset.appendChild(l);
			node.appendChild(fieldset);
			for (setting in json[area]) {
				var obj = json[area][setting],
					fieldName = "theme-" + area + "-" + obj.type + "-" + obj.property;
				if (typeof obj === "function") continue;
				fieldset.appendChild(
					fragmentFromString(
						Handlebars.templates["field-" + obj.type]({
							name: fieldName,
							label: obj.label,
							value: obj.value
						})
					)
				);
				container.appendChild(node);
				// attach callback to colour pickers
				if (obj.type === 'picker') BindColourPicker('#' + fieldName, obj.value, function (colour, properties) {
					var contrast = properties.gradientContrast || properties.solidContrast || "#7F7F7F";
					var hidden = properties.node.parentNode.querySelector("input[type='hidden']");
					if (!hidden) {
						hidden = document.createElement('input');
						hidden.type = 'hidden';
						hidden.name = properties.node.id + '-contrast';
						properties.node.parentNode.appendChild(hidden);
					}
					hidden.value = contrast;
					submitForm(properties.node);
				});
			}
		}
	}

	function updatePresets(json) {
		presets = json[0];
		var fieldset = document.querySelector('.themePreviewOptions > .presets > fieldset');
		fieldset.empty().appendChild(
			fragmentFromString(
				Handlebars.templates["theme-preset"](Object.keys(presets))
			)
		);
	}

	methods.update = function() {
		getNavCache()
		.then(function () {
	    	var form = document.getElementById('colours');
	    	form.querySelector('[name="nav"]').value = JSON.stringify(nav_cache);
	    	form.querySelector('[name="course-name"]').value = document.querySelector('[name="option-course-name"]').value || 'course-name';
	    	form.querySelector('[name="course-description"]').value = document.querySelector('[name="option-course-description"]').value || 'course-description';
	    	form.querySelector('[name="course-copyright"]').value = document.querySelector('[name="option-course-copyright"]').value || 'course-copyright';
	    	form.submit();
	    });
	}

	methods.resize = function() {
		var container = document.getElementById('themePreviewContainer');
		container.style.height = (container.offsetWidth * .5625) + 'px';
	}

	methods.init = function() {
		methods.resize();
		clearNavCache();
	}

	methods.start = function() {
		localforage.getItem('settingsCache')
		.then(function(obj) {
			return obj.template || "menu";
		})
		.then(DocNinja.routines.selectTemplate);
	}

	methods.load = function(template) {
		var container = document.querySelector('.themePreviewOptions');
		container.innerHTML = Handlebars.templates["theme-preview-options"]({
									presets: '<p>Presets will be loaded here</p>',
									fields: ''
								});
		return new Promise(function(resolve,reject) {
			fetch('plugins/Theme/themes/' + template + '.json')
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then(function(json) {
				updateSettings(json);
			})
			.then(function() {
				return fetch('plugins/Theme/presets.php?base=' + template)
			})
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then(function(json) {
				updatePresets(json);
			})
			.then(resolve)
			.catch(reject);
		});
	}

})(window.DocNinja = window.DocNinja || {});