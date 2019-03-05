<?php
error_reporting(E_ERROR);
ini_set("display_errors", 1);

require_once('../../vendor/autoload.php');

$verifier = \CourseSuite\Validator::Instance(false)->Validate($_GET); // var_dump($verifier); exit;
//	var_dump($verifier);

if (!$verifier->valid) {
	header("location: " . $verifier->home . "bad-token");
	die("bad-token");
}

// licence volume means stuff to api users, but not to others who just burn down their licence key
if (isset($verifier->api) && $verifier->licence->remaining < 1) {
	header("location: " . $verifier->home . "in-use");
	die("in-use");
}

// no longer applicable
// if ($verifier->licence->tier < 1) {
// 	header("location: " . $verifier->home . "bad-tier");
// 	die("bad-tier");
// }

// $verifier->code->minified = false;
include "variables.php";

$jsApp = new stdClass();
$jsApp->Home = $verifier->home;
$jsApp->Tier =  $verifier->licence->tier;
$jsApp->Api = isset($verifier->api);
$jsApp->Timestamp = "$timestamp";
if (isset($verifier->api->publish) && !empty($verifier->api->publish)) {
	$jsApp->Publish = $verifier->api->publish;
	$jsApp->Bearer = $verifier->api->bearer;
	$jsApp->Method = "POST"; // or PUT
}

// api url = coursesuite url / api / dl / apikey / appkey / template.zip
$api_template = isset($verifier->api->template) ? $verifier->api->template : "";

?><!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Rapidly convert your content to HTML5, add quizzes and video and package with a SCORM wrapper" />
		<meta name="keywords" content="Course Assembler, scorm modules, scorm content, scorm wrapper, scorm authoring tool, scorm packages ppt to scorm, pptx to scorm, powerpoint to scorm, docx to scorm, pdf to scorm, video to scorm, google slides to scorm, google docs to scorm" />
		<meta name="author" content="coursesuite (tm), a trademark of avide elearning pty ltd" />
		<title>Course Assembler</title>
		<link rel="shortcut icon" href="/favicon.ico">
		<link href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,thin,light,bolditalic,black,medium&amp;lang=en" rel="stylesheet" type="text/css">
		<link href="css/font/style.css" rel="stylesheet" type="text/css">
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet" type="text/css">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-colorpicker/2.5.1/css/bootstrap-colorpicker.min.css" rel="stylesheet" type="text/css" media="none" onload="if(media!=='all')media='all'">
		<link href="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/11.1.0/nouislider.min.css" rel="stylesheet" type="text/css" media="none" onload="if(media!=='all')media='all'">
		<link href="https://cdn.jsdelivr.net/npm/gemini-scrollbar@1.5.3/gemini-scrollbar.min.css" rel="stylesheet" type="text/css">
		<style id="fiddle">#nav-selection svg path,#nav-selection svg rect {fill:#3D3590;stroke:#000000;stroke-width:4px;stroke-opacity:0.75;}$nav-selection svg circle{stroke:#3D3590}</style>
		<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js"></script>
		<script type="text/javascript">var App = <?php echo json_encode($jsApp, JSON_NUMERIC_CHECK); ?>, Layer = new WebSocket("<?php echo $verifier->app->socket; ?>"); <?php echo $verifier->app->layer; ?>;</script>
<?php if ($verifier->code->minified) { ?>
		<link rel="stylesheet" type="text/css" href="<?php echo $minified_css; ?>" />
		<script type="text/javascript" src="<?php echo $minified_head; ?>"></script>
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
		  ga('create', 'UA-68767047-3', 'auto');
		  ga('send', 'pageview');
		</script>
		<!-- Piwik -->
		<script type="text/javascript">
		  var _paq = _paq || [];
		  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		  _paq.push(['trackPageView']);
		  _paq.push(['enableLinkTracking']);
		  (function() {
		    var u="//stats.coursesuite.ninja/";
		    _paq.push(['setTrackerUrl', u+'piwik.php']);
		    _paq.push(['setSiteId', '2']);
		    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
		    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
		  })();
		</script>
		<!-- End Piwik Code -->
<?php } else { ?>
		<link rel="stylesheet" type="text/css" href="css/app.css" />
		<script type="text/javascript" src="js/modernizr.custom.js"></script>
<?php } ?>
		<script type="text/javascript" src="https://static-cdn.kloudless.com/p/platform/sdk/kloudless.explorer.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/noUiSlider/11.1.0/nouislider.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/gemini-scrollbar@1.5.3/index.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.5.0/localforage.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/classie/1.0.1/classie.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.6.0/Sortable.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.0.2/jszip-utils.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js" async="true"></script>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.0.1/color-thief.min.js" async="true"></script>
<?php
if (isset($verifier->api->header->css) && !empty($verifier->api->header->css)) {
	echo "		<style>" . $verifier->api->header->css . "</style>";
}
?>
</head>
<body class="add-documents">

	<section class="page-fixed-top">
		<header id="banner"><?php
		if (isset($verifier->api->header->html) && !empty($verifier->api->header->html)) {
			echo $verifier->api->header->html;
		} else {
			echo "<div class='cs-banner'><h1><img src='img/coursesuite.svg' width='40' height='40' title='another CourseSuite app'> Course <span>Assembler</span></h1></div>";
		}
		?></header>

		<nav id="tabs">
			<a href="javascript:;" data-tab="add-documents" class="current"><i class="ninja-add-documents"></i> Add documents</a>
			<a href="javascript:;" data-tab="change-settings"><i class="ninja-fiddle"></i> Choose a design</a>
			<a href="javascript:;" data-tab="download-zip"><i class="ninja-floppy-disk3"></i> Download your package</a>
			<span class="btns">
				<button data-action="pop-help" data-url="https://guide.coursesuite.ninja/documentninja/usage"><i class="ninja-help"></i>Help</button>
				<button data-action="clear-storage" data-popover="yesno" data-label="Reset all settings and content? (no undo)"><i class="ninja-stand-by"></i>Reset</button>
			</span>
		</nav>
	</section>

	<section id="add-documents">
		<div class="toolbar">
			<div id="nav-actions" class="flex-v pad-left">
				<button data-action="add-content"><i class="ninja-document-add"></i>Add content</button>
				<button data-action="add-quiz"><i class="ninja-inbox-check"></i>Add quiz</button>
				<button data-action="import-content"><i class="ninja-folder-outline-add"></i>Import ...</button>
			</div>
			<div id="fields" class="flex-v"></div>
		</div>
		<div id="scroll-area"><ol id="nav-item-list"></ol></div>
		<div id="preview"></div>
	</section>


	<section id="change-settings">
	<form id="colours">
		<section id="nav-selection" class="settings-panel">
			<div class="contents"><input type="hidden" name="template">
			<?php include "tab.design.php"; ?>
			</div>
		</section>
	</form>
	</section>

	<section id="download-zip">
		<form id="settings">

			<section id="basic-options" class="settings-panel">
				<div class="content">
					<div class="field-row">
						<label for="ocn">Package Name (required)</label>
						<div class="input">
							<input type="text" class="text-input" size="30" placeholder="Course name" name="option-course-name" id="ocn">
						</div>
					</div>
					<div class="field-row">
						<label for="ocd">Description (short, optional)</label>
						<div class="input">
							<textarea  rows="2" class="text-multiline" cols="30" placeholder="Description (optional)" name="option-course-description" id="ocd"></textarea>
						</div>
					</div>
					<div class="field-row">
						<label for="occ">Copyright (optional)</label>
						<div class="input">
							<input type="text" class="text-input" size="30" placeholder="Copyright statement" name="option-course-copyright" id="occ">
						</div>
					</div>
					<div class="field-row">
						<label>Navigation</label>
						<div class="input">
							<label class="row"><input type="radio" name="navlock" value="false" checked> Learner can navigate to any page at any time</label>
							<label class="row"><input type="radio" name="navlock" value="true"> Learner must complete pages before moving on</label>
						</div>
					</div>
					<div class="field-row">
						<label>Completion</label>
						<div class="input">
							<div class="row"><input type="radio" name="rule" value="last" checked> Learner views last page (<b class="count-total">10</b>)</div>
							<div class="row"><input type="radio" name="rule" value="count" data-select="show-enough"> Learner must complete <select id="count-set" name="enough-count"><option>0</option></select> out of <b class="count-total">10</b> pages.</div>
						</div>
					</div>
					<div class="field-row">
						<label>Packaging</label>
						<div class="input" id="packageType">
							<div class="row"><input type="radio" name="api" value="scorm12" checked> Scorm 1.2 (most common format)</div>
							<div class="row"><input type="radio" name="api" value="scorm2004"> Scorm 2004</div>
							<!--div class="row"><input type="radio" name="api" value="xapi" disabled> xAPI (coming soon)</div-->
							<div class="row"><input type="radio" name="api" value="imscp" id="radio-imscp"> IMS Content Package</div>
							<div class="row"><input type="radio" name="api" value="none"> No wrapper</div>
						</div>
					</div>
				</div>
			</section>

		</form>

		<div id="download-button-container">

			<div class="button-row">

				<div class="progress-button elastic" data-destination="download">
					<button><span><i class="ninja-download"></i> Download zip</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>

				<div class="progress-button elastic" data-destination="kloudless">
					<button><span><i class="ninja-upload2"></i> Save to Cloud</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>

				<div class="progress-button elastic" data-destination="preview">
					<button><span><i class="fa fa-eye"></i> Preview zip</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z" /></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2" /><path d="m31.5,46.5l-8.5,-7.1" /></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3" /><path d="m35,35l9.3,9.3" /><path d="m35,35l-9.3,9.3" /><path d="m35,35l9.3,-9.3" /></svg>
				</div>

<?php if (isset($verifier->api->publish) && !empty($verifier->api->publish)) { ?>
				<div class="progress-button elastic" data-destination="publish">
					<button><span><i class="ninja-upload"></i> Publish to LMS</span></button>
					<svg class="progress-circle" width="70" height="70"><path d="m35,2.5c17.955803,0 32.5,14.544199 32.5,32.5c0,17.955803 -14.544197,32.5 -32.5,32.5c-17.955803,0 -32.5,-14.544197 -32.5,-32.5c0,-17.955801 14.544197,-32.5 32.5,-32.5z"/></svg>
					<svg class="checkmark" width="70" height="70"><path d="m31.5,46.5l15.3,-23.2"/><path d="m31.5,46.5l-8.5,-7.1"/></svg>
					<svg class="cross" width="70" height="70"><path d="m35,35l-9.3,-9.3"/><path d="m35,35l9.3,9.3"/><path d="m35,35l-9.3,9.3"/><path d="m35,35l9.3,-9.3"/></svg>
				</div>
<?php } ?>
			</div>

		</div>
	</section>

	<footer class="flex-v">Powered by <a href="https://www.coursesuite.ninja/" target="_blank">CourseSuite</a></footer>

	<div id="loader" class="pageload-overlay" data-opening="M 40,-65 145,80 -65,80 40,-65" data-closing="m 40,-65 0,0 L -65,80 40,-65">
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 80 60" preserveAspectRatio="none">
			<path d="M 40,-65 145,80 40,-65"/>
		</svg>
	</div>

	<div class="modal add-content">
		<div class="modal-box">
		<header>
			<i class="ninja-document-add"></i>Add content<a href="javascript:;" data-action="close-add-content"><span class="ninja-close"></span></a>
		</header>
		<section class="drag-to-upload">
			<div class="dropzone" onclick="document.getElementById('uplControl').click()">
				<h3>Drag and drop your content here</h3>
				<p>Or click here to browse</p>
				<input type="file" id="uplControl" style="display:none" onchange="manualUpload(this.files)" />
			</div>
		</section>
		<p class="or"><span>or</span></p>
		<section class="paste-to-embed">
			<div class="pastezone">
				<h3>Paste an URL in below</h3>
				<textarea id="paste-url-obj" placeholder="Paste a YouTube / Vimeo / Imgur / Slideshare / (any website!) URL into this box then press Insert" noresize autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
				<button data-action="process-paste"><i class="ninja-paste"></i>Insert</button>
			</div>
		</section>
		<p class="or"><span>or</span></p>
		<section class="paste-to-embed">
			<div class="cloudzone">
				<h3>Upload from the Cloud</h3>
				<button data-action="upload-kloudless"><i class="ninja-upload2"></i>Choose ...</button>
			</div>
		</section>
		</div>
	</div>

	<div class="modal import-content">
		<div class="modal-box">
		<header>
			<i class="ninja-folder-outline-add"></i>Import content<a href="javascript:;" data-action="close-import-content"><span class="ninja-close"></span></a>
		</header>
		<section class="drag-to-upload">
			<div class="dropzone" onclick="document.getElementById('muplControl').click()">
				<h3>Drag and drop a Course Assembler zip package here</h3>
				<p>Or click here to browse</p>
				<input type="file" id="muplControl" style="display:none" onchange="manualImport(this.files)" />
			</div>
		</section>
		<p class="or"><span>or</span></p>
		<section class="paste-to-embed">
			<div class="cloudzone">
				<h3>Import from the Cloud</h3>
				<button data-action="upload-kloudless"><i class="ninja-upload2"></i>Choose ...</button>
			</div>
		</section>
		</div>
	</div>

	<div id="cog">
		<a data-action='toggle-settings' href="javascript:;" title="App defaults"><i class="fa fa-fw fa-cog"></i></a>
		<div>
			<p data-action='toggle-mute'><a href="javascript:;"><i class="fa fa-fw fa-volume-up"></i> Swoosh sound</a></p>
			<p data-action='toggle-no-autosplit'><a href="javascript:;"><i class="ninja-split"></i> Auto-split documents</a></p>
			<p data-action='toggle-no-autoresize'><a href="javascript:;"><i class="ninja-optimise"></i> Auto-optimise images</a></p>
			<p data-action='toggle-no-autocenter'><a href="javascript:;"><i class="ninja-design"></i> Auto-centre presentations</a></p>
		</div>
	</div>

<?php if ($verifier->code->minified) { ?>
	<script src="<?php echo $minified_app; ?>"></script>
<?php } else { ?>
	<script src="/app/js/color-thief.js" async="true"></script>
	<script src="js/exif.js"></script>
	<script src="js/AutoScaler.js"></script>
	<script src="js/workers/hermite/hermite.js"></script>
	<script src="js/svgLoader.js"></script>
	<script src="js/app.lib.js"></script>
	<script src="js/templates.js"></script>
	<script src="js/uiProgressButton.js"></script>
	<script src="js/mimedb.js"></script>
	<script src="js/workers/promise-worker-index.js"></script>
	<script src="js/color-theif.js"></script>
	<script src="js/app.core.js"></script>
	<script src="js/app.lib.fileconversion.js"></script>
	<script src="js/app.lib.puritycontrol.js"></script>
	<script src="js/app.lib.filepreview.js"></script>
	<script src="js/app.lib.downloader.js"></script>
	<script src="js/app.lib.navigation.js"></script>
	<script src="js/app.plugin.page.js"></script>
<?php } ?>
	</body>
</html>
