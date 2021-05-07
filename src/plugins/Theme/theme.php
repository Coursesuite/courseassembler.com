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

// capture theme related properties for cssvars
$cssvars = [];
forEach($_POST as $key => $field) {
	if (substr($key,0,6) === "theme-") {
		//if ($field === "1") $field = true;
		//if ($field === "0") $field = false;
		// camelise: my-field-name => myFieldName
		$cssvars[lcfirst(str_replace('-', '', ucwords(substr($key,6), '-')))] = $field;
	}
}

// set up an object for handlebars
$data = [
	"option-course-name" => Request::post("course-name"),
	"option-course-description" => Request::post("course-description"),
	"option-course-copyright" => Request::post("course-copyright"),
	"enough-count" => 10,
	"rule" => "last",
	"navlock" => 0,
	"pages" => Request::post("nav"),
	"audio" => true,
	"cssvars" => $cssvars,
	"font" => "https://fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:300&display=swap"
];

// header('content-type: text/plain');
// die(json_encode($data, JSON_PRETTY_PRINT));
// generally looks like:
/*
{
    "option-course-name": "Course Introduction",
    "option-course-description": "This course was assembled at www.courseassembler.com",
    "option-course-copyright": "\u00a9 Anonymous 2021. All rights reserved.",
    "enough-count": 10,
    "rule": "last",
    "navlock": 0,
    "pages": "[{\"index\":2,\"title\":\"Course Introduction\",\"score\":1,\"content\":\"plugin\",\"href\":\"preview.html?file-kodmsiic-0\",\"depth\":0}]",
    "audio": true,
    "cssvars": {
        "buttonsTogglePrint": false,
        "buttonsToggleNav": true,
        "buttonsToggleFullscreen": true,
        "buttonsToggleMenu": true,
        "headerToggleName": true,
        "headerToggleDescription": false,
        "headerToggleProgress": true,
        "headerPickerBg": "#ffffff",
        "headerPickerBgContrast": "#000000",
        "menuToggleShow": true,
        "menuPickerBg": "url(data:image\/jpeg;base64,\/9j\/4AAQSkZJRgABAQAAAQABAAD\/4QDeRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAA4YwAA6AMAADhjAADoAwAABwAAkAcABAAAADAyMTABkQcABAAAAAECAwCGkgcAFQAAAMAAAAAAoAcABAAAADAxMDABoAMAAQAAAP\/\/AAACoAQAAQAAADIAAAADoAQAAQAAADIAAAAAAAAAQVNDSUkAAABQaWNzdW0gSUQ6IDE3AP\/bAEMACAYGBwYFCAcHBwkJCAoMFA0MCwsMGRITDxQdGh8eHRocHCAkLicgIiwjHBwoNyksMDE0NDQfJzk9ODI8LjM0Mv\/bAEMBCQkJDAsMGA0NGDIhHCEyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMv\/CABEIADIAMgMBIgACEQEDEQH\/xAAaAAACAwEBAAAAAAAAAAAAAAAABQIEBgMB\/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF\/9oADAMBAAIQAxAAAAHMzpzaN5iif15u6HXYB10ooCvTroqnnegnu2HRCBRoY7Zo05mqe15pG3pFTKtqOf1ecA5lYnPy+B2igF7+KwwTgc8v\/8QAIRAAAQQCAgMBAQAAAAAAAAAAAQACAxIEERMxISIyEEH\/2gAIAQEAAQUCbI5pZkG3OQofcUU0lpbBdO8Iv0sH2fKOOLfsJTprXB07HvRbVRyPacjJlni49CiOQuckW2sePTZdxyNn888a2B+QttJtZMd29GysUFjR1Ccslga7ab9Q+ZB2v5P8jr\/\/xAAfEQACAQMFAQAAAAAAAAAAAAAAARECAyEEEBIUMSD\/2gAIAQMBAT8Bdqh+ou6enjg01iHLOoSkTyFCwY2oUIqWy9+P\/8QAHhEAAgICAgMAAAAAAAAAAAAAAAECAxESEBQgITH\/2gAIAQIBAT8BVkl8K7nkus9YOwbEW2xzZtxFEkYF4f\/EACcQAAIABAUCBwAAAAAAAAAAAAABAhARMQMSIUFRcYEEICMyM2Hh\/9oACAEBAAY\/AqlYiEfWSXDLOaItPwij4RUsVeBG+wqeGiT6EPox5l9GbDw2nvREWGoHR8I1wIz45a1RuZ92M1LG\/aSUq7y9pqpZnedbFpLzf\/\/EACMQAAMAAQMEAgMAAAAAAAAAAAABESExQXEQUWGRgbHR8PH\/2gAIAQEAAT8hbXzu13Reo09iDl7QzdjxuLE7fLB\/DHlrO5rw4YFJOfRozNPt9hTbFmO3bd0g1LBYkXS5TvQZZq5CaImPwJ5Q4B3pMzFyIc3pmHW4LTJOvULXH4CT80aoVdI0MNuApl\/rETsXJCUhozAzHSeektC4mkMQZaFbGxGTN02cfsZxkTIyaQ9x6\/gVN6qM5zsf\/9oADAMBAAIAAwAAABBw8n1sqTFAKYIByAL\/xAAdEQADAAICAwAAAAAAAAAAAAAAAREQITFBUXHh\/9oACAEDAQE\/EFujag80R\/RLeo9x8Z0VIuBmVovlkL7LmeP\/xAAbEQACAwEBAQAAAAAAAAAAAAAAARARMSFBUf\/aAAgBAgEBPxDUM0WNaJC\/iOIHH0v8KKke8NKHkf\/EACIQAQADAAICAgMBAQAAAAAAAAEAESExUUFhcaGRsdGB4f\/aAAgBAQABPxB+1IIgTnPocHRA1RY9uz4+5RqtAHBPTBJjdOW+biClleTnG7DMt5l1OYUKoR8Qcq4rVwVap01v4mCq16zPuO2bTXc2IotfLM02C9V0jLxALNBDx9nMEUiCAU5u7LhZYlwVbQNT4IpZy7oCNUvqJ7pWS31c9BOmybwQ5Vu+osLZoMtiusRW0fZFxnsU4\/6iHAbBpQ9VGmOWU3\/tMv2jfp\/kclcbyfcLBsU65dp5lbDsKyviUYJRQBxAQXHNqAillSAlAqj7qIRhStxH+RRCUtotz8x2q4DoiFAKOmA1af2TwUA9+rlzEJUing5hBICsS4cvHFT95NK7sVLYXS\/E5i4eZ\/\/Z) repeat center \/ cover",
        "menuPickerBgContrast": "#7F7F7F",
        "menuPickerMenuitem": "rgba(0,0,0,0)",
        "menuPickerMenuitemContrast": "#FFFFFF",
        "menuPickerSelection": "#4aa0a6",
        "menuPickerSelectionContrast": "#FFFFFF",
        "menuShapeMenuitem": "none",
        "footerToggleCopyright": true,
        "footerToggleBranding": false
    }
}
*/


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

// theme files are actually handlebars templates
$css = Lib::render(file_get_contents("{$base_folder}/_package.css"), $data);
$js = Lib::render(file_get_contents("{$base_folder}/_package.js"), $data);

// replace external resources with inline versions (which might have been transformed by Handlebars/LightnCandy)
$index = file_get_contents("{$base_folder}/index.html");
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

// Output the final template
header("content-type: text-plain");
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
            "is" => function ($arg1, $arg2, $options) {
                if (strcasecmp((string) $arg1, (string) $arg2) == 0) {
                    return $options['fn']();
                } else if (isset($options['inverse'])) {
                    return $options['inverse']();
                }
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