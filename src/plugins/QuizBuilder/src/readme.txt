Quiz questions can be either single choice or multiple choice.

Single choice is rendered as a radio in a group where you can only select one item.
Multiple choices is rendered as a checkbox where you can select more than one item. You can't have a single checkbox answer.
For multiple choices questions, you can't get "partial" marks for choosing some of the correct options.
A correctly answered question is worth 1 point. An incorrect question is worth 0 points.
A quiz can be sat more than once, with no logic to store data about subsequent attempts.
No scorm interaction data is recorded.
The order of questions in a randomised order quiz is not stored and may be different between viewings.

Question Structure
==================

The questions are stored in JSON. The structure is like this:

{
  "title": "My New Quiz",		// title of the quiz on the top of the page
  "show": 10,					// number of questions to present to the user, equal or less to the number in the questions array
  "required": "10",				// the score the user needs to achieve
  "randomise": true,			// whether to present the order of questions randomly or in the order shown in the json
  "finished": false,			// whether the quiz has been finished
  "resit": false,				// whether to allow the quiz to be taken multiple times
  "feedback": "answer",			// when to mark questions, and when to show feedback to individual questions
  "strings": {
    "resit": "Resit quiz",		// resit button text
    "answer": "Check answer",	// check answer button text
    "next": "Next",				// next question button text
    "results": "Results",		// results button text
    "completion": ""			// the javascript template string to present to the user on the results page, with variable support
  },
  "colour": "#525252",			// the colour theme of the buttons
  "source": "docninja.quiz",	// the name of the source file
  "questions": [
    {
      "uid": "q1",				// string, question identifier
      "media": "",				// html, media to show to the user
      "order": 1,				// the order to present this question to the user if not randomised
      "text": "",				// the question text
      "show": 5,				// the number of distractors to show. If less than the length of the distractor array, the order is randomised
      "required": 2,			// the BINARY SUM of the set of distractors that make up the correct answer (see 'Distractor Value Logic' below)
      "distractors": [			// the distractors
        {
          "text": "14 grams\n"
        },
        {
          "text": "1.4 kilograms\n"
        },
        {
          "text": "14 kilograms\n"
        },
        {
          "text": "1.4 Megagrams\n"
        },
        {
          "text": "14 Megagrams"
        }
      ],
      "feedback": {				
        "none": "",				// feedback to the user regardless of whether their answer was correct or incorrect
        "positive": "",			// feedback to the user if their answer was correct
        "negative": ""			// feedback to the user if their answer was incorrect
      }
    }
   ]
}


Distractor Value Logic
======================

Distractors are assigned a power-of-two value starting at zero in the order they are shown in the array. These values are assigned before any distractor-order randomisation takes place. Given the above example, this means the values are

order	power	value	text
0		2^0 	1		14 grams
1		2^1 	2		1.4 kilograms
2		2^2 	4		14 kilograms
3		2^3 	8		1.4 Megagrams
4		2^4 	16		14 Megagrams

The "required" answer is stored as a sum of the distractors that are correct for the question. This is called a bit mask. The benefit of this system is that a single numerical value can be used to determine each of the distractors that made up the answer AS WELL AS whether the answer should be presented as single choice or multiple choices.

If the required answer is "2" this means the correct distractor will be "14 kilograms" - AND - that the question MUST BE a single choice. This is because the required answer is a exact power of 2 (no remainder).

If the required answer is "7" this means the correct distractors are "14 grams, 1.4 kilograms, 14 kilograms" because the value of each of those answers added together adds up to 7 - AND - the question must be a multiple choice. This is because IF the value of the distractor LOGICAL AND with the value of the answer is more than zero, then the answer must contain the value of the distractor in the sum.


Distractor Presentation Logic
=============================

When choosing distractors you must first determine all the correct distractors. These must be presentable to the user.

The answers that might already be chosen by the user also need to be presented to the user.

If there are any distractor places left (e.g. the count of all above remains less than "show") then populate distractors randomly from what remains

If the "show" value is less than the number of distractors available in the question, shuffle the order of the final set.


User Data Persistence
=====================

Userdata represents the state map of the users recorded response to questions. It has the form

[
	["q1",2,[2,1,3]],
]

The array has the form:
"q1"		the identifier of the question. This isn't an array index since the questions may be rendered in randomised order
2			the sum of the values of the selected distractors
[2,1,3,0]	the indexes of the distractors chosen at the time the question was first rendered


Development and Build Process
=============================

Developing changes to the quiz is done by running a script file. This performs two main steps - building a template that can be used by the course assembler engine to publish quizzes, and building an example template for use in development and debugging. To get started, run ./compile.bash in the QuizBuilder/src folder. This:

1. Combines the css and javascript and the build file into an output file
2. Compiles the output file as a handlebars template which is stored in the parent folder (template.js)
3. Incorporates a sample "quiz.json" into the output file so the quiz can run
4. Renames the output file to "debug.html" for testing / development

Next steps:

To make the template available to Course Assembler you need to re-open the page (if not in minified mode, e.g. debug environment), or run $/src/compile_scripts.bash which includes the plugins' templates.js function in the main handlebars runtime library so its available to the plugin for compilation.

Editing Quizzes
===============

Editing is handled by the "edit.html" file in the QuizBuider folder. The editor loads the quiz data directly from local storage by way of being passed the file-id via the querystring. Editing and saving takes place by storing the JSON back to localstorage, and compiling the JSON to html for previewing / downloading.
