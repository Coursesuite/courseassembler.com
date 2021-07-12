<?php

require_once('../../vendor/autoload.php');

$log = new dbRow("log");
$log->method_name = "endpoint";
$log->param2 = file_get_contents("php://input");
$log->param1 = serialize($_GET);
$log->param0 = serialize($_POST);
$log->save();
