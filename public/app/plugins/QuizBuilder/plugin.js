(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.QuizBuilder = DocNinja.Plugins.QuizBuilder || {};

	// function _compile_template(url) {
	// 	console.log("compile template", url);
	// 	var request = new XMLHttpRequest();
	// 	request.open('GET',url,false);
	// 	request.send(null);
	// 	console.dir(request);
	// 	if(request.status===200) {
	// 		return Handlebars.compile(request.responseText);
	// 	}
	// 	return null;
	// }

	DocNinja.Plugins.QuizBuilder.Compile = function (obj, templateFn) {
		if (obj.randomise===false) { // re-order questions to natural order
			var qq = JSON.parse(JSON.stringify(obj.questions)); // clone node
			qq.map(function(value,index) {
				obj.questions[index].order = qq[value.order];
			});
		}
		var dc = obj.colour ? obj.colour : "#508196";
		//var templateFn = (typeof template === "function") ? template : _compile_template(template);
		return templateFn({
			tint_colour: dc,
			quiz_json: JSON.stringify(obj), // btoa("window.setup=" + JSON.stringify(obj) + ";"),
			buttons: {
				check: obj.strings.answer,
				next: obj.strings.next,
				results: obj.strings.results,
				resit: obj.strings.resit
			},
			templates: {
				endpage: obj.strings.completion
			}
		});
	}

})(window.DocNinja = window.DocNinja || {});