<?php
$products = [];
$products[] = ["10 days", "$10", "course-assembler-10","Buy"];
$products[] = ["30 days", "$25", "course-assembler-30","Buy"];
$products[] = ["60 days", "$50", "course-assembler-60","Buy"];
$products[] = ["1 year", "$199", "course-assembler-365","Buy"];
$products[] = ["Monthly", "$25", "course-assembler-monthly", "Subscribe"];
$products[] = ["Annual", "$199", "course-assembler-sub","Subscribe"];
?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
		<meta content="width=device-width, initial-scale=1, minimum-scale=1" name="viewport"/>
		<meta name="description" content="Convert PDF, DOCX, PPTX, Google Docs and many more to SCORM in minutes. Add quizzes, video, and voiceovers. SCORM publishing in a matter of minutes using our web-based tool. Pricing starts at $10 for 10 days." />
		<meta name="keywords" content="pdf to scorm, docx to scorm, ppt to scorm, mp4 to scorm, powerpoint to scorm, scorm elearning, scorm converter, coursesuite, scormcloud authoring, moodle scorm, scorm modules, scorm content, scorm wrapper, scorm tool, scorm packager, ppt to scorm, docx to scorm, convert pdf to html, video to scorm, google slides to scorm, google docs to scorm, scorm quiz, quiz to scorm, blackboard, moodle, d2l, rustici, scorm api, scorm2004" />
		<meta name="author" content="www.coursesuite.com" />
		<title>Course Assembler - get your content e-learning SCORM ready in a matter of minutes.</title>
		<meta property="og:locale" content="en_AU">
		<meta property="og:type" content="website">
		<meta property="og:title" content="<?php echo $page_title; ?> - Course Assembler">
		<meta property="og:description" content="Make your content e-learning ready, add quizzes and video and package with a SCORM wrapper, in a matter of minutes.">
		<meta property="og:url" content="https://<?php echo $_SERVER['SERVER_NAME']; ?>/">
		<meta property="og:site_name" content="Course Assembler ">
		<meta property="og:image" content="https://<?php echo $_SERVER['SERVER_NAME']; ?>/assets/meta_card.png">
		<link href="/assets/style.202204071004.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/css/uikit.min.css" />
        <script src="https://polyfill.io/v3/polyfill.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.11/typed.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit-icons.min.js" defer></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js"></script>
		<script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <?php include "_bug.inc.php"; ?>
		<?php include "_cookie.inc.php"; ?>
		<?php include "_analytics.inc.php"; ?>
	</head>
	<body class="<?php echo preg_replace('/[^a-z0-9]/i','',str_replace(['.inc','.php'],'',$fn)); ?>">
		<div uk-sticky="media: 960" class="uk-navbar-container my-bg-blue uk-sticky uk-sticky-fixed uk-navbar-transparent">
			<div class="uk-container uk-container-expand">
				<nav uk-navbar>
					<div class="uk-navbar-left">
						<a href="/" class="uk-navbar-item uk-logo"><img src="/assets/header.svg" class="uk-margin-small-right" width="280"></a>
					</div>
					<div class="uk-navbar-right uk-visible@m">
						<ul class="uk-navbar-nav">
							<?php if ($fn !== "home.inc.php") { ?><li><a href="/">Home</a></li><?php } ?>
							<li><a href="/#features">Features</a></li>
							<li><a href="/faq">FAQs</a></li>
							<li><a href="/pricing">Pricing</a></li>
							<li><a href="/blog" class="<?php echo Utils::BlogDot(); ?>">Blog</a></li>
							<li><a href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=CourseAssembler&tw_p=followbutton" title="Follow @CourseAssembler on Twitter"><span uk-icon="icon: twitter;"></span></a></li>
						</ul>
						<div class="uk-navbar-item">
							<?php include "_launch.inc.php"; ?>
						</div>
					</div>
				</nav>
			</div>
		</div>
        <link rel="stylesheet" href="/assets/outdated-browser-rework/outdated-browser.css">
        <div id="outdated"></div>
        <script src="/assets/outdated-browser-rework/outdated-browser.js"></script>
