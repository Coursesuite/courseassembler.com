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

// validate the basic request
$verifier = Licence::validate(Request::get("hash"));
if (!$verifier->valid) Utils::Stop(400, 'Bad method');

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

// search for user stored presets on the warehouse
$result = Utils::curl_get_contents(getenv("WAREHOUSE_URL") . "?hash=" . $verifier->hash, array('action' => 'listthemes', 'base' => $base));
foreach ($result as $theme) {
	$presets[] = $theme;
}
// $userpath = realpath("../../warehouse/{$verifier->hash}/{$base}");
// if (file_exists($userpath)) {
// 	foreach (glob("{$userpath}/*.theme") as $theme) {
// 		$text = file_get_contents($theme);
// 		$key = substr(basename($theme), 0, -6);
// 		$obj = new stdClass();
// 		$obj->key = $key;
// 		$obj->image = 'img/user-preset.jpg';
// 		$obj->theme = base64_encode($text);
// 		$presets[] = $obj;
// 	}
// }
Utils::Stop(200, json_encode($presets), false, "application/json");