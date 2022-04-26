function loadTyped() {
	if (document.querySelector("#typed"))
		new Typed("#typed",{
			strings: ["Word documents","any PDF file","a KeyNote file","a H5P package", "Google Docs", "Markdown", "PowerPoint","Google Slides","Pages","Vimeo videos","YouTube videos","SlideShare","any document"],
			typeSpeed: 90,
			backSpeed: 45,
			startDelay: 800,
			backDelay: 1250,
			shuffle: false,
			loop: true
		});
}

function launch(el) {
	var key = el.closest("fieldset").querySelector("input[type='text']").value;
	new Promise(function(resolve,reject) {
		if (el.closest("fieldset").querySelector("input[type='checkbox']").checked) {
			localforage.setItem("licencekey", key).then(function() { resolve(); });
		} else {
			localforage.removeItem("licencekey");
			resolve();
		}
	}).then(function() {
		gtag&&gtag('event', 'login', {
			'event_category': 'engagement',
			'event_label': 'app opened'
		});
		location.href='/app/?hash='+key;
	});
}

function checkKey() {
	localforage.getItem("licencekey").then(function(value) {
		writeKey(value, false, true);
	});
}

function writeKey(value, save, verify) {
	[].forEach.call(document.querySelectorAll('input[name="licencekey"]'),function(el) {
		el.value = value || '';
	});
	if (save) localforage.setItem("licencekey", value); // set via fs store callback
	if (verify && value) { // set when loading from localstorage
		fetch("/validate/" + value, {method:'GET',headers:{'content-type':'application/json','X-Requested-With':'XMLHttpRequest'},cache:'no-cache',credentials:'omit'})
			.then(function(response) {
				return response.json()
			})
			.then(function(obj) {
				switch (obj.licence.error) {
				case "bad-token": warn("Not found"); break;
				case "licence-key-expired": warn("Expired"); break;
				default: readify();
				}
			});
	}
}

function warn(value) {
	[].forEach.call(document.querySelectorAll('input[name="licencekey"]'),function(el) {
		el.classList.add("uk-form-danger");
		var button = el.closest("fieldset").querySelector("button");
		button.classList.add("uk-button-danger");
		button.textContent = value;
	});
}

function readify() {
	[].forEach.call(document.querySelectorAll('input[name="licencekey"]'),function(el) {
		el.classList.remove("uk-form-danger");
		var button = el.closest("fieldset").querySelector("button");
		button.classList.remove("uk-button-danger");
		button.textContent = "Launch";
	});
}

document.addEventListener('DOMContentLoaded', function () {
	loadTyped();
	checkKey();
	[].forEach.call(document.querySelectorAll('.my-launch'), function (node) {
		node.addEventListener('click', function (event) {
			var label = event.target.getAttribute('aria-expanded') === 'true' ? 'opened' : 'closed';
			gtag&&gtag('event', 'view_item', {
				'event_category': 'engagement',
				'event_label': 'launch app button ' + label
			});
		});
	});
	[].forEach.call(document.querySelectorAll('.my-pricing'), function (node) {
		node.addEventListener('click', function (event) {
			var label = event.target.getAttribute('aria-expanded') === 'true' ? 'opened' : 'closed';
			gtag&&gtag('event', 'view_item', {
				'event_category': 'engagement',
				'event_label': 'pricing button ' + label
			});
		});
	});
	[].forEach.call(document.querySelectorAll('[data-fsc-action="Reset,Add,Checkout"]'), function (node) {
		// binding click to the eventlistener won't fire; seems to be overriden by fastspring
		node.setAttribute('onclick','recordEvent(this.textContent)');
	});
});

function recordEvent(label) {
	gtag&&gtag('event', 'add_to_cart', {
		'event_category': 'ecommerce',
		'event_label': label
	});
}

window.fsSaveKey = function (v) {
	// console.log("fsSaveKey",event);
	fsWebhookReceived(event.data);
};

function fsPrepopulate (email, token) {
	fastspring.builder.recognize({
		"email" : email
	});
	fastspring.builder.tag('token',token);
}

function fsWebhookReceived(data) {
	// console.log("fsWebhookReceived",data);
	if (data && data.items) {
		writeKey(data.items[0].fulfillments[Object.keys(data.items[0].fulfillments)[0]][0].license);
	}
}

// fs script loader has a callback after it loads. use it to modify pricing for local currencies.
function fsCallbackFunction(data) {
	// console.log("fsCallbackFunction", data);
	var fn = function() {
			if (data && data.groups && data.groups.length) {
				var Products = data.groups[0].items;
				[].forEach.call(document.querySelectorAll("[data-fsc-item-pricetotal-callback]"), function (node) {
					var dObj = Products.find(function(o) {
						return (o && o.path && o.path === node.dataset.fscItemPath)
					});
					var format = node.dataset.format ? node.dataset.format : " - %price %currency";
					var price = dObj.unitPrice.replace(".00","");
					var text = format.replace("%price", price).replace("%currency", data.currency);
					node.textContent = text;

					var card = node.closest(".uk-card");
					if (card) {
						var desc = card.querySelector(".uk-card-body");
						desc.innerHTML = dObj.description.summary;
					}
				});
			}
		},
		t = function () {
			if (document.readyState==='complete') {
				fn();
			} else {
				setTimeout(t,100);
			}
		};
	t();
}
