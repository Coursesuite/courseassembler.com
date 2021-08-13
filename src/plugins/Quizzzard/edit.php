<?php
define("QB", true);
// this just finds where the autoloader is
$fold = __DIR__; $path = ""; $exit = false;
do {
	$fold = dirname($fold);
	if (file_exists($path."vendor") || $fold === "/") {
		$exit = true;
	} else {
		$path .= "../";
	}
} while ($exit === false);
require_once($path . 'vendor/autoload.php');

$fileid = Request::get("fileid");
$action = Request::get("action");

?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Course Assembler QuizBuilder</title>
	<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/themes/beagle.min.css" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" type="text/css" href="edit.css">

	<script type="text/javascript">window.fd={logging:false};</script>
	<script type="text/javascript" src="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/localforage/1.5.0/localforage.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js"></script>
	<script type="text/javascript" src="//cdn.jsdelivr.net/npm/filedrop@2.0.0/filedrop.min.js"></script>
	<script type="text/javascript" src="edit.js"></script>
	<script type="text/javascript">window.addEventListener("load", function() { QuizBuilder.Init("<?php echo $fileid; ?>") }, false);</script>
</head>
<body>

<div class="row main">
	<nav class="column column-20 questions">
		<div class="tmb">
			<header><a href="?fileid=<?php echo $fileid;?>&action=settings">Settings</a></header>
			<section>
			<ol>
				<li>Question 1</li>
				<li>Question 2</li>
				<li>Question 3</li>
			</ol>
			</section>
			<footer><a href="?fileid=<?php echo $fileid;?>&action=results">Results Page</a></footer>
		</div>
	</nav>
	<main class="column action">

		<?php include($action . ".php"); ?>
		
	</main>
</div>

</body>
</html>
