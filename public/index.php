<?php
define("APP", realpath("."));
define("CACHE", false);

use PHPMailer\PHPMailer\PHPMailer;

require "../vendor/autoload.php";
$Router = new AltoRouter();

$Router->map('GET','/','home.inc.php', 'Home');
$Router->map('GET','/faq','faq.inc.php', 'FAQ');
$Router->map('GET','/features','features.inc.php', 'Features');
$Router->map('GET','/features/[*:page]?','features.inc.php', 'Feature');
$Router->map('GET','/pricing','pricing.inc.php', 'Pricing');
$Router->map('GET','/how-it-works','how.inc.php', 'How it works');

// $Router->map('GET','/contact','contact.inc.php','Contact');
$Router->map('GET','/privacy','policy.inc.php', 'Policies');
$Router->map('GET','/validate/[*:key]?', 'keyValidator');

// $Router->map('GET', '/app/[*]/[*]', 'serve');
$Router->map('GET','/app/[*:key]?', 'launch');

$Router->map('GET','/account', 'account.inc.php', 'Account');
$Router->map('POST','/account', 'account.inc.php', 'Account Information');

$Router->map('GET','/blog/[*:entry]+', 'entry');
$Router->map('GET','/blog', 'blog.inc.php');
$Router->map('GET','/blog/', 'blog.inc.php');

$Router->map('POST','/email', 'handleContactForm');
$Router->map('POST','/checkout', 'handleOrder');
$Router->map('POST','/licence', 'keyGenerator');

$Router->map('POST','/order', 'handleOrder');
$Router->map('POST','/subscribe', 'handleSubscription');
$Router->map('POST','/unsubscribe', 'handleUnsubscription');

$match = $Router->match();
$BlogRoot = '/entries';

if ($match) {
	$fn = $match["target"];
	switch ($fn) {

		// case "serve":
		// header('content-type: text/plain');
		// 	echo __DIR__ . $_SERVER['REQUEST_URI'], PHP_EOL;
		// 	$p = realpath(__DIR__ . '/' . $_SERVER['REQUEST_URI']);
		// 	if (file_exists($p))
		// 	die($p);
		// die(__DIR__);
		// 	readfile('.'.$_SERVER['REQUEST_URI']);
		// 	die();
		// 	break;

		case "entry";
			renderEntry($match['params']['entry']);
			die();
			break;

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
			$log = new dbRow("log");
			$log->method_name = $fn;
			$log->param2 = file_get_contents("php://input");
			$log->param1 = serialize($_GET);
			$log->param0 = serialize($_POST);
			$log->save();
			die();
	      	break;

			// sets the end date of an existing subscription to be yesterday
			// handles deactivated, canceled, paused
		  case "handleUnsubscription":
	      	$licence = Licence::unsubscribe();
			Response::text($licence);
			break;

			// subscribing is the same as generating a key; just we don't have an end date;
			// handles uncanceled, activated, resumed
		  case "handleSubscription":
	      case "keyGenerator":
	        $licence = (new Licence())->get();
	        header("Content-Type: text/plain");
	        die($licence);
	      	break;

	      case "keyValidator":
	      	die (json_encode(Licence::validate($match['params']['key'])));
	      	break;

	    default:

			$page_title = $match["name"];
			$page_disk = "cache." . strtolower($page_title) . ".html";

	    //if (!file_exists($page_disk) || !CACHE) {
			//	ob_start();
				render($fn, $page_title);
		 //file_put_contents($page_disk, ob_get_contents());
			//	ob_end_flush();
				//ob_end_clean();
			//}
			//include $page_disk;
	}
} else {
  header("HTTP/1.0 404 Not Found");
}

function render($fn, $page_title = '') {
	$path = realpath("./routes");
	if (file_exists($path . "/{$fn}")) {
		require $path. '/_header.inc.php';
		include $path . "/{$fn}";
		require $path . '/_footer.inc.php';
	} else {
	  header("HTTP/1.0 404 Not Found");
	}
//	die();
}

function renderEntry($date, $fn = 'blogentry') {
global $BlogRoot;
	list($Y,$M,$D) = explode('-',$date);
	$entrypath = "{$BlogRoot}/{$Y}/{$M}/{$D}/";
	$entrypathreal = realpath('./'.$entrypath);
	$path = realpath("./routes");
	require $path. '/_header.inc.php';
	echo '<div class="uk-section">
    <div class="uk-container uk-margin-large">
    	<h2 class="uk-text-center uk-margin-xlarge-bottom tilt"><span>Blog</span></h2>
		';

	// $Iter = new DirectoryIterator($entrypathreal);
	// $SortedIterator = new SortingIterator($Iterator,'mysort');
	// $Regex = new RegexIterator($SortedIterator->getIterator(), '/^.+\.html$/i', RecursiveRegexIterator::GET_MATCH);
	// $Regex = new RegexIterator($Iter, '/^.+\.html$/i', RecursiveRegexIterator::GET_MATCH);
	$description = "";
	$title = (DateTime::createFromFormat("Y-m-d", $date))->format("j M, Y");
	echo "<p>&#x25A0; <a href='/'>CourseAssembler</a> &#x25BA; <a href='/blog/'>Blog</a> &#x25BA; <a href='/blog/{$date}'>", $title, "</a></p>", PHP_EOL;
	foreach (array_diff(scandir($entrypathreal), ['.','..']) as $file) {
		if (strpos($file, '.html') !== false) {
			$entry = file_get_contents($entrypathreal . '/' . $file);
			if (empty($description)) {
				$description = strip_tags($entry);
				$description = str_replace(PHP_EOL,' ',$description);
				$description = substr($description, 0, 127) . "...";
			}
			echo str_replace(['src="',"src='"],['src="'.$entrypath,"src='{$entrypath}"], $entry);
		}
	}
	echo "<p class='uk-small'><a href='/blog/' class='uk-button uk-button-primary'><span uk-icon='chevron-double-left'></span> Return to blog</a></p>";
	echo "
	<div id='disqus_thread'></div>
	<script>
		/**
		*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
		*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
		/*
		var disqus_config = function () {
			this.page.url = location.href;  // Replace PAGE_URL with your page's canonical URL variable
			this.page.identifier = '{$date}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
			this.page.title = '{$description}';
		};
		*/
		(function() { // DON'T EDIT BELOW THIS LINE
		var d = document, s = d.createElement('script');
		s.src = 'https://courseassembler.disqus.com/embed.js';
		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
		})();
	</script>
	<noscript>Please enable JavaScript to view the <a href='https://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript>
	";
	echo "</div></div>";
	require $path . '/_footer.inc.php';
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

