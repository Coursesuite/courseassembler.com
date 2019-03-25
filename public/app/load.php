<?php
require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator())->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20190325145156';
$minified_css = 'css/app.min.20190325145156.css';
$minified_app = 'js/app.min.20190325145156.js';
$minified_head = 'js/head.min.20190325145156.js';
?>
