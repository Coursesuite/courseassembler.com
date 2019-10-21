<?php
defined('APP')?assert(true):die();

session_start();
if (!isset($_SESSION['sesskey'])) {
	$_SESSION['sesskey'] = md5(time());
}

error_reporting(E_ERROR);
ini_set("display_errors", 1);

putenv("AUTHAPI_URL=https://coursesuite.ninja.test/api/validate/courseassembler/{hash}/");
putenv("AUTHAPI_USER=tokenuser");
putenv("AUTHAPI_PASSWORD=GEv6mJ7wJgWR");
putenv("HOME_URL=http://courseassembler.com.test/");

require_once('../vendor/autoload.php');
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->code->minified = false;

$settings = [
	"design" => "list",
];