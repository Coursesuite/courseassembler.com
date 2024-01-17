<div class="uk-section">
    <div class="uk-container uk-margin-large">
    	<h1>Changelog</h1>

<?php
function mysort($a, $b) {
	return $a->getPathname() < $b->getPathname();
}

global $BlogRoot;
$BlogRootReal = realpath('./' .$BlogRoot);
$len = strlen(($BlogRootReal));

$Directory = new RecursiveDirectoryIterator($BlogRootReal);
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
	$slug = str_replace('/','-',substr($entry, 1, -7));
	$repl = $BlogRoot . $entrypath;
	$more = "";

	$output[] = "<h5>" . $date->format("j M, Y") . "</h5>";
	$output[] = "<div>" . str_replace(['src="',"src='"],['src="'.$repl,"src='{$repl}"], $contents) . "</div>";
	if (file_exists($BlogRootReal . str_replace("0.html","1.html",$entry))) {
		$more = "Read more / "; 
	}
	$output[] = "<p class='uk-small'><a href='/blog/{$slug}'>{$more}Comments ...</a></p>";
	$output[] = "<hr>";
}

echo implode(PHP_EOL, $output);

?>
    </div>
</div>