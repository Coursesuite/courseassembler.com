	<div class="uk-section uk-padding-remove-bottom">
		<div class="uk-container">
			<h1>Changelog</h1>
		</div>
	</div>

	<div class="uk-container uk-margin-large">
		<ul uk-accordion="multiple: true">
		<?php
		$Parser = new Parsedown();
		$files = get_files(APP . "/assets/changelog");
		foreach ($files as $file) {
			echo "<li>", PHP_EOL;
			echo "<a href='#' class='uk-accordion-title'>", $file["date"], "</a>", PHP_EOL;
			echo "<div class='uk-accordion-content'>", $Parser->text($file["contents"]), "</div>", PHP_EOL;
			echo "</li>", PHP_EOL;
		}
		?>
	</div>

<?php
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
?>