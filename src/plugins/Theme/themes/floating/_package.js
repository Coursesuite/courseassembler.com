
/*! https://github.com/pieroxy/lz-string | mit licence */
var LZString=function(){function x(a,g){if(!w[a]){w[a]={};for(var h=0;h<a.length;h++)w[a][a.charAt(h)]=h}return w[a][g]}var v=String.fromCharCode,w={},l={compressToBase64:function(a){if(null==a)return"";a=l._compress(a,6,function(a){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)});switch(a.length%4){default:case 0:return a;case 1:return a+"===";case 2:return a+"==";case 3:return a+"="}},decompressFromBase64:function(a){return null==a?"":""==a?null:l._decompress(a.length,
32,function(g){return x("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",a.charAt(g))})},compressToUTF16:function(a){return null==a?"":l._compress(a,15,function(a){return v(a+32)})+" "},decompressFromUTF16:function(a){return null==a?"":""==a?null:l._decompress(a.length,16384,function(g){return a.charCodeAt(g)-32})},compressToUint8Array:function(a){a=l.compress(a);for(var g=new Uint8Array(2*a.length),h=0,c=a.length;h<c;h++){var p=a.charCodeAt(h);g[2*h]=p>>>8;g[2*h+1]=p%256}return g},
decompressFromUint8Array:function(a){if(null===a||void 0===a)return l.decompress(a);for(var g=Array(a.length/2),h=0,c=g.length;h<c;h++)g[h]=256*a[2*h]+a[2*h+1];var p=[];g.forEach(function(a){p.push(v(a))});return l.decompress(p.join(""))},compressToEncodedURIComponent:function(a){return null==a?"":l._compress(a,6,function(a){return"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$".charAt(a)})},decompressFromEncodedURIComponent:function(a){if(null==a)return"";if(""==a)return null;
a=a.replace(/ /g,"+");return l._decompress(a.length,32,function(g){return x("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",a.charAt(g))})},compress:function(a){return l._compress(a,16,function(a){return v(a)})},_compress:function(a,g,h){if(null==a)return"";var c,p={},l={},m="",r=2,u=3,f=2,k=[],b=0,d=0,n;for(n=0;n<a.length;n+=1){var q=a.charAt(n);Object.prototype.hasOwnProperty.call(p,q)||(p[q]=u++,l[q]=!0);var t=m+q;if(Object.prototype.hasOwnProperty.call(p,t))m=t;else{if(Object.prototype.hasOwnProperty.call(l,
m)){if(256>m.charCodeAt(0)){for(c=0;c<f;c++)b<<=1,d==g-1?(d=0,k.push(h(b)),b=0):d++;var e=m.charCodeAt(0);for(c=0;8>c;c++)b=b<<1|e&1,d==g-1?(d=0,k.push(h(b)),b=0):d++,e>>=1}else{e=1;for(c=0;c<f;c++)b=b<<1|e,d==g-1?(d=0,k.push(h(b)),b=0):d++,e=0;e=m.charCodeAt(0);for(c=0;16>c;c++)b=b<<1|e&1,d==g-1?(d=0,k.push(h(b)),b=0):d++,e>>=1}r--;0==r&&(r=Math.pow(2,f),f++);delete l[m]}else for(e=p[m],c=0;c<f;c++)b=b<<1|e&1,d==g-1?(d=0,k.push(h(b)),b=0):d++,e>>=1;r--;0==r&&(r=Math.pow(2,f),f++);p[t]=u++;m=String(q)}}if(""!==
m){if(Object.prototype.hasOwnProperty.call(l,m)){if(256>m.charCodeAt(0)){for(c=0;c<f;c++)b<<=1,d==g-1?(d=0,k.push(h(b)),b=0):d++;e=m.charCodeAt(0);for(c=0;8>c;c++)b=b<<1|e&1,d==g-1?(d=0,k.push(h(b)),b=0):d++,e>>=1}else{e=1;for(c=0;c<f;c++)b=b<<1|e,d==g-1?(d=0,k.push(h(b)),b=0):d++,e=0;e=m.charCodeAt(0);for(c=0;16>c;c++)b=b<<1|e&1,d==g-1?(d=0,k.push(h(b)),b=0):d++,e>>=1}r--;0==r&&(r=Math.pow(2,f),f++);delete l[m]}else for(e=p[m],c=0;c<f;c++)b=b<<1|e&1,d==g-1?(d=0,k.push(h(b)),b=0):d++,e>>=1;r--;0==
r&&f++}e=2;for(c=0;c<f;c++)b=b<<1|e&1,d==g-1?(d=0,k.push(h(b)),b=0):d++,e>>=1;for(;;)if(b<<=1,d==g-1){k.push(h(b));break}else d++;return k.join("")},decompress:function(a){return null==a?"":""==a?null:l._decompress(a.length,32768,function(g){return a.charCodeAt(g)})},_decompress:function(a,g,h){var c=[],p=4,l=4,m=3,r=[],u,f,k=h(0),b=g,d=1;for(u=0;3>u;u+=1)c[u]=u;var n=0;var q=Math.pow(2,2);for(f=1;f!=q;){var t=k&b;b>>=1;0==b&&(b=g,k=h(d++));n|=(0<t?1:0)*f;f<<=1}switch(n){case 0:n=0;q=Math.pow(2,8);
for(f=1;f!=q;)t=k&b,b>>=1,0==b&&(b=g,k=h(d++)),n|=(0<t?1:0)*f,f<<=1;var e=v(n);break;case 1:n=0;q=Math.pow(2,16);for(f=1;f!=q;)t=k&b,b>>=1,0==b&&(b=g,k=h(d++)),n|=(0<t?1:0)*f,f<<=1;e=v(n);break;case 2:return""}u=c[3]=e;for(r.push(e);;){if(d>a)return"";n=0;q=Math.pow(2,m);for(f=1;f!=q;)t=k&b,b>>=1,0==b&&(b=g,k=h(d++)),n|=(0<t?1:0)*f,f<<=1;switch(e=n){case 0:n=0;q=Math.pow(2,8);for(f=1;f!=q;)t=k&b,b>>=1,0==b&&(b=g,k=h(d++)),n|=(0<t?1:0)*f,f<<=1;c[l++]=v(n);e=l-1;p--;break;case 1:n=0;q=Math.pow(2,16);
for(f=1;f!=q;)t=k&b,b>>=1,0==b&&(b=g,k=h(d++)),n|=(0<t?1:0)*f,f<<=1;c[l++]=v(n);e=l-1;p--;break;case 2:return r.join("")}0==p&&(p=Math.pow(2,m),m++);if(c[e])e=c[e];else if(e===l)e=u+u.charAt(0);else return null;r.push(e);c[l++]=u+e.charAt(0);p--;u=e;0==p&&(p=Math.pow(2,m),m++)}}};return l}();
"function"===typeof define&&define.amd?define(function(){return LZString}):"undefined"!==typeof module&&null!=module?module.exports=LZString:"undefined"!==typeof angular&&null!=angular&&angular.module("LZString",[]).factory("LZString",function(){return LZString});

/*! css-vars-ponyfill | v2.0.2 | https://jhildenbiddle.github.io/css-vars-ponyfill/ | (c) 2018-2019 John Hildenbiddle <http://hildenbiddle.com> | MIT license */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).cssVars=t()}(this,function(){"use strict";function e(){return(e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function t(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t];return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function r(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={mimeType:t.mimeType||null,onBeforeSend:t.onBeforeSend||Function.prototype,onSuccess:t.onSuccess||Function.prototype,onError:t.onError||Function.prototype,onComplete:t.onComplete||Function.prototype},n=Array.isArray(e)?e:[e],o=Array.apply(null,Array(n.length)).map(function(e){return null});function s(){return!("<"===(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"").trim().charAt(0))}function a(e,t){r.onError(e,n[t],t)}function c(e,t){var s=r.onSuccess(e,n[t],t);e=!1===s?"":s||e,o[t]=e,-1===o.indexOf(null)&&r.onComplete(o)}var i=document.createElement("a");n.forEach(function(e,t){if(i.setAttribute("href",e),i.href=String(i.href),Boolean(document.all&&!window.atob)&&i.host.split(":")[0]!==location.host.split(":")[0]){if(i.protocol===location.protocol){var n=new XDomainRequest;n.open("GET",e),n.timeout=0,n.onprogress=Function.prototype,n.ontimeout=Function.prototype,n.onload=function(){s(n.responseText)?c(n.responseText,t):a(n,t)},n.onerror=function(e){a(n,t)},setTimeout(function(){n.send()},0)}else console.warn("Internet Explorer 9 Cross-Origin (CORS) requests must use the same protocol (".concat(e,")")),a(null,t)}else{var o=new XMLHttpRequest;o.open("GET",e),r.mimeType&&o.overrideMimeType&&o.overrideMimeType(r.mimeType),r.onBeforeSend(o,e,t),o.onreadystatechange=function(){4===o.readyState&&(200===o.status&&s(o.responseText)?c(o.responseText,t):a(o,t))},o.send()}})}function n(e){var t={cssComments:/\/\*[\s\S]+?\*\//g,cssImports:/(?:@import\s*)(?:url\(\s*)?(?:['"])([^'"]*)(?:['"])(?:\s*\))?(?:[^;]*;)/g},n={rootElement:e.rootElement||document,include:e.include||'style,link[rel="stylesheet"]',exclude:e.exclude||null,filter:e.filter||null,useCSSOM:e.useCSSOM||!1,onBeforeSend:e.onBeforeSend||Function.prototype,onSuccess:e.onSuccess||Function.prototype,onError:e.onError||Function.prototype,onComplete:e.onComplete||Function.prototype},s=Array.apply(null,n.rootElement.querySelectorAll(n.include)).filter(function(e){return t=e,r=n.exclude,!(t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector).call(t,r);var t,r}),a=Array.apply(null,Array(s.length)).map(function(e){return null});function c(){if(-1===a.indexOf(null)){var e=a.join("");n.onComplete(e,a,s)}}function i(e,t,o,s){var i=n.onSuccess(e,o,s);(function e(t,o,s,a){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:[];var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:[];var l=u(t,s,i);l.rules.length?r(l.absoluteUrls,{onBeforeSend:function(e,t,r){n.onBeforeSend(e,o,t)},onSuccess:function(e,t,r){var s=n.onSuccess(e,o,t),a=u(e=!1===s?"":s||e,t,i);return a.rules.forEach(function(t,r){e=e.replace(t,a.absoluteRules[r])}),e},onError:function(r,n,u){c.push({xhr:r,url:n}),i.push(l.rules[u]),e(t,o,s,a,c,i)},onComplete:function(r){r.forEach(function(e,r){t=t.replace(l.rules[r],e)}),e(t,o,s,a,c,i)}}):a(t,c)})(e=void 0!==i&&!1===Boolean(i)?"":i||e,o,s,function(e,r){null===a[t]&&(r.forEach(function(e){return n.onError(e.xhr,o,e.url)}),!n.filter||n.filter.test(e)?a[t]=e:a[t]="",c())})}function u(e,r){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],s={};return s.rules=(e.replace(t.cssComments,"").match(t.cssImports)||[]).filter(function(e){return-1===n.indexOf(e)}),s.urls=s.rules.map(function(e){return e.replace(t.cssImports,"$1")}),s.absoluteUrls=s.urls.map(function(e){return o(e,r)}),s.absoluteRules=s.rules.map(function(e,t){var n=s.urls[t],a=o(s.absoluteUrls[t],r);return e.replace(n,a)}),s}s.length?s.forEach(function(e,t){var s=e.getAttribute("href"),u=e.getAttribute("rel"),l="LINK"===e.nodeName&&s&&u&&"stylesheet"===u.toLowerCase(),f="STYLE"===e.nodeName;if(l)r(s,{mimeType:"text/css",onBeforeSend:function(t,r,o){n.onBeforeSend(t,e,r)},onSuccess:function(r,n,a){var c=o(s,location.href);i(r,t,e,c)},onError:function(r,o,s){a[t]="",n.onError(r,e,o),c()}});else if(f){var d=e.textContent;n.useCSSOM&&(d=Array.apply(null,e.sheet.cssRules).map(function(e){return e.cssText}).join("")),i(d,t,e,location.href)}else a[t]="",c()}):n.onComplete("",[])}function o(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href,r=document.implementation.createHTMLDocument(""),n=r.createElement("base"),o=r.createElement("a");return r.head.appendChild(n),r.body.appendChild(o),n.href=t,o.href=e,o.href}var s=a;function a(e,t,r){e instanceof RegExp&&(e=c(e,r)),t instanceof RegExp&&(t=c(t,r));var n=i(e,t,r);return n&&{start:n[0],end:n[1],pre:r.slice(0,n[0]),body:r.slice(n[0]+e.length,n[1]),post:r.slice(n[1]+t.length)}}function c(e,t){var r=t.match(e);return r?r[0]:null}function i(e,t,r){var n,o,s,a,c,i=r.indexOf(e),u=r.indexOf(t,i+1),l=i;if(i>=0&&u>0){for(n=[],s=r.length;l>=0&&!c;)l==i?(n.push(l),i=r.indexOf(e,l+1)):1==n.length?c=[n.pop(),u]:((o=n.pop())<s&&(s=o,a=u),u=r.indexOf(t,l+1)),l=i<u&&i>=0?i:u;n.length&&(c=[s,a])}return c}function u(t){var r=e({},{preserveStatic:!0,removeComments:!1},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{});function n(e){throw new Error("CSS parse error: ".concat(e))}function o(e){var r=e.exec(t);if(r)return t=t.slice(r[0].length),r}function a(){return o(/^{\s*/)}function c(){return o(/^}/)}function i(){o(/^\s*/)}function u(){if(i(),"/"===t[0]&&"*"===t[1]){for(var e=2;t[e]&&("*"!==t[e]||"/"!==t[e+1]);)e++;if(!t[e])return n("end of comment is missing");var r=t.slice(2,e);return t=t.slice(e+2),{type:"comment",comment:r}}}function l(){for(var e,t=[];e=u();)t.push(e);return r.removeComments?[]:t}function f(){for(i();"}"===t[0];)n("extra closing bracket");var e=o(/^(("(?:\\"|[^"])*"|'(?:\\'|[^'])*'|[^{])+)/);if(e)return e[0].trim().replace(/\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*\/+/g,"").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,function(e){return e.replace(/,/g,"‌")}).split(/\s*(?![^(]*\)),\s*/).map(function(e){return e.replace(/\u200C/g,",")})}function d(){o(/^([;\s]*)+/);var e=/\/\*[^*]*\*+([^\/*][^*]*\*+)*\//g,t=o(/^(\*?[-#\/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);if(t){if(t=t[0].trim(),!o(/^:\s*/))return n("property missing ':'");var r=o(/^((?:\/\*.*?\*\/|'(?:\\'|.)*?'|"(?:\\"|.)*?"|\((\s*'(?:\\'|.)*?'|"(?:\\"|.)*?"|[^)]*?)\s*\)|[^};])+)/),s={type:"declaration",property:t.replace(e,""),value:r?r[0].replace(e,"").trim():""};return o(/^[;\s]*/),s}}function p(){if(!a())return n("missing '{'");for(var e,t=l();e=d();)t.push(e),t=t.concat(l());return c()?t:n("missing '}'")}function m(){i();for(var e,t=[];e=o(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)t.push(e[1]),o(/^,\s*/);if(t.length)return{type:"keyframe",values:t,declarations:p()}}function v(){if(i(),"@"===t[0]){var e=function(){var e=o(/^@([-\w]+)?keyframes\s*/);if(e){var t=e[1];if(!(e=o(/^([-\w]+)\s*/)))return n("@keyframes missing name");var r,s=e[1];if(!a())return n("@keyframes missing '{'");for(var i=l();r=m();)i.push(r),i=i.concat(l());return c()?{type:"keyframes",name:s,vendor:t,keyframes:i}:n("@keyframes missing '}'")}}()||function(){var e=o(/^@supports *([^{]+)/);if(e)return{type:"supports",supports:e[1].trim(),rules:y()}}()||function(){if(o(/^@host\s*/))return{type:"host",rules:y()}}()||function(){var e=o(/^@media *([^{]+)/);if(e)return{type:"media",media:e[1].trim(),rules:y()}}()||function(){var e=o(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(e)return{type:"custom-media",name:e[1].trim(),media:e[2].trim()}}()||function(){if(o(/^@page */))return{type:"page",selectors:f()||[],declarations:p()}}()||function(){var e=o(/^@([-\w]+)?document *([^{]+)/);if(e)return{type:"document",document:e[2].trim(),vendor:e[1]?e[1].trim():null,rules:y()}}()||function(){if(o(/^@font-face\s*/))return{type:"font-face",declarations:p()}}()||function(){var e=o(/^@(import|charset|namespace)\s*([^;]+);/);if(e)return{type:e[1],name:e[2].trim()}}();if(e&&!r.preserveStatic){var s=!1;if(e.declarations)s=e.declarations.some(function(e){return/var\(/.test(e.value)});else s=(e.keyframes||e.rules||[]).some(function(e){return(e.declarations||[]).some(function(e){return/var\(/.test(e.value)})});return s?e:{}}return e}}function h(){if(!r.preserveStatic){var e=s("{","}",t);if(e){var o=-1!==e.pre.indexOf(":root")&&/--\S*\s*:/.test(e.body),a=/var\(/.test(e.body);if(!o&&!a)return t=t.slice(e.end+1),{}}}var c=f()||[],i=r.preserveStatic?p():p().filter(function(e){var t=c.some(function(e){return-1!==e.indexOf(":root")})&&/^--\S/.test(e.property),r=/var\(/.test(e.value);return t||r});return c.length||n("selector missing"),{type:"rule",selectors:c,declarations:i}}function y(e){if(!e&&!a())return n("missing '{'");for(var r,o=l();t.length&&(e||"}"!==t[0])&&(r=v()||h());)r.type&&o.push(r),o=o.concat(l());return e||c()?o:n("missing '}'")}return{type:"stylesheet",stylesheet:{rules:y(!0),errors:[]}}}function l(t){var r=e({},{store:{},onWarning:function(){}},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{});return"string"==typeof t&&(t=u(t,r)),t.stylesheet.rules.forEach(function(e){"rule"===e.type&&1===e.selectors.length&&":root"===e.selectors[0]&&e.declarations.forEach(function(e,t){var n=e.property,o=e.value;n&&0===n.indexOf("--")&&(r.store[n]=o)})}),r.store}function f(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",r=arguments.length>2?arguments[2]:void 0,n={charset:function(e){return"@charset "+e.name+";"},comment:function(e){return 0===e.comment.indexOf("__CSSVARSPONYFILL")?"/*"+e.comment+"*/":""},"custom-media":function(e){return"@custom-media "+e.name+" "+e.media+";"},declaration:function(e){return e.property+":"+e.value+";"},document:function(e){return"@"+(e.vendor||"")+"document "+e.document+"{"+o(e.rules)+"}"},"font-face":function(e){return"@font-face{"+o(e.declarations)+"}"},host:function(e){return"@host{"+o(e.rules)+"}"},import:function(e){return"@import "+e.name+";"},keyframe:function(e){return e.values.join(",")+"{"+o(e.declarations)+"}"},keyframes:function(e){return"@"+(e.vendor||"")+"keyframes "+e.name+"{"+o(e.keyframes)+"}"},media:function(e){return"@media "+e.media+"{"+o(e.rules)+"}"},namespace:function(e){return"@namespace "+e.name+";"},page:function(e){return"@page "+(e.selectors.length?e.selectors.join(", "):"")+"{"+o(e.declarations)+"}"},rule:function(e){var t=e.declarations;if(t.length)return e.selectors.join(",")+"{"+o(t)+"}"},supports:function(e){return"@supports "+e.supports+"{"+o(e.rules)+"}"}};function o(e){for(var o="",s=0;s<e.length;s++){var a=e[s];r&&r(a);var c=n[a.type](a);c&&(o+=c,c.length&&a.selectors&&(o+=t))}return o}return o(e.stylesheet.rules)}a.range=i;var d="--",p="var";function m(t){var r=e({},{preserveStatic:!0,preserveVars:!1,variables:{},onWarning:function(){}},arguments.length>1&&void 0!==arguments[1]?arguments[1]:{});return"string"==typeof t&&(t=u(t,r)),function e(t,r){t.rules.forEach(function(n){n.rules?e(n,r):n.keyframes?n.keyframes.forEach(function(e){"keyframe"===e.type&&r(e.declarations,n)}):n.declarations&&r(n.declarations,t)})}(t.stylesheet,function(e,t){for(var n=0;n<e.length;n++){var o=e[n],s=o.type,a=o.property,c=o.value;if("declaration"===s)if(r.preserveVars||!a||0!==a.indexOf(d)){if(-1!==c.indexOf(p+"(")){var i=h(c,r);i!==o.value&&(i=v(i),r.preserveVars?(e.splice(n,0,{type:s,property:a,value:i}),n++):o.value=i)}}else e.splice(n,1),n--}}),f(t)}function v(e){return(e.match(/calc\(([^)]+)\)/g)||[]).forEach(function(t){var r="calc".concat(t.split("calc").join(""));e=e.replace(t,r)}),e}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0;if(-1===e.indexOf("var("))return e;var n=s("(",")",e);return n?"var"===n.pre.slice(-3)?0===n.body.trim().length?(t.onWarning("var() must contain a non-whitespace string"),e):n.pre.slice(0,-3)+function(e){var n=e.split(",")[0].replace(/[\s\n\t]/g,""),o=(e.match(/(?:\s*,\s*){1}(.*)?/)||[])[1],s=t.variables.hasOwnProperty(n)?String(t.variables[n]):void 0,a=s||(o?String(o):void 0),c=r||e;return s||t.onWarning('variable "'.concat(n,'" is undefined')),a&&"undefined"!==a&&a.length>0?h(a,t,c):"var(".concat(c,")")}(n.body)+h(n.post,t):n.pre+"(".concat(h(n.body,t),")")+h(n.post,t):(-1!==e.indexOf("var(")&&t.onWarning('missing closing ")" in the value "'.concat(e,'"')),e)}var y="undefined"!=typeof window,g=y&&window.CSS&&window.CSS.supports&&window.CSS.supports("(--a: 0)"),S={group:0,job:0},b={rootElement:y?document:null,shadowDOM:!1,include:"style,link[rel=stylesheet]",exclude:"",variables:{},onlyLegacy:!0,preserveStatic:!0,preserveVars:!1,silent:!1,updateDOM:!0,updateURLs:!0,watch:null,onBeforeSend:function(){},onWarning:function(){},onError:function(){},onSuccess:function(){},onComplete:function(){}},E={cssComments:/\/\*[\s\S]+?\*\//g,cssKeyframes:/@(?:-\w*-)?keyframes/,cssMediaQueries:/@media[^{]+\{([\s\S]+?})\s*}/g,cssRootRules:/(?::root\s*{\s*[^}]*})/g,cssUrls:/url\((?!['"]?(?:data|http|\/\/):)['"]?([^'")]*)['"]?\)/g,cssVarDecls:/(?:[\s;]*)(-{2}\w[\w-]*)(?:\s*:\s*)([^;]*);/g,cssVarFunc:/var\(\s*--[\w-]/,cssVars:/(?:(?::root\s*{\s*[^;]*;*\s*)|(?:var\(\s*))(--[^:)]+)(?:\s*[:)])/},w={dom:{},job:{},user:{}},O=!1,C=null,x=0,A=null,j=!1;function k(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o="cssVars(): ",s=e({},b,r);function a(e,t,r,n){!s.silent&&window.console&&console.error("".concat(o).concat(e,"\n"),t),s.onError(e,t,r,n)}function c(e){!s.silent&&window.console&&console.warn("".concat(o).concat(e)),s.onWarning(e)}if(y){if(s.watch)return s.watch=b.watch,function(e){function t(e){var t="LINK"===e.tagName&&-1!==(e.getAttribute("rel")||"").indexOf("stylesheet");return t&&!e.disabled}if(!window.MutationObserver)return;C&&(C.disconnect(),C=null);(C=new MutationObserver(function(r){var n=r.some(function(r){var n,o=!1;return"attributes"===r.type?o=t(r.target):"childList"===r.type&&(n=r.addedNodes,o=Array.apply(null,n).some(function(e){var r=1===e.nodeType,n=r&&e.hasAttribute("data-cssvars"),o=function(e){return"STYLE"===e.tagName&&!e.disabled}(e)&&E.cssVars.test(e.textContent),s=!n&&(t(e)||o);return s})||function(t){return Array.apply(null,t).some(function(t){var r=1===t.nodeType,n=r&&"out"===t.getAttribute("data-cssvars"),o=r&&"src"===t.getAttribute("data-cssvars"),s=o;if(o||n){var a=t.getAttribute("data-cssvars-group"),c=e.rootElement.querySelector('[data-cssvars-group="'.concat(a,'"]'));o&&(T(e.rootElement),w.dom={}),c&&c.parentNode.removeChild(c)}return s})}(r.removedNodes)),o});n&&k(e)})).observe(document.documentElement,{attributes:!0,attributeFilter:["disabled","href"],childList:!0,subtree:!0})}(s),void k(s);if(!1===s.watch&&C&&(C.disconnect(),C=null),!s.__benchmark){if(O===s.rootElement)return void function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;clearTimeout(A),A=setTimeout(function(){e.__benchmark=null,k(e)},t)}(r);if(s.__benchmark=_(),s.exclude=[C?'[data-cssvars]:not([data-cssvars=""])':'[data-cssvars="out"]',s.exclude].filter(function(e){return e}).join(","),s.variables=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=/^-{2}/;return Object.keys(e).reduce(function(r,n){var o=t.test(n)?n:"--".concat(n.replace(/^-+/,""));return r[o]=e[n],r},{})}(s.variables),!C)if(Array.apply(null,s.rootElement.querySelectorAll('[data-cssvars="out"]')).forEach(function(e){var t=e.getAttribute("data-cssvars-group");(t?s.rootElement.querySelector('[data-cssvars="src"][data-cssvars-group="'.concat(t,'"]')):null)||e.parentNode.removeChild(e)}),x){var i=s.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])');i.length<x&&(x=i.length,w.dom={})}}if("loading"!==document.readyState){var d=s.shadowDOM||s.rootElement.shadowRoot||s.rootElement.host;if(g&&s.onlyLegacy){if(s.updateDOM){var p=s.rootElement.host||(s.rootElement===document?document.documentElement:s.rootElement);Object.keys(s.variables).forEach(function(e){p.style.setProperty(e,s.variables[e])})}}else d&&!j?n({rootElement:b.rootElement,include:b.include,exclude:s.exclude,onSuccess:function(e,t,r){return(e=((e=e.replace(E.cssComments,"").replace(E.cssMediaQueries,"")).match(E.cssRootRules)||[]).join(""))||!1},onComplete:function(e,t,r){l(e,{store:w.dom,onWarning:c}),j=!0,k(s)}}):(O=s.rootElement,n({rootElement:s.rootElement,include:s.include,exclude:s.exclude,onBeforeSend:s.onBeforeSend,onError:function(e,t,r){var n=e.responseURL||M(r,location.href),o=e.statusText?"(".concat(e.statusText,")"):"Unspecified Error"+(0===e.status?" (possibly CORS related)":"");a("CSS XHR Error: ".concat(n," ").concat(e.status," ").concat(o),t,e,n)},onSuccess:function(e,t,r){var n=s.onSuccess(e,t,r);return e=void 0!==n&&!1===Boolean(n)?"":n||e,s.updateURLs&&(e=function(e,t){return(e.replace(E.cssComments,"").match(E.cssUrls)||[]).forEach(function(r){var n=r.replace(E.cssUrls,"$1"),o=M(n,t);e=e.replace(r,r.replace(n,o))}),e}(e,r)),e},onComplete:function(r,n){var o,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],d={},p=s.updateDOM?w.dom:Object.keys(w.job).length?w.job:w.job=JSON.parse(JSON.stringify(w.dom));if(i.forEach(function(e,t){if(E.cssVars.test(n[t]))try{var r=u(n[t],{preserveStatic:s.preserveStatic,removeComments:!0});l(r,{store:d,onWarning:c}),e.__cssVars={tree:r}}catch(t){a(t.message,e)}}),s.updateDOM&&e(w.user,s.variables),e(d,s.variables),o=Boolean((document.querySelector("[data-cssvars]")||Object.keys(w.dom).length)&&Object.keys(d).some(function(e){return d[e]!==p[e]})),e(p,w.user,d),o)T(s.rootElement),k(s);else{var v=[],h=[],y=!1;if(w.job={},s.updateDOM&&S.job++,i.forEach(function(t){var r=!t.__cssVars;if(t.__cssVars)try{m(t.__cssVars.tree,e({},s,{variables:p,onWarning:c}));var n=f(t.__cssVars.tree);if(s.updateDOM){if(t.getAttribute("data-cssvars")||t.setAttribute("data-cssvars","src"),n.length){var o=t.getAttribute("data-cssvars-group")||++S.group,i=n.replace(/\s/g,""),u=s.rootElement.querySelector('[data-cssvars="out"][data-cssvars-group="'.concat(o,'"]'))||document.createElement("style");y=y||E.cssKeyframes.test(n),u.hasAttribute("data-cssvars")||u.setAttribute("data-cssvars","out"),i===t.textContent.replace(/\s/g,"")?(r=!0,u&&u.parentNode&&(t.removeAttribute("data-cssvars-group"),u.parentNode.removeChild(u))):i!==u.textContent.replace(/\s/g,"")&&([t,u].forEach(function(e){e.setAttribute("data-cssvars-job",S.job),e.setAttribute("data-cssvars-group",o)}),u.textContent=n,v.push(n),h.push(u),u.parentNode||t.parentNode.insertBefore(u,t.nextSibling))}}else t.textContent.replace(/\s/g,"")!==n&&v.push(n)}catch(e){a(e.message,t)}r&&t.setAttribute("data-cssvars","skip"),t.hasAttribute("data-cssvars-job")||t.setAttribute("data-cssvars-job",S.job)}),x=s.rootElement.querySelectorAll('[data-cssvars]:not([data-cssvars="out"])').length,s.shadowDOM)for(var g,b=[s.rootElement].concat(t(s.rootElement.querySelectorAll("*"))),C=0;g=b[C];++C){if(g.shadowRoot&&g.shadowRoot.querySelector("style"))k(e({},s,{rootElement:g.shadowRoot,variables:w.dom}))}s.updateDOM&&y&&function(e){var t=["animation-name","-moz-animation-name","-webkit-animation-name"].filter(function(e){return getComputedStyle(document.body)[e]})[0];if(t){for(var r=e.getElementsByTagName("*"),n=[],o=0,s=r.length;o<s;o++){var a=r[o],c=getComputedStyle(a)[t];"none"!==c&&(a.style[t]+="__CSSVARSPONYFILL-KEYFRAMES__",n.push(a))}document.body.offsetHeight;for(var i=0,u=n.length;i<u;i++){var l=n[i].style;l[t]=l[t].replace("__CSSVARSPONYFILL-KEYFRAMES__","")}}}(s.rootElement),O=!1,s.onComplete(v.join(""),h,JSON.parse(JSON.stringify(p)),_()-s.__benchmark)}}}))}else document.addEventListener("DOMContentLoaded",function e(t){k(r),document.removeEventListener("DOMContentLoaded",e)})}}function M(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:location.href,r=document.implementation.createHTMLDocument(""),n=r.createElement("base"),o=r.createElement("a");return r.head.appendChild(n),r.body.appendChild(o),n.href=t,o.href=e,o.href}function _(){return y&&(window.performance||{}).now?window.performance.now():(new Date).getTime()}function T(e){Array.apply(null,e.querySelectorAll('[data-cssvars="skip"],[data-cssvars="src"]')).forEach(function(e){return e.setAttribute("data-cssvars","")})}return k.reset=function(){for(var e in O=!1,C&&(C.disconnect(),C=null),x=0,A=null,j=!1,w)w[e]={}},k});

/* https://github.com/iamdustan/smoothscroll | scroll-behaviour polyfill */
!function(){"use strict";function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset))},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){for(;o!==t.body&&!1===(e=p(l=o,"Y")&&a(l,"Y"),r=p(l,"X")&&a(l,"X"),e||r);)o=o.parentNode||o.host;var l,e,r;return o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function n(o,t){this.scrollLeft=o,this.scrollTop=t}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return"Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return"auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t))}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o()}();

/*! screenfull | v5.1.0 - 2020-12-24 | (c) Sindre Sorhus; MIT License */
!function(){"use strict";var c="undefined"!=typeof window&&void 0!==window.document?window.document:{},e="undefined"!=typeof module&&module.exports,s=function(){for(var e,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],l=0,r=n.length,t={};l<r;l++)if((e=n[l])&&e[1]in c){for(l=0;l<e.length;l++)t[n[0][l]]=e[l];return t}return!1}(),l={change:s.fullscreenchange,error:s.fullscreenerror},n={request:function(t,u){return new Promise(function(e,n){var l=function(){this.off("change",l),e()}.bind(this);this.on("change",l);var r=(t=t||c.documentElement)[s.requestFullscreen](u);r instanceof Promise&&r.then(l).catch(n)}.bind(this))},exit:function(){return new Promise(function(e,n){var l,r;this.isFullscreen?(l=function(){this.off("change",l),e()}.bind(this),this.on("change",l),(r=c[s.exitFullscreen]())instanceof Promise&&r.then(l).catch(n)):e()}.bind(this))},toggle:function(e,n){return this.isFullscreen?this.exit():this.request(e,n)},onchange:function(e){this.on("change",e)},onerror:function(e){this.on("error",e)},on:function(e,n){e=l[e];e&&c.addEventListener(e,n,!1)},off:function(e,n){e=l[e];e&&c.removeEventListener(e,n,!1)},raw:s};s?(Object.defineProperties(n,{isFullscreen:{get:function(){return Boolean(c[s.fullscreenElement])}},element:{enumerable:!0,get:function(){return c[s.fullscreenElement]}},isEnabled:{enumerable:!0,get:function(){return Boolean(c[s.fullscreenEnabled])}}}),e?module.exports=n:window.screenfull=n):e?module.exports={isEnabled:!1}:window.screenfull={isEnabled:!1}}();

// global variables for scorm and the runtime
var _sAPI=(parent&&parent!==self&&parent.ninjaApiProxy)?"API":"",_timeSessionStart=null,_timeout,_now,_unloaded=!1, icons = {{{json theme.ICONS}}}, glued = true;

function resume() {
	var data = getSuspendData();
	return (data.length&&data.substr(0,3)==="lz;"?LZString.decompressFromUTF16(data.substr(3)):data);
}

function suspend(data) {
	if (data.length>4090) data = "lz;" + LZString.compressToUTF16(data);
	setSuspendData(data);
}

// scorm 1.2 / 2004 common runtime / utils
function trylog(){try{console.log(arguments)}catch(e){}}
function learnerWillReturn(a){"API_1484_11"==_sAPI?a?scormSetValue("cmi.exit","suspend"):scormSetValue("cmi.exit","normal"):"API"==_sAPI&&(a?scormSetValue("cmi.core.exit","suspend"):scormSetValue("cmi.core.exit",""))}
function isFirstLaunch(){if("API_1484_11"==_sAPI)var a=scormGetValue("cmi.entry");else if("API"==_sAPI)a=scormGetValue("cmi.core.entry");else return!0;return"ab-initio"!=a?!1:!0}
function startSessionTime(){return _timeSessionStart=new Date}
function setSessionTime(a){var b=(new Date).getTime();a=Math.round((b-a)/1E3);a=formatTime(a);"API_1484_11"==_sAPI?scormSetValue("cmi.session_time",a):"API"==_sAPI&&scormSetValue("cmi.core.session_time",a)}
function getBookmark(){return"API_1484_11"==_sAPI?scormGetValue("cmi.location"):"API"==_sAPI?scormGetValue("cmi.core.lesson_location"):""}
function setBookmark(a){"API_1484_11"==_sAPI?scormSetValue("cmi.location",a+""):"API"==_sAPI&&scormSetValue("cmi.core.lesson_location",a+"");emitEvent('pageview',a);}
function getSuspendData(){return"API_1484_11"==_sAPI||"API"==_sAPI?scormGetValue("cmi.suspend_data"):""}
function setSuspendData(a){"API_1484_11"!=_sAPI&&"API"!=_sAPI||scormSetValue("cmi.suspend_data",a+"")}
function setCompletionStatus(a){if("API_1484_11"==_sAPI)scormSetValue("cmi.completion_status",a+"");else if("API"==_sAPI&&("completed"==a||"incomplete"==a||"not attempted"==a)){var b=scormGetValue("cmi.core.lesson_status");"passed"==b||"failed"==b?"incomplete"!=a&&"not attempted"!=a||scormSetValue("cmi.core.lesson_status",a+""):scormSetValue("cmi.core.lesson_status",a+"")}}
function getCompletionStatus(){if("API_1484_11"==_sAPI)return scormGetValue("cmi.completion_status");if("API"==_sAPI){var a=scormGetValue("cmi.core.lesson_status");return"passed"==a||"failed"==a?"completed":a}return"not attempted"}
function setPassFail(a){"API_1484_11"==_sAPI?scormSetValue("cmi.success_status",a+""):"API"==_sAPI&&scormSetValue("cmi.core.lesson_status",a+"")}
function setScore(a){if("API_1484_11"==_sAPI)scormSetValue("cmi.score.scaled",a+"");else if("API"==_sAPI){scormSetValue("cmi.core.score.min","0");scormSetValue("cmi.core.score.max","100");var b=100*a;100<b&&(b=100);0>a-0?scormSetValue("cmi.core.score.raw","0"):scormSetValue("cmi.core.score.raw",Math.round(b)+"")}}
function scormInitialize(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSInitialize(""):a.Initialize("");return a}
function scormTerminate(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSFinish(""):a.Terminate("");return a}
function scormCommit(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSCommit(""):a.Commit("");return a}
function scormGetValue(a){var b=getAPI();if(null==b)return"";if("API"==_sAPI)var c=b.LMSGetValue(a),b=b.LMSGetLastError();else c=b.GetValue(a),b=b.GetLastError();return"0"!=b?"":c}
function scormSetValue(a,b){var c=getAPI();if(null==c)return"true";c="API"==_sAPI?c.LMSSetValue(a,b):c.SetValue(a,b);return c}
function formatTime(a){var b=Math.floor(a/3600);a-=3600*b;var c=Math.floor(a/60);a-=60*c;return"API_1484_11"==_sAPI?"PT"+b+"H"+c+"M"+a+"S":"API"==_sAPI?(10>b&&(b="0"+b),10>c&&(c="0"+c),10>a&&(a="0"+a),b+":"+c+":"+a):""}
function findAPI(a,b){var c=0;try{for(;null==a[b]&&null!=a.parent&&a.parent!=a;){c++;if(7<c){trylog("findAPI gave up",a,b);return null};a=a.parent}}catch(d){trylog("findAPI forced to stop at domain boundary",a,b);return null}return a[b]}
function getAPI(){if(null!=apiHandle)return apiHandle;var a=findAPI(window,"API_1484_11");null==a&&null!=window.opener&&"undefined"!=typeof window.opener&&(a=findAPI(window.opener,"API_1484_11"));null==a?(a=findAPI(window,"API"),null==a&&null!=window.opener&&"undefined"!=typeof window.opener&&(a=findAPI(window.opener,"API")),null!=a&&(_sAPI="API")):_sAPI="API_1484_11";null==a&&alert("Unable to find an API adapter");return a};
function isJSON(b){try{var a=JSON.parse(b);if(a&&"object"===typeof a)return!0}catch(c){}return!1};
function findInJson(obj,prop,value){ for(var i=0,j=obj.length,k;i<j,k=obj[i];i++)if(value===k[prop])return k}
function emitEvent(name,data){var event=new CustomEvent(name,{detail:data});document.body.dispatchEvent(event);}
function setObjective(oId,sId,sCompletion,sPercentComplete,sPassFail,sScore,sDescription){if(oId==null)oId=scormGetValue("cmi.objectives._count");var cmiO="cmi.objectives."+oId+".";scormSetValue(cmiO+"id",sId);if(_sAPI=="API_1484_11"){scormSetValue(cmiO+"completion_status",sCompletion);if(sPercentComplete!=null)scormSetValue(cmiO+"progress_measure",sPercentComplete);if(sPassFail!=null)scormSetValue(cmiO+"success_status",sPassFail);if(sScore!=null)scormSetValue(cmiO+"score.scaled",sScore);if(sDescription!=null)scormSetValue(cmiO+"description",sDescription)}else if(_sAPI=="API"){if(sCompletion=="unknown")sCompletion="incomplete";scormSetValue(cmiO+"status",sCompletion);if(sPassFail=="passed"||sPassFail=="failed")scormSetValue(cmiO+"status",sPassFail);if(sScore!=null){scormSetValue(cmiO+"score.min","0");scormSetValue(cmiO+"score.max","100");scormSetValue(cmiO+"score.raw",Math.round(sScore*1E5)/1E3+"")}}};

function apiProxy() {
	this.cache = {};
	this.LMSInitialize = function() { return "true"; };
	this.LMSFinish = function () { return "true"; };
	this.LMSCommit = function (param) { return "true"; };
	this.LMSGetLastError = function () { return 0; };
	this.LMSGetErrorString = function () { return "No error"; };
	this.LMSGetDiagnostic = function (param) { return param; };
	this.LMSGetValue = function (param) { return (this.cache.hasOwnProperty(param)) ? this.cache[param] : ""; };
	this.LMSSetValue = function (param,value) {
		this.cache[param] = value;
		switch(param) {
			case "cmi.core.lesson_location": case "cmi.location":
				pages[course.page].score = value;
				break;
			case "cmi.completeion_status": case "cmi.core.lesson_status":
				if (value === "completed") pages[course.page].completed = true;
				break;
		}
		return "true";
	};
}
window.ninjaApiProxy = new apiProxy();

function whichAnimationEvent(){
  var t,
      el = document.createElement("fakeelement");

  var animations = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd"
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

var animationEvent = whichAnimationEvent();

// 0. iframe.over is what is currently shown to the user and is the opposite of the iframe firing this function
// 1. iframe.under has its onload and src set
// 2. iframe.under fires onload (this fn)
// 3. iframe.under has its onload removed (now neither iframe has an onload)
// 4. iframe.over is changed to iframe.under
// 5. iframe.under is changed to iframe.over
function iframe(under) {
	under.removeAttribute("onload"); // prevent retrigering
	var over = under.previousElementSibling ? under.previousElementSibling : under.nextElementSibling ? under.nextElementSibling : null;
	doOnce(over,animationEvent,reclassifyIframes); // triggered animation-end then removes event listener to prevent multiple binds over time
	over.className = "fadeOut"; // starts animation
}

function reclassifyIframes(el) {
	var other = el.target.previousElementSibling ? el.target.previousElementSibling : el.target.nextElementSibling ? el.target.nextElementSibling : null;
	other.className = "over"; // the element that was not faded becomes over, which cycles its z-index
	el.target.className = "under"; // the element that faded out becomes under for next time
	setTimeout(function(){el.target.removeAttribute('src')},99); // kill off the hidden frame to free up memory
	// you could autoplay audio here using `if (window._audio) window._audio.play();` but we no longer do that
}

// self unbinding event listener
function doOnce(element, eventType, callback) {
	element.addEventListener(eventType, function(e) {
		e.target.removeEventListener(e.type, arguments.callee);
		return callback(e);
	});
}

// find scorm API; getAPI() also sets _sAPI; apiHandle is the object reference
var apiHandle = (parent && parent !== self && parent.ninjaApiProxy) ? parent.ninjaApiProxy : getAPI();
var audioObj;
scormInitialize();

// clamping (constraining a number to a boundary)
Math.clip = function(n,i,x){return Math.max(i,Math.min(n,x));}

// public method called by body unload event(s)
function doUnload() {
    if (!_unloaded) {
        scormCommit();
        setSessionTime(_timeSessionStart);
        scormTerminate();
        _unloaded = true;
    }
}

// public method for navigating to the next-lowest page number
function left() {
	var i = course.page - 1;
	while (pages[i] && pages[i].content === 'plugin:section') i = i - 1;
    goto(i);
}

// public method for navigating to the next-highest page number
function right() {
	var i = course.page + 1;
	while (pages[i] && pages[i].content === 'plugin:section') i = i + 1;
    goto(i);
}

// adds or removes an "active" class on the body, usually to trigger css changes
function toggle(event) {
	document.body.classList.toggle("active");
}

// register keypresses to cause navigation
document.addEventListener("keydown", function keyListener(event) {
    switch (event.keyCode) {
        case 37: event.preventDefault(); left(); break;
        case 39: event.preventDefault(); right(); break;
    }
});

// left and right touch-drags cause navigation
(function(){
	var pageWidth = window.innerWidth || document.body.clientWidth,
		treshold = Math.max(1, Math.floor(0.01 * pageWidth)),
		start = {x:0,y:0},
		end = {x:0,y:0},
		limit = Math.tan(45 * 1.5 / 180 * Math.PI);

	function core(e) {
	    var x = end.x - start.x;
	    var y = end.y - start.y;
	    var xy = Math.abs(x / y);
	    var yx = Math.abs(y / x);
	    if ((Math.abs(x) > treshold || Math.abs(y) > treshold) && (yx <= limit)) {
	        if (x < 0) {
	          right();
	        } else {
	          left();
	        }
	    }
	}

	document.addEventListener('touchstart', function (event) {
	  start.x = event.changedTouches[0].screenX;
	  start.y = event.changedTouches[0].screenY;
	}, false);

	document.addEventListener('touchend', function (event) {
	  end.x = event.changedTouches[0].screenX;
	  end.y = event.changedTouches[0].screenY;
	  core(event);
	}, false);
})();

// toggle going into or coming out of full-screen
function fullscreen() {
	if (screenfull.isFullscreen) {
		Array.prototype.forEach.call(document.querySelectorAll(".ca-expand"), function(el) {
			el.classList.add("ca-expand");
			el.classList.remove("ca-reduce");
		});
		screenfull.exit();
	} else {
		Array.prototype.forEach.call(document.querySelectorAll(".ca-expand"), function(el) {
			el.classList.remove("ca-expand");
			el.classList.add("ca-reduce");
		});
		screenfull.request();
	}
}

// make sure css vars load in IE (cssvars ponyfill)
cssVars({
  include: 'link[rel=stylesheet]',
  onlyLegacy: true
});

// print the loaded iframe - the one with a src set (others have src attribute removed)
function printCurrentPage() {
	document.querySelector('.iframe iframe[src]').contentWindow.print();
	return false;
}

// initialise on page load
var _sections=[0];
document.addEventListener("DOMContentLoaded", function domLoader(event) {

	// ensure a shared instance audio player is created, even if it isn't used yet
	audioObj = document.getElementById('pageAudio');
	window._audio = new Plyr(audioObj, {
		iconUrl: 'plyr.svg',
		autoplay: false,
		keyboard: {global:false,focused:false},
		settings: ['speed','loop']
	});

	if (navigator.userAgent.toLowerCase().indexOf("mobile")!==-1) {
		document.body.classList.add("is-mobile");
		document.body.classList.add("active"); // start big
	} else {
		document.body.classList.remove("active"); // start small
	}

    var _suspend = "",
        _lastPage = +getBookmark() || 0; // convertnum ~ http://stackoverflow.com/a/7540412/1238884

    startSessionTime();
    setCompletionStatus("incomplete");
    learnerWillReturn(true);
    scormCommit();

    if (!isFirstLaunch()) {
    	var _suspend = resume();
    	if (_suspend !== null && isJSON(_suspend)) {
    		for (var d=JSON.parse(_suspend),n=0,l=d.length,r,p;n<l,r=d[n];n++) {
    			p = findInJson(pages,"index",r.i);
    			p._completed = (r.c===1); // need to set the underlying property, ensure its boolean
    			p["timeSpent"]=r.t; // number
    			p["userdata"]=r.u; // array
    		}
    	}
    }

    var menu = [], child = false, sections = [0], dest = document.getElementById('pages');
    while (dest.firstChild) dest.removeChild(dest.lastChild); // ensure emptiness

    for (var i=0;i<pages.length;i++) {
    	if (pages[i].content === 'plugin:section') {
    		_sections.push(i);
    	}
    }

    for (var s = 0; s<_sections.length; s++) {
    	var st = pages[_sections[s]], og, modifier = 0;
    	if (st.content === "plugin:section") {
			og = document.createElement("optgroup");
    		st = st.title;
	    	og.setAttribute("label", st);
	    	dest.appendChild(og);
			modifier = 1;
    	} else {
    		og = dest;
    	}

    	var len = _sections[s+1] || pages.length;

	    for (var i=_sections[s]+modifier;i<len;i++) {
	    	var p = pages[i],
	    		option = document.createElement('option');
	    	option.value = i;
	    	option.textContent = Array(p.depth+1).join("-- ") + p.title;
	    	og.appendChild(option);

	        // setting a completed property on this node should trigger a course completion check
			Object.defineProperty(p, "completed", { // setting this property should trigger course completion checking
				enumerable: true,
				get: function () {
					return this._completed || (this.content === 'plugin:section'); // sections are automatically completed, everything else default:false
				},
				set: function (bool) {
					this._completed = bool;
					if (this._throttle) clearTimeout(this._throttle);
					this._throttle = setTimeout(checkCourseCompletion,99,true);
					var opt = document.querySelector('#pages :checked');
					if (opt) opt.innerHTML = opt.textContent + " &check;";
				}
			});

		    // setting a status on this node might need to update other properties
			Object.defineProperty(p, "status", { // status can be {slide:n} or {seconds:n} or {seconds:n,duration:d} and should check the score
				enumerable: true,
				get: function () {
					return this._status || {};
				},
				set: function (data) {
					this._status = data;
					var myscore = 0;
					if (data.slide) {
						myscore = data.slide;
						this.timeSpent = data.slide;
					} else if (data.userdata) {

						this.userdata = data.userdata;
						myscore = data.score;
						this.score = data.required;
						this.timeSpent = 1;
					} else if (data.duration) {
						myscore = Math.round((data.seconds / data.duration) * 100);
						this.timeSpent = data.seconds;
					} else if (data.seconds) {
						myscore = data.seconds;
						this.timeSpent = data.seconds;
					}
					if (!this.completed) {
						if (myscore >= this.score) {
							this.completed = true;
						}
					}
					showCompletionGraph();
				}
			});
	    }
	}

	if (!screenfull.isEnabled) {
		Array.prototype.forEach.call(document.querySelectorAll("a[href='javascript:fullscreen()']"),function(el) {
			el.parentNode.removeChild(el);
		});
	}

    goto(Math.clip(_lastPage-1,0,Object.keys(pages).length),true); // lesson_location default is 1; we are zero based
    checkCourseCompletion();
});

// public method for navigating directly to a page by its index
function goto(n,init) {
	n = parseInt(n,10);
    if (n>=Object.keys(pages).length) return;
    if (n<0) return;
    if (n===course.page) return;
    if (_timeout) clearTimeout(_timeout);
    if (course.navlock && !init) {
        var msgs = [], current = pages[n].title, i = n-1;
        while (i>-1) {
            if (pages[i].score>0 && !pages[i].completed) {
                msgs.push(pages[i].title);
            }
            i--;
        }
        if (msgs.length > 0) {
            alert("Before you can load \"" + current + "\", you need to complete these pages:\n\n\u2022" + msgs.join("\n\u2022"));
            return;
        }
    }
    course.page=n;
    load();
}

// use an object url to download a resource
function download(e) {
	Array.prototype.forEach.call(document.querySelectorAll('a[data-done]'), function (el) { el.parentNode.removeChild(el) });
	fetch(e.target.dataset.fileName)
		.then(function(response) {
			return response.blob();
		})
		.then(function(blob) {
			var url = URL.createObjectURL(blob);
			var a = document.createElement('a');
			a.dataset.done = true;
			a.href = url;
			a.style = 'display:none';
			a.download = e.target.dataset.fileName.split('/').pop();
			document.body.appendChild(a);
			a.click();
		});

}

// load a page into the player; if the iframe implements a "setTimeSpent()" function, call that
function load() {
	// if (document.body.classList.contains("is-mobile")) {
	// 	document.body.classList.remove("active"); // hide menu on nav if mobile
	// }
	var current_page = pages[course.page];
	var src = current_page.href + "?" + [(current_page.timeSpent||-1),course.page].join(",");
	if (current_page.content && (current_page.content.indexOf("plugin") === 0 || current_page.content === "h5p")) {
		src = current_page.href + "?" + [escape(JSON.stringify(current_page.userdata) || []),course.page].join(",");
	}
    if (_timeout) clearTimeout(_timeout);
    _now = (new Date).getTime() / 1000;
    var ifr = document.querySelector("div.iframe>iframe.under");
	ifr.setAttribute("onload","iframe(this)");
	ifr.setAttribute("src", src);
	audioObj.pause(); // start in a paused state
	if (current_page.hasOwnProperty("audio")) {
		document.body.classList.add("has-audio");
		// pages.filter(function(v){return v.autonav}).length>0
		window._audio.source = {
			type:'audio',
			sources:[{type:'audio/mp3',src:'data/'+current_page["audio"]}]
		};
		window._audio.off('ended', right);
		if (current_page.autonav) {
			audioObj.setAttribute('autoplay',true);
			window._audio.play();
			window._audio.on('ended', right);
		}
	} else {
		audioObj.removeAttribute('autoplay');
		document.body.classList.remove("has-audio");
		window._audio.pause();
	}
	if (current_page.hasOwnProperty('attachments') && current_page.attachments.length) {
		document.body.classList.add('has-attachments');
		var attache = document.querySelector("main>.attache");
		if (!attache) {
			attache = document.createElement('div');
			attache.classList.add('attache');
			document.querySelector('main').appendChild(attache);
		}
		attache.innerHTML = '';
		current_page.attachments.forEach(function(value, index) {
			var a = document.createElement('a');
			a.addEventListener('click',download);
			a.setAttribute('href','#');
			if (value.hasOwnProperty("name")) value = value.name; // preview / build hack
			a.dataset.fileName = current_page.href.replace('.html','/'+value);
			a.textContent = value.replace(/\.[^/.]+$/, "");
			a.insertAdjacentHTML('afterBegin', "<span class='ca ca-attachment'></span>&nbsp;");
			attache.appendChild(a);
		});
	} else {
		document.body.classList.remove('has-attachments');
		var attache = document.querySelector("main>.attache");
		if (attache) attache.parentNode.removeChild(attache);
	}
	document.getElementById('pages').value = course.page;
    setBookmark(course.page +1); // stored as 1-based index, not 0-based
    showCurrentPageNumber();
    if (["media","plugin:quizbuilder","h5p","proxy"].indexOf(current_page.content)===-1) {
    	tick(current_page.timeSpent); // run timespent looper, initialised with existing time spent
    }
    checkCourseCompletion();
    checkNavigation();
}

function showCompletionGraph() {
	function amount(item) {
		return item.completed ? 1 : 0;
	}
	function sum(prev, next) {
		return prev + next;
	}
	var n,
		compl = pages.map(amount).reduce(sum),
		pc = Math.floor((compl / pages.length) * 100);

	n = document.getElementById("progressgraph");
	if (n) n.style.background = 'conic-gradient(currentColor ' + pc + "%, transparent 0)";

	n = document.getElementById("progressnumber");
	if (n) n.textContent = pc;
}


function showCurrentPageNumber() {
	var n = document.getElementById("pagenumber"),
		o = document.getElementById("pagetotal");
	if (n) n.value = course.page +1;
	if (o) o.value = pages.length;
}

// increment time spent on a page
function tick(ts) {
    if (_timeout) clearTimeout(_timeout);
    ts = +ts||0;
    tock(Math.round(((new Date).getTime() / 1000) - _now) + ts);
    _timeout = setTimeout(tick,1000,ts);
}

// record the time spent on the page
function tock(n) {
	pages[course.page].status = {seconds: n};
}

// aggregate page properties to check to see if a pass condition has occurred
function checkCourseCompletion() {
    var passed = 0,
        pagelength = Object.keys(pages).length,
        menu = document.getElementById("menu"),
    	setComplete = function() {
				if (!course.completed) {
					learnerWillReturn(false);
					if ("API_1484_11"==_sAPI) setPassFail("passed");
					setCompletionStatus("completed");
					setScore(course.score/100);
					scormCommit();
					course.completed = true;
				}
			};

	// check properties & persisted values, update icons
    for (i=0;i<pagelength;i++) {
        if (!('timeSpent' in pages[i])) pages[i].timeSpent = -1; // define property
        if (!('userdata' in pages[i])) pages[i].userdata = []; // define property
        if (pages[i].timeSpent > pages[i].score) pages[i]._completed = true;  // !! set underlying property value to avoid recursion
        if (pages[i].completed) {
            passed++;
            if (menu && pages[i].content !== "plugin:section") menu.querySelectorAll("li")[i].classList.add("completed");
        }
    }

	// check each section to see if all objects in a section are completed
    for (var s = 0; s<_sections.length; s++) {
    	var from = _sections[s] + (pages[_sections[s]].content === "plugin:section" ? 1 : 0),
			to = _sections[s+1] || pages.length,
			needed = to - from,
			done = 0;
		for (var i=from;i<to;i++) {
			done += (pages[i].completed ? 1 : 0);
		}
		// enough pages inside section to complete it - tick the section
		var page = pages[_sections[s]],
			objective_id = page.hasOwnProperty('objective') ? page.objective : ''+page.index;
		if (done === needed) {
			if (menu) menu.querySelectorAll("li")[_sections[s]].classList.add("completed");
			setObjective(s,objective_id,"completed",1,"passed",done,page.title);
		} else {
			setObjective(s,objective_id,"incomplete",(done/needed),"unknown",done,page.title);
		}
	}

    // if you are coming back (not first launch) and the course is already completed, don't change it
    if (!isFirstLaunch() && getCompletionStatus() == "completed") {
        course.completed = true; //  bypass setComplete (reset score)
    }

    if (course.rule === "last") {
        if (pages[pagelength-1].completed === true) setComplete();
    } else if (course.rule === "count") {
        if (passed >= course.required) setComplete();
    }
    course.score = Math.round((passed / pagelength) * 100);

	// always set score, even if not yet completed
    setScore(course.score/100);

    // persist and compress suspend data now
    for (var i=0,j=pages.length,_suspend=[];i<j;i++)
    	_suspend.push({
    		i:pages[i].index,
    		c:pages[i].completed?1:0,
    		t:pages[i].timeSpent,
    		u:pages[i].userdata
    	});
    suspend(JSON.stringify(_suspend));

}

function checkNavigation() {
	// var n = (course.page===Object.keys(pages).length-1), rb = document.querySelector('#rb'),
	// 	p = (0===course.page), lb = document.querySelector('#lb');
	// if (n && rb) { rb.setAttribute("disabled",true)}else if (rb) {rb.removeAttribute("disabled")}
	// if (p && lb) { lb.setAttribute("disabled",true)}else if (lb){lb.removeAttribute("disabled")}
}

// DEPRECIATED: sets the time spent on a page and checks to see if this causes a completion
// n = seconds [required], d = duration [optional]
function checkTimeSpent(n,d) {
    var p = pages[course.page];
    n=+n||0;d=+d||0; // CInt()
    p.timeSpent = n; // raw seconds
    if (d>0) { // duration set, convert to percentage
        n = Math.round((n/d)*100);
    }
    if (!p.completed) if (n >= p.score) { p.completed = true; checkCourseCompletion(); }
}

// child frames emit a statuschange custom event with the detail, rather than modifying the pages[n].status object since n might have drifted
window.addEventListener("statuschange", function (e) {
	if (e.detail.hasOwnProperty("index") && pages && pages[e.detail.index]) {
		pages[e.detail.index].status = e.detail;
	}
}, false);