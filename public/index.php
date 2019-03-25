<?php
define("APP", realpath("."));

use PHPMailer\PHPMailer\PHPMailer;

require "../vendor/autoload.php";
$Router = new AltoRouter();

$Router->map('GET','/','home.inc.php');
$Router->map('GET','/faq','faq.inc.php');
$Router->map('GET','/changelog','changelog.inc.php');
$Router->map('GET','/privacy','policy.inc.php');
$Router->map('POST','/email', 'handleContactForm');

$path = realpath("./routes");

$match = $Router->match();
if ($match) {
	$fn = $match["target"];
	if ($fn === "handleContactForm") {

		$sender_email = stripslashes($_POST["email"]);
		$sender_message = stripslashes($_POST["message"]);

		$captcha=$_POST['g-recaptcha-response'];
		$ip = $_SERVER['REMOTE_ADDR'];
		$secretkey = "6Ld7tpkUAAAAABujByC4qzwjhUVxF2fyuhNXA-XU";
		$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretkey."&response=".$captcha."&remoteip=".$ip);
		$responseKeys = json_decode($response,true);
		if (intval($responseKeys["success"]) === 1) {

			$mail = new PHPMailer(false);
			$mail->CharSet = 'UTF-8';
			$mail->IsSMTP();
			$mail->SMTPDebug = 2;
			$mail->SMTPAuth = true;
			$mail->SMTPSecure = 'tls';
			$mail->Host = 'smtp.gmail.com';
			$mail->Username = 'info@coursesuite.com';
			$mail->Password = '6Jcf28Aa4wC}O5TBYMtLHxfo3g';
			$mail->Port = 587;
			$mail->From = 'info@coursesuite.com';
			$mail->FromName = 'Course Assembler';
			$mail->AddAddress('info@coursesuite.com');
		    $mail->addCC($sender_email);
			$mail->Subject = 'Course Assembler contact form';
			$mail->Body = $sender_message;
			$mail->Send();

        }
        header("location:/");
        die();
	}
	require $path. '/_header.inc.php';
	include $path . "/{$fn}";
	require $path . '/_footer.inc.php';
} else {
  header("HTTP/1.0 404 Not Found");
}



?>