<?php defined("QB") || die("ded"); ?>

		<div class="layout-group" label="Questions">
			<div class="row"><div class='column'><label class='header'>Questions in quiz</label></div></div>
			<div class="row">
				<div class="column column-90 question-index">

				</div>
				<div class="column ta-right">
					<a class="button button-faded" href="javascript:QuizBuilder.Questions.Add()"><i class="fa fa-plus"></i></a>
				</div>
			</div>
		</div>


		<div class="focus-group disabled" id="question_details">
			<div class="row">
				<div class='column'>
					<label for='question_media'>Question media (above text)</label>
					<textarea placeholder="Paste video embed code here, or drop an image here to upload (optional)" id="question_media" noresize></textarea>
					<label for='question_text'>Question text</label>
					<textarea placeholder="Enter your question text (basic html accepted)" id="question_text" rows="4">New Question 1. Replace this with your own question text.</textarea>
				</div>
			</div>
			<table id="distractors">
				<thead><tr><th>Correct</th><th>Distractor text</th><th><i class="fa fa-cog"></i></th></tr></thead>
				<tbody sortable>
					<tr>
						<td><input type="checkbox" name="distractor" checked tooltip='Select one or more correct answers'></td>
						<td><textarea placeholder="Enter the choice here (basic html accepted).">Replace this with an answer</textarea></td>
						<td><a href="#remove" title="Remove this distractor"><i class="fa fa-times-circle"></i></a></td>
					</tr>
				</tbody>
			</table>
            <div id="distractorsFoot" class="distractors-foot">
        		<div class="distractors-show-icon">
                	<div class='td-center' tooltip="If 'show' is less than the number of distractors, the distractors will be randomly chosen.">
                    <label for="distractor_show">Show <i class='fa fa-question-circle'></i></label>
                	</div>
	        	</div>
	        <div class="distractors-input">
                <div>
                    <input type="number" min="2" max="4" value="4" id="distractor_show">
                </div>
        	</div>
        		<div class="distractors-add">
                	<div>
                        <a id="addDistractor" class="button distractor-button" href="#add" title="Add a new distractor">Add Distractor</a>
                	</div>
        		</div>
			</div>
			<div class="row">
				<div class="column">
					<label for="positiveText_field">Feedback when correct</label>
					<input type="text" id="positiveText_field" placeholder="(optional)">
				</div>
				<div class="column">
					<label for="negativeText_field">Feedback when incorrect</label>
					<input type="text" id="negativeText_field" placeholder="(optional)">
				</div>
				<div class="column">
					<label for="skippedText_field">Feedback when skipped</label>
					<input type="text" id="skippedText_field" placeholder="(optional)">
				</div>
			</div>
		</div>
		<div class="row layout-group question-actions">
			<div class="column"><span class="button-split">
				<a class="button" href="#save"><i class="fa fa-save"></i> Save</a>
				<a class="button button-faded" href="#save+add" title="Save this question and add a new one">+Add</a>
			</span></div>
			<div class="column ta-right">
				<a class="button button-outline" href="#remove"><i class="fa fa-minus"></i> Delete question</a>
			</div>
		</div>
	</div>
