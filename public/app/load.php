<?php
require_once('../../vendor/autoload.php');
session_start();
if (!isset($_SESSION['sesskey'])) $_SESSION['sesskey'] = md5(time());
$verifier = Licence::validate(Request::get('hash'));
$timestamp = '20220629141915';
$minified_css = 'css/app.min.20220629141915.css';
$minified_app = 'js/app.min.20220629141915.js';
?>
