// initialise on page load
document.addEventListener("DOMContentLoaded", function(event) {

	document.body.classList.remove("active");

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
		html.push('<a href="#" onclick="event.preventDefault();goto(' + i + ')">' + title + '</a>');
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
	    }
	  });
    }
    document.getElementById("menu").innerHTML = menu.join("");
    goto(Math.clip(_lastPage-1,0,Object.keys(pages).length),true); // lesson_location default is 1; we are zero based
    checkCourseCompletion();
});