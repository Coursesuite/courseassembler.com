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

$row = new dbRow("manifest");
$row->licencekey = str_replace('?hash=','', Request::post("hash"));
$row->description = Request::post("option-course-description", true);
$row->copyright = Request::post("option-course-copyright", true);
$row->template = Request::post("template", true);
$row->theme = Request::post("selected_theme", true);
$row->navlock = Request::post("navlock", true);
$row->settings = Request::post("settings", true);
$row->rule = Request::post("rule", true);
$row->api = Request::post("api", true);
$row->pages = Request::post("pages", true);
$row->split = Request::post("split", true);
$row->audio = Request::post("audio", true);
$row->video = Request::post("video", true);
$row->cursor = Request::post("cursor", true);
$row->attachment = Request::post("attachment", true);
$row->kind = Request::post("kind", true);
$row->format = Request::post("format", true);
$row->type = Request::post("type", true);
// $row->manifest = serialize($_POST);
$row->save();
