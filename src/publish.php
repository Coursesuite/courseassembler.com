<?php
$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'OPTIONS') {
	$host = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}";
    header("Access-Control-Allow-Origin: {$host}");
	header("Access-Control-Allow-Headers: X-Requested-With, X-Filename, Authorization");
	header('Access-Control-Allow-Methods: PUT, POST');
} else if ($method !== 'POST') {
	die();
}
session_start();

$dest = $_GET['dest']; if (empty($dest)) die();
$sesskey = $_GET['sesskey']; if ($sesskey !== $_SESSION['sesskey']) die();

$localFile = $_FILES[$fileKey]['tmp_name'];
$stream = fopen($localFile, 'r');
$ch = curl_init($dest);
// Send a PUT request
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
// Let curl know that we are sending an entity body
curl_setopt($ch, CURLOPT_UPLOAD, true);
// Let curl know that we are using a chunked transfer encoding
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Transfer-Encoding: chunked'));
// Use a callback to provide curl with data to transmit from the stream
curl_setopt($ch, CURLOPT_READFUNCTION, function($ch, $fd, $length) use ($stream) {
    return fread($stream, $length) ? '';
});

curl_exec($ch);
echo "ok";