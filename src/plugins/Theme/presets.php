<?php
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

$base = Request::get('base');
if (empty($base)) die("incorrect usage");

header("content-type: text/plain");
$presets = new stdClass();
foreach (glob(realpath(dirname(__FILE__)) . '/presets/*.json') as $json) {
	$obj = json_decode(file_get_contents($json));
	if (!isset($obj->base)) continue;
	if ($obj->base === $base) {
		$key = substr(basename($json), 0, -5);
		$presets->$key = $obj;
	}
}
header("content-type: application/json");
echo json_encode([$presets]);