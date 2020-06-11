// md5 hashing routine; usage var hash = md5("hash"); // source: https://github.com/blueimp/JavaScript-MD5
!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define(function(){return t}):a.md5=t}(this);

function isDataURL(s) {
    return !!s.match(isDataURL.regex);
}
isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

var MarkDownEditor = (function () {

	var fileid,
		_data_,
		_marked_,
		_widgets = [],
		_use_widgets = false; // enable for inline image previews

	// upload method - use imgur
	// pros: we don't care about images the user uploads then deletes
	// cons: probably a usage limit
	var CONST_IMGUR_UPLOAD = {
		droppedFileName: '',
		uploadUrl: "https://api.imgur.com/3/image",
		extraHeaders: {
			Authorization: atob("Q2xpZW50LUlEIDY2MmNlN2E4ZjE0MjM5NA==")
		},
		extraParams: {
		 	name: 'Untitled'
		// 	description: "Dragged onto editor using inline-attachment"
		},
		onFileReceived: function (file) {
			droppedFileName = file.name;
			extraParams.name = file.name;
		},
		uploadFieldName: "image",
		onFileUploadResponse: function(xhr) {
			// "this" is now the inlineAttachment instance, not a XHR
			var result = JSON.parse(xhr.responseText),
				id = result.data.id,
				ext = result.data.type.split("/")[1],
				title = droppedFileName || result.data.title || "Untitled",
				href = "https://i.imgur.com/" + id + "." + ext,
				src = "http://i.imgur.com/" + id + "." + ext, // append m on the end before the dot for medium size
				newValue = "![" + title + "](" + src + ")";
				// newValue = "[![" + title + "](" + src + ")](" + href + ")";
			var text = this.editor.getValue().replace(this.lastValue, newValue);
			this.editor.setValue(text);

			// prevent internal upload
			return false;
		}
	},

	// upload method - post to php
	CONST_INTERNAL_UPLOAD = {
		uploadUrl: "/app/uploadMDE.php"
	},

	// upload method - use base64 inline encoding (already compatible with downloader)
	CONST_INLINE_UPLOAD = {
		droppedFileName: '',
		onFileReceived: function (file) {
			var that = this;
			if (file && file.type && file.type.indexOf("image/")!==-1) {
				droppedFileName = file.name;
				var reader = new FileReader();
				reader.onload = function (e) {
					var text = that.editor.getValue().replace(that.lastValue, "\n![" + droppedFileName + "](" + e.target.result + ")\n");
					that.editor.setValue(text);
				};
				reader.readAsDataURL(file);
			}
		},
		beforeFileUpload: function () {
			return false;
		}
	};

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	function _remove_widgets(cm) {
		for (var i=0;i<_widgets.length;i++) cm.removeLineWidget(_widgets[i]);
	}

	function _images(cm) {
		_remove_widgets(cm);
		cm.operation(function(){
			var l = 0;
			cm.eachLine(function (line) {
				var m = line.text.match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/);
				if (m && m[0].indexOf('base64,') !== -1) {
					var start = m.index + m[0].indexOf('base64,') + 7, end = m[0].length - 2;
					cm.markText({line:l,ch:start},{line:l,ch:end},{"collapsed":true});

					// you could do preview images in the widget line like this
					var img = new Image();
					img.src = m[1];
					img.style.maxHeight = '5rem';
					_widgets.push(cm.addLineWidget(line, img, {coverGutter: false, noHScroll: true, className: 'md-inline-preview'}));

				}
				l++;
			});
		});
		var info = cm.getScrollInfo();
		var after = cm.charCoords({line: cm.getCursor().line + 1, ch: 0}, "local").top;
		if (info.top + info.clientHeight < after) cm.scrollTo(null, after - info.clientHeight + 3);
	}

	function _save() {
		localforage.getItem(fileid).then(function(obj) {
			obj=obj||{};obj.payload=obj.payload||{};
			obj.payload.markdown = _data_;
			obj.payload.html = parent.DocNinja.Plugins.Markdown.Compile(_marked_); // , undefined);
			localforage.setItem(fileid,obj).then(function() {
				// setTimeout(function(){node.setAttribute("label","Settings")},1000);
				// node.setAttribute("label","Settings ... saved");
			}).catch(function(err){
				// console.log(err);
			});
		});
	}

	function _load() {
		localforage.config({name: 'DocumentNinja'});

		fileid = window.location.search.split("?")[1] || "";
		localforage.getItem(fileid).then(function(obj) {
			var v = (obj && obj.payload && obj.payload.markdown) ? obj.payload.markdown : '';
			_init(v);
		});
	}

	function _init(value) {
		var el = document.querySelector("textarea");

		var layout = {
			name: "layout",
			action: function(editor) {
				// what do we do here?
			},
			className: "fa fa-font",
			title: "Set fonts & layout"
		};

		el.simplemde = new SimpleMDE({
			element: el,
			spellChecker: false, // unless theres a way to specify the language - but its dependant on codemirror
			autofocus: true,
			forceSync: false,
			placeholder: "Markdown / HTML is allowed.\nDrag images onto this editor to embed them\nTo nest markdown inside html, add attribute markdown=\"1\" of tags containing markdown.",
			toolbar: ["bold","italic","heading","|","code","quote","unordered-list","ordered-list","table","|","link","image","|","preview","side-by-side","fullscreen","|",layout,"|","guide"],
			fullscreen: true,
			split:true,
			initialValue:value
		});
		inlineAttachment.editors.codemirror4.attach(el.simplemde.codemirror, CONST_INLINE_UPLOAD);

		// start off side by side and full screen
		el.simplemde.toggleFullScreen();
		el.simplemde.toggleSideBySide();

		// automatically persist changes to localstorage
		el.simplemde.codemirror.on("change", debounce(function(){
			_data_ = el.simplemde.value();
			_marked_ = el.simplemde.markdown(_data_);
			if (_data_.length) MarkDownEditor.Save();
			if (/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/.test(_data_)) {
				MarkDownEditor.FormatImages(el.simplemde.codemirror);
			} else {
				_remove_widgets(el.simplemde.codemirror);
			}
		}, 2048));

		// prepare existing images
		MarkDownEditor.FormatImages(el.simplemde.codemirror);

	}

	return {
		Load: _load,
		Save: _save,
		FormatImages: _images
	}

})();