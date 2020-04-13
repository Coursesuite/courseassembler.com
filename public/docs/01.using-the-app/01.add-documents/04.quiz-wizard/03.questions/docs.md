---
title: 'Editing Questions'
media_order: 'QuizEditor_questions.png,Quiz_question_numbers.png,Quiz_question_add.png,Quiz_video_embed.png,Quiz_video_embed2.png,Quiz_image_embed.png,Quiz_image_embed2.png,QuizEditor_distractor_correct.png,QuizEditor_distractor_delete.png,Quiz_distractor_show.png,Quiz_Save2a.png,Quiz_Save2b.png,QuizEditor_Delete.png,QuizEditor_distractor_add.png,Quiz_question_field.png,quiz_distractor_field.png,Quiz_feedback_incorrect_field.png,Quiz_feedback_skipped_field.png,Quiz_feedback_correct_field.png,Quiz_feedback_incorrect.png,Quiz_feedback_skipped.png,Quiz_feedback_correct.png,Quiz_image_embed_display.png,Quiz_video_embed_display.png,Quiz_question_rearrange.gif'
taxonomy:
    category:
        - docs
        - document-ninja
visible: true
---

This is the second area of the Quiz wizard, and the options here allow you to add and manage your quiz questions.

![Quiz Question Editor](QuizEditor_questions.png?resize=800,743)

! Course Assembler quizzes only support _Single Choice_ and _Multiple Choice_ questions - if you're looking for a quiz with more options, the [Course Engine's capabilities](/engine/course-landing-page/properties/quiz/question-types) may suit your needs!

---

#### Questions in quiz

These are numbered buttons for ever question in your quiz. To edit a question, simply click on a button to open it below.

![Question number buttons](Quiz_question_numbers.png)

If the _Question ordering_ setting is using _Natural order_, you can click and drag the number buttons left and right to rearrange the order of your questions. If set to _Random order_, this functionality will not work.

![Question number rearranging](Quiz_question_rearrange.gif)

#### Add new question

To add a new question, click the purple '+' button to the right of this area.

![Add new question button](Quiz_question_add.png?resize=800,90)

! Don't forget to save a question before switching to another one - otherwise, changes may be lost!

#### Question media

This field allows you to place an optional image or video above the question text.

For images, just drag and drop a picture file in this area. It will appear in this area as HTML coding - it'll look a little messy, but it'll work!

![Question media - dragging image file](Quiz_image_embed.png?resize=800,116)
![Question media - image code](Quiz_image_embed2.png?resize=800,76)
![Question media - image example](Quiz_image_embed_display.png?resize=800,291)

For streaming media (YouTube, Vimeo, SoundCloud), copy the media's embed code, click back on this area and paste (Ctrl+V) the code into it.

![Question media - copying embed code](Quiz_video_embed.png?resize=800,303)
![Question media - embedded media code](Quiz_video_embed2.png?resize=800,76)
![Question media - embedded media example](Quiz_video_embed_display.png?resize=800,440)

!! You will need to use the proper HTML embed code for the media this time - standard web address URLs will not work!

! If items appear odd or misaligned, you can add other HTML tags (such as < center > or < br >) into the code to fix them!

#### Question text

Self-explanatory - this is your question! Delete the placeholder text and replace it with your own content.

![Question text field](Quiz_question_field.png?resize=800,94)

---

This next group of options allows you to set up your answers, or 'distractors' as they're referred to in the wizard:

#### Correct (checkbox)

Checkboxes used to designate correct choices. If a distractor is checked, users will need to select it when answering the question in order to pass it.

You can check either a single distractor (for a single choice question) or check multiple distractors (for a multiple choice question).

![Correct checkbox](QuizEditor_distractor_correct.png?resize=800,62)

! If making a multiple choice question, remember that users will have to select ALL your correct distractors to pass the question - if they only pick one or the other, it will count as a fail!

#### Distractor text

Also self-explanatory - this is a possible answer! Delete the placeholder text and replace it with your own content.

![Distractor text fields](quiz_distractor_field.png?resize=800,310)

You can also rearrange the order of your distractors if you need to - just click and hold the mouse in the small empty area below the Correct checkbox and drag up or down the distractor list to move it to a new position.

#### Delete distractor

To delete a distractor, click the small 'x' button to the right of the distractor text field. The distractor will immediately be removed, so be careful!

![Delete distractor button](QuizEditor_distractor_delete.png?resize=800,62)

#### Show (number of distractors)

Determines how many of your distractors will be loaded for the question. Type in a number between 1 and the maximum amount of distractors you have.

If the Show number is smaller than the number of distractors in a question, the distractors will randomise. If the Show number matches the number of distractors, they will always appear in the order you have them in the editor.

![Show - number field](Quiz_distractor_show.png)

#### Add new distractor

To add a new distractor, click the small '+' button to the right of the Show text field. A blank distractor will be added to the bottom of the list.

![Add new distractor button](QuizEditor_distractor_add.png?resize=800,50)

---

The next group of options allows you to add short feedback messages to display once a question has been marked.

These are optional - type in your own content if you want, but if not, you can leave these fields blank. These are also unique to each question, so different questions can have different feedback text.

#### Feedback when correct

Allows you to type a message to display on the question when you get the answer correct.

![Feedback when correct text field](Quiz_feedback_correct_field.png)
![Feedback when correct example](Quiz_feedback_correct.png?resize=500,417)

#### Feedback when incorrect

Allows you to type a message to display on the question when you get the answer incorrect.

![Feedback when incorrect text field](Quiz_feedback_incorrect_field.png)
![Feedback when incorrect example](Quiz_feedback_incorrect.png?resize=500,417)

#### Feedback when skipped

Allows you to type a message to display on the question when you skip a question ( when you go to the _Results_ page and submit your whole quiz for marking without selecting an answer)

![Feedback when skipped text field](Quiz_feedback_skipped_field.png)
![Feedback when skipped example](Quiz_feedback_skipped.png?resize=500,417)

---

#### Save

To save your changes, click the first (smaller) purple button in the bottom left corner of this area.

![save button](Quiz_Save2a.png)

#### Save + Add New

To save your changes and add a new question at the same time, click the second (larger) purple button in the bottom left corner of this area.

![Save + Add New question button](Quiz_Save2b.png)

#### Delete Question

To remove the current question, click the large white button in the bottom right corner of this area. The question will immediately be removed.

![Delete question button](QuizEditor_Delete.png)