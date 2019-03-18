	<div class="uk-section uk-padding-remove-bottom">
		<div class="uk-container">
			<h1>Privacy, Terms & Conditions</h1>
		</div>
	</div>

	<div class="uk-container uk-margin-large">
		<?php
		$Parser = new Parsedown();
		$files = get_files(APP . "/assets/policies");
		foreach ($files as $file) {
			echo "<h2>", $file["name"], "</h2>", PHP_EOL;
			echo $Parser->text($file["contents"]), PHP_EOL;
		}
		?>
	</div>

<?php
function get_files($real_path) {
    $fold = new DirectoryIterator($real_path);
    $names = [];
    $files = [];
    foreach ($fold as $fi) {
        if ($fi->isDot()) continue;
        $fn = $fi->getFilename();
        if (stripos(strrev($fn), 'dm.') === 0) { // ends in .md
			$names[] = $fn;
		}
	}
	natcasesort($names); // natural order case insensitive sort; 1. foo, 2. bar, 10. baz
	foreach ($names as $name) {
		$files[] = [
			"name" => basename(preg_replace("/^\d{1,}[.]\s*/","", $name),'.md'),
			"contents" => file_get_contents("{$real_path}/{$name}")
		];
	}
    return $files;
}
?>