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

	public static function TimestampToDate($value, $showtime = false) {
		$date = new \DateTime();
		$date->setTimeStamp($value);
		$date->setTimeZone(new \DateTimeZone('UTC'));
		$fmt = 'jS M Y' . ($showtime ? ' H:i:s' : '');
		return $date->format($fmt);
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

	public static function curl_get_contents($url, $data = [], $method = 'POST') {
		$ch = curl_init();
		$referer = $_SERVER['REQUEST_SCHEME'] ?? 'http' . '://' . $_SERVER['SERVER_NAME'];
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_URL, $url);
		if ($method === 'POST') curl_setopt($ch, CURLOPT_POST, 1);
		if (!empty($data)) curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
		curl_setopt($ch, CURLOPT_REFERER, $referer);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		// curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3000); // 3 sec.
		// curl_setopt($ch, CURLOPT_TIMEOUT, 10000); // 10 sec.
		$result = json_decode(curl_exec($ch)); // '' === null
		curl_close($ch);
		if ($result == (new stdClass())) $result = null;
		return $result;
	}

	public static function client_ip() {
		return isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);
	}

}