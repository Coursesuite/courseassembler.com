(function (DocNinja, undefined) {

	var _upgrade = function (value) {
		// upgrade display-flex to dn-flex and subsequent styles; split/join is fastest
		if (!value) return "";
		value = value.split("display-flex").join("dn-flex").split("flex-left-right").join("dn-flex-lr").split("label flex-1").join("label dn-flex-1 dn-flex dn-flex-c-1");
		return value;
	}

	// var _add_video_icon = function(id) {
	// 	var dest = document.querySelector("li[data-fileid='" + id + "']>div.nav-item");
	// 	var icon = dest.querySelector(".video-hint");
	// 	if (!icon) {
	// 		var icon = document.createElement("span");
	// 		icon.classList.add("video-hint");
	// 		dest.appendChild(icon);
	// 	}
	// 	if (!icon.querySelector(".ninja-play")) {
	// 		var i = document.createElement('i');
	// 		i.classList.add('ninja-youtube');
	// 		i.setAttribute('title','Page has video');
	// 		icon.appendChild(i);
	// 	}
	// 	return true;
	// }

	// var _remove_video_icon = function (id) {
	// 	var span = document.querySelector("li[data-fileid='" + id + "'] .video-hint");
	// 	if (span) span.parentNode.removeChild(span);
	// 	return true;
	// }

	// var _add_audio_icon = function (id) {
	// 	var dest = document.querySelector("li[data-fileid='" + id + "']>div.nav-item");
	// 	var icon = dest.querySelector(".audio-hint");
	// 	if (!icon) {
	// 		var icon = document.createElement("span");
	// 		icon.classList.add("audio-hint");
	// 		dest.appendChild(icon);
	// 	}
	// 	if (!icon.querySelector(".ninja-volume_up")) {
	// 		var i = document.createElement('i');
	// 		i.classList.add('ninja-volume_up');
	// 		i.setAttribute('title','Page has audio');
	// 		icon.appendChild(i);
	// 	}
	// 	return true;
	// }

	// var _remove_audio_icon = function (id) {
	// 	var span = document.querySelector("li[data-fileid='" + id + "'] .audio-hint");
	// 	if (span) span.parentNode.removeChild(span);
	// 	return true;
	// }

	// var _add_file_icon = function (id) {
	// 	var dest = document.querySelector("li[data-fileid='" + id + "']>div.nav-item");
	// 	var icon = dest.querySelector(".file-hint");
	// 	if (!icon) {
	// 		var icon = document.createElement("span");
	// 		icon.classList.add("file-hint");
	// 		dest.appendChild(icon);
	// 	}
	// 	if (!icon.querySelector(".ninja-paperclip")) {
	// 		var i = document.createElement('i');
	// 		i.classList.add('ninja-paperclip');
	// 		i.setAttribute('title','Page has attachment(s)');
	// 		icon.appendChild(i);
	// 	}
	// 	return true;
	// }

	var _add_icon = function(kind, fileid, subtype) {
		var li = document.querySelector("li[data-fileid='" + id + "']");
		var result = false;
		switch (kind) {
			 case "audio": li.classList.add('audio'); result = true; break;
			 case "video": li.classList.add('video'); result = true; break;
			 case "attachment": li.classList.add('attachment'); result = true; break;
		}
		return result;
	}

	// var _remove_file_icon = function (id) {
	// 	var span = document.querySelector("li[data-fileid='" + id + "'] .file-hint");
	// 	if (span) span.parentNode.removeChild(span);
	// 	return true;
	// }

	var _get_last_node = function() {
		return document.querySelector("#nav-item-list li[data-fileid]:last-of-type");
	}

	DocNinja.Navigation = {
		Upgrade: _upgrade,
		Icons: {
			Add: _add_icon,
			// BAdd: {
			// 	Audio:  _add_audio_icon,
			// 	File: _add_file_icon,
			// 	Video: _add_video_icon
			// },
			// Remove: {
			// 	Audio: _remove_audio_icon,
			// 	File: _remove_file_icon,
			// 	Video: _remove_video_icon
			// }
		},
		Nodes: {
			Last: _get_last_node
		}
	}

})(window.DocNinja = window.DocNinja || {});
 /*

-- process for converting old html-based order key to json-based order key

0. if the value is not already json then
1. create a dom and dump in html
2. loop through LI
3. get dataset properties (depth, fileid, state, converted)
4. get name = a[data-action='preview'].textContent
5. push to object array {
	depth, fileid, state, converted, name, _dom, _data
}
6. end loop
7. persist object array back to order (now as json)

-- process for rendering all nodes

1. for each item in order array
2. push <li data-fileid=(ref)></li> into a variable
3. set the object[n]._dom = this dom node
3. set innerhtml of NavItems to the joined variable

-- process for rendering one node

1. get the object array value at object->find(fileid=(ref))
2. call its render() method

-- process of dragging nodes to a new position

1. get the object array value at object-find(fileid=(ref)) for the dragged item
2. go through the object array value in indexed order
3.

states:

import

[-------o---------] 		progress bar of import
[x]							cancel button

conversion

[O] 						spinner
[Converting name ...]		"Converting" + name
[x]							cancel button

cache

[O] 						spinner
[Importing name ...]		"Importing" + name
[x]							cancel button

static

[~]							re-order control
[o-]						indent control
[text]		 				name

editing

[~]							re-order control
[o-]						indent control
[input]		 				input control with name





<div class="nav-item dn-flex dn-flex-lr">
{{#compare state "import"}}
	<span class="progress-bar dn-flex-1"><progress max="100" value="0"><span>0</span>%</progress></span>
	<span class="cancel-conversion dn-flex dn-flex-v-center"><a href="javascript:CancelConversion('{{id}}');"><i class="ninja-cancel"></i></a></span>
{{else}}{{#compare state "conversion"}}
	<span class="conversion-spinner dn-flex dn-flex-v-center"><img src="/app/img/ring.gif" width="24" height="24" alt=""></span>
	<span class="label dn-flex-1">Converting <em>{{title}}</em> to HTML 5 ...</span>
	<span class="cancel-conversion dn-flex dn-flex-v-center"><a href="javascript:CancelConversion('{{id}}');"><i class="ninja-cancel"></i></a></span>
{{else}}{{#compare state "cache"}}
	<span class="conversion-spinner dn-flex dn-flex-v-center"><img src="/app/img/ring.gif" width="24" height="24" alt=""></span>
	<span class="label dn-flex-1">Caching <em>{{title}}</em></span>
	<span class="cancel-conversion dn-flex dn-flex-v-center"><a href="javascript:void(0);" onclick="CancelThis(this);"><i class="ninja-cancel"></i></a></span>
{{else}}
	<span class="drag-handle" title="Drag up or down to re-order item"><i class="ninja-reorder"></i></span>
	<span class="indent"><span class="toggle-button-wrapper current-state-{{action}}"><a class="toggle-switch" data-action="item-{{action}}" href="javascript:;"><span/></a></span></span>
	<span class="label dn-flex-1 dn-flex dn-flex-c-1"><a href="javascript:" data-action="preview">{{title}}</a></span>
{{/compare}}{{/compare}}{{/compare}}
</div>

*/