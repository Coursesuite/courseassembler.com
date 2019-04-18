// find scorm API; getAPI() also sets _sAPI; apiHandle is the object reference
var apiHandle = (parent && parent !== self && parent.ninjaApiProxy) ? parent.ninjaApiProxy : getAPI();
scormInitialize();

// clamping
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
    goto(course.page-1);
}

// public method for navigating to the next-highest page number
function right() {
    goto(course.page+1);
}

function toggle(event) {
	document.body.classList.toggle("active");
}

document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37: event.preventDefault(); left(); break;
        case 39: event.preventDefault(); right(); break;
    }
});

// public method for navigating directly to a page by its index
function goto(n,init) {
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
	if (current_page.hasOwnProperty("audio")) {
		if (!document.querySelector(".audio")) {
			var div = document.createElement("div");
			div.className = "audio";
			document.querySelector("main").appendChild(div);
			var node = document.createElement("audio");
			node.controls = true;
			div.appendChild(node);
		}
		if (window._audio === undefined) window._audio = new Plyr(document.querySelector("main>.audio>audio"),{
			iconUrl: 'plyr.svg',
			autoplay: false,
			keyboard: {global:false,focused:false},
			settings: []
		});
		window._audio.source = {
			type:'audio',
			sources:[{type:'audio/mp3',src:'data/'+current_page["audio"]}]
		};
	} else {
		window._audio = undefined;
		var audio = document.querySelector("main>.audio");
		if (audio) audio.parentNode.removeChild(audio);
	}
    [].forEach.call(document.querySelectorAll("#scroll li"), function (el,index) {
    	el.classList.remove("selected","open");
    	if (index===course.page) el.classList.add("selected");
    });
    var li = document.querySelector("#scroll li.selected"),
    	pli = li.parentNode.closest("li");
    if (pli) pli.classList.add("open");
    if (li.querySelector("ol")) li.classList.add("open");
    document.getElementById("pagenumber").textContent = course.page+1;
    setBookmark(course.page +1); // stored as 1-based index, not 0-based
    if (["media","plugin"].indexOf(current_page.content)===-1) tick(); // run timespent looper
    checkCourseCompletion();
    checkNavigation();
}

// increment time spent on a page
function tick() {
    if (_timeout) clearTimeout(_timeout);
    tock(Math.round(((new Date).getTime() / 1000) - _now));
    _timeout = setTimeout(tick,1000);
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