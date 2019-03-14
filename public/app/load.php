<?php
require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20190314132007';
$minified_css = 'css/app.min.20190314132007.css';
$minified_app = 'js/app.min.20190314132007.js';
$minified_head = 'js/head.min.20190314132007.js';
?>
