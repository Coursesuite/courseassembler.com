localforage.setDriver(localforage.INDEXEDDB);
localforage.config({
	name: 'DocumentNinja'
});

function StringToFragment(string) {
    var renderer = document.createElement('template');
    renderer.innerHTML = string;
    return renderer.content;
}

document.addEventListener("click", parent.globalClickConsumer, false);