<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"/>
        <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
		<meta content="width=device-width, initial-scale=1, minimum-scale=1" name="viewport"/>
 		<meta name="description" content="Rapidly convert your learning content to HTML5, add quizzes and video and package with a SCORM wrapper, in a matter of minutes" />
		<meta name="keywords" content="Course Assembler, scorm modules, scorm content, scorm wrapper, scorm authoring tool, scorm packages ppt to scorm, pptx to scorm, powerpoint to scorm, docx to scorm, pdf to scorm, video to scorm, google slides to scorm, google docs to scorm" />
		<meta name="author" content="www.coursesuite.com" />
        <title><?php echo $page_title; ?> - Course Assembler</title>
        <meta property="og:locale" content="en_AU">
        <meta property="og:type" content="website">
        <meta property="og:title" content="<?php echo $page_title; ?> - Course Assembler">
        <meta property="og:description" content="Make your content e-learning ready, add quizzes and video and package with a SCORM wrapper, in a matter of minutes.">
        <meta property="og:url" content="https://<?php echo $_SERVER['SERVER_NAME']; ?>/">
        <meta property="og:site_name" content="Course Assembler">
        <meta property="og:image" content="https://<?php echo $_SERVER['SERVER_NAME']; ?>/assets/meta_card.png">
        <link href="assets/style.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/css/uikit.min.css" />
		<script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.9"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.3/js/uikit-icons.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js"></script>
		<script src="https://www.google.com/recaptcha/api.js" async defer></script>
		<?php include "_cookie.inc.php"; ?>
		<?php include "_analytics.inc.php"; ?>
    </head>
    <body class="<?php echo str_replace('.inc.php','',$fn); ?>">
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