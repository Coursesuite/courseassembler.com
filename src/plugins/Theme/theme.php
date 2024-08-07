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

// set up an object for handlebars to compile against
$data = [
	"option-course-name" => Request::post("theme-course-name"),
	"option-course-description" => Request::post("theme-course-description"),
	"option-course-copyright" => Request::post("theme-course-copyright"),
	"enough-count" => 10,
	"rule" => "last",
	"navlock" => 0,
    "media" => true,
    "mus" => true,
	"pages" => Request::post("nav"),
    "theme" => json_decode(Request::post("theme"), JSON_NUMERIC_CHECK),
];

// header('content-type: text/plain');
// var_dump(Request::post("themedata"));
// echo PHP_EOL, PHP_EOL;
// var_dump(json_decode(Request::post("themedata"), JSON_NUMERIC_CHECK));
// var_dump($_POST);
// die();
// die(json_encode($data, JSON_PRETTY_PRINT));


// theme files might actually be handlebars templates, so compile them against the data object
$css = Lib::render(file_get_contents("{$base_folder}/_package.css"), $data);
$js = Lib::render(file_get_contents("{$base_folder}/_package.js"), $data);

// replace external resources with inline versions (which might have been transformed by Handlebars/LightnCandy)
$index = file_get_contents("{$base_folder}/index.html");
$index = str_replace([
	'<script type="text/javascript" src="_package.js"></script>',
	'<link rel="stylesheet" type="text/css" href="_package.css">',
	'="plyr.',
	"'plyr.svg'",
    '"play.js"'
], [
	'<script type="text/javascript">'.$js.'</script>',
	'<style>'.$css.'</style>',
	'="../../js/runtimes/plyr.', // match versions that get put into the zip
	"'../../js/runtimes/plyr.svg'",
	"'../../js/runtimes/play.js'",
], $index);

// Output the final template
// header("content-type: text-plain");
die(Lib::render($index, $data));

class Lib {
    public static function render($template, $data, $partials = []) {

        // IMPORTANT
        // these helpers must have javascript equivalents for runtime compilation
    	$helpers = [
			"urlencode" => function ($arg1) {
                $entities = array('%20', '%21', '%2A', '%27', '%28', '%29', '%3B', '%3A', '%40', '%26', '%3D', '%2B', '%24', '%2C', '%2F', '%3F', '%25', '%23', '%5B', '%5D');
                $replacements = array('+', '!', '*', "'", "(", ")", ";", ":", "@", "&", "=", "+", "$", ",", "/", "?", "%", "#", "[", "]");
                return str_replace($entities, $replacements, rawurlencode($arg1));
            },
            "json" => function($obj, $pretty = false) {
                $params = JSON_NUMERIC_CHECK; // | JSON_PRETTY_PRINT
                return json_encode($obj, $params);
            },
            "stringify" => function ($obj) { // doesn't match javascript but works in Lightncandy the way we need
                return $obj;
            },
            "is" => function ($arg1, $arg2, $options) {
                if (strcasecmp((string) $arg1, (string) $arg2) == 0) {
                    return $options['fn']();
                } else if (isset($options['inverse'])) {
                    return $options['inverse']();
                }
            },
            "count" => function (...$ar) {
                $v = 0;
                foreach ($ar as $value) {
                    if (is_array($value)) continue;
                    if ($value) $v++;
                }
                return $v;
            },
            "bw" => function ($arg1) {
            // calculate black or white based on hex colour
                $hex = str_replace("#", "", $arg1);
                $rgb = array(hexdec(substr($hex, 0, 2)), hexdec(substr($hex, 2, 2)), hexdec(substr($hex, 4, 2)));
                $c = ($rgb[0] * 299 + $rgb[1] * 587 + $rgb[2] * 114) / 1000;
                return ($c > 125) ? "black" : "white";
            }
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