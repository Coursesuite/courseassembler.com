<?php
// this just finds where the autoloader is
$fold = __DIR__; $path = ""; $exit = false;
do {
	$fold = dirname($fold);
	if (file_exists($path."vendor") || $fold === "/") {
		$exit = true;
	} else {
		$path .= "../";
	}
} while ($exit === false);
require_once($path . 'vendor/autoload.php');

use LightnCandy\LightnCandy;

$base = Request::post("template");
$base_folder = realpath("./themes/{$base}");
if (!file_exists($base_folder)) die("bad theme");

$index = file_get_contents("{$base_folder}/index.html");
$css = file_get_contents("{$base_folder}/_package.css");
$js = file_get_contents("{$base_folder}/_package.js");

$index = str_replace([
	'<script type="text/javascript" src="_package.js"></script>',
	'<link rel="stylesheet" type="text/css" href="_package.css">',
	'="plyr.',
	"'plyr.svg'",
], [
	'<script type="text/javascript">'.$js.'</script>',
	'<style>'.$css.'</style>',
	'="../../js/runtimes/plyr.', // match versions that get put into the zip
	"'../../js/runtimes/plyr.svg'",
], $index);

$data = [
	"option-course-name" => Request::post("course-name"),
	"option-course-description" => Request::post("course-description"),
	"option-course-copyright" => Request::post("course-copyright"),
	"enough-count" => 10,
	"rule" => "last",
	"navlock" => 0,
	"pages" => Request::post("nav"),
	"audio" => true,
];
forEach($_POST as $key => $field) {
	if (substr($key,0,6) === "theme-") {
		$data[substr($key,6)] = $field;
	}
}
	// "navbg" => "bg_colour",
	// "font" => "font",
	// "header_image" => "h_image",
	// "navtext" => "fg_colour",
	// "off_canvas" => "off_canvas",
	// "upper_case" => "ucase",
	// "background-image" => "bg_image",
/*
array(23) { ["option-course-name"]=> string(19) "Course Introduction" ["option-course-description"]=> string(52) "This course was assembled at www.courseassembler.com" ["option-course-copyright"]=> string(39) "© Anonymous 2021. All rights reserved." ["enough-count"]=> int(10) ["rule"]=> string(4) "last" ["navlock"]=> int(0) ["pages"]=> string(955) "[{"index":2,"title":"Course Introduction","score":1,"content":"plugin","href":"preview.html?file-knh02vcc-0","depth":0},{"index":3,"title":"Tim St Clair - Contractor agreement (2020-09-10_00-43 ADT) - Page 1","score":1,"content":"file","href":"preview.html?file-knh0388i-0-1","depth":0},{"index":4,"title":"Tim St Clair - Contractor agreement (2020-09-10_00-43 ADT) - Page 2","score":1,"content":"file","href":"preview.html?file-knh0388i-0-2","depth":1},{"index":5,"title":"Tim St Clair - Contractor agreement (2020-09-10_00-43 ADT) - Page 3","score":1,"content":"file","href":"preview.html?file-knh0388i-0-3","depth":1},{"index":6,"title":"Tim St Clair - Contractor agreement (2020-09-10_00-43 ADT) - Page 4","score":1,"content":"file","href":"preview.html?file-knh0388i-0-4","depth":1},{"index":7,"title":"Tim St Clair - Contractor agreement (2020-09-10_00-43 ADT) - Page 5","score":1,"content":"file","href":"preview.html?file-knh0388i-0-5","depth":1}]" ["audio"]=> bool(true) ["buttons-toggle-print"]=> string(1) "1" ["buttons-toggle-nav"]=> string(1) "1" ["buttons-toggle-fullscreen"]=> string(1) "1" ["buttons-toggle-menu"]=> string(1) "0" ["header-toggle-name"]=> string(1) "1" ["header-toggle-description"]=> string(1) "0" ["header-toggle-progress"]=> string(1) "0" ["header-picker-bg"]=> string(7) "#283941" ["menu-toggle-show"]=> string(1) "1" ["menu-picker-bg"]=> string(7) "#162731" ["menu-picker-menuitem"]=> string(13) "rgba(0,0,0,0)" ["menu-picker-selection"]=> string(49) "linear-gradient(180deg, #D8366C 0%, #AF225E 100%)" ["menu-shape-menuitem"]=> string(4) "none" ["footer-toggle-copyright"]=> string(1) "0" ["footer-toggle-branding"]=> string(1) "1" }
*/

die(Lib::render($index, $data));

class Lib {
    public static function render($template, $data, $partials = []) {
    	$helpers = [
			"urlencode" => function ($arg1) {
                return rawurlencode($arg1);
            },
            "json" => function($obj, $pretty = false) {
            	return $obj;
                $params = JSON_NUMERIC_CHECK; // | JSON_PRETTY_PRINT
                return json_encode($obj, $params);
            },
    	];
        $phpStr = LightnCandy::compile($template, array(
            "flags" => LightnCandy::FLAG_PARENT | LightnCandy::FLAG_ADVARNAME | LightnCandy::FLAG_HANDLEBARS,
            "helpers" => $helpers,
            "partials" => $partials,
        ));
        $assoc = json_decode(json_encode($data), true);
        $renderer = LightnCandy::prepare($phpStr);
        $result = $renderer($assoc);
        return $result;
    }
}