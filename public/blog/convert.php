<?php

require "../../vendor/autoload.php";
$Parser = new Parsedown();

function get_files($real_path) {
    $fold = new DirectoryIterator($real_path);
    $files = [];
    foreach ($fold as $fi) {
        if ($fi->isDot()) continue;
        $fn = $fi->getFilename();
        if (stripos(strrev($fn), 'dm.') === 0) { // ends in .md
            $name = substr($fn, 0, -3); // file name without .md extension
            $key = strtotime($name); // "2017-05-24 00:00:00.md" => 1495584000
            $files[$key] = [
                "name" => $name,
                "date" => date("F j, Y", $key),
                "contents" => file_get_contents("{$real_path}/{$fn}")
            ];
        }
    }
    krsort($files);
    return $files;
}

$f = get_files("../assets/changelog");
$p = realpath('.');

echo "<li>Source: ", "{$f}", PHP_EOL;
echo "<li>Destination: ", "{$p}", PHP_EOL;


foreach ($f as $value) {
	$d = $value['date'];
	$fold = "{$p}/{$d}";
	echo "<li>", "{$fold}/0.html", PHP_EOL;
	if (!file_exists($fold)) mkdir($fold);
	if (file_exists("$fold/0.md")) unlink("$fold/0.md");
	$text = "#New update" .PHP_EOL . PHP_EOL . $value['contents'];
	file_put_contents("{$p}/{$d}/0.html", $Parser->text($text));
}
