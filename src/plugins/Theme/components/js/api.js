// global variables for scorm and the runtime
var _sAPI=(parent&&parent!==self&&parent.ninjaApiProxy)?"API":"",_timeSessionStart=null,_timeout,_now,_unloaded=!1;

// scorm 1.2 / 2004 common runtime / utils
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
function findAPI(a,b){var c=0;try{for(;null==a[b]&&null!=a.parent&&a.parent!=a;){c++;if(7<c)return console.log("findAPI gave up",a,b),alert("Error finding API -- too deeply nested."),null;a=a.parent}}catch(d){return console.log("findAPI forced to stop at domain boundary",a,b),null}return a[b]}
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