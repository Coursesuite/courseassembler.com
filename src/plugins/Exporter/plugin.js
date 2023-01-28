(function (DocNinja, undefined) {

	DocNinja.Plugins = DocNinja.Plugins || {};
    DocNinja.Plugins.Exporter = {};
    DocNinja.Plugins.Exporter.Download = function(name) {
        const theDBName = 'DocumentNinja';
        window.gatherSettings().then(function(cache) {
            localforage.setItem("settingsCache", cache).then(() => {
            (async () => {
                await import('https://unpkg.com/dexie@3.2.2');
                await import('https://unpkg.com/dexie-export-import@1.0.3');
                let theDB = new Dexie(theDBName);
                let {verno, tables} = await theDB.open();
                theDB.close();
                theDB = new Dexie(theDBName);
                theDB.version(verno).stores(tables.reduce((p,c) => {p[c.name] = c.schema.primKey.keyPath || ""; return p;}, {}));
                theBlob = await theDB.export();
                download(theBlob, sanitizeFilename(name) + ".json", "application/json");
            })();
            });
        });
    }

})(window.DocNinja = window.DocNinja || {});