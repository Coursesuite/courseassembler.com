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

// set up
header("Content-type: application/json; charset=utf-8");

// only allow fetch
if (!(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'fetch')) die("{}");

// properties that we care about
$properties = ["title","description","url","type","image","code","width","height","aspectRatio","providerName"];
$ignore = ["title","version","type","thumbnail_url","thumbnail_width","thumbnail_height","cache_age","author_name","author_url","provider_name","provider_url","width","height","html"];
$result = array_fill_keys($properties, null);

$url = trim($_GET['url']);

use Embed\Embed;

try {
	$info = Embed::create($url,[
		"max_images" => 0,
	]);
	foreach($properties as $name) {
		$result[$name] = $info->$name;
	}

	// tack on any extra oembed properties other than the standard ones defined at oembed.com
	$providers = $info->getProviders();
	$oembed = $providers['oembed'];
	foreach ($oembed->getBag()->getAll() as $key => $value) {
		if (in_array($key, $ignore)) continue;
		$result[$key] = $value;
	}
} catch (\Exception $error) {
	// ;
}

echo json_encode($result);

