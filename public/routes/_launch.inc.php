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
		        	<button onclick="launch(this)" class="uk-button uk-button-primary uk-button-small">Launch</button>
		        </div>
	        </div>
	        <div class="uk-margin-small ">
	        	<label><input class="uk-checkbox" type="checkbox" checked> Remember on this computer</label>
	        </div>
    	</fieldset>
	</div>
	<hr class="uk-divider-icon">
	<p>You need a licence to use this software: A licence is good for so many days, then it stops working. <b>Buy only what you need, when you need.</b></p>
	<table class="uk-table uk-table-small uk-table-divider uk-table-hover pricing-table">
	    <thead>
	        <tr>
	            <th>Licence</th>
	            <th>Price</th>
	            <th>Checkout</th>
	        </tr>
	    </thead>
	    <tbody>
<?php foreach ($products as $prod) { ?>
	        <tr>
	            <td><?php echo $prod[0]; ?></td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="<?php echo $prod[2]; ?>" data-format="%price" data-fsc-item-path-value="<?php echo $prod[2]; ?>"><?php echo $prod[1]; ?></td>
	            <td class="uk-text-center"><a href="#" data-fsc-item-path-value="<?php echo $prod[2]; ?>" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small"><?php echo $prod[3]; ?></a></td>
	        </tr>
<?php } ?>
	    </tbody>
	</table>
	<hr class="uk-divider-icon">
	<div class="uk-margin uk-text-center">
		<a href="/account" class="uk-button uk-button-link">My Account / Licence Info</a>
	</div>

</div>