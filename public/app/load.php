<?php
require_once('../../vendor/autoload.php');
session_start();
if (!isset($_SESSION['sesskey'])) $_SESSION['sesskey'] = md5(time());
$verifier = Licence::validate(Request::get('hash'));
$timestamp = '20210901133037';
$minified_css = 'css/app.min.20210901133037.css';
$minified_app = 'js/app.min.20210901133037.js';
?>
