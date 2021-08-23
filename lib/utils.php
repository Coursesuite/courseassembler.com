<?php
class Utils {
	public function echo($message) {
		echo $message, "\n";
	}

	// 200 ok
	// 403 forbidden
	// 418 nothing meaningful
	// 500 error
	// Die with various statuses and headers
	public static function Stop($code = 200, $message = '', $flush = false, $content_type = 'text/plain') {
		if ($flush) ob_end_flush();
		http_response_code($code);
		header('content-type: ' . $content_type);
		die($message);
	}

	public static function FormatBytes($size, $precision = 2) {
		$base = log(floatval($size)) / log(1024);
		$suffixes = array('', 'k', 'M', 'G', 'T');
		return round(pow(1024, $base - floor($base)), $precision) . $suffixes[floor($base)];
	}

	public static function BlogDot() {
		$style = 'blog-item';
		$root = realpath('./blog/' . date("Y") . '/' . date("m"));
		if (file_exists($root)) {
			$style .= ' has-dot';
		}
		return $style;
	}

}