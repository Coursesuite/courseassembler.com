<?php
/*
 * This page accepts an upload from the main javascript publish-to feature
 * This will be a HTTP POST
 *
 */

function stop($message, $code = 200) {
	http_response_code($code);
	die($message);
}

$method = $_SERVER['REQUEST_METHOD'];
if ($method == 'OPTIONS') {
	$host = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://{$_SERVER['HTTP_HOST']}";
    header("Access-Control-Allow-Origin: {$host}");
	header("Access-Control-Allow-Headers: X-Requested-With, X-Filename, Authorization");
	header('Access-Control-Allow-Methods: POST');
} else if ($method !== 'POST') {
	stop("Bad method", 400);
}
session_start();

$dest 			= $_GET['dest']; if (empty($dest)) stop("Bad desination", 404);
$sesskey 		= $_GET['sesskey']; if ($sesskey !== $_SESSION['sesskey']) stop("Bad session key", 500);
$bearer_token 	= $_GET['bearer']; if (empty($bearer_token)) stop("Bad token", 500);;
$localFile 		= realpath($_FILES['file']['tmp_name']);
$localName		= $_FILES['file']['name'];
$localMime		= $_FILES['file']['type'];
$localSize		= $_FILES['file']['size'];
$result 		= '';
$method 		= "AARGH"; // after much frustration

$headers = [
	'Authorization: Bearer ' . $bearer_token,
	'X-Filename: ' . $localName,
	'Content-Length: ' . $localSize,
	'Content-Type: ' . $localMime
];

// $dest = "https://courseassembler.free.beeceptor.com";

if ($method === "PUT") { // in php 7.4 the file size is zero
	// $headers[] = 'Transfer-Encoding: chunked'; // but we know the content-length
	$stream = fopen($localFile, 'r');
	$ch = curl_init($dest);
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_UPLOAD, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_READFUNCTION, function($ch, $fd, $length) use ($stream) {
	    $result = fread($stream, $length);
	});
	$result = curl_exec($ch);
	fclose($stream);
	curl_close($ch);
} else if ($method === "POST") { // doesn't work in php 7.4

	$upload = new CURLFile($localFile, $localMime, $localName);

	$ch=curl_init();
	curl_setopt($ch, CURLOPT_URL, $dest);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, ['file' => $upload]);
	$result = curl_exec($ch);
	curl_close($ch);

} else if ($method === "AARGH") { // this works, it's actually PUT
	$file = fopen($localFile, "rb");
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_URL, $dest);
	curl_setopt($curl, CURLOPT_PUT, 1);
	curl_setopt($curl, CURLOPT_INFILE, $file); // TODO: solve for giant courses
	curl_setopt($curl, CURLOPT_INFILESIZE, $localSize);
	$result = curl_exec($curl);
	curl_close($curl);
	fclose($file);
}
stop($result);