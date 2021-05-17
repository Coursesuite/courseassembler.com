(function (ROOT, undefined) {

	ROOT.Plugins = ROOT.Plugins || {};
	var methods = ROOT.Plugins.Theme = ROOT.Plugins.Theme || {};

	var nav_cache = [],
		presets = [];

	// run when the plugin is first loaded
	methods.init = function() {
		methods.clearNavCache();
	}

    // register global click consumers [handled in performAction(...)]
	methods.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterActions([
			{
				plugin: context, // this plugin
				type: 'theme', // target plugin type
				match: 'select-preset',   // data-action='select-preset'
				fn: 'selectPreset', // function name inside this plugin
				parameters: ['preset', 'src'] // data-preset, data-src
			}, {
				plugin: context,
				type: 'theme',
				match: 'update-preset',
				fn: 'updatePreset',
				parameters: []
			}, {
				plugin: context,
				type: 'theme',
				match: 'set-theme-base',
				fn: 'selectTheme',
				parameters: ['name']
			}
		]);
	}

	// load a navigation style (base theme)
	methods.selectTheme = function(name) {
		if (!name.length) return;
		$("input[name='template']").val(name);
		$("#nav-selection figure").removeClass("selected").filter("[data-name='" + name + "']").addClass("selected");
		return new Promise(function(resolve, reject) {
			methods.load(name)
			.then(selectDefaultPreset)
			.then(resolve)
			.catch(reject)
		})
	}

	// select a theme by clicking on a preset
	// called by 'performAction'
	methods.selectPreset = function (preset, src) {
		const theme = atob(src);
		const container = document.querySelector('.themePreviewOptions');
		const details = container.querySelector("details");
		if (details) details.parentNode.removeChild(details);
		container.appendChild(
			fragmentFromString(
				Handlebars.templates["theme-preset-details"]({ name: preset, data: theme})
			)
		);
		container.children.forEach(function(node){
			if (node.nodeName === 'A')
			node.classList[(node.dataset.preset === preset) ? "add" : "remove"]('selected');
		})
		processTheme(theme);
	}

	// textarea editor has an update button; this reprocesses the theme
	methods.updatePreset = function () {
		const theme = document.querySelector('.themePreviewOptions textarea').value;
		processTheme(theme);
	}

	// clear the internal nav cache
	methods.clearNavCache = function() {
		nav_cache = [];
	}

	// load enough data to pretend to be the menu the player can understand
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
							"audio": value.payload.hasOwnProperty("mp3") && value.payload.mp3.length ? true : undefined, // md5(value.payload.mp3)+".mp3"
							"attachments": value.hasOwnProperty("attachments") ? value.attachments : undefined // good enough for previewer's needs
			         	});
			        }
			    }).then(resolve);
			}
		});
	}

	// list presets for the selected base
	// called by 'load'
	function renderPresets(json) {
		let fragment = document.createDocumentFragment();
		json.forEach(function(preset) {
			fragment.appendChild(
				fragmentFromString(
					Handlebars.templates["theme-preset"](preset)
				)
			);
		})
		const container = document.querySelector('.themePreviewOptions');
		container.innerHTML = "<legend>Themes</legend>";
		container.appendChild(fragment);
	}

	// after loading a base (selectTheme), ensure the default Preset is selected
	function selectDefaultPreset() {
		const a = document.querySelector('.themePreviewOptions a[data-preset="default"]');
		if (a) a.click();
	}

	// posts the form to the iframe for rendering
	// called by 'processTheme'
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

	// run when the plugin is told to run
	methods.start = function() {
		localforage.getItem('settingsCache')
		.then(function(obj) {
			return obj.template || "menu";
		})
		.then(methods.selectTheme); // passes default parameter
	}

	methods.compile = function(theme) {
		return processTheme(theme, 1);
	};

	// turn human readable theme into handlebars-compatible data
	// called by selectPreset
	function processTheme(theme, compile) {
		let properties = {
			"NAVIGATION": {
				"font": "Open Sans",
				"size": "16px",
				"background": "#ffffff",
				"text": "#000000",
				"scrollbar": "rgba(0,0,0,.25)"
			},
			"HEADER": {
				"background": "#2E79A4",
				"text": "#ffffff",
				"image": "",
				"shadow": false,
				"title": true,
				"description": false,
				"progress": false
			},
			"ICONS": { // IMPORTANT all default icons must be false
				"print": false,
				"navigation": false,
				"fullscreen": false,
				"menu": false,
				"attachments": false,
				"audio": false,
				"completion": false
			},
			"FOOTER": {
				"background": "transparent",
				"text": "#000000",
				"shadow": false,
				"copyright": true,
				"brand": true
			},
			"ITEM": {
				"background": "rgba(81, 159, 212, .25)",
				"text": "#ffffff",
				"shadow": "rgba(0,0,0,.25)",
				"padding": ".25rem",
				"rounded": false,
				"border": false
			},
			"SUBITEM": {
				"background": "inherit",
				"text": "inherit",
				"shadow": "inherit",
				"padding": "inherit",
				"rounded": false,
				"border": false
			},
			"SELECTION": {
				"background": "rgb(81, 159, 212)",
				"text": "#ffffff",
				"shadow": false,
				"padding": ".25rem",
				"rounded": false,
				"border": false
			},
			"AUDIO": {
				"background": "#ffffff",
				"controls": "#019DE4"
			},
			"ATTACHMENTS": {
				"background": "#ffffff",
				"itembackground": "#e8e8e8",
				"text": "#000000",
				"rounded": "10px"
			}		
		}
		const lines = theme.split(/\r?\n/);
		let BLOCK = "PAGE"
		lines.forEach((line) => {
			line = line.trim().replace(/\'|\"|;+$/g,''); // trim whitespace, remove ; and " and '
			if (!line.length) return;
			if (line===line.toUpperCase()) {
				BLOCK = line; // define new block
				return;
			}
			// icons are csv
			if (BLOCK === "ICONS") {
				const values = line.split(",").map(Function.prototype.call, String.prototype.trim);
				values.forEach(function(v) {
					properties[BLOCK][v] = true;
				});
				return;
			}
			// otherwise record all properties
			// regexp adapted from https://stackoverflow.com/a/4607799/1238884 - split only first :
			const [statement, value] = line.split(/\:(.+)/).map(Function.prototype.call, String.prototype.trim);
			if (properties[BLOCK].hasOwnProperty(statement)) {
				properties[BLOCK][statement] = normalise(value);
			}
		});
		if (compile) {
			return properties;
		} else {
			const themedata = document.querySelector('input[name="themedata"]');
			themedata.value = JSON.stringify(properties);
			methods.update();
		}
	}

	// turn human into handlebars properties
	function normalise(text) {
		switch (String(text).toLowerCase()) {
			case "false":
			case "off":
			case "no":
			case "none":
			case "0":
				text = false;
				break;
			case "white":
				text = "#ffffff";
				break;
			case "black":
				text = "#000000";
				break;
			case "1":
			case "yes":
			case "true":
			case "on":
				text = true;
				break;
		}
		return text;
	}

	methods.load = function(template) {
		return new Promise(function(resolve,reject) {
			fetch('plugins/Theme/presets.php?base=' + template)
			.then(function(response) {
				if (response.ok) {
					return response.json();
				}
				throw response;
			})
			.then(renderPresets)
			.then(resolve)
			.catch(reject);
		});
	}

})(window.DocNinja = window.DocNinja || {});