(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.DragReorder = DocNinja.Plugins.DragReorder || {};

	DocNinja.Plugins.DragReorder.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterAction({
			plugin: context,
			icon: '<div class="ga-item"><a data-action="add-kc-reorder"><i class="ninja-education"></i>Reorder list</a></div>',
			type: 'interaction',
			order: 1,
			supports: ['edit','compile'],
			handler: 'add-kc-reorder'
		});
	};

	DocNinja.Plugins.DragReorder.Add = function () {
		var newId = DocNinja.PurityControl.Nav.GetFileId(),
			fileInfo = {
				name: "Drag to Reorder",
				kind:"plugin",
				plugin: "DragReorder",
				depth: 0,
				payload: {}
			};
		localforage.setItem(newId, fileInfo).then(function(obj) {
			DocNinja.PurityControl.Nav.Add(DocNinja.navItems, newId, fileInfo, null, "ready");
			DocNinja.PurityControl.Nav.Check();
			DocNinja.filePreview.Select(newId);
			localforage.setItem("order", DocNinja.navItems.innerHTML);
		});
	}

	DocNinja.Plugins.DragReorder.Compile = function (obj, templateFn) {

		obj.layout = obj.layout || "column";
		obj.colour = obj.colour || "#336699";

		return templateFn(obj);

	}

})(window.DocNinja = window.DocNinja || {});