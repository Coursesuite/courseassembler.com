<?php
define("APP", realpath("."));

use PHPMailer\PHPMailer\PHPMailer;

require "../vendor/autoload.php";
$Router = new AltoRouter();

$Router->map('GET','/','home.inc.php', 'Home');
$Router->map('GET','/faq','faq.inc.php', 'FAQ');
$Router->map('GET','/changelog','changelog.inc.php', 'Changelog');
$Router->map('GET','/contact','contact.inc.php','Contact');
$Router->map('GET','/privacy','policy.inc.php', 'Policies');
$Router->map('GET','/validate/[*:key]?', 'keyValidator');
$Router->map('GET','/app/[*:key]?', 'launch');
$Router->map('GET','/blog/[**:entry]', 'blogEntry');

$Router->map('POST','/email', 'handleContactForm');
$Router->map('POST','/checkout', 'handleOrder');
$Router->map('POST','/licence', 'keyGenerator');

$match = $Router->match();

if ($match) {
	$fn = $match["target"];
	switch ($fn) {
		case "handleContactForm":

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
				$mail->Username = 'info@courseassembler.com';
				$mail->Password = '6Jcf28Aa4wC}O5TBYMtLHxfo3g';
				$mail->Port = 587;
				$mail->From = 'info@courseassembler.com';
				$mail->FromName = 'Course Assembler';
				$mail->AddAddress('info@courseassembler.com');
			    $mail->addCC($sender_email);
				$mail->Subject = 'Course Assembler contact form';
				$mail->Body = $sender_message;
				$mail->Send();

	        }
	        header("location:/");
	        die();
	        break;

	      case "handleOrder":
	      	die();
	      	break;

	      case "keyGenerator":
	        $licence = (new Licence())->get();
	        header("Content-Type: text/plain");
	        die($licence);
	      	break;

	      case "keyValidator":
	      	die (json_encode(Licence::validate($match['params']['key'])));
	      	break;

	    default:
			// otherwise
			$page_title = $match["name"];
			render($fn, $page_title);

	}
} else {
  header("HTTP/1.0 404 Not Found");
}

function render($fn, $page_title = '') {
	$path = realpath("./routes");
	require $path. '/_header.inc.php';
	include $path . "/{$fn}";
	require $path . '/_footer.inc.php';
	die();
}

// count the number of files changed in a directory in the given time
function badge($fold, $ago = "-1 week") {
	$path = realpath("./assets") . $fold;
	$week = strtotime($ago);
	$count = 0;
	foreach (new DirectoryIterator($path) as $value) {
		if ($value->isFile() && $value->getExtension()==="md") {
            $name = substr($value->getFilename(), 0, -3); // file name without .md extension
            $date = strtotime($name); // "2017-05-24 00:00:00.md" => 1495584000
            if ($date >= $week) {
				// } && $value->getMTime() >= $week) {
				$count++;
			}
		}
	}
	if ($count>0) {
		echo "<span class='uk-badge' title='New items in last 7 days'>{$count}</span>";
	}
}

?>