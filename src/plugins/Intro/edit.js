localforage.config({name: 'DocumentNinja'});

var fileid = window.location.search.split("?")[1] || "";

var payload = {
	template: 1,
	url: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
	image: "",
	color1: "#FBAB7E",
	color2: "#F7CE68",
	backgroundColour: "#f8f8f8",
	html: undefined
}

function save() {
	var iframe = document.querySelector("iframe[id='frame-" + payload.template + "']");
	updateFrame(iframe, true);
}

function updateFrame(iframe, save) {
	var index = iframe.id.replace("frame-","");
	fetch("./style" + index + ".html", {cache:"no-store"})
		.then(function(response) {
			return response.text()
		})
		.then(function(html) {
			return new Promise(function(resolve) {
				resolve(parent.DocNinja.Plugins.Intro.Compile(html, payload));
			});
		})
		.then(function(html) {
			payload.html = html;
			var blob = new Blob([html],{type:"text/html"});
			var url = URL.createObjectURL(blob);
			iframe.src = url;
			return;
		})
		.then(function() {
			return localforage.getItem(fileid);
		})
		.then(function(obj) {
			obj.payload = payload;
			return obj;
		})
		.then(function(obj) {
			if (save) localforage.setItem(fileid, obj);
		});
}

// load the content of each iframe and replace various payload properties in the source and update the iframes
function updateFrames(save) {
	[].forEach.call(document.querySelectorAll("iframe[id]"), function(iframe) {
		updateFrame(iframe, save);
	});
}

window.addEventListener("DOMContentLoaded", function() {

	gFontInput.create('font');

	localforage.getItem(fileid).then(function(obj) {

		Object.assign(payload, obj.payload);

		document.querySelector("a[href='#frame-" + payload.template + "']").click();
		document.querySelector("#bg").value = payload.backgroundColour;
		document.querySelector("#color1").value = payload.color1;
		document.querySelector("#color2").value = payload.color2;
		document.querySelector("#url").value = payload.url || "";

		updateFrames(false);

	});

	document.querySelector("#url").addEventListener('blur', function(el) { payload.url = this.value; payload.image = undefined; updateFrames(true); });
	document.querySelector("#bg").addEventListener('change', function(el) { payload.backgroundColour = this.value; updateFrames(true); });
	document.querySelector("#color1").addEventListener('change', function(el) { payload.color1 = this.value; updateFrames(true); });
	document.querySelector("#color2").addEventListener('change', function(el) { payload.color2 = this.value; updateFrames(true); });

	document.querySelector("#file").addEventListener('change', function(fileEvent) {
		if (fileEvent.target && fileEvent.target.files[0].type.indexOf("image/")===-1) return;
		var reader = new FileReader();
		reader.onloadend = function (event) {
			payload.image = event.target.result;
			payload.url = undefined;
			document.querySelector("#url").value = "";
			updateFrames(true);
		}
		reader.readAsDataURL(fileEvent.target.files[0]);
	});

	document.querySelector(".select-one").addEventListener('click', function(e) {
		if (e.target.dataset.action) {
			[].forEach.call(document.querySelectorAll('a[data-action]'), function (elm) {
				var action = (elm === e.target) ? "add" : "remove";
				if (action === "add") {
					payload.template = ~~elm.textContent;
					if (e.x > 0) save();
				}
				elm.classList[action]("active");
			});
		}
	})

});