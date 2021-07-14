(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	var methods =  DocNinja.Plugins.Intro = DocNinja.Plugins.Intro || {};

	methods.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterAction({
			plugin: context,
			icon: '<div class="ga-intro"><a data-action="add-intro-page"><i class="ninja-home"></i>Intro Page</a></div>',
			type: 'page',
			order: 4,
			supports: ['edit','view','compile','audio'],
			handler: 'add-intro-page'
		});
	};

	methods.Add = function () {
		var newId = DocNinja.PurityControl.Nav.GetFileId(),
			fileInfo = {
				name: "Course Introduction",
				kind: "plugin",
				plugin: "Intro",
				depth: 0,
				payload: {}
			};
		localforage.setItem(newId, fileInfo).then(function(obj) {
			DocNinja.PurityControl.Nav.Add(DocNinja.navItems, newId, fileInfo, null, "ready");
			window.setItemOrder();
			//DocNinja.PurityControl.Nav.Check();
			DocNinja.filePreview.Select(newId);
			//localforage.setItem("order", DocNinja.navItems.innerHTML);
		});
	}

	// html: loaded from plugins/Intro/styleX.html
	// payload: obj.payload object from localstorage instance
	methods.Compile = function (html, payload, strings) {
		if (!html) return '';
		var doc = document.implementation.createHTMLDocument('untitled');
		doc.documentElement.innerHTML = html;
		var src = payload.image || payload.url;
		if (src.length && doc.querySelector("img[src]")) doc.querySelector("img[src]").src = src;
		var css = doc.querySelector("style").textContent;
		css = css.replace("background-color: #f8f8f8;", "background-color: " + payload.backgroundColour + ";");
		css = css.replace("background-color: #FBAB7E;", "background-color: " + payload.color1 + ";");
		css = css.replace("background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);", "background-image: linear-gradient(62deg, "+payload.color1+" 0%, "+payload.color2+" 100%);");
		doc.querySelector("style").textContent = css;
		if (strings) {
			doc.querySelector(".name").textContent = strings['option-course-name'];
			doc.querySelector(".description").textContent = strings['option-course-description'];
			doc.querySelector(".copyright").textContent = strings['option-course-copyright'];
		}
		return "<!DOCTYPE html>" + doc.documentElement.outerHTML;
	}

	methods.Import = function (domDocument) {
		return new Promise(function(resolve,reject) { 
			var imgData = domDocument.querySelector("body > img");
			if (!imgData) reject("plugin:image (required element not found)");
			resolve(imgData.getAttribute("src"));
		});
	}

})(window.DocNinja = window.DocNinja || {});