<?php
define('APP',true);
require_once('../../vendor/autoload.php');

// validate the basic request
$verifier = Licence::validate(Request::get("hash"));
if (!$verifier->valid) Utils::Stop(400, 'Bad method');


// ensure the client workding dir is valid
$workingdir = realpath("./{$verifier->hash}/");
if (!$workingdir) $workingdir = realpath('.') . "/{$hash}";
if (!file_exists($workingdir)) mkdir ($workingdir, 0777, true);
if (!file_exists($workingdir)) Utils::Stop(403, 'Permissions error');

// perform the requested action
$result = new stdClass();
$action = Request::post("action");
switch ($action) {
	case "storetheme":
		$data = Request::post("data", false, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES | FILTER_FLAG_ENCODE_HIGH);
		if (!empty($data)) {
			$theme = Request::regex("theme"); // default [a-z]
			$name = Request::regex("selection","/[^a-z0-9-]/i");
			if (substr($name,-5)!=="-copy") $name .= "-copy";
			if (!file_exists("{$workingdir}/{$theme}")) mkdir("{$workingdir}/{$theme}", 0777, true);
			file_put_contents("{$workingdir}/{$theme}/{$name}.theme", $data);
			$result->key = "{$name}";
			Utils::Stop(200, json_encode($result), false, "application/json");
		}
		Utils::Stop(400);
		break;

	case "storecourse":
		$result->ok = false;
		if (!isset($_FILES['file'])) {
			$result->error = "File upload not present";
			Utils::Stop(400, json_encode($result), false, "application/json");
		}
		if (!file_exists("{$workingdir}/published")) mkdir("{$workingdir}/published", 0777, true);
		$name =  basename($_FILES["file"]["name"]);

		// uh oh, we already have this course name, better make a copy
		if (file_exists("{$workingdir}/published/{$name}")) {
			$name = pathinfo($name, PATHINFO_FILENAME) . "-" . date("YmdHis", strtotime("now")) . ".zip";
		}

		if (move_uploaded_file($_FILES['file']['tmp_name'], "{$workingdir}/published/{$name}")) {
			// TODO: check if file is already writable by www-data, so we can remove it
			@chmod("{$workingdir}/published/{$name}",0775);
			$result->ok = true;
			$result->filesize = Utils::formatBytes(filesize("{$workingdir}/published/{$name}"));
			$result->name = $name;
			$result->date = date("D d M Y H:i:s", time());
		} else {
			$result->error = "Unable to process upload";
		}
		Utils::Stop(200, json_encode($result), false, "application/json");
		break;

	case "removecourse":
		$result->ok = false;
		$name = Request::post("name");
		$name = str_replace(['..','/','\\'],'',$name);
		if (file_exists("{$workingdir}/published/{$name}")) {
			unlink ("{$workingdir}/published/{$name}");
			$result->ok = true;
		}
		Utils::Stop(200, json_encode($result), false, "application/json");
		break;

	case "loadcourse":
		$name = Request::post("name");
		$name = str_replace(['..','/','\\'],'',$name);
		$path = "{$workingdir}/published/{$name}";
		if (file_exists($path)) {
            header($_SERVER["SERVER_PROTOCOL"] . " 200 OK");
            header("Cache-Control: public");
            header("Content-Type: application/zip");
            header("Content-Transfer-Encoding: Binary");
            header("Content-Length:".filesize($path));
            header("Content-Disposition: attachment; filename={$name}");
            readfile($path);
            die();
        } else {
        	Utils::Stop(404, "File not found");
        }
        break;

}