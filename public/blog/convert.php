<?php

$path = realpath(".");
echo $path, PHP_EOL;
$fold = new DirectoryIterator($path);
foreach ($fold as $file) {

    if ($file->isDot()) continue;
    if ($file->isDir()) {
        $name = $file->getFilename();
        $ref = $file->getPathname();

        echo $ref, PHP_EOL;

        $time = strtotime($name);
        $month = date("m",$time);
        $year = date("Y",$time);
        $day = date("d",$time);

        $p = "{$path}/{$year}/{$month}/{$day}";
        if (!file_exists($p)) mkdir($p, 0777, true);
        rename ($ref, $p);
    }
}
