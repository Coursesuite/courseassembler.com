<?php
// only alow execution from within app
defined('APP') ? assert(true) : die();

// start php session
session_start();
if (!isset($_SESSION['sesskey'])) {
	$_SESSION['sesskey'] = md5(time());
}

// define error reporting
error_reporting(E_ERROR);
ini_set("display_errors", 1);

putenv("HOME_URL=https://courseassembler.com.test/");
define('DEVELOPER', true);

// find and include the autoloader
$AUTOLOADER_fold = __DIR__; $AUTOLOADER_path = ""; $AUTOLOADER_exit = false;
do {
	$AUTOLOADER_fold = dirname($AUTOLOADER_fold);
	if (file_exists($AUTOLOADER_path."vendor") || $AUTOLOADER_fold === "/") {
		$AUTOLOADER_exit = true;
	} else {
		$AUTOLOADER_path .= "../";
	}
} while ($AUTOLOADER_exit === false);
require_once($AUTOLOADER_path . 'vendor/autoload.php');

// validate the licence key
$verifier = Licence::validate(Request::get("hash"));

$settings = [
	"design" => "list",
];