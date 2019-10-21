function createElement(a){var b;if(a.tagName){var c=document.createElement(a.tagName);a.className&&(c.className=a.className);if(a.attributes)for(b in a.attributes)c.setAttribute(b,a.attributes[b]);void 0!==a.html&&(c.innerHTML=a.html)}else c=document.createDocumentFragment();a.text&&c.appendChild(document.createTextNode(a.text));void 0===window.HTMLElement&&(window.HTMLElement=Element);if(a.childs&&a.childs.length)for(b=0;b<a.childs.length;b++)c.appendChild(a.childs[b]instanceof window.HTMLElement?
a.childs[b]:createElement(a.childs[b]));return c};

/*! Sortable 1.7.0 - MIT | git://github.com/rubaxa/Sortable.git */
!function(t){"use strict";"function"==typeof define&&define.amd?define(t):"undefined"!=typeof module&&void 0!==module.exports?module.exports=t():window.Sortable=t()}(function(){"use strict";if("undefined"==typeof window||!window.document)return function(){throw new Error("Sortable.js requires a window with a document")};var t,e,n,o,i,r,a,l,s,c,d,h,u,f,p,g,v,m,_,b,D,y={},w=/\s+/g,T=/left|right|inline/,S="Sortable"+(new Date).getTime(),C=window,E=C.document,x=C.parseInt,k=C.setTimeout,N=C.jQuery||C.Zepto,B=C.Polymer,P=!1,Y="draggable"in E.createElement("div"),X=!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)&&((D=E.createElement("x")).style.cssText="pointer-events:auto","auto"===D.style.pointerEvents),O=!1,I=Math.abs,M=Math.min,A=[],R=[],L=function(){return!1},F=ot(function(t,e,n){if(n&&e.scroll){var o,i,r,a,d,h,u=n[S],f=e.scrollSensitivity,p=e.scrollSpeed,g=t.clientX,v=t.clientY,m=window.innerWidth,b=window.innerHeight;if(s!==n&&(l=e.scroll,s=n,c=e.scrollFn,!0===l)){l=n;do{if(l.offsetWidth<l.scrollWidth||l.offsetHeight<l.scrollHeight)break}while(l=l.parentNode)}l&&(o=l,i=l.getBoundingClientRect(),r=(I(i.right-g)<=f)-(I(i.left-g)<=f),a=(I(i.bottom-v)<=f)-(I(i.top-v)<=f)),r||a||(a=(b-v<=f)-(v<=f),((r=(m-g<=f)-(g<=f))||a)&&(o=C)),y.vx===r&&y.vy===a&&y.el===o||(y.el=o,y.vx=r,y.vy=a,clearInterval(y.pid),o&&(y.pid=setInterval(function(){h=a?a*p:0,d=r?r*p:0,"function"==typeof c&&"continue"!==c.call(u,d,h,t,_,o)||(o===C?C.scrollTo(C.pageXOffset+d,C.pageYOffset+h):(o.scrollTop+=h,o.scrollLeft+=d))},24)))}},30),H=function(t){function e(t,e){return null!=t&&!0!==t||null!=(t=n.name)?"function"==typeof t?t:function(n,o){var i=o.options.group.name;return e?t:t&&(t.join?t.indexOf(i)>-1:i==t)}:L}var n={},o=t.group;o&&"object"==typeof o||(o={name:o}),n.name=o.name,n.checkPull=e(o.pull,!0),n.checkPut=e(o.put),n.revertClone=o.revertClone,t.group=n};try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){P={capture:!1,passive:!1}}}))}catch(t){}function W(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, and not "+{}.toString.call(t);this.el=t,this.options=e=it({},e),t[S]=this;var n={group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,draggable:/[uo]l/i.test(t.nodeName)?"li":">*",ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==W.supportPointer};for(var o in n)!(o in e)&&(e[o]=n[o]);H(e);for(var i in this)"_"===i.charAt(0)&&"function"==typeof this[i]&&(this[i]=this[i].bind(this));this.nativeDraggable=!e.forceFallback&&Y,V(t,"mousedown",this._onTapStart),V(t,"touchstart",this._onTapStart),e.supportPointer&&V(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(V(t,"dragover",this),V(t,"dragenter",this)),R.push(this._onDragOver),e.store&&this.sort(e.store.get(this))}function j(e,n){"clone"!==e.lastPullMode&&(n=!0),o&&o.state!==n&&(G(o,"display",n?"none":""),n||o.state&&(e.options.group.revertClone?(i.insertBefore(o,r),e._animate(t,o)):i.insertBefore(o,t)),o.state=n)}function U(t,e,n){if(t){n=n||E;do{if(">*"===e&&t.parentNode===n||nt(t,e))return t}while(void 0,t=(i=(o=t).host)&&i.nodeType?i:o.parentNode)}var o,i;return null}function V(t,e,n){t.addEventListener(e,n,P)}function q(t,e,n){t.removeEventListener(e,n,P)}function z(t,e,n){if(t)if(t.classList)t.classList[n?"add":"remove"](e);else{var o=(" "+t.className+" ").replace(w," ").replace(" "+e+" "," ");t.className=(o+(n?" "+e:"")).replace(w," ")}}function G(t,e,n){var o=t&&t.style;if(o){if(void 0===n)return E.defaultView&&E.defaultView.getComputedStyle?n=E.defaultView.getComputedStyle(t,""):t.currentStyle&&(n=t.currentStyle),void 0===e?n:n[e];e in o||(e="-webkit-"+e),o[e]=n+("string"==typeof n?"":"px")}}function Q(t,e,n){if(t){var o=t.getElementsByTagName(e),i=0,r=o.length;if(n)for(;i<r;i++)n(o[i],i);return o}return[]}function Z(t,e,n,i,r,a,l,s,c){t=t||e[S];var d=E.createEvent("Event"),h=t.options,u="on"+n.charAt(0).toUpperCase()+n.substr(1);d.initEvent(n,!0,!0),d.to=r||e,d.from=a||e,d.item=i||e,d.clone=o,d.oldIndex=l,d.newIndex=s,d.originalEvent=c,e.dispatchEvent(d),h[u]&&h[u].call(t,d)}function J(t,e,n,o,i,r,a,l){var s,c,d=t[S],h=d.options.onMove;return(s=E.createEvent("Event")).initEvent("move",!0,!0),s.to=e,s.from=t,s.dragged=n,s.draggedRect=o,s.related=i||e,s.relatedRect=r||e.getBoundingClientRect(),s.willInsertAfter=l,s.originalEvent=a,t.dispatchEvent(s),h&&(c=h.call(d,s,a)),c}function K(t){t.draggable=!1}function $(){O=!1}function tt(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,n=e.length,o=0;n--;)o+=e.charCodeAt(n);return o.toString(36)}function et(t,e){var n=0;if(!t||!t.parentNode)return-1;for(;t&&(t=t.previousElementSibling);)"TEMPLATE"===t.nodeName.toUpperCase()||">*"!==e&&!nt(t,e)||n++;return n}function nt(t,e){if(t){if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e)}return!1}function ot(t,e){var n,o;return function(){void 0===n&&(n=arguments,o=this,k(function(){1===n.length?t.call(o,n[0]):t.apply(o,n),n=void 0},e))}}function it(t,e){if(t&&e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}function rt(t){return B&&B.dom?B.dom(t).cloneNode(!0):N?N(t).clone(!0)[0]:t.cloneNode(!0)}function at(t){return k(t,0)}function lt(t){return clearTimeout(t)}return W.prototype={constructor:W,_onTapStart:function(e){var n,o=this,i=this.el,r=this.options,l=r.preventOnFilter,s=e.type,c=e.touches&&e.touches[0],d=(c||e).target,h=e.target.shadowRoot&&e.path&&e.path[0]||d,u=r.filter;if(function(t){A.length=0;var e=t.getElementsByTagName("input"),n=e.length;for(;n--;){var o=e[n];o.checked&&A.push(o)}}(i),!t&&!(/mousedown|pointerdown/.test(s)&&0!==e.button||r.disabled)&&!h.isContentEditable&&(d=U(d,r.draggable,i))&&a!==d){if(n=et(d,r.draggable),"function"==typeof u){if(u.call(this,e,d,this))return Z(o,h,"filter",d,i,i,n),void(l&&e.preventDefault())}else if(u&&(u=u.split(",").some(function(t){if(t=U(h,t.trim(),i))return Z(o,t,"filter",d,i,i,n),!0})))return void(l&&e.preventDefault());r.handle&&!U(h,r.handle,i)||this._prepareDragStart(e,c,d,n)}},_prepareDragStart:function(n,o,l,s){var c,d=this,h=d.el,u=d.options,p=h.ownerDocument;l&&!t&&l.parentNode===h&&(m=n,i=h,e=(t=l).parentNode,r=t.nextSibling,a=l,g=u.group,f=s,this._lastX=(o||n).clientX,this._lastY=(o||n).clientY,t.style["will-change"]="all",c=function(){d._disableDelayedDrag(),t.draggable=d.nativeDraggable,z(t,u.chosenClass,!0),d._triggerDragStart(n,o),Z(d,i,"choose",t,i,i,f)},u.ignore.split(",").forEach(function(e){Q(t,e.trim(),K)}),V(p,"mouseup",d._onDrop),V(p,"touchend",d._onDrop),V(p,"touchcancel",d._onDrop),V(p,"selectstart",d),u.supportPointer&&V(p,"pointercancel",d._onDrop),u.delay?(V(p,"mouseup",d._disableDelayedDrag),V(p,"touchend",d._disableDelayedDrag),V(p,"touchcancel",d._disableDelayedDrag),V(p,"mousemove",d._disableDelayedDrag),V(p,"touchmove",d._disableDelayedDrag),u.supportPointer&&V(p,"pointermove",d._disableDelayedDrag),d._dragStartTimer=k(c,u.delay)):c())},_disableDelayedDrag:function(){var t=this.el.ownerDocument;clearTimeout(this._dragStartTimer),q(t,"mouseup",this._disableDelayedDrag),q(t,"touchend",this._disableDelayedDrag),q(t,"touchcancel",this._disableDelayedDrag),q(t,"mousemove",this._disableDelayedDrag),q(t,"touchmove",this._disableDelayedDrag),q(t,"pointermove",this._disableDelayedDrag)},_triggerDragStart:function(e,n){(n=n||("touch"==e.pointerType?e:null))?(m={target:t,clientX:n.clientX,clientY:n.clientY},this._onDragStart(m,"touch")):this.nativeDraggable?(V(t,"dragend",this),V(i,"dragstart",this._onDragStart)):this._onDragStart(m,!0);try{E.selection?at(function(){E.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(){if(i&&t){var e=this.options;z(t,e.ghostClass,!0),z(t,e.dragClass,!1),W.active=this,Z(this,i,"start",t,i,i,f)}else this._nulling()},_emulateDragOver:function(){if(_){if(this._lastX===_.clientX&&this._lastY===_.clientY)return;this._lastX=_.clientX,this._lastY=_.clientY,X||G(n,"display","none");var t=E.elementFromPoint(_.clientX,_.clientY),e=t,o=R.length;if(t&&t.shadowRoot&&(e=t=t.shadowRoot.elementFromPoint(_.clientX,_.clientY)),e)do{if(e[S]){for(;o--;)R[o]({clientX:_.clientX,clientY:_.clientY,target:t,rootEl:e});break}t=e}while(e=e.parentNode);X||G(n,"display","")}},_onTouchMove:function(t){if(m){var e=this.options,o=e.fallbackTolerance,i=e.fallbackOffset,r=t.touches?t.touches[0]:t,a=r.clientX-m.clientX+i.x,l=r.clientY-m.clientY+i.y,s=t.touches?"translate3d("+a+"px,"+l+"px,0)":"translate("+a+"px,"+l+"px)";if(!W.active){if(o&&M(I(r.clientX-this._lastX),I(r.clientY-this._lastY))<o)return;this._dragStarted()}this._appendGhost(),b=!0,_=r,G(n,"webkitTransform",s),G(n,"mozTransform",s),G(n,"msTransform",s),G(n,"transform",s),t.preventDefault()}},_appendGhost:function(){if(!n){var e,o=t.getBoundingClientRect(),r=G(t),a=this.options;z(n=t.cloneNode(!0),a.ghostClass,!1),z(n,a.fallbackClass,!0),z(n,a.dragClass,!0),G(n,"top",o.top-x(r.marginTop,10)),G(n,"left",o.left-x(r.marginLeft,10)),G(n,"width",o.width),G(n,"height",o.height),G(n,"opacity","0.8"),G(n,"position","fixed"),G(n,"zIndex","100000"),G(n,"pointerEvents","none"),a.fallbackOnBody&&E.body.appendChild(n)||i.appendChild(n),e=n.getBoundingClientRect(),G(n,"width",2*o.width-e.width),G(n,"height",2*o.height-e.height)}},_onDragStart:function(e,n){var r=this,a=e.dataTransfer,l=r.options;r._offUpEvents(),g.checkPull(r,r,t,e)&&((o=rt(t)).draggable=!1,o.style["will-change"]="",G(o,"display","none"),z(o,r.options.chosenClass,!1),r._cloneId=at(function(){i.insertBefore(o,t),Z(r,i,"clone",t)})),z(t,l.dragClass,!0),n?("touch"===n?(V(E,"touchmove",r._onTouchMove),V(E,"touchend",r._onDrop),V(E,"touchcancel",r._onDrop),l.supportPointer&&(V(E,"pointermove",r._onTouchMove),V(E,"pointerup",r._onDrop))):(V(E,"mousemove",r._onTouchMove),V(E,"mouseup",r._onDrop)),r._loopId=setInterval(r._emulateDragOver,50)):(a&&(a.effectAllowed="move",l.setData&&l.setData.call(r,a,t)),V(E,"drop",r),r._dragStartId=at(r._dragStarted))},_onDragOver:function(a){var l,s,c,f,p,m,_=this.el,D=this.options,y=D.group,w=W.active,C=g===y,E=!1,x=D.sort;if((void 0!==a.preventDefault&&(a.preventDefault(),!D.dragoverBubble&&a.stopPropagation()),!t.animated)&&(b=!0,w&&!D.disabled&&(C?x||(f=!i.contains(t)):v===this||(w.lastPullMode=g.checkPull(this,w,t,a))&&y.checkPut(this,w,t,a))&&(void 0===a.rootEl||a.rootEl===this.el))){if(F(a,D,this.el),O)return;if(l=U(a.target,D.draggable,_),s=t.getBoundingClientRect(),v!==this&&(v=this,E=!0),f)return j(w,!0),e=i,void(o||r?i.insertBefore(t,o||r):x||i.appendChild(t));if(0===_.children.length||_.children[0]===n||_===a.target&&(p=a,m=_.lastElementChild.getBoundingClientRect(),p.clientY-(m.top+m.height)>5||p.clientX-(m.left+m.width)>5)){if(0!==_.children.length&&_.children[0]!==n&&_===a.target&&(l=_.lastElementChild),l){if(l.animated)return;c=l.getBoundingClientRect()}j(w,C),!1!==J(i,_,t,s,l,c,a)&&(t.contains(_)||(_.appendChild(t),e=_),this._animate(s,t),l&&this._animate(c,l))}else if(l&&!l.animated&&l!==t&&void 0!==l.parentNode[S]){d!==l&&(d=l,h=G(l),u=G(l.parentNode));var N=(c=l.getBoundingClientRect()).right-c.left,B=c.bottom-c.top,P=T.test(h.cssFloat+h.display)||"flex"==u.display&&0===u["flex-direction"].indexOf("row"),Y=l.offsetWidth>t.offsetWidth,X=l.offsetHeight>t.offsetHeight,I=(P?(a.clientX-c.left)/N:(a.clientY-c.top)/B)>.5,M=l.nextElementSibling,A=!1;if(P){var R=t.offsetTop,L=l.offsetTop;A=R===L?l.previousElementSibling===t&&!Y||I&&Y:l.previousElementSibling===t||t.previousElementSibling===l?(a.clientY-c.top)/B>.5:L>R}else E||(A=M!==t&&!X||I&&X);var H=J(i,_,t,s,l,c,a,A);!1!==H&&(1!==H&&-1!==H||(A=1===H),O=!0,k($,30),j(w,C),t.contains(_)||(A&&!M?_.appendChild(t):l.parentNode.insertBefore(t,A?M:l)),e=t.parentNode,this._animate(s,t),this._animate(c,l))}}},_animate:function(t,e){var n=this.options.animation;if(n){var o=e.getBoundingClientRect();1===t.nodeType&&(t=t.getBoundingClientRect()),G(e,"transition","none"),G(e,"transform","translate3d("+(t.left-o.left)+"px,"+(t.top-o.top)+"px,0)"),e.offsetWidth,G(e,"transition","all "+n+"ms"),G(e,"transform","translate3d(0,0,0)"),clearTimeout(e.animated),e.animated=k(function(){G(e,"transition",""),G(e,"transform",""),e.animated=!1},n)}},_offUpEvents:function(){var t=this.el.ownerDocument;q(E,"touchmove",this._onTouchMove),q(E,"pointermove",this._onTouchMove),q(t,"mouseup",this._onDrop),q(t,"touchend",this._onDrop),q(t,"pointerup",this._onDrop),q(t,"touchcancel",this._onDrop),q(t,"pointercancel",this._onDrop),q(t,"selectstart",this)},_onDrop:function(a){var l=this.el,s=this.options;clearInterval(this._loopId),clearInterval(y.pid),clearTimeout(this._dragStartTimer),lt(this._cloneId),lt(this._dragStartId),q(E,"mouseover",this),q(E,"mousemove",this._onTouchMove),this.nativeDraggable&&(q(E,"drop",this),q(l,"dragstart",this._onDragStart)),this._offUpEvents(),a&&(b&&(a.preventDefault(),!s.dropBubble&&a.stopPropagation()),n&&n.parentNode&&n.parentNode.removeChild(n),i!==e&&"clone"===W.active.lastPullMode||o&&o.parentNode&&o.parentNode.removeChild(o),t&&(this.nativeDraggable&&q(t,"dragend",this),K(t),t.style["will-change"]="",z(t,this.options.ghostClass,!1),z(t,this.options.chosenClass,!1),Z(this,i,"unchoose",t,e,i,f,null,a),i!==e?(p=et(t,s.draggable))>=0&&(Z(null,e,"add",t,e,i,f,p,a),Z(this,i,"remove",t,e,i,f,p,a),Z(null,e,"sort",t,e,i,f,p,a),Z(this,i,"sort",t,e,i,f,p,a)):t.nextSibling!==r&&(p=et(t,s.draggable))>=0&&(Z(this,i,"update",t,e,i,f,p,a),Z(this,i,"sort",t,e,i,f,p,a)),W.active&&(null!=p&&-1!==p||(p=f),Z(this,i,"end",t,e,i,f,p,a),this.save()))),this._nulling()},_nulling:function(){i=t=e=n=r=o=a=l=s=m=_=b=p=d=h=v=g=W.active=null,A.forEach(function(t){t.checked=!0}),A.length=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragover":case"dragenter":t&&(this._onDragOver(e),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.preventDefault()}(e));break;case"mouseover":this._onDrop(e);break;case"selectstart":e.preventDefault()}},toArray:function(){for(var t,e=[],n=this.el.children,o=0,i=n.length,r=this.options;o<i;o++)U(t=n[o],r.draggable,this.el)&&e.push(t.getAttribute(r.dataIdAttr)||tt(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,o){var i=n.children[o];U(i,this.options.draggable,n)&&(e[t]=i)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set(this)},closest:function(t,e){return U(t,e||this.options.draggable,this.el)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];n[t]=e,"group"===t&&H(n)},destroy:function(){var t=this.el;t[S]=null,q(t,"mousedown",this._onTapStart),q(t,"touchstart",this._onTapStart),q(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(q(t,"dragover",this),q(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),R.splice(R.indexOf(this._onDragOver),1),this._onDrop(),this.el=t=null}},V(E,"touchmove",function(t){W.active&&t.preventDefault()}),W.utils={on:V,off:q,css:G,find:Q,is:function(t,e){return!!U(t,e,t)},extend:it,throttle:ot,closest:U,toggleClass:z,clone:rt,index:et,nextTick:at,cancelNextTick:lt},W.create=function(t,e){return new W(t,e)},W.version="1.7.0",W});

/* Element.closest polyfill (ie11) */
(function(a){"function"!==typeof a.matches&&(a.matches=a.msMatchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||function(a){a=(this.document||this.ownerDocument).querySelectorAll(a);for(var b=0;a[b]&&a[b]!==this;)++b;return!!a[b]});"function"!==typeof a.closest&&(a.closest=function(a){for(var b=this;b&&1===b.nodeType;){if(b.matches(a))return b;b=b.parentNode}return null})})(window.Element.prototype);

/* Array.findIndex polyfill (ie11) */
Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(c,d){if(null==this)throw new TypeError('"this" is null or not defined');var b=Object(this),e=b.length>>>0;if("function"!==typeof c)throw new TypeError("predicate must be a function");for(var a=0;a<e;){if(c.call(d,b[a],a,b))return a;a++}return-1},configurable:!0,writable:!0});

/* https://github.com/rndme/download */
(function(root,factory){if(typeof define==="function"&&define.amd)define([],factory);else if(typeof exports==="object")module.exports=factory();else root.download=factory()})(this,function(){return function download(data,strFileName,strMimeType){var self=window,defaultMime="application/octet-stream",mimeType=strMimeType||defaultMime,payload=data,url=!strFileName&&!strMimeType&&payload,anchor=document.createElement("a"),toString=function(a){return String(a)},myBlob=self.Blob||self.MozBlob||self.WebKitBlob||
toString,fileName=strFileName||"download",blob,reader;myBlob=myBlob.call?myBlob.bind(self):Blob;if(String(this)==="true"){payload=[payload,mimeType];mimeType=payload[0];payload=payload[1]}if(url&&url.length<2048){fileName=url.split("/").pop().split("?")[0];anchor.href=url;if(anchor.href.indexOf(url)!==-1){var ajax=new XMLHttpRequest;ajax.open("GET",url,true);ajax.responseType="blob";ajax.onload=function(e){download(e.target.response,fileName,defaultMime)};setTimeout(function(){ajax.send()},0);return ajax}}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload))if(payload.length>
1024*1024*1.999&&myBlob!==toString){payload=dataUrlToBlob(payload);mimeType=payload.type||defaultMime}else return navigator.msSaveBlob?navigator.msSaveBlob(dataUrlToBlob(payload),fileName):saver(payload);else if(/([\x80-\xff])/.test(payload)){var i=0,tempUiArr=new Uint8Array(payload.length),mx=tempUiArr.length;for(i;i<mx;++i)tempUiArr[i]=payload.charCodeAt(i);payload=new myBlob([tempUiArr],{type:mimeType})}blob=payload instanceof myBlob?payload:new myBlob([payload],{type:mimeType});function dataUrlToBlob(strUrl){var parts=
strUrl.split(/[:;,]/),type=parts[1],indexDecoder=strUrl.indexOf("charset")>0?3:2,decoder=parts[indexDecoder]=="base64"?atob:decodeURIComponent,binData=decoder(parts.pop()),mx=binData.length,i=0,uiArr=new Uint8Array(mx);for(i;i<mx;++i)uiArr[i]=binData.charCodeAt(i);return new myBlob([uiArr],{type:type})}function saver(url,winMode){if("download"in anchor){anchor.href=url;anchor.setAttribute("download",fileName);anchor.className="download-js-link";anchor.innerHTML="downloading...";anchor.style.display=
"none";anchor.addEventListener("click",function(e){e.stopPropagation();this.removeEventListener("click",arguments.callee)});document.body.appendChild(anchor);setTimeout(function(){anchor.click();document.body.removeChild(anchor);if(winMode===true)setTimeout(function(){self.URL.revokeObjectURL(anchor.href)},250)},66);return true}if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)){if(/^data:/.test(url))url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime);if(!window.open(url))if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page."))location.href=
url;return true}var f=document.createElement("iframe");document.body.appendChild(f);if(!winMode&&/^data:/.test(url))url="data:"+url.replace(/^data:([\w\/\-\+]+)/,defaultMime);f.src=url;setTimeout(function(){document.body.removeChild(f)},333)}if(navigator.msSaveBlob)return navigator.msSaveBlob(blob,fileName);if(self.URL)saver(self.URL.createObjectURL(blob),true);else{if(typeof blob==="string"||blob.constructor===toString)try{return saver("data:"+mimeType+";base64,"+self.btoa(blob))}catch(y){return saver("data:"+
mimeType+","+encodeURIComponent(blob))}reader=new FileReader;reader.onload=function(e){saver(this.result)};reader.readAsDataURL(blob)}return true}});

localforage.config({name: 'DocumentNinja'});
Handlebars.registerHelper('json', function(context) { return JSON.stringify(context); });
Handlebars.registerHelper('plus1', function(context) { return (~~context)+1; });

var QuizBuilder = (function () {

	// cached selectors
	var _$=[], $ = function (sel) { if(!_$[sel])_$[sel]=document.querySelector(sel);return _$[sel]; };
	var _$$=[], $$ = function (sel) { if(!_$$[sel])_$$[sel]=document.querySelectorAll(sel);return _$$[sel]; };
	var _templates = {}, _data_ = {}, _selected_question = {}, _sortable;
	_templates.question={uid:"q1",media:"", order:1, text:"",show:5,required:2,distractors:[{text:""},{text:""},{text:""},{text:""},{text:""}],feedback:{none:"",positive:"",negative:""}};
	_templates.quiz={title:"My New Quiz",questions:[_templates.question],show:1,required:1,randomise:!0,finished:!1,resit:!1,feedback:"answer",strings:{resit:"Resit quiz",answer:"Check answer",next:"Next",results:"Results",completion:"<p>Thanks for completing the quiz.</p>\n<p>Your score is <%=score%> out of <%=total%>, which means you <% if (score >= required) { %>passed<% } else { %>failed<% } %>.</p>"}};

	function _trim(a,e){var c=" \n\r\t\f\x0B\u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000",b;a+="";e&&(c=(e+"").replace(/([[\]().?/*{}+$^:])/g,"$1"));var d=a.length;for(b=0;b<d;b++)if(-1===c.indexOf(a.charAt(b))){a=a.substring(b);break}d=a.length;for(b=d-1;0<=b;b--)if(-1===c.indexOf(a.charAt(b))){a=a.substring(0,b+1);break}return-1===c.indexOf(a.charAt(0))?a:""};

	function _fallback() {
		return _templates.quiz;
	}

	function _init() {
		var fileid = window.location.search.split("?")[1] || "";
		localforage.getItem(fileid).then(function (obj) {
			if (typeof ((obj||{}).payload||{}).quiz === 'undefined') {
				_data_ = _fallback();
			} else {
				_data_ = obj.payload.quiz;
			}
			QuizBuilder.Bind();
		});
	};

	function _add_question_button(parent,uid) {
		parent.appendChild(createElement({
			tagName:"span",
			attributes: {
				"data-uid":uid
			},
			childs: [{
				tagName: "a",
				attributes: {
					"href":"#"
				},
				className: "button"
			}]
		}));
	}

	function _bind() {

		$("#save_button").addEventListener("click", QuizBuilder.Save, false);
		$("#export_button").addEventListener("click", QuizBuilder.Export, false);

		$("a[href='#default']").addEventListener("click", function (e) {
			e.preventDefault();
			$("#results_text").value = _templates.quiz.strings.completion;
			_data_.strings.completion = _templates.quiz.strings.completion;
		}, false);
		var zone = new FileDrop(document.querySelector("#question_media"));
		zone.event('send', function(files) {
			files.each(function(file) {
				if (file.mime.indexOf("image/")!==-1) {
					file.readData(
				      function (src) {
				      	zone.el.value = "<p class=\"text-center\"><img src=\"" + src + "\" alt=\"" + file.name + "\"></p>";
				      },
				      function (e) { alert("File drop misunderstood") },
				      'src'
	    			);
	    		}
			});
		});

		$("div[label='Settings']").addEventListener("change", function(e){
			switch(e.target.getAttribute("id")) {
				case "title_field": _data_.title = e.target.value; break;
				case "reveal_field": _data_.feedback = e.target.value; break;
				case "checkButton_field": _data_.strings.answer = e.target.value; break;
				case "show_field": _data_.show = ~~e.target.value; setScoreMax(); break;
				case "score_field": _data_.required = ~~e.target.value; setScoreMax(); break;
				case "order_field": _data_.randomise = e.target.value==="true" ? true : false; break;
				case "nextButton_field": _data_.strings.next = e.target.value; break;
				case "resultsButton_field": _data_.strings.results = e.target.value; break;
				case "results_text": _data_.strings.completion = e.target.value; break;
				case "base_colour": _data_.colour = e.target.value; break;
				case "resit_field": _data_.resit = e.target.checked?1:0; break;
				case "resitButton_field": _data_.strings.resit = e.target.value; break;
			}
			QuizBuilder.Save();
		}, false);

		function setScoreMax() {
			var max = Math.min($("#show_field").value, $("#show_field").max);
			$("#score_field").max = max;
			if ($("#score_field").value > max) {
				$("#score_field").value = max;
				var event = new Event('change');
				$("#score_field").dispatchEvent(event);
			};
		}

		$("#title_field").value=_data_.title;
		$("#reveal_field").value=_data_.feedback;
		$("#checkButton_field").value=_data_.strings.answer;
		$("#order_field").value=_data_.randomise.toString();
		var dc = _data_.colour?_data_.colour:"#508196";
		$("#base_colour").jscolor.fromString(dc);
		$("#order_field").addEventListener("change",function() {
			if (this.value === "false") {
				_sortable = new Sortable($(".question-index"),{draggable:"span", onEnd: function(evt) {
					[].forEach.call($(".question-index").querySelectorAll("span[data-uid]"), function (dom, index) {
						_data_.questions.find(function(obj) { return obj.uid === dom.dataset.uid}).order=index;
					});
					QuizBuilder.Save();
				}});
			} else {
				if (_sortable) _sortable.destroy();
			}
		}, false);

		$("#nextButton_field").value = _data_.strings.next;
		$("#show_field").value = _data_.show;
		$("#show_field").min = 1;
		$("#show_field").max = _data_.questions.length;
		$("#score_field").value = _data_.required;
		$("#score_field").min = 1;
		setScoreMax();
		$("#resultsButton_field").value = _data_.strings.results;
		$("#resitButton_field").value = _data_.strings.resit;
		$("#results_text").value = _data_.strings.completion;
		$("#resit_field").checked = _data_.resit;

		var qi = $(".question-index");
		while(qi.firstChild) qi.removeChild(qi.firstChild); // empty questions list
		qi.addEventListener("click",function(e) {
			if (e.target.nodeName !== "A") return;
			e.preventDefault();
			QuizBuilder.Questions.Save();
			_selected_question = _data_.questions.find(function(obj) { return obj.uid === e.target.parentNode.dataset.uid});
			[].forEach.call(e.target.closest("div").children,function(el) {
				el.classList[_selected_question.uid===el.dataset.uid?"add":"remove"]("selected");
			});
			QuizBuilder.Questions.Load();
		},false);
		for (var i=0;i<_data_.questions.length;i++) {
			//if (_data_.randomise === true) {
				_add_question_button(qi,_data_.questions[i].uid); // render buttons any way you like
			//} else {
			//	_add_question_button(qi,_data_.questions[i].order+1); // render buttons in stored order
			//}
		}

		$("#distractors>tbody").addEventListener("click",function(e) {
			if(e.target.className==="fa fa-times-circle") {
				QuizBuilder.Questions.Distractors.Remove(e);
			}
			if (e.target.name === "distractor") { // set minimum number of distractors to total correct answers
				var cboxes = document.querySelectorAll("#distractors>tbody input");
				var minD = 0;
				/* ES6 only :(
				for (var el of cboxes) {
					if (el.checked) minD++;
				}*/
				for (var i=0; i < cboxes.length; i++) {
					if (cboxes[i].checked) minD++;
				}
				$("#distractor_show").min = (minD > 2) ? minD : 2;
				$("#distractor_show").value = ($("#distractor_show").value >= minD) ? $("#distractor_show").value : minD;
			}
		},false);

		new Sortable($("#distractors>tbody"),{draggable:"tr", handle: "td:first-of-type", onEnd:function(evt) {
			QuizBuilder.Questions.Save();
		}});

    _data_.randomise = ($("#order_field").value==="true") ? true : false;

    if (!_data_.randomise) {
      _sortable = new Sortable($(".question-index"),{draggable:"span", onEnd: function(evt) {
        [].forEach.call($(".question-index").querySelectorAll("span[data-uid]"), function (dom, index) {
          _data_.questions.find(function(obj) { return obj.uid === dom.dataset.uid}).order=index;
        });
        QuizBuilder.Save();
      }});
    } else {
      if (_sortable) _sortable.destroy();
    }

		$("#distractorsFoot").addEventListener("click",function(e){ if(e.target.id==="addDistractor"){
			var len = document.querySelectorAll("#distractors>tbody>tr").length;
			$("#distractors>tbody").appendChild(QuizBuilder.Questions.Distractors.Add({required:0}, len));
      var dshow = $("#distractor_show");
      dshow.max = len+1;
      if (dshow.value > dshow.max) dshow.value = dshow.max;
		}},false);

		$(".question-actions").addEventListener("click", function (e) {
			var tgt = e.target.closest("a");
			if (!tgt) return;
			switch (tgt.getAttribute("href")) {
				case "#save":
					QuizBuilder.Questions.Save();
					break;
				case "#save+add":
					QuizBuilder.Questions.Save();
					QuizBuilder.Questions.Add();
					break;
				case "#remove":
					QuizBuilder.Questions.Remove();
					break;
			}
		},false);
		var qi = qi.querySelector("a:first-of-type");
		if (qi) qi.click();
	}

	function _save() {
		var node = $("div[label='Settings']");
		node.setAttribute("label","Settings ... saving");
		var fileid = window.location.search.split("?")[1] || "";
//console.dir(_data_);
		localforage.getItem(fileid).then(function(obj) {
			obj=obj||{};obj.payload=obj.payload||{};
			obj.payload.quiz = _data_;
			obj.payload.html = parent.DocNinja.Plugins.QuizBuilder.Compile(_data_, parent.Handlebars.templates['quiz.renderer']);
			localforage.setItem(fileid,obj).then(function() {
				setTimeout(function(){node.setAttribute("label","Settings")},1000);
				node.setAttribute("label","Settings ... saved");
			}).catch(function(err){
				console.log(err);
			});
		});
	}

	function _export() {
		var fileid = window.location.search.split("?")[1] || "";
		localforage.getItem(fileid).then(function(obj) {
			if (obj&&obj.payload&&obj.payload.quiz) {
				obj.payload.quiz["source"] = "docninja.quiz"; // clue for importer

				// prompt for download, IE compatible
				download(JSON.stringify(obj.payload.quiz,null,2), obj.name + ".json", "application/json");

			    // var dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj.payload.quiz,null,2));
			    // var n = document.createElement('a');
			    // n.setAttribute("href",     dataStr);
			    // n.setAttribute("download", obj.name + ".json");
			    // document.body.appendChild(n); // required for firefox
			    // n.click();
			    // n.remove();

			}
		});
	}

	function _questions_load() {
		$("#question_details").classList.remove("disabled");
		$("#question_media").value = _selected_question.media;
		$("#question_text").value = _selected_question.text;
		var node = $("#distractors>tbody");
		while(node.firstChild) node.removeChild(node.firstChild); // start over
		for (var i=0;i<_selected_question.distractors.length;i++) {
			node.appendChild(QuizBuilder.Questions.Distractors.Add(i));
		}
		$("#distractor_show").max = _selected_question.distractors.length;
		$("#distractor_show").value = _selected_question.show || _selected_question.distractors.length;
		$("#positiveText_field").value = _selected_question.feedback.positive;
		$("#negativeText_field").value = _selected_question.feedback.negative;
		$("#skippedText_field").value = _selected_question.feedback.none;
	}

	function _questions_add() {
		_questions_save(); // save current question content before creating new question
		var qi = $(".question-index");
		var	newq = _question_clone();
		var	i = qi.children.length + 1;
		while(_data_.questions.find(function(val){return val.uid==="q"+i;})) i++;
		// console.log("i ended up at",i);
		_add_question_button(qi,"q"+i);
		newq.uid = "q" + i;
		//newq.text = "New Question " + i + ". Replace this with your own text.";
		newq.order = i;
		_data_.questions.push(newq);
		$("#show_field").max = _data_.questions.length; // ensure 'show questions' max value stays up to date
		$("#show_field").value = _data_.questions.length; // default to showing all questions
		$("#show_field").dispatchEvent(new Event("change", {bubbles: true})); // trigger the change event to update the _data_ value
		$("#score_field").value = _data_.questions.length; // set 'pass mark' to number of questions
		$("#score_field").max = _data_.questions.length; // ensure 'pass mark' max value stays up to date
		_data_.required = ~~$("#score_field").value; // set quiz 'pass mark' when adding new question
		qi.querySelector("span[data-uid=" + newq.uid + "] > a").click();
	};

	function _questions_save() {
		if (!_selected_question.hasOwnProperty("uid")) return; // check empty
		var btn = document.querySelector(".question-index .selected"); // uncached
		btn.classList.add("saved"); setTimeout(function() { btn.classList.remove("saved")},750);
		var distractors = [],
			required = 0;
		[].forEach.call($("#distractors>tbody").children,function(tr,i) {
			var t = _trim(tr.querySelector("textarea").value);
			if (!t.length) return; // skip empties
			distractors.push({text:t});
			if (tr.querySelector("input").checked) required += Math.pow(2,i);
		});
		_selected_question.media = _trim($("#question_media").value);
		_selected_question.text = _trim($("#question_text").value);
		_selected_question.required = (required>0)?required:1; // check at least one
		_selected_question.show = ~~$("#distractor_show").value;
		_selected_question.distractors = distractors;
		_selected_question.feedback.positive = _trim($("#positiveText_field").value);
		_selected_question.feedback.negative = _trim($("#negativeText_field").value);
		_selected_question.feedback.none = _trim($("#skippedText_field").value);
		var q = _data_.questions.findIndex(function(obj) { return obj.uid === _selected_question.uid});
		_data_.questions[q] = _selected_question;
		QuizBuilder.Save();
	};

	function _questions_remove() {
		if (!(_selected_question && _selected_question.hasOwnProperty("uid"))) return; // check empty
		var q = _data_.questions.findIndex(function(obj) { return obj.uid === _selected_question.uid });
		if (q > -1)_data_.questions.splice(q,1); // remove from questions array
		//$("#question_details").classList.add("disabled");
		var qButton = document.querySelector(".question-index .selected");
		// Select previous question (or next if deleting first)
		_selected_question = _data_.questions.find(function(obj) {
			if (qButton.previousSibling !== null) {
				return obj.uid === qButton.previousSibling.dataset.uid;
			} else {
				return obj.uid === qButton.nextSibling.dataset.uid;
			}
		});
		var remaining = false;
		if (qButton.previousSibling !== null) {
			qButton.previousSibling.classList.add("selected");
			remaining = true;
		} else if (qButton.nextSibling !== null) {
			qButton.nextSibling.classList.add("selected");
			remaining = true;
		}

		if (remaining) {
			qButton.parentNode.removeChild(qButton);
		} else {
			alert("Can't remove last question");
		}
		QuizBuilder.Save();
		QuizBuilder.Questions.Load();
	};

	// Returns a clone of the default question
	function _question_clone() {
		destination = {
			uid: "q1",
			media: "",
			order: 1,
			text: "",
			show: 5,
			required: 2,
			distractors: [
				{text: ""},
				{text: ""},
				{text: ""},
				{text: ""},
				{text: ""}
			],
			feedback: {
				none: "",
				positive: "",
				negative: ""
			}
		}
		return destination;
	}

	function _distractor_add(index) {
		var c = createElement({
			tagName:"tr",
			childs: [
				{
					tagName: "td",
					childs: [
						{
							tagName: "input",
							attributes: {
								"type": "checkbox",
								"name": "distractor",
								"tooltip": "Select one or more correct answers",
								"value": Math.pow(2,index)
							}
						}
					]
				}, {
					tagName: "td",
					childs: [
						{
							tagName: "textarea",
							text: (_selected_question.distractors && _selected_question.distractors[index] ? _selected_question.distractors[index].text : ""),
							attributes: {
								"placeholder":"Enter the choice here (basic html accepted)."
							}
						}
					]
				}, {
					tagName: "td",
					childs: [
						{
							tagname: "a",
							attributes: {
								"href":"#remove",
								"title":"Remove this distractor"
							},
							childs: [{
								tagName: "i",
								className: "fa fa-times-circle"
							}]
						}
					]
				}
			]
		});
		if ((Math.pow(2,index) & _selected_question.required) > 0) c.querySelector("input").checked = true;
		$("#distractor_show").value = ~~$("#distractor_show").value + 1;
		return c;
	};

	function _distractor_remove(e) {
		var tr=e.target.parentNode.parentNode;
		tr.parentNode.removeChild(tr);
		$("#distractor_show").value = ~~$("#distractor_show").value - 1;
		$("#distractor_show").max = ~~$("#distractor_show").max - 1;
	};

	// function _compile() {
	// 	if (_data_.randomise===false) { // re-order questions to natural order
	// 		var qq = JSON.parse(JSON.stringify(_data_.questions)); // clone node
	// 		qq.map(function(value,index) {
	// 			_data_.questions[index].order = qq[value.order];
	// 		});
	// 	}
	// 	var dc = _data_.colour ? _data_.colour : "#508196";
	// 	return Handlebars.templates["render"]({
	// 		tint_colour: dc,
	// 		quiz_json: _data_,
	// 		buttons: {
	// 			check: _data_.strings.answer,
	// 			next: _data_.strings.next,
	// 			results: _data_.strings.results,
	// 			resit: _data_.strings.resit
	// 		},
	// 		templates: {
	// 			endpage: _data_.strings.completion
	// 		}
	// 	});
	// }

	return {
		Init: _init,
		Bind: _bind,
		Save: _save,
		Export: _export,
		// Compile: _compile,
		Questions: {
			Load: _questions_load,
			Add: _questions_add,
			Save: _questions_save,
			Remove: _questions_remove,
			Distractors: {
				Add: _distractor_add,
				Remove: _distractor_remove
			}
		}
	}
})();