// initialise on page load
jQuery(function($) {
    var iframe = $('iframe')[0],
        _suspend = "",
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

    if (!('ontouchstart' in document.documentElement || window.navigator.msPointerEnabled)) {
        $("body").on("mouseenter", function() {
            $("a").addClass("active");
        }).on("mouseleave", function() {
            $("a").removeClass("active")
        });
        setTimeout(function() { $("a").trigger("mouseenter")},567);
    }

    $(document).on("keydown", function(e) {
        switch (e.keyCode) {
            case 37: left(); break;
            case 39: right(); break;
        }
    });

    $("body,iframe").swipe({
        swipe: function(event, direction) {
            switch (direction) {
                case "left": goto(course.page-1); break;
                case "right": goto(course.page+1); break;
            }
        }
    });

    goto(Math.clip(_lastPage-1,0,Object.keys(pages).length),true); // lesson_location default is 1; we are zero based
    checkCourseCompletion();
});