function __init__quiz() {
	var fileName = $("a.jstree-clicked","#xmlTree").closest("li").attr("filename").replace(".html",".xml");
	$.get("/engine/action.asp?folder=" + _folder + "&action=ajax_loadQuizXml&xml=" + fileName, function(xml) {
	
		var _tab = $("#tabs-5");
	
		var quiz = xml2Obj(xml);
		// console.log(xml,quiz);
		Handlebars.needsPartial("tabs/quiz/partial_quest");
		Handlebars.registerHelper("siblingIndex", function(index,el,sibling,options) {
			if (el[sibling]) return el[sibling][index].textValue;
			return "";
		});
		Handlebars.registerHelper("singleQuote", function(value,options) {
			if (value) return value.replace(/["]/g,"'");
			return "";
		});
		
		console.log("building quiz with", quiz);
		
		// with _tab, bind to all its event-driving elements
		_tab
	
			// build the quiz form from a template	
			.html(Handlebars.getCompiledTemplate("tabs/quiz/template",quiz))
		
			// handle save button
			.on("click", "#quiz-save", function(event) {
				console.log("#quiz-save", event);
				event.preventDefault();
				saveQuiz(fileName);
			})
		
			// handle add question drop down
			.on("change", "#selectadd", function () {
				var $obj = $(this)
					_val = $obj.val(),
					_container = ($(".tab-pane.active").length) ? $(".tab-pane.active .question-append-to") : $(".question-append-to"),
					_nhi = ($(".tab-pane.active").length) ? $("fieldset", ".tab-pane.active .question-append-to").length : $("fieldset", ".question-append-to").length;
				if (!_val) return;
				
				var template = Handlebars.compile("{{> quest}}"),
					question = template({
	                    "id": "",
	                    "type": _val,
	                    "randomize": "false",
	                    "media": { },
	                    "prompt": { "textValue": "Enter the question text here" },
	                    "choiceA": [{"textValue":"Item text"}],
	                    "choiceB": [{"textValue":"Match text"}],
	                    "choice": [{ "correct": "true", "textValue": "Distractor 1"}, { "textValue": "Distractor 2"}],
	                    "feedback": [{ "textValue": "Feedback for items (usually blank)"}, { "textValue": ""}],
	                    "feedbackCorrect": { "textValue": ""},
	                    "feedbackIncorrect": { "textValue": "" },
	                    "review": { "textValue": "" }
					});
				// normally uses @index but we dont' have one in a direct bind, so we have to fudge the html
				question = question.replace(/question\.\./g,"question." + _nhi + ".").replace("badge'>NaN</","badge'>" + (_nhi+1) + "</");
				_container.append(question);
				this.selectedIndex = 0;	// reset select list
			})
			
			// inserting a picture, next to a capable field
			.on("click", "a[href='#insert-picture']", function(event) {
				event.preventDefault();
				var _target = $(this).attr("id", "z" + getUID()).attr("id"); //.closest("div").find(":text,textarea").uniqueId(); // attr("id");
				popWindow({
					command: "settings",
					containerid: _target,
					returnmode: "prepend"
				});
			})
			
			// hotspot help
			.on("click", "a[href='#hotspot-help']", function(event) {
				event.preventDefault();
				bootbox.alert("<h4>Hotspot questions</h4><p>If an image is specified here, you"+
					" should then specify each AREA for the hotspot by pasting in the &lt;area&gt; tag"+
					" itself into each choice, marking also which items are correct as normal.</p>"+
					"<p>The 'answer layout' is ignored for hotspot images, as is Randomize.</p><p>If"+
					" this field is blank, then the question behaves like a regular Multiple"+
					" Choices question.</p>"+
					"<p><b>ToDo:</b></p><p>Implement an in-browser editor for doing this.</p>");
			})
			
			// layout help
			.on("click", "a[href='#layout-help']", function(event) {
				event.preventDefault();
				bootbox.alert("<h4>Layout template</h4><p>Normally, a question is drawn with checkmarks"+
					" down the left, and text next to them. However you can"+
					" also lay out the options next to each other - selected options are highlighted.</p>" +
					"<p>Horizontal layout works best if the distractors contain images, and there are 5 or less distractors.</p>" + 
					"<p>TODO: make the images fit properly.</p>" + 
					"<p>This is ignored for Hotspot and Fill-In question types.</p>");
			})
			
			// review help
			.on("click", "a[href='#review-help']", function(event) {
					event.preventDefault();
					bootbox.alert("<h4>The review field</h4><p>This information isn't shown on a quiz," +
						" but the field can be used to tag a given question, such as during development.</p>"+
						"<p>As always, if in doubt, leave it alone.</p>");
			})
			
			// attempts, time limit help
			.on("click", "a[href='#attempts-help'],a[href='#timelimit-help']", function(event) {
				event.preventDefault();
				bootbox.alert("<h4>Test vs Quiz</h4><p>A <b>test</b> is graded and you can't see"+
					" your answers as you go, and can be timed. A <b>Quiz</b> lets you see your answers"+
					" as you go and is not timed, and can be Restartable."+
					"<h4>Attempts</h4><p>In a <b>test</b> you can limit the number of attempts the user can have"+
					" to pass before they are locked out. This has to then be reset by the SCORM data, which"+
					" depends on the LMS being used.</p>"+
					"<h4>Timed tests</h4>The <b>test</b> can have a time limit put on it. This can be suspended if"+
					" the user leaves the course and comes back. The time left is shown on the screen.</p>");
			})
			
			// restartable dropdown help
			.on("click", "a[href='#restartable-help']", function(event) {
				event.preventDefault();
				bootbox.alert("<h4>Restartable</h4><p>This special mode (normally false) is for Quizzes."+
					" It disables the <b>check answer</b> button, and subsequently reveal answer option, and"+
					" shows the Retake button on the results page. This lets a user wipe their response"+
					" and take the test again. Correct or Incorrect answers are still indicated on"+
					" the Question Index column.</p>");
			})
			
			//test status checkbox help
			.on("click", "a[href='#status-help']", function(event) {
				event.preventDefault();
				bootbox.alert("<h4>Test Status</h4><p>This is a pane on the quiz that shows the pass requirement.</p>"+
					"<p>You can turn off this pane to completely hide the text, which may not be required on some quizzes."+
					" However, this pane also contains the time limit, so be cautious of removing it if the test is timed.</p>");
			})

			// distractor row clone
			.on("click", "a[href='#clone-row']", function(event) {
				event.preventDefault();
				var tbody = $(this).closest("table").find("tbody"),
					trs = tbody.find("tr");
					if (trs.length < 10) {
						tbody.append(trs.filter(":last").clone());
					} else {
						alert('The current quiz implementation only allows you to specify up to 10 distractors.');
					}
			})
			
			// distractor row delete
			.on("click", "a[href='#delete-row']", function(event) {
				event.preventDefault();
				var tbody = $(this).closest("table").find("tbody");
				if ($("tr", tbody).length > 1) $(this).closest("tr").remove(); // don't allow delete last row
			})

			// question remove
			.on("click", "a[href='#remove-question']", function(event) {
				event.preventDefault();
				$(this).closest("fieldset").remove();
			});

		// makes the toolbar stick once you scroll the page, since this page is likely quite long
		// http://stackoverflow.com/questions/784929/what-is-the-not-not-operator-in-javascript !!
		if (!!$("#tab-toolbar", "#tabs-5").offset()) { // make sure ".sticky" element exists
			var stickyTop = $("#tab-toolbar", "#tabs-5").offset().top, // returns number 
				stickWidth = $("#tab-toolbar", "#tabs-5").width(),
				offset = 50;
			$(window).scroll(function(){ // scroll event
				var windowTop = $(window).scrollTop(); // returns number 
				if (stickyTop < (windowTop + offset)){
					$("#tab-toolbar", "#tabs-5").css({ position: 'fixed', top: offset, width: stickWidth, 'box-shadow': '0 3px 5px rgba(0,0,0,.1)' });
				} else {
					$("#tab-toolbar", "#tabs-5").css({'position':'static','box-shadow':'none'});
				}
			});
		}

	});
}