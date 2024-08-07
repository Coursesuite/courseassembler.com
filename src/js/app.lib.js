// Configure localForage first
localforage.setDriver(localforage.INDEXEDDB);
localforage.config({
	name: 'DocumentNinja'
});


function isSafari() { return /^((?!chrome|android).)*safari/i.test(navigator.userAgent); }
function isJSON(b){try{var a=JSON.parse(b);if(a&&"object"===typeof a)return!0}catch(c){}return!1};
function dec2hex(d) {return Number(d).toString(16);}
function hex2dec(h) {return parseInt(h,16);}

function randomElement(ar) {
	return ar[Math.floor(Math.random() * ar.length)]
}

/**
 * @deprecated replaced with property_exists(obj, 'string.path')
 */
function isset(obj) {
  var i, max_i;
  if(obj === undefined) return false;
  for (i = 1, max_i = arguments.length; i < max_i; i++) {
	if (obj[arguments[i]] === undefined) {
		return false;
	}
	obj = obj[arguments[i]];
  }
  return true;
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

// Promise.all(promises) except sort of like await Promise.all(promises)
// bluebird calls this "settling"
Promise.settle = function(promises) {
  var results = [];
  var done = promises.length;

  return new Promise(function(resolve) {
	function tryResolve(i, v) {
	  results[i] = v;
	  done = done - 1;
	  if (done == 0)
		resolve(results);
	}

	for (var i=0; i<promises.length; i++)
	  promises[i].then(tryResolve.bind(null, i), tryResolve.bind(null, i));
	if (done == 0)
	  resolve(results);
  });
}

const loadScript = src => {
	const id = md5(src);
	return new Promise((resolve, reject) => {
		if (document.head.querySelector('#_'+id)) {
			resolve();
		} else {
			const script = document.createElement('script')
			script.id = '_' + id
			script.type = 'text/javascript'
			script.onload = resolve
			script.onerror = reject
			script.src = src
			document.head.append(script)
		}
	})
}

// function kloudlessInput() {
// 	loadScript("https://static-cdn.kloudless.com/p/platform/sdk/kloudless.picker.js")
// 	.then(function() {
// 		if (window.Kloudless && !DocNinja.KLOUDLESS_INPUT) DocNinja.KLOUDLESS_INPUT = window.Kloudless.filePicker.picker({app_id: DocNinja.KLOUDLESS_APP_ID});
// 		DocNinja.KLOUDLESS_INPUT.on("success", function (files) {
// 			var xhr = new XMLHttpRequest();
// 			xhr.open("GET", "https://api.kloudless.com/v1/accounts/" + files[0].account + "/storage/files/" + files[0].id + "/contents", true);
// 			// xhr.setRequestHeader("Authorization", "Bearer " + files[0].bearer_token.key);
// 			xhr.setRequestHeader("Authorization",DocNinja.KLOUDLESS_APIKEY);
// 			xhr.responseType = "arraybuffer";
// 			xhr.onload = function(oEvent) {
// 				if (xhr.status === 200) {
// 					var content = new Blob([xhr.response], {type: files[0].mime_type});
// 					DocNinja.fileConversion.HandleCloudUpload(files[0].name, content, files[0].mime_type);
// 				}
// 			};
// 			xhr.send();
// 		});
// 		DocNinja.KLOUDLESS_INPUT.choose();
// 	});
// }
// function kloudlessOutput(ui, fn) {
// 	loadScript("https://static-cdn.kloudless.com/p/platform/sdk/kloudless.picker.js")
// 	.then(function() {
// 		if (window.Kloudless && !DocNinja.KLOUDLESS_OUTPUT) DocNinja.KLOUDLESS_OUTPUT = window.Kloudless.filePicker.picker({app_id: DocNinja.KLOUDLESS_APP_ID});
// 		DocNinja.KLOUDLESS_OUTPUT.on("cancel", function() {
// 			ui.stop(-1);
// 		});
// 		DocNinja.KLOUDLESS_OUTPUT.on("success", function (meta) {
// 			fn(_kloudlessUpload, uiButtonInstance, meta);
// 		})
// 		DocNinja.KLOUDLESS_OUTPUT.choose();
// 	});
// }


// http://stackoverflow.com/a/43952261/1238884
// usage:

// array.asyncEach(function(item, resume) {
//   do something...
//   console.log(item);
//   resume(); // call `resume()` to resume the cycle
// }
//
// unless resume() is called, loop doesn't proceed to the next item

Array.prototype.asyncEach = function(iterator, done) {
  var list    = this,
	  n       = list.length,
	  i       = -1,
	  calls   = 0,
	  looping = false;

  var iterate = function() {
	calls -= 1;
	i += 1;
	if (i === n) { done(); return; }
	iterator(list[i], i, resume);
  };

  var loop = function() {
	if (looping) return;
	looping = true;
	while (calls > 0) iterate();
	looping = false;
  };

  var resume = function() {
	calls += 1;
	if (typeof setTimeout === 'undefined') loop();
	else setTimeout(iterate, 1);
  };
  resume();
};

// http://jsfiddle.net/Keleko34/H7Spu/
// http://stackoverflow.com/a/12274886/1238884
if("undefined"==typeof window.Element){window.Element=function(){return{prototype:{}}}();var __getElementById=document.getElementById,__createElement=document.createElement;document.getElementById=function(a){a=__getElementById(a);for(var d in Element)a[d]=Element[d];for(var b in Element.prototype)a[b]=Element.prototype[b]};document.createElement=function(a){__createElement(a)}}
Element.prototype.setAttributes=function(a){var d=function(b,a){for(var c in b)"object"==typeof b[c]&&null==b[c].dataset&&null==b[c][0]?d(b[c],a[c]):a[c]=b[c]};d(a,this)};

// http://pieroxy.net/blog/pages/lz-string/index.html
var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

// http://ejohn.org/blog/javascript-micro-templating/
// (function(){var b={};this.tmpl=function e(a,c){var d=/\W/.test(a)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):b[a]=b[a]||e(document.getElementById(a).innerHTML);return c?d(c):d}})();

// Base64.encode() & Base64.decode() methods
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// md5 hashing routine; usage var hash = md5("hash"); // source: https://github.com/blueimp/JavaScript-MD5
!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define(function(){return t}):a.md5=t}(this);

// convert data-uri scheme to Blob
// const dataURItoBlob = await (await fetch(dataURI)).blob();
// function dataURItoBlob(b){if (b&&b.indexOf(",")===-1) return; var a=atob(b.split(",")[1]);b=b.split(",")[0].split(":")[1].split(";")[0];for(var d=new ArrayBuffer(a.length),e=new Uint8Array(d),c=0;c<a.length;c++)e[c]=a.charCodeAt(c);a=new DataView(d);return new Blob([a],{type:b})};
var dataURItoBlob = function(dataurl) {
    var parts = dataurl.split(','), mime = parts[0].match(/:(.*?);/)[1]
    if(parts[0].indexOf('base64') !== -1) {
        var bstr = atob(parts[1]), n = bstr.length, u8arr = new Uint8Array(n)
        while(n--){
            u8arr[n] = bstr.charCodeAt(n)
        }

        return new Blob([u8arr], {type:mime})
    } else {
		console.trace('data uri to blob was not base64', dataurl);
        var raw = decodeURIComponent(parts[1])
        return new Blob([raw], {type: mime})
    }
}

// convert data-uri scheme to ArrayBuffer (used to read a zip from a base64 encoded file)
// function dataURItoArrayBuffer(b){var a=atob(b.split(",")[1]);b=b.split(",")[0].split(":")[1].split(";")[0];for(var d=new ArrayBuffer(a.length),e=new Uint8Array(d),c=0;c<a.length;c++)e[c]=a.charCodeAt(c);return d};

// convert an array buffer to base64 data
// function arrayBufferToBase64(ab) { return btoa(String.fromCharCode.apply(null, new Uint8Array(ab))); }

// function obj2url(obj) {
//   var str = [];
//   for(var p in obj)
// 	if (obj.hasOwnProperty(p)) {
// 	  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
// 	}
//   return str.join("&");
// }


// function arrayBufferToBase64( buffer ) {
// 	var binary = '';
// 	var bytes = new Uint8Array( buffer );
// 	var len = bytes.byteLength;
// 	for (var i = 0; i < len; i++) {
// 		binary += String.fromCharCode( bytes[ i ] );
// 	}
// 	return window.btoa( binary );
// }

// function base64ToArrayBuffer(base64) {
// 	var binary_string =  window.atob(base64);
// 	var len = binary_string.length;
// 	var bytes = new Uint8Array( len );
// 	for (var i = 0; i < len; i++)        {
// 		bytes[i] = binary_string.charCodeAt(i);
// 	}
// 	return bytes.buffer;
// }

// plain javascript version of siblings() in jquery
// var getSiblings = function (elem) {
// 	var siblings = [];
// 	var sibling = elem.parentNode.firstChild;
// 	for ( ; sibling; sibling = sibling.nextSibling ) {
// 		if ( sibling.nodeType === 1 && sibling !== elem ) {
// 			siblings.push( sibling );
// 		}
// 	}
// 	return siblings;
// };

function safeGetProp(obj, props, defaultValue) {
  try {
	return props.split('.').reduce(function lib_safeGetProp(obj, p) {
	  return obj[p];
	}, obj);
  } catch(e) {
	return defaultValue
  }
}
function get_property(haystack, needle, empty) {
	let result = safeGetProp(haystack, needle, undefined);
	if ("undefined" === typeof result) return empty;
	return result;
}

function property_exists(haystack, needle) {
	try {
		return needle.split('.').reduce((a,b) => (a||{})[b], haystack) !== undefined;
	} catch (e) {
		return false;
	}
}

// popup window centered (location,title,width,height)
function PopupCenter(a,d,b,c){var e=void 0!=window.screenLeft?window.screenLeft:screen.left,f=void 0!=window.screenTop?window.screenTop:screen.top;width=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width;height=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height;a=window.open(a,d,"scrollbars=yes, width="+b+", height="+c+", top="+(height/2-c/2+f)+", left="+
(width/2-b/2+e) + ', resizable=yes');window.focus&&a.focus()};

// await with timeout
// const someValue = await asyncCallWithTimeout(promisableFunction, timeout);
const asyncCallWithTimeout = async (asyncPromise, timeLimit) => {
	let timeoutHandle;

	const timeoutPromise = new Promise((_resolve, reject) => {
		timeoutHandle = setTimeout(
			() => reject(new Error('Async call timeout limit reached')),
			timeLimit
		);
	});

	return Promise.race([asyncPromise, timeoutPromise]).then(result => {
		clearTimeout(timeoutHandle);
		return result;
	})
}

function randomIntFromInterval(min = 1, max = 10) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function fileExtension(filename) {
	return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename
}

const escapeHtml = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

/*!
 handlebars v4.0.5 runtime

Copyright (C) 2011-2015 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* added to cdn loader so we get the full compiler too, not just the runtime
!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?exports.Handlebars=b():a.Handlebars=b()}(this,function(){return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={exports:{},id:d,loaded:!1};return a[d].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c={};return b.m=a,b.c=c,b.p="",b(0)}([function(a,b,c){"use strict";function d(){var a=new h.HandlebarsEnvironment;return n.extend(a,h),a.SafeString=j["default"],a.Exception=l["default"],a.Utils=n,a.escapeExpression=n.escapeExpression,a.VM=p,a.template=function(b){return p.template(b,a)},a}var e=c(1)["default"],f=c(2)["default"];b.__esModule=!0;var g=c(3),h=e(g),i=c(17),j=f(i),k=c(5),l=f(k),m=c(4),n=e(m),o=c(18),p=e(o),q=c(19),r=f(q),s=d();s.create=d,r["default"](s),s["default"]=s,b["default"]=s,a.exports=b["default"]},function(a,b){"use strict";b["default"]=function(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b["default"]=a,b},b.__esModule=!0},function(a,b){"use strict";b["default"]=function(a){return a&&a.__esModule?a:{"default":a}},b.__esModule=!0},function(a,b,c){"use strict";function d(a,b,c){this.helpers=a||{},this.partials=b||{},this.decorators=c||{},i.registerDefaultHelpers(this),j.registerDefaultDecorators(this)}var e=c(2)["default"];b.__esModule=!0,b.HandlebarsEnvironment=d;var f=c(4),g=c(5),h=e(g),i=c(6),j=c(14),k=c(16),l=e(k),m="4.0.5";b.VERSION=m;var n=7;b.COMPILER_REVISION=n;var o={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};b.REVISION_CHANGES=o;var p="[object Object]";d.prototype={constructor:d,logger:l["default"],log:l["default"].log,registerHelper:function(a,b){if(f.toString.call(a)===p){if(b)throw new h["default"]("Arg not supported with multiple helpers");f.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){if(f.toString.call(a)===p)f.extend(this.partials,a);else{if("undefined"==typeof b)throw new h["default"]('Attempting to register a partial called "'+a+'" as undefined');this.partials[a]=b}},unregisterPartial:function(a){delete this.partials[a]},registerDecorator:function(a,b){if(f.toString.call(a)===p){if(b)throw new h["default"]("Arg not supported with multiple decorators");f.extend(this.decorators,a)}else this.decorators[a]=b},unregisterDecorator:function(a){delete this.decorators[a]}};var q=l["default"].log;b.log=q,b.createFrame=f.createFrame,b.logger=l["default"]},function(a,b){"use strict";function c(a){return k[a]}function d(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function e(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1}function f(a){if("string"!=typeof a){if(a&&a.toHTML)return a.toHTML();if(null==a)return"";if(!a)return a+"";a=""+a}return m.test(a)?a.replace(l,c):a}function g(a){return a||0===a?p(a)&&0===a.length?!0:!1:!0}function h(a){var b=d({},a);return b._parent=a,b}function i(a,b){return a.path=b,a}function j(a,b){return(a?a+".":"")+b}b.__esModule=!0,b.extend=d,b.indexOf=e,b.escapeExpression=f,b.isEmpty=g,b.createFrame=h,b.blockParams=i,b.appendContextPath=j;var k={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},l=/[&<>"'`=]/g,m=/[&<>"'`=]/,n=Object.prototype.toString;b.toString=n;var o=function(a){return"function"==typeof a};o(/x/)&&(b.isFunction=o=function(a){return"function"==typeof a&&"[object Function]"===n.call(a)}),b.isFunction=o;var p=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===n.call(a):!1};b.isArray=p},function(a,b){"use strict";function c(a,b){var e=b&&b.loc,f=void 0,g=void 0;e&&(f=e.start.line,g=e.start.column,a+=" - "+f+":"+g);for(var h=Error.prototype.constructor.call(this,a),i=0;i<d.length;i++)this[d[i]]=h[d[i]];Error.captureStackTrace&&Error.captureStackTrace(this,c),e&&(this.lineNumber=f,this.column=g)}b.__esModule=!0;var d=["description","fileName","lineNumber","message","name","number","stack"];c.prototype=new Error,b["default"]=c,a.exports=b["default"]},function(a,b,c){"use strict";function d(a){g["default"](a),i["default"](a),k["default"](a),m["default"](a),o["default"](a),q["default"](a),s["default"](a)}var e=c(2)["default"];b.__esModule=!0,b.registerDefaultHelpers=d;var f=c(7),g=e(f),h=c(8),i=e(h),j=c(9),k=e(j),l=c(10),m=e(l),n=c(11),o=e(n),p=c(12),q=e(p),r=c(13),s=e(r)},function(a,b,c){"use strict";b.__esModule=!0;var d=c(4);b["default"]=function(a){a.registerHelper("blockHelperMissing",function(b,c){var e=c.inverse,f=c.fn;if(b===!0)return f(this);if(b===!1||null==b)return e(this);if(d.isArray(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):e(this);if(c.data&&c.ids){var g=d.createFrame(c.data);g.contextPath=d.appendContextPath(c.data.contextPath,c.name),c={data:g}}return f(b,c)})},a.exports=b["default"]},function(a,b,c){"use strict";var d=c(2)["default"];b.__esModule=!0;var e=c(4),f=c(5),g=d(f);b["default"]=function(a){a.registerHelper("each",function(a,b){function c(b,c,f){j&&(j.key=b,j.index=c,j.first=0===c,j.last=!!f,k&&(j.contextPath=k+b)),i+=d(a[b],{data:j,blockParams:e.blockParams([a[b],b],[k+b,null])})}if(!b)throw new g["default"]("Must pass iterator to #each");var d=b.fn,f=b.inverse,h=0,i="",j=void 0,k=void 0;if(b.data&&b.ids&&(k=e.appendContextPath(b.data.contextPath,b.ids[0])+"."),e.isFunction(a)&&(a=a.call(this)),b.data&&(j=e.createFrame(b.data)),a&&"object"==typeof a)if(e.isArray(a))for(var l=a.length;l>h;h++)h in a&&c(h,h,h===a.length-1);else{var m=void 0;for(var n in a)a.hasOwnProperty(n)&&(void 0!==m&&c(m,h-1),m=n,h++);void 0!==m&&c(m,h-1,!0)}return 0===h&&(i=f(this)),i})},a.exports=b["default"]},function(a,b,c){"use strict";var d=c(2)["default"];b.__esModule=!0;var e=c(5),f=d(e);b["default"]=function(a){a.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new f["default"]('Missing helper: "'+arguments[arguments.length-1].name+'"')})},a.exports=b["default"]},function(a,b,c){"use strict";b.__esModule=!0;var d=c(4);b["default"]=function(a){a.registerHelper("if",function(a,b){return d.isFunction(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||d.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})})},a.exports=b["default"]},function(a,b){"use strict";b.__esModule=!0,b["default"]=function(a){a.registerHelper("log",function(){for(var b=[void 0],c=arguments[arguments.length-1],d=0;d<arguments.length-1;d++)b.push(arguments[d]);var e=1;null!=c.hash.level?e=c.hash.level:c.data&&null!=c.data.level&&(e=c.data.level),b[0]=e,a.log.apply(a,b)})},a.exports=b["default"]},function(a,b){"use strict";b.__esModule=!0,b["default"]=function(a){a.registerHelper("lookup",function(a,b){return a&&a[b]})},a.exports=b["default"]},function(a,b,c){"use strict";b.__esModule=!0;var d=c(4);b["default"]=function(a){a.registerHelper("with",function(a,b){d.isFunction(a)&&(a=a.call(this));var c=b.fn;if(d.isEmpty(a))return b.inverse(this);var e=b.data;return b.data&&b.ids&&(e=d.createFrame(b.data),e.contextPath=d.appendContextPath(b.data.contextPath,b.ids[0])),c(a,{data:e,blockParams:d.blockParams([a],[e&&e.contextPath])})})},a.exports=b["default"]},function(a,b,c){"use strict";function d(a){g["default"](a)}var e=c(2)["default"];b.__esModule=!0,b.registerDefaultDecorators=d;var f=c(15),g=e(f)},function(a,b,c){"use strict";b.__esModule=!0;var d=c(4);b["default"]=function(a){a.registerDecorator("inline",function(a,b,c,e){var f=a;return b.partials||(b.partials={},f=function(e,f){var g=c.partials;c.partials=d.extend({},g,b.partials);var h=a(e,f);return c.partials=g,h}),b.partials[e.args[0]]=e.fn,f})},a.exports=b["default"]},function(a,b,c){"use strict";b.__esModule=!0;var d=c(4),e={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(a){if("string"==typeof a){var b=d.indexOf(e.methodMap,a.toLowerCase());a=b>=0?b:parseInt(a,10)}return a},log:function(a){if(a=e.lookupLevel(a),"undefined"!=typeof console&&e.lookupLevel(e.level)<=a){var b=e.methodMap[a];console[b]||(b="log");for(var c=arguments.length,d=Array(c>1?c-1:0),f=1;c>f;f++)d[f-1]=arguments[f];console[b].apply(console,d)}}};b["default"]=e,a.exports=b["default"]},function(a,b){"use strict";function c(a){this.string=a}b.__esModule=!0,c.prototype.toString=c.prototype.toHTML=function(){return""+this.string},b["default"]=c,a.exports=b["default"]},function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=r.COMPILER_REVISION;if(b!==c){if(c>b){var d=r.REVISION_CHANGES[c],e=r.REVISION_CHANGES[b];throw new q["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new q["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){function c(c,d,e){e.hash&&(d=o.extend({},d,e.hash),e.ids&&(e.ids[0]=!0)),c=b.VM.resolvePartial.call(this,c,d,e);var f=b.VM.invokePartial.call(this,c,d,e);if(null==f&&b.compile&&(e.partials[e.name]=b.compile(c,a.compilerOptions,b),f=e.partials[e.name](d,e)),null!=f){if(e.indent){for(var g=f.split("\n"),h=0,i=g.length;i>h&&(g[h]||h+1!==i);h++)g[h]=e.indent+g[h];f=g.join("\n")}return f}throw new q["default"]("The partial "+e.name+" could not be compiled when running in runtime-only mode")}function d(b){function c(b){return""+a.main(e,b,e.helpers,e.partials,g,i,h)}var f=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],g=f.data;d._setup(f),!f.partial&&a.useData&&(g=j(b,g));var h=void 0,i=a.useBlockParams?[]:void 0;return a.useDepths&&(h=f.depths?b!==f.depths[0]?[b].concat(f.depths):f.depths:[b]),(c=k(a.main,c,e,f.depths||[],g,i))(b,f)}if(!b)throw new q["default"]("No environment passed to template");if(!a||!a.main)throw new q["default"]("Unknown template object: "+typeof a);a.main.decorator=a.main_d,b.VM.checkRevision(a.compiler);var e={strict:function(a,b){if(!(b in a))throw new q["default"]('"'+b+'" not defined in '+a);return a[b]},lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:o.escapeExpression,invokePartial:c,fn:function(b){var c=a[b];return c.decorator=a[b+"_d"],c},programs:[],program:function(a,b,c,d,e){var g=this.programs[a],h=this.fn(a);return b||e||d||c?g=f(this,a,h,b,c,d,e):g||(g=this.programs[a]=f(this,a,h)),g},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){var c=a||b;return a&&b&&a!==b&&(c=o.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler};return d.isTop=!0,d._setup=function(c){c.partial?(e.helpers=c.helpers,e.partials=c.partials,e.decorators=c.decorators):(e.helpers=e.merge(c.helpers,b.helpers),a.usePartial&&(e.partials=e.merge(c.partials,b.partials)),(a.usePartial||a.useDecorators)&&(e.decorators=e.merge(c.decorators,b.decorators)))},d._child=function(b,c,d,g){if(a.useBlockParams&&!d)throw new q["default"]("must pass block params");if(a.useDepths&&!g)throw new q["default"]("must pass parent depths");return f(e,b,a[b],c,0,d,g)},d}function f(a,b,c,d,e,f,g){function h(b){var e=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],h=g;return g&&b!==g[0]&&(h=[b].concat(g)),c(a,b,a.helpers,a.partials,e.data||d,f&&[e.blockParams].concat(f),h)}return h=k(c,h,a,g,d,f),h.program=b,h.depth=g?g.length:0,h.blockParams=e||0,h}function g(a,b,c){return a?a.call||c.name||(c.name=a,a=c.partials[a]):a="@partial-block"===c.name?c.data["partial-block"]:c.partials[c.name],a}function h(a,b,c){c.partial=!0,c.ids&&(c.data.contextPath=c.ids[0]||c.data.contextPath);var d=void 0;if(c.fn&&c.fn!==i&&(c.data=r.createFrame(c.data),d=c.data["partial-block"]=c.fn,d.partials&&(c.partials=o.extend({},c.partials,d.partials))),void 0===a&&d&&(a=d),void 0===a)throw new q["default"]("The partial "+c.name+" could not be found");return a instanceof Function?a(b,c):void 0}function i(){return""}function j(a,b){return b&&"root"in b||(b=b?r.createFrame(b):{},b.root=a),b}function k(a,b,c,d,e,f){if(a.decorator){var g={};b=a.decorator(b,g,c,d&&d[0],e,f,d),o.extend(b,g)}return b}var l=c(1)["default"],m=c(2)["default"];b.__esModule=!0,b.checkRevision=d,b.template=e,b.wrapProgram=f,b.resolvePartial=g,b.invokePartial=h,b.noop=i;var n=c(4),o=l(n),p=c(5),q=m(p),r=c(3)},function(a,b){(function(c){"use strict";b.__esModule=!0,b["default"]=function(a){var b="undefined"!=typeof c?c:window,d=b.Handlebars;a.noConflict=function(){return b.Handlebars===a&&(b.Handlebars=d),a}},a.exports=b["default"]}).call(b,function(){return this}())}])});
*/

// compare helper - {{#compare var "!=" "66"}}
Handlebars.registerHelper("compare", function(g, c, e, d) {
    var f;
    if (3 > arguments.length) throw Error("'compare' needs 2 parameters");
    void 0 === d && (d = e, e = c, c = "===");
    f = {
        "==": function(a, b) {
            return a == b
        },
        "===": function(a, b) {
            return a === b
        },
        "!=": function(a, b) {
            return a != b
        },
        "!==": function(a, b) {
            return a !== b
        },
        "<": function(a, b) {
            return a < b
        },
        ">": function(a, b) {
            return a > b
        },
        "<=": function(a, b) {
            return a <= b
        },
        ">=": function(a, b) {
            return a >= b
        },
        "in": function(a, b) {
            return b && -1 != b.indexOf(a)
        },
        "typeof": function(a, b) {
            return typeof a == b
        }
    };
    if (!f[c]) throw Error("Malformed operator in 'compare'; " + c);
    return f[c](g, e) ? d.fn(this) : d.inverse(this)
});

// json serialize helper - {{json var}}
Handlebars.registerHelper('json', function(context) { return JSON.stringify(context); });

Handlebars.registerHelper('stringify', function(context) { return JSON.stringify(context); });

Handlebars.registerHelper('log', function(context) { console.dir(context); });

Handlebars.registerHelper('titlecase', function(str) { return str.charAt(0).toUpperCase + str.slice(1); })

Handlebars.registerHelper('pips', function (num) {
	var i = 0,
		n = Number(num),
		step = Math.floor(n / 10),
		list = [];
	for (i = 1; i<n; i += step) {
		list.push("<option value='" + i + "'>");
	}
	list.push("<option value='" + n + "'>");
	return list.join("");
});

Handlebars.registerHelper('range', function(min,max) {
	var list = [];
	for (var i = min; i < max; i+= Math.floor(max-min) / 10) {
		list.push("option value='" + Math.floor(i) + "'>");
	}
	list.push("option value='" + max + "'>");
	return list.join('');
});

/* these helpers match to plugins/Theme/theme.php */

Handlebars.registerHelper('is', function (a, b, context) {
	return (a == b) ? context.fn(this) : context.inverse(this);
});

Handlebars.registerHelper('urlencode', function (a) {
	var f = Array('%20', '%21', '%2A', '%27', '%28', '%29', '%3B', '%3A', '%40', '%26', '%3D', '%2B', '%24', '%2C', '%2F', '%3F', '%25', '%23', '%5B', '%5D'),
		r = Array('+', '!', '*', "'", "(", ")", ";", ":", "@", "&", "=", "+", "$", ",", "/", "?", "%", "#", "[", "]"),
		s = encodeURIComponent(a);
	for (var i=0; i<f.length; i++) {
		s = s.replace(f[i],r[i]);
	}
	return s;
});

Handlebars.registerHelper('count', function () {
	var c = 0;
	for (var i = 0; i < arguments.length; i++ ) {
		if (typeof arguments[i] === 'object') continue;
		if (arguments[i]) c++; // if argument loosely evaluates to true
	}
	return c;
});

// TODO this will probably break at some point
Handlebars.registerHelper('inject', function(path) {
	var str = "";
	$.ajax({
		url: path,
		dataType: 'html',
		async: false,
		processData: false,
		success: function(html) {
			str = html;
		}
	})
	return str;
});

Handlebars.registerHelper('objecturl', function(data) {
	if (!data) return;
	return dataUrlToObjectUrl(data);
});

Handlebars.registerHelper('bw', function(str) {
	if (!str) return;
	return contrastingColour(str);
});

/* given a payload, find and use various named properties */
Handlebars.registerHelper('bgImage', function(data) {
	if (!data) return;
	return _bgImage(data);
});
function _bgImage(data) {
	let result = [];
	if (data.hasOwnProperty("image")) {
		if (data.image.indexOf('gradient')!==-1) {
			result.push(`background-image:${data.image}`);
		} else {
			result.push(`background-image:url(${data.image})`);
		}
	}
	if (data.hasOwnProperty("size")) result.push(`background-size:${data.size}`);
	if (data.hasOwnProperty("position")) result.push(`background-position:${data.position}`);
	if (result.length) result.push(`background-repeat:no-repeat;`);
	return result.join(';');
}
// Handlebars.registerHelper('bias', function(data) {
// 	switch (data+'') {
// 		case 'undefined':
// 		case 'right-50':
// 		case 'left-50': return 'split-50'; break;
// 		case 'right-25':
// 		case 'left-25': return 'split-30-70'; break;
// 	}
// 	return '';
// })

// if audio is a file, Safari won't play it, it must be a data url for all browsers to play it (jan 2024)
// the routine that calls this is highly synchonous, so we can't use async/await
function prepareAudioSrc(mp3) {
	let d = true, i = 0;
	if (mp3 && typeof mp3 === "string" && mp3.indexOf('base64,')!==-1) return mp3;
	while (d) {
		if (mp3 instanceof File && i === 0) {
			const fr = new FileReader();
			fr.onload = function() {
				// console.log('fr.result', fr.result);
				mp3 = fr.result;
				d = false;
			}
			fr.readAsDataURL(mp3);
		} else if (mp3 instanceof Blob) {
			mp3 = URL.createObjectURL(mp3);
			d = false;
		}
		if (i++ > 10000) d = false; // some timeout/runaway condition
	}
	// console.log('i got to', i);
	return mp3;
}

// convert a dataurl (e.g. image, audio, video) to an objecturl (blob:https://server/guid)
// File is an instance of Blob, and seems
function dataUrlToObjectUrl(data,mime) {
	let blob;
	if (typeof data === "string") { // data url (legacy)
		const spl = data.split(',');
		const binary = atob(spl[1]);
		const mime = spl[0].split(':')[1].split(';')[0];
		let ar = []; for (let i=0; i<binary.length; i++) { ar.push(binary.charCodeAt(i)); }
		blob = new File([new Uint8Array(ar)],  mime.replace(/\//,'.'), {type: mime});
	} else if (data instanceof File) { // File object, uploaded content
		blob = data;
	} else { // maybe a blob or an arraybuffer ... convert it to a File, which allows mixed content for its fileBits
		blob = new File([data], mime.replace(/\//,'.'), { type: mime });
	}
	return isSafari() ? blob : URL.createObjectURL(blob); // safari will use a srcObject, other browsers will use a src
}

// TODO: check if this is still needed
// Element.prototype.empty = function () {
// 	while (this.firstChild) {
// 		this.removeChild(this.firstChild);
// 	}
// 	return this;
// }
// Element.prototype.remove = function() {
// 	this.parentElement.removeChild(this);
// }
// NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
// 	for(var i = 0, len = this.length; i < len; i++) {
// 		if(this[i] && this[i].parentElement) {
// 			this[i].parentElement.removeChild(this[i]);
// 		}
// 	}
// }

// function isInDOMTree(a){return!!findUltimateAncestor(a).body}
// function findUltimateAncestor(a){for(;a.parentNode;)a=a.parentNode;return a};

function xhrFields(fields) {
	var qs = [];
	for (var i in fields) {
		if (fields.hasOwnProperty(i) && fields[i] !== null) {
			qs.push([encodeURIComponent(i), encodeURIComponent(fields[i])].join("="));
		}
	}
	return qs.join("&");
}

// trim should exist, but in case it doesn't ...
if (!String.prototype.trim) {
  (function() {
	// Make sure we trim BOM and NBSP
	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	String.prototype.trim = function() {
	  return this.replace(rtrim, '');
	};
  })();
}

// Yes, I'm bodging the string prototype, are you triggered?
(function() {
	String.prototype.trimExtn = function () {
		return this.replace(/\.[^.]*$/, '');
	}
})();

(function() {
  String.prototype.trimUntilExtn = function () {
	return this.replace(/.*\./, '');
  }
})();


// NOTE
/*

Instead of these colour routines, leverage 

CPicker.prototype.colourProperties(colour)

*/

// hexToRgb
//https://stackoverflow.com/a/5624139/1238884
function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

// convert a colour to rgba() with the specified alpha
function rgba(colour,alpha) {
	let [r,g,b] = [-1,-1,-1];
	if (colour.indexOf('rgba')!==-1) {
		let [r,g,b] = colour.substring(colour.indexOf('(') + 1, colour.lastIndexOf(')')).split(",").map(Number);
	} else if (colour.indexOf('rgb')!==-1) {
		let [r,g,b] = colour.substring(colour.indexOf('(') + 1, colour.lastIndexOf(')')).split(",").map(Number);
	} else if (colour.indexOf('#')!==-1) {
		var v = hexToRgb(colour);
		r = v.r; g = v.g; b = v.b;
	}
	return 'rgba(' + [r,g,b,alpha].join(',') + ')';
}

// var hexToRgb = function(hex) {
// 	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
// 	return result ? {
// 		r: parseInt(result[1], 16),
// 		g: parseInt(result[2], 16),
// 		b: parseInt(result[3], 16)
// 	} : null;
// }

// as for a contrasting colour for a hex, rgb or rgba string
function contrastingColour(colour) {
	let format = 'hex';
	if (colour.indexOf('rgb')!==-1) {
		format = 'rgba';
        let [r,g,b] = colour.substring(colour.indexOf('(') + 1, colour.lastIndexOf(')')).split(",").map(Number);
        colour = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
    let [r,g,b] = colour.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g)
        .map(x => parseInt(x, 16));
   	let l = ((r * 299) + (g * 587) + (b * 114)) / 255000;

   	if (format === "hex") {
	   	return (l > .5) ? '#000000' : '#ffffff';
	} else {
		return (l > .5) ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)';
	}
}

var darkOrLight = function(red, green, blue) {
	var brightness;
	brightness = (red * 299) + (green * 587) + (blue * 114);
	brightness = brightness / 255000;
	if (brightness >= 0.5) {
		return "#000";
	} else {
		return "#fff";
	}
}

/*
 * arrive.js (replaces waitUntilExists, since DOMNodeInserted is now depreciated)
 * v2.3.0
 * https://github.com/uzairfarooq/arrive
 * MIT licensed
 *
 * Copyright (c) 2014-2015 Uzair Farooq
 */


// aspectRatio(from_width,from_height, to_width,to_height) => {width: x, height: y}
// A4 = 1 : 1 / sqrt(2)
function aspectRatio(b,c,a,d){a=Math.min(a/b,d/c);return{width:b*a,height:c*a}};


// javscript Clone an object (not DOM)
function Clone(a){var b;if(null==a||"object"!=typeof a)return a;if(a instanceof Date)return b=new Date,b.setTime(a.getTime()),b;if(a instanceof Array){b=[];for(var c=0,d=a.length;c<d;c++)b[c]=Clone(a[c]);return b}if(a instanceof Object){b={};for(c in a)a.hasOwnProperty(c)&&(b[c]=Clone(a[c]));return b}throw Error("Unable to copy obj! Its type isn't supported.");};

function getObjects(obj, key, val) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) continue;
		if (typeof obj[i] == 'object') {
			objects = objects.concat(getObjects(obj[i], key, val));
		} else
		//if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
		if (i == key && obj[i] == val || i == key && val == '') { //
			objects.push(obj);
		} else if (obj[i] == val && key == ''){
			//only add if the object is not already in the array
			if (objects.lastIndexOf(obj) == -1){
				objects.push(obj);
			}
		}
	}
	return objects;
}

// foo = ownAddEventListener(window,"load", myfunction, false);
// foo() -> dispose
// const ownAddEventListener = (scope, type, handler, capture) => {
//   scope.addEventListener(type, handler, capture);
//   return () => {
//     scope.removeEventListener(type, handler, capture);
//   }
// }


// function scrollIfNeeded(element, container) {
//   if (element.offsetTop < container.scrollTop) {
//     container.scrollTop = element.offsetTop;
//   } else {
//     var offsetBottom = element.offsetTop + element.offsetHeight;
//     var scrollBottom = container.scrollTop + container.offsetHeight;
//     if (offsetBottom > scrollBottom) {
//       container.scrollTop = offsetBottom - container.offsetHeight;
//     }
//   }
// }


// the player can load sub-packages (such as quiz ninja or media ninja packages) that contain full scorm API's themselves
// this is in the context of the selected page
function apiProxy() {
  this.LMSInitialize = function() { return "true"; },
  this.LMSFinish = function () { return "true"; },
  this.LMSGetValue = function (param) {
  switch (param) {
	case "cmi.core.lesson_status": break; /// completed if the page is complete
  }
  return ""; },
  this.LMSSetValue = function (param,value) {
  switch (param) {
	case "cmi.score.raw": break; // used to specify completion
	case "cmi.core.lesson_location": break // used to set timespent
  }
  return "true"; },
  this.LMSCommit = function (param) { return "true"; },
  this.LMSGetLastError = function () { return 0; },
  this.LMSGetErrorString = function () { return "No error"; },
  this.LMSGetDiagnostic = function (param) { return param; }
}
var ninjaApiProxy = new apiProxy(); // global


// player layouts define this function to handle time updates on media playback.
// we only implement it here to display the percentage of playback useful for determining score %
function checkTimeSpent(data, pageIndex) {
	// var n,d,p, $obj = $("#timeTaken"),
	var n,d, $obj = $("#timeTaken"),
	$score = $("#pageScore"); // slideshare, et al

	(typeof data === "object") ? data.hasOwnProperty("slide") ? (n=+data.slide||0,d=+data.total||0) :  (n=+data.seconds||0,d=+data.duration||0) : (n=+data||0,d=+pageIndex||0);

	var pc = Math.round((n/d)*100);
	if ($score.length) {
		$score.text(n + " of " + d + "(" + pc + "%)");
	} else {
		var outp = formatSeconds(n);
		if (isNaN(d)||d===0) {
			// duration was zero
		} else {
			outp += " / " + formatSeconds(d) + " (" + pc + "%)";
		}
		$obj.text(outp);
	}
}

// generic seconds to hh:mm:ss with optional hh: if empty
function formatSeconds(seconds,deflt) {
	let date = new Date(1970,0,1);
	if (isNaN(seconds)) return deflt?deflt:'';
	date.setSeconds(Math.round(seconds));
	return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").replace(/^00:(.*)/,"$1");
}

function CancelThis(elem) {
  //  log("cancelthis", elem);
  $(elem).closest("li").remove();
  setItemOrder();
}
function CancelConversion(fileId) {
  var liElem = document.querySelector("li[data-fileid='" + fileId + "']");
  liElem.parentNode.removeChild(liElem);
  setItemOrder();
  // xhr.abort() exists, but we have no reference to the instance of xhr being used .. to be sorted
}

// var pages = [{}]; // a default object to handle time updates
// Object.defineProperty(pages[0],'status',{
//  get: function () {
//    return this._status || {};
//  },
//  set: function (data) {
//    this._status = data;
//    console.log("pages[0]", data);
//    checkTimeSpent(data);
//  }
// });

function setGlobalVars() {
	DocNinja.options.MUTED 			=  document.body.classList.contains("mute");
	DocNinja.options.AUTOSPLIT 		= !document.body.classList.contains("no-autosplit");
	DocNinja.options.AUTOOPTIMISE 	= !document.body.classList.contains("no-autoresize");
	DocNinja.options.AUTOCENTER 	= !document.body.classList.contains("no-autocenter");
	DocNinja.options.PDFEMBED 		= !document.body.classList.contains("no-pdfembed");
	DocNinja.options.PDFTOOLS 		= !document.body.classList.contains("no-pdftoolbar");
	DocNinja.options.RECORDCURSOR	=  document.body.classList.contains("record-cursor");
}

window.addEventListener('statuschange', function (e) {
  switch(e.detail.status) {
    case 'resit': localforage.getItem(e.detail.id, function action_plugin_view_get(err, value) {
                    var frame = document.getElementById("preview-frame");
                    frame.removeAttribute("data-fileid");
                    frame.setAttribute("src","plugins/QuizBuilder/view.html?" + e.detail.id);
                  });
                  break;
    default: checkTimeSpent(e.detail);break;
  }

}, false);

  // TRIGGER a resize event (cause it to fire)
function triggerResize() {
	var event;
	if (document.createEvent) {
	  event = document.createEvent("HTMLEvents");
	  event.initEvent("resize", true, true);
	} else {
	  event = document.createEventObject();
	  event.eventType = "resize";
	}
	event.eventName = "resize";
	if (document.createEvent) {
	  window.dispatchEvent(event);
	} else {
	  window.fireEvent("on" + event.eventType, event);
	}
}

function triggerOnChange(el) {
	var event;
	if (document.createEvent) {
	  event = document.createEvent("HTMLEvents");
	  event.initEvent("change", true, true);
	} else {
	  event = document.createEventObject();
	  event.eventType = "change";
	}
	event.eventName = "change";
	if (document.createEvent) {
	  window.dispatchEvent(event);
	} else {
	  window.fireEvent("on" + event.eventType, event);
	}
}

/* functions relating to buttons with [data-action] or [data-popover] properties */
var _g_popover_target;
function closePopover(e) {
	const video = document.getElementById('video-overlay');
	if (video) video.parentNode.removeChild(video);

	var b = document.querySelector("div.dn-backdrop");
	if (b) {
		b.removeEventListener("click", closePopover);
		document.body.removeChild(b);
	}
	var p = document.querySelector("div.dn-popover");
	if (p) {
		document.body.removeChild(p);
	}
}

function handleProperty(tgt) {

	var id = tgt.dataset.fileid;
	localforage.getItem(id).then((obj) => {
		let d = {};
		DocNinja.routines.Statistics(tgt.dataset.action);
		switch (tgt.dataset.action) {
			case "page-media":
				let mp3 = get_property(obj, "payload.mp3", false);
				// if (mp3) mp3 = prepareAudioSrc(mp3);
				if (mp3) mp3 = dataUrlToObjectUrl(mp3,'audio/mp3');  // 2024.01.17 - Safari (17) seems to choke on playing media from object urls
				let mp4 = get_property(obj, 'payload.mp4', false);
				if (mp4) mp4 = dataUrlToObjectUrl(mp4,'video/mp4');
				// let mt = (mp3) ? "audio/mp3" : (mp4) ? "video/mp4" : '';
				if (mp3 || mp4) {
					d.mediaUrl = mp3 || mp4;
					if (isSafari() && typeof d.mediaUrl !== 'string') d.srcObject = true;
					// d.mediaType = mt;
					d.showActions = false;
					d.showMedia = true;
					tgt.dataset.init = "page-media";
					d.autoNav = get_property(obj,'autoNav',false);
				} else {
					d.showActions = true;
				}
			break;

			default: 
				d = Object.assign({actions: DocNinja.options.actions}, tgt.dataset);

		}

		// console.dir(d);

		const video = document.getElementById('video-overlay');
		if (video) video.parentNode.removeChild(video);

		const menuitems = DocNinja.options.propertyBar.querySelectorAll('nav.menu > a');
		for (a of menuitems)
			a.classList[a.dataset.propertybar===tgt.dataset.propertybar ? 'add' : 'remove']('active');

		const container = document.getElementById('propertyContainer');
		container.innerHTML = Handlebars.templates['properties-' + tgt.dataset.propertybar](d);
		if (d.hasOwnProperty('srcObject')) container.querySelector('#pageMediaPlayer').srcObject = d.mediaUrl;

		if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndpop);

		if ("init" in tgt.dataset) {
			callDynamicInit(tgt);
		}

	});

}

function handlePopover(tgt) {
	_g_popover_target = tgt;
	var rekt = tgt.getBoundingClientRect(),
		b = document.createElement("div"),
		d = Object.assign({actions:DocNinja.options.actions}, tgt.dataset); // merge DOMStringMap with actions array -> array
	b.addEventListener("click", closePopover, false); // "click outside popover"
	b.classList.add("dn-backdrop");
	document.body.appendChild(b);
	b = document.createElement("div");
	b.classList.add("dn-popover");
	b.dataset.source = tgt.dataset.action;
	b.innerHTML = Handlebars.templates["popovers"](d);
	b.style.top = (rekt.y + rekt.height + 10) + "px";
	b.style.right = "calc((100vw + .5em) - " + (rekt.x + rekt.width) + "px)";
	document.body.appendChild(b);
	switch (tgt.dataset.action) {
		case "toggle-settings":
			DocNinja.PurityControl.Utils.SanityCheckOptions();
			$("input[data-action='toggle-mute']").prop("checked", !DocNinja.options.MUTED);
			$("input[data-action='toggle-no-autosplit']").prop("checked", DocNinja.options.AUTOSPLIT);
			$("input[data-action='toggle-no-autoresize']").prop("checked", DocNinja.options.AUTOOPTIMISE);
			$("input[data-action='toggle-no-autocenter']").prop("checked", DocNinja.options.AUTOCENTER);
			$("input[data-action='toggle-no-pdftoolbar']").prop("checked", DocNinja.options.PDFTOOLS);
			$("input[data-action='toggle-no-pdfembed']").prop("checked", DocNinja.options.PDFEMBED);
			$("input[data-action='toggle-record-cursor']").prop("checked", DocNinja.options.RECORDCURSOR);
			break;

		case "page-layout":
			$("input[value='left']").prop("checked", tgt.dataset.value === "left");
			$("input[value='center']").prop("checked", tgt.dataset.value === "center");
			break;

		case "toggle-add-content":
			b.style.right = 'initial';
			b.style.width = '475px';
			b.style.left = '10px';
			b.style.top = (rekt.y + rekt.height + 9) + "px"
			// b.style.left = rekt.x + (rekt.width / 3) + 'px';
			break;

		break;
	}
	if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndpop);
	if ("init" in tgt.dataset) {
		callDynamicInit(tgt);
	}
}

function callDynamicInit(tgt) {
	switch (tgt.dataset.init) {
		case "jscolor":
			document.getElementById('pb_picker').value = DocNinja.options.pageBackgroundColour || '#ffffff';
			// BindColourPicker(
			// 	document.getElementById('pb_picker'),
			// 	function(colour) {
			// 		if (colour.indexOf('rgb')!==-1) {
			// 			var a = colour.substr(colour.indexOf('(')).split(',').map(function(a) {
			// 				return parseInt(a,10);
			// 			});
			// 			colour = "#" + ((1 << 24) + (a[0] << 16) + (a[1] << 8) + a[2]).toString(16).slice(1);
			// 		}
			// 		previewPageBackground(colour);
			// 	});
			// var picker = new jscolor(b.querySelector("button.jscolor"), {
			// 	valueElement:'color_value',
			// 	value: tgt.dataset.value ? tgt.dataset.value : DocNinja.options.pageBackgroundColour,
			// 	onFineChange: debounce(function() {
			// 		previewPageBackground(this.toHEXString());
			// 	}, 500),
			// 	hash: true
			// });
			break;

		case "scoreslider":
			var n = document.getElementById('score_slider');
			var p=((Number(n.value)*100)/Number(n.max));
			n.nextElementSibling.style.left="calc("+p+"% - 1rem)";
			break;

		case "rangeslider":
			console.trace(); // shouldn't be anything htiting this anymore
			break;

		case "videorange":
			document.getElementById('score_scrubber').checked = (tgt.dataset.checked === 'true');
			var n = document.getElementById('range_slider');
			var p=((Number(n.value)*100)/Number(n.max));
			n.nextElementSibling.style.left="calc("+p+"% - 1rem)";
			break;

		case "page-media":
			import("./media.preview.js").then(root => {
				root.Preview(DocNinja);
			});
			break;


		// case "initaudio":
		// 	var id = DocNinja.filePreview.CurrentFile();
		// 	var audio = document.getElementById('popover_audioElement');
		// 	if (audio.src) {audio.classList.add('visible');}
		// 	else {audio.classList.remove('visible');}
		// 	localforage.getItem(id).then(function (obj) {
		// 		document.getElementById("popover_audioElement").src = obj.payload.mp3;
		// 		document.getElementById("pageAudioNav").checked = obj.autoNav;
		// 	});
		// 	break;

		case "initAttachments":
			var dest = document.getElementById('page-file-attachments');
			var id = DocNinja.filePreview.CurrentFile();
			dest.innerHTML = '';
			localforage.getItem(id).then(function(obj) {
				if (obj.hasOwnProperty('attachments')) for (file of obj.attachments) {
					dest.insertAdjacentHTML('beforeend', Handlebars.templates["page-attachment"](file));
				}
			})
			break;

		case "select-transform":
			var id = DocNinja.filePreview.CurrentFile();
			localforage.getItem(id).then(function(obj) {
				if (obj.hasOwnProperty('payload') && obj.payload.hasOwnProperty('transform')) {
					for (el of document.querySelectorAll('input[name="transform-style"]')) {
						if (el.value === obj.payload.transform) el.setAttribute('checked', true); 
					}
				}
			});
	}
}


function reset_timeline() {

	['popover_audioElement','popover_videoElement', 'timeline'].forEach(id => {
		const div = document.getElementById(id);
		div.toggleAttribute('hidden', id.indexOf('popover') > -1);
		div.replaceChildren();
		// div.removeAttribute('src');
		// div.removeAttribute('controls');
	});

}

/* draw a visualisation of the audio or video for the current file */
// function initialise_timeline() {
// 	document.querySelector(`#propertyBar a[data-action='page-media']`).click();
// }

// 	if (obj.supports.indexOf('media') !== -1) {
// 		obj.supportsAudio = true;
// 		setCSSVariable("--propertyBarHeight", DocNinja.options.timelineHeight +'px');
// 	} else {
// 		setCSSVariable("--propertyBarHeight", DocNinja.options.timelineMinHeight +'px');
// 	}
// 	if (!obj.hasOwnProperty('payload')) return; // nothing to do yet

// 	import("./media.timeline.js").then(timeline => {
// 		if (obj.payload.hasOwnProperty('mp3') && obj.payload.mp3.length) {
// 			obj.showMedia = true;
// 			obj.mediaUrl = dataUrlToObjectUrl(obj.payload.mp3);
// 		} else if (obj.payload.hasOwnProperty('mp4') && obj.payload.mp4.length) {
// 			obj.showMedia = true;
// 			obj.mediaUrl = dataUrlToObjectUrl(obj.payload.mp4);
// 		} else {
// 			obj.showActions = true;
// 		}
// 		DocNinja.options.propertiesBar.innerHTML = Handlebars.templates["properties-media"](obj);

// 		if (obj.hasOwnProperty('payload') && obj.payload.hasOwnProperty('cursor')) {
// 			DocNinja.options.mus = new Mus({
//             	target: document.getElementById('preview-frame').contentWindow
//         	});
// 			DocNinja.options.mus.setData(obj.payload.cursor);
// 		}

// 		// const container = document.querySelector('.timeline-display');
// 		// if (obj.hasOwnProperty('payload') && obj.payload.hasOwnProperty('mp3')) {
// 		// 	const element = document.getElementById('popover_audioElement');
// 		// 	element.src = dataUrlToObjectUrl(obj.payload.mp3);
// 		// 	timeline.GenerateWaveform(element, container).then(() => {
// 		// 		// cool
// 		// 	}).finally(() => {
// 		// 		timeline.RenderMediaControl(element, mus);
// 		// 	});
// 		// } else if (obj.hasOwnProperty('payload') && obj.payload.hasOwnProperty('mp4')) {
// 		// 	const element = document.getElementById('popover_videoElement');
// 		// 	element.src = dataUrlToObjectUrl(obj.payload.mp4);
// 		// 	timeline.GenerateWaveform(element, container).then(() => {
// 		// 	// timeline.GenerateThumbnails(element, container).then(() => {
// 		// 	}).catch(err => {
// 		// 		console.warn(err);
// 		// 	}).finally(() => {
// 		// 		timeline.RenderMediaControl(element, mus);
// 		// 	});
// 		// } else {
// 		// 	container.innerHTML = 'Page has no media';
// 		// }
// 	});
// }

/* playing a sound that didn't involve a user interaction now throws an exception, so cope with that silently */
function playSound(obj) {
	Promise.resolve(obj.play()).catch(function(ex) {
		console.dir(ex);
	});
}
function handleAction(node, e) {
	var tgt = (typeof node === 'undefined') ? _g_popover_target : node;

	DocNinja.routines.Statistics(tgt.dataset.action);

	switch (tgt.dataset.action) {
		case "pop-help":
			var w = window.open(tgt.dataset.url,"_blank");
			w.focus();
			break;

		case "add-upload":
		case "add-paste":
		case "add-choose":
			closePopover();
			classie.addClass(document.body,"modal-add");
			document.querySelector(".modal.add-content nav>a[href='#" + tgt.dataset.action + "']").click();
			if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndpop);
			break;
		case "close-add-content":
			classie.removeClass(document.body,"modal-add");
			break;

		case "import-content":
			classie.addClass(document.body,"modal-import");
			if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndpop);
			break;

		case "close-import-content":
			classie.removeClass(document.body,"modal-import");
			break;

		case "toggle-rename":
			var li = e.target.closest("[data-fileid]"); if (!li) return;
			var n = li.querySelector("a[data-action='preview']"); if (!n) return;
			renameNode(li.dataset.fileid, n);
			break;

		case "tab-switch":
			e.preventDefault();
			for (n of e.target.closest("nav").querySelectorAll("a")) {
				n.classList[n===e.target ? "add" : "remove"]("active");
				document.querySelector(n.getAttribute("href")).classList[n===e.target ? "add" : "remove"]("active");
			};
			break;

		// case "select-preset":
		// 	e.preventDefault();
		// 	DocNinja.Plugins.Theme.loadPreset(tgt.getAttribute('href').substr(1));
		// 	break;

		default:
			performAction(tgt, e);
	}
}

function previewPageBackground(colour) {
	DocNinja.filePreview.Editing.ShowBgColour(colour);
	document.querySelector("input[name='color_value']").value = colour;
	DocNinja.options.pageBackgroundColour = colour;
}

function popover_saveScore() {
	var id = DocNinja.filePreview.CurrentFile(),
		score = Number(document.getElementById("score_slider").value); //noUiSlider.get();
	persistProperty(id, {
		"score": score
	}).then(DocNinja.filePreview.Refresh);
}

function popover_saveRange() {
	var id = DocNinja.filePreview.CurrentFile(),
		//button = document.querySelector("button[data-popover='videorange']"),
		scrub = document.getElementById("score_scrubber"),
		score = Number(document.getElementById("range_slider").value),  //noUiSlider.get();
		scrubber = scrub.checked;
	//button.dataset.value = score;
	persistProperty(id, {
		"score": score,
		"scrub": scrubber
	}).then(DocNinja.filePreview.Refresh);
}

function popover_audioNavToggle(state) {
	var id = DocNinja.filePreview.CurrentFile();
	persistProperty(id, "autoNav", state);
}

// inject a blob as the audio file for the current page if it doesn't already have page audio
function importAudioToCurrentPage_noOverwrite(blob, this_fileid) {
	var id = DocNinja.filePreview.CurrentFile();
	localforage.getItem(id).then(function (obj) {
		if (!Supports(obj, 'media')) {
			_finishConversion({
				status: "error",
				error: "The selected page does not support audio.",
				fileInfo: null,
				fileId: this_fileid
			}) ; // can't apply audio to this page type
		}
		if (!obj.payload.hasOwnProperty('mp3') ) {
			const fr = new FileReader();
			fr.onloadend = function(e) {
				popover_saveMedia({
					"payload.mp3": e.target.result, // legacy: stored as either a File or a dataurl
					"payload.cursor": undefined
				});
			}
			fr.readAsDataURL(new Blob([blob],{type: 'audio/mp3'}));
		} else {
			_finishConversion({
				status: "error",
				error: "The selected page already has page audio; file was not imported.",
				fileInfo: null,
				fileId: this_fileid
			});
		}
	});
}

function popover_saveMedia(data) {
	var id = DocNinja.filePreview.CurrentFile();
	persistProperty(id, data).then(() => {
		closePopover();
		window.setItemOrder();
		document.querySelector(`#propertyBar a[data-action='page-media']`).click();
	});
}

function saveToCurrentFile(prop, value){
	let id = DocNinja.filePreview.CurrentFile();
	return persistProperty(id, prop, value);
}

function loadCurrentFile() {
	let id = DocNinja.filePreview.CurrentFile();
	return localforage.getItem(id);
}

// function popover_saveMedia_old(data, extn) {
// 	var id = DocNinja.filePreview.CurrentFile();
// 	engagement('page_save_media', extn);
// 	persistProperty(id, "payload."+extn, data).then(() => {
// 		closePopover();
// 		window.setItemOrder();
// 		document.querySelector(`#propertyBar a[data-action='page-media']`).click();
// 	});
// 	// localforage.getItem(id).then(function (obj) {
// 	// 	obj.payload[extn] = data;
// 	// 	// console.dir(obj);
// 	// 	// document.querySelector("button[data-action='set-audio']").dataset.init = "initaudio";
// 	// 	closePopover();
// 	// 	localforage.setItem(id, obj).then(function(obj) {
// 	// 		window.setItemOrder();
// 	// 		initialise_timeline(obj);
// 	// 	});
// 	// })
// }

function popover_cancelMedia() {
	document.querySelector(`#propertyBar a[data-action='page-media']`).click();
}

function popover_processMedia(data) {
	popover_audioUpload(data.file, data.cursor);
}

function popover_audioUpload(file, cursor) {
	if (!file) return;
	const id = DocNinja.filePreview.CurrentFile();
	if (/audio\/(?:x-)*mp(?:3|eg)|video\/(?:x-)*mp4+/.test(file.type)) {
		const prop = "payload." + file.type.split('/').pop().toLowerCase().replace('mpeg','mp3');
		let obj = {};
		obj[prop] = file;
		if (cursor) obj["payload.cursor"] = cursor;
		popover_saveMedia(obj);
		// var reader = new FileReader();
		// reader.onloadend = function(e) {
		// 	popover_saveMedia(e.target.result, file.type.split('/').pop().toLowerCase().replace('mpeg','mp3'));
		// }
		// reader.readAsDataURL(file);
	} else {
		// $("button[data-action='upload-page-audio'] i").toggleClass("ninja-upload3 ninja-spinner");
		import("./media.conversion.js").then(module => {
			module.Convert(file, id)
				.then(function(result) {
					const prop = "payload." + result.type.split('/').pop().toLowerCase();
					let obj = {};
					obj[prop] = file;
					if (cursor) obj["payload.cursor"] = cursor;
					popover_saveMedia(obj); // , result.type.split('/').pop().toLowerCase());
					// var reader = new FileReader();
					// reader.onloadend = function(e) {
					// 	popover_saveMedia(e.target.result, result.type.split('/').pop().toLowerCase());
					// }
					// reader.readAsDataURL(result);
				})
				.catch(function(error) {
					console.dir(error);
				});
				// .finally(() => {
				// 	$("button[data-action='upload-page-audio'] i").toggleClass("ninja-upload3 ninja-spinner");
				// });
		});
	}
}

function popover_savePageBackground(all) {
	var id = DocNinja.filePreview.CurrentFile(),
		colour = document.querySelector("input[name='color_value']").value.replace("#",""); // sans-octothorp
	if (all) { //} || document.getElementById('colourAll').checked) {
		closePopover();
		return DocNinja.Page.ModifyAllPageBackgroundColours(colour);
	} else {
		if (null === id) { closePopover(); return; }
		localforage.getItem(id).then(function (obj) {
			switch (obj.kind || obj.format) {
				case "iframe":
					break;
				case "plugin": case "image": case "video":
					obj.payload.backgroundColour = colour;
					if (get_property(obj,"plugin") === "Intro") {
						obj = DocNinja.Page.ModifyIframeBackgroundColour(obj, colour);
					}
					break;
				case "url":
					obj = DocNinja.Page.ModifyIframeBackgroundColour(obj, colour);
					obj.payload.backgroundColour = colour;
					break;
				case "file":
					obj = DocNinja.Page.ModifyPageBackgroundColour(obj, colour);
					break;
				default:
					alert("OOps! Unhandled page type (nothing was saved)");
					console.error("Unhandled page type in background colour routine", obj);
			}
			// DocNinja.filePreview.Editing.ShowBgColour(colour);
			closePopover();
			return localforage.setItem(id, obj);
		});
	}
}

function popover_useRecording(mp3) {
	var id = DocNinja.filePreview.CurrentFile();
	persistProperty(id, "payload.mp3", mp3).then(() => {
		document.querySelector("button[data-action='set-audio']").dataset.init = "initaudio";
		closePopover();
		window.setItemOrder();
	});
	// localforage.getItem(id).then(function (obj) {
	// 	obj.payload.mp3 = mp3;
	// 	document.querySelector("button[data-action='set-audio']").dataset.init = "initaudio";
	// 	closePopover();
	// 	localforage.setItem(id, obj).then(function() {
	// 		// DocNinja.PurityControl.Nav.Check();
	// 		window.setItemOrder();
	// 	});
	// });
}

function popover_setLayout(position) {
	var id = DocNinja.filePreview.CurrentFile();
	localforage.getItem(id).then(function (obj) {
		obj = DocNinja.Page.ModifyDocumentCentering(obj, position);
		closePopover();
		var a = document.createElement("a"); a.setAttribute("file-id", id);
		DocNinja.filePreview.Preview(a);
		a = null;
		localforage.setItem(id, obj);
	});
}

function popover_attachFiles(files) {

	const id = DocNinja.filePreview.CurrentFile();
	const dest = document.getElementById('page-file-attachments');
	for (file of files) {
		let reader = new FileReader();
		let fileName = file.name || 'Untitled';
		reader.onloadend = function (event) {
			localforage.getItem(id).then(function (obj) {
				if (!obj.hasOwnProperty('attachments')) obj.attachments = [];
				obj.attachments.push({
					name: fileName,
					file: event.target.result
				});
				dest.insertAdjacentHTML('beforeend', Handlebars.templates["page-attachment"]({name: fileName}));
				// closePopover();
				localforage.setItem(id, obj).then(function () {
					window.setItemOrder();
					// DocNinja.PurityControl.Nav.Check();
					// var updated = DocNinja.Navigation.Icons.Add('attachment',id);
					// if (updated) window.setItemOrder();
				});
			});
		}
		reader.readAsDataURL(file);
	}
}

function popover_saveTransform(applyAll) {
	var id = DocNinja.filePreview.CurrentFile();
	localforage.getItem(id).then(function (obj) {
		var el = document.querySelector('input[name="transform-style"]:checked'),
			value = el && el.value;
		if (value && value.length) {
			DocNinja.Page.ModifyDocumentTransforms(id, obj, value, applyAll)
			.then(function(result) {
				closePopover();
				DocNinja.filePreview.Refresh();
			})
		} else {
			closePopover();
		}
	});
}

function popover_saveMouseRecording(data) {
	var id = DocNinja.filePreview.CurrentFile();
	persistProperty(id, "cursor", data);
	// localforage.getItem(id).then(function (obj) {
	// 	obj.payload.cursor = data;
	// 	localforage.setItem(id, obj); // .then(function () {
	// 		// DocNinja.filePreview.Refresh();
	// 	// });
	// });
}

function renameNode(id, a) {
	//console.log("renameNode", id, a);
	//console.trace();
	var p = a.parentNode,
		text = a.textContent,
		inp = document.createElement("input");

	p.removeChild(a);
	inp.value = text;
	inp.dataset.oldValue = text;
	var cancelName = function() {

		if (inp) p.removeChild(inp);
		// replace input with hyperlink containing oldValue

		var l = document.createElement("a");
		l.dataset.action="preview";
		l.setAttribute("href","javascript:;");
		l.textContent=inp.dataset.oldValue;

		p.appendChild(l);
		setItemOrder(); // nothing has really changed
		inp = null;
		document.body.removeEventListener('click', cancelName);
		var cp = document.getElementById('preview-frame');
		if (cp) try {
			var b = cp.contentWindow.document.body;
			if (b) b.removeEventListener('click', cancelName);
		} catch (ex) {
			console.warn(ex);
		}
	}
	inp.onkeydown = function (evt) {
		evt = evt || window.event;
		var isEscape = false, isEnter = false, tgt = evt.target;
		if ("key" in evt) {
			isEscape = (evt.key == "Escape" || evt.key == "Esc");
			isEnter = (evt.key == "Enter");
		} else {
		    isEscape = (evt.keyCode == 27);
		    isEnter = (evt.keyCode == 13);
		}
		if (!(isEnter || isEscape)) return true;
		if (isEnter) {
			persistProperty(id, "name", inp.value).then(cancelName); // which undoes the input and forces re-render
			inp.dataset.oldValue = inp.value;
		} else {
			cancelName();
		}
	}
	inp.classList.add("rename-page");
	p.appendChild(inp);

	document.body.addEventListener('click', cancelName);
	var cp = document.getElementById('preview-frame');
	if (cp) try {
		var b = cp.contentWindow.document.body;
		if (b) b.addEventListener('click', cancelName);
	} catch (ex) {
		console.warn(ex);
	}

	// ensure focus is inside input otherwise we can't click into it without cancelling!
	inp.focus();
	inp.select();

}

function hideOverlays(cog) {
	var classes = ["drag-over","modal-add","modal-import"];
	if (cog) classes.push("settings");
	DOMTokenList.prototype.remove.apply(document.body.classList, classes);
}

function performAction(tgt, e) {
	var id = tgt.closest("[data-fileid]") ? tgt.closest("[data-fileid]").dataset.fileid : DocNinja.filePreview.CurrentFile(), // self or li or container
		attrib = tgt.getAttribute("data-action");

	// for every rule there is always an exception
	// 2024.01.16 - moved to importer plugin
	// switch (attrib) {
	// 	case "remove-saved-course":
	// 	case "download-saved-course":
	// 		break;
	// 	default:
	// 		hideOverlays();
	// }
	hideOverlays();

	DocNinja.routines.Statistics(attrib);

	// ok now do the action.
	switch (attrib) {

		case "preview":
			var a = tgt;
			if (a.timerID) { // this can misfire if you multicall performAction within 250ms!
				clearTimeout(a.timerID);
				a.timerID=null;
				if (e.which > 0 && e.which < 13) { DocNinja.filePreview.Select(tgt.closest("li")); return; } // it's a mouse button, e.g. 1, 2, 3
				renameNode(id, a);
			} else {
				a.timerID = setTimeout(function action_preview_timeout() {
					a.timerID = null;
					DocNinja.filePreview.Select(tgt.closest("li"));
				},250);
			}
			break;

		// case "item-increase":
		// 	DocNinja.PurityControl.Nav.Indent(tgt.closest("li"));
		// 	break;

		// case "item-decrease":
		// 	DocNinja.PurityControl.Nav.Outdent(tgt.closest("li"));
		// 	break;

		case "item-depth-cycle":
			DocNinja.PurityControl.Nav.CycleDepth(tgt.closest("li"));
			break;

		case "upload-kloudless":
			kloudlessInput();
			// DocNinja.KLOUDLESS_INPUT.choose();
			break;

		case "upload-dropbox":
			Dropbox.choose({
				success: function action_upload_dropbox_success(files) {
					for (var i=0;i<files.length;i++) {
						(function (file,index) { // iife closure
							if (!file.isDir) {
								DocNinja.fileConversion.HandleUrlUpload(file.name, file.link);
								// file: {name, link, bytes, icon, thumbnailLink}
							}
						}(files[i],i));
					}
				},
				cancel: function () {
					// fine
				},
				linkType: "direct",
				multiselect: true
			});
			break;

		case "upload-file":
			document.getElementById("uplControl").click();
			break;

		case "plugin-edit":
			localforage.getItem(id, function action_plugin_edit_get(err, value) {
				//if (!App.Minified) value.plugin += "/src";
				var frame = document.getElementById("preview-frame");
				frame.removeAttribute("data-fileid");
				frame.setAttribute("src","plugins/" + value.plugin + "/edit.html?" + id);
			});
			break;

		case "plugin-view":
			localforage.getItem(id, function action_plugin_view_get(err, value) {
				var frame = document.getElementById("preview-frame");
				frame.removeAttribute("data-fileid");
				frame.setAttribute("src","plugins/" + value.plugin + "/view.html?" + id);
			});
			break;

		case "plugin-export":
			localforage.getItem(id, function action_plugin_view_get(err, value) {
				DocNinja.Plugins[value.plugin].Export(id);
			});
			break;




		// case "paste-url":
		// 	classie.addClass(DocNinja.options.pasteUrlObj,"visible");
		// 	DocNinja.options.pasteUrlObj.querySelector("textarea").focus();
		// 	break;

		// case "cancel-paste":
		// 	classie.removeClass(DocNinja.options.pasteUrlObj,"visible");
		// 	$("textarea",DocNinja.options.pasteUrlObj).val("");
		// 	break;

		case "process-paste":
			var li = document.createElement("li"),
				url = $("#paste-url-obj").val(),
				website = ($("#paste-url-website").prop("checked") === true),
				urlOrWebsite = (website) ? "website" : "url";

			$("#paste-url-website").prop("checked",false); // reset
			$("#paste-url-obj").val(""); // reset

			if (url.length) {
				li.innerHTML = url;
				li.setAttribute("data-fileid",DocNinja.PurityControl.Nav.GetFileId()); // "file-" + (new Date().getTime()).toString(36));
				DocNinja.navItems.appendChild(li);
				DocNinja.fileConversion.BeginConversion(null, {url: url }, li, urlOrWebsite, "");
			}
			break;

		case "pop-help":
			PopupCenter (this.href,"Help & Documentation", 650, ~~(($(window).height() /5) * 4));
			break;

		case "confirm-action":
			$(".confirmation", "#delete-page").addClass("active");
			$('a[data-action="confirm-action"] span').text("Really?");
			break;

		case "cancel":
			$(".confirmation", "#delete-page").removeClass("active");
			$('a[data-action="confirm-action"] span').text("Delete page?");
			break;

		// case "pixlr-enhance":
		// 	DocNinja.filePreview.Editing.StartPixlr(id);
		// 	break;

		case "content-editable":
			// DocNinja.filePreview.Editing.Enable();
			break;

		case "save-content-editable":
			DocNinja.filePreview.Save();
			DocNinja.filePreview.Editing.Disable();
			break;

		case "cancel-content-editable":
			DocNinja.filePreview.Editing.Disable();
			break;

		case "shrink": // resize an image [larger than viewport] to be as big as the viewport, and save
			$(document.body).append($("<div id='blocking' />"));
			localforage.getItem(id, function (err, value) {
				// var data = JSON.parse(value);
				var data = value;
				var h = Hermite.init("js/workers/hermite/hermite-worker.js"),
					img = new Image();
				img.onload = function () {
					var ratio = aspectRatio(img.naturalWidth,img.naturalHeight, ifrCache.w, ifrCache.h);
					h.resize({source: img, width: ratio.width, height: ratio.height, quality: 0.8}, function action_shrink_resize_done(output) {
						$("#blocking").remove();
						img = null;
						data.payload.image = output.src;
						// localforage.setItem(id, JSON.stringify(data), function () {
						localforage.setItem(id, data, function action_shrink_resize_set() {
							DocNinja.filePreview.Reset();
							DocNinja.filePreview.Preview(document.querySelector("li[data-fileid='" + id + "']")); // start over
						});
					});
				}
				img.src = data.payload.image;
			});
			break;

		case "trash":
			trashPage(id);
			break;

		case "split":
			$(document.body).append($("<div id='blocking' />")); // .append($("<div class='wait-bar'><span>&hellip; this may take a while &hellip;</span></div>")));
			localforage.getItem(id, function (err, obj) { // we want the raw object again, not what is rendered

				var n = document.querySelector("li[data-fileid='" + id + "']");
				DocNinja.Page.Split(n, obj).then(function action_split_done(result) {

					// remove original LI
					n.parentNode.removeChild(n);

					// re-cache the new items (otherwise they are orphaned)
					setItemOrder();

					// since the document preview is now not actually what is stored, reset the preview
					DocNinja.filePreview.Reset();

					// finally, remove the overlay
					$("#blocking").remove();

					// if the process has crashed by now, we might be able to refresh the page and try again,
					// hence leaving unconverted item removal until the last item
					localforage.removeItem(id); // async, so it shouldn't block
				});

			});
			break;

		case "raw-download": // export the indexeddb database without processing anything
			var fn = 'CourseAssembler-' + (new Date()).toString();
			DocNinja.Plugins.Exporter.Download(fn);
			break;


		case "clear-storage":
			localforage.clear(function (err) {
				// document.getElementById("fiddle").innerHTML = "";
				// $("#nav-colour").attr("style", "");
				DocNinja.filePreview.Reset();
				DocNinja.navItems.innerHTML = "";
				if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndtrash);
				// DocNinja.PurityControl.Nav.Check();
				window.setItemOrder();
				// setItemOrder(); // overwrites "order" cache
				// checkDummyItem();
				$("form").each(function() {this.reset();});
				// reset to the first tab (without animation)
				$(document.body).removeClass("change-settings download-zip").addClass("add-documents");
				$("button[data-action='add-content']").click();

				// clearly this could be a generic routine althroughout, but this works too
				document.body.classList.remove("no-autosplit");
				$("input[data-action='toggle-no-autosplit']").prop("checked", true);

				document.body.classList.add("no-pdfembed","no-pdftoolbar");
				$("input[data-action='toggle-no-pdftoolbar']").prop("checked", false);
				$("input[data-action='toggle-no-pdfembed']").prop("checked", false);

				setGlobalVars();

			});
			break;

		case "record-page-audio":
			import('./media.audiorecorder.js').then(module => {
				module.RecordAudio(DocNinja); // document.querySelector('.timeline-display'));
			});
			break;

		case "record-page-video":
			import('./media.videorecorder.js').then(module => {
				module.RecordVideo(DocNinja); // document.querySelector('.timeline-display'));
			});
			break;
			// const recordingDialog = document.getElementById('recorder');
			// recordingDialog.dataset.action = attrib;
			// if (recordingDialog.open) recordingDialog.close();
			// recordingDialog.showModal();
			// recordingDialog.addEventListener('close', function() {
			// 	console.dir(recordingDialog.returnValue);
			// });
			break;


			// if (!document.getElementById('audiorecorder-frame')) {
			// 	var rfrm = document.createElement("iframe");
			// 	rfrm.setAttribute("seamless", true);
			// 	rfrm.setAttribute("id", "audiorecorder-frame");
			// 	rfrm.setAttribute("src", "plugins/MicRecorderToMp3/edit.html");
			// 	document.querySelector('div[data-source="set-audio"]>section').appendChild(rfrm);
			// }
			// break;

		case "upload-page-audio":
			document.getElementById("pageAudioUpload").click();
			break;

		case "trash-page-audio":
			var ae = document.getElementById("popover_audioElement");
			var ve = document.getElementById("popover_videoElement");
			localforage.getItem(id).then(function action_trash_audio_get(obj) {
				obj.payload.cursor = undefined;
				delete obj.payload.cursor;
				obj.payload.mp3 = undefined;
				delete obj.payload.mp3;
				obj.payload.mp4 = undefined;
				delete obj.payload.mp4;
				if (ae) {
					ae.pause();
					ae.removeAttribute("src");
					if (ae.hasOwnProperty("currentSrc")) ae.currentSrc = undefined;
					// document.querySelector("button[data-action='set-audio']").removeAttribute("data-init");
				}
				if (ve) {
					ve.pause();
					ve.removeAttribute("src");
					if (ve.hasOwnProperty("currentSrc")) ve.currentSrc = undefined;
				}
				closePopover();
				localforage.setItem(id, obj).then(function() {
					// DocNinja.PurityControl.Nav.Check();
					document.querySelector('#propertyContainer').innerHTML = "";
					// document.querySelector('.timeline-display').innerHTML = "";
					window.setItemOrder();
				});
			});
			break;

		case "upload-page-attachments":
			document.getElementById('fileAttachUpload').click();
			break;

		case "trash-page-attachments":
			localforage.getItem(id).then(function action_trash_page_files(obj) {
				obj.attachments = undefined;
				delete obj.attachments;
				closePopover();
				localforage.setItem(id, obj).then(function() {
					// DocNinja.PurityControl.Nav.Check();
					window.setItemOrder();
					document.querySelector(`#propertyBar a[data-action='page-files']`).click();
				});
			});
			break;

		case "remove-page-attachment":
			var fn = tgt.getAttribute("data-name");
			localforage.getItem(id).then(function action_trash_page_files(obj) {
				if (obj.hasOwnProperty('attachments')) {
					for (const [item,file] of obj.attachments.entries()) {
						if (file.name === fn) {
							obj.attachments[item] = undefined;
							obj.attachments.splice(item,1);
							var lne = tgt.closest('.page-attachment-row');
							lne.parentNode.removeChild(lne);
						}
					}// );
					if (obj.attachments.length === 0) {
						delete obj.attachments;
					}
					localforage.setItem(id, obj).then(function() {
						// DocNinja.PurityControl.Nav.Check();
						window.setItemOrder();
					});
				}
			});
			break;

		// case "handle-preset":
		// 	console.dir(tgt);
		// 	break;

		// stoping a copy of a theme preset into the users licenced server-side folder location
		case "store-preset":
			fetch(App.Warehouse + '?hash=' + App.Hash, {
			    method: 'POST',
			    body: new URLSearchParams({
			        'action': 'storetheme',
			        'selection': document.querySelector('fieldset.themePreviewOptions a[data-preset].selected').dataset.preset,
			        'theme': document.querySelector('input[name="template"]').value,
			        'data': document.querySelector('textarea.theme-editor').value
			    })
			}).then(function(response) {
				if (response.ok) {
					return response.json();
				}
				throw response;
			}).then(function(obj) {
				var container = document.querySelector('fieldset.themePreviewOptions'),
						themeLink = container.querySelector("a[data-preset='" + obj.key + "']");
				if (themeLink) {
					themeLink.dataset.src = btoa(document.querySelector('textarea.theme-editor').value);
				} else {
					container.querySelector('details').insertAdjacentHTML('beforebegin', Handlebars.templates["theme-preset"]({
						key: obj.key,
						image: "img/user-preset.jpg",
						theme: btoa(document.querySelector('textarea.theme-editor').value)
					}));
				}
				for (node of container.children) {
				// container.children.forEach(function(node){
					if (node.nodeName === 'A')
					node.classList[(node.dataset.preset === obj.key) ? "add" : "remove"]('selected');
				} //);
			}).catch(function(message) {
				console.dir(message);
				alert('Storing preset failed; see console for details');
			});
			break;

		// 2024.01.16 - this is now handled by the importer plugin
		// case "remove-saved-course":
		// 	var fn = tgt.closest("tr").dataset.src,
		// 			fd = new URLSearchParams({
		// 				"action": "removecourse",
		// 				"name": fn
		// 			});
		// 	fetch(App.Warehouse + "?hash=" + App.Hash, {
		// 		method: "POST",
		// 		body: fd
		// 	}).then(function(response) {
		// 		if (response.ok) {
		// 			return response.json()
		// 		}
		// 		throw resposne;
		// 	}).then(function(json) {
		// 		tgt.closest("tbody").removeChild(tgt.closest("tr"));
		// 	}).catch(function(msg) {
		// 		console.dir(msg);
		// 		alert("There was a problem removing the file " + fn);
		// 	});
		// 	break;

		// case "import-saved-course":
		// 	var fn = tgt.closest("tr").dataset.src;
		// 	DocNinja.fileConversion.HandleServerImport(fn);
		// 	break;

		// case "download-saved-course":
		// 	var fn = tgt.closest("tr").dataset.src,
		// 			fd = new URLSearchParams({
		// 				"action": "loadcourse",
		// 				"name": fn
		// 			});
		// 	fetch(App.Warehouse + "?hash=" + App.Hash, {
		// 		method: "POST",
		// 		body: fd
		// 	}).then(function(response) {
		// 		if (response.ok) {
		// 			return response.blob();
		// 		}
		// 		throw response;
		// 	}).then(function(blob) {
		// 		for (const el of document.querySelectorAll('a[data-done]')) el.parentNode.removeChild(el);
		// 		var url = URL.createObjectURL(blob),
		// 				a = document.createElement('a');
		// 		a.dataset.done = true;
		// 		a.href = url;
		// 		a.style = 'display:none';
		// 		a.download = fn;
		// 		document.body.appendChild(a);
		// 		a.click();

		// 	}).catch(function(bloop) {
		// 		console.dir(bloop);
		// 		alert("Sorry an error occurred accessing this course.");
		// 	});
		// 	break;			


		default:

			// see if a plugin has a registered handler for this action
			for (var group in DocNinja.options.actions) {
				if (typeof DocNinja.options.actions[group] === 'object') {
					// DocNinja.options.actions[group].forEach(function (v) { // forEach can't iterate NaN keys
					for (index in DocNinja.options.actions[group]) {
						var v = DocNinja.options.actions[group][index];
						if (typeof v === 'function') break; // not 'return'
						// console.log('performaction defalt for ', index, ' group ', group, ' v is ', v, 'attrib is ', attrib);
						if (v.hasOwnProperty("handler") && v.handler === attrib) { // e.g. view, edit, compile, etc (quizbuilder, markdown, etc)
							closePopover();
							if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndpop);
							engagement('plugin_add', v.plugin);
							DocNinja.Plugins[v.plugin].Add(); // TODO implement method definition inside plugins

						} else if (v.hasOwnProperty("match") && v.match === attrib) { // e.g. plugins that implement fn, parrameters (e.g. themes)
							var args = [];
							v.parameters.forEach(function(p) { args.push(tgt.dataset[p]); });
							args.push(e); // push event as last parameter
							DocNinja.Plugins[v.plugin][v.fn].apply(DocNinja.Plugins[v.plugin], args);
						} else if (v.hasOwnProperty('onclick') && v.icon.indexOf(`data-action="${attrib}"`)!==-1) {
							closePopover();
							if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndpop);
							engagement('plugin_onclick', [v.plugin,v.name]);
							v.onclick();
						}
					};
				}
			}


	}
}

// delete cached image references
// function decachePage(ids) {
// 	localforage.iterate(function (value, key) {
// 		if (key.indexOf("file://" + id + ":") !== -1) {
// 			localforage.removeItem(key);
// 		}
// 	});
// }


// trash a page. if it has children, optionally trash those too.
function trashPage(id, trashChildren) {
	//var ids = [id];
	if (typeof trashChildren !== 'undefined' && trashChildren === true) {
		var li = document.querySelector("li[data-fileid='" + id + "']"),
			depth = +li.dataset.depth,
			next = li.nextElementSibling;
		while (next && +next.dataset.depth > depth) {
			// ids.push(next.data.fileid);
			localforage.removeItem(next.dataset.fileid); // async
			next = next.nextElementSibling; // increment pointer first
			next.previousElementSibling.remove(); // NOW remove the dom node
		}
	}
	localforage.removeItem(id, function (err) {
		$("li[data-fileid='" + id + "']").remove();
		DocNinja.filePreview.Reset();
		if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndtrash);
		setItemOrder();
	});
	// decachePages(ids);
}

// document body click handler
function globalClickConsumer(e) {
	var tgt = e.target.closest("[data-action],[data-popover],[data-tab]"); // usually self or parent or parent.parent
	if (!tgt) return;
	if ("popover" in tgt.dataset) {
		handlePopover(tgt);
	} else if ("propertybar" in tgt.dataset) {
		handleProperty(tgt);
	} else if ("action" in tgt.dataset) {
		handleAction(tgt, e);
	} else if ("tab" in tgt.dataset) {
		changeTab(e);
	}
}

function engagement(key,value) {
	if (typeof gtag === typeof undefined) return;
	let v = (typeof value === 'string') ? value : JSON.stringify(value);
	gtag('event', key,
		{'event_category': 'engagement',
		'event_label': v
	});
}

function changeTab(e) {
	var tab = e.target.closest("a").dataset.tab;
	hideOverlays();
	e.preventDefault();
	// DocNinja.EditHandlers.Unload (false); // unbind any editors but persist their data
	// DocNinja.options.loader.show(); // svgloader data-opening
	document.body.classList.remove("settings"); // close settings
	// if (!DocNinja.options.MUTED) playSound(DocNinja.options.snd); // ninja sword sound to match loader effect
	DocNinja.filePreview.Reset(); // and do some garbage collection
	// destroy_preview(); // don't need this memory overhead
	$("li",DocNinja.navItems).removeClass("selected");
	setTimeout( function() {
		//$(e.target).addClass("current").siblings().removeClass("current"); // select one tab header
		// $("#"+e.target.dataset.tab).addClass("current").siblings().removeClass("current"); // select one section
//		$(document.body).removeClass("add-documents change-settings download-zip").addClass(tab);
		document.body.classList.remove("add-documents","change-settings","download-zip","undefined");
		document.body.classList.add(tab);
//		DocNinja.routines.MoveNinja();
		triggerResize();
		// DocNinja.options.loader.hide();
		DocNinja.routines.PersistSettings("change tab");
	}, DocNinja.options.tabSpeed );
}


/**
 * Store a property on an object in localforage, thennable
 * @param fileId reference to look up
 * @param propertyName string name of property, can be "parent.child", can be {key1:'value','key2.child':'value2'}
 * @param propertyValue mixed value to store (if propertyName was string)
 * @returns thennable updated object
 */
function persistProperty(fileId, propertyName, propertyValue) {
	// DocNinja.options.activeSaves.push(fileId);
	// if activeSaves already includes fileId and setItem hasn't resolved
	// arr = arr.filter(item => item !== fileId)
	// reject the promise and start over including the new properties
	return new Promise(function(resolve,reject) {
		localforage.getItem(fileId, function persist_property_get(err, value) {
			let data = value || {};
			if ('object' === typeof propertyName) {
				for (const [k,v] of Object.entries(propertyName)) {
					updateObjProp(data,v,k);
				}
			} else {
				updateObjProp(data,propertyValue,propertyName);
			}
			// data[propertyName] = propertyValue;
			localforage.setItem(fileId, data).then(resolve);
		})
		.catch(reject);
	});
}

/**
 * Updates the value of an object property matching a [possibly nested] key 
 * @param obj object to update
 * @param value value to be set
 * @param propPath 'foo' or 'foo.bar' or 'foo.bar.baz'
 */
updateObjProp = (obj, value, propPath) => {
    const [head, ...rest] = propPath.toString().split('.');

    !rest.length
        ? obj[head] = value
        : this.updateObjProp(obj[head], value, rest.join('.'));
}

// use like .hasOwnProperty(), except with 'some.var.value'
// Object.prototype.hasOwnNestedProperty = function(propertyPath) {
//   if (!propertyPath)
//     return false;

//   var properties = propertyPath.split('.');
//   var obj = this;

//   for (var i = 0; i < properties.length; i++) {
//     var prop = properties[i];

//     if (!obj || !obj.hasOwnProperty(prop)) {
//       return false;
//     } else {
//       obj = obj[prop];
//     }
//   }

//   return true;
// };
// given obj search for "property.property.propertyN"
function hasOwnDeepProperty(obj, path) {
    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
        obj = obj[path[i]];
        if (!obj) return false;
    };
    return true;
}



/* audio stream oscilliscope */
function audioVisualize(canvas, stream) {
  var audioCtx = new (window.AudioContext || webkitAudioContext)();
  var source = audioCtx.createMediaStreamSource(stream);
  var canvasCtx = canvas.getContext("2d");
  var analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);

  var fgcolor = getComputedStyle(document.documentElement).getPropertyValue('--oscilliscope');
  var bgcolor = getComputedStyle(document.documentElement).getPropertyValue('--toolbar');

  source.connect(analyser);
  //analyser.connect(audioCtx.destination);

  draw()

  function draw() {
    WIDTH = canvas.width
    HEIGHT = canvas.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = bgcolor;
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = fgcolor;

    canvasCtx.beginPath();

    var sliceWidth = WIDTH * 1.0 / bufferLength;
    var x = 0;


    for(var i = 0; i < bufferLength; i++) {

      var v = dataArray[i] / 128.0;
      var y = v * HEIGHT/2;

      if(i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();

  }
}

// XML Parser
// function tXml(t,e){"use strict";var r=(e=e||{}).pos||0,n="<",i="<".charCodeAt(0),a=">",o=">".charCodeAt(0),f="-".charCodeAt(0),l="/".charCodeAt(0),c="!".charCodeAt(0),s="'".charCodeAt(0),u='"'.charCodeAt(0);function d(){for(var e=[];t[r];)if(t.charCodeAt(r)==i){if(t.charCodeAt(r+1)===l)return(r=t.indexOf(a,r))+1&&(r+=1),e;if(t.charCodeAt(r+1)===c){if(t.charCodeAt(r+2)==f){for(;-1!==r&&(t.charCodeAt(r)!==o||t.charCodeAt(r-1)!=f||t.charCodeAt(r-2)!=f||-1==r);)r=t.indexOf(a,r+1);-1===r&&(r=t.length)}else for(r+=2;t.charCodeAt(r)!==o&&t[r];)r++;r++;continue}var n=g();e.push(n)}else{var s=m();s.trim().length>0&&e.push(s),r++}return e}function m(){var e=r;return-2===(r=t.indexOf(n,r)-1)&&(r=t.length),t.slice(e,r+1)}var h="\n\t>/= ";function v(){for(var e=r;-1===h.indexOf(t[r])&&t[r];)r++;return t.slice(e,r)}var p=["img","br","input","meta","link"];function g(){var e={};r++,e.tagName=v();for(var n=!1;t.charCodeAt(r)!==o&&t[r];){var i=t.charCodeAt(r);if(i>64&&i<91||i>96&&i<123){for(var a=v(),f=t.charCodeAt(r);f&&f!==s&&f!==u&&!(f>64&&f<91||f>96&&f<123)&&f!==o;)r++,f=t.charCodeAt(r);if(n||(e.attributes={},n=!0),f===s||f===u){var c=A();if(-1===r)return e}else c=null,r--;e.attributes[a]=c}r++}if(t.charCodeAt(r-1)!==l)if("script"==e.tagName){var m=r+1;r=t.indexOf("<\/script>",r),e.children=[t.slice(m,r-1)],r+=8}else if("style"==e.tagName){m=r+1;r=t.indexOf("</style>",r),e.children=[t.slice(m,r-1)],r+=7}else-1==p.indexOf(e.tagName)&&(r++,e.children=d());else r++;return e}function A(){var e=t[r],n=++r;return r=t.indexOf(e,n),t.slice(n,r)}var C,y=null;if(void 0!==e.attrValue){e.attrName=e.attrName||"id";for(y=[];-1!==(C=void 0,C=new RegExp("\\s"+e.attrName+"\\s*=['\"]"+e.attrValue+"['\"]").exec(t),r=C?C.index:-1);)-1!==(r=t.lastIndexOf("<",r))&&y.push(g()),t=t.substr(r),r=0}else y=e.parseNode?g():d();return e.filter&&(y=tXml.filter(y,e.filter)),e.simplify&&(y=tXml.simplify(y)),y.pos=r,y}tXml.simplify=function(t){var e={};if(!t.length)return"";if(1===t.length&&"string"==typeof t[0])return t[0];for(var r in t.forEach(function(t){if("object"==typeof t){e[t.tagName]||(e[t.tagName]=[]);var r=tXml.simplify(t.children||[]);e[t.tagName].push(r),t.attributes&&(r._attributes=t.attributes)}}),e)1==e[r].length&&(e[r]=e[r][0]);return e},tXml.filter=function(t,e){var r=[];return t.forEach(function(t){if("object"==typeof t&&e(t)&&r.push(t),t.children){var n=tXml.filter(t.children,e);r=r.concat(n)}}),r},tXml.stringify=function(t){var e="";function r(t){if(t)for(var r=0;r<t.length;r++)"string"==typeof t[r]?e+=t[r].trim():n(t[r])}function n(t){for(var n in e+="<"+t.tagName,t.attributes)null===t.attributes[n]?e+=" "+n:-1===t.attributes[n].indexOf('"')?e+=" "+n+'="'+t.attributes[n].trim()+'"':e+=" "+n+"='"+t.attributes[n].trim()+"'";e+=">",r(t.children),e+="</"+t.tagName+">"}return r(t),e},tXml.toContentString=function(t){if(Array.isArray(t)){var e="";return t.forEach(function(t){e=(e+=" "+tXml.toContentString(t)).trim()}),e}return"object"==typeof t?tXml.toContentString(t.children):" "+t},tXml.getElementById=function(t,e,r){var n=tXml(t,{attrValue:e,simplify:r});return r?n:n[0]},tXml.getElementsByClassName=function(t,e,r){return tXml(t,{attrName:"class",attrValue:"[a-zA-Z0-9-s ]*"+e+"[a-zA-Z0-9-s ]*",simplify:r})},tXml.parseStream=function(t,e){if("function"==typeof e&&(cb=e,e=0),"string"==typeof e&&(e=e.length+2),"string"==typeof t){var r=require("fs");t=r.createReadStream(t,{start:e}),e=0}var n=e,i="";return t.on("data",function(e){0,i+=e;for(var r=0;;){n=i.indexOf("<",n)+1;var a=tXml(i,{pos:n,parseNode:!0});if((n=a.pos)>i.length-1||n<r)return void(r&&(i=i.slice(r),n=0,r=0));t.emit("xml",a),r=n}}),t.on("end",function(){console.log("end")}),t},"object"==typeof module&&(module.exports=tXml);

// pptx convert emu to pixels
// function emuToPix(emu) {
//   return emu / * 108; // It's 108 it just is. 72, 96, 144 don't work even though thats what everyone says works
// }

function highestZindex() {
    return Array.from(document.querySelectorAll("body *")).map(function(a) {
        return parseFloat(window.getComputedStyle(a).zIndex)
    }).filter(function(a) {
        return !isNaN(a)
    }).sort(function(a, b) {
        return a - b
    }).pop()
}

function popIframe(url) {
    var b = document.createElement("div"),
        d = document.createElement("iframe"),
        c = document.createElement("div"),
        a = document.createElement("a");
    o = "cs-overlay";
    if (x = document.querySelector("#" + o)) return document.body.style.overflow = "auto", document.body.removeChild(x), !1;
    b.id = o;
    b.style = "position:fixed;top:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:" + highestZindex() + 1;
    b.appendChild(d);
    d.setAttribute("allowfullscreen","true");
    d.style = "position:absolute;width:90%;height:90%;left:5%;top:5%;box-shadow:0 10px 25px rgba(0,0,0,.5);";
    d.src = url;
    c.style = "position:absolute;top:calc(5% - 32px);left:95%;width:32px;height:32px;cursor:pointer";
    c.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path stroke=\"white\" stroke-width=\"3px\" d=\"M0 0l24 24M0 24L24 0\"/></svg>";
    c.onclick = popIframe;
    a.href = url;
    a.target = "_blank";
    a.title = "Click to copy preview link to clipboard";
    a.innerHTML = "<span class='ninja-paperclip'></span>";
    a.style = "position:absolute;top:calc(5% + 16px);font-size:32px;cursor:pointer;left:95%";
    a.onclick = function(e) { textToClipboard(this.href); alert('Copied link to previewer to clipboard!'); return false; }
    b.appendChild(c);
    b.appendChild(a);
    document.body.appendChild(b);
    document.body.style.overflow = "hidden";
    return 1
};

// copies the text to the clipboard
function textToClipboard (text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

// async function get_free_space() {
// 	if (navigator.storage && navigator.storage.estimate) {
// 		var quota = await navigator.storage.estimate(),
// 		 	percentageUsed = (quota.usage / quota.quota) * 100,
// 		 	remaining = quota.quota - quota.usage;
// 		 return {
// 		 	used: percentageUsed,
// 		 	free: remaining
// 		 }
// 	}
// 	return {}
// }

/* https://github.com/rndme/download */
(function(root,factory){if(typeof define==="function"&&define.amd)define([],factory);else if(typeof exports==="object")module.exports=factory();else root.download=factory()})(this,function(){return function download(data,strFileName,strMimeType){var self=window,defaultMime="application/octet-stream",mimeType=strMimeType||defaultMime,payload=data,url=!strFileName&&!strMimeType&&payload,anchor=document.createElement("a"),toString=function(a){return String(a)},myBlob=self.Blob||self.MozBlob||self.WebKitBlob||
toString,fileName=strFileName||"download",blob,reader;myBlob=myBlob.call?myBlob.bind(self):Blob;if(String(this)==="true"){payload=[payload,mimeType];mimeType=payload[0];payload=payload[1]}if(url&&url.length<2048){fileName=url.split("/").pop().split("?")[0];anchor.href=url;if(anchor.href.indexOf(url)!==-1){var ajax=new XMLHttpRequest;ajax.open("GET",url,true);ajax.responseType="blob";ajax.onload=function(e){download(e.target.response,fileName,defaultMime)};setTimeout(function(){ajax.send()},0);return ajax}}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload))if(payload.length>
1024*1024*1.999&&myBlob!==toString){payload=dataUrlToBlob(payload);mimeType=payload.type||defaultMime}else return navigator.msSaveBlob?navigator.msSaveBlob(dataUrlToBlob(payload),fileName):saver(payload);else if(/([\x80-\xff])/.test(payload)){var i=0,tempUiArr=new Uint8Array(payload.length),mx=tempUiArr.length;for(i;i<mx;++i)tempUiArr[i]=payload.charCodeAt(i);payload=new myBlob([tempUiArr],{type:mimeType})}blob=payload instanceof myBlob?payload:new myBlob([payload],{type:mimeType});function dataUrlToBlob(strUrl){var parts=
strUrl.split(/[:;,]/),type=parts[1],indexDecoder=strUrl.indexOf("charset")>0?3:2,decoder=parts[indexDecoder]=="base64"?atob:decodeURIComponent,binData=decoder(parts.pop()),mx=binData.length,i=0,uiArr=new Uint8Array(mx);for(i;i<mx;++i)uiArr[i]=binData.charCodeAt(i);return new myBlob([uiArr],{type:type})}function saver(url,winMode){if("download"in anchor){anchor.href=url;anchor.setAttribute("download",fileName);anchor.className="download-js-link";anchor.innerHTML="downloading...";anchor.style.display=
"none";anchor.addEventListener("click",function(e){e.stopPropagation();this.removeEventListener("click",arguments.callee)});document.body.appendChild(anchor);setTimeout(function(){anchor.click();document.body.removeChild(anchor);if(winMode===true)setTimeout(function(){self.URL.revokeObjectURL(anchor.href)},250)},66);return true}if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)){if(/^data:/.test(url))url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime);if(!window.open(url))if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page."))location.href=
url;return true}var f=document.createElement("iframe");document.body.appendChild(f);if(!winMode&&/^data:/.test(url))url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime);f.src=url;setTimeout(function(){document.body.removeChild(f)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(blob,fileName);if(self.URL)saver(self.URL.createObjectURL(blob),true);else{if(typeof blob==="string"||blob.constructor===toString)try{return saver("data:"+mimeType+";base64,"+self.btoa(blob))}catch(y){return saver("data:"+
mimeType+","+encodeURIComponent(blob))}reader=new FileReader;reader.onload=function(e){saver(this.result)};reader.readAsDataURL(blob)}return true}});


function sanitizeFilename(input, dfault) {
  var illegalRe = /[\/\?<>\\:\*\|":]/g;
  var controlRe = /[\x00-\x1f\x80-\x9f]/g;
  var reservedRe = /^\.+$/;
  var windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
  var result = input
    .replace(illegalRe, '')
    .replace(controlRe, '')
    .replace(reservedRe, '')
    .replace(windowsReservedRe, '');
  return (result.length) ? result : dfault || '';
}

// innerHTML to document fragment (nodes)
// GOTCHA doesn't work for table cells or rows!
function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
}
// innerHTML to nodes
// Works on table cells and rows..
function StringToFragment(string) {
    var renderer = document.createElement('template');
    renderer.innerHTML = string;
    return renderer.content;
}

// initialise a colour picker (binds its own clicker)
// https://www.cssscript.com/demo/color-gradient-picker/
function BindColourPicker(selector, value, callback) {
	return new CPicker(selector, {
		value: value,
		callback: callback
	});
}

function BindFontPicker(selector) {
	gFontInput.create(selector);
}

function submitForm(el) {
	var form = el.closest('form');
	if (form) form.submit();
}

// stub for proxied sco's to latch to during preview / theme design (our SCO finder looks for ninjaApiProxy object)
function apiProxy() {
	this.cache = {};
	this.LMSInitialize = function() { return "true"; };
	this.LMSFinish = function () { return "true"; };
	this.LMSCommit = function (param) { return "true"; };
	this.LMSGetLastError = function () { return 0; };
	this.LMSGetErrorString = function () { return "No error"; };
	this.LMSGetDiagnostic = function (param) { return param; };
	this.LMSGetValue = function (param) { return (this.cache.hasOwnProperty(param)) ? this.cache[param] : ""; };
	this.LMSSetValue = function (param,value) { this.cache[param] = value; return "true"; }
}
window.ninjaApiProxy = new apiProxy();

function convertOrderForManifest(html) {
	var frag = StringToFragment(html),
		ord = [];
	for (const n of frag.querySelectorAll("li[data-fileid]")) ord.push(n.dataset.fileid);
	return ord;
}

const fetchWithTimeout = (uri, options = {}, time = 5000) => {
    // Lets set up our `AbortController`, and create a request options object
    // that includes the controller's `signal` to pass to `fetch`.
    const controller = new AbortController()
    const config = { ...options, signal: controller.signal }

    // Set a timeout limit for the request using `setTimeout`. If the body
    // of this timeout is reached before the request is completed, it will
    // be cancelled.
    const timeout = setTimeout(() => {
        controller.abort()
    }, time)

    return fetch(uri, config)
        .then((response) => {
            // Because _any_ response is considered a success to `fetch`, we
            // need to manually check that the response is in the 200 range.
            // This is typically how I handle that.
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`)
            }

            return response
        })
        .catch((error) => {
            // When we abort our `fetch`, the controller conveniently throws
            // a named error, allowing us to handle them separately from
            // other errors.
            if (error.name === 'AbortError') {
                throw new Error('Response timed out')
            }

            throw new Error(error.message)
        })
}

function NOOP() {
	return false;
}

function getCSSVariable(name) {
	if (!name.startsWith('--')) name = '--' + name;
	return getComputedStyle(document.querySelector(':root')).getPropertyValue(name);
}

function setCSSVariable(name, value) {
	DocNinja.options.root.style.setProperty(name, value);
}

/**
 * Emit a custom event
 * @param  {String} type   The event type
 * @param  {*}      detail Any details to pass along with the event
 * @param  {Node}   elem   The element to emit the event on
 */
function emit (type, detail, elem = document) {

	// Create a new event
	let event = new CustomEvent(type, {
		bubbles: true,
		cancelable: true,
		detail: detail
	});

	// Dispatch the event
	return elem.dispatchEvent(event);

}

/* for rendering toolbars etc
 * know if the data object supports a property
 * some properties require curly logic
 */
function Supports(haystack, needle) {

	_supports_media = function (data) {
		if (!data) return false;

		let supports = get_property(data, 'supports', []);
		let format = get_property(data, 'format', '');
		let kind = get_property(data, 'kind', '');

		if ('plugin' === kind && supports.indexOf("audio") === -1) return false;
		if (supports.indexOf("audio") !== -1) return true;
		if (['youtube','vimeo','soundcloud','oembed','package','video'].indexOf(format) !== -1) return false;

		return true;
	}

	_supports_colour = function (data) {
		if (!data) return false;

		const kind = get_property(data, 'kind', '');
		const plugin = get_property(data, 'plugin', '');
		const format = get_property(data, 'format', '');

		if (kind === "plugin" && plugin === "Markdown") {
			return true;
		}
		if (['video','iframe'].indexOf(format) !== -1) {
			return true;
		}
		if ('file' === kind) {
			return true;
		}
		return false;
	}

	_supports_files = function (data) {
		if (!data) return false;

		const plugin = get_property(data, 'plugin', '');

		if (plugin === "Section") {
			return false;
		}

		return true;
	}

	_supports_range = function (data) {
		if (!data) return false;

		const format = get_property(data, 'format', '');

		if (['youtube','vimeo','soundcloud','oembed','video'].indexOf(format) !== -1) return true;

		return false;
	}

	_supports_score = function (data) {
		if (!data) return false;

		const format = get_property(data, 'format', '');

		if ( "slideshare" === format ) {
			return true;
		}

		return false;
	}

	_supports_transform = function (data) {
		if (!data) return false;

		const split = get_property(data, 'payload.split', false);

		return split;
	}

	switch (needle.toLowerCase()) {
		case "media": return _supports_media(haystack); break;
		case "colour": return _supports_colour(haystack); break;
		case "files": return _supports_files(haystack); break;
		case "range": return _supports_range(haystack); break;
		case "score": return _supports_score(haystack); break;
		case "transform": return _supports_transform(haystack); break;
	}

	return false;

}

function placeholderText(paras) {
	const src = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus at urna condimentum mattis pellentesque. Augue ut lectus arcu bibendum at varius vel pharetra vel. Massa vitae tortor condimentum lacinia quis vel eros donec. Non tellus orci ac auctor. Nec ullamcorper sit amet risus nullam eget.</p><p>Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Turpis massa sed elementum tempus egestas sed sed risus pretium. At ultrices mi tempus imperdiet. Imperdiet proin fermentum leo vel orci porta non pulvinar neque. Ut etiam sit amet nisl purus in mollis. Nisl nisi scelerisque eu ultrices. Non nisi est sit amet facilisis magna. Posuere morbi leo urna molestie at. Sed ullamcorper morbi tincidunt ornare massa eget. Velit dignissim sodales ut eu. Mattis enim ut tellus elementum sagittis vitae et leo duis. Scelerisque varius morbi enim nunc faucibus. Vestibulum sed arcu non odio euismod lacinia at. Urna condimentum mattis pellentesque id nibh. Auctor augue mauris augue neque gravida in fermentum. Gravida dictum fusce ut placerat orci nulla. Nunc pulvinar sapien et ligula ullamcorper. Integer enim neque volutpat ac tincidunt vitae semper. Nunc sed augue lacus viverra vitae congue eu consequat ac. Potenti nullam ac tortor vitae purus. Facilisi cras fermentum odio eu feugiat. Cras ornare arcu dui vivamus arcu. Aenean sed adipiscing diam donec adipiscing tristique risus nec";
	let re = new RegExp(`([\\S\\s]{1,${src.length / paras | 0}})`,'g');
	let ar = src.match(re);
	return ar.map((v) => v.trim()).map((v) => {
		return '<p>' + v.charAt(0).toUpperCase() + v.slice(1) + '.</p>';
	}).join``;
}

// getRelativeCoords(document.querySelector('selector'), 'top center')
const getRelativeCoords = (element, position) => {
  const { top, left, width, height } = element.getBoundingClientRect();
  let point;
  switch (position) {
    case "top left":
      point = {
        x: left + window.pageXOffset,
        y: top + window.pageYOffset
      };
      break;
    case "top center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + window.pageYOffset
      };
      break;
    case "top right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + window.pageYOffset
      };
      break;
    case "center left":
      point = {
        x: left + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset
      };
      break;
    case "center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset
      };
      break;
    case "center right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + height / 2 + window.pageYOffset
      };
      break;
    case "bottom left":
      point = {
        x: left + window.pageXOffset,
        y: top + height + window.pageYOffset
      };
      break;
    case "bottom center":
      point = {
        x: left + width / 2 + window.pageXOffset,
        y: top + height + window.pageYOffset
      };
      break;
    case "bottom right":
      point = {
        x: left + width + window.pageXOffset,
        y: top + height + window.pageYOffset
      };
      break;
  }
  return point;
};

function getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

function getPosition(element) {
    var clientRect = element.getBoundingClientRect();
    return {left: clientRect.left + document.body.scrollLeft,
            top: clientRect.top + document.body.scrollTop,
			box: clientRect};
}

function getRelativePosition(element) {
    var clientRect = element.getBoundingClientRect();
    return {left: element.offsetLeft + document.body.scrollLeft,
            top: element.offsetTop + document.body.scrollTop,
			width: clientRect.width,
			height: clientRect.height};
}

var addRule = (function (style) {
    var sheet = document.head.appendChild(style).sheet;
    return function (selector, css) {
        var propText = typeof css === "string" ? css : Object.keys(css).map(function (p) {
            return p + ":" + (p === "content" ? "'" + css[p] + "'" : css[p]);
        }).join(";");
        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);
    };
})(document.createElement("style"));

// like PHP's RequireOnce - include a style or script in the head
function Include(...srcs) {
	for(src of srcs) { // cast both array and string to array to make it iterable
		if (src.indexOf('.css') !== -1 && !document.head.querySelector(`link[href='${src}']`)) {
			let tag = document.createElement('link');
			tag.href = src;
			tag.type = 'text/css';
			tag.rel = 'stylesheet';
			document.head.appendChild(tag);
		}
		if (src.indexOf('.js') !== -1 && !document.head.querySelector(`script[src='${src}']`)) {
			let tag = document.createElement('script');
			tag.src = src;
			document.head.appendChild(tag);
		}
	}
}