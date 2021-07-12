(function (ROOT, undefined) {

	ROOT.Plugins = ROOT.Plugins || {};
	var methods = ROOT.Plugins.Section = ROOT.Plugins.Section || {};

	// run when the plugin is first loaded
	methods.init = function() {
	}

    // register global click consumers [handled in performAction(...)]
	methods.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterAction({
			plugin: context,
			icon: '<div class="ga-section"><a data-action="add-new-section"><i class="ninja-power_input"></i>Add section header</a></div>',
			type: 'page',
			order: 6,
			supports: ['view','compile'],
			handler: 'add-new-section' // if this matches the icon data-action, it calles the Add() method on this plugin .. 
		});
	}

	// adds a nav item for the header
	methods.Add = function() {
		var newId = DocNinja.PurityControl.Nav.GetFileId(),
			fileInfo = {
				name: "New section",
				kind: "plugin",
				plugin: "Section",
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

	methods.compile = function(navigation) {
		return 'not implemented';
	};

})(window.DocNinja = window.DocNinja || {});