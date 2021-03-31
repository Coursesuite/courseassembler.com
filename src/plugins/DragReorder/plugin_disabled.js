(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.DragReorder = DocNinja.Plugins.DragReorder || {};

	DocNinja.Plugins.DragReorder.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterAction({
			plugin: context,
			icon: '<div class="ga-item"><a data-action="add-kc-reorder"><i class="ninja-education"></i>Reorder list</a></div>',
			type: 'interaction',
			order: 1,
			supports: ['edit','view','compile','export'],
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

	// called from data-action handler for export button (app.lib)
	DocNinja.Plugins.DragReorder.Export = function (fileId) {
		localforage.getItem(fileId).then(function(obj) {
			if (obj&&obj.payload) {
				delete obj.depth;
				delete obj.kind;
				download(JSON.stringify(obj), sanitizeFilename(obj.name,fileId) + ".json", "application/json");
			}
		});
	}

})(window.DocNinja = window.DocNinja || {});