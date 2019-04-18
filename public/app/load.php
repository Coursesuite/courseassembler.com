<?php
require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20190326131436';
$minified_css = 'css/app.min.20190326131436.css';
$minified_app = 'js/app.min.20190326131436.js';
?>
