<?php defined("QB") || die("ded"); ?>

	<div class="focus-group" label="Settings">
			<div class="row">
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
				<div class="column">
					<label for="show_field">Show questions</label>
					<input type="number" size="3" min="1" max="4" value="4" id="show_field">
					<label for="resultsButton_field">Resit button text</label>
					<input type="text" id="resitButton_field" value="Resit quiz">
				</div>
				<div class="column">
					<label for="score_field">Pass mark</label>
					<input type="number" size="3" min="1" max="4" value="4" id="score_field">
					<label for="resit_field">Resit button</label>
					<input id="resit_field" type="checkbox">
					<label class="label-inline" for="resit_field" value="1">Visible <span tooltip='Tick means "visible on result page if score is less than pass mark"'>(&lt; pass mark)</span></label>
				</div>
			</div>
			<div class="row">
				<div class='column column-80'>
					<label for='results_text clearfix'><a href='#default' class='float-right' title='Set page template back to its default value'><i class="fa fa-arrow-down" aria-hidden="true"></i> Reset</a>Results page template</label>
					<textarea placeholder="Template to be displayed on the results page" id="results_text" rows="3"></textarea>
				</div>
				<div class='column'>
					<label for="base_colour">Button colour</label>
					<input type="text" class="jscolor {hash:true}" id="base_colour">
					<button class='button' id='save_button'><i class="fa fa-save"></i> Save quiz</button>
				</div>
			</div>
		</div>