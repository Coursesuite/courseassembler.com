<?php

define("APP",true);
include("../load.php");

$jsApp = new stdClass();
$jsApp->Hash = $verifier->hash;
$jsApp->Backend = getenv("BACKEND_URL") ?: "https://backend.courseassembler.com.test";
$jsApp->Warehouse = getenv("WAREHOUSE_URL") ?: "https://warehouse.courseassembler.com.test";

?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Course Assembler</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/2.0.0/modern-normalize.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic&amp;lang=en" rel="stylesheet" type="text/css">
<?php if ($verifier->code->minified) { ?>
		<link rel="stylesheet" type="text/css" href="../<?php echo $minified_css; ?>" />
<?php } else { ?>
		<link rel="stylesheet" type="text/css" href="../css/app.css" />
<?php } ?>
    <link href="library.css" rel="stylesheet" type="text/css">
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js"></script>
	<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?>;</script>
</head>

<body>
	<p class='info'>These are your saved courses and documents. Upload existing content using the button below.</p>
	<p class='form'><input type="file" id="upload-course" onchange="parent.DocNinja.Plugins.Importer.uploadToLibrary(this)" title="Supports CourseAssembler (zip, json), Video2Scorm (zip) packages, and all compatible file types"  /></p>

	<?php
	$zips = Utils::curl_get_contents($jsApp->Warehouse . "?hash=" . $verifier->hash, array('action' => 'listzips'));
	if (!$zips || $zips == (new stdClass())) {
		echo "<p>No files.</p>";
	} else foreach ($zips as $zip) {
		echo "<p data-src='", $zip->filename, "' class='lib-course'>";
		echo "<span class='lib-title'>", Utils::formatName(pathinfo($zip->filename,PATHINFO_FILENAME)), "</span>";
		echo "<span class='lib-date'>", Utils::HumanDate($zip->date, true), "</span>", "<span class='lib-filemeta'>", pathinfo($zip->filename,PATHINFO_EXTENSION), " ", $zip->size, "</span>";
		echo "<span class='lib-actions'><button data-action='import-saved-course' title='Import file'>Import</button><button data-action='download-saved-course' title='Download file'><i class='ninja-paperclip'></i></button><button data-action='remove-saved-course' title='Remove file'><i class='ninja-discard'></i></button></span>";
		echo "</p>", PHP_EOL;
	}
	?>

    <script type="module" src="library.js"></script>
</body>
</html>