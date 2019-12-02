<?php
require_once('../../vendor/autoload.php');
session_start();
if (!isset($_SESSION['sesskey'])) $_SESSION['sesskey'] = md5(time());
$verifier = (new CoursesuiteValidator(false,false))->Validate($_GET);
$verifier->code->minified = true;
$timestamp = '20191202125355';
$minified_css = 'css/app.min.20191202125355.css';
$minified_app = 'js/app.min.20191202125355.js';
?>
