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

// we need the theme name ('base')
$base = Request::get('base');
if (empty($base)) die("incorrect usage");

// hunt through the preset json files for the definition of this preset
// header("content-type: text/plain");
$presets = [];
foreach (glob(realpath(dirname(__FILE__)) . '/themes/' . $base . '/*.theme') as $theme) {
	$text = file_get_contents($theme);
	$key = substr(basename($theme), 0, -6);
	$obj = new stdClass();
	$obj->key = $key;
	$obj->image = 'plugins/Theme/themes/' . $base .'/'. $key . ".jpg";
	$obj->theme = base64_encode($text);
	$presets[] = $obj;
}

header("content-type: application/json");
echo json_encode($presets);