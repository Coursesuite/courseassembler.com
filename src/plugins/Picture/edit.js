localforage.config({name: 'DocumentNinja'});

var fileid = window.location.search.split("?")[1] || "";

var payload = {
	template: 1,
	url: "https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=80",
	image: "",
	headerColour: "#ffffff",
	captionColour: "#eeeeee",
	backgroundColour: "#000000",
	figureBackground: "#242424",
	font:'Roboto',
	zoom:0,
	html: undefined
}

function save() {
	var iframe = document.querySelector("iframe[id='frame-" + payload.template + "']");
	updateFrame(iframe, true);
}

function load(obj) {
	return new Promise(function(resolve,reject) {
		if (obj.payload.hasOwnProperty('image') && obj.payload.image.length) obj.payload['url'] = '';
		for (const [key,value] of Object.entries(obj.payload)) {
			const field = document.querySelector('#' + key);
			if (!field) continue;
			if (key === 'zoom' && value === 1) {
				field.setAttribute('checked', true);
			} else {
				field.value = value || '';
			}
		}
		resolve();
	});
}

function updateFrame(iframe, save) {
	var index = iframe.id.replace("frame-","");
	fetch("./style" + index + ".html", {cache:"no-store"})
		.then(function(response) {
			return response.text()
		})
		.then(function(html) {
			return new Promise(function(resolve) {
				resolve(parent.DocNinja.Plugins.Picture.Compile(html, payload));
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

window.addEventListener("DOMContentLoaded", function() {http://127.0.0.1:61902/plugins/Picture/edit.html?file-kpyzu4ly-0

	gFontInput.create('font');

	localforage.getItem(fileid).then(function(obj) {
		Object.assign(payload, obj.payload);

		load(obj)
		.then(function() {
			document.querySelector("a[href='#frame-" + payload.template + "']").click();
			updateFrames(false);
		});
	});

	const nodes = Array.from(document.querySelectorAll("header *[id]"));
	for (let node of nodes) {
		node.addEventListener('change', function(e) {
			switch (e.target.id) {
				case "zoom":
					payload['zoom'] = (e.target.checked) ? 1 : 0;
					updateFrames(true);
					break;

				case "file":
					if (e.target.files[0].type.indexOf("image/")===-1) return;
					var reader = new FileReader();
					reader.onloadend = function (event) {
						payload.image = event.target.result;
						payload.url = undefined;
						document.querySelector("#url").value = "";
						updateFrames(true);
					}
					reader.readAsDataURL(e.target.files[0]);

				break;
				default:
					payload[e.target.id] = this.value;
					updateFrames(true)
			}
		});
	};

	document.querySelector(".select-one").addEventListener('click', function(e) {
		if (e.target.dataset.action) {
			[].forEach.call(document.querySelectorAll('a[data-action]'), function (elm) {
				var action = (elm === e.target) ? "add" : "remove";
				if (action === "add") {
					payload.template = ~~elm.textContent;
					if (e.x > 0) save(); // if came from a mouse event
				}
				elm.classList[action]("active");
			});
		}
	})

});