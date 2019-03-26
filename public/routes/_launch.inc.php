<a href="#" class="uk-button my-launch"><span uk-icon="bolt"></span> Launch App</a>
<div uk-dropdown="mode:click; pos:bottom-justify;" class="uk-background-muted uk-text-left">
	<div>
    	<fieldset class="uk-fieldset">
		    <legend class="uk-legend">Licence Key</legend>
	        <div class="uk-margin-small uk-grid-small uk-grid">
	        	<div class="uk-width-expand">
		            <input class="uk-input uk-form-small" type="text" placeholder="Enter your licence key" name="licencekey" onchange="readify()">
		        </div>
		        <div>
		        	<button onclick="launch(this)" class="uk-button uk-button-primary uk-button-small">Go</button>
		        </div>
	        </div>
	        <div class="uk-margin-small ">
	        	<label><input class="uk-checkbox" type="checkbox" checked> Remember on this computer</label>

	        </div>
    	</fieldset>
	</div>
	<hr class="uk-divider-icon">
	<h3 class="uk-margin-remove uk-legend">It's only $10 for 10 days <span class="my-tiny">(USD)</span></h3>
	<p>That's the price of a ☕️ and a 🍩. <b>You can make a <i>lot</i> of courses in 10 days</b>. A licence is good for so many days, then it stops working. Longer licences have better discounts.</p>
	<div class="uk-button-group">
	    <button href="#" data-fsc-item-path="course-assembler-10" data-fsc-item-path-value="course-assembler-10" data-fsc-action="Reset,Add,Checkout"
	    class="uk-button uk-button-primary">
	    	<span>Buy Licence</span>
	    </button>
	    <div class="uk-inline">
	        <button class="uk-button uk-button-default my-pricing" type="button"><span uk-icon="icon: triangle-down"></span> Pricing</button>
	        <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;">
	            <ul class="uk-nav uk-dropdown-nav">
	                <li class="uk-nav-header">Basic Pricing</li>
	                <li><a href="#" data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-10" data-format="%price for 10 days" data-fsc-item-path-value="course-assembler-10" data-fsc-action="Reset,Add,Checkout">$10 for 10 days</a></li>
	                <li class="uk-nav-header">Bulk Discounts</li>
	                <li><a href="#" data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-30" data-format="%price for 30 days" data-fsc-item-path-value="course-assembler-30" data-fsc-action="Reset,Add,Checkout">$25 for 30 days</a></li>
	                <li><a href="#" data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-60" data-format="%price for 60 days" data-fsc-item-path-value="course-assembler-60" data-fsc-action="Reset,Add,Checkout">$50 for 60 days</a></li>
	                <li><a href="#" data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-365" data-format="%price for 365 days" data-fsc-item-path-value="course-assembler-365" data-fsc-action="Reset,Add,Checkout">$199 for 365 days</a></li>
	            </ul>
	        </div>
	    </div>
	</div>

</div>