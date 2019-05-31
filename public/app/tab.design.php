<?php
 defined("APP")?assert(1):die();


$css = " class='selected'";

$groupings = [];
if (!empty($api_template)) {
	$groupings[] = "Your Template";
}

// get a distinct list of folders, which are in the pattern Grouping_SentenceCaseName
$designs = array_filter(glob(realpath(dirname(__FILE__)) . '/designs/*'), 'is_dir'); // [!_]*
array_walk($designs, function($v) use (&$groupings) {
	if (substr(basename($v),0,1)!=="_") {
		$groupings[] = basename($v);
	}
	// $group = explode('_', basename($v))[0];
	// if (!in_array($group, $groupings)) $groupings[] = $group;
});

// Draw in each grouping the list of designs
foreach ($groupings as $group) {

	echo "<fieldset>", "<legend>", $group, "</legend>", PHP_EOL;

	if ($group === "Your Template") {
		echo "<p class='theme-options m-t-half'>A template has been provided for you.</p>", PHP_EOL;
		echo "<div class='grid'><div><figure data-name='{$api_template}' class='selected'><img src='img/api_template.jpg'><figcaption>Your template</figcaption></figure></div></div>";
		$css = "";
	}

	if ($group === "Basic") {
		echo "<p class='theme-options'>Basic themes have a settable base colour: <input type='text' id='nav-colour' name='navbg' value='#189082' class='jscolor {hash:true, onFineChange:\"colourpreview(this)\"}}' onChange='colourpersist(this)' /></p>", PHP_EOL;
		// echo "<input type='hidden' name='layout' value='side-bar' readonly='readonly' title='Name of selected design'>", PHP_EOL;
		echo "<input type='hidden' name='navtext' value='255,255,255'>", PHP_EOL;
	}

	echo "<div class='grid'>", PHP_EOL;
	$designs = array_filter(glob(realpath(dirname(__FILE__)) . "/designs/{$group}/*"), 'is_dir');
	array_walk($designs, function($fold) use (&$css, $group) {
		$bn = basename($fold);
		$fn = rawurlencode($group) . '/' . rawurlencode($bn);
		echo "<div>","<figure data-name='{$fn}'{$css}>";
		echo "<img src='designs/{$fn}/preview.jpg'>";
		$svg = realpath("designs/{$fn}/overlay.svg"); // returns false if not found
		if ($svg) include($svg);
		echo "<figcaption>", trim(preg_replace('/([A-Z])/', ' $1', $bn)), "</figcaption>"; // SentenceCaseName => Sentence Case Name
		echo "</figure>", "</div>", PHP_EOL;
		$css = "";
	});
	echo "</div>", "</fieldset>", PHP_EOL;
}