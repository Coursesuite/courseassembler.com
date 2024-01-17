<div class="uk-section">
    <div class="uk-container">
<?php

global $match;

$page = $match['params']['page'];

echo "<h1>Features - {$page}</h1>";
echo "<p>&#x25A0; <a href='/'>CourseAssembler</a> &#x25BA; <a href='/#features'>Features</a> &#x25BA; <a href='/features/{$page}'>", ucfirst($page), "</a></p>", PHP_EOL;

if (function_exists($page)) {
    $page();
} else {
    echo "<p> uhhh - not found ? how did you even get here? </p>";
}

echo "</div></div>";

function compatible() {
    renderFeature("assets/formats.svg", "compatible.md");
}

function friendly() {
    renderFeature("assets/pencils.svg", "friendly.md");
}

function compliant() {
    renderFeature("assets/elearning.svg", "compliant.md");
}

function responsive() {
    renderFeature("assets/responsive.svg", "responsive.md");
}

function renderFeature($image, $source) {
    $Parser = new Parsedown();
    $path = realpath("./assets/features/".$source);
    $html = $Parser->text(file_get_contents($path));
    echo "
        <div uk-grid class='uk-child-width-1-1@s uk-padding uk-flex uk-flex-top'>
            <div class='uk-width-1-3@m'>
                <img data-src='{$image}' class='uk-responsive-width' uk-img width='1000'>
            </div>
            <div class='uk-width-2-3@m'>
                {$html}
            </div>
        </div>
        ";
}