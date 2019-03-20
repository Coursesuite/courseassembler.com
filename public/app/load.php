<?php
require_once('../../vendor/autoload.php');
$verifier = (new CoursesuiteValidator())->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20190320225410';
$minified_css = 'css/app.min.20190320225410.css';
$minified_app = 'js/app.min.20190320225410.js';
$minified_head = 'js/head.min.20190320225410.js';
?>
