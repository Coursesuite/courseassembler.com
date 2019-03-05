<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
        <meta content="" name="generator"/>
        <meta content="width=device-width, initial-scale=1, minimum-scale=1" name="viewport"/>
        <meta content="" name="description"/>
        <link href="https://fonts.googleapis.com/css?family=Raleway:500,600,700" rel="stylesheet"/>
        <link href="assets/style.css" rel="stylesheet" type="text/css"/>
		<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/css/uikit.min.css" />
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit-icons.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js"></script>
        <title>Course Assembler</title>
    </head>
    <body>
    	<div uk-sticky="media: 960" class="uk-navbar-container my-bg-blue uk-sticky uk-sticky-fixed uk-navbar-transparent">
    		<div class="uk-container uk-container-expand">
    			<nav uk-navbar>
    				<div class="uk-navbar-left">
    					<a href="/" class="uk-navbar-item uk-logo"><img src="assets/header.svg" class="uk-margin-small-right" width="280"></a>
					</div>
					<div class="uk-navbar-right uk-visible@m">
						<ul class="uk-navbar-nav">
							<?php if ($fn !== "home.inc.php") { ?><li><a href="/">Home</a></li><?php } ?>
							<li><a href="/faq">Faq</a></li>
							<li><a href="/changelog">Changelog</a></li>
							<li><a href="/docs">Documentation</a></li>
						</ul>
						<div class="uk-navbar-item">
							<?php include "_launch.inc.php"; ?>
						</div>
					</div>
				</nav>
			</div>
		</div>