function isJSON(b){try{var a=JSON.parse(b);if(a&&"object"===typeof a)return!0}catch(c){}return!1};

function dec2hex(d) {return Number(d).toString(16);}
function hex2dec(h) {return parseInt(h,16);}

function randomElement(ar) {
	return ar[Math.floor(Math.random() * ar.length)]
}

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
// var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

// http://ejohn.org/blog/javascript-micro-templating/
// (function(){var b={};this.tmpl=function e(a,c){var d=/\W/.test(a)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+a.replace(/[\r\t\n]/g," ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):b[a]=b[a]||e(document.getElementById(a).innerHTML);return c?d(c):d}})();

// Base64.encode() & Base64.decode() methods
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

// md5 hashing routine; usage var hash = md5("hash"); // source: https://github.com/blueimp/JavaScript-MD5
!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define(function(){return t}):a.md5=t}(this);

// convert data-uri scheme to Blob
function dataURItoBlob(b){var a=atob(b.split(",")[1]);b=b.split(",")[0].split(":")[1].split(";")[0];for(var d=new ArrayBuffer(a.length),e=new Uint8Array(d),c=0;c<a.length;c++)e[c]=a.charCodeAt(c);a=new DataView(d);return new Blob([a],{type:b})};

// convert data-uri scheme to ArrayBuffer (used to read a zip from a base64 encoded file)
function dataURItoArrayBuffer(b){var a=atob(b.split(",")[1]);b=b.split(",")[0].split(":")[1].split(";")[0];for(var d=new ArrayBuffer(a.length),e=new Uint8Array(d),c=0;c<a.length;c++)e[c]=a.charCodeAt(c);return d};

// convert an array buffer to base64 data
// function arrayBufferToBase64(ab) { return btoa(String.fromCharCode.apply(null, new Uint8Array(ab))); }

function obj2url(obj) {
  var str = [];
  for(var p in obj)
	if (obj.hasOwnProperty(p)) {
	  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	}
  return str.join("&");
}


function arrayBufferToBase64( buffer ) {
	var binary = '';
	var bytes = new Uint8Array( buffer );
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode( bytes[ i ] );
	}
	return window.btoa( binary );
}

function base64ToArrayBuffer(base64) {
	var binary_string =  window.atob(base64);
	var len = binary_string.length;
	var bytes = new Uint8Array( len );
	for (var i = 0; i < len; i++)        {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

// plain javascript version of siblings() in jquery
var getSiblings = function (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;
	for ( ; sibling; sibling = sibling.nextSibling ) {
		if ( sibling.nodeType === 1 && sibling !== elem ) {
			siblings.push( sibling );
		}
	}
	return siblings;
};

function safeGetProp(obj, props, defaultValue) {
  try {
	return props.split('.').reduce(function lib_safeGetProp(obj, p) {
	  return obj[p];
	}, obj);
  } catch(e) {
	return defaultValue
  }
}

// popup window centered (location,title,width,height)
function PopupCenter(a,d,b,c){var e=void 0!=window.screenLeft?window.screenLeft:screen.left,f=void 0!=window.screenTop?window.screenTop:screen.top;width=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width;height=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height;a=window.open(a,d,"scrollbars=yes, width="+b+", height="+c+", top="+(height/2-c/2+f)+", left="+
(width/2-b/2+e) + ', resizable=yes');window.focus&&a.focus()};

// handlebars 2.0.0 runtime
/*
(function(u,t){"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?module.exports=t():u.Handlebars=u.Handlebars||t()})(this,function(){var u=function(){function p(l){this.string=l}p.prototype.toString=function(){return""+this.string};return p}(),t=function(p){function l(a){return k[a]}var f={},k={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},d=/[&<>"'`]/g,g=/[&<>"'`]/;f.extend=function(a){for(var h=1;h<arguments.length;h++)for(var d in arguments[h])Object.prototype.hasOwnProperty.call(arguments[h],
d)&&(a[d]=arguments[h][d]);return a};var n=Object.prototype.toString;f.toString=n;var r=function(a){return"function"===typeof a};r(/x/)&&(r=function(a){return"function"===typeof a&&"[object Function]"===n.call(a)});f.isFunction=r;var h=Array.isArray||function(a){return a&&"object"===typeof a?"[object Array]"===n.call(a):!1};f.isArray=h;f.escapeExpression=function(a){if(a instanceof p)return a.toString();if(null==a)return"";if(!a)return a+"";a=""+a;return g.test(a)?a.replace(d,l):a};f.isEmpty=function(a){return a||
0===a?h(a)&&0===a.length?!0:!1:!0};f.appendContextPath=function(a,h){return(a?a+".":"")+h};return f}(u),v=function(){function p(f,k){var d;k&&k.firstLine&&(d=k.firstLine,f+=" - "+d+":"+k.firstColumn);for(var g=Error.prototype.constructor.call(this,f),n=0;n<l.length;n++)this[l[n]]=g[l[n]];d&&(this.lineNumber=d,this.column=k.firstColumn)}var l="description fileName lineNumber message name number stack".split(" ");p.prototype=Error();return p}(),x=function(p,l){function f(e,b){this.helpers=e||{};this.partials=
b||{};k(this)}function k(e){e.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new n("Missing helper: '"+arguments[arguments.length-1].name+"'");});e.registerHelper("blockHelperMissing",function(b,c){var a=c.inverse,h=c.fn;if(!0===b)return h(this);if(!1===b||null==b)return a(this);if(r(b))return 0<b.length?(c.ids&&(c.ids=[c.name]),e.helpers.each(b,c)):a(this);c.data&&c.ids&&(a=q(c.data),a.contextPath=g.appendContextPath(c.data.contextPath,c.name),c={data:a});return h(b,c)});
e.registerHelper("each",function(b,c){if(!c)throw new n("Must pass iterator to #each");var e=c.fn,a=c.inverse,d=0,f="",m,l;c.data&&c.ids&&(l=g.appendContextPath(c.data.contextPath,c.ids[0])+".");h(b)&&(b=b.call(this));c.data&&(m=q(c.data));if(b&&"object"===typeof b)if(r(b))for(var k=b.length;d<k;d++)m&&(m.index=d,m.first=0===d,m.last=d===b.length-1,l&&(m.contextPath=l+d)),f+=e(b[d],{data:m});else for(k in b)b.hasOwnProperty(k)&&(m&&(m.key=k,m.index=d,m.first=0===d,l&&(m.contextPath=l+k)),f+=e(b[k],
{data:m}),d++);0===d&&(f=a(this));return f});e.registerHelper("if",function(b,c){h(b)&&(b=b.call(this));return!c.hash.includeZero&&!b||g.isEmpty(b)?c.inverse(this):c.fn(this)});e.registerHelper("unless",function(b,c){return e.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})});e.registerHelper("with",function(b,c){h(b)&&(b=b.call(this));var e=c.fn;if(g.isEmpty(b))return c.inverse(this);if(c.data&&c.ids){var a=q(c.data);a.contextPath=g.appendContextPath(c.data.contextPath,c.ids[0]);
c={data:a}}return e(b,c)});e.registerHelper("log",function(b,c){var a=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;e.log(a,b)});e.registerHelper("lookup",function(b,c){return b&&b[c]})}var d={},g=p,n=l;d.VERSION="2.0.0";d.COMPILER_REVISION=6;d.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};var r=g.isArray,h=g.isFunction,a=g.toString;d.HandlebarsEnvironment=f;f.prototype={constructor:f,logger:m,log:w,registerHelper:function(e,
b){if("[object Object]"===a.call(e)){if(b)throw new n("Arg not supported with multiple helpers");g.extend(this.helpers,e)}else this.helpers[e]=b},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,b){"[object Object]"===a.call(e)?g.extend(this.partials,e):this.partials[e]=b},unregisterPartial:function(e){delete this.partials[e]}};var m={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(e,b){if(m.level<=e){var c=m.methodMap[e];
"undefined"!==typeof console&&console[c]&&console[c].call(console,b)}}};d.logger=m;var w=m.log;d.log=w;var q=function(e){var b=g.extend({},e);b._parent=e;return b};d.createFrame=q;return d}(t,v),y=function(p,l,f){function k(h,a,d,f,q){var e=function(b,c){c=c||{};return d.call(h,b,h.helpers,h.partials,c.data||f,q&&[b].concat(q))};e.program=a;e.depth=q?q.length:0;return e}var d={},g=f.COMPILER_REVISION,n=f.REVISION_CHANGES,r=f.createFrame;d.checkRevision=function(h){var a=h&&h[0]||1;if(a!==g){if(a<
g)throw new l("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n[g]+") or downgrade your runtime to an older version ("+n[a]+").");throw new l("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+h[1]+").");}};d.template=function(h,a){if(!a)throw new l("No environment passed to template");if(!h||!h.main)throw new l("Unknown template object: "+
typeof h);a.VM.checkRevision(h.compiler);var d={lookup:function(a,e){for(var b=a.length,c=0;c<b;c++)if(a[c]&&null!=a[c][e])return a[c][e]},lambda:function(a,e){return"function"===typeof a?a.call(e):a},escapeExpression:p.escapeExpression,invokePartial:function(d,e,b,c,f,k,g,m,n){f&&(c=p.extend({},c,f));f=a.VM.invokePartial.call(this,d,b,c,k,g,m,n);null==f&&a.compile&&(k={helpers:k,partials:g,data:m,depths:n},g[b]=a.compile(d,{data:void 0!==m,compat:h.compat},a),f=g[b](c,k));if(null!=f){if(e){d=f.split("\n");
b=0;for(c=d.length;b<c&&(d[b]||b+1!==c);b++)d[b]=e+d[b];f=d.join("\n")}return f}throw new l("The partial "+b+" could not be compiled when running in runtime-only mode");},fn:function(a){return h[a]},programs:[],program:function(a,e,b){var c=this.programs[a],d=this.fn(a);e||b?c=k(this,a,d,e,b):c||(c=this.programs[a]=k(this,a,d));return c},data:function(a,e){for(;a&&e--;)a=a._parent;return a},merge:function(a,e){var b=a||e;a&&e&&a!==e&&(b=p.extend({},e,a));return b},noop:a.VM.noop,compilerInfo:h.compiler},
f=function(a,e){e=e||{};var b=e.data;f._setup(e);e.partial||!h.useData||b&&"root"in b||(b=b?r(b):{},b.root=a);var c;h.useDepths&&(c=e.depths?[a].concat(e.depths):[a]);return h.main.call(d,a,d.helpers,d.partials,b,c)};f.isTop=!0;f._setup=function(f){f.partial?(d.helpers=f.helpers,d.partials=f.partials):(d.helpers=d.merge(f.helpers,a.helpers),h.usePartial&&(d.partials=d.merge(f.partials,a.partials)))};f._child=function(a,e,b){if(h.useDepths&&!b)throw new l("must pass parent depths");return k(d,a,h[a],
e,b)};return f};d.program=k;d.invokePartial=function(d,a,f,k,g,e,b){k={partial:!0,helpers:k,partials:g,data:e,depths:b};if(void 0===d)throw new l("The partial "+a+" could not be found");if(d instanceof Function)return d(f,k)};d.noop=function(){return""};return d}(t,v,x);return function(p,l,f,k,d){var g=function(){var g=new p.HandlebarsEnvironment;k.extend(g,p);g.SafeString=l;g.Exception=f;g.Utils=k;g.escapeExpression=k.escapeExpression;g.VM=d;g.template=function(f){return d.template(f,g)};return g},
n=g();n.create=g;return n["default"]=n}(x,u,v,t,y)});
*/

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
Handlebars.registerHelper("compare",function(g,c,e,d){var f;if(3>arguments.length)throw Error("'compare' needs 2 parameters");void 0===d&&(d=e,e=c,c="===");f={"==":function(a,b){return a==b},"===":function(a,b){return a===b},"!=":function(a,b){return a!=b},"!==":function(a,b){return a!==b},"<":function(a,b){return a<b},">":function(a,b){return a>b},"<=":function(a,b){return a<=b},">=":function(a,b){return a>=b},"in":function(a,b){return-1!=b.indexOf(a)},"typeof":function(a,b){return typeof a==b}};if(!f[c])throw Error("Malformed operator in 'compare'; "+c);return f[c](g,e)?d.fn(this):d.inverse(this)});

// json serialize helper - {{json var}}
Handlebars.registerHelper('json', function(context) { return JSON.stringify(context); });

Handlebars.registerHelper('log', function(context) { console.dir(context); });

// jquery cookie plugin - https://github.com/carhartl/jquery-cookie
/*
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?g(b):b}var l=/\+/g,e=
c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=h[m].split("="),
k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}});
*/

/* jQuerySmartEllipsis - https://github.com/nothrem/jQuerySmartEllipsis */
/*
(function(e){if("function"!==typeof Function.prototype.bind){Function.prototype.bind=function(h){var i=this,g=Array.prototype.splice.call(arguments,1);return function(){return i.apply(h||window,g.concat(arguments))}}}if(!String.prototype.lastIndexByFunction){String.prototype.lastIndexByFunction=function(i,l){var g=0,j=this.length-1,k=-1,h,f;while(g<=j){h=Math.floor((g+j)/2);f=i.call(this,h,l);if(f<0){j=h+f}else{if(f>0){g=h+f}else{k=h;g=h+1}}}return k}}e.each(["show","toggleClass","addClass","removeClass"],function(){var f=e.fn[this],g=function(){e(this).triggerHandler("show")};e.fn[this]=function(){var i=this.find(":hidden").add(this.filter(":hidden")),h=f.apply(this,arguments);i.filter(":visible").each(g);return h}});var a=function(){return this.tempElement.height()>this.el.height()},d=function(){return this.tempElement.width()>this.el.width()},b=function(i,f,h){if(true!==h){var g=i.lastIndexOf(" ",f);if(-1<g){f=g}}return i.substr(0,f).trim()+"�"},c=function(f,g){g.tempElement.html(g.ellipsis(this,f,g.breakWords));
if(g.comparator()){return -1}return 0};e.fn.ellipsis=function(f){return this.each(function(){var l=e(this),i=("nowrap"!==l.css("white-space")),k=("break-word"===l.css("word-wrap")),h,m,j,g;if(l.is(":hidden")){l.one("show",function(){e(this).ellipsis(f)});return}if(l.css("overflow")==="hidden"){m=(l.html()===l.data("trimText"))?l.data("origText"):l.html();h=e(this.cloneNode(true)).hide().css("position","absolute").css("overflow","visible").width(i?l.width():"auto").height(i?"auto":l.height()).html(m);l.after(h);j=(i?a:d).bind({el:l,tempElement:h});if(!j()){h.remove();return}if(f){l.attr("title",e.trim(l.text()).replace(/\s\s+/g," "))}g=m.lastIndexByFunction(c,{tempElement:h,comparator:j,ellipsis:b,breakWords:k});if(-1<g){l.data("origText",m).data("trimText",b(m,g,k)).html(l.data("trimText")).addClass("ellipsis")}h.remove()}})};e(document).ready(function(){e(".ellipsis").ellipsis(true)});e(window).on("resize",function(){window.setTimeout(e.ellipsis,1)});if("onorientationchange" in window){e(window).on("orientationchange",function(){window.setTimeout(e.ellipsis,1)
})}e.ellipsis=function(){e(".ellipsis").ellipsis()}}(window.jQuery));
*/

/* slimScroll - get rid of ugly scrollbars and make your own
* ! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
/*
(function(e){e.fn.extend({slimScroll:function(f){var a=e.extend({width:"auto",height:"250px",size:"7px",color:"#000",position:"right",distance:"1px",start:"top",opacity:.4,alwaysVisible:!1,disableFadeOut:!1,railVisible:!1,railColor:"#333",railOpacity:.2,railDraggable:!0,railClass:"slimScrollRail",barClass:"slimScrollBar",wrapperClass:"slimScrollDiv",allowPageScroll:!1,wheelStep:20,touchScrollStep:200,borderRadius:"7px",railBorderRadius:"7px"},f);this.each(function(){function v(d){if(r){d=d||window.event;
var c=0;d.wheelDelta&&(c=-d.wheelDelta/120);d.detail&&(c=d.detail/3);e(d.target||d.srcTarget||d.srcElement).closest("."+a.wrapperClass).is(b.parent())&&n(c,!0);d.preventDefault&&!k&&d.preventDefault();k||(d.returnValue=!1)}}function n(d,e,f){k=!1;var g=d,h=b.outerHeight()-c.outerHeight();e&&(g=parseInt(c.css("top"))+d*parseInt(a.wheelStep)/100*c.outerHeight(),g=Math.min(Math.max(g,0),h),g=0<d?Math.ceil(g):Math.floor(g),c.css({top:g+"px"}));l=parseInt(c.css("top"))/(b.outerHeight()-c.outerHeight());
g=l*(b[0].scrollHeight-b.outerHeight());f&&(g=d,d=g/b[0].scrollHeight*b.outerHeight(),d=Math.min(Math.max(d,0),h),c.css({top:d+"px"}));b.scrollTop(g);b.trigger("slimscrolling",~~g);w();q()}function x(){u=Math.max(b.outerHeight()/b[0].scrollHeight*b.outerHeight(),30);c.css({height:u+"px"});var a=u==b.outerHeight()?"none":"block";c.css({display:a})}function w(){x();clearTimeout(B);l==~~l?(k=a.allowPageScroll,C!=l&&b.trigger("slimscroll",0==~~l?"top":"bottom")):k=!1;C=l;u>=b.outerHeight()?k=!0:(c.stop(!0,
!0).fadeIn("fast"),a.railVisible&&m.stop(!0,!0).fadeIn("fast"))}function q(){a.alwaysVisible||(B=setTimeout(function(){a.disableFadeOut&&r||y||z||(c.fadeOut("slow"),m.fadeOut("slow"))},1E3))}var r,y,z,B,A,u,l,C,k=!1,b=e(this);if(b.parent().hasClass(a.wrapperClass)){var p=b.scrollTop(),c=b.siblings("."+a.barClass),m=b.siblings("."+a.railClass);x();if(e.isPlainObject(f)){if("height"in f&&"auto"==f.height){b.parent().css("height","auto");b.css("height","auto");var h=b.parent().parent().height();b.parent().css("height",
h);b.css("height",h)}else"height"in f&&(h=f.height,b.parent().css("height",h),b.css("height",h));if("scrollTo"in f)p=parseInt(a.scrollTo);else if("scrollBy"in f)p+=parseInt(a.scrollBy);else if("destroy"in f){c.remove();m.remove();b.unwrap();return}n(p,!1,!0)}}else if(!(e.isPlainObject(f)&&"destroy"in f)){a.height="auto"==a.height?b.parent().height():a.height;p=e("<div></div>").addClass(a.wrapperClass).css({position:"relative",overflow:"hidden",width:a.width,height:a.height});b.css({overflow:"hidden",
width:a.width,height:a.height});var m=e("<div></div>").addClass(a.railClass).css({width:a.size,height:"100%",position:"absolute",top:0,display:a.alwaysVisible&&a.railVisible?"block":"none","border-radius":a.railBorderRadius,background:a.railColor,opacity:a.railOpacity,zIndex:90}),c=e("<div></div>").addClass(a.barClass).css({background:a.color,width:a.size,position:"absolute",top:0,opacity:a.opacity,display:a.alwaysVisible?"block":"none","border-radius":a.borderRadius,BorderRadius:a.borderRadius,MozBorderRadius:a.borderRadius,
WebkitBorderRadius:a.borderRadius,zIndex:99}),h="right"==a.position?{right:a.distance}:{left:a.distance};m.css(h);c.css(h);b.wrap(p);b.parent().append(c);b.parent().append(m);a.railDraggable&&c.bind("mousedown",function(a){var b=e(document);z=!0;t=parseFloat(c.css("top"));pageY=a.pageY;b.bind("mousemove.slimscroll",function(a){currTop=t+a.pageY-pageY;c.css("top",currTop);n(0,c.position().top,!1)});b.bind("mouseup.slimscroll",function(a){z=!1;q();b.unbind(".slimscroll")});return!1}).bind("selectstart.slimscroll",
function(a){a.stopPropagation();a.preventDefault();return!1});m.hover(function(){w()},function(){q()});c.hover(function(){y=!0},function(){y=!1});b.hover(function(){r=!0;w();q()},function(){r=!1;q()});b.bind("touchstart",function(a,b){a.originalEvent.touches.length&&(A=a.originalEvent.touches[0].pageY)});b.bind("touchmove",function(b){k||b.originalEvent.preventDefault();b.originalEvent.touches.length&&(n((A-b.originalEvent.touches[0].pageY)/a.touchScrollStep,!0),A=b.originalEvent.touches[0].pageY)});
x();"bottom"===a.start?(c.css({top:b.outerHeight()-c.outerHeight()}),n(0,!0)):"top"!==a.start&&(n(e(a.start).position().top,null,!0),a.alwaysVisible||c.hide());window.addEventListener?(this.addEventListener("DOMMouseScroll",v,!1),this.addEventListener("mousewheel",v,!1)):document.attachEvent("onmousewheel",v)}});return this}});e.fn.extend({slimscroll:e.fn.slimScroll})})(jQuery);
*/

// prototyped helpers
window.Object.defineProperty( Element.prototype, 'documentOffsetTop', {
	get: function () {
		return this.offsetTop + ( this.offsetParent ? this.offsetParent.documentOffsetTop : 0 );
	}
} );

window.Object.defineProperty( Element.prototype, 'documentOffsetLeft', {
	get: function () {
		return this.offsetLeft + ( this.offsetParent ? this.offsetParent.documentOffsetLeft : 0 );
	}
} );

Element.prototype.empty = function () {
	while (this.firstChild) {
		this.removeChild(this.firstChild);
	}
}

Element.prototype.remove = function() {
	this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
	for(var i = 0, len = this.length; i < len; i++) {
		if(this[i] && this[i].parentElement) {
			this[i].parentElement.removeChild(this[i]);
		}
	}
}

function isInDOMTree(a){return!!findUltimateAncestor(a).body}
function findUltimateAncestor(a){for(;a.parentNode;)a=a.parentNode;return a};

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
		return this.replace(/\..+$/, '');
	}
})();

(function() {
  String.prototype.trimUntilExtn = function () {
	return this.replace(/.*\./, '');
  }
})();


/* ------------ fetch polyfill ---------------------- */
// https://github.com/github/fetch
/*
(function(self) {
  'use strict';

  if (self.fetch) {
	return
  }

  var support = {
	searchParams: 'URLSearchParams' in self,
	iterable: 'Symbol' in self && 'iterator' in Symbol,
	blob: 'FileReader' in self && 'Blob' in self && (function() {
	  try {
		new Blob()
		return true
	  } catch(e) {
		return false
	  }
	})(),
	formData: 'FormData' in self,
	arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
	var viewClasses = [
	  '[object Int8Array]',
	  '[object Uint8Array]',
	  '[object Uint8ClampedArray]',
	  '[object Int16Array]',
	  '[object Uint16Array]',
	  '[object Int32Array]',
	  '[object Uint32Array]',
	  '[object Float32Array]',
	  '[object Float64Array]'
	]

	var isDataView = function(obj) {
	  return obj && DataView.prototype.isPrototypeOf(obj)
	}

	var isArrayBufferView = ArrayBuffer.isView || function(obj) {
	  return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
	}
  }

  function normalizeName(name) {
	if (typeof name !== 'string') {
	  name = String(name)
	}
	if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	  throw new TypeError('Invalid character in header field name')
	}
	return name.toLowerCase()
  }

  function normalizeValue(value) {
	if (typeof value !== 'string') {
	  value = String(value)
	}
	return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
	var iterator = {
	  next: function() {
		var value = items.shift()
		return {done: value === undefined, value: value}
	  }
	}

	if (support.iterable) {
	  iterator[Symbol.iterator] = function() {
		return iterator
	  }
	}

	return iterator
  }

  function Headers(headers) {
	this.map = {}

	if (headers instanceof Headers) {
	  headers.forEach(function(value, name) {
		this.append(name, value)
	  }, this)
	} else if (Array.isArray(headers)) {
	  headers.forEach(function(header) {
		this.append(header[0], header[1])
	  }, this)
	} else if (headers) {
	  Object.getOwnPropertyNames(headers).forEach(function(name) {
		this.append(name, headers[name])
	  }, this)
	}
  }

  Headers.prototype.append = function(name, value) {
	name = normalizeName(name)
	value = normalizeValue(value)
	var oldValue = this.map[name]
	this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
	delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
	name = normalizeName(name)
	return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
	return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
	this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
	for (var name in this.map) {
	  if (this.map.hasOwnProperty(name)) {
		callback.call(thisArg, this.map[name], name, this)
	  }
	}
  }

  Headers.prototype.keys = function() {
	var items = []
	this.forEach(function(value, name) { items.push(name) })
	return iteratorFor(items)
  }

  Headers.prototype.values = function() {
	var items = []
	this.forEach(function(value) { items.push(value) })
	return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
	var items = []
	this.forEach(function(value, name) { items.push([name, value]) })
	return iteratorFor(items)
  }

  if (support.iterable) {
	Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
	if (body.bodyUsed) {
	  return Promise.reject(new TypeError('Already read'))
	}
	body.bodyUsed = true
  }

  function fileReaderReady(reader) {
	return new Promise(function(resolve, reject) {
	  reader.onload = function() {
		resolve(reader.result)
	  }
	  reader.onerror = function() {
		reject(reader.error)
	  }
	})
  }

  function readBlobAsArrayBuffer(blob) {
	var reader = new FileReader()
	var promise = fileReaderReady(reader)
	reader.readAsArrayBuffer(blob)
	return promise
  }

  function readBlobAsText(blob) {
	var reader = new FileReader()
	var promise = fileReaderReady(reader)
	reader.readAsText(blob)
	return promise
  }

  function readArrayBufferAsText(buf) {
	var view = new Uint8Array(buf)
	var chars = new Array(view.length)

	for (var i = 0; i < view.length; i++) {
	  chars[i] = String.fromCharCode(view[i])
	}
	return chars.join('')
  }

  function bufferClone(buf) {
	if (buf.slice) {
	  return buf.slice(0)
	} else {
	  var view = new Uint8Array(buf.byteLength)
	  view.set(new Uint8Array(buf))
	  return view.buffer
	}
  }

  function Body() {
	this.bodyUsed = false

	this._initBody = function(body) {
	  this._bodyInit = body
	  if (!body) {
		this._bodyText = ''
	  } else if (typeof body === 'string') {
		this._bodyText = body
	  } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
		this._bodyBlob = body
	  } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
		this._bodyFormData = body
	  } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
		this._bodyText = body.toString()
	  } else if (support.arrayBuffer && support.blob && isDataView(body)) {
		this._bodyArrayBuffer = bufferClone(body.buffer)
		// IE 10-11 can't handle a DataView body.
		this._bodyInit = new Blob([this._bodyArrayBuffer])
	  } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
		this._bodyArrayBuffer = bufferClone(body)
	  } else {
		throw new Error('unsupported BodyInit type')
	  }

	  if (!this.headers.get('content-type')) {
		if (typeof body === 'string') {
		  this.headers.set('content-type', 'text/plain;charset=UTF-8')
		} else if (this._bodyBlob && this._bodyBlob.type) {
		  this.headers.set('content-type', this._bodyBlob.type)
		} else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
		  this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
		}
	  }
	}

	if (support.blob) {
	  this.blob = function() {
		var rejected = consumed(this)
		if (rejected) {
		  return rejected
		}

		if (this._bodyBlob) {
		  return Promise.resolve(this._bodyBlob)
		} else if (this._bodyArrayBuffer) {
		  return Promise.resolve(new Blob([this._bodyArrayBuffer]))
		} else if (this._bodyFormData) {
		  throw new Error('could not read FormData body as blob')
		} else {
		  return Promise.resolve(new Blob([this._bodyText]))
		}
	  }

	  this.arrayBuffer = function() {
		if (this._bodyArrayBuffer) {
		  return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
		} else {
		  return this.blob().then(readBlobAsArrayBuffer)
		}
	  }
	}

	this.text = function() {
	  var rejected = consumed(this)
	  if (rejected) {
		return rejected
	  }

	  if (this._bodyBlob) {
		return readBlobAsText(this._bodyBlob)
	  } else if (this._bodyArrayBuffer) {
		return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
	  } else if (this._bodyFormData) {
		throw new Error('could not read FormData body as text')
	  } else {
		return Promise.resolve(this._bodyText)
	  }
	}

	if (support.formData) {
	  this.formData = function() {
		return this.text().then(decode)
	  }
	}

	this.json = function() {
	  return this.text().then(JSON.parse)
	}

	return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
	var upcased = method.toUpperCase()
	return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
	options = options || {}
	var body = options.body

	if (input instanceof Request) {
	  if (input.bodyUsed) {
		throw new TypeError('Already read')
	  }
	  this.url = input.url
	  this.credentials = input.credentials
	  if (!options.headers) {
		this.headers = new Headers(input.headers)
	  }
	  this.method = input.method
	  this.mode = input.mode
	  if (!body && input._bodyInit != null) {
		body = input._bodyInit
		input.bodyUsed = true
	  }
	} else {
	  this.url = String(input)
	}

	this.credentials = options.credentials || this.credentials || 'omit'
	if (options.headers || !this.headers) {
	  this.headers = new Headers(options.headers)
	}
	this.method = normalizeMethod(options.method || this.method || 'GET')
	this.mode = options.mode || this.mode || null
	this.referrer = null

	if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	  throw new TypeError('Body not allowed for GET or HEAD requests')
	}
	this._initBody(body)
  }

  Request.prototype.clone = function() {
	return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
	var form = new FormData()
	body.trim().split('&').forEach(function(bytes) {
	  if (bytes) {
		var split = bytes.split('=')
		var name = split.shift().replace(/\+/g, ' ')
		var value = split.join('=').replace(/\+/g, ' ')
		form.append(decodeURIComponent(name), decodeURIComponent(value))
	  }
	})
	return form
  }

  function parseHeaders(rawHeaders) {
	var headers = new Headers()
	// Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	// https://tools.ietf.org/html/rfc7230#section-3.2
	var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/, ' ')
	preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
	  var parts = line.split(':')
	  var key = parts.shift().trim()
	  if (key) {
		var value = parts.join(':').trim()
		headers.append(key, value)
	  }
	})
	return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
	if (!options) {
	  options = {}
	}

	this.type = 'default'
	this.status = 'status' in options ? options.status : 200
	this.ok = this.status >= 200 && this.status < 300
	this.statusText = 'statusText' in options ? options.statusText : 'OK'
	this.headers = new Headers(options.headers)
	this.url = options.url || ''
	this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
	return new Response(this._bodyInit, {
	  status: this.status,
	  statusText: this.statusText,
	  headers: new Headers(this.headers),
	  url: this.url
	})
  }

  Response.error = function() {
	var response = new Response(null, {status: 0, statusText: ''})
	response.type = 'error'
	return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
	if (redirectStatuses.indexOf(status) === -1) {
	  throw new RangeError('Invalid status code')
	}

	return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
	return new Promise(function(resolve, reject) {
	  var request = new Request(input, init)
	  var xhr = new XMLHttpRequest()

	  xhr.onload = function() {
		var options = {
		  status: xhr.status,
		  statusText: xhr.statusText,
		  headers: parseHeaders(xhr.getAllResponseHeaders() || '')
		}
		options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
		var body = 'response' in xhr ? xhr.response : xhr.responseText
		resolve(new Response(body, options))
	  }

	  xhr.onerror = function() {
		reject(new TypeError('Network request failed'))
	  }

	  xhr.ontimeout = function() {
		reject(new TypeError('Network request failed'))
	  }

	  xhr.open(request.method, request.url, true)

	  if (request.credentials === 'include') {
		xhr.withCredentials = true
	  }

	  if ('responseType' in xhr && support.blob) {
		xhr.responseType = 'blob'
	  }

	  request.headers.forEach(function(value, name) {
		xhr.setRequestHeader(name, value)
	  })

	  xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	})
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);
*/


var hexToRgb = function(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
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

var Arrive=function(r,n,q){function t(e,a,c){f.addMethod(a,c,e.unbindEvent);f.addMethod(a,c,e.unbindEventWithSelectorOrCallback);f.addMethod(a,c,e.unbindEventWithSelectorAndCallback)}function p(e){e.arrive=k.bindEvent;t(k,e,"unbindArrive");e.leave=h.bindEvent;t(h,e,"unbindLeave")}if(r.MutationObserver&&"undefined"!==typeof HTMLElement){var w=0,f=function(){var e=HTMLElement.prototype.matches||HTMLElement.prototype.webkitMatchesSelector||HTMLElement.prototype.mozMatchesSelector||HTMLElement.prototype.msMatchesSelector;
  return{matchesSelector:function(a,c){return a instanceof HTMLElement&&e.call(a,c)},addMethod:function(a,c,d){var b=a[c];a[c]=function(){if(d.length==arguments.length)return d.apply(this,arguments);if("function"==typeof b)return b.apply(this,arguments)}},callCallbacks:function(a){for(var c=0,d;d=a[c];c++)d.callback.call(d.elem)},checkChildNodesRecursively:function(a,c,d,b){for(var u=0,m;m=a[u];u++)d(m,c,b)&&b.push({callback:c.callback,elem:m}),0<m.childNodes.length&&f.checkChildNodesRecursively(m.childNodes,
	c,d,b)},mergeArrays:function(a,c){var d={},b;for(b in a)d[b]=a[b];for(b in c)d[b]=c[b];return d},toElementsArray:function(a){"undefined"===typeof a||"number"===typeof a.length&&a!==r||(a=[a]);return a}}}(),x=function(){var e=function(){this._eventsBucket=[];this._beforeRemoving=this._beforeAdding=null};e.prototype.addEvent=function(a,c,d,b){a={target:a,selector:c,options:d,callback:b,firedElems:[]};this._beforeAdding&&this._beforeAdding(a);this._eventsBucket.push(a);return a};e.prototype.removeEvent=
  function(a){for(var c=this._eventsBucket.length-1,d;d=this._eventsBucket[c];c--)a(d)&&(this._beforeRemoving&&this._beforeRemoving(d),this._eventsBucket.splice(c,1))};e.prototype.beforeAdding=function(a){this._beforeAdding=a};e.prototype.beforeRemoving=function(a){this._beforeRemoving=a};return e}(),v=function(e,a){var c=new x,d=this,b={fireOnAttributesModification:!1};c.beforeAdding(function(b){var c=b.target,l;if(c===r.document||c===r)c=document.getElementsByTagName("html")[0];l=new MutationObserver(function(d){a.call(this,
  d,b)});var g=e(b.options);l.observe(c,g);b.observer=l;b.me=d});c.beforeRemoving(function(b){b.observer.disconnect()});this.bindEvent=function(d,a,l){a=f.mergeArrays(b,a);for(var g=f.toElementsArray(this),e=0;e<g.length;e++)c.addEvent(g[e],d,a,l)};this.unbindEvent=function(){var b=f.toElementsArray(this);c.removeEvent(function(a){for(var d=0;d<b.length;d++)if(this===q||a.target===b[d])return!0;return!1})};this.unbindEventWithSelectorOrCallback=function(b){var d=f.toElementsArray(this);c.removeEvent("function"===
typeof b?function(a){for(var c=0;c<d.length;c++)if((this===q||a.target===d[c])&&a.callback===b)return!0;return!1}:function(a){for(var c=0;c<d.length;c++)if((this===q||a.target===d[c])&&a.selector===b)return!0;return!1})};this.unbindEventWithSelectorAndCallback=function(b,a){var d=f.toElementsArray(this);c.removeEvent(function(c){for(var e=0;e<d.length;e++)if((this===q||c.target===d[e])&&c.selector===b&&c.callback===a)return!0;return!1})};return this},k=new function(){function e(d,b,a){if(f.matchesSelector(d,
	b.selector)&&(d._id===q&&(d._id=w++),-1==b.firedElems.indexOf(d._id))){if(b.options.onceOnly)if(0===b.firedElems.length)b.me.unbindEventWithSelectorAndCallback.call(b.target,b.selector,b.callback);else return;b.firedElems.push(d._id);a.push({callback:b.callback,elem:d})}}var a={fireOnAttributesModification:!1,onceOnly:!1,existing:!1};k=new v(function(a){var b={attributes:!1,childList:!0,subtree:!0};a.fireOnAttributesModification&&(b.attributes=!0);return b},function(a,b){a.forEach(function(a){var d=
  a.addedNodes,c=a.target,g=[];null!==d&&0<d.length?f.checkChildNodesRecursively(d,b,e,g):"attributes"===a.type&&e(c,b,g)&&g.push({callback:b.callback,elem:node});f.callCallbacks(g)})});var c=k.bindEvent;k.bindEvent=function(d,b,e){"undefined"===typeof e?(e=b,b=a):b=f.mergeArrays(a,b);var m=f.toElementsArray(this);if(b.existing){for(var l=[],g=0;g<m.length;g++)for(var k=m[g].querySelectorAll(d),h=0;h<k.length;h++)l.push({callback:e,elem:k[h]});if(b.onceOnly&&l.length)return e.call(l[0].elem);f.callCallbacks(l)}c.call(this,
  d,b,e)};return k},h=new function(){function e(a,b){return f.matchesSelector(a,b.selector)}var a={};h=new v(function(a){return{childList:!0,subtree:!0}},function(a,b){a.forEach(function(a){a=a.removedNodes;var c=[];null!==a&&0<a.length&&f.checkChildNodesRecursively(a,b,e,c);f.callCallbacks(c)})});var c=h.bindEvent;h.bindEvent=function(d,b,e){"undefined"===typeof e?(e=b,b=a):b=f.mergeArrays(a,b);c.call(this,d,b,e)};return h};n&&p(n.fn);p(HTMLElement.prototype);p(NodeList.prototype);p(HTMLCollection.prototype);
  p(HTMLDocument.prototype);p(Window.prototype);n={};t(k,n,"unbindAllArrive");t(h,n,"unbindAllLeave");return n}}(this,"undefined"===typeof jQuery?null:jQuery,void 0);
 */


// aspectRatio(from_width,from_height, to_width,to_height) => {width: x, height: y}
// A4 = 1 : 1 / sqrt(2)
function aspectRatio(b,c,a,d){a=Math.min(a/b,d/c);return{width:b*a,height:c*a}};

// rename the local storage app name
localforage.config({
	name: 'DocumentNinja'
});

// pixlr api
// via https://support.pixlr.com/hc/en-us/articles/209350978-The-Pixlr-API-embedding-Pixlr-web-applications-in-your-own-site
/*
var pixlr=function(){function f(b,c){for(var a in c)c.hasOwnProperty(a)&&(b[a]=c[a]||b[a]);return b}function g(b){var c="https://pixlr.com/"+b.service+"/?s=c",a;for(a in b)b.hasOwnProperty(a)&&"service"!==a&&(c+="&"+a+"="+escape(b[a]));return c}var l=window.ActiveXObject,m=window.ActiveXObject&&null!==document.implementation&&null!==document.implementation.hasFeature&&null===window.XMLHttpRequest,n="BackCompat"===document.compatMode,e={settings:{service:"editor"},overlay:{show:function(b){b=f(e.settings,
b||{});var c=document.createElement("iframe"),a=pixlr.overlay.div=document.createElement("div"),d=pixlr.overlay.idiv=document.createElement("div");a.style.background="#696969";a.style.opacity=.8;a.style.filter="alpha(opacity=80)";if(l&&n||m){var h=0,k=0;0!==document.documentElement.clientWidth?(h=document.documentElement.clientWidth,k=document.documentElement.clientHeight):(h=document.body.clientWidth,k=document.body.clientHeight);a.style.position="absolute";a.style.width=h+"px";a.style.height=k+
"px";a.style.setExpression("top","(t=document.documentElement.scrollTop||document.body.scrollTop)+'px'");a.style.setExpression("left","(l=document.documentElement.scrollLeft||document.body.scrollLeft)+'px'")}else a.style.width="100%",a.style.height="100%",a.style.top="0",a.style.left="0",a.style.position="fixed";a.style.zIndex=99998;d.style.border="1px solid #2c2c2c";l&&n||m?(d.style.position="absolute",d.style.setExpression("top","25+((t=document.documentElement.scrollTop||document.body.scrollTop))+'px'"),
d.style.setExpression("left","35+((l=document.documentElement.scrollLeft||document.body.scrollLeft))+'px'")):(d.style.position="fixed",d.style.top="25px",d.style.left="35px");d.style.zIndex=99999;document.body.appendChild(a);document.body.appendChild(d);c.style.width=a.offsetWidth-70+"px";c.style.height=a.offsetHeight-50+"px";c.style.border="1px solid #b1b1b1";c.style.backgroundColor="#606060";c.style.display="block";c.frameBorder=0;c.src=g(b);d.appendChild(c)},hide:function(b){pixlr.overlay.idiv&&
pixlr.overlay.div&&(document.body.removeChild(pixlr.overlay.idiv),document.body.removeChild(pixlr.overlay.div));b&&eval(b)}},url:function(b){return g(f(e.settings,b||{}))},edit:function(b){b=f(e.settings,b||{});location.href=g(b)}};return e}();
*/

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

/*
 * jQuery scrollintoview() plugin and :scrollable selector filter
 *
 * Version 1.8 (14 Jul 2011)
 * Requires jQuery 1.4 or newer
 *
 * Copyright (c) 2011 Robert Koritnik
 * Licensed under the terms of the MIT license
 * http://www.opensource.org/licenses/mit-license.php
(function(f){var c={vertical:{x:false,y:true},horizontal:{x:true,y:false},both:{x:true,y:true},x:{x:true,y:false},y:{x:false,y:true}};var b={duration:"fast",direction:"both"};var e=/^(?:html)$/i;var g=function(k,j){j=j||(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(k,null):k.currentStyle);var i=document.defaultView&&document.defaultView.getComputedStyle?true:false;var h={top:(parseFloat(i?j.borderTopWidth:f.css(k,"borderTopWidth"))||0),left:(parseFloat(i?j.borderLeftWidth:f.css(k,"borderLeftWidth"))||0),bottom:(parseFloat(i?j.borderBottomWidth:f.css(k,"borderBottomWidth"))||0),right:(parseFloat(i?j.borderRightWidth:f.css(k,"borderRightWidth"))||0)};return{top:h.top,left:h.left,bottom:h.bottom,right:h.right,vertical:h.top+h.bottom,horizontal:h.left+h.right}};var d=function(h){var j=f(window);var i=e.test(h[0].nodeName);return{border:i?{top:0,left:0,bottom:0,right:0}:g(h[0]),scroll:{top:(i?j:h).scrollTop(),left:(i?j:h).scrollLeft()},scrollbar:{right:i?0:h.innerWidth()-h[0].clientWidth,bottom:i?0:h.innerHeight()-h[0].clientHeight},rect:(function(){var k=h[0].getBoundingClientRect();return{top:i?0:k.top,left:i?0:k.left,bottom:i?h[0].clientHeight:k.bottom,right:i?h[0].clientWidth:k.right}})()}};f.fn.extend({scrollintoview:function(j){j=f.extend({},b,j);j.direction=c[typeof(j.direction)==="string"&&j.direction.toLowerCase()]||c.both;var n="";if(j.direction.x===true){n="horizontal"}if(j.direction.y===true){n=n?"both":"vertical"}var l=this.eq(0);var i=l.closest(":scrollable("+n+")");if(i.length>0){i=i.eq(0);var m={e:d(l),s:d(i)};var h={top:m.e.rect.top-(m.s.rect.top+m.s.border.top),bottom:m.s.rect.bottom-m.s.border.bottom-m.s.scrollbar.bottom-m.e.rect.bottom,left:m.e.rect.left-(m.s.rect.left+m.s.border.left),right:m.s.rect.right-m.s.border.right-m.s.scrollbar.right-m.e.rect.right};var k={};if(j.direction.y===true){if(h.top<0){k.scrollTop=m.s.scroll.top+h.top}else{if(h.top>0&&h.bottom<0){k.scrollTop=m.s.scroll.top+Math.min(h.top,-h.bottom)}}}if(j.direction.x===true){if(h.left<0){k.scrollLeft=m.s.scroll.left+h.left}else{if(h.left>0&&h.right<0){k.scrollLeft=m.s.scroll.left+Math.min(h.left,-h.right)}}}if(!f.isEmptyObject(k)){if(e.test(i[0].nodeName)){i=f("html,body")}i.animate(k,j.duration).eq(0).queue(function(o){f.isFunction(j.complete)&&j.complete.call(i[0]);o()})}else{f.isFunction(j.complete)&&j.complete.call(i[0])}}return this}});var a={auto:true,scroll:true,visible:false,hidden:false};f.extend(f.expr[":"],{scrollable:function(k,i,n,h){var m=c[typeof(n[3])==="string"&&n[3].toLowerCase()]||c.both;var l=(document.defaultView&&document.defaultView.getComputedStyle?document.defaultView.getComputedStyle(k,null):k.currentStyle);var o={x:a[l.overflowX.toLowerCase()]||false,y:a[l.overflowY.toLowerCase()]||false,isRoot:e.test(k.nodeName)};if(!o.x&&!o.y&&!o.isRoot){return false}var j={height:{scroll:k.scrollHeight,client:k.clientHeight},width:{scroll:k.scrollWidth,client:k.clientWidth},scrollableX:function(){return(o.x||o.isRoot)&&this.width.scroll>this.width.client},scrollableY:function(){return(o.y||o.isRoot)&&this.height.scroll>this.height.client}};return m.y&&j.scrollableY()||m.x&&j.scrollableX()}})})(jQuery);
 */

function scrollIfNeeded(element, container) {
  if (element.offsetTop < container.scrollTop) {
    container.scrollTop = element.offsetTop;
  } else {
    var offsetBottom = element.offsetTop + element.offsetHeight;
    var scrollBottom = container.scrollTop + container.offsetHeight;
    if (offsetBottom > scrollBottom) {
      container.scrollTop = offsetBottom - container.offsetHeight;
    }
  }
}


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
		$obj.text(formatSeconds(n) + " / " + formatSeconds(d) + " (" + pc + "%)");
	}
}

// generic seconds to hh:mm:ss with optional hh: if empty
function formatSeconds(seconds) {
	var date = new Date(1970,0,1);
	date.setSeconds(seconds);
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

window.addEventListener('statuschange', function (e) {
  checkTimeSpent(e.detail);
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

/* functions relating to buttons with [data-action] or [data-popover] properties */
var _g_popover_target;
function closePopover(e) {
	var b = document.querySelector("div.dn-backdrop");
	b.removeEventListener("click", closePopover);
	document.body.removeChild(b);
	document.body.removeChild(document.querySelector("div.dn-popover"));
}

function handlePopover(tgt) {
	_g_popover_target = tgt;
	var rekt = tgt.getBoundingClientRect(),
		b = document.createElement("div");
	b.addEventListener("click", closePopover, false); // "click outside popover"
	b.classList.add("dn-backdrop");
	document.body.appendChild(b);
	b = document.createElement("div");
	b.classList.add("dn-popover");
	b.dataset.source = tgt.dataset.action;
	b.innerHTML = Handlebars.templates["popovers"](tgt.dataset);
	b.style.top = (rekt.y + rekt.height + 10) + "px";
	b.style.right = "calc((100vw + .5em) - " + (rekt.x + rekt.width) + "px)";
	document.body.appendChild(b);
	switch (tgt.dataset.action) {
		case "toggle-settings":
			$("input[data-action='toggle-mute']").prop("checked", !DocNinja.options.MUTED);
			$("input[data-action='toggle-no-autosplit']").prop("checked", DocNinja.options.AUTOSPLIT);
			$("input[data-action='toggle-no-autoresize']").prop("checked", DocNinja.options.AUTOOPTIMISE);
			$("input[data-action='toggle-no-autocenter']").prop("checked", DocNinja.options.AUTOCENTER);
			break;

		case "page-layout":
			$("input[value='left']").prop("checked", tgt.dataset.value === "left");
			$("input[value='center']").prop("checked", tgt.dataset.value === "center");
			break;

		break;
	}
	if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndpop);
	if ("init" in tgt.dataset) {
		switch (tgt.dataset.init) {
			case "jscolor":
				var picker = new jscolor(b.querySelector("button.jscolor"), {
					valueElement:'color_value',
					value: tgt.dataset.value ? tgt.dataset.value : DocNinja.options.pageBackgroundColour,
					onFineChange: debounce(function() {
						previewPageBackground(this.toHEXString());
					}, 500),
					hash: true
				});
				break;

			case "scoreslider":
				var el = document.getElementById("score_slider");
				noUiSlider.create(el, {
					start: [el.dataset.value],
					tooltips: [{to:function(val){return Math.round(val)}}],
					range: {
						'min': +el.dataset.min,
						'max': +el.dataset.max
					},
					step: 1,
					pips: {
						mode: 'count',
						values: Math.max(2, el.dataset.max / 7 >> 0),
						density: 5
					},
				});
				break;

			case "rangeslider":
				var el = document.getElementById("range_slider");
				noUiSlider.create(el, {
					start: [el.dataset.value],
					tooltips: [{to:function(val){return Math.round(val) + '%'}}],
					range: {
						'min': +el.dataset.min,
						'max': +el.dataset.max
					},
					step: 1,
					pips: {
						mode: 'values',
						values: [1,20,40,60,80,100],
						density: 5
					},
				});
				break;

			case "initaudio":
				var id = DocNinja.filePreview.CurrentFile();
				var audio = document.getElementById('popover_audioElement');
				if (audio.src) {audio.classList.add('visible');}
				else {audio.classList.remove('visible');}
				localforage.getItem(id).then(function (obj) {
					document.getElementById("popover_audioElement").src = obj.payload.mp3;
				});
				break;
		}
	}
}

/* playing a sound that didn't involve a user interaction now throws an exception, so cope with that silently */
function playSound(obj) {
	Promise.resolve(obj.play()).catch(function(ex) {
		console.dir(ex);
	});
}
function handleAction(node, e) {
	var tgt = (typeof node === 'undefined') ? _g_popover_target : node;
	switch (tgt.dataset.action) {
		case "pop-help":
			var w = window.open(tgt.dataset.url,"_blank");
			w.focus();
			break;

		case "add-content":
			classie.addClass(document.body,"modal-add");
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
		score = document.getElementById("score_slider").noUiSlider.get();
	localforage.getItem(id).then(function (obj) {
		obj.score = score;
		closePopover();
		return localforage.setItem(id, obj);
	});
}

function popover_saveRange() {
	var id = DocNinja.filePreview.CurrentFile(),
		button = document.querySelector("button[data-init='rangeslider']"),
		score = document.getElementById("range_slider").noUiSlider.get();
	button.dataset.value = score;
	localforage.getItem(id).then(function (obj) {
		obj.score = score;
		closePopover();
		return localforage.setItem(id, obj);
	});
}

function popover_audioUpload(file) {
	var id = DocNinja.filePreview.CurrentFile();
	//console.log(file.type);
	if ((file && file.type.indexOf("audio/mpeg")===-1) && file.type.indexOf("audio/mp3")===-1) return; // "audio/mp3 on chrome, audio/mpeg on firefox..."
	var reader = new FileReader();
	reader.onloadend = function (event) {
		localforage.getItem(id).then(function (obj) {
			obj.payload.mp3 = event.target.result;
			var updated = DocNinja.Navigation.Icons.Add.Audio(id);
			document.querySelector("button[data-action='set-audio']").dataset.init = "initaudio";
			//document.getElementById("audioStatus").innerHTML = "<i class='ninja-volume_up' title='Page has audio'></i>";
			closePopover();
			localforage.setItem(id, obj);
			if (updated) window.setItemOrder();
		});
	}
	reader.readAsDataURL(file);
}

function popover_savePageBackground() {
	var id = DocNinja.filePreview.CurrentFile(),
		colour = document.querySelector("input[name='color_value']").value.replace("#",""); // sans-octothorp
	if (document.getElementById('colourAll').checked) {
		closePopover();
		return DocNinja.Page.ModifyAllPageBackgroundColours(colour);
	} else {
		localforage.getItem(id).then(function (obj) {
			switch (obj.kind) {
				case "plugin": case "image":
					obj.payload.backgroundColour = colour;
					break;
				case "url":
					obj = DocNinja.Page.ModifyIframeBackgroundColour(obj, colour);
					break;
				case "file":
					obj = DocNinja.Page.ModifyPageBackgroundColour(obj, colour);
					break;
				default:
					alert("UNHANLED CONDITION RED ALERT GOING TO DEFCON ZERO AARGHHseeconslefrdtls. You were not meant to see this.");
					console.warn(obj);
			}
			// DocNinja.filePreview.Editing.ShowBgColour(colour);
			closePopover();
			return localforage.setItem(id, obj);
		});
	}
}

function popover_useRecording(mp3) {
	var id = DocNinja.filePreview.CurrentFile();
	localforage.getItem(id).then(function (obj) {
		obj.payload.mp3 = mp3;
		var updated = DocNinja.Navigation.Icons.Add.Audio(id);
		document.querySelector("button[data-action='set-audio']").dataset.init = "initaudio";
		//document.getElementById("audioStatus").innerHTML = "<i class='ninja-volume_up' title='Page has audio'></i>";
		closePopover();
		localforage.setItem(id, obj);
		if (updated) window.setItemOrder();
	});
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
		p.removeChild(inp);
		// replace input with hyperlink containing oldValue
		var l = document.createElement("a");l.dataset.action="preview";l.setAttribute("href","javascript:;");l.textContent=inp.dataset.oldValue;
		p.appendChild(l);
		setItemOrder();
		inp = null;
		document.body.removeEventListener('click', cancelName);
		var b = document.getElementById('preview-frame').contentWindow.document.body;
		if (b) b.removeEventListener('click', cancelName);
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
			persistProperty(id, "name", inp.value);
			inp.dataset.oldValue = inp.value;
		}
		cancelName();
	}
	inp.classList.add("rename-page");
	p.appendChild(inp);


	document.body.addEventListener('click', cancelName);
	var b = document.getElementById('preview-frame').contentWindow.document.body;
	if (b) b.addEventListener('click', cancelName);

	inp.select();
}

function hideOverlays(cog) {
	var classes = ["drag-over","modal-add","modal-import"];
	if (cog) classes.push("settings");
	DOMTokenList.prototype.remove.apply(document.body.classList, classes);
}

function performAction(tgt, e) {
	hideOverlays();
	var id = tgt.closest("[data-fileid]") ? tgt.closest("[data-fileid]").dataset.fileid : DocNinja.filePreview.CurrentFile() ; // self or li or container
	switch (tgt.getAttribute("data-action")) {

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

		case "item-increase":
			DocNinja.PurityControl.Nav.Indent(tgt.closest("li"));
			break;

		case "item-decrease":
			DocNinja.PurityControl.Nav.Outdent(tgt.closest("li"));
			break;

		case "upload-kloudless":
			DocNinja.KLOUDLESS_INPUT.choose();
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

		case "add-quiz":
			var newId = DocNinja.PurityControl.Nav.GetFileId(),
				fileInfo = {
					name: "New Quiz",
					supports:["edit","view"],
					kind:"plugin",
					plugin: "QuizBuilder",
					depth: 0,
					payload: {}
				};
			if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndpop);
			localforage.setItem(newId, fileInfo).then(function(obj) {
				DocNinja.PurityControl.Nav.Add(DocNinja.navItems, newId, fileInfo, null, "ready");
				DocNinja.PurityControl.Nav.Check();
				DocNinja.filePreview.Select(newId);
				localforage.setItem("order", DocNinja.navItems.innerHTML);
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
				url = $("#paste-url-obj").val();
			$("#paste-url-obj").val(""); // reset
			if (url.length) {
				if (url.indexOf("://")===-1) url = "https://" + url; // otherwise what?
				li.innerHTML = url;
				li.setAttribute("data-fileid",DocNinja.PurityControl.Nav.GetFileId()); // "file-" + (new Date().getTime()).toString(36));
				DocNinja.navItems.appendChild(li);
				DocNinja.fileConversion.BeginConversion(null, {url: url }, li, "url", "");
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

		case "clear-storage":
			localforage.clear(function (err) {
				document.getElementById("fiddle").innerHTML = "";
				$("#nav-colour").attr("style", "");
				DocNinja.filePreview.Reset();
				DocNinja.navItems.innerHTML = "";
				if (!DocNinja.options.MUTED) playSound(DocNinja.options.sndtrash);
				DocNinja.PurityControl.Nav.Check();
				// setItemOrder(); // overwrites "order" cache
				// checkDummyItem();
				$("form").each(function() {this.reset();});
				// reset to the first tab (without animation)
				$(document.body).removeClass("change-settings download-zip").addClass("add-documents");
				$("button[data-action='add-content']").click();
			});
			break;

		case "record-page-audio":
			if (!document.getElementById('audiorecorder-frame')) {
				var rfrm = document.createElement("iframe");
				rfrm.setAttribute("seamless", true);
				rfrm.setAttribute("id", "audiorecorder-frame");
				rfrm.setAttribute("src", "/app/plugins/MicRecorderToMp3/edit.html");
				document.querySelector('div[data-source="set-audio"]>section').appendChild(rfrm);
			}
			break;

		case "upload-page-audio":
			document.getElementById("pageAudioUpload").click();
			break;

		case "trash-page-audio":
			var ae = document.getElementById("popover_audioElement");
			localforage.getItem(id).then(function action_trash_audio_get(obj) {
				obj.payload.mp3 = undefined;
				delete obj.payload.mp3;
				ae.pause();
				ae.removeAttribute("src");
				var updated = DocNinja.Navigation.Icons.Remove.Audio(id);
				if (ae.hasOwnProperty("currentSrc")) ae.currentSrc = undefined;
				document.querySelector("button[data-action='set-audio']").removeAttribute("data-init");
				//document.getElementById("audioStatus").innerHTML = "<i class='ninja-volume_off' title='No page audio'></i>";
				closePopover();
				localforage.setItem(id,obj);
				if (updated) window.setItemOrder();
			});
			break;

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
	} else if ("action" in tgt.dataset) {
		handleAction(tgt, e);
	} else if ("tab" in tgt.dataset) {
		changeTab(e);
	}
}

function changeTab(e) {
	var tab = e.target.closest("a").dataset.tab;
	hideOverlays();
	e.preventDefault();
	// DocNinja.EditHandlers.Unload (false); // unbind any editors but persist their data
	DocNinja.options.loader.show(); // svgloader data-opening
	document.body.classList.remove("settings"); // close settings
	if (!DocNinja.options.MUTED) playSound(DocNinja.options.snd); // ninja sword sound to match loader effect
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
		DocNinja.options.loader.hide();
		DocNinja.routines.PersistSettings("change tab");
	}, DocNinja.options.tabSpeed );
}

function persistProperty(fileId, propertyName, propertyValue) {
	localforage.getItem(fileId, function persist_property_get(err, value) {
		var data = value || {};
		data[propertyName] = propertyValue;
		localforage.setItem(fileId, data);
	});
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

  source.connect(analyser);
  //analyser.connect(audioCtx.destination);

  draw()

  function draw() {
    WIDTH = canvas.width
    HEIGHT = canvas.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = 'rgb(34, 46, 70)'; // dark blue
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(87, 183, 220)'; // light blue

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
function tXml(a,d){function c(){for(var l=[];a[b];){if(60==a.charCodeAt(b)){if(47===a.charCodeAt(b+1)){b=a.indexOf(">",b);break}else if(33===a.charCodeAt(b+1)){if(45==a.charCodeAt(b+2)){for(;62!==a.charCodeAt(b)||45!=a.charCodeAt(b-1)||45!=a.charCodeAt(b-2)||-1==b;)b=a.indexOf(">",b+1);-1===b&&(b=a.length)}else for(b+=2;62!==a.charCodeAt(b);)b++;b++;continue}var c=f();l.push(c)}else c=b,b=a.indexOf("<",b)-1,-2===b&&(b=a.length),c=a.slice(c,b+1),0<c.trim().length&&l.push(c);b++}return l}function l(){for(var c=
b;-1===g.indexOf(a[b]);)b++;return a.slice(c,b)}function f(){var d={};b++;d.tagName=l();for(var f=!1;62!==a.charCodeAt(b);){var e=a.charCodeAt(b);if(64<e&&91>e||96<e&&123>e){for(var g=l(),e=a.charCodeAt(b);39!==e&&34!==e&&!(64<e&&91>e||96<e&&123>e)&&62!==e;)b++,e=a.charCodeAt(b);f||(d.attributes={},f=!0);if(39===e||34===e){var e=a[b],h=++b;b=a.indexOf(e,h);e=a.slice(h,b)}else e=null,b--;d.attributes[g]=e}b++}47!==a.charCodeAt(b-1)&&("script"==d.tagName?(f=b+1,b=a.indexOf("\x3c/script>",b),d.children=
[a.slice(f,b-1)],b+=8):"style"==d.tagName?(f=b+1,b=a.indexOf("</style>",b),d.children=[a.slice(f,b-1)],b+=7):-1==k.indexOf(d.tagName)&&(b++,d.children=c(g)));return d}d=d||{};var g="\n\t>/= ",k=["img","br","input","meta","link"],h=null;if(d.searchId){var b=(new RegExp("s*ids*=s*['\"]"+d.searchId+"['\"]")).exec(a).index;-1!==b&&(b=a.lastIndexOf("<",b),-1!==b&&(h=f()));return b}b=0;h=c();d.filter&&(h=tXml.filter(h,d.filter));d.simplify&&(h=tXml.simplefy(h));return h}
tXml.simplify=function(a){var d={};if(1===a.length&&"string"==typeof a[0])return a[0];a.forEach(function(a){d[a.tagName]||(d[a.tagName]=[]);if("object"==typeof a){var c=tXml.simplefy(a.children);d[a.tagName].push(c);a.attributes&&(c._attributes=a.attributes)}else d[a.tagName].push(a)});for(var c in d)1==d[c].length&&(d[c]=d[c][0]);return d};tXml.filter=function(a,d){var c=[];a.forEach(function(a){"object"===typeof a&&d(a)&&c.push(a);a.children&&(a=tXml.filter(a.children,d),c=c.concat(a))});return c};
tXml.domToXml=function(a){function d(a){if(a)for(var f=0;f<a.length;f++)if("string"==typeof a[f])c+=a[f].trim();else{var g=a[f];c+="<"+g.tagName;var k=void 0;for(k in g.attributes)c=-1===g.attributes[k].indexOf('"')?c+(" "+k+'="'+g.attributes[k].trim()+'"'):c+(" "+k+"='"+g.attributes[k].trim()+"'");c+=">";d(g.children);c+="</"+g.tagName+">"}}var c="";d(O);return c};"object"!==typeof window&&(module.exports=tXml);