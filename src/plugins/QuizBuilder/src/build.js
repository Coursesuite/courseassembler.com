var qs = window.location.search.split("?")[1]?window.location.search.split("?")[1].split(","):["[]",0],_userdata=JSON.parse(unescape(qs[0]?qs[0]:"[]")),_page_index=qs[1];

// john resig's micro javascript template
(function(){
  var cache = {};
  this.tmpl = function tmpl(str, data){
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "with(obj){p.push('" +
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    return data ? fn( data ) : fn;
  };
})();

// find in json
Array.prototype.find = Array.prototype.find || function(callback) {
  if (this === null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  var list = Object(this);
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0;
  var thisArg = arguments[1];
  for (var i = 0; i < length; i++) {
    var element = list[i];
    if ( callback.call(thisArg, element, i, list) ) {
      return element;
    }
  }
};

// dispatch a browser event
function emitStatus(status) {
	// console.dir(status);
	parent.dispatchEvent(new CustomEvent("statuschange", {detail: status}));
}

// fischer-yates algorithm
function shuffle(a){for(var b=a.length-1;0<b;b--){var c=Math.floor(Math.random()*(b+1)),_ref=[a[c],a[b]];a[b]=_ref[0],a[c]=_ref[1]}}

// a quiz question is either a radio (single choice) or checkbox (multiple choice)
function get_control_type(question, l,f) {
	// the number of bits is implied by the question.required
	l = Math.floor(Math.log(question.required)/Math.LN2)+1;
	// a square can only occupy one bit, so if it's not a square, the required mask must represent multiple squares
	f = Array.apply(null, new Array(l)).map(function(_,i){return Math.pow(2,i)});
	// multiple squares = checkbox
	return (f.indexOf(question.required)===-1) ? "checkbox":"radio";
}

function initQB(userdata, quiz) {

	// 1. deep clone the "quiz" object
	var questions = JSON.parse(JSON.stringify(quiz.questions));

	// sanity checking
	if (quiz.show>questions.length) quiz.show = questions.length;
	if (quiz.required>quiz.show) quiz.required = quiz.show;

	if (userdata.length === 0) {
		// 3a. otherwise shuffle the resulting questions
		if (quiz.randomise) shuffle(questions);

		// 3b. crop the questions at the show limit
		questions.splice(quiz.show);

		// and store this in the userdata
		userdata = questions.map(function(q,i) {
			// a copy of the question distractors that contains an index and required property (which we don't want to expose)
			q.answer = 0;
			q.locked = false;
			var source = q.distractors.map(function(a,b) {
				a.index = b;
				a.required = ((q.required & Math.pow(2,b)) > 0); // xor, e.g. (3 xor 2^index)>0
				return a;
			}), dest =[];

			if (q.show < q.distractors.length) { // must randomise

				// randomise the source distractor list
				shuffle(source)

				// ensure the correct answers fall in the set of possible distractors
				for (var i=0; i < source.length; i++) {
					if (source[i].required === true) {
						dest.push(source[i].index);
					}
				}

				// fill remaining space with distractors
				for (var i=dest.length; dest.length < q.show; i++) {
					if (dest.indexOf(source[i].index) === -1) {
						dest.push(source[i].index);
					}
				}

				// randomise the final distractor order
				shuffle(dest);

			} else { // just show all distractors in natural order

				for (var i=0; i < source.length; i++) {
					dest.push(source[i].index);
				}
			}

			return [q.uid, 0, dest]; // question-in-order, my-value, distractors-in-order
		});

	} // else the userdata exists, which means we already have the randomised question set

	emitStatus({
		index:_page_index,
		status:'init', // ialise,
		userdata:userdata,
		score:0,
		required:quiz.required
	});

	// modify questions to be in order we want to display them, and throw on some runtime values we need
	questions = userdata.map(function(value) {
		var uid = value[0],
			val = value[1], // user chosen distractor value
			q = quiz.questions.find(function(obj) {
				return (obj.uid === uid);
			}),
			result = {},
			qd = q.distractors, // question distractors
			ud = value[2], // user pre-randomised and cropped ids
			nd = []; // new distractor array
			q.answer = val;
			q.locked = (quiz.feedback==="answer" && val>0); // TODO: confirm lock logic
		for (var i=0; i<ud.length; i++) {
			var d = qd[ud[i]];
			d.value = Math.pow(2,ud[i]); // the value of the distractor; add the checked values together and compare to the required answer (no partial marking)
			if ((val & d.value) > 0) d.checked = true; // bitwise and, e.g. 0101 & 1101 = 0101
			nd.push(d);
		}
		q.distractors = nd; // overwrite with updated distractor list, in presentation order
		return q;
	});

	// questions is now built from the modified userdata

	// build the page header from the quiz setup
	document.querySelector("header").innerHTML = tmpl("header", quiz);

	// build the navigation from the userdata
	nav = document.querySelector("nav");
	nav.addEventListener("click", navigate, false);
	nav.innerHTML = tmpl("navigation",{questions:userdata});

	function calculateScore() {
		return questions.reduce(function(accum,curr) {
			return accum+(curr.answer===curr.required?1:0);
		},0);
	}

	function provide_feedback(question) {
		var state = question.answer===0 ? "none" : question.answer===question.required ? "positive" : "negative";
		// clean up old state (might not be necessary)
		[].forEach.call(document.querySelectorAll("div.answers .positive, div.answers .none, div.answers .negative"), function (node) {
			node.classList.remove("positive","negative","none");
		})
		var existing = document.querySelector("div.answers div.feedback");
		if (existing) existing.parentNode.removeChild(existing);

		// apply new state
		var checked = document.querySelectorAll("div.answers input:checked");
		if (checked.length === 0 && question.feedback.none && question.feedback.none.length) { // apply "none" feedback
			var div = document.createElement("div");
			div.classList.add("feedback","none");
			div.innerHTML = "<p>" + question.feedback[state] + "</p>";
			document.querySelector("div.answers").appendChild(div);
		}
		[].forEach.call(checked, function (input) { // Colour in selections
			input.parentNode.classList.add(state);
		});
		if (question.feedback[state].length && checked.length > 0) { // apply positive/negative feedback
			var div = document.createElement("div");
			div.classList.add("feedback");
			div.classList.add(state);
			div.innerHTML = "<p>" + question.feedback[state] + "</p>";
			document.querySelector("div.answers").appendChild(div);
		}

		// apply feedback to nav (no none state)

		if (quiz.feedback === "answer" && !quiz_finished()) {
			var navNode = document.querySelector("nav>a.active");
			var pagenum = navNode.getAttribute("href").replace(/\#/,'');
			if (questions[pagenum].answer > 0) {
				navNode.classList.add(questions[pagenum].answer === questions[pagenum].required ? "positive" : "negative");
			}
		}
		if ((quiz.feedback === "complete" && quiz_finished()) || (quiz.feedback === "answer" && quiz_finished())) {
			var nodes = document.querySelectorAll("nav>a");
			for (var i=0; i<questions.length; i++) {
				if (questions[i].answer>0) nodes[i].classList.add(questions[i].answer===questions[i].required ? "positive" : "negative");
			}
		}
	}

	function lock_question(question) {
		question.locked = true; // having answered it
		[].forEach.call(document.querySelectorAll("div.answers input"), function (node) {
			node.setAttribute("disabled","disabled");
		});
		userdata.find(function (record) {
			return (question.uid === record[0]);
		})[1] = question.answer;
	}

	function lock_quiz() {
		questions.forEach(function(q) {
			q.locked = true;
		});
	}

	// determines if quiz is finished or not (based on locked questions)
	function quiz_finished() { // returns true if quiz is finished, false if not
		var finished = true;
		questions.forEach(function(q) { // any unlocked q's means unfinished quiz
			if (q.locked === false) { finished = false;}
		});
		return finished;
	}

	// Check each question and set nav feedback
	function eval_quiz() {
		[].forEach.call(document.querySelector("nav").children, function (node, page) {
			if (node.getAttribute("href") === "#results") return;
			var question = questions[page],
				answer = userdata.find(function (record) {
					return (question.uid === record[0]);
				})[1];
			question.locked = true;
			question.answer = answer;
			node.classList.add(question.answer===0?"none":question.answer===question.required ? "positive":"negative");
		});
	}

	function endquiz() {
		var check = userdata.reduce(function(a,b) {return a + (b[1]>0?1:0)}, 0); // (number of answered pages) userdata might have loaded with answers already, so is more authoritative
		if (quiz_finished() === false) {
			var alert = (check==questions.length) ? "Do you want to finish the quiz?" : "You haven't answered all the questions. Do you want to finish the quiz?"; //(quiz.feedback === "false" || quiz.feedback === "complete") && 
			if(!window.confirm(alert)) {
				var node=document.querySelector("nav>a.active"), i = [].indexOf.call(node.parentNode.children, node); // find selected node index
				return render(i);
			}
		}
		eval_quiz();
		[].forEach.call(document.querySelector("nav").children, function (node, index) {
			node.classList[node.getAttribute("href") === "#results" ? "add" : "remove"]("active");
		});
		var score = calculateScore();
		quiz.finished = true;
		lock_quiz();
		document.querySelector("main").innerHTML = tmpl("endpage", {
			score: score,
			total: quiz.show,
			required: quiz.required,
			resit: quiz.resit
		});

		// after template render
		var resit = document.querySelector("div.actions a[href='#resit']");
		if (resit) {
			resit.addEventListener("click", function (e) {
				e.preventDefault();
				if(window.confirm("Do you want to resit the quiz?")) {
					emitStatus({
						index:_page_index, // index in player
						status:'resit',
						userdata:[], // blank
						score:0,
						required:quiz.required
					});

					// this is just for the preview within courseassembler
					if (window.location.href.indexOf("blob") === -1) {
						window.location.href=[window.location.origin,window.location.pathname,"?%5B%5D,",_page_index].join("");
					}
					// _userdata = [];
					// window.startQuiz(_userdata);
				}
			}, false);
		}

		emitStatus({
			index:_page_index, // index in player
			status:'term', // inate
			userdata:userdata,
			score:score,
			required:quiz.required
		});
	}

	function navigate(e) {
		e.preventDefault(); // stop #1 turning up on the href
		var href = e.target.getAttribute("href");
		if (!href) return;
		if (href==="#results") {
			endquiz();
		} else {
			var pid = +href.replace(/\#/,''),
				cid = +document.querySelector("nav>a.active").getAttribute("href").replace(/\#/,'');
			if (pid!==cid) render(pid);
		}
	}

	function render(page) {
		[].forEach.call(document.querySelector("nav").children, function (node, index) {
			node.classList[index === page ? "add" : "remove"]("active");
		});
		// find this answer from the userdata
		questions[page].answer = userdata.find(function (record) {
			return (questions[page].uid === record[0]);
		})[1];

		if (questions[page].answer > 0) {

			// lock the question if supported
			/*
			if (!questions[page].locked) {
				questions[page].locked = (quiz.feedback === "answer");
			}
			*/
			// TODO: should this not be ((value & answer)>0) ?
			questions[page].distractors.forEach(function(distractor) {
				if (distractor.value===questions[page].answer) distractor.checked = true;
			});
		}

		// draw the questions to the DOM
		document.querySelector("main").innerHTML = tmpl("main", {
			page: page,
			feedback: quiz.feedback,
			data: questions,
			action: ""
		});

		// render feedback, if available
		if (questions[page].locked && (quiz.feedback === "answer" || (quiz.feedback === "complete" && quiz_finished() === true))) {
			provide_feedback(questions[page]);
		}

		// record which distractor(s) the user has clicked
		// set n in ["q1",n,[0,2,1]]
		document.querySelector(".answers").addEventListener("change", function (e) {
			var slot = userdata.find(function (record) { return (questions[page].uid === record[0]); });
			slot[1] = (e.target.getAttribute("type") === "radio") ? +e.target.value : [].reduce.call(document.querySelectorAll("div.answers :checked"), function(a,b) {
				return a + +b.value; // a plus (cast b's value as int or zero if empty)
			}, 0);
		}, false);

		var next = document.querySelector("div.actions a[href='#next']"),
			submit = document.querySelector("div.actions a[href='#submit']");

		if (quiz.feedback === "complete" || quiz.feedback === "false") {
			if (next) next.classList.remove("hidden");
			if (submit) submit.classList.add("hidden");
			next.addEventListener("click", function (e) {
				e.preventDefault();
				var question = questions[+e.target.closest(".actions").dataset.index]; // +fyi https://stackoverflow.com/a/17106702/1238884
				if (!question.locked) {
					question.answer = [].reduce.call(document.querySelectorAll("div.answers input"), function (accum, curr) {
						var value = +curr.value,
							checked = curr.checked;

						// find question.distractors[this one] and set .checked to curr.checked
						question.distractors.find(function(obj) {
							return (obj.value === value);
						}).checked = checked;

						// return the running total of checked item values
						return accum + (checked ? value : 0);
					}, 0);
				}
				document.querySelector("nav>a.active").nextElementSibling.click();
			}, false);
		}
		if (quiz.feedback === "answer") {
			if (next) next.addEventListener("click", function (e) {
				e.preventDefault();
				document.querySelector("nav>a.active").nextElementSibling.click();
			});
			if (questions[page].locked) {
				if (submit) submit.classList.add("hidden");
				if (next) next.classList.remove("hidden");
			}
			if (submit) submit.addEventListener("click", function (e) {
				e.preventDefault();
				var question = questions[+e.target.closest(".actions").dataset.index]; //page instead?
				if (question.locked) return;

				question.answer = [].reduce.call(document.querySelectorAll("div.answers input"), function (accum, curr) {
					var value = +curr.value,
						checked = curr.checked;

					// find question.distractors[this one] and set .checked to curr.checked
					question.distractors.find(function(obj) {
						return (obj.value === value);
					}).checked = checked;

					// return the running total of checked item values
					return accum + (checked ? value : 0);
				}, 0);
				e.target.classList.add("hidden");
				e.target.nextElementSibling.classList.remove("hidden");
				provide_feedback(question);
				lock_question(question);
				emitStatus({
					index:_page_index, // index in player
					status:'answer',
					userdata:userdata,
					score:calculateScore(),
					required:quiz.required
				});
			}, false);
		}
	}

	// start
	if (quiz_finished()) {
		endquiz();
	} else {
		render(0);
	}

};

// init quiz with an abstract copy of the setup, in case we need to re-use it
window.startQuiz = function (u) {
	initQB(u,JSON.parse(JSON.stringify(setup)));
}

window.addEventListener('load', window.startQuiz.bind(null, _userdata), false);