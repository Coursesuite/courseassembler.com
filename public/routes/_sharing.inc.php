<?php
// https://simpleshare.io/
// https://github.com/VectorLogoZone
// https://stackoverflow.com/a/8891890/1238884
function url_origin( $s, $use_forwarded_host = false ) {
    $ssl      = ( ! empty( $s['HTTPS'] ) && $s['HTTPS'] == 'on' );
    $sp       = strtolower( $s['SERVER_PROTOCOL'] );
    $protocol = substr( $sp, 0, strpos( $sp, '/' ) ) . ( ( $ssl ) ? 's' : '' );
    $port     = $s['SERVER_PORT'];
    $port     = ( ( ! $ssl && $port=='80' ) || ( $ssl && $port=='443' ) ) ? '' : ':'.$port;
    $host     = ( $use_forwarded_host && isset( $s['HTTP_X_FORWARDED_HOST'] ) ) ? $s['HTTP_X_FORWARDED_HOST'] : ( isset( $s['HTTP_HOST'] ) ? $s['HTTP_HOST'] : null );
    $host     = isset( $host ) ? $host : $s['SERVER_NAME'] . $port;
    return $protocol . '://' . $host;
}
function full_url( $s, $use_forwarded_host = false ) {
    return url_origin( $s, $use_forwarded_host ) . $s['REQUEST_URI'];
}
$thisurl = rawurlencode(full_url($_SERVER));
$text = rawurlencode("Course Assembler - It's like an assembly line for your content\n");
$providers = [
	["name"=>"facebook","icon"=>"https://www.vectorlogo.zone/logos/facebook/facebook-tile.svg"],
	["name"=>"linkedin","icon"=>"https://www.vectorlogo.zone/logos/linkedin/linkedin-tile.svg"],
	["name"=>"pinterest","icon"=>"https://www.vectorlogo.zone/logos/pinterest/pinterest-tile.svg"],
	["name"=>"reddit","icon"=>"https://www.vectorlogo.zone/logos/reddit/reddit-tile.svg"],
	["name"=>"twitter","icon"=>"https://www.vectorlogo.zone/logos/twitter/twitter-tile.svg"],
	["name"=>"wordpress","icon"=>"https://www.vectorlogo.zone/logos/wordpress/wordpress-tile.svg"],
];
foreach ($providers as $link) {
	echo "<a href='https://simpleshare.io/go?site={$link['name']}&url={$thisurl}&text={$text}'>",
		"<img src='{$link['icon']}' style='max-width:100%;vertical-align:middle;width:24pt;height:24pt;margin-left:12pt'>",
		"</a>";
}