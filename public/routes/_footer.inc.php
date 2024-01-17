<?php defined("APP") ? assert(true) : die(); ?>
	<footer class="my-footer uk-light">
		<div class="uk-container uk-padding-small">
			<div uk-grid>
				<div class="uk-width-2-3@m">
					<h4>CourseAssembler<br><small>is an assembly line for your e-learning content</small></h4>
					<p class="uk-text-small">Made with ♥️ in Australia</p>
					<p>&copy; Copyright <?php echo date("Y"); ?>, all rights reserved. <a href="/privacy">Policies</a> | <a href="mailto:info@courseassembler.com">Contact us</a></p>
				</div>
				<div class="uk-width-1-3@m">
					<?php include "_sharing.inc.php"; ?>
				</div>
			</div>
		</div>
	</footer>

	<script
	    id="fsc-api"
	    src="https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.7.9/fastspring-builder.min.js"
	    type="text/javascript"
	    data-storefront="courseassembler.onfastspring.com/popup-courseassembler"
	        data-debug="false"
	        data-data-callback="fsCallbackFunction"
	        data-popup-webhook-received="fsWebhookReceived"
    ></script>
	<script
		type='text/javascript'
		src='/assets/main.js'
	></script>
    </body>
</html>