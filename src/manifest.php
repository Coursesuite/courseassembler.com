<?php

require_once('../vendor/autoload.php');

$log = new dbRow("log");
$log->method_name = "manifest";
$log->param0 = file_get_contents("php://input");
$log->param1 = serialize($_POST);
$log->save();
