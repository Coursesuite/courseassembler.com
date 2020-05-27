		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/codemirror.css">

		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/codemirror.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/mode/xml/xml.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/mode/css/css.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/mode/htmlmixed/htmlmixed.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/mode/javascript/javascript.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/addon/fold/xml-fold.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/addon/edit/matchtags.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.2/addon/edit/matchbrackets.min.js"></script>


		if (e.target.getAttribute("href")!=="#tab-advanced-design") EditHandlers.UnloadCodeMirror(true);

		EditHandlers.LoadCodeMirror(e.target.getAttribute("data-loader"));

	<h3>Markup</h3>
	<div class='no-shadow'><textarea data-mimetype="text/html" id="tab-design-advanced-html"></textarea></div>

	<h3>Javascript</h3>
	<div class='no-shadow'><textarea data-mimetype="text/javascript" id="tab-design-advanced-js"></textarea></div>

	<h3>Stylesheet</h3>
	<div class='no-shadow'><textarea data-mimetype="text/css" id="tab-design-advanced-css"></textarea></div>


		case "#tab-design-advanced":
			// try compiling the templates
			var fields = [{"name":"index.html","id":"tab-design-advanced-html"},{"name":"_package.js","id":"tab-design-advanced-js"},{"name":"_package.css","id":"tab-design-advanced-css"}];
			var promises = fields.map(function(obj) {
				return new Promise(function(resolve,reject) {
					var value = document.getElementById(obj.id).value.trim();
					if (value === "") throw Error("Your " + obj.name + " template cannot be empty.");
					templates[obj.name] = Handlebars.compile(value);
					resolve(obj.name);
				});
			});
			return Promise.all(promises);


	var EditHandlers = (function (document, cm, undefined) {

		// initliase codemirror editors
		var _instances = [];
		var _bindCM = function (layout) {
			_destroyCM(); // unload existing
			[].forEach.call(document.querySelectorAll("textarea[data-mimetype]"), function(element) {
				var mime = element.getAttribute("data-mimetype"),
					filename = (mime === "text/html") ? "index.html" : (mime === "text/css") ? "_package.css" : "_package.js";
				$.get("layouts/" + layout + "/" + filename)
					.then(function(contents) {
						element.value = contents.trim();
						// console.log("set textarea", element, contents);
					})
					.then(function() {
						_instances.push(cm.fromTextArea(element, {
							lineNumbers: true,
							mode: mime,
							matchBrackets: true,
							matchTags: {bothTags: true}
						}));
						// console.log("pushed cm instance", element, mime);
					});
			});
		}

		var _destroyCM = function (clear) {
			if (_instances.length === 0) return;
			_instances.forEach(function(instance) {
				instance.toTextArea();
			});
			_instances = [];
			if (clear) $("textarea[data-mimetype]").val("");
		}

		return {
			LoadCodeMirror: _bindCM,
			UnloadCodeMirror: _destroyCM,
		}

	})(document, CodeMirror);