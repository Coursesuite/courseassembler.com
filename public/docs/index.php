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
$rii = new ExampleSortedIterator(new RecursiveIteratorIterator(new RecursiveDirectoryIterator($documentation_root, FilesystemIterator::KEY_AS_PATHNAME | FilesystemIterator::CURRENT_AS_FILEINFO | FilesystemIterator::SKIP_DOTS)));

// set up output array
$haystack = array();
$files = array();
$home = '';

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

function render($ol, $path_to_here = '.') {
	global $list_tag;
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

		$result[] = "<li>";
		if (empty($link)) {
			$result[] = $label;
		} else {
			$result[] = "<a href='?url={$path_to_here}/{$key}/{$link}'>{$label}</a>";
		}
		$children = render($value, $path_to_here . '/' . $key);
		if (!empty($children)) {
			$result[] = "<{$list_tag}>";
			$result = array_merge($result, $children);
			$result[] = "</{$list_tag}>";
		}
		$result[] = "</li>" . PHP_EOL;
	}
	return $result;

}

$output = render($files);

$menu = "<{$list_tag}>" . PHP_EOL . implode('' , $output) . "</{$list_tag}>" . PHP_EOL;

$url = isset($_GET['url']) ? $_GET['url'] : $home;
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

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Using the App | Course Assembler</title>
    <meta name="generator" content="GravCMS" />
    <meta name="description" content="Documentation for the Course Assembler" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
    <link rel="icon" type="image/png" href="favicon.png">
    <link href="c0bd2f0a90682729dd93c69823c3ec47.css" type="text/css" rel="stylesheet">
</head>
<body>
    <nav id="sidebar">
        <div id="header-wrapper">
            <div id="header">
                <a id="logo" href="?url=<?php echo $home; ?>"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 862.68 59.62" width="270px"><title>Asset 12</title><path d="M49.42,18H39l.72-4.51a3.16,3.16,0,0,0-3-3.79H19.92a4.76,4.76,0,0,0-4.2,3.79L10.6,46a3.16,3.16,0,0,0,3,3.79h16.8A4.66,4.66,0,0,0,34.57,46l.72-4.61H45.73L45,46C43.79,54,38.15,59.41,30,59.41H13.67c-8.4,0-14.75-5.84-13.52-13.83L5.38,13.32C6.71,5.33,12.55,0,20.74,0H38C45.12,0,51.16,7.17,50,14.44Z" fill="white"/><path d="M103,46.09c-1.34,8.3-7.07,13.32-15.68,13.32H69.4c-8.4,0-14.55-5.84-13.32-13.83l5.23-32.37C62.64,5.12,68.68,0,77.49,0H95.72c7.79,0,13.52,6.56,12.4,13.83ZM94.9,9.53H75.65a4.64,4.64,0,0,0-4.2,3.79L66.32,46.09a3.11,3.11,0,0,0,3,3.79H88.55a4.65,4.65,0,0,0,4.2-3.79L98,13.32A3.18,3.18,0,0,0,94.9,9.53Z" fill="white"/><path d="M161.69,45.89c-1.33,8.3-7.17,13.52-15.57,13.52H130.35c-8.4,0-14.75-5.84-13.53-13.83L124.1,0h10.65l-7.27,46.09a3.11,3.11,0,0,0,3,3.79h16.39a4.66,4.66,0,0,0,4.2-3.79L158.31,0H169Z" fill="white"/><path d="M223.76,20.28a13.28,13.28,0,0,1-5.94,9.32c2.77,2,3.69,4.82,3.08,8.61l-3.38,21.2H207.07L210.24,39c.52-3.38-.41-4.41-3.58-4.41H187.09L183.2,59.41H173.06L182.48,0h29.91c7.79,0,13.42,6.86,12.3,13.83ZM211.47,9H191.19l-2.46,15.78h19.16c3.79,0,4.81-1,5.32-4.61l1.13-7.07C214.75,11,213.21,9,211.47,9Z" fill="white"/><path d="M281,17.72H270.78l.72-4.4a3.18,3.18,0,0,0-3.08-3.79h-16a4.64,4.64,0,0,0-4.19,3.79L247,21.1c-.93,6,11.57,3.89,19,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H246.09c-8.7,0-14.85-5.84-13.62-13.83l.62-3.79h10.24l-.72,4.3a3.16,3.16,0,0,0,3,3.79h17.31a4.75,4.75,0,0,0,4.2-3.79l1.13-7.68c1-6-11.47-4-19-4.2-8.3-.31-13.52-6.56-12.29-14.24l1.12-7C239.44,4.92,245.58,0,254.19,0h15.05c7.69,0,13.52,6.66,12.4,13.83Z" fill="white"/><path d="M334.08,9.53H305.81l-2.46,15.36h21.92l-1.53,9.73H301.82l-2.36,15.26h28.27l-1.53,9.53H287.68L297.11,0h38.51Z" fill="white"/><path d="M418.59,59.41H408.25l3-18.74H386.84l-3,18.74H373.52l5.74-36.16a13.72,13.72,0,0,1,5.43-9.83L401,0h9l12,13.42c2.66,3,3,5.63,2.36,9.83Zm-5.43-39.54L403.94,9c-.61.82-12.49,10.86-12.49,10.86-1.44,1.23-1.54,1.74-1.85,3.89l-1.33,7.89h24.38l1.23-7.89C414.19,21.61,414.29,21.1,413.16,19.87Z" fill="white"/><path d="M482,17.72H471.75l.72-4.4a3.18,3.18,0,0,0-3.07-3.79h-16a4.65,4.65,0,0,0-4.2,3.79L448,21.1c-.92,6,11.57,3.89,19.05,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H447.07c-8.71,0-14.85-5.84-13.63-13.83l.62-3.79H444.3l-.71,4.3a3.16,3.16,0,0,0,3,3.79h17.31a4.76,4.76,0,0,0,4.2-3.79l1.12-7.68c1-6-11.47-4-18.95-4.2C442,34.11,436.72,27.86,438,20.18l1.13-7C440.41,4.92,446.56,0,455.16,0h15.06c7.68,0,13.52,6.66,12.39,13.83Z" fill="white"/><path d="M538.34,17.72H528.09l.72-4.4a3.18,3.18,0,0,0-3.07-3.79h-16a4.65,4.65,0,0,0-4.2,3.79l-1.23,7.78c-.92,6,11.57,3.89,19.05,4.1,7.89.31,13.32,5.84,12.19,14.24l-.92,6.76c-1.13,8.19-7.58,13.42-16,13.42H503.41c-8.71,0-14.86-5.84-13.63-13.83L490.4,42h10.24l-.72,4.3a3.17,3.17,0,0,0,3,3.79h17.32a4.76,4.76,0,0,0,4.2-3.79l1.12-7.68c1-6-11.47-4-18.95-4.2-8.29-.31-13.52-6.56-12.29-14.24l1.13-7C496.75,4.92,502.89,0,511.5,0h15.06c7.68,0,13.52,6.66,12.39,13.83Z" fill="white"/><path d="M591.4,9.53H563.13l-2.46,15.36h21.92l-1.54,9.73H559.13l-2.36,15.26h28.28l-1.54,9.53H545L554.42,0h38.51Z" fill="white"/><path d="M643.94,59.41H633.5l6.65-42.2L627.35,29.5H621l-8.91-12.29-6.66,42.2H595L604.41,0h8.5l13.21,19C626.84,17.72,644.87,0,644.87,0h8.5Z" fill="white"/><path d="M707.25,20.08c-.72,4.5-3,7.68-5.84,9.32,2.46,1.33,3.58,4.81,3,8.6l-1.23,8.09c-1.23,8-6.86,13.32-15.16,13.32H657.57L667,0h28.68c7.79,0,13.73,6.45,12.5,14ZM690.45,34H671.7l-2.56,16.28H688.4a4.75,4.75,0,0,0,4.2-4.09l1.23-7.28C694.34,35.13,693.73,34,690.45,34ZM695,9.22H675.7l-2.46,15.47h18.13c3.79,0,4.82-1.13,5.43-4.72l1-6.65C698.23,11.17,696.7,9.22,695,9.22Z" fill="white"/><path d="M751.71,59.41H714.42L723.84,0H734.5l-7.89,49.88h26.63Z" fill="white"/><path d="M807.33,9.53H779.06L776.6,24.89h21.92L797,34.62H775.06L772.7,49.88H801l-1.54,9.53H760.93L770.35,0h38.51Z" fill="white"/><path d="M861.62,20.28a13.34,13.34,0,0,1-5.94,9.32c2.76,2,3.68,4.82,3.07,8.61l-3.38,21.2H844.92L848.1,39c.51-3.38-.41-4.41-3.59-4.41H825l-3.9,24.79H810.91L820.34,0h29.91c7.78,0,13.42,6.86,12.29,13.83ZM849.32,9H829l-2.46,15.78h19.16c3.79,0,4.81-1,5.33-4.61l1.12-7.07C852.6,11,851.07,9,849.32,9Z" fill="white"/></svg></a>
            </div>
        </div>

        <div class="scrollbar-inner">
            <div class="highlightable">
<?php echo $menu; ?>
            </div>
        </div>
    </nav>

    <section id="body">
    	<div class="padding">
    	<h1><?php echo trim($page_title,"'"); ?></h1>
<?php echo $content; ?>
		</div>
    </section>

     </body>
</html>