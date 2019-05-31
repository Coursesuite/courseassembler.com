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

$theme_name = Lib::get("theme");
$bg_colour = Lib::get("bgc","#ffffff");
$fg_colour = Lib::get("fgc","#000000");
$bg_image = Lib::get("bgi");
$h_image = Lib::get("hi");
$font = Lib::get("font");
$off_canvas = boolval(Lib::get("menu"));
$ucase = boolval(Lib::get("upper"));
$course_name = Lib::get("name", "Untitled Course");
$course_desc = Lib::get("description", "This course was creaated by CourseAssembler");
$course_copyright = Lib::get("copyright", "Your copyright statement.");
$nav = Lib::post("nav", false, null, null, []);

if ($theme = Lib::load_theme($theme_name)) {

	foreach ($theme->css as $file) {
		$css[] = Lib::load_file("components/css/{$file}.css");
	}
	foreach ($theme->js as $file) {
		$js[] = Lib::load_file("components/js/{$file}.js");
	}
	foreach ($theme->html as $file) {
		$html[] = Lib::load_file("components/html/{$file}.html");
	}

	$data = [
		"embedded" => [
			"css" => implode(PHP_EOL, $css),
			"script" => str_replace("alert","console.log",implode(PHP_EOL, $js))
		],
		"option-course-name" => $course_name,
		"option-course-description" => $course_desc,
		"option-course-copyright" => $course_copyright,
		"navbg" => $bg_colour,
		"font" => $font,
		"header_image" => $h_image,
		"navtext" => $fg_colour,
		"off_canvas" => $off_canvas,
		"upper_case" => $ucase,
		"background-image" => $bg_image,
		"enough-count" => 10,
		"rule" => "last",
		"navlock" => 0,
		"pages" => $nav
	];
	// $foo = clone (object) $data;
	// unset($foo->embedded);
	// var_dump($foo); exit;
	echo Lib::render(implode(PHP_EOL, $html), $data);
} else {
	echo "¯\_(ツ)_/¯";
}

class Lib {
	public static function load_file($fullname) {
		$path = realpath("./{$fullname}");
		if (file_exists($path)) {
			return file_get_contents($path);
		}
		return false;
	}
	public static function load_theme($name) {
		if ($data = self::load_file("themes/{$name}.json")) {
			return json_decode($data);
		}
		return false;
	}
    public static function post($key, $clean = true, $filter = null, $filteroption = null, $default = null) {
        if (isset($_POST[$key])) {
            if ($filter !== null) {
                $value = filter_input(INPUT_POST, $key, $filter, $filteroption);
            } else {
                $value = $_POST[$key];
            }
            return ($clean) ? trim(strip_tags($value)) : $value;
        }
        if (isset($default)) return $default;
    }
    public static function get($key, $default = null, $filter = FILTER_SANITIZE_ENCODED) {
    	$value = $default;
        if (isset($_GET[$key])) {
            if ($filter !== null) {
                $value = filter_input(INPUT_GET, $key, $filter);
            } else {
            	$value = $_GET[$key];
            }
        }
        return $value;
    }
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