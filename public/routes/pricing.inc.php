
<div class="uk-section">
    <div class="uk-container uk-margin-large">

        <h1>Pricing, simplified.</h1>
        <p>Pay for the software when you do need it. Don't pay for it when you don't need it. We do not offer lifetime deals, a downloadable app/desktop version, discounted or educational pricing.</p>

        <div uk-alert class="uk-box-shadow-xlarge uk-margin-large uk-margin-remove-right uk-margin-remove-left uk-alert-primary uk-padding-large uk-text-center uk-border-rounded usd">
            <p>We've come up with the simplest formula for our base pricing:</p>
            <h3>USD $1<sup>*</sup> = 1 day</h3>
            <p>No conversion limits or premium content hidden behind paywalls. Your licence key unlocks everything.</p>
        </div>

        <hr class="uk-divider-icon">

        <div uk-grid class="uk-child-width-1-4@l uk-child-width-1-3@m uk-child-width-1-1@s">
<?php foreach ($products as $prod) { ?>
            <div>
<div class="uk-card uk-card-<?php echo $prod[0] === "10 days" ? "primary" : "default"; ?> uk-card-hover">
    <div class="uk-card-header">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-auto">
                <img class="uk-border-circle" width="40" height="40" src="assets/cost40.png">
            </div>
            <div class="uk-width-expand">
                <h3 class="uk-card-title uk-margin-remove-bottom" data-fsc-item-pricetotal-callback data-fsc-item-path="<?php echo $prod[2]; ?>" data-format="%price" data-fsc-item-path-value="<?php echo $prod[2]; ?>"><?php echo $prod[1]; ?></h3>
                <p class="uk-text-meta uk-margin-remove-top"><?php echo $prod[3] === "Subscribe" ? "Subscription" : "Single purchase"; ?></p>
            </div>
        </div>
    </div>
    <div class="uk-card-body">
        <p><?php echo $prod[0]; ?></p>
    </div>
    <div class="uk-card-footer">
        <a href="#" class="uk-button uk-button-primary uk-button-small" data-fsc-item-path-value="<?php echo $prod[2]; ?>" data-fsc-action="Reset,Add,Checkout"><?php echo $prod[3]; ?></a>
    </div>
</div>                

            </div>
<?php } ?>        
        </div>

        <h2>Server storage</h2>
        <p id="server">Your licence also includes <b>storage</b>. You can store and re-import your published packages and custom themes on our server for as long as your licence is valid. Once your licence expires, we'll automatically remove any files and themes you've stored.</p>
        <p>It benefits you to get a longer lasting licence - such as a subscription.</p>

    	<h3 class="uk-text-center">Simple, honest pricing. </h3>

    </div>
</div>