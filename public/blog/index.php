<?php

/*
A single page folder based blog.
Folders are listed in 4-digit years
Sub folders are listed in 2-digit months
Sub sub folders are listed in days
Inside those are numbered files - 0.html, 1.html, 2.html etc

When rendering an index, it lists all the 0.html files in descending order
When rendering a file, it lists all the files in that folder in ascending order (0.html then 1.html then 2.html)

Rendering files replaces paths with the relative path for <img src>
Disqus comments are embedded into page entries
Page markup is rendered in-file
Features NO caching! You might want to consider some.
*/

// implement sorting into an iterator
class SortingIterator implements IteratorAggregate {
	private $iterator = null;
	public function __construct(Traversable $iterator, $callback) {
		if (!is_callable($callback)) {
			throw new InvalidArgumentException('Given callback is not callable!');
		}
		$array = iterator_to_array($iterator);
		usort($array, $callback);
		$this->iterator = new ArrayIterator($array);
	}
	public function getIterator() {
			return $this->iterator;
	}
}

function mysort($a, $b) {
	return $a->getPathname() < $b->getPathname();
}

$BlogRoot = realpath('.'); $len = strlen(($BlogRoot));

$page = isset($_GET['path']) ? strtolower($_GET['path']) : '';

$output = [];
$identifier = "Blog list";
$description = "Course Assembler Blog & Update information.";

if (empty($page)) {
	$page = "blog";

	$Directory = new RecursiveDirectoryIterator($BlogRoot);
	$Iterator = new RecursiveIteratorIterator($Directory, RecursiveIteratorIterator::SELF_FIRST);
	$SortedIterator = new SortingIterator($Iterator,'mysort');
	$Regex = new RegexIterator($SortedIterator->getIterator(), '/^.+\.html$/i', RecursiveRegexIterator::GET_MATCH);
	$Entries = [];
	foreach ($Regex as $f) {
		if (strpos($f[0],"0.html") > 0) $Entries[substr($f[0], $len)] = file_get_contents($f[0]);
	}

	foreach ($Entries as $entry => $contents) {
		$entrypath = str_replace("0.html","", $entry);
		$date = DateTime::createFromFormat("/Y/m/d/", $entrypath);
		$slug = '/blog/' . str_replace('/','-',substr($entry, 1, -7));
		$more = "";
		$repl = "/blog/{$entrypath}/";

		$output[] = "<h2>" . $date->format("j M, Y") . "</h2>";
		$output[] = "<div>" . str_replace(['src="',"src='"],['src="'.$repl,"src='{$repl}"], $contents) . "</div>";
		if (file_exists($BlogRoot . str_replace("0.html","1.html",$entry))) {
			$more = "Read more / "; 
		}
		$output[] = "<p class='uk-small'><a href='{$slug}'>{$more}Comments ...</a></p>";
		$output[] = "<hr>";
	}

} else {

	$date = DateTime::createFromFormat("Y-m-d", $page);
	$entrypath = str_replace('-','/',$page);
	$identifier = $page;
	$found = true;

	$output[] = "<h2>" . $date->format("j M, Y") . "</h2>";
	foreach (array_diff(scandir($entrypath), ['.','..']) as $file) {
		if (strpos($file, '.html') !== false) {
			if (empty($description)) {
				$description = strip_tags(file_get_contents($p . "/" . $entry['dir'] . "/" . $f));
				$description = str_replace(PHP_EOL,' ',$description);
				$description = substr($description, 0, 127) . "...";
			}
			$repl = "/blog/{$entrypath}/";
			$filepath = "{$BlogRoot}/{$entrypath}/{$file}";
			$output[] = str_replace(['src="',"src='"],['src="'.$repl,"src='{$repl}"],file_get_contents($filepath));
		}
	}

	$output[] = "<p class='uk-small'><a href='/blog/' class='uk-button uk-button-primary'><span uk-icon='chevron-double-left'></span> Return to blog</a></p>";
}

$disqus = "
<div id='disqus_thread'></div>
<script>
    /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables    */
    /*
    var disqus_config = function () {
    	this.page.url = location.href;  // Replace PAGE_URL with your page's canonical URL variable
    	this.page.identifier = '{$identifier}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
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

if ($page !== "blog") {
	if ($found) { 
		$output[] = $disqus;
	} else {
		$output[] = "Entry not found ... ";
	}
}

?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
		<meta content="width=device-width, initial-scale=1, minimum-scale=1" name="viewport"/>
		<meta name="description" content="<?php echo $description; ?>" />
		<meta name="keywords" content="pdf to scorm, docx to scorm, ppt to scorm, mp4 to scorm, powerpoint to scorm, scorm elearning, scorm converter, coursesuite, scormcloud authoring, moodle scorm, scorm modules, scorm content, scorm wrapper, scorm tool, scorm packager, ppt to scorm, docx to scorm, convert pdf to html, video to scorm, google slides to scorm, google docs to scorm, scorm quiz, quiz to scorm, blackboard, moodle, d2l, rustici, scorm api, scorm2004" />
		<meta name="author" content="www.coursesuite.com" />
		<title><?php echo $identifier; ?> | Course Assembler Blog.</title>
		<meta property="og:locale" content="en_AU">
		<meta property="og:type" content="website">
		<meta property="og:title" content=" - Course Assembler by Coursesuite">
		<meta property="og:description" content="Make your content e-learning ready, add quizzes and video and package with a SCORM wrapper, in a matter of minutes.">
		<meta property="og:url" content="https://courseassembler.com.test/">
		<meta property="og:site_name" content="Course Assembler ">
		<meta property="og:image" content="https://courseassembler.com.test/assets/meta_card.png">
		<link href="/assets/style.css" rel="stylesheet" type="text/css"/>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/css/uikit.min.css" />
        <script src="https://polyfill.io/v3/polyfill.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.11/typed.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit-icons.min.js" defer></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js"></script>
		<script src="https://www.google.com/recaptcha/api.js" async defer></script>
		<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css" />
<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js"></script>
<script>
window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#eaf7f7",
      "text": "#5c7291"
    },
    "button": {
      "background": "#56cbdb",
      "text": "#ffffff"
    }
  },
  "theme": "block",
  "position": "bottom-right",
  "static": false,
  "content": {
    "message": "This app requires the use cookies (for analytics) and local storage (for app functionality) in your browser.",
    "href": "/privacy"
  }
})});
</script>		<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-68767047-6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-68767047-6');
</script>	</head>
	<body class="entriesindex">
		<div uk-sticky="media: 960" class="uk-navbar-container my-bg-blue uk-sticky uk-sticky-fixed uk-navbar-transparent">
			<div class="uk-container uk-container-expand coursesuite-bar">
				<div class="uk-padding-small uk-padding-remove-vertical uk-text-meta">
					Other Scorm Apps:
					<a href="https://pdf.to-scorm.com/">PDF 2 Scorm</a>
					<a href="https://video.to-scorm.com/">Video 2 Scorm</a>
					<a href="https://presentation.to-scorm.com/">Audio+Presentation 2 Scorm</a>
					<a href="https://coursebuildr.coursesuite.ninja/app/login/">CourseBuilder</a>
				</div>
			</div>
			<div class="uk-container uk-container-expand">
				<nav uk-navbar>
					<div class="uk-navbar-left">
						<a href="/" class="uk-navbar-item uk-logo"><img src="/assets/header.svg" class="uk-margin-small-right" width="280"></a>
					</div>
					<div class="uk-navbar-right uk-visible@m">
						<ul class="uk-navbar-nav">
							<li><a href="/">Home</a></li>
							<li><a href="/blog">Blog</a></li>
							<li><a href="/docs" target="_blank">Documentation</a></li>
							<li><a href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw&region=follow_link&screen_name=CourseAssembler&tw_p=followbutton" title="Follow @CourseAssembler on Twitter"><span uk-icon="icon: twitter;"></span></a></li>
						</ul>
						<div class="uk-navbar-item">
							<a href="#" class="uk-button my-launch"><span uk-icon="cart"></span> Launch App</a>
<div uk-dropdown="mode:click; pos:bottom-justify;" class="uk-background-muted uk-text-left">
	<div>
    	<fieldset class="uk-fieldset">
		    <legend class="uk-legend">Licence Key</legend>
	        <div class="uk-margin-small uk-grid-small uk-grid">
	        	<div class="uk-width-expand">
		            <input class="uk-input uk-form-small" type="text" placeholder="Enter your licence key" name="licencekey" onchange="readify()">
		        </div>
		        <div>
		        	<button onclick="launch(this)" class="uk-button uk-button-primary uk-button-small">Go</button>
		        </div>
	        </div>
	        <div class="uk-margin-small ">
	        	<label><input class="uk-checkbox" type="checkbox" checked> Remember on this computer</label>

	        </div>
    	</fieldset>
	</div>
	<hr class="uk-divider-icon">
	<p>You need a licence to use this software: A licence is good for so many days, then it stops working. <b>Buy only what you need, when you need.</b></p>
	<table class="uk-table uk-table-small uk-table-divider uk-table-hover">
	    <thead>
	        <tr>
	            <th>Licence</th>
	            <th>Price</th>
	            <th>Buy</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr>
	            <td>1 Day</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-1" data-format="%price" data-fsc-item-path-value="course-assembler-1">$2</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-1" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>10 Days</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-10" data-format="%price" data-fsc-item-path-value="course-assembler-10">$10</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-10" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>30 Days</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-30" data-format="%price" data-fsc-item-path-value="course-assembler-10">$25</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-30" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>60 Days</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-60" data-format="%price" data-fsc-item-path-value="course-assembler-10">$50</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-60" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	        <tr>
	            <td>1 year</td>
	            <td data-fsc-item-pricetotal-callback data-fsc-item-path="course-assembler-365" data-format="%price" data-fsc-item-path-value="course-assembler-10">$199</td>
	            <td><a href="#" data-fsc-item-path-value="course-assembler-365" data-fsc-action="Reset,Add,Checkout" class="uk-button uk-button-primary uk-button-small">Buy</a></td>
	        </tr>
	    </tbody>
	</table>

</div>						</div>
					</div>
				</nav>
			</div>
		</div>
        <link rel="stylesheet" href="/assets/outdated-browser-rework/outdated-browser.css">
        <div id="outdated"></div>
        <script src="/assets/outdated-browser-rework/outdated-browser.js"></script>
<div class="uk-container uk-margin-large">
	<h2 class="uk-text-center uk-margin-xlarge-bottom tilt"><span>Blog</span></h2>
	<?php echo implode(PHP_EOL, $output); ?>
</div>

	<footer class="my-footer uk-light">
		<div class="uk-container uk-container-expand uk-padding-small">
			<div class="uk-flex uk-flex-between@m uk-text-small uk-flex-around@s my-flex">
				<div class="uk-hidden@m" uk-navbar>
					<ul class="uk-navbar-nav">
					<li><a href="/">Home</a></li>					<li><a href="/faq">Faq</a></li>
					<li><a href="/changelog">Changelog</a></li>
					<li><a href="/docs">Documentation</a></li>
					</ul>
				</div>
				<div>
					<p>&copy; Copyright 2021 <a href="https://www.coursesuite.com">Coursesuite</a>, all rights reserved. <a href="/privacy">Policies</a> | <a href="mailto:info@courseassembler.com">Email</a> | <a href="https://twitter.com/courseassembler">@courseassembler</a>.</p>
				</div>
				<div >
					<a href='https://simpleshare.io/go?site=facebook&url=http%3A%2F%2Fcourseassembler.com.test%2Fapp%2Fpreview%2Fdata%2Fdebug%2Fplyr.polyfilled.js.map&text=Course%20Assembler%20-%20It%27s%20like%20an%20assembly%20line%20for%20your%20content%0A'><img src='https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg' style='max-width:100%;vertical-align:middle;width:24pt;height:24pt;margin-left:12pt'></a><a href='https://simpleshare.io/go?site=linkedin&url=http%3A%2F%2Fcourseassembler.com.test%2Fapp%2Fpreview%2Fdata%2Fdebug%2Fplyr.polyfilled.js.map&text=Course%20Assembler%20-%20It%27s%20like%20an%20assembly%20line%20for%20your%20content%0A'><img src='https://www.vectorlogo.zone/logos/linkedin/linkedin-tile.svg' style='max-width:100%;vertical-align:middle;width:24pt;height:24pt;margin-left:12pt'></a><a href='https://simpleshare.io/go?site=pinterest&url=http%3A%2F%2Fcourseassembler.com.test%2Fapp%2Fpreview%2Fdata%2Fdebug%2Fplyr.polyfilled.js.map&text=Course%20Assembler%20-%20It%27s%20like%20an%20assembly%20line%20for%20your%20content%0A'><img src='https://www.vectorlogo.zone/logos/pinterest/pinterest-tile.svg' style='max-width:100%;vertical-align:middle;width:24pt;height:24pt;margin-left:12pt'></a><a href='https://simpleshare.io/go?site=reddit&url=http%3A%2F%2Fcourseassembler.com.test%2Fapp%2Fpreview%2Fdata%2Fdebug%2Fplyr.polyfilled.js.map&text=Course%20Assembler%20-%20It%27s%20like%20an%20assembly%20line%20for%20your%20content%0A'><img src='https://www.vectorlogo.zone/logos/reddit/reddit-tile.svg' style='max-width:100%;vertical-align:middle;width:24pt;height:24pt;margin-left:12pt'></a><a href='https://simpleshare.io/go?site=twitter&url=http%3A%2F%2Fcourseassembler.com.test%2Fapp%2Fpreview%2Fdata%2Fdebug%2Fplyr.polyfilled.js.map&text=Course%20Assembler%20-%20It%27s%20like%20an%20assembly%20line%20for%20your%20content%0A'><img src='https://www.vectorlogo.zone/logos/twitter/twitter-tile.svg' style='max-width:100%;vertical-align:middle;width:24pt;height:24pt;margin-left:12pt'></a><a href='https://simpleshare.io/go?site=wordpress&url=http%3A%2F%2Fcourseassembler.com.test%2Fapp%2Fpreview%2Fdata%2Fdebug%2Fplyr.polyfilled.js.map&text=Course%20Assembler%20-%20It%27s%20like%20an%20assembly%20line%20for%20your%20content%0A'><img src='https://www.vectorlogo.zone/logos/wordpress/wordpress-tile.svg' style='max-width:100%;vertical-align:middle;width:24pt;height:24pt;margin-left:12pt'></a>				</div>
			</div>
		</div>
	</footer>

	<script
	    id="fsc-api"
	    src="https://d1f8f9xcsvx3ha.cloudfront.net/sbl/0.7.9/fastspring-builder.min.js"
	    type="text/javascript"
	    data-storefront="courseassembler.onfastspring.com/popup-courseassembler"
	        data-debug="false"
	        data-data-callback="fsCallbackFunction"
	        data-popup-webhook-received="fsWebhookReceived"
    ></script>
	<script
		type='text/javascript'
		src='/assets/main.js'
	></script>
    </body>
</html>