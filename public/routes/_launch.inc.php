<a href="#" class="uk-button my-launch"><span uk-icon="cart"></span> Launch App</a>
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
	<p>You need a licence to use this software: A licence is good for so many days, then it stops working. <b>Buy only what you need, when you need.</b></p>
	<table class="uk-table uk-table-small uk-table-divider uk-table-hover">
	    <thead>
	        <tr>
	            <th>Licence</th>
	            <th>Price</th>
	            <th>Buy</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr>
	            <td>1 Day</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-1" data-format="%price" data-fsc-item-path-value="course-assembler-1">$2</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-1" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>10 Days</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-10" data-format="%price" data-fsc-item-path-value="course-assembler-10">$10</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-10" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>30 Days</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-30" data-format="%price" data-fsc-item-path-value="course-assembler-10">$25</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-30" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>1 year</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-365" data-format="%price" data-fsc-item-path-value="course-assembler-10">$199</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-365" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <!--tr>
	            <td>Subscribe (6-month recurring)</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-0" data-format="%price" data-fsc-item-path-value="course-assembler-0">$125</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-0" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr-->
	    </tbody>
	</table>

</div>