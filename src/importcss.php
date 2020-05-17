<?php
// https://stackoverflow.com/questions/1379277/minify-css-using-preg-replace
// https://github.com/siteorigin/so-css/pull/102/files/f5b7aee72d85990704856341d5f65724a8fb259e
function removeComments( $css ) {
    // php >= 7.4
    $regex = array(
        "`^([\t\s]+)`ism"                             => '',
        "`^\/\*(.+?)\*\/`ism"                         => "",
        "`(\A|[\n;]+)/\*[^*]*\*+(?:[^/*][^*]*\*+)*/`" => "$1",
        "`(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+`ism"       => "\n"
    );
    // php < 7.4
    // $regex = array(
    //     "`^([\t\s]+)`ism"=>'',
    //     "`^\/\*(.+?)\*\/`ism"=>"",
    //     "`([\n\A;]+)\/\*(.+?)\*\/`ism"=>"$1",
    //     "`([\n\A;\s]+)//(.+?)[\n\r]`ism"=>"$1\n",
    //     "`(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+`ism"=>"\n"
    // );
    return preg_replace( array_keys( $regex ), $regex, $css );
}
function getImports( $css ) {
    preg_match_all( "/@import url\((.*)\);/", $css, $matches );
    $includes   = array();
    foreach( $matches[0] as $key => $match ) {
        $import     = "@import url\({$matches[1][ $key ]}\);";
        $includes[] = array(
            "css"       => $match,
            "regex"     => "/".str_replace( "/", "\/", str_replace(".","\.", $import) )."/",
            "file"      => $matches[1][ $key ]
        );
    }
    return $includes;
}

$options = getopt("o::i:");
if (!isset($options["i"])) {
    die("Missing required parameter -i\n");
}

$tmpname = uniqid();
if (isset($options["o"])) {
    $uglyoptions = " --output {$options["o"]}";
}

$rootDirectory = realpath(dirname($options["i"])) . '/';
$baseName = basename($options["i"]);
$css = file_get_contents("{$rootDirectory}{$baseName}");
if (strlen($css) === 0) {
    die("Empty input file\n");
}

// $css = removeComments( $css );
foreach( getImports( $css ) as $import ) {
    $m = str_replace("'", "", $import["file"]);
    $fileName = "{$rootDirectory}{$m}";
    $importedCSS = @file_get_contents( $fileName );
    $importedCSS = removeComments( $importedCSS );
    $css = preg_replace( $import["regex"], $importedCSS, $css );
}
file_put_contents($tmpname, $css);
system("uglifycss {$tmpname}{$uglyoptions}");
unlink($tmpname);