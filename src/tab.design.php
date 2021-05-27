<?php defined("APP")?assert(1):die(); ?>

<form id="colours" class="w-80 m-lr-auto m-t-large" method='post' action='plugins/Theme/theme.php' target='_theme-preview'>
	<input type="hidden" name="template">
	<input type="hidden" name="selected_theme">
	<input type="hidden" name="theme">
	<input type="hidden" name="nav">
	<input type="hidden" name="course-name">
	<input type="hidden" name="course-description">
	<input type="hidden" name="course-copyright">

<fieldset class='grid'><legend>Navigation style</legend>
<?php
foreach (glob(realpath(dirname(__FILE__)) . '/plugins/Theme/themes/*',GLOB_ONLYDIR) as $file) {
	$path = basename($file);
	$caption = ucwords($path);
	echo "<figure data-action='set-theme-base' data-name='{$path}'><img src='plugins/Theme/themes/{$path}/preview.jpg'><figcaption>{$caption}</figcaption></figure>", PHP_EOL;
}
?>
</fieldset>

<fieldset class='themePreviewOptions'>
	<legend>Themes</legend>

</fieldset>

<fieldset id='themePreviewContainer'><legend>Preview</legend>
	<iframe frameborder='0' id='theme-preview' name='_theme-preview'></iframe>
</fieldset>

<p class="small">This preview is for design purpose and does not reflect final page ordering or functionality.</p>


</form>