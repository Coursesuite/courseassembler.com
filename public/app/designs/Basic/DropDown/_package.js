/* html5 shivs */
(function(g,b){function k(){var a=e.elements;return"string"==typeof a?a.split(" "):a}function l(a){var c={},f=a.createElement,b=a.createDocumentFragment,d=b();a.createElement=function(a){if(!e.shivMethods)return f(a);var b;b=c[a]?c[a].cloneNode():m.test(a)?(c[a]=f(a)).cloneNode():f(a);return b.canHaveChildren&&!n.test(a)?d.appendChild(b):b};a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+k().join().replace(/\w+/g,function(a){f(a);
d.createElement(a);return'c("'+a+'")'})+");return n}")(e,d)}function h(a){var c;if(a.documentShived)return a;if(e.shivCSS&&!i){c=a.createElement("p");var b=a.getElementsByTagName("head")[0]||a.documentElement;c.innerHTML="x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>";c=!!b.insertBefore(c.lastChild,b.firstChild)}j||(c=!l(a));if(c)a.documentShived=c;return a}var d=g.html5||{},n=/^<|^(?:button|form|map|select|textarea|object|iframe|option|optgroup)$/i,
m=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,i,j;(function(){var a=b.createElement("a");a.innerHTML="<xyz></xyz>";i="hidden"in a;if(!(a=1==a.childNodes.length))a:{try{b.createElement("a")}catch(c){a=!0;break a}a=b.createDocumentFragment();a="undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}j=
a})();var e={elements:d.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==d.shivCSS,shivMethods:!1!==d.shivMethods,type:"default",shivDocument:h};g.html5=e;h(b)})(this,document);

Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);Element.prototype.closest||(Element.prototype.closest=function(b){var a=this;if(!document.documentElement.contains(a))return null;do{if(a.matches(b))return a;a=a.parentElement}while(null!==a);return null});

/* SimpleBar.js - v2.5.1 | https://grsmto.github.io/simplebar/ | Under MIT License */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SimpleBar=e():t.SimpleBar=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=27)}([function(t,e,n){var r=n(23)("wks"),i=n(12),o=n(1).Symbol,s="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=s&&o[t]||(s?o:i)("Symbol."+t))}).store=r},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(5),i=n(11);t.exports=n(7)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(6),i=n(33),o=n(34),s=Object.defineProperty;e.f=n(7)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(10);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){t.exports=!n(16)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports={}},function(t,e,n){var r=n(23)("keys"),i=n(12);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(1),i=n(3),o=n(4),s=n(18),c=n(19),a=function(t,e,n){var u,l,f,h,d=t&a.F,p=t&a.G,v=t&a.S,b=t&a.P,y=t&a.B,m=p?r:v?r[e]||(r[e]={}):(r[e]||{}).prototype,g=p?i:i[e]||(i[e]={}),O=g.prototype||(g.prototype={});p&&(n=e);for(u in n)l=!d&&m&&void 0!==m[u],f=(l?m:n)[u],h=y&&l?c(f,r):b&&"function"==typeof f?c(Function.call,f):f,m&&s(m,u,f,t&a.U),g[u]!=f&&o(g,u,h),b&&O[u]!=f&&(O[u]=f)};r.core=i,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(10),i=n(1).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){var r=n(1),i=n(4),o=n(2),s=n(12)("src"),c=Function.toString,a=(""+c).split("toString");n(3).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,c){var u="function"==typeof n;u&&(o(n,"name")||i(n,"name",e)),t[e]!==n&&(u&&(o(n,s)||i(n,s,t[e]?""+t[e]:a.join(String(e)))),t===r?t[e]=n:c?t[e]?t[e]=n:i(t,e,n):(delete t[e],i(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[s]||c.call(this)})},function(t,e,n){var r=n(35);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,i){return t.call(e,n,r,i)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var r=n(41),i=n(9);t.exports=function(t){return r(i(t))}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(8),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,e,n){var r=n(1),i=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(5).f,i=n(2),o=n(0)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},function(t,e,n){var r=n(9);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n(28);var c=r(n(53)),a=r(n(54)),u=r(n(56));n(57),Object.assign=n(58);var l=function(){function t(e,n){i(this,t),this.el=e,this.flashTimeout,this.contentEl,this.scrollContentEl,this.dragOffset={x:0,y:0},this.isVisible={x:!0,y:!0},this.scrollOffsetAttr={x:"scrollLeft",y:"scrollTop"},this.sizeAttr={x:"offsetWidth",y:"offsetHeight"},this.scrollSizeAttr={x:"scrollWidth",y:"scrollHeight"},this.offsetAttr={x:"left",y:"top"},this.globalObserver,this.mutationObserver,this.resizeObserver,this.currentAxis,this.options=Object.assign({},t.defaultOptions,n),this.classNames=this.options.classNames,this.scrollbarWidth=(0,c.default)(),this.offsetSize=20,this.flashScrollbar=this.flashScrollbar.bind(this),this.onDragY=this.onDragY.bind(this),this.onDragX=this.onDragX.bind(this),this.onScrollY=this.onScrollY.bind(this),this.onScrollX=this.onScrollX.bind(this),this.drag=this.drag.bind(this),this.onEndDrag=this.onEndDrag.bind(this),this.onMouseEnter=this.onMouseEnter.bind(this),this.recalculate=(0,a.default)(this.recalculate,100,{leading:!0,trailing:!1}),this.init()}return s(t,[{key:"init",value:function(){this.el.SimpleBar=this,this.initDOM(),this.scrollbarX=this.trackX.querySelector(".".concat(this.classNames.scrollbar)),this.scrollbarY=this.trackY.querySelector(".".concat(this.classNames.scrollbar)),this.scrollContentEl.style.paddingRight="".concat(this.scrollbarWidth||this.offsetSize,"px"),this.scrollContentEl.style.marginBottom="-".concat(2*this.scrollbarWidth||this.offsetSize,"px"),this.contentEl.style.paddingBottom="".concat(this.scrollbarWidth||this.offsetSize,"px"),0!==this.scrollbarWidth&&(this.contentEl.style.marginRight="-".concat(this.scrollbarWidth,"px")),this.recalculate(),this.initListeners()}},{key:"initDOM",value:function(){var t=this;if(Array.from(this.el.children).filter(function(e){return e.classList.contains(t.classNames.scrollContent)}).length)this.trackX=this.el.querySelector(".".concat(this.classNames.track,".horizontal")),this.trackY=this.el.querySelector(".".concat(this.classNames.track,".vertical")),this.scrollContentEl=this.el.querySelector(".".concat(this.classNames.scrollContent)),this.contentEl=this.el.querySelector(".".concat(this.classNames.content));else{for(this.scrollContentEl=document.createElement("div"),this.contentEl=document.createElement("div"),this.scrollContentEl.classList.add(this.classNames.scrollContent),this.contentEl.classList.add(this.classNames.content);this.el.firstChild;)this.contentEl.appendChild(this.el.firstChild);this.scrollContentEl.appendChild(this.contentEl),this.el.appendChild(this.scrollContentEl)}if(!this.trackX||!this.trackY){var e=document.createElement("div"),n=document.createElement("div");e.classList.add(this.classNames.track),n.classList.add(this.classNames.scrollbar),e.appendChild(n),this.trackX=e.cloneNode(!0),this.trackX.classList.add("horizontal"),this.trackY=e.cloneNode(!0),this.trackY.classList.add("vertical"),this.el.insertBefore(this.trackX,this.el.firstChild),this.el.insertBefore(this.trackY,this.el.firstChild)}this.el.setAttribute("data-simplebar","init")}},{key:"initListeners",value:function(){var t=this;this.options.autoHide&&this.el.addEventListener("mouseenter",this.onMouseEnter),this.scrollbarY.addEventListener("mousedown",this.onDragY),this.scrollbarX.addEventListener("mousedown",this.onDragX),this.scrollContentEl.addEventListener("scroll",this.onScrollY),this.contentEl.addEventListener("scroll",this.onScrollX),"undefined"!=typeof MutationObserver&&(this.mutationObserver=new MutationObserver(function(e){e.forEach(function(e){(t.isChildNode(e.target)||e.addedNodes.length)&&t.recalculate()})}),this.mutationObserver.observe(this.el,{attributes:!0,childList:!0,characterData:!0,subtree:!0})),this.resizeObserver=new u.default(this.recalculate.bind(this)),this.resizeObserver.observe(this.el)}},{key:"removeListeners",value:function(){this.options.autoHide&&this.el.removeEventListener("mouseenter",this.onMouseEnter),this.scrollbarX.removeEventListener("mousedown",this.onDragX),this.scrollbarY.removeEventListener("mousedown",this.onDragY),this.scrollContentEl.removeEventListener("scroll",this.onScrollY),this.contentEl.removeEventListener("scroll",this.onScrollX),this.mutationObserver.disconnect(),this.resizeObserver.disconnect()}},{key:"onDragX",value:function(t){this.onDrag(t,"x")}},{key:"onDragY",value:function(t){this.onDrag(t,"y")}},{key:"onDrag",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"y";t.preventDefault();var n="y"===e?this.scrollbarY:this.scrollbarX,r="y"===e?t.pageY:t.pageX;this.dragOffset[e]=r-n.getBoundingClientRect()[this.offsetAttr[e]],this.currentAxis=e,document.addEventListener("mousemove",this.drag),document.addEventListener("mouseup",this.onEndDrag)}},{key:"drag",value:function(t){var e,n,r;t.preventDefault(),"y"===this.currentAxis?(e=t.pageY,n=this.trackY,r=this.scrollContentEl):(e=t.pageX,n=this.trackX,r=this.contentEl);var i=e-n.getBoundingClientRect()[this.offsetAttr[this.currentAxis]]-this.dragOffset[this.currentAxis],o=i/n[this.sizeAttr[this.currentAxis]],s=o*this.contentEl[this.scrollSizeAttr[this.currentAxis]];r[this.scrollOffsetAttr[this.currentAxis]]=s}},{key:"onEndDrag",value:function(){document.removeEventListener("mousemove",this.drag),document.removeEventListener("mouseup",this.onEndDrag)}},{key:"resizeScrollbar",value:function(){var t,e,n,r,i,o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"y";"x"===o?(t=this.trackX,e=this.scrollbarX,n=this.contentEl[this.scrollOffsetAttr[o]],r=this.contentSizeX,i=this.scrollbarXSize):(t=this.trackY,e=this.scrollbarY,n=this.scrollContentEl[this.scrollOffsetAttr[o]],r=this.contentSizeY,i=this.scrollbarYSize);var s=i/r,c=n/(r-i),a=Math.max(~~(s*(i-2))-2,this.options.scrollbarMinSize),u=~~((i-4-a)*c+2);this.isVisible[o]=i<r,this.isVisible[o]?(t.style.visibility="visible","x"===o?(e.style.left="".concat(u,"px"),e.style.width="".concat(a,"px")):(e.style.top="".concat(u,"px"),e.style.height="".concat(a,"px"))):t.style.visibility="hidden"}},{key:"onScrollX",value:function(){this.flashScrollbar("x")}},{key:"onScrollY",value:function(){this.flashScrollbar("y")}},{key:"onMouseEnter",value:function(){this.flashScrollbar("x"),this.flashScrollbar("y")}},{key:"flashScrollbar",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"y";this.resizeScrollbar(t),this.showScrollbar(t)}},{key:"showScrollbar",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"y";this.isVisible[t]&&("x"===t?this.scrollbarX.classList.add("visible"):this.scrollbarY.classList.add("visible"),this.options.autoHide&&("number"==typeof this.flashTimeout&&window.clearTimeout(this.flashTimeout),this.flashTimeout=window.setTimeout(this.hideScrollbar.bind(this),1e3)))}},{key:"hideScrollbar",value:function(){this.scrollbarX.classList.remove("visible"),this.scrollbarY.classList.remove("visible"),"number"==typeof this.flashTimeout&&window.clearTimeout(this.flashTimeout)}},{key:"recalculate",value:function(){this.contentSizeX=this.contentEl[this.scrollSizeAttr.x],this.contentSizeY=this.contentEl[this.scrollSizeAttr.y]-(this.scrollbarWidth||this.offsetSize),this.scrollbarXSize=this.trackX[this.sizeAttr.x],this.scrollbarYSize=this.trackY[this.sizeAttr.y],this.resizeScrollbar("x"),this.resizeScrollbar("y"),this.options.autoHide||(this.showScrollbar("x"),this.showScrollbar("y"))}},{key:"getScrollElement",value:function(){return this.scrollContentEl}},{key:"getContentElement",value:function(){return this.contentEl}},{key:"unMount",value:function(){this.removeListeners(),this.el.SimpleBar=null}},{key:"isChildNode",value:function(t){return null!==t&&(t===this.el||this.isChildNode(t.parentNode))}}],[{key:"initHtmlApi",value:function(){this.initDOMLoadedElements=this.initDOMLoadedElements.bind(this),"undefined"!=typeof MutationObserver&&(this.globalObserver=new MutationObserver(function(e){e.forEach(function(e){Array.from(e.addedNodes).forEach(function(e){1===e.nodeType&&(e.hasAttribute("data-simplebar")?!e.SimpleBar&&new t(e,t.getElOptions(e)):Array.from(e.querySelectorAll("[data-simplebar]")).forEach(function(e){!e.SimpleBar&&new t(e,t.getElOptions(e))}))}),Array.from(e.removedNodes).forEach(function(t){1===t.nodeType&&(t.hasAttribute("data-simplebar")?t.SimpleBar&&t.SimpleBar.unMount():Array.from(t.querySelectorAll("[data-simplebar]")).forEach(function(t){t.SimpleBar&&t.SimpleBar.unMount()}))})})}),this.globalObserver.observe(document,{childList:!0,subtree:!0})),"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?window.setTimeout(this.initDOMLoadedElements.bind(this)):(document.addEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.addEventListener("load",this.initDOMLoadedElements))}},{key:"getElOptions",value:function(e){return Object.keys(t.htmlAttributes).reduce(function(n,r){var i=t.htmlAttributes[r];return e.hasAttribute(i)&&(n[r]=JSON.parse(e.getAttribute(i)||!0)),n},{})}},{key:"removeObserver",value:function(){this.globalObserver.disconnect()}},{key:"initDOMLoadedElements",value:function(){document.removeEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.removeEventListener("load",this.initDOMLoadedElements),Array.from(document.querySelectorAll("[data-simplebar]")).forEach(function(e){e.SimpleBar||new t(e,t.getElOptions(e))})}},{key:"defaultOptions",get:function(){return{autoHide:!0,classNames:{content:"simplebar-content",scrollContent:"simplebar-scroll-content",scrollbar:"simplebar-scrollbar",track:"simplebar-track"},scrollbarMinSize:25}}},{key:"htmlAttributes",get:function(){return{autoHide:"data-simplebar-autohide",scrollbarMinSize:"data-simplebar-scrollbar-min-size"}}}]),t}();e.default=l,l.initHtmlApi()},function(t,e,n){n(29),n(46),t.exports=n(3).Array.from},function(t,e,n){"use strict";var r=n(30)(!0);n(31)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(8),i=n(9);t.exports=function(t){return function(e,n){var o,s,c=String(i(e)),a=r(n),u=c.length;return a<0||a>=u?t?"":void 0:(o=c.charCodeAt(a),o<55296||o>56319||a+1===u||(s=c.charCodeAt(a+1))<56320||s>57343?t?c.charAt(a):o:t?c.slice(a,a+2):s-56320+(o-55296<<10)+65536)}}},function(t,e,n){"use strict";var r=n(32),i=n(15),o=n(18),s=n(4),c=n(2),a=n(13),u=n(36),l=n(25),f=n(45),h=n(0)("iterator"),d=!([].keys&&"next"in[].keys()),p=function(){return this};t.exports=function(t,e,n,v,b,y,m){u(n,e,v);var g,O,E,_=function(t){if(!d&&t in A)return A[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},x=e+" Iterator",w="values"==b,S=!1,A=t.prototype,k=A[h]||A["@@iterator"]||b&&A[b],j=k||_(b),M=b?w?_("entries"):j:void 0,L="Array"==e?A.entries||k:k;if(L&&(E=f(L.call(new t)))!==Object.prototype&&E.next&&(l(E,x,!0),r||c(E,h)||s(E,h,p)),w&&k&&"values"!==k.name&&(S=!0,j=function(){return k.call(this)}),r&&!m||!d&&!S&&A[h]||s(A,h,j),a[e]=j,a[x]=p,b)if(g={values:w?j:_("values"),keys:y?j:_("keys"),entries:M},m)for(O in g)O in A||o(A,O,g[O]);else i(i.P+i.F*(d||S),e,g);return g}},function(t,e){t.exports=!1},function(t,e,n){t.exports=!n(7)&&!n(16)(function(){return 7!=Object.defineProperty(n(17)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(10);t.exports=function(t,e){if(!r(t))return t;var n,i;if(e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;if("function"==typeof(n=t.valueOf)&&!r(i=n.call(t)))return i;if(!e&&"function"==typeof(n=t.toString)&&!r(i=n.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){"use strict";var r=n(37),i=n(11),o=n(25),s={};n(4)(s,n(0)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(s,{next:i(1,n)}),o(t,e+" Iterator")}},function(t,e,n){var r=n(6),i=n(38),o=n(24),s=n(14)("IE_PROTO"),c=function(){},a=function(){var t,e=n(17)("iframe"),r=o.length;for(e.style.display="none",n(44).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;r--;)delete a.prototype[o[r]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(c.prototype=r(t),n=new c,c.prototype=null,n[s]=t):n=a(),void 0===e?n:i(n,e)}},function(t,e,n){var r=n(5),i=n(6),o=n(39);t.exports=n(7)?Object.defineProperties:function(t,e){i(t);for(var n,s=o(e),c=s.length,a=0;c>a;)r.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var r=n(40),i=n(24);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(2),i=n(20),o=n(42)(!1),s=n(14)("IE_PROTO");t.exports=function(t,e){var n,c=i(t),a=0,u=[];for(n in c)n!=s&&r(c,n)&&u.push(n);for(;e.length>a;)r(c,n=e[a++])&&(~o(u,n)||u.push(n));return u}},function(t,e,n){var r=n(21);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(20),i=n(22),o=n(43);t.exports=function(t){return function(e,n,s){var c,a=r(e),u=i(a.length),l=o(s,u);if(t&&n!=n){for(;u>l;)if((c=a[l++])!=c)return!0}else for(;u>l;l++)if((t||l in a)&&a[l]===n)return t||l||0;return!t&&-1}}},function(t,e,n){var r=n(8),i=Math.max,o=Math.min;t.exports=function(t,e){return t=r(t),t<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(1).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(2),i=n(26),o=n(14)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e,n){"use strict";var r=n(19),i=n(15),o=n(26),s=n(47),c=n(48),a=n(22),u=n(49),l=n(50);i(i.S+i.F*!n(52)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,i,f,h=o(t),d="function"==typeof this?this:Array,p=arguments.length,v=p>1?arguments[1]:void 0,b=void 0!==v,y=0,m=l(h);if(b&&(v=r(v,p>2?arguments[2]:void 0,2)),void 0==m||d==Array&&c(m))for(e=a(h.length),n=new d(e);e>y;y++)u(n,y,b?v(h[y],y):h[y]);else for(f=m.call(h),n=new d;!(i=f.next()).done;y++)u(n,y,b?s(f,v,[i.value,y],!0):i.value);return n.length=y,n}})},function(t,e,n){var r=n(6);t.exports=function(t,e,n,i){try{return i?e(r(n)[0],n[1]):e(n)}catch(e){var o=t.return;throw void 0!==o&&r(o.call(t)),e}}},function(t,e,n){var r=n(13),i=n(0)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||o[i]===t)}},function(t,e,n){"use strict";var r=n(5),i=n(11);t.exports=function(t,e,n){e in t?r.f(t,e,i(0,n)):t[e]=n}},function(t,e,n){var r=n(51),i=n(0)("iterator"),o=n(13);t.exports=n(3).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,e,n){var r=n(21),i=n(0)("toStringTag"),o="Arguments"==r(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),i))?n:o?r(e):"Object"==(c=r(e))&&"function"==typeof e.callee?"Arguments":c}},function(t,e,n){var r=n(0)("iterator"),i=!1;try{var o=[7][r]();o.return=function(){i=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!i)return!1;var n=!1;try{var o=[7],s=o[r]();s.next=function(){return{done:n=!0}},o[r]=function(){return s},t(o)}catch(t){}return n}},function(t,e,n){var r,i,o;/*! scrollbarWidth.js v0.1.3 | felixexter | MIT | https://github.com/felixexter/scrollbarWidth */
!function(n,s){i=[],r=s,void 0!==(o="function"==typeof r?r.apply(e,i):r)&&(t.exports=o)}(0,function(){"use strict";function t(){if("undefined"==typeof document)return 0;var t,e=document.body,n=document.createElement("div"),r=n.style;return r.position="absolute",r.top=r.left="-9999px",r.width=r.height="100px",r.overflow="scroll",e.appendChild(n),t=n.offsetWidth-n.clientWidth,e.removeChild(n),t}return t})},function(t,e,n){(function(e){function n(t,e,n){function i(e){var n=v,r=b;return v=b=void 0,w=e,m=t.apply(r,n)}function o(t){return w=t,g=setTimeout(l,e),S?i(t):m}function a(t){var n=t-x,r=t-w,i=e-n;return A?E(i,y-r):i}function u(t){var n=t-x,r=t-w;return void 0===x||n>=e||n<0||A&&r>=y}function l(){var t=_();if(u(t))return f(t);g=setTimeout(l,a(t))}function f(t){return g=void 0,k&&v?i(t):(v=b=void 0,m)}function h(){void 0!==g&&clearTimeout(g),w=0,v=x=b=g=void 0}function d(){return void 0===g?m:f(_())}function p(){var t=_(),n=u(t);if(v=arguments,b=this,x=t,n){if(void 0===g)return o(x);if(A)return g=setTimeout(l,e),i(x)}return void 0===g&&(g=setTimeout(l,e)),m}var v,b,y,m,g,x,w=0,S=!1,A=!1,k=!0;if("function"!=typeof t)throw new TypeError(c);return e=s(e)||0,r(n)&&(S=!!n.leading,A="maxWait"in n,y=A?O(s(n.maxWait)||0,e):y,k="trailing"in n?!!n.trailing:k),p.cancel=h,p.flush=d,p}function r(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function i(t){return!!t&&"object"==typeof t}function o(t){return"symbol"==typeof t||i(t)&&g.call(t)==u}function s(t){if("number"==typeof t)return t;if(o(t))return a;if(r(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=r(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(l,"");var n=h.test(t);return n||d.test(t)?p(t.slice(2),n?2:8):f.test(t)?a:+t}var c="Expected a function",a=NaN,u="[object Symbol]",l=/^\s+|\s+$/g,f=/^[-+]0x[0-9a-f]+$/i,h=/^0b[01]+$/i,d=/^0o[0-7]+$/i,p=parseInt,v="object"==typeof e&&e&&e.Object===Object&&e,b="object"==typeof self&&self&&self.Object===Object&&self,y=v||b||Function("return this")(),m=Object.prototype,g=m.toString,O=Math.max,E=Math.min,_=function(){return y.Date.now()};t.exports=n}).call(e,n(55))},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";function r(t){return parseFloat(t)||0}function i(t){return Array.prototype.slice.call(arguments,1).reduce(function(e,n){return e+r(t["border-"+n+"-width"])},0)}function o(t){for(var e=["top","right","bottom","left"],n={},i=0,o=e;i<o.length;i+=1){var s=o[i],c=t["padding-"+s];n[s]=r(c)}return n}function s(t){var e=t.getBBox();return f(0,0,e.width,e.height)}function c(t){var e=t.clientWidth,n=t.clientHeight;if(!e&&!n)return _;var s=getComputedStyle(t),c=o(s),u=c.left+c.right,l=c.top+c.bottom,h=r(s.width),d=r(s.height);if("border-box"===s.boxSizing&&(Math.round(h+u)!==e&&(h-=i(s,"left","right")+u),Math.round(d+l)!==n&&(d-=i(s,"top","bottom")+l)),!a(t)){var p=Math.round(h+u)-e,v=Math.round(d+l)-n;1!==Math.abs(p)&&(h-=p),1!==Math.abs(v)&&(d-=v)}return f(c.left,c.top,h,d)}function a(t){return t===document.documentElement}function u(t){return d?x(t)?s(t):c(t):_}function l(t){var e=t.x,n=t.y,r=t.width,i=t.height,o="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,s=Object.create(o.prototype);return E(s,{x:e,y:n,width:r,height:i,top:n,right:e+r,bottom:i+n,left:e}),s}function f(t,e,n,r){return{x:t,y:e,width:n,height:r}}Object.defineProperty(e,"__esModule",{value:!0});var h=function(){function t(t,e){var n=-1;return t.some(function(t,r){return t[0]===e&&(n=r,!0)}),n}return"undefined"!=typeof Map?Map:function(){function e(){this.__entries__=[]}var n={size:{}};return n.size.get=function(){return this.__entries__.length},e.prototype.get=function(e){var n=t(this.__entries__,e),r=this.__entries__[n];return r&&r[1]},e.prototype.set=function(e,n){var r=t(this.__entries__,e);~r?this.__entries__[r][1]=n:this.__entries__.push([e,n])},e.prototype.delete=function(e){var n=this.__entries__,r=t(n,e);~r&&n.splice(r,1)},e.prototype.has=function(e){return!!~t(this.__entries__,e)},e.prototype.clear=function(){this.__entries__.splice(0)},e.prototype.forEach=function(t,e){void 0===e&&(e=null);for(var n=0,r=this.__entries__;n<r.length;n+=1){var i=r[n];t.call(e,i[1],i[0])}},Object.defineProperties(e.prototype,n),e}()}(),d="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,p=function(){return"function"==typeof requestAnimationFrame?requestAnimationFrame:function(t){return setTimeout(function(){return t(Date.now())},1e3/60)}}(),v=2,b=function(t,e){function n(){o&&(o=!1,t()),s&&i()}function r(){p(n)}function i(){var t=Date.now();if(o){if(t-c<v)return;s=!0}else o=!0,s=!1,setTimeout(r,e);c=t}var o=!1,s=!1,c=0;return i},y=["top","right","bottom","left","width","height","size","weight"],m="undefined"!=typeof navigator&&/Trident\/.*rv:11/.test(navigator.userAgent),g="undefined"!=typeof MutationObserver&&!m,O=function(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=b(this.refresh.bind(this),20)};O.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},O.prototype.removeObserver=function(t){var e=this.observers_,n=e.indexOf(t);~n&&e.splice(n,1),!e.length&&this.connected_&&this.disconnect_()},O.prototype.refresh=function(){this.updateObservers_()&&this.refresh()},O.prototype.updateObservers_=function(){var t=this.observers_.filter(function(t){return t.gatherActive(),t.hasActive()});return t.forEach(function(t){return t.broadcastActive()}),t.length>0},O.prototype.connect_=function(){d&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),g?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},O.prototype.disconnect_=function(){d&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},O.prototype.onTransitionEnd_=function(t){var e=t.propertyName;y.some(function(t){return!!~e.indexOf(t)})&&this.refresh()},O.getInstance=function(){return this.instance_||(this.instance_=new O),this.instance_},O.instance_=null;var E=function(t,e){for(var n=0,r=Object.keys(e);n<r.length;n+=1){var i=r[n];Object.defineProperty(t,i,{value:e[i],enumerable:!1,writable:!1,configurable:!0})}return t},_=f(0,0,0,0),x=function(){return"undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof SVGGraphicsElement}:function(t){return t instanceof SVGElement&&"function"==typeof t.getBBox}}(),w=function(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=f(0,0,0,0),this.target=t};w.prototype.isActive=function(){var t=u(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},w.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t};var S=function(t,e){var n=l(e);E(this,{target:t,contentRect:n})},A=function(t,e,n){if("function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.activeObservations_=[],this.observations_=new h,this.callback_=t,this.controller_=e,this.callbackCtx_=n};A.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)||(e.set(t,new w(t)),this.controller_.addObserver(this),this.controller_.refresh())}},A.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Element))throw new TypeError('parameter 1 is not of type "Element".');var e=this.observations_;e.has(t)&&(e.delete(t),e.size||this.controller_.removeObserver(this))}},A.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},A.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(e){e.isActive()&&t.activeObservations_.push(e)})},A.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,e=this.activeObservations_.map(function(t){return new S(t.target,t.broadcastRect())});this.callback_.call(t,e,t),this.clearActive()}},A.prototype.clearActive=function(){this.activeObservations_.splice(0)},A.prototype.hasActive=function(){return this.activeObservations_.length>0};var k="undefined"!=typeof WeakMap?new WeakMap:new h,j=function(t){if(!(this instanceof j))throw new TypeError("Cannot call a class as a function");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var e=O.getInstance(),n=new A(t,e,this);k.set(this,n)};["observe","unobserve","disconnect"].forEach(function(t){j.prototype[t]=function(){return(e=k.get(this))[t].apply(e,arguments);var e}});var M=function(){return"undefined"!=typeof ResizeObserver?ResizeObserver:j}();e.default=M},function(t,e){},function(t,e,n){"use strict";function r(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}

/* object-assign | (c) Sindre Sorhus | @license MIT */
var i=Object.getOwnPropertySymbols,o=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var r={};return"abcdefghijklmnopqrst".split("").forEach(function(t){r[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},r)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var n,c,a=r(t),u=1;u<arguments.length;u++){n=Object(arguments[u]);for(var l in n)o.call(n,l)&&(a[l]=n[l]);if(i){c=i(n);for(var f=0;f<c.length;f++)s.call(n,c[f])&&(a[c[f]]=n[c[f]])}}return a}}]).default});

/*! https://github.com/pieroxy/lz-string | wtfpl licence */
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

// global variables for scorm and the runtime
var _bDebug=!1,_sAPI=(parent&&parent!==self&&parent.ninjaApiProxy)?"API":"",apiHandle=(parent&&parent!==self&&parent.ninjaApiProxy)?parent.ninjaApiProxy:null,_timeSessionStart=null, _timeout, _now, _unloaded = false;

// scorm handlers for scorm 2004 and scorm 1.2
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
function scormInitialize(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSInitialize(""):a.Initialize("");apiDebug("called Initialize, return="+a);return a}
function scormTerminate(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSFinish(""):a.Terminate("");apiDebug("called Finish/Terminate, return="+a);return a}
function scormCommit(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSCommit(""):a.Commit("");apiDebug("called Commit, return="+a);return a}
function scormGetValue(a){var b=getAPI();if(null==b)return"";if("API"==_sAPI)var c=b.LMSGetValue(a),b=b.LMSGetLastError();else c=b.GetValue(a),b=b.GetLastError();apiDebug("called GetValue:"+a+", return="+c+" error code="+b);return"0"!=b?"":c}
function scormSetValue(a,b){var c=getAPI();if(null==c)return"true";c="API"==_sAPI?c.LMSSetValue(a,b):c.SetValue(a,b);apiDebug("called SetValue:"+a+", value="+b+" return ="+c);return c}
function formatTime(a){var b=Math.floor(a/3600);a-=3600*b;var c=Math.floor(a/60);a-=60*c;return"API_1484_11"==_sAPI?"PT"+b+"H"+c+"M"+a+"S":"API"==_sAPI?(10>b&&(b="0"+b),10>c&&(c="0"+c),10>a&&(a="0"+a),b+":"+c+":"+a):""}
function findAPI(a,b){for(;null==a[b]&&null!=a.parent&&a.parent!=a;)a=a.parent;apiHandle=a[b]}
function getAPI(){if(null!=apiHandle)return apiHandle;findAPI(window,"API_1484_11");null==apiHandle&&null!=window.opener&&findAPI(window.opener,"API_1484_11");null==apiHandle?(findAPI(window,"API"),null==apiHandle&&null!=window.opener&&findAPI(window.opener,"API"),null!=apiHandle&&(_sAPI="API")):_sAPI="API_1484_11";return apiHandle}
function apiDebug(a){if(_bDebug){if(!_wDebug||_wDebug.closed)_wDebug=open("","debugwindow","width=800,height=700,scrollbars=yes,resizable=yes"),_wDebug.document.write("<html><head><title>Debug window</title></head><body>");_wDebug.document.write(a+"<br>")}};
function isJSON(b){try{var a=JSON.parse(b);if(a&&"object"===typeof a)return!0}catch(c){}return!1};
function findInJson(obj,prop,value){ for(var i=0,j=obj.length,k;i<j,k=obj[i];i++)if(value===k[prop])return k}
function emitEvent(name,data){var event=new CustomEvent(name,{detail:data});document.body.dispatchEvent(event);}

// create a proxy for sub-runtimes bound to pages
function apiProxy() {
	this.LMSInitialize = function() { return "true"; };
	this.LMSFinish = function () { return "true"; };
	this.LMSCommit = function (param) { return "true"; };
	this.LMSGetLastError = function () { return 0; };
	this.LMSGetErrorString = function () { return "No error"; };
	this.LMSGetDiagnostic = function (param) { return param; };
	this.LMSGetValue = function (param) { switch(param){default: return "";}; };
	this.LMSSetValue = function (param,value) { switch(param){default: return "true";}; };
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
	el.target.removeAttribute('src');
}

function doOnce(element, eventType, callback) {
  element.addEventListener(eventType, function(e) {
    e.target.removeEventListener(e.type, arguments.callee);
    return callback(e);
  });
}

// find scorm API
getAPI();
scormInitialize();

// clamp
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

function repositionDrawer() {

	var f = document.querySelector("body>main>div.iframe").getBoundingClientRect(),
		menu = document.querySelector("body>main>nav>.menu").getBoundingClientRect(),
		w = menu.width + document.getElementById("pageTitle").getBoundingClientRect().width,
		drawer = document.querySelector("body>aside");

	// move drawer into position
	drawer.style.top = (f.top + 4) + 'px';
	drawer.style.left = menu.left + 'px';
	drawer.style.width =  w + 'px';
	drawer.style.height = 'calc(100vh - ' + (menu.height + 8) + 'px';

}

function toggle() {
	if (document.body.classList.toggle("active")) {
		repositionDrawer();
	}
}

document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37: left(); break;
        case 39: right(); break;
    }
});

document.addEventListener("DOMContentLoaded", function(event) {

    var _suspend = "",
        _lastPage = +getBookmark() || 0; // convertnum ~ http://stackoverflow.com/a/7540412/1238884

    startSessionTime();
    setCompletionStatus("incomplete");
    learnerWillReturn(true);
    scormCommit();

    if (!isFirstLaunch()) {
    	var _suspend = LZString.decompressFromUTF16(getSuspendData());
    	if (_suspend !== null && isJSON(_suspend)) {
    		for (var d=JSON.parse(_suspend),n=0,l=d.length,r,p;n<l,r=d[n];n++) { p=findInJson(pages,"index",r.i); p["completed"]=r.c; p["timeSpent"]=r.t; p["userdata"]=r.u; }
    	}
    }

    function li(i,title,expandable) {
	var html = [];
	var liClass = (expandable == true) ? "parent":"";
	html.push('<li class="' + liClass + '">');
	html.push('<div>');
	html.push('<a href="javascript:goto(' + i + ')">' + title + '</a>');
	html.push('<span><i class="dn-incomplete"></i></span>');
	html.push('</div>');
	if (expandable == true) {
		html.push("<ol>");
	} else {
		html.push("</li>");
	}
	return html.join("");
    }

    // nested list with icons
    var menu = [];
    for (var i=0;i<pages.length;i++) {
      var p = pages[i],
          q = pages[i+1],
          r = true;
      if (q) {
        if (q.depth > p.depth) {
          menu.push(li(i,p.title,true));
          r = false;
        } else if (q.depth < p.depth) {
          menu.push(li(i,p.title,false));
          for (j=0;j<p.depth;j++) menu.push("</li></ol>");
          r = false;
        }
      }
      if (r) {
        menu.push(li(i,p.title,false));
      }
	  Object.defineProperty(p, "completed", { // setting this property should trigger course completion checking
	  	enumerable: true,
	  	get: function () {
	  		return this._completed || false;
	  	},
	  	set: function (bool) {
	  		this._completed = bool;
	  		if (this._throttle) clearTimeout(this._throttle);
	  		this._throttle = setTimeout(checkCourseCompletion,99,true);
	  	}
	  });
      Object.defineProperty(p, "status", { // status can be {slide:n} or {seconds:n} or {seconds:n,duration:d} or {plugin:o} and should check the score
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
	    }
	  });
    }

    document.body.insertAdjacentHTML('beforeend', document.getElementById("popup").innerHTML);
    document.getElementById("menu").innerHTML = menu.join("");
    repositionDrawer();

    goto(Math.clip(_lastPage-1,0,Object.keys(pages).length),true); // lesson_location default is 1; we are zero based
    checkCourseCompletion();

});

// public method for navigating to the next-lowest page number
function left() {
    goto(course.page-1);
}

// public method for navigating to the next-highest page number
function right() {
    goto(course.page+1);
}

// public method for navigating directly to a page by its index
function goto(n,init) {
    if (n>=Object.keys(pages).length) return;
    if (n<0) return;
    if (n===course.page) return;
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

// load a page into the player; if the iframe implements a "setTimeSpent()" function, call that
function load() {
	var current_page = pages[course.page];
	var src = current_page.href + "?" + [(current_page.timeSpent||-1),course.page].join(",");
	if (current_page.content === "plugin") {
		src = current_page.href + "?" + [escape(current_page.userdata || []),course.page].join(",");
	}
    if (_timeout) clearTimeout(_timeout);
    _now = (new Date).getTime() / 1000;
    var ifr = document.querySelector("div.iframe>iframe.under");
    ifr.setAttribute("onload","iframe(this)");
    ifr.setAttribute("src", src);
    // document.getElementById("content").setAttribute("src", src);
    [].forEach.call(document.querySelectorAll("#scroll li"), function (el,index) {
    	el.classList.remove("selected","open");
    	if (index===course.page) el.classList.add("selected");
    });
    var li = document.querySelector("#scroll li.selected"),
    	pli = li.parentNode.closest("li"),
    	hide = true;
    if (pli) pli.classList.add("open");
    if (li.querySelector("ol")) {
    	li.classList.add("open");
    	hide = false;
    }
    document.getElementById("pageTitle").textContent = pages[course.page].title;
    setBookmark(course.page +1); // stored as 1-based index, not 0-based
    if (["media","plugin"].indexOf(current_page.content)===-1) tick(); // run timespent looper
    if (hide) document.body.classList.remove("active");
    checkCourseCompletion();
    checkNavigation();
}

// increment time spent on a page
function tick() {
    if (_timeout) clearTimeout(_timeout);
    tock(Math.round(((new Date).getTime() / 1000) - _now));
    _timeout = setTimeout(tick,1000);
}

// sets the time spent on a page and checks to see if this causes a completion
function tock(n) {
	pages[course.page].status = {seconds: n};
}

// aggregate page properties to check to see if a pass condition has occurred
function checkCourseCompletion() {
    var passed = 0,
        pagelength = Object.keys(pages).length,
        menu = document.getElementById("scroll");
    function setComplete() {
        if (!course.completed) {
            learnerWillReturn(false);
            if ("API_1484_11"==_sAPI) setPassFail("passed");
            setCompletionStatus("completed");
            setScore(course.score/100);
            scormCommit();
            course.completed = true;
        }
    }
    for (i=0;i<pagelength;i++) {
        if (!('timeSpent' in pages[i])) pages[i].timeSpent = -1; // define property
        if (!('userdata' in pages[i])) pages[i].userdata = []; // define property
        if (pages[i].timeSpent > pages[i].score) pages[i]._completed = true;  // !! set underlying property value to avoid recursion
        if (pages[i].completed) {
            passed++;
            menu.querySelectorAll("li")[i].classList.add("completed");
        }
    }

    // if you are coming back (not first launch) and the course is already completed, don't change it
    if (!isFirstLaunch() && getCompletionStatus() == "completed") {
        course.completed = true; //  bypass setComplete (reset score)
    }

    if (course.rule == "last") {
        if (pages[pagelength-1].completed == true) setComplete();
    } else if (course.rule == "count") {
        if (passed >= course.required) setComplete();
    }
    course.score = Math.round((passed / pagelength) * 100);

	// always set score, even if not yet completed
    setScore(course.score/100);

    // persist and compress suspend data now
    for (var i=0,j=pages.length,_suspend=[];i<j;i++) _suspend.push({i:pages[i].index,c:pages[i].completed?1:0,t:pages[i].timeSpent,u:pages[i].userdata});
    setSuspendData(LZString.compressToUTF16(JSON.stringify(_suspend)));
}

function checkNavigation() {
	var n = (course.page===Object.keys(pages).length-1), rb = document.querySelector('#rb'),
		p = (0===course.page), lb = document.querySelector('#lb');
	if (n) { rb.setAttribute("disabled",true)}else{rb.removeAttribute("disabled")}
	if (p) { lb.setAttribute("disabled",true)}else{lb.removeAttribute("disabled")}
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
	if (e.detail.index && pages && pages[e.detail.index]) {
		pages[e.detail.index].status = e.detail;
	}
}, false);