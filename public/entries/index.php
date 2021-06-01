<div class="uk-container uk-margin-large">

<h2 class="uk-text-center uk-margin-xlarge-bottom tilt">Blog</h2>
<?php

/*
a folder based blog.

folders are the date in Name Day, Year format (or really any format that strtotime can format)

in each folder are one or more html file

when in list mode the blog will list the contents of 0.html

when in entry mode the blog will list the contents of each file in name order, concatented. this way you can have extended entries.

*/
$page = isset($_GET['path']) ? $_GET['path'] : '';

$cache = false;

$p = realpath('./entries');
if (file_exists("{$p}/cache.db") && CACHE) {
	$entries = unserialize(file_get_contents("{$p}/cache.db"));
} else {
	$fold = new DirectoryIterator($p);
	$entries = [];
	foreach ($fold as $fi) {
	    if ($fi->isDot()) continue;
	    if (!$fi->isDir()) continue;
	    $fn = $fi->getFilename();
	    if ($fn === 'cache.db') continue;
	    $key = strtotime($fn); // "2017-05-24 00:00:00.md" => 1495584000
	    $slug = strtolower(date("j-F-Y", $key));
	    $entries[$key] = [
	    	"dir" => $fn,
	    	"date" => date("F j, Y", $key),
	    	"slug" => "blog/{$slug}",
	    	"summary" => file_get_contents("{$p}/{$fold}/0.html"),
	    	"more" => file_exists("{$p}/{$fold}/1.html")
	    ];
	}
	krsort($entries);
	file_put_contents("{$p}/cache.db", serialize($entries));
}

if ($page === "blog") {
	foreach ($entries as $entry) {
		$slug = $entry['slug'];
		echo "<h2>", $entry['date'], "</h2>";
		echo "<div>", $entry['summary'], "</div>";
		if ($entry['more']) echo "<p class='uk-small'><a href='{$slug}'>Read more ...</a></p>", PHP_EOL;
		echo "<hr>", PHP_EOL;
	}
} else {
	foreach ($entries as $entry) {
		if ($entry['slug'] === $page) {
			echo "<h2>", $entry['date'], "</h2>";
			$di = new DirectoryIterator($p . "/" . $entry['dir'] . "/");
			ob_start();
			foreach ($di as $f) {
				if ($f->isFile() && $f->getExtension()==="html") {
					include $f->getPathname();
				}
			}
			echo str_replace(['src="',"src='"],['src="/entries/'.$entry["dir"].'/',"src='/entries/".$entry["dir"]."/"],ob_get_clean());

		}
	}
	echo "<p class='uk-small'><a href='/blog'>Back</a></p>", PHP_EOL;
}
?>
</div>