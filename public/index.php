<?php
define("APP", realpath("."));
require "../vendor/autoload.php";
$Router = new AltoRouter();

$Router->map('GET','/','home.inc.php');
$Router->map('GET','/faq','faq.inc.php');
$Router->map('GET','/changelog','changelog.inc.php');

$path = realpath("./routes");

$match = $Router->match();
if ($match) {
	$fn = $match["target"];
	require $path. '/_header.inc.php';
    include $path . "/{$fn}";
	require $path . '/_footer.inc.php';
} else {
  header("HTTP/1.0 404 Not Found");
}

?>