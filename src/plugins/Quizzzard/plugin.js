(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.Quizzzard = DocNinja.Plugins.Quizzzard || {};

	DocNinja.Plugins.Quizzzard.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterAction({
			plugin: context,
			icon: '<div class="ga-quiz"><a data-action="add-quizzzard"><i class="ninja-inbox-check"></i>Quizzard</a></div>',
			type: 'interaction',
			order: 2,
			supports: ['edit','view','export','compile'],
			handler: 'add-quizzzard'
		});
	};

	DocNinja.Plugins.Quizzzard.Add = function() {
		var newId = DocNinja.PurityControl.Nav.GetFileId(),
			fileInfo = {
				name: "New Quiz",
				kind:"plugin",
				plugin: "Quizzzard",
				depth: 0,
				payload: {}
			};
		localforage.setItem(newId, fileInfo).then(function(obj) {
			DocNinja.PurityControl.Nav.Add(DocNinja.navItems, newId, fileInfo, null, "ready");
			// DocNinja.PurityControl.Nav.Check();
			window.setItemOrder();
			DocNinja.filePreview.Select(newId);
			// localforage.setItem("order", DocNinja.navItems.innerHTML);
		});
	}

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

	DocNinja.Plugins.Quizzzard.Export = function (fileId) {
		localforage.getItem(fileId).then(function(obj) {
			if (obj&&obj.payload&&obj.payload.quiz) {
				obj.payload.quiz["source"] = "quizzzard.quiz"; // clue for importer
				download(JSON.stringify(obj.payload.quiz,null,2), sanitizeFilename(obj.name,fileId) + ".json", "application/json");
			}
		});
	}

	DocNinja.Plugins.Quizzzard.Compile = function (obj, templateFn) {
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