<?php
define("APP",true);
include("load.php");

// todo: implement caching
// $themes = [];
// foreach (glob(realpath(dirname(__FILE__)) . '/plugins/Theme/themes/*.json') as $json) {
// 	$themes[] = substr(basename($json), 0, -5);
// 	// $obj = json_decode(file_get_contents($json));
// 	// $themes[substr(basename($json), 0, -5)] = $obj->elements; 
// 	// [ //substr(basename($json), 0, -5)] = 
// 	// 	"name" => $obj->name,
// 	// 	"elements" => $obj->elements
// 	// ];
// }

$jsApp = new stdClass();
$jsApp->Hash = $verifier->hash;
$jsApp->Home = $verifier->home;
$jsApp->Tier =  $verifier->licence->tier;
$jsApp->Api = isset($verifier->api);
$jsApp->Timestamp = "$timestamp";
$jsApp->Minified = $verifier->code->minified;
// $jsApp->Themes = $themes;

// if publish url is not https proxy it through publish.php
if (isset($verifier->api->publish) && !empty($verifier->api->publish)) {
	$jsApp->Bearer = $verifier->api->bearer;
	$jsApp->Method = "POST";
	if (strpos($verifier->api->publish,"https:") === false) {
		$jsApp->Publish = "publish.php?dest=" . rawurlencode($verifier->api->publish) . "&sesskey=" . $_SESSION['sesskey'] . "&bearer=" . rawurlencode($jsApp->Bearer);
	} else {
		$jsApp->Publish = $verifier->api->publish;
	}
}

// api url = coursesuite url / api / dl / apikey / appkey / template.zip
$api_template = isset($verifier->api->template) ? $verifier->api->template : "";

// sort function used by directoryiterator
function dSort($a, $b) {
	$col = 2; // 0=name, 1=size, 2=timestamp
	$x = $b[$col]; // x = b if decending order
	$y = $a[$col]; // y = b if ascending order
	if (strcmp($x,$y) < 0) return -1;
	elseif (strcmp($x,$y) > 0) return 1;
	else return 0;
}
$headJS = [];
$headCSS =[];

// https://docs.sentry.io/platforms/javascript/install/cdn/
//https://cloudconvert.com/api/v2
// https://app.fastspring.com/app/custom.xml

$headJS[] = '<script async src="https://www.googletagmanager.com/gtag/js?id=G-0FLZ6RBMYH"></script>';
$headJS[] = '<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "G-0FLZ6RBMYH");</script>';

if ($verifier->code->minified) {
// $headJS[] = '<script src="//d2wy8f7a9ursnm.cloudfront.net/v6/bugsnag.min.js"></script>';
// $headJS[] = '<script>window.bugsnagClient = bugsnag("f76cf5ad15cc64817fbf675a994d5438")</script>';
    $headJS[] = '<script src="https://browser.sentry-cdn.com/5.21.1/bundle.min.js" crossorigin="anonymous"></script>';
    $headJS[] = '<script>window.addEventListener("DOMContentLoaded", function() { Sentry.init({ dsn: "https://1108ee823d3d47b1b9df334357028940@sentry.io/1466310" }); });</script>';
}

$headJS[] = '<script type="text/javascript" src="https://static-cdn.kloudless.com/p/platform/sdk/kloudless.explorer.js"></script>';
//$headJS[] = '<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/gemini-scrollbar@1.5.3/index.min.js"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.9.0/localforage.min.js"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/classie/1.0.1/classie.min.js"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.6.0/Sortable.min.js"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>';
// $headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/datalist-polyfill/1.24.4/datalist-polyfill.min.js" integrity="sha512-njgkJe8kuqyz2AauUKsvQ3fhqbLsshNovMTWXLmy7x+lfrHdF8TxDlLQofXG9EBYirKYWmNJlGs0qA7340U6ug==" crossorigin="anonymous"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js" async="true"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js" async="true"></script>';
$headJS[] = '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.0.1/color-thief.min.js" async="true"></script>';

$headCSS[] = '<link href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en" rel="stylesheet" type="text/css">';
// $headCSS[] = '<link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" type="text/css">';
// $headCSS[] = '<link href="https://cdn.jsdelivr.net/npm/gemini-scrollbar@1.5.3/gemini-scrollbar.min.css" rel="stylesheet" type="text/css">';

?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Course Assembler</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Rapidly convert your content to HTML5, add quizzes and video and package with a SCORM wrapper" />
		<meta name="keywords" content="Course Assembler, scorm modules, scorm content, scorm wrapper, scorm authoring tool, scorm packages ppt to scorm, pptx to scorm, powerpoint to scorm, docx to scorm, pdf to scorm, video to scorm, google slides to scorm, google docs to scorm" />
		<meta name="author" content="https://github.com/Coursesuite" />
		<link rel="shortcut icon" href="/favicon.ico">
<?php

echo implode(PHP_EOL, $headCSS), PHP_EOL;
echo implode(PHP_EOL, $headJS), PHP_EOL;

// include styles defined in plugins
$p = realpath('./plugins');
$plugins = [];
$js = [];
$css = [];
$iter = new RegexIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($p)), '/^.+(plugin|templates|FontPicker)\.(css|js)$/', RecursiveRegexIterator::GET_MATCH);
foreach ($iter as $file) {
	if ($file[1] === "plugin") $plugins[] = basename(dirname($file[0]));
	if ($file[2] === "css") {
		$css[] = '<link href="plugins' . substr($file[0], strlen($p)) . '" rel="stylesheet" type="text/css">';
	} else {
		$js[] = '<script src="plugins' . substr($file[0], strlen($p)) . '"></script>';
	}
}
echo implode(PHP_EOL, $css), PHP_EOL;
?>
		<script src="js/modernizr.custom.js"></script>
		<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"></script>
		<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?>, Layer = undefined, PLUGINS = <?php echo json_encode($plugins); ?>;</script>
<?php if ($verifier->code->minified) { ?>
		<link rel="stylesheet" type="text/css" href="<?php echo $minified_css; ?>" />
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		  ga('create', 'UA-68767047-3', 'auto');
		  ga('send', 'pageview');
		</script>
<?php } else { ?>
		<link rel="stylesheet" type="text/css" href="css/app.css" />
<?php } ?>
</head>

<?php if ($verifier->valid) { ?>

<body class="add-documents">

	<section class="page-fixed-top">
		<header id="banner">
			<div>
				<img src="img/course_assembler.svg" width="40" height="40" style="vertical-align:middle">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 862.68 59.62" height="16"><path d="M49.42,18H39l.72-4.51a3.16,3.16,0,0,0-3-3.79H19.92a4.76,4.76,0,0,0-4.2,3.79L10.6,46a3.16,3.16,0,0,0,3,3.79h16.8A4.66,4.66,0,0,0,34.57,46l.72-4.61H45.73L45,46C43.79,54,38.15,59.41,30,59.41H13.67c-8.4,0-14.75-5.84-13.52-13.83L5.38,13.32C6.71,5.33,12.55,0,20.74,0H38C45.12,0,51.16,7.17,50,14.44Z" fill="#231f20"/><path d="M103,46.09c-1.34,8.3-7.07,13.32-15.68,13.32H69.4c-8.4,0-14.55-5.84-13.32-13.83l5.23-32.37C62.64,5.12,68.68,0,77.49,0H95.72c7.79,0,13.52,6.56,12.4,13.83ZM94.9,9.53H75.65a4.64,4.64,0,0,0-4.2,3.79L66.32,46.09a3.11,3.11,0,0,0,3,3.79H88.55a4.65,4.65,0,0,0,4.2-3.79L98,13.32A3.18,3.18,0,0,0,94.9,9.53Z" fill="#231f20"/><path d="M161.69,45.89c-1.33,8.3-7.17,13.52-15.57,13.52H130.35c-8.4,0-14.75-5.84-13.53-13.83L124.1,0h10.65l-7.27,46.09a3.11,3.11,0,0,0,3,3.79h16.39a4.66,4.66,0,0,0,4.2-3.79L158.31,0H169Z" fill="#231f20"/><path d="M223.76,20.28a13.28,13.28,0,0,1-5.94,9.32c2.77,2,3.69,4.82,3.08,8.61l-3.38,21.2H207.07L210.24,39c.52-3.38-.41-4.41-3.58-4.41H187.09L183.2,59.41H173.06L182.48,0h29.91c7.79,0,13.42,6.86,12.3,13.83ZM211.47,9H191.19l-2.46,15.78h19.16c3.79,0,4.81-1,5.32-4.61l1.13-7.07C214.75,11,213.21,9,211.47,9Z" fill="#231f20"/><path d="M281,17.72H270.78l.72-4.4a3.18,3.18,0,0,0-3.08-3.79h-16a4.64,4.64,0,0,0-4.19,3.79L247,21.1c-.93,6,11.57,3.89,19,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H246.09c-8.7,0-14.85-5.84-13.62-13.83l.62-3.79h10.24l-.72,4.3a3.16,3.16,0,0,0,3,3.79h17.31a4.75,4.75,0,0,0,4.2-3.79l1.13-7.68c1-6-11.47-4-19-4.2-8.3-.31-13.52-6.56-12.29-14.24l1.12-7C239.44,4.92,245.58,0,254.19,0h15.05c7.69,0,13.52,6.66,12.4,13.83Z" fill="#231f20"/><path d="M334.08,9.53H305.81l-2.46,15.36h21.92l-1.53,9.73H301.82l-2.36,15.26h28.27l-1.53,9.53H287.68L297.11,0h38.51Z" fill="#231f20"/><path d="M418.59,59.41H408.25l3-18.74H386.84l-3,18.74H373.52l5.74-36.16a13.72,13.72,0,0,1,5.43-9.83L401,0h9l12,13.42c2.66,3,3,5.63,2.36,9.83Zm-5.43-39.54L403.94,9c-.61.82-12.49,10.86-12.49,10.86-1.44,1.23-1.54,1.74-1.85,3.89l-1.33,7.89h24.38l1.23-7.89C414.19,21.61,414.29,21.1,413.16,19.87Z" fill="#231f20"/><path d="M482,17.72H471.75l.72-4.4a3.18,3.18,0,0,0-3.07-3.79h-16a4.65,4.65,0,0,0-4.2,3.79L448,21.1c-.92,6,11.57,3.89,19.05,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H447.07c-8.71,0-14.85-5.84-13.63-13.83l.62-3.79H444.3l-.71,4.3a3.16,3.16,0,0,0,3,3.79h17.31a4.76,4.76,0,0,0,4.2-3.79l1.12-7.68c1-6-11.47-4-18.95-4.2C442,34.11,436.72,27.86,438,20.18l1.13-7C440.41,4.92,446.56,0,455.16,0h15.06c7.68,0,13.52,6.66,12.39,13.83Z" fill="#231f20"/><path d="M538.34,17.72H528.09l.72-4.4a3.18,3.18,0,0,0-3.07-3.79h-16a4.65,4.65,0,0,0-4.2,3.79l-1.23,7.78c-.92,6,11.57,3.89,19.05,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H503.41c-8.71,0-14.86-5.84-13.63-13.83L490.4,42h10.24l-.72,4.3a3.17,3.17,0,0,0,3,3.79h17.32a4.76,4.76,0,0,0,4.2-3.79l1.12-7.68c1-6-11.47-4-18.95-4.2-8.29-.31-13.52-6.56-12.29-14.24l1.13-7C496.75,4.92,502.89,0,511.5,0h15.06c7.68,0,13.52,6.66,12.39,13.83Z" fill="#231f20"/><path d="M591.4,9.53H563.13l-2.46,15.36h21.92l-1.54,9.73H559.13l-2.36,15.26h28.28l-1.54,9.53H545L554.42,0h38.51Z" fill="#231f20"/><path d="M643.94,59.41H633.5l6.65-42.2L627.35,29.5H621l-8.91-12.29-6.66,42.2H595L604.41,0h8.5l13.21,19C626.84,17.72,644.87,0,644.87,0h8.5Z" fill="#231f20"/><path d="M707.25,20.08c-.72,4.5-3,7.68-5.84,9.32,2.46,1.33,3.58,4.81,3,8.6l-1.23,8.09c-1.23,8-6.86,13.32-15.16,13.32H657.57L667,0h28.68c7.79,0,13.73,6.45,12.5,14ZM690.45,34H671.7l-2.56,16.28H688.4a4.75,4.75,0,0,0,4.2-4.09l1.23-7.28C694.34,35.13,693.73,34,690.45,34ZM695,9.22H675.7l-2.46,15.47h18.13c3.79,0,4.82-1.13,5.43-4.72l1-6.65C698.23,11.17,696.7,9.22,695,9.22Z" fill="#231f20"/><path d="M751.71,59.41H714.42L723.84,0H734.5l-7.89,49.88h26.63Z" fill="#231f20"/><path d="M807.33,9.53H779.06L776.6,24.89h21.92L797,34.62H775.06L772.7,49.88H801l-1.54,9.53H760.93L770.35,0h38.51Z" fill="#231f20"/><path d="M861.62,20.28a13.34,13.34,0,0,1-5.94,9.32c2.76,2,3.68,4.82,3.07,8.61l-3.38,21.2H844.92L848.1,39c.51-3.38-.41-4.41-3.59-4.41H825l-3.9,24.79H810.91L820.34,0h29.91c7.78,0,13.42,6.86,12.29,13.83ZM849.32,9H829l-2.46,15.78h19.16c3.79,0,4.81-1,5.33-4.61l1.12-7.07C852.6,11,851.07,9,849.32,9Z" /></svg>
			</div>
			<div>
				<button data-action="pop-help" data-url="/docs"><i class="ninja-help"></i>Documentation</button>
				<button data-action="toggle-settings" data-popover="settings" data-label="App settings"><i class="ninja-fiddle"></i>Settings</button>
				<button data-action="clear-storage" data-popover="yesno" data-label="Reset all settings and content? (no undo)"><i class="ninja-stand-by"></i>Reset</button>
			</div>
		</header>

		<nav id="tabs">
			<a href="javascript:;" data-tab="add-documents"><i class="ninja-add-documents"></i> Add <span>documents</span></a>
			<a href="javascript:;" data-tab="change-settings"><i class="ninja-show-sidebar"></i> Choose a <span>design</span></a>
			<a href="javascript:;" data-tab="download-zip"><i class="ninja-floppy-disk3"></i> <span>Download</span> your package</a>
		</nav>
	</section>

	<section id="add-documents">
		<div class="toolbar">
			<div id="nav-actions" class="flex-v pad-left">
				<button data-action="toggle-add-content" data-popover="addcontent" data-label="Add content"><i class="ninja-document-add"></i>Add ...</button>
				<button data-action="import-content"><i class="ninja-folder-outline-add"></i>Import zip</button>
			</div>
			<div id="fields" class="flex-v"></div>
		</div>
		<div id="scroll-area"><ol id="nav-item-list"></ol></div>
		<div id="preview"></div>
	</section>

	<section id="change-settings">
		<section id="nav-selection">
			<h3 class="w-80 m-lr-auto m-t-large">Designs are not applicable when <b>IMSCP Compatibility</b> is selected.</h3>
			<?php include "tab.design.php"; ?>
		</section>
	</section>

	<section id="download-zip">
		<form id="settings" class="w-80 m-lr-auto m-t-large">

			<section id="basic-options" class="settings-panel">
				<label for="ocn">Package Name<small class="r">required</small></label>
				<input type="text" size="30" placeholder="Course name" name="option-course-name" id="ocn">
				<label for="ocd">Description<small>optional</small></label>
				<textarea rows="2" cols="30" placeholder="Description" name="option-course-description" id="ocd"></textarea>
				<label for="occ">Copyright<small>optional</small></label>
				<input type="text" size="30" placeholder="Copyright statement" name="option-course-copyright" id="occ">
				<label for="gax">Google Analytics Id<small>optional</small></label>
				<input type="text" size="30" placeholder="Google Analytics id (UA-XXXXXXXXX-X)" name="option-ga-id" id="gax">
			</section>

			<div class="grid-h grid-2 m-t-regular">

				<fieldset class="radio-panel">
					<legend>Navigation</legend>
					<div class="grid-h grid-2">
						<label>
							<input type="radio" name="navlock" value="false" checked>
							<?php include("img/any.svg"); ?>
							<p>Learner can navigate to any page at any time</p>
						</label>
						<label>
							<input type="radio" name="navlock" value="true">
							<?php include("img/forward.svg"); ?>
							<p>Learner must complete pages before moving on</p>
						</label>
					</div>
				</fieldset>

				<fieldset class="radio-panel">
					<legend>Completion</legend>
					<div class="grid-h grid-2">
						<label>
							<input type="radio" name="rule" value="last" checked>
							<?php include("img/last.svg"); ?>
							<p>Learner views last page (<b class="count-total">10</b>)</p>
						</label>
						<label>
							<input type="radio" name="rule" value="count" data-select="show-enough">
							<?php include("img/seen.svg"); ?>
							<p>Learner completes <select id="count-set" name="enough-count"><option>0</option></select> out of <b class="count-total">10</b> pages.</p>
						</label>
					</div>
				</fieldset>

			</div>

			<fieldset class="radio-panel m-t-regular">
				<legend>Compatibility</legend>
				<div class="grid-h grid-4">
					<label>
						<input type="radio" name="api" value="scorm12" checked>
						<?php include("img/scorm.svg"); ?>
						<p>Scorm 1.2 (default)</p>
					</label>
					<label>
						<input type="radio" name="api" value="scorm2004">
						<?php include("img/scorm.svg"); ?>
						<p>Scorm 2004</p>
					</label>
					<label>
						<input type="radio" name="api" value="imscp" data-compat="imscp">
						<?php include("img/ims.svg"); ?>
						<p>IMS Content Package</p>
					</label>
					<label>
						<input type="radio" name="api" value="none">
						<?php include("img/html5.svg"); ?>
						<p>Standalone</p>
					</label>
				</div>
			</fieldset>

		</form>

		<div class="w-80 m-lr-auto m-t-regular">
			<div class='grid-h grid-c grid-4'>

				<div class="progress-button elastic" data-destination="preview">
					<button><span><i class="ninja-eye"></i> Preview</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" /></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2" /><path d="m31.5,46.5l-8.5,-7.1" /></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3" /><path d="m35,35l9.3,9.3" /><path d="m35,35l-9.3,9.3" /><path d="m35,35l9.3,-9.3" /></svg>
				</div>

				<div class="progress-button elastic" data-destination="kloudless">
					<button><span><i class="ninja-cloud_upload"></i> Save to cloud</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>

				<div class="progress-button elastic" data-destination="publish">
					<button><span><i class="ninja-upload"></i> Save to server</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>

				<div class="progress-button elastic" data-destination="download">
					<button><span><i class="ninja-download"></i> Download zip</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>

			</div>

		</div>
	</section>

	<footer>
		<a href="/">&copy Course Assembler <?php echo date("Y"); ?></a> |
		<a href="mailto:support@courseassembler.com">Report a problem</a>
	</footer>

	<div id="loader" class="pageload-overlay" data-opening="M 40,-65 145,80 -65,80 40,-65" data-closing="m 40,-65 0,0 L -65,80 40,-65">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none">
			<path d="M 40,-65 145,80 40,-65"/>
		</svg>
	</div>

	<div class="modal add-content">
		<div class="modal-box tabbed-content">
		<header>
			<span><i class="ninja-document-add"></i>Add content</span>
			<a href="javascript:;" data-action="close-add-content"><span class="ninja-close"></span></a>
		</header>
		<nav>
			<a href="#add-upload" class="active" data-action="tab-switch">Upload</a>
			<a href="#add-paste" data-action="tab-switch">URL / Embed</a>
			<a href="#add-choose" data-action="tab-switch">Cloud</a>
		</nav>
		<section class="drag-to-upload active" id="add-upload">
			<p>Drag and drop your files directly below, or click the box to select a file from your device.<br>We support most document and presentation formats, images and H5P packages.</p>
			<div class="dropzone" onclick="document.getElementById('uplControl').click()">
				<h3>Drag and drop your content here</h3>
				<p>Or click here to browse</p>
				<input type="file" id="uplControl" style="display:none" onchange="manualUpload(this.files);this.value=null;" />
			</div>
		</section>
		<section class="paste-to-embed" id="add-paste">
			<div class="pastezone">
				<h3>Paste an URL/Iframe in below</h3>
				<p class="t-l">We support:</p>
				<ul class="t-l">
					<li>Google Slides, Docs, Sheets, Forms, etc (ensure link is sharable)</li>
					<li>YouTube (e.g. https://www.youtube.com/watch?v=CvTTQaBjfrM)</li>
					<li>Vimeo (e.g. https://vimeo.com/160978792)</li>
					<li>Imgur (e.g. https://imgur.com/gallery/2kRDuGF)</li>
					<li>Slideshare (e.g. http://www.slideshare.net/billkarwin/models-for-hierarchical-data)</li>
					<li>SoundCloud (e.g. https://soundcloud.com/epicmountain/nuke-the-moon)</li>
					<li>Websites that support OEMBED</li>
					<li>Iframe embeds (no tracking / cross domain script)</li>
					<li>Any URL can be inserted as an image</li>
				</ul>
				<textarea id="paste-url-obj" placeholder="Paste your code/embed code into this box then press Insert" noresize autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
				<label class="label-block"><input type="checkbox" id="paste-url-website" value="1">Embed URL as image</label>
				<button data-action="process-paste" class="pad-button"><i class="ninja-paste"></i>Insert</button>
			</div>
		</section>
		<section class="paste-to-embed" id="add-choose">
			<div class="cloudzone">
				<h3>Upload from the Cloud</h3>
				<p>We support a number of cloud providers. Click the button below then choose your cloud provider to begin the authentication process.</p>
				<button data-action="upload-kloudless" class="pad-button"><i class="ninja-cloud_download"></i>Choose ...</button>
			</div>
		</section>
		<p class="tip">💡Tip: Check the Settings menu for conversion options before you start.</p>
		</div>
	</div>

	<div class="modal import-content">
		<div class="modal-box tabbed-content">
		<header>
			<span><i class="ninja-folder-outline-add"></i>Import content (zip)</span>
			<a href="javascript:;" data-action="close-import-content"><span class="ninja-close"></span></a>
		</header>
		<nav>
			<a href="#import-upload" class="active" data-action="tab-switch">Upload</a>
			<a href="#import-cloud" data-action="tab-switch">Cloud</a>
			<a href="#import-files" data-action="tab-switch">Saved courses</a>
		</nav>
		<section class="drag-to-upload active" id="import-upload">
			<p>We currently support CourseAssembler and Video2Scorm zip packages.</p>
			<div class="dropzone" onclick="document.getElementById('muplControl').click()">
				<h3>Drag and drop a supported zip package here</h3>
				<p>Or click here to browse</p>
				<input type="file" id="muplControl" style="display:none" onchange="manualImport(this.files)" />
			</div>
		</section>
		<section class="paste-to-embed" id="import-cloud">
			<div class="cloudzone">
				<h3>Import from the Cloud</h3>
				<p>We support a number of cloud providers. Click the button below then choose your cloud provider to begin the authentication process.</p>
				<button data-action="upload-kloudless" class="pad-button"><i class="ninja-cloud_download"></i>Choose ...</button>
			</div>
		</section>
		<section class="list-server-files" id="import-files">
			<p>These are your saved courses. Click Import next to a course to add it.</p>
			<table class="table-file-list"><thead><tr><th>Filename</th><th>Date created</th><th>Size</th><th>Actions</th></tr></thead>
			<tbody><?php
			if (file_exists("warehouse/{$verifier->hash}/published/")) {
				$zips = new DirectoryIterator("./warehouse/{$verifier->hash}/published/");
				$rows = [];
				foreach ($zips as $zip) {
					if (!$zip->isDot() && !$zip->isDir()) {
						$rows[] = [
							$zip->getFilename(),
							$zip->getSize(),
							$zip->getCTime()
						];
					}
				}
				usort($rows, 'dSort');
				forEach($rows as $row) {
					echo "<tr data-src='", $row[0], "'><td>", $row[0], "</td><td>", date("D d M Y H:i:s", $row[2]), "</td><td>", Utils::FormatBytes($row[1]), "</td><td><button data-action='import-saved-course'>Import</button><button data-action='download-saved-course'><i class='ninja-paperclip'></i></button><button data-action='remove-saved-course'><i class='ninja-discard'></i></button></td></tr>", PHP_EOL;
				}
			} else {
				echo "<tr><td colspan='4'>No files.</td></tr>";
			}
			?></tbody></table>
		</section>
		</div>
	</div>

	<div class="modal message">
		<div class="modal-box">
			<header> </header>
			<section> </section>
		</div>
	</div>


<?php echo implode(PHP_EOL, $js), PHP_EOL; ?>
<?php if ($verifier->code->minified) { ?>
	<script src="<?php echo $minified_app; ?>"></script>
<?php } else { ?>
	<script src="js/exif.js"></script>
	<script src="js/AutoScaler.js"></script>
	<script src="js/workers/hermite/hermite.js"></script>
	<script src="js/svgLoader.js"></script>
	<script src="js/app.lib.js"></script>
	<script src="js/templates.js"></script>
	<script src="js/uiProgressButton.js"></script>
	<script src="js/mimedb.js"></script>
	<script src="js/gfontinput.js"></script>
	<script src="js/workers/promise-worker-index.js"></script>
	<script src="js/app.lib.navigation.js"></script>
	<script src="js/app.lib.fileconversion.js"></script>
	<script src="js/app.lib.puritycontrol.js"></script>
	<script src="js/app.lib.filepreview.js"></script>
	<script src="js/app.lib.downloader.js"></script>
	<script src="js/app.core.js"></script>
<?php } ?>

	<?php } else { ?>

	<body class="buildbot-sad">

		<header>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 862.68 59.62" height="12"><path d="M49.42,18H39l.72-4.51a3.16,3.16,0,0,0-3-3.79H19.92a4.76,4.76,0,0,0-4.2,3.79L10.6,46a3.16,3.16,0,0,0,3,3.79h16.8A4.66,4.66,0,0,0,34.57,46l.72-4.61H45.73L45,46C43.79,54,38.15,59.41,30,59.41H13.67c-8.4,0-14.75-5.84-13.52-13.83L5.38,13.32C6.71,5.33,12.55,0,20.74,0H38C45.12,0,51.16,7.17,50,14.44Z" fill="#231f20"></path><path d="M103,46.09c-1.34,8.3-7.07,13.32-15.68,13.32H69.4c-8.4,0-14.55-5.84-13.32-13.83l5.23-32.37C62.64,5.12,68.68,0,77.49,0H95.72c7.79,0,13.52,6.56,12.4,13.83ZM94.9,9.53H75.65a4.64,4.64,0,0,0-4.2,3.79L66.32,46.09a3.11,3.11,0,0,0,3,3.79H88.55a4.65,4.65,0,0,0,4.2-3.79L98,13.32A3.18,3.18,0,0,0,94.9,9.53Z" fill="#231f20"></path><path d="M161.69,45.89c-1.33,8.3-7.17,13.52-15.57,13.52H130.35c-8.4,0-14.75-5.84-13.53-13.83L124.1,0h10.65l-7.27,46.09a3.11,3.11,0,0,0,3,3.79h16.39a4.66,4.66,0,0,0,4.2-3.79L158.31,0H169Z" fill="#231f20"></path><path d="M223.76,20.28a13.28,13.28,0,0,1-5.94,9.32c2.77,2,3.69,4.82,3.08,8.61l-3.38,21.2H207.07L210.24,39c.52-3.38-.41-4.41-3.58-4.41H187.09L183.2,59.41H173.06L182.48,0h29.91c7.79,0,13.42,6.86,12.3,13.83ZM211.47,9H191.19l-2.46,15.78h19.16c3.79,0,4.81-1,5.32-4.61l1.13-7.07C214.75,11,213.21,9,211.47,9Z" fill="#231f20"></path><path d="M281,17.72H270.78l.72-4.4a3.18,3.18,0,0,0-3.08-3.79h-16a4.64,4.64,0,0,0-4.19,3.79L247,21.1c-.93,6,11.57,3.89,19,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H246.09c-8.7,0-14.85-5.84-13.62-13.83l.62-3.79h10.24l-.72,4.3a3.16,3.16,0,0,0,3,3.79h17.31a4.75,4.75,0,0,0,4.2-3.79l1.13-7.68c1-6-11.47-4-19-4.2-8.3-.31-13.52-6.56-12.29-14.24l1.12-7C239.44,4.92,245.58,0,254.19,0h15.05c7.69,0,13.52,6.66,12.4,13.83Z" fill="#231f20"></path><path d="M334.08,9.53H305.81l-2.46,15.36h21.92l-1.53,9.73H301.82l-2.36,15.26h28.27l-1.53,9.53H287.68L297.11,0h38.51Z" fill="#231f20"></path><path d="M418.59,59.41H408.25l3-18.74H386.84l-3,18.74H373.52l5.74-36.16a13.72,13.72,0,0,1,5.43-9.83L401,0h9l12,13.42c2.66,3,3,5.63,2.36,9.83Zm-5.43-39.54L403.94,9c-.61.82-12.49,10.86-12.49,10.86-1.44,1.23-1.54,1.74-1.85,3.89l-1.33,7.89h24.38l1.23-7.89C414.19,21.61,414.29,21.1,413.16,19.87Z" fill="#231f20"></path><path d="M482,17.72H471.75l.72-4.4a3.18,3.18,0,0,0-3.07-3.79h-16a4.65,4.65,0,0,0-4.2,3.79L448,21.1c-.92,6,11.57,3.89,19.05,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H447.07c-8.71,0-14.85-5.84-13.63-13.83l.62-3.79H444.3l-.71,4.3a3.16,3.16,0,0,0,3,3.79h17.31a4.76,4.76,0,0,0,4.2-3.79l1.12-7.68c1-6-11.47-4-18.95-4.2C442,34.11,436.72,27.86,438,20.18l1.13-7C440.41,4.92,446.56,0,455.16,0h15.06c7.68,0,13.52,6.66,12.39,13.83Z" fill="#231f20"></path><path d="M538.34,17.72H528.09l.72-4.4a3.18,3.18,0,0,0-3.07-3.79h-16a4.65,4.65,0,0,0-4.2,3.79l-1.23,7.78c-.92,6,11.57,3.89,19.05,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H503.41c-8.71,0-14.86-5.84-13.63-13.83L490.4,42h10.24l-.72,4.3a3.17,3.17,0,0,0,3,3.79h17.32a4.76,4.76,0,0,0,4.2-3.79l1.12-7.68c1-6-11.47-4-18.95-4.2-8.29-.31-13.52-6.56-12.29-14.24l1.13-7C496.75,4.92,502.89,0,511.5,0h15.06c7.68,0,13.52,6.66,12.39,13.83Z" fill="#231f20"></path><path d="M591.4,9.53H563.13l-2.46,15.36h21.92l-1.54,9.73H559.13l-2.36,15.26h28.28l-1.54,9.53H545L554.42,0h38.51Z" fill="#231f20"></path><path d="M643.94,59.41H633.5l6.65-42.2L627.35,29.5H621l-8.91-12.29-6.66,42.2H595L604.41,0h8.5l13.21,19C626.84,17.72,644.87,0,644.87,0h8.5Z" fill="#231f20"></path><path d="M707.25,20.08c-.72,4.5-3,7.68-5.84,9.32,2.46,1.33,3.58,4.81,3,8.6l-1.23,8.09c-1.23,8-6.86,13.32-15.16,13.32H657.57L667,0h28.68c7.79,0,13.73,6.45,12.5,14ZM690.45,34H671.7l-2.56,16.28H688.4a4.75,4.75,0,0,0,4.2-4.09l1.23-7.28C694.34,35.13,693.73,34,690.45,34ZM695,9.22H675.7l-2.46,15.47h18.13c3.79,0,4.82-1.13,5.43-4.72l1-6.65C698.23,11.17,696.7,9.22,695,9.22Z" fill="#231f20"></path><path d="M751.71,59.41H714.42L723.84,0H734.5l-7.89,49.88h26.63Z" fill="#231f20"></path><path d="M807.33,9.53H779.06L776.6,24.89h21.92L797,34.62H775.06L772.7,49.88H801l-1.54,9.53H760.93L770.35,0h38.51Z" fill="#231f20"></path><path d="M861.62,20.28a13.34,13.34,0,0,1-5.94,9.32c2.76,2,3.68,4.82,3.07,8.61l-3.38,21.2H844.92L848.1,39c.51-3.38-.41-4.41-3.59-4.41H825l-3.9,24.79H810.91L820.34,0h29.91c7.78,0,13.42,6.86,12.29,13.83ZM849.32,9H829l-2.46,15.78h19.16c3.79,0,4.81-1,5.33-4.61l1.12-7.07C852.6,11,851.07,9,849.32,9Z"></path></svg>
		</header>

		<main>
			<h1>Buildbot is sad.</h1>
			<h2><?php
			switch ($verifier->licence->error) {
				case "bad-token":
					echo "Your licence or subscription key is missing or invalid.";
					break;
				case "licence-key-expired":
					echo "Your licence key has expired.";
					break;

				default:
					echo "Something went horribly wrong. ", $verifier->licence->error;
					break;
			}
			?></h2>
			<p><a href="<?php echo getenv("HOME_URL"); ?>">Home</a></p>
		</main>

	<?php } ?>

	</body>
</html>
