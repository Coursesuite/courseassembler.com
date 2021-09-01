(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
	DocNinja.Plugins.Upload = DocNinja.Plugins.Upload || {};

	/*
	 * this file registers the upload/links function under the add button
	 */
	DocNinja.Plugins.Upload.RegisterPlugin = function(context) {
		DocNinja.routines.RegisterActions([
			{
				plugin: context,
				icon: '<div class="ga-page"><a data-action="add-upload"><i class="ninja-upload"></i>Upload files</a></div>',
				type: 'page',
				order: 1,
				supports: []
			},
			{
				plugin: context,
				icon: '<div class="ga-url"><a data-action="add-paste"><i class="ninja-paste"></i>URL / Embed</a></div>',
				type: 'page',
				order: 2,
				supports: []
			},
			// {
			// 	plugin: context,
			// 	icon: '<div class="ga-cloud"><a data-action="add-choose"><i class="ninja-cloud_download"></i>Open from cloud</a></div>',
			// 	type: 'page',
			// 	order: 3,
			// 	supports: []
			// }
		]);
	}

})(window.DocNinja = window.DocNinja || {});