(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.Upload = DocNinja.Plugins.Upload || {};

	/*
	 * this file registers the upload/links function under the add button
	 */
	DocNinja.Plugins.Upload.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterAction({
			plugin: context,
			icon: '<div class="ga-page"><a data-action="add-content"><i class="ninja-upload"></i>Upload files / links</a></div>',
			type: 'page',
			order: 1,
			supports: []
		});
	}

})(window.DocNinja = window.DocNinja || {});