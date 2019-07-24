<?php
require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator())->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20190724112239';
$minified_css = 'css/app.min.20190724112239.css';
$minified_app = 'js/app.min.20190724112239.js';
?>
