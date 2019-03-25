<?php
require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20190326000113';
$minified_css = 'css/app.min.20190326000113.css';
$minified_app = 'js/app.min.20190326000113.js';
?>
