<?php
require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator())->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20190315135846';
$minified_css = 'css/app.min.20190315135846.css';
$minified_app = 'js/app.min.20190315135846.js';
$minified_head = 'js/head.min.20190315135846.js';
?>
