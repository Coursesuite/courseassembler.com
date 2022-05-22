export function Convert(file, id) {
    return new Promise(function(resolve, reject) {
        var t = new FileReader;
        t.onload = function(e) {
            const fd = new FormData();
            fd.append("blob", new Blob([e.target.result], {type: file.type}), file.name);
            fd.append("hash", App.Hash || "debug");
			fd.append("type", file.type);
			fd.append("fileid", id);
			fd.append("website", false);
			fd.append("name", file.name);
// for(var pair of fd.entries()) console.log(pair[0]+ ', '+ pair[1]);
// reject('exit');
			fetch(App.Backend, {
				method: 'POST',
				body: fd,
				headers: {
					"fileid": id,
					"hash": App.Hash
				},
				cache: 'no-store',
				referrerPolicy: 'no-referrer-when-downgrade'
			})
			.then(response => {
				if (!response.ok) throw(response.statusText);
				return response;
			})
			.then(response => response.blob())
			.then(blob => {
				resolve(blob);
			})
			.catch(error => {
				reject(error);
			});
		};
		t.readAsArrayBuffer(file);
	})
}
 