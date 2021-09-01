(function (DocNinja, undefined) {

	DocNinja.EditHandlers = (function (document, cm, undefined) {

		// initliase codemirror editors
		var _instances = [];
		var _bindCM = function (layout) {
			_destroyCM(); // unload existing
			for (element of document.querySelectorAll("textarea[data-mimetype]")) {
				var mime = element.getAttribute("data-mimetype"),
					filename = (mime === "text/html") ? "index.html" : (mime === "text/css") ? "_package.css" : "_package.js";
				fetch("layouts/" + layout + "/" + filename)
					.then(function(response) {
						if (response.ok) {
							return response.text();
						}
						throw response;
					})
					.then(function(contents) {
						element.value = contents.trim();
					})
					.then(function() {
						var editor = cm.fromTextArea(element, {
							lineNumbers: true,
							mode: mime,
							matchBrackets: true,
							matchTags: {bothTags: true}
						});
						editor.on("change", function(inst) {
							inst.save();
						});
						_instances.push(editor);
					});
			};
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

})(window.DocNinja = window.DocNinja || {});