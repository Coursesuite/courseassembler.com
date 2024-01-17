<?php
/*
NOTGrav

For when you liked the way Grav organised its files ... but hated everything else ... and all you really wanted was a simple markdown-based documentation site
*/

require "../../vendor/autoload.php";

$documentation_root = '.';
$list_tag = 'ul'; // ol's make more sense, since everything is ordered by numeric prefixes

// sort each item in an iterator by name
class ExampleSortedIterator extends SplHeap
{
    public function __construct(Iterator $iterator)
    {
        foreach ($iterator as $item) {
            $this->insert($item);
        }
    }
    public function compare($b,$a)
    {
        return strcmp($a->getRealpath(), $b->getRealpath());
    }
}


// list all files recursively, skipping dotfiles, and sort each directory by name
// TODO: cache this in a session variable, redis, or a file
$rii = new ExampleSortedIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($documentation_root, FilesystemIterator::KEY_AS_PATHNAME | FilesystemIterator::CURRENT_AS_FILEINFO | FilesystemIterator::SKIP_DOTS)));

// set up output array
$haystack = array();
$files = array();
$home = '';

$ALL_IN_ORDER = [];
$THIS_PAGE = '';

// go through each sorted file
foreach ($rii as $file) {

	// skip non-markdown files
	if (strpos($file->getFilename(), ".md") === false) continue;
	$haystack[$file->getPathname()] = preg_replace('/\/\d{1,}\./', '/', $file->getPathname());
	$name = substr($file->getPathname(), 2);
	if (empty($home)) $home = $name;

	// turn 01.folder-name/01.sub-folder-name/docs.md into [01.folder-name, 01.sub-folder-name, docs.md]
	$parts = explode('/',$name);

	// create a reference to the output array
	$current = &$files;

	foreach ($parts as $key) {
		// the reference is itself a reference with the key set as the step of the array
		// each item in parts becomes an array with that name as a key
		$current = &$current[$key];
	}

	// $rii is now collapsed into a nested sorted array with null-terminated leaf nodes

}

function render($ol, $path_to_here = '.', $current_url) {
	global $list_tag, $THIS_PAGE, $ALL_IN_ORDER;
	$result = [];
	foreach ($ol as $key => $value) {

		// if the value is null then we are somehow inside a leaf node (could throw exception)
		if (is_null($value)) continue;

		// turn "02.some-label-value" into "Some Label Value"
		$label = ucwords(str_replace('-',' ', preg_replace('/^\d{1,}\./', '',$key)));

		// look in this value to see if there's a leaf node
		// link to the leaf node, or just render the label
		$link = '';
		foreach ($value as $branch => $leaf) {
			if (is_null($leaf)) {
				$link = $branch;
				break;
			}
		}

		$ALL_IN_ORDER[] = "{$path_to_here}/{$key}/{$link}";

		$css = '';
		if ($current_url === "{$path_to_here}/{$key}/{$link}") {
			$THIS_PAGE = $current_url;
			$css = 'active';
		}
		$result[] = "<li class='{$css}'>";
		if (empty($link)) {
			$result[] = $label;
		} else {
			$result[] = "<a href='?url={$path_to_here}/{$key}/{$link}'>{$label}</a>";
		}
		$children = render($value, $path_to_here . '/' . $key, $current_url);
		if (!empty($children)) {
			$result[] = "<{$list_tag}>";
			$result = array_merge($result, $children);
			$result[] = "</{$list_tag}>";
		}
		$result[] = "</li>" . PHP_EOL;
	}
	return $result;

}

$url = isset($_GET['url']) ? $_GET['url'] : $home;
$output = render($files, '.', $url);

$menu = "<{$list_tag}>" . PHP_EOL . implode('' , $output) . "</{$list_tag}>" . PHP_EOL;

$content = <<<EOT
---
title: ¯\_(ツ)_/¯
---
Page was not found. That's all we know.
EOT;

if (!empty($url) && file_exists($url)) {
	$content = file_get_contents($url);
}

// chop the header
$metadata = substr($content, 0, strpos($content, "---", 4));
$content = substr($content, strpos($content, "---", 4) + 3);

// match properties from the metadata
preg_match('/^title:\ (.*)$/m', $metadata, $matches);
$page_title = $matches[1];

// other properties can be matched (we're not using this yet)
$visible = preg_match('/^visible:\ true$/m', $metadata, $matches) !== 0;

// convert markdown to html
$Parser = new Parsedown();

// replace paths on images to point to the current page url
$content = str_replace('<img src="', '<img src="' . dirname($url) . '/', $Parser->text($content));

// finding <a href="some/page"> and replacing with <a href="?url=01.some/02.page/docs.md">
if (preg_match_all('/\ href=\"(.*)\"/U', $content, $matches)) {
	for ($i=0;$i<count($matches[0]);$i++) {
		$anchor = "top";
		$seek = $matches[1][$i];
		if (strpos($matches[1][$i], '#')!==false) {
			$x = explode('#', $seek);
			$seek = reset($x);
			$anchor = end($x);
		}
		// search they array value, return the array item(s)
		$stack = array_filter($haystack, function($v) {
			global $seek;
			return strpos($v, $seek) !== false;
		});
		// stack might have multiple matches; subfolders will naturally sort earlier, so the last item will be what we need
		end($stack);

		// substitute the original href with the new one
		$find = $matches[0][$i];
		$replace = ' href="?url=' . key($stack) . '#' . $anchor . '"';
		$content = str_replace($find, $replace, $content);
	}
}

// find the next and previous pages
// look in the sorted navigation array for the current page
// and filter out the non-docs.md pages
// then find the previous and next page values and turn them into links
$found = 0;
$ALL_IN_ORDER = array_filter($ALL_IN_ORDER, function($v) {
	return strpos($v,"/docs.md") !== false;
});

$pagekeys = array_values($ALL_IN_ORDER);
foreach ($pagekeys as $index => $key) {
	if ($key === $THIS_PAGE) {
		$found = $index;
		break;
	}
}
$PREVIOUS_PAGE = @$pagekeys[$found-1];
$NEXT_PAGE = @$pagekeys[$found+1];


// variables to help the formatting for the page
$page_title = trim($page_title,"'");
$navigation = ''; $navtop = '';
if (!empty($PREVIOUS_PAGE))  $navigation .= "<a href='?url={$PREVIOUS_PAGE}' title='Go to the previous page'>&#x276E; Previous</a>";
if (!empty($PREVIOUS_PAGE) && !empty($NEXT_PAGE)) $navigation .= " | ";
if (!empty($NEXT_PAGE)) $navigation .= "<a href='?url={$NEXT_PAGE}' title='Go to the next page'>Next &#x276F;</a>";
if (!empty($navigation)) $navigation = "<nav>{$navigation}</nav>";

// finally, render the whole page.
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title><?php echo $page_title; ?> | Course Assembler Product Documentation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
    <link rel="icon" type="image/png" href="/favicon.ico">
    <link href="style.css" type="text/css" rel="stylesheet">
</head>
<body>
	<header>
		<b>Product documentation</b>
		<a id="logo" href="?url=<?php echo $home; ?>"><img src="/assets/header.svg"></a>
	</header>

	<main>
		<input type="checkbox" id="sidebar-toggle" checked>
		<label for="sidebar-toggle" title="Toggle menu">☰</label>

		<aside>
			<div class="sticky"><?php echo $menu; ?></div>
		</aside>

		<article id="body">
			<h1><?php echo $page_title; ?></h1>
<?php echo $content; ?>
<?php echo $navigation; ?>
		</section>
	</main>
</body>
</html>