localforage.config({name: 'DocumentNinja'});

var fileid = window.location.search.split("?")[1] || "";

var payload = {
	navlock: false,
	icon: ""
}

function save() {
	localforage.getItem(fileid)
	.then(function(obj) {
		obj.payload = payload;
		localforage.setItem(fileid, obj);
	});
}

window.addEventListener("DOMContentLoaded", function() {

	var iconField = document.querySelector("#iconField"),
		navLock = document.querySelector("#navLock");

	localforage.getItem(fileid).then(function(obj) {

		Object.assign(payload, obj.payload);

		iconField.value = payload.icon;
		if (payload.navlock) navLock.setAttribute("checked", true);

	});

	navLock.addEventListener('change', function(e) {
		payload.navlock = this.checked;
		save();
	});

	iconField.addEventListener('change', function(e) {
		payload.icon = this.value;
		save();
	})

});