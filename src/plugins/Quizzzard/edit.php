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

function active($key) {
global $action;
	if ($action === $key) echo ' active';
}

?><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="edit.css">

    <title>Course Assembler Quizzzard</title>
  </head>
  <body>

	<main>

		<?php include('menu.php'); ?>

		<div class="b-example-divider"></div>

		<div class="d-flex flex-column flex-grow-1 bg-light">
			<?php include($action . ".php"); ?>
		</div>

	</main>

	<script src="https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js" integrity="sha256-zBaNlfuSfUaxBDcmz+E5mOCJAv9j8kMw4rsikBCe0UU=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
	<script type="text/javascript" src="edit.js"></script>
	<!-- <script type="text/javascript">window.addEventListener("load", function() { QuizBuilder.Init("<?php echo $fileid; ?>") }, false);</script> -->


	<!-- <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css" type="text/css" media="screen" charset="utf-8">
	<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/themes/beagle.min.css" type="text/css" media="screen" charset="utf-8">


	<script type="text/javascript">window.fd={logging:false};</script>
	<script type="text/javascript" src="//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js"></script>
	<script type="text/javascript" src="//cdn.jsdelivr.net/npm/filedrop@2.0.0/filedrop.min.js"></script> -->
  </body>
</html>