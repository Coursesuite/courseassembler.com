/* shivs */
(function(g,b){function k(){var a=e.elements;return"string"==typeof a?a.split(" "):a}function l(a){var c={},f=a.createElement,b=a.createDocumentFragment,d=b();a.createElement=function(a){if(!e.shivMethods)return f(a);var b;b=c[a]?c[a].cloneNode():m.test(a)?(c[a]=f(a)).cloneNode():f(a);return b.canHaveChildren&&!n.test(a)?d.appendChild(b):b};a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+k().join().replace(/\w+/g,function(a){f(a);
d.createElement(a);return'c("'+a+'")'})+");return n}")(e,d)}function h(a){var c;if(a.documentShived)return a;if(e.shivCSS&&!i){c=a.createElement("p");var b=a.getElementsByTagName("head")[0]||a.documentElement;c.innerHTML="x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>";c=!!b.insertBefore(c.lastChild,b.firstChild)}j||(c=!l(a));if(c)a.documentShived=c;return a}var d=g.html5||{},n=/^<|^(?:button|form|map|select|textarea|object|iframe|option|optgroup)$/i,
m=/^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i,i,j;(function(){var a=b.createElement("a");a.innerHTML="<xyz></xyz>";i="hidden"in a;if(!(a=1==a.childNodes.length))a:{try{b.createElement("a")}catch(c){a=!0;break a}a=b.createDocumentFragment();a="undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}j=
a})();var e={elements:d.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:!1!==d.shivCSS,shivMethods:!1!==d.shivMethods,type:"default",shivDocument:h};g.html5=e;h(b)})(this,document);

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

// global variables for scorm and the runtime
var _sAPI=(parent&&parent!==self&&parent.ninjaApiProxy)?"API":"",_timeSessionStart=null,_timeout,_now,_unloaded=!1;

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

// find scorm API; getAPI() also sets _sAPI; apiHandle is the object reference
var apiHandle = (parent && parent !== self && parent.ninjaApiProxy) ? parent.ninjaApiProxy : getAPI();
scormInitialize();

// clamping
Math.clip = function(n,i,x){return Math.max(i,Math.min(n,x));}

// public method called by body unload event(s)
function doUnload() {
    if (!_unloaded) {
        setSuspendData(JSON.stringify(pages));
        scormCommit();
        setSessionTime(_timeSessionStart);
        scormTerminate();
        _unloaded = true;
    }
}

// initialise on page load
document.addEventListener("DOMContentLoaded", function domLoader(event) {
    var iframe = document.getElementById('content'),
        _suspend = "",
        _lastPage = +getBookmark() || 0; // convertnum ~ http://stackoverflow.com/a/7540412/1238884

    startSessionTime();
    setCompletionStatus("incomplete");
    learnerWillReturn(true);
    scormCommit();

    if (!isFirstLaunch()) { // RELAUNCHING NOT WORKING!!!
      var _suspend = resume();
      console.dir(_suspend)
      if (_suspend !== null && isJSON(_suspend)) {
        for (var d=JSON.parse(_suspend),n=0,l=d.length,r,p;n<l,r=d[n];n++) {
          p = findInJson(pages,"index",r.index);
          p._completed = (r.completed===1); // need to set the underlying property, ensure its boolean
          p["timeSpent"]=r.timeSpent; // number
          p["userdata"]=r.userdata; // array
        }
      }
    }

    for (var i=0;i<pages.length;i++) {
      var p = pages[i];
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


    goto(Math.clip(_lastPage-1,0,Object.keys(pages).length),true); // lesson_location default is 1; we are zero based
    checkCourseCompletion();
});

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
	[].forEach.call(document.querySelectorAll("audio"), function (el) { el.pause(); });
    load();
}

// load a page into the player; if the iframe implements a "setTimeSpent()" function, call that
function load() {
	var current_page = pages[course.page];
	var src = current_page.href + "?" + [(current_page.timeSpent||-1),course.page].join(",");
	if (current_page.content === "plugin") {
    src = current_page.href + "?" + [escape(JSON.stringify(current_page.userdata) || []),course.page].join(",");
	}
    if (_timeout) clearTimeout(_timeout);
    _now = (new Date).getTime() / 1000;
    document.getElementById("content").setAttribute("src", src);
    setBookmark(course.page +1); // stored as 1-based index, not 0-based
    if (["media","plugin"].indexOf(current_page.content)===-1) tick(); // run timespent looper
    checkCourseCompletion();
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
        menu = document.getElementById("scroll"),
    setComplete = function() {
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
    setScore(course.score/100); // always set score, even if not yet completed
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