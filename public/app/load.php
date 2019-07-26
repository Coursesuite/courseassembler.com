<?php
require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator())->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20190726115822';
$minified_css = 'css/app.min.20190726115822.css';
$minified_app = 'js/app.min.20190726115822.js';
?>
