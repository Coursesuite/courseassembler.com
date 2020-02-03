<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
		<meta content="width=device-width, initial-scale=1, minimum-scale=1" name="viewport"/>
		<meta name="description" content="Convert PDF, DOCX, PPTX, Google Docs and many more to SCORM in minutes. Add quizzes, video, and voiceovers. SCORM publishing in a matter of minutes using our web-based tool." />
		<meta name="keywords" content="pdf to scorm, docx to scorm, ppt to scorm, mp4 to scorm, powerpoint to scorm, scorm elearning, scorm converter, coursesuite, scormcloud authoring, moodle scorm, scorm modules, scorm content, scorm wrapper, scorm tool, scorm packager, ppt to scorm, docx to scorm, convert pdf to html, video to scorm, google slides to scorm, google docs to scorm, scorm quiz, quiz to scorm, blackboard, moodle, d2l, rustici, scorm api, scorm2004" />
		<meta name="author" content="www.coursesuite.com" />
		<title>Course Assembler by Coursesuite - get your content e-learning SCORM ready in a matter of minutes.</title>
		<meta property="og:locale" content="en_AU">
		<meta property="og:type" content="website">
		<meta property="og:title" content="<?php echo $page_title; ?> - Course Assembler by Coursesuite">
		<meta property="og:description" content="Make your content e-learning ready, add quizzes and video and package with a SCORM wrapper, in a matter of minutes.">
		<meta property="og:url" content="https://<?php echo $_SERVER['SERVER_NAME']; ?>/">
		<meta property="og:site_name" content="Course Assembler ">
		<meta property="og:image" content="https://<?php echo $_SERVER['SERVER_NAME']; ?>/assets/meta_card.png">
		<link href="assets/style.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/css/uikit.min.css" />
        <script src="https://polyfill.io/v3/polyfill.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.11/typed.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit-icons.min.js" defer></script>
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
							<li><a href="/changelog">Changelog<?php badge('/changelog'); ?></a></li>
							<li><a href="/docs" target="_blank">Documentation</a></li>
						</ul>
						<div class="uk-navbar-item">
							<?php include "_launch.inc.php"; ?>
						</div>
					</div>
				</nav>
			</div>
		</div>
        <link rel="stylesheet" href="assets/outdated-browser-rework/outdated-browser.css">
        <div id="outdated"></div>
        <script src="assets/outdated-browser-rework/outdated-browser.js"></script>
