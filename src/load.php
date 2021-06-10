<?php
defined('APP')?assert(true):die();

session_start();
if (!isset($_SESSION['sesskey'])) {
	$_SESSION['sesskey'] = md5(time());
}

error_reporting(E_ERROR);
ini_set("display_errors", 1);

putenv("HOME_URL=https://courseassembler.com.test/");
define('DEVELOPER', true);

require_once('../vendor/autoload.php');
$verifier = Licence::validate(Request::get("hash"));

$settings = [
	"design" => "list",
];