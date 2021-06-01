(function (DocNinja, undefined) {

	// Could be initialised before core loads
	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.Markdown = DocNinja.Plugins.Markdown || {};

	// called during app init (app.core)
	DocNinja.Plugins.Markdown.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterAction({
			plugin: context,
			icon: '<div class="ga-markdown"><a data-action="add-markdown"><i class="ninja-document-add"></i>Add markdown page</a></div>',
			type: 'page',
			order: 5,
			supports: ['edit','view','compile','import','export'],
			handler: 'add-markdown'
		});
	};

	// called by data-action handler (app.lib)
	DocNinja.Plugins.Markdown.Add = function () {
		var newId = DocNinja.PurityControl.Nav.GetFileId(),
			fileInfo = {
				name: "New Markdown Page",
				kind:"plugin",
				plugin: "Markdown",
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

	// called by fileconversion during drop (beginconversion)
	DocNinja.Plugins.Markdown.Import = function (li, name, data) {
		var navId = li.getAttribute("data-fileid"),
			fileInfo = {
				name: name.trimExtn(),
				kind: "plugin",
				plugin: "Markdown",
				depth: 0,
				payload: {
					markdown: atob(data.split(',')[1])
				}
			};
		localforage.setItem(navId, fileInfo).then(function(obj) {
			DocNinja.PurityControl.Nav.Update(li, fileInfo, "ready");
			DocNinja.PurityControl.Nav.Check();
			localforage.setItem("order", DocNinja.navItems.innerHTML);
			DocNinja.filePreview.Select(navId, 'edit');
		});
	}

	// called from data-action handler for export button (app.lib)
	DocNinja.Plugins.Markdown.Export = function (fileId) {
		localforage.getItem(fileId).then(function(obj) {
			if (obj&&obj.payload&&obj.payload.markdown) {
				download(obj.payload.markdown, sanitizeFilename(obj.name,fileId) + ".md", "application/json");
			}
		});
	}

	// called from edit.js during save (for custom transformations, if required)
	DocNinja.Plugins.Markdown.Compile = function (obj) {
		return obj;
	}

})(window.DocNinja = window.DocNinja || {});