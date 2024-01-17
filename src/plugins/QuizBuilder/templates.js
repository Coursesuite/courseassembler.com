!function(){var t=Handlebars.template;(Handlebars.templates=Handlebars.templates||{})["quiz.renderer"]=t({compiler:[8,">= 4.3.0"],main:function(t,n,e,i,r){var o,a=null!=n?n:t.nullContext||{},s=t.hooks.helperMissing,d="function",c=t.escapeExpression,u=t.lambda,t=t.lookupProperty||function(t,n){if(Object.prototype.hasOwnProperty.call(t,n))return t[n]};return'<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<title>New Quiz</title>\n\t<style>\n:root {\n\t--pageColour: #ffffff;\n\t--baseColour: '+c(typeof(o=null!=(o=t(e,"tint_colour")||(null!=n?t(n,"tint_colour"):n))?o:s)==d?o.call(a,{name:"tint_colour",hash:{},data:r,loc:{start:{line:9,column:15},end:{line:9,column:30}}}):o)+';\n\t--positiveColour: #32dc4a;\n\t--negativeColour: #dc3232;\n}\n\nhtml {\n    font-family: sans-serif;\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%;\n}\nbody {\n\tbackground-color: var(--pageColour);\n    margin: 0;\n    font-size: 16px;\n}\na {\n\ttext-decoration:  none;\n}\na:focus {\n\t-webkit-box-shadow: inset 0 1px 2px rgba(10,10,10,.2);\n\t        box-shadow: inset 0 1px 2px rgba(10,10,10,.2);\n    outline: 0;\n}\na:active, a:hover {\n    outline: 0;\n}\n*, *:after, *:before { -webkit-box-sizing: border-box; box-sizing: border-box; }\n\nh1 {\n\tfont-size: 2em;\n\tfont-weight: normal;\n}\n\nbutton, input {\n    font-family: inherit;\n    font-size: 100%;\n    margin: 0;\n    line-height: normal;\n    text-transform: none;\n}\n\nbutton, html input[type="button"], input[type="reset"], input[type="submit"] {\n    -webkit-appearance: button;\n    cursor: pointer;\n}\nbutton[disabled], html input[disabled] {\n    cursor: default;\n}\ninput[type="checkbox"], input[type="radio"] {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    padding: 0;\n}\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\nheader, nav, main {\n\tmargin:  0 10vw;\n}\n\ndiv.question {\n\tpadding-top: 15px;\n\tpadding-bottom: 15px;\n}\n\n.button {\n\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    border: 1px solid transparent;\n    border-radius: 4px;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n    height: 2.25em;\n    line-height:  1.5;\n\n    background-color: #fff;\n    border-color: #dbdbdb;\n    border-width: 1px;\n    color: #363636;\n    cursor: pointer;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n\n    padding-bottom: calc(.375em - 1px);\n    padding-left: .75em;\n    padding-right: .75em;\n    padding-top: calc(.375em - 1px);\n    text-align: center;\n\n    margin-bottom: .2rem;\n\n}\n.button.active {\n\tborder: 1px solid var(--baseColour);\n\tbackground-color: var(--baseColour);\n\tcolor: #fff;\n\t-webkit-box-shadow: inset 0 0 0px 1px #ffffff;\n\t        box-shadow: inset 0 0 0px 1px #ffffff;\n}\n.button.active:focus {\n\t/* box-shadow: none; */\n}\n.button.positive {\n\tborder: 1px solid var(--positiveColour);\n\tbackground-color: var(--positiveColour);\n\tcolor: #fff;\n}\n.button.negative {\n\tborder: 1px solid var(--negativeColour);\n\tbackground-color: var(--negativeColour);\n\tcolor: #fff;\n}\n.button.positive.active, .button.negative.active {\n\tborder: 1px solid var(--baseColour);\n}\nbutton.hidden {\n\tdisplay: none;\n}\n\nnav {\n\tdisplay: -webkit-box;\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n\nnav > a:not(:first-of-type) {\n\tmargin-left: 4px;\n}\n\nnav > .spacer {\n\t-webkit-box-flex: 1;\n\t    -ms-flex-positive: 1;\n\t        flex-grow: 1;\n}\n\np.text-center {\n\ttext-align:  center;\n}\n\nmain p.text-center img,\nmain p.text-center iframe {\n\tmax-width: 100%;\n}\n\n.control {\n\tfont-size: inherit;\n\tposition: relative;\n\tdisplay: block;\n\tmargin-bottom: 30px;\n\tpadding-left: 30px;\n\tcursor: pointer;\n}\n\n.control input {\n\tposition: absolute;\n\tz-index: -1;\n\topacity: 0;\n}\n\n.control__indicator {\n\tposition: absolute;\n\ttop: 2px;\n\tleft: 0;\n\twidth: 20px;\n\theight: 20px;\n\tbackground: #f4f4f4;\n}\n\n.control--radio .control__indicator {\n\tborder-radius: 4px;\n}\n\n/* Hover and focus states */\n.control div.answer,\n.control:hover input ~ .control__indicator,\n.control input:focus ~ .control__indicator {\n\tbackground: #f4f4f4;\n}\n\n/* Checked state */\n.control input:disabled:checked ~ .control__indicator,\n.control input:disabled:checked ~ .answer,\n.control input:checked ~ .control__indicator {\n\tbackground: var(--baseColour);\n}\n\n\n.control.positive input:checked ~ .answer,\n.control.positive input:checked ~ .control__indicator {\n\tbackground: var(--positiveColour);\n}\n.control.negative input:checked ~ .answer,\n.control.negative input:checked ~ .control__indicator {\n\tbackground: var(--negativeColour);\n}\n\n/* Hover state whilst checked */\n.control input:checked ~ .answer,\n.control:hover input:not([disabled]):checked ~ .control__indicator,\n.control input:checked:focus ~ .control__indicator {\n\tbackground: var(--baseColour);\n\tcolor: #fff;\n}\n\n/* Disabled state */\n\n.control input:disabled ~ .answer,\n.control input:disabled ~ .control__indicator {\n\tpointer-events: none;\n\topacity: .6;\n\tbackground: #dbdbdb;\n}\n\n/* Check mark */\n.control__indicator:after {\n\tposition: absolute;\n\tdisplay: none;\n\tcontent: \'\';\n}\n\n/* Show check mark */\n.control input:checked ~ .control__indicator:after {\n\tdisplay: block;\n}\n\n/* Radio button inner circle */\n.control--radio .control__indicator:after {\n\ttop: 7px;\n\tleft: 7px;\n\twidth: 6px;\n\theight: 6px;\n\tborder-radius: 50%;\n\tbackground: #fff;\n}\n\n/* Check mark */\n.control__indicator:after {\n\tposition: absolute;\n\tdisplay: none;\n\tcontent: \'\';\n}\n\n/* Show check mark */\n.control input:checked ~ .control__indicator:after {\n\tdisplay: block;\n}\n\n/* Checkbox tick */\n.control--checkbox .control__indicator:after {\n\ttop: 3px;\n\tleft: 7px;\n\twidth: 6px;\n\theight: 12px;\n\t-webkit-transform: rotate(45deg);\n\t    -ms-transform: rotate(45deg);\n\t        transform: rotate(45deg);\n\tborder: solid #fff;\n\tborder-width: 0 4px 4px 0;\n}\n\n/* Disabled tick colour */\n.control--checkbox input:disabled ~ .control__indicator:after {\n\tborder-color: #7b7b7b;\n}\n\n\ndiv.answer, div.feedback {\n\tborder-radius: 4px;\n\tpadding:  .25em 1em;\n}\n.control div.answer + div.feedback {\n\tmargin-top: .5em;\n}\n\ndiv.feedback.none {\n    background-color: #dbdbdb;\n    border: 1px solid #7b7b7b;\n}\n\ndiv.feedback.positive {\n    background-color: #c6eac6;\n    border: 1px solid #a2dda2;\n}\ndiv.feedback.negative {\n\tbackground-color: #f8ecec;\n    border: 1px solid #eac7c7;\n}\n.actions p {\n\tpadding-left: 30px;\n}\n.actions.resit p {\n\tpadding-left: 0;\n}\n.hidden { display:  none; }\n\n@media all and (max-width: 480px) { /* give indication that question index is overflowing */\n\tbody > nav {\n\t\toverflow: auto;\n\t\tbackground-attachment: local;\n\t\tbackground: rgb(128,128,128);\n\t\tbackground: -moz-radial-gradient(circle, rgba(128,128,128,0) 0%, rgba(255,255,255,0) 95%, rgba(128,128,128,0.5) 100%);\n\t\tbackground: -webkit-radial-gradient(circle, rgba(128,128,128,0) 0%, rgba(255,255,255,0) 95%, rgba(128,128,128,0.5) 100%);\n\t\tbackground: radial-gradient(circle, rgba(128,128,128,0) 0%, rgba(255,255,255,0) 95%, rgba(128,128,128,0.5) 100%);\n\t\tfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#808080",endColorstr="#808080",GradientType=1);\n\t\tpadding: 5px 10px;\n\t}\n}\n</style>\n\t<script>window.setup='+(null!=(e=typeof(o=null!=(o=t(e,"quiz_json")||(null!=n?t(n,"quiz_json"):n))?o:s)==d?o.call(a,{name:"quiz_json",hash:{},data:r,loc:{start:{line:328,column:22},end:{line:328,column:37}}}):o)?e:"")+'<\/script>\n\t<script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js"><\/script>\n\t<script crossorigin="anonymous" src="https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2.1.2/dist/css-vars-ponyfill.min.js"><\/script>\n\t<script>\n\nvar qs = window.location.search.split("?")[1] ? window.location.search.split("?")[1].split(",") : ["[]",0];\nvar _userdata=JSON.parse(unescape(qs[0]?qs[0]:"[]"));\nvar _page_index = qs[1] ? +qs[1] : -1;\n\n// john resig\'s micro javascript template\n(function(){\n  var cache = {};\n  this.tmpl = function tmpl(str, data){\n    var fn = !/\\W/.test(str) ?\n      cache[str] = cache[str] ||\n        tmpl(document.getElementById(str).innerHTML) :\n      new Function("obj",\n        "var p=[],print=function(){p.push.apply(p,arguments);};" +\n        "with(obj){p.push(\'" +\n        str\n          .replace(/[\\r\\t\\n]/g, " ")\n          .split("<%").join("\\t")\n          .replace(/((^|%>)[^\\t]*)\'/g, "$1\\r")\n          .replace(/\\t=(.*?)%>/g, "\',$1,\'")\n          .split("\\t").join("\');")\n          .split("%>").join("p.push(\'")\n          .split("\\r").join("\\\\\'")\n      + "\');}return p.join(\'\');");\n    return data ? fn( data ) : fn;\n  };\n})();\n\n// find in json\nArray.prototype.find = Array.prototype.find || function(callback) {\n  if (this === null) {\n    throw new TypeError(\'Array.prototype.find called on null or undefined\');\n  } else if (typeof callback !== \'function\') {\n    throw new TypeError(\'callback must be a function\');\n  }\n  var list = Object(this);\n  // Makes sures is always has an positive integer as length.\n  var length = list.length >>> 0;\n  var thisArg = arguments[1];\n  for (var i = 0; i < length; i++) {\n    var element = list[i];\n    if ( callback.call(thisArg, element, i, list) ) {\n      return element;\n    }\n  }\n};\n\n// dispatch a browser event\nfunction emitStatus(status) {\n\t// console.dir(status);\n\tparent.dispatchEvent(new CustomEvent("statuschange", {detail: status}));\n}\n\n// fischer-yates algorithm\nfunction shuffle(a){for(var b=a.length-1;0<b;b--){var c=Math.floor(Math.random()*(b+1)),_ref=[a[c],a[b]];a[b]=_ref[0],a[c]=_ref[1]}}\n\n// a quiz question is either a radio (single choice) or checkbox (multiple choice)\nfunction get_control_type(question, l,f) {\n\t// the number of bits is implied by the question.required\n\tl = Math.floor(Math.log(question.required)/Math.LN2)+1;\n\t// a square can only occupy one bit, so if it\'s not a square, the required mask must represent multiple squares\n\tf = Array.apply(null, new Array(l)).map(function(_,i){return Math.pow(2,i)});\n\t// multiple squares = checkbox\n\treturn (f.indexOf(question.required)===-1) ? "checkbox":"radio";\n}\n\nfunction initQB(userdata, quiz) {\n\n\t// 1. deep clone the "quiz" object\n\tvar questions = JSON.parse(JSON.stringify(quiz.questions));\n\n\t// sanity checking\n\tif (quiz.show>questions.length) quiz.show = questions.length;\n\tif (quiz.required>quiz.show) quiz.required = quiz.show;\n\n\tif (userdata.length === 0) {\n\t\t// 3a. otherwise shuffle the resulting questions\n\t\tif (quiz.randomise) shuffle(questions);\n\n\t\t// 3b. crop the questions at the show limit\n\t\tquestions.splice(quiz.show);\n\n\t\t// and store this in the userdata\n\t\tuserdata = questions.map(function(q,i) {\n\t\t\t// a copy of the question distractors that contains an index and required property (which we don\'t want to expose)\n\t\t\tq.answer = 0;\n\t\t\tq.locked = false;\n\t\t\tvar source = q.distractors.map(function(a,b) {\n\t\t\t\ta.index = b;\n\t\t\t\ta.required = ((q.required & Math.pow(2,b)) > 0); // xor, e.g. (3 xor 2^index)>0\n\t\t\t\treturn a;\n\t\t\t}), dest =[];\n\n\t\t\tif (q.show < q.distractors.length) { // must randomise\n\n\t\t\t\t// randomise the source distractor list\n\t\t\t\tshuffle(source)\n\n\t\t\t\t// ensure the correct answers fall in the set of possible distractors\n\t\t\t\tfor (var i=0; i < source.length; i++) {\n\t\t\t\t\tif (source[i].required === true) {\n\t\t\t\t\t\tdest.push(source[i].index);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// fill remaining space with distractors\n\t\t\t\tfor (var i=dest.length; dest.length < q.show; i++) {\n\t\t\t\t\tif (dest.indexOf(source[i].index) === -1) {\n\t\t\t\t\t\tdest.push(source[i].index);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\t// randomise the final distractor order\n\t\t\t\tshuffle(dest);\n\n\t\t\t} else { // just show all distractors in natural order\n\n\t\t\t\tfor (var i=0; i < source.length; i++) {\n\t\t\t\t\tdest.push(source[i].index);\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn [q.uid, 0, dest, q.locked]; // question-in-order, my-value, distractors-in-order, question locked value\n\t\t});\n\n\t} // else the userdata exists, which means we already have the randomised question set\n\n\temitStatus({\n\t\tindex:_page_index,\n\t\tstatus:\'init\', // ialise,\n\t\tuserdata:userdata,\n\t\tscore:0,\n\t\trequired:quiz.required\n\t});\n\n\t// modify questions to be in order we want to display them, and throw on some runtime values we need\n\tquestions = userdata.map(function(value) {\n\t\tvar uid = value[0],\n\t\t\tval = value[1], // user chosen distractor value\n\t\t\tq = quiz.questions.find(function(obj) {\n\t\t\t\treturn (obj.uid === uid);\n\t\t\t}),\n\t\t\tresult = {},\n\t\t\tqd = q.distractors, // question distractors\n\t\t\tud = value[2], // user pre-randomised and cropped ids\n\t\t\tnd = []; // new distractor array\n\t\t\tq.answer = val;\n\t\t\tq.locked = value[3]; //(quiz.feedback==="answer" && val>0); // TODO: confirm lock logic\n\t\tfor (var i=0; i<ud.length; i++) {\n\t\t\tvar d = qd[ud[i]];\n\t\t\td.value = Math.pow(2,ud[i]); // the value of the distractor; add the checked values together and compare to the required answer (no partial marking)\n\t\t\tif ((val & d.value) > 0) d.checked = true; // bitwise and, e.g. 0101 & 1101 = 0101\n\t\t\tnd.push(d);\n\t\t}\n\t\tq.distractors = nd; // overwrite with updated distractor list, in presentation order\n\t\treturn q;\n\t});\n\n\t// questions is now built from the modified userdata\n\n\t// build the page header from the quiz setup\n\tdocument.querySelector("header").innerHTML = tmpl("header", quiz);\n\n\t// build the navigation from the userdata\n\tnav = document.querySelector("nav");\n\tnav.addEventListener("click", navigate, false);\n\tnav.innerHTML = tmpl("navigation",{questions:userdata});\n\n\tfunction calculateScore() {\n\t\treturn questions.reduce(function(accum,curr) {\n\t\t\treturn accum+(curr.answer===curr.required?1:0);\n\t\t},0);\n\t}\n\n\tfunction provide_feedback(question) {\n\t\tvar state = question.answer===0 ? "none" : question.answer===question.required ? "positive" : "negative";\n\t\t// clean up old state (might not be necessary)\n\t\tArray.prototype.forEach.call(document.querySelectorAll("div.answers .positive, div.answers .none, div.answers .negative"), function (node) {\n\t\t\tnode.classList.remove("positive","negative","none");\n\t\t})\n\t\tvar existing = document.querySelector("div.answers div.feedback");\n\t\tif (existing) existing.parentNode.removeChild(existing);\n\n\t\t// apply new state\n\t\tvar checked = document.querySelectorAll("div.answers input:checked");\n\t\tif (checked.length === 0 && question.feedback.none && question.feedback.none.length) { // apply "none" feedback\n\t\t\tvar div = document.createElement("div");\n\t\t\tdiv.classList.add("feedback","none");\n\t\t\tdiv.innerHTML = "<p>" + question.feedback[state] + "</p>";\n\t\t\tdocument.querySelector("div.answers").appendChild(div);\n\t\t}\n\t\tArray.prototype.forEach.call(checked, function (input) { // Colour in selections\n\t\t\tinput.parentNode.classList.add(state);\n\t\t});\n\t\tif (question.feedback[state].length && checked.length > 0) { // apply positive/negative feedback\n\t\t\tvar div = document.createElement("div");\n\t\t\tdiv.classList.add("feedback");\n\t\t\tdiv.classList.add(state);\n\t\t\tdiv.innerHTML = "<p>" + question.feedback[state] + "</p>";\n\t\t\tdocument.querySelector("div.answers").appendChild(div);\n\t\t}\n\n\t\t// apply feedback to nav (no none state)\n\n\t\tif (quiz.feedback === "answer" && !quiz_finished()) {\n\t\t\tvar navNode = document.querySelector("nav>a.active");\n\t\t\tvar pagenum = navNode.getAttribute("href").replace(/\\#/,\'\');\n\t\t\tif (questions[pagenum].answer > 0) {\n\t\t\t\tnavNode.classList.add(questions[pagenum].answer === questions[pagenum].required ? "positive" : "negative");\n\t\t\t}\n\t\t}\n\t\tif ((quiz.feedback === "complete" && quiz_finished()) || (quiz.feedback === "answer" && quiz_finished())) {\n\t\t\tvar nodes = document.querySelectorAll("nav>a");\n\t\t\tfor (var i=0; i<questions.length; i++) {\n\t\t\t\tif (questions[i].answer>0) nodes[i].classList.add(questions[i].answer===questions[i].required ? "positive" : "negative");\n\t\t\t}\n\t\t}\n\t}\n\n\tfunction lock_question(question) {\n\t\tquestion.locked = true; // having answered it\n\t\tArray.prototype.forEach.call(document.querySelectorAll("div.answers input"), function (node) {\n\t\t\tnode.setAttribute("disabled","disabled");\n\t\t});\n\t\tuserdata.find(function (record) { // will putting this in a var fuck it up?\n\t\t\treturn (question.uid === record[0]);\n\t\t})[1] = question.answer;\n\t\tuserdata.find(function (record) {\n\t\t\treturn (question.uid === record[0]);\n\t\t})[3] = question.locked;\n\t}\n\n\tfunction lock_quiz() {\n\t\tquestions.forEach(function(q) {\n\t\t\tq.locked = true;\n\t\t});\n\t}\n\n\t// determines if quiz is finished or not (based on locked questions)\n\tfunction quiz_finished() { // returns true if quiz is finished, false if not\n\t\tvar finished = true;\n\t\tquestions.forEach(function(q) { // any unlocked q\'s means unfinished quiz\n\t\t\tif (q.locked === false) { finished = false;}\n\t\t});\n\t\treturn finished;\n\t}\n\n\t// Check each question and set nav feedback\n\tfunction eval_quiz() {\n\t\tArray.prototype.forEach.call(document.querySelector("nav").children, function (node, page) {\n\t\t\tif (node.getAttribute("href") === "#results") return;\n\t\t\tvar question = questions[page],\n\t\t\t\tanswer = userdata.find(function (record) {\n\t\t\t\t\treturn (question.uid === record[0]);\n\t\t\t\t})[1];\n\t\t\tquestion.locked = true;\n\t\t\tquestion.answer = answer;\n\t\t\tuserdata.find(function (record) {\n\t\t\t\treturn (question.uid === record[0]);\n\t\t\t})[3] = question.locked;\n\t\t\tnode.classList.add(question.answer===0?"none":question.answer===question.required ? "positive":"negative");\n\t\t});\n\t}\n\n\tfunction endquiz() {\n\t\tvar check = userdata.reduce(function(a,b) {return a + (b[1]>0?1:0)}, 0); // (number of answered pages) userdata might have loaded with answers already, so is more authoritative\n\t\tif (quiz_finished() === false) {\n\t\t\tvar alert = (check==questions.length) ? "Do you want to finish the quiz?" : "You haven\'t answered all the questions. Do you want to finish the quiz?"; //(quiz.feedback === "false" || quiz.feedback === "complete") &&\n\t\t\tif(!window.confirm(alert)) {\n\t\t\t\tvar node=document.querySelector("nav>a.active"), i = [].indexOf.call(node.parentNode.children, node); // find selected node index\n\t\t\t\treturn render(i);\n\t\t\t}\n\t\t}\n\t\teval_quiz();\n\t\tArray.prototype.forEach.call(document.querySelector("nav").children, function (node, index) {\n\t\t\tnode.classList[node.getAttribute("href") === "#results" ? "add" : "remove"]("active");\n\t\t});\n\t\tvar score = calculateScore();\n\t\tquiz.finished = true;\n\t\tlock_quiz();\n\t\tdocument.querySelector("main").innerHTML = tmpl("endpage", {\n\t\t\tscore: score,\n\t\t\ttotal: quiz.show,\n\t\t\trequired: quiz.required,\n\t\t\tresit: quiz.resit\n\t\t});\n\n\t\t// after template render\n\t\tvar resit = document.querySelector("div.actions a[href=\'#resit\']");\n\t\tif (resit) {\n\t\t\tresit.addEventListener("click", function (e) {\n\t\t\t\te.preventDefault();\n\t\t\t\tif(window.confirm("Do you want to resit the quiz?")) {\n\t\t\t\t\temitStatus({\n\t\t\t\t\t\tid: window.name,\n\t\t\t\t\t\tstatus:\'resit\',\n\t\t\t\t\t});\n\n\t\t\t\t\t// this is just for the preview within courseassembler\n\t\t\t\t\tif (window.location.href.indexOf("blob") === -1) {\n\t\t\t\t\t\twindow.location.href=[window.location.origin,window.location.pathname,"?%5B%5D,",_page_index].join("");\n\t\t\t\t\t}\n\t\t\t\t\t// _userdata = [];\n\t\t\t\t\t// window.startQuiz(_userdata);\n\t\t\t\t}\n\t\t\t}, false);\n\t\t}\n\n\t\temitStatus({\n\t\t\tindex:_page_index, // index in player\n\t\t\tstatus:\'term\', // inate\n\t\t\tuserdata:userdata,\n\t\t\tscore:score,\n\t\t\trequired:quiz.required\n\t\t});\n\t}\n\n\tfunction navigate(e) {\n\t\te.preventDefault(); // stop #1 turning up on the href\n\t\tvar href = e.target.getAttribute("href");\n\t\tif (!href) return;\n\t\tif (href==="#results") {\n\t\t\tendquiz();\n\t\t} else {\n\t\t\tvar pid = +href.replace(/\\#/,\'\'),\n\t\t\t\tcid = +document.querySelector("nav>a.active").getAttribute("href").replace(/\\#/,\'\');\n\t\t\tif (pid!==cid) render(pid);\n\t\t}\n\t}\n\n\tfunction render(page) {\n\t\tArray.prototype.forEach.call(document.querySelector("nav").children, function (node, index) {\n\t\t\tnode.classList[index === page ? "add" : "remove"]("active");\n\t\t});\n\t\t// find this answer from the userdata\n\t\tquestions[page].answer = userdata.find(function (record) {\n\t\t\treturn (questions[page].uid === record[0]);\n\t\t})[1];\n\n\t\tif (questions[page].answer > 0) {\n\n\t\t\t// lock the question if supported\n\t\t\t/*\n\t\t\tif (!questions[page].locked) {\n\t\t\t\tquestions[page].locked = (quiz.feedback === "answer");\n\t\t\t}\n\t\t\t*/\n\t\t\t// TODO: should this not be ((value & answer)>0) ?\n\t\t\tquestions[page].distractors.forEach(function(distractor) {\n\t\t\t\tif (distractor.value===questions[page].answer) distractor.checked = true;\n\t\t\t});\n\t\t}\n\n\t\t// draw the questions to the DOM\n\t\tdocument.querySelector("main").innerHTML = tmpl("main", {\n\t\t\tpage: page,\n\t\t\tfeedback: quiz.feedback,\n\t\t\tdata: questions,\n\t\t\taction: ""\n\t\t});\n\n\t\t// render feedback, if available\n\t\tif (questions[page].locked && (quiz.feedback === "answer" || (quiz.feedback === "complete" && quiz_finished() === true))) {\n\t\t\tprovide_feedback(questions[page]);\n\t\t}\n\n\t\t// record which distractor(s) the user has clicked\n\t\t// set n in ["q1",n,[0,2,1]]\n\t\tdocument.querySelector(".answers").addEventListener("change", function (e) {\n\t\t\tvar slot = userdata.find(function (record) { return (questions[page].uid === record[0]); });\n\t\t\tslot[1] = (e.target.getAttribute("type") === "radio") ? +e.target.value : [].reduce.call(document.querySelectorAll("div.answers :checked"), function(a,b) {\n\t\t\t\treturn a + +b.value; // a plus (cast b\'s value as int or zero if empty)\n\t\t\t}, 0);\n\t\t}, false);\n\n\t\tvar next = document.querySelector("div.actions a[href=\'#next\']"),\n\t\t\tsubmit = document.querySelector("div.actions a[href=\'#submit\']");\n\n\t\tif (quiz.feedback === "complete" || quiz.feedback === "false") {\n\t\t\tif (next) next.classList.remove("hidden");\n\t\t\tif (submit) submit.classList.add("hidden");\n\t\t\tnext.addEventListener("click", function (e) {\n\t\t\t\te.preventDefault();\n\t\t\t\tvar question = questions[+e.target.closest(".actions").dataset.index]; // +fyi https://stackoverflow.com/a/17106702/1238884\n\t\t\t\tif (!question.locked) {\n\t\t\t\t\tquestion.answer = [].reduce.call(document.querySelectorAll("div.answers input"), function (accum, curr) {\n\t\t\t\t\t\tvar value = +curr.value,\n\t\t\t\t\t\t\tchecked = curr.checked;\n\n\t\t\t\t\t\t// find question.distractors[this one] and set .checked to curr.checked\n\t\t\t\t\t\tquestion.distractors.find(function(obj) {\n\t\t\t\t\t\t\treturn (obj.value === value);\n\t\t\t\t\t\t}).checked = checked;\n\n\t\t\t\t\t\t// return the running total of checked item values\n\t\t\t\t\t\treturn accum + (checked ? value : 0);\n\t\t\t\t\t}, 0);\n\t\t\t\t}\n\t\t\t\tdocument.querySelector("nav>a.active").nextElementSibling.click();\n\t\t\t}, false);\n\t\t}\n\t\tif (quiz.feedback === "answer") {\n\t\t\tif (next) next.addEventListener("click", function (e) {\n\t\t\t\te.preventDefault();\n\t\t\t\tdocument.querySelector("nav>a.active").nextElementSibling.click();\n\t\t\t});\n\t\t\tif (questions[page].locked) {\n\t\t\t\tif (submit) submit.classList.add("hidden");\n\t\t\t\tif (next) next.classList.remove("hidden");\n\t\t\t}\n\t\t\tif (submit) submit.addEventListener("click", function (e) {\n\t\t\t\te.preventDefault();\n\t\t\t\tvar question = questions[+e.target.closest(".actions").dataset.index]; //page instead?\n\t\t\t\tif (question.locked) return;\n\n\t\t\t\tquestion.answer = [].reduce.call(document.querySelectorAll("div.answers input"), function (accum, curr) {\n\t\t\t\t\tvar value = +curr.value,\n\t\t\t\t\t\tchecked = curr.checked;\n\n\t\t\t\t\t// find question.distractors[this one] and set .checked to curr.checked\n\t\t\t\t\tquestion.distractors.find(function(obj) {\n\t\t\t\t\t\treturn (obj.value === value);\n\t\t\t\t\t}).checked = checked;\n\n\t\t\t\t\t// return the running total of checked item values\n\t\t\t\t\treturn accum + (checked ? value : 0);\n\t\t\t\t}, 0);\n\t\t\t\te.target.classList.add("hidden");\n\t\t\t\te.target.nextElementSibling.classList.remove("hidden");\n\t\t\t\tprovide_feedback(question);\n\t\t\t\tlock_question(question);\n\t\t\t\temitStatus({\n\t\t\t\t\tindex:_page_index, // index in player\n\t\t\t\t\tstatus:\'answer\',\n\t\t\t\t\tuserdata:userdata,\n\t\t\t\t\tscore:calculateScore(),\n\t\t\t\t\trequired:quiz.required\n\t\t\t\t});\n\t\t\t}, false);\n\t\t}\n\t}\n\n\t// start\n\tif (quiz_finished()) {\n\t\tendquiz();\n\t} else {\n\t\trender(0);\n\t}\n\n};\n\n// init quiz with an abstract copy of the setup, in case we need to re-use it\nwindow.startQuiz = function (u) {\n\tcssVars({include:\'style\'});\n\tinitQB(u,JSON.parse(JSON.stringify(setup)));\n}\n\nwindow.addEventListener(\'load\', window.startQuiz.bind(null, _userdata), false);\n<\/script>\n</head>\n<body>\n\t<header></header>\n\t<nav></nav>\n\t<main></main>\n\t<script type="text/html" id="header">\n\t\t<h1><%=title%></h1>\n\t<\/script>\n\t<script type="text/html" id="navigation">\n\t\t<% for (var i=0; i < questions.length; i++) { %>\n\t\t<a href="#<%=i%>" class="button"><%=(i+1)%></a>\n\t\t<% } %>\n\t\t<a href="#results" class="button">Results</a>\n\t<\/script>\n\t<script type="text/html" id="main">\n\t\t<div class="question">\n\t\t\t<%=data[page].media%>\n\t\t\t<br>\n\t\t\t<%=data[page].text%>\n\t\t</div>\n\t\t<div class="answers">\n\t\t\t<% for (var i=0, controlType = get_control_type(data[page]); i < data[page].distractors.length; i++ ) { %>\n\t\t\t<label class="control control--<%=controlType%>">\n\t\t\t\t<input type="<%=controlType%>" name="answer" value="<%=data[page].distractors[i].value%>" <% if (data[page].distractors[i].checked) { %>checked="checked"<% } %> <% if (data[page].locked) { %>disabled="disabled"<% } %>/>\n\t\t\t\t<div class="answer">\n\t\t\t\t\t<%=data[page].distractors[i].text%>\n\t\t\t\t</div>\n\t\t\t\t<div class="control__indicator"></div>\n\t\t\t</label>\n\t\t\t<% } %>\n\t\t</div>\n\t\t<div class="actions" data-index="<%=page%>">\n\t\t\t<p>\n\t\t<% if (feedback === "answer" && !data[page].locked) { %>\n\t\t\t<a href="#submit" class="button">'+c(u(null!=(e=null!=n?t(n,"buttons"):n)?t(e,"check"):e,n))+'</a>\n\t\t<% } %>\n\t\t\t<a href="#next" class="button ">'+c(u(null!=(e=null!=n?t(n,"buttons"):n)?t(e,"next"):e,n))+'</a>\n\t\t\t</p>\n\t\t</div>\n\t<\/script>\n\t<script type="text/html" id="endpage">\n\t\t<p>Thanks for completing the quiz.</p>\n\t\t<p>Your score is <%=score%> out of <%=total%>, which means you <% if (score >= required) { %>passed<% } else { %>failed<% } %>.</p>\n\t\t<% if (score < required && resit) { %>\n\t\t<div class="actions resit">\n\t\t\t<p><a href="#resit" class="button">'+c(u(null!=(e=null!=n?t(n,"buttons"):n)?t(e,"resit"):e,n))+"</a></p>\n\t\t</div>\n\t\t<% } %>\n\t<\/script>\n</body>\n</html>\n"},useData:!0})}();