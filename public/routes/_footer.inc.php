<?php defined("APP") ? assert(true) : die(); ?>
	<footer class="my-footer uk-light">
		<div class="uk-container uk-container-expand uk-padding-small">
			<div class="uk-flex uk-flex-between@m uk-text-small uk-flex-around@s my-flex">
				<div class="uk-hidden@m" uk-navbar>
					<ul class="uk-navbar-nav">
					<?php if ($fn !== "home.inc.php") { ?><li><a href="/">Home</a></li><?php } ?>
					<li><a href="/faq">Faq</a></li>
					<li><a href="/changelog">Changelog</a></li>
					<li><a href="/docs">Documentation</a></li>
					</ul>
				</div>
				<div>
					<p>&copy; Copyright 2019 <a href="https://www.coursesuite.com">Coursesuite</a>, all rights reserved. <a href="/privacy">Policies</a> | <a href="mailto:info@courseassembler.com">Email us</a> | <a href="https://help.coursesuite.ninja" target="_blank">Support</a>.</p>
				</div>
				<div >
					<?php include "_sharing.inc.php"; ?>
				</div>
			</div>
		</div>
	</footer>

	<script
	    id="fsc-api"
	    src="https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.7.9/fastspring-builder.min.js"
	    type="text/javascript"
	    data-storefront="courseassembler.test.onfastspring.com/popup-courseassembler"
	        data-debug="false"
	        data-data-callback="fsCallbackFunction"
	        data-popup-webhook-received="fsWebhookReceived"
    ></script>
	<script
		type='text/javascript'
		src='assets/main.js'
	></script>
    </body>
</html>