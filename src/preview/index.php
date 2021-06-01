<?php

function rrmdir($dir) {
	if (is_dir($dir)) {
		$objects = scandir($dir);
		foreach ($objects as $object) {
			if ($object != "." && $object != "..") {
				if (is_dir($dir."/".$object)) {
					// echo PHP_EOL, "removing folder $dir / $object";
					rrmdir($dir."/".$object);
				} else {
					// echo PHP_EOL, "removing file $dir / $object";
					unlink($dir."/".$object);
				}
			}
		}
		// echo PHP_EOL, "removing self $dir";
		rmdir($dir);
	}
}

$debug = ($_SERVER['SERVER_NAME'] === '127.0.0.1');
$hash = isset($_GET["hash"]) ? $_GET["hash"] : $debug ? "debug" : null;
if (empty($hash)) die("bad method");
if (empty($hash) && $debug) $hash = "debug";


$root = realpath("./data/");
if (!$root) $root = realpath('.') . '/data';
if (!file_exists($root)) mkdir ($root, 0777, true);

$folder = "{$root}/{$hash}";

// if we are doing a file upload ...
if (isset($_FILES['file']) && is_uploaded_file($_FILES['file']['tmp_name'])) {

	// clean out previous working folder
	// echo PHP_EOL, "Folder ", file_exists($folder) ? "exists" : "missing";
	if (file_exists($folder)) {
		rrmdir($folder);
	}

	$name = $_FILES['file']['name'];
	$path = $_FILES['file']['tmp_name'];
	$extension = pathinfo($folder . basename($name), PATHINFO_EXTENSION);

	//extract the upload
	if ("zip" === $extension) {
		$zipArchive = new \ZipArchive();
		$result = $zipArchive->open($path);
		if ($result === TRUE) {

			// recreate the working folder
			mkdir ($folder, 0777, true);

			// extract the zip
			$zipArchive->extractTo($folder);
			$zipArchive->close();
		}
	}

	// this finishes the POST
	die();
}

// check this upload is correct
if (!file_exists($folder . "/doc.ninja")) die("Not a course-assembler package.");
if (!file_exists($folder . "/imsmanifest.xml")) die("imsmanifest.xml was missing.");

// find the page properties to render
$manifest = file_get_contents($folder . "/imsmanifest.xml");
$manifest = str_replace("adlcp:", "", $manifest); // avoid namespace glitches
$xmlDoc = simplexml_load_string ($manifest);
$href = $xmlDoc->resources[0]->resource[0]->attributes()->href[0]->__toString();
$outname = $xmlDoc->organizations[0]->organization[0]->item[0]->title[0]->__toString();

?><!DOCTYPE html>

<html lang="en" class="no-js">

<head>
	<meta charset="utf-8">
	<title>Scorm Previewer</title>
	<meta name="viewport" content="width=device-width,initial-scale=1" />
	<link rel="stylesheet" href="style.css" />
	<script src="scorm.js" type="text/javascript"></script>
</head>

<body>
	<iframe src='data/<?php echo "{$hash}/{$href}"; ?>' allowfullscreen='true' webkitallowfullscreen='true' mozallowfullscreen='true' width='100%' height='100%' frameborder='0'></iframe>
</body>
</html>