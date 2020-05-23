(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};

	var workspaceName = "workspace", // in case it needs to be dynamic
		templateName = "h5p.zip";

	// downloader needs to read the h5p package, extract it to the output in its own folder in a subfolder
	// then load the h5p.zip file, process the index.html file and add make changes
	// then add this to the folder
	DocNinja.Plugins.ExportH5P = function (fileObj, zipFolder) {
		return new Promise(function(finalResolve, finalReject) {
			new JSZip.external.Promise(function h5p_export_load_template(innerResolve, innerReject) {
			    JSZipUtils.getBinaryContent(location.origin + location.pathname + 'plugins/H5P/' + templateName, function(err, data) {
			        if (err) {
			            innerReject(err);
			        } else {
			            innerResolve(data);
			        }
			    });
			}).then(function h5p_export_load_zip(bin) {
				return zipFolder.loadAsync(bin);
			}).then(function h5p_export_read_index(h5pTemplate) {
				return h5pTemplate.file("index.html").async("string");
			}).then(function h5p_export_modify_index(content) {
				var html = content
							.split('{{name}}').join(fileObj.name)
							.split('{{score}}').join(fileObj.score || 1)
							.split('{{workspace}}').join(workspaceName);
				return Promise.resolve(html);
			}).then(function h5p_export_store_index(html) {
				zipFolder.file("index.html", html);
				return Promise.resolve();
			}).then(function h5p_export_load_content() {
				// TODO: this is a little ineffecient in that workspaces and indexes could be instanced but everything else shared
				return zipFolder.folder(workspaceName).loadAsync(fileObj.payload.src.split("base64,")[1], {base64: true});
			}).then(function h5p_export_resolve(result) {
				console.dir(result);
				finalResolve();
			}).catch(function h5p_export_catch(message) {
				console.trace();
				finalReject(message);
			});
		})
	}

	// stub for future expansion
	// e.g. to support previewing we need a file system
	// we could send the file to the server for storage for preview purposes
	// then trash it when resetting the project or after a period
	DocNinja.Plugins.ImportH5p = function (obj) {

	}

})(window.DocNinja = window.DocNinja || {});