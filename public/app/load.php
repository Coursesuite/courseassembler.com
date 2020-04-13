<?php
require_once('../../vendor/autoload.php');
session_start();
if (!isset($_SESSION['sesskey'])) $_SESSION['sesskey'] = md5(time());
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20200203175045';
$minified_css = 'css/app.min.20200203175045.css';
$minified_app = 'js/app.min.20200203175045.js';
?>
