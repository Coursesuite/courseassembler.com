(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.DragReorder = DocNinja.Plugins.DragReorder || {};

	DocNinja.Plugins.DragReorder.Compile = function (obj, templateFn) {

		obj.layout = obj.layout || "column";
		obj.colour = obj.colour || "#336699";

		return templateFn(obj);

	}

})(window.DocNinja = window.DocNinja || {});