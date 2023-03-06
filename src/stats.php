<?php
putenv("DB_USER=root");
putenv("DB_PASS=root");

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

$ref = Request::post('name');
$hash = Request::post("hash");
if (empty($hash)) die();
$record = new StatisticsModel('stat', $ref);
if (!$record->loaded()) {
	$record->stat = $ref;
}
$record->increment();
$record->save();
