<?php
require_once('../../vendor/autoload.php');
session_start();
if (!isset($_SESSION['sesskey'])) $_SESSION['sesskey'] = md5(time());
$verifier = (new CoursesuiteValidator())->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20200424192912';
$minified_css = 'css/app.min.20200424192912.css';
$minified_app = 'js/app.min.20200424192912.js';
?>
