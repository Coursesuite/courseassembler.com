<?php defined("QB") || die("ded"); ?>

<div class="quiz-settings">
	<div class="editable">
		<h2>Enter your quiz title</h2>
		<p>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est corrupti laudantium earum cum similique suscipit voluptatem nisi illo, doloribus exercitationem voluptatum alias corporis minus magnam quae ut libero ad dolore.
		</p>
	</div>

	<fieldset>

		<div>
			<label><input type="checkbox" value="1" name="shuffle" checked> Shuffle question order</label>
		</div>

		<div>
			<label><input type="checkbox" value="1" name="resit" checked> Allow resit on failure</label>
		</div>

		<div>
			<label><input type="checkbox" value="1" name="feedback" checked> Show feedback</label>
		</div>

		<div>
			<label><input type="checkbox" value="answer" name="reveal" checked> Mark as you go</label>
		</div>

	</fieldset>

</div>

	<div class="focus-group" label="Settings">
			<div class="row">
				<div class="column">
					<label for="title_field">Heading</label>
					<input type="text" placeholder="Enter a title for your quiz" id="title_field">
					<label for="resultsButton_field">Results button text</label>
					<input type="text" id="resultsButton_field" value="Results">
				</div>
				<div class="column">
					<label for="reveal_field">Marking</label>
					<select id="reveal_field">
						<option value="answer" selected>Show 'Check Answer' button, feedback visible</option>
						<option value="complete">Mark after last question, feedback visible</option>
						<option value="false">Mark after last question, feedback hidden</option>
					</select>
					<label for="checkButton_field">Answer button text</label>
					<input type="text" id="checkButton_field" value="Check answer">
				</div>
			</div>
		</div>