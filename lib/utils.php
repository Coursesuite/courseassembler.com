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
		// if (!is_null($unlink) && file_exists($unlink)) @unlink($unlink);
		die($message);
	}

	public static function TimestampToDate($value, $showtime = false) {
		$date = new \DateTime();
		$date->setTimeStamp($value);
		$date->setTimeZone(new \DateTimeZone('UTC'));
		$fmt = 'jS M Y' . ($showtime ? ' H:i:s' : '');
		return $date->format($fmt);
	}

    // print a date in a human readable format, where year is not shown if it is the current year, hours are not shown if it is midnight, etc
    public static function HumanDate($date, $showtime = false) {
        $date = new \DateTime($date);
        $now = new \DateTime();
        $diff = $now->diff($date);
        $fmt = 'jS M' . ($date->format('Y') != $now->format('Y') ? ' Y' : '') . ($showtime ? ' H:i:s' : '');
        if ($diff->days > 0) {
            return $date->format($fmt);
        } else {
            $hours = $diff->h + ($diff->days * 24);
            if ($hours > 0) {
                return $hours . ' hour' . ($hours > 1 ? 's' : '') . ' ago';
            } else {
                $mins = $diff->i + ($hours * 60);
                if ($mins > 0) {
                    return $mins . ' minute' . ($mins > 1 ? 's' : '') . ' ago';
                } else {
                    return 'just now';
                }
            }
        }
    }


	public static function FormatBytes($size, $precision = 2) {
		$base = log(floatval($size)) / log(1024);
		$suffixes = array('b', 'k', 'M', 'G', 'T');
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

	
	// sort function used by directoryiterator - sort by file->ctime()
	public static function dSort($a, $b) {
		$col = 2; // 0=name, 1=size, 2=timestamp
		$x = $b[$col]; // x = b if decending order
		$y = $a[$col]; // y = b if ascending order
		if (strcmp($x,$y) < 0) return -1;
		elseif (strcmp($x,$y) > 0) return 1;
		else return 0;
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
    // PHP implementation of Processing's map function
    // http://processing.org/reference/map_.html
    public static function map($value, $vMin, $vMax, $dMin, $dMax)
    {
        $vValue = floatval($value);
        $vRange = $vMax - $vMin;
        $dRange = $dMax - $dMin;
        return ($vValue - $vMin) * $dRange / $vRange + $dMin;
    }

    // Color Functions
    public static function hexToHSL($color)
    {
        $color = trim($color, '#');
        $R = hexdec($color[0].$color[1]);
        $G = hexdec($color[2].$color[3]);
        $B = hexdec($color[4].$color[5]);

        $HSL = array();

        $var_R = ($R / 255);
        $var_G = ($G / 255);
        $var_B = ($B / 255);

        $var_Min = min($var_R, $var_G, $var_B);
        $var_Max = max($var_R, $var_G, $var_B);
        $del_Max = $var_Max - $var_Min;

        $L = ($var_Max + $var_Min)/2;

        if ($del_Max == 0)
        {
            $H = 0;
            $S = 0;
        }
        else
        {
            if ( $L < 0.5 ) $S = $del_Max / ( $var_Max + $var_Min );
            else            $S = $del_Max / ( 2 - $var_Max - $var_Min );

            $del_R = ( ( ( $var_Max - $var_R ) / 6 ) + ( $del_Max / 2 ) ) / $del_Max;
            $del_G = ( ( ( $var_Max - $var_G ) / 6 ) + ( $del_Max / 2 ) ) / $del_Max;
            $del_B = ( ( ( $var_Max - $var_B ) / 6 ) + ( $del_Max / 2 ) ) / $del_Max;

            if      ($var_R == $var_Max) $H = $del_B - $del_G;
            else if ($var_G == $var_Max) $H = ( 1 / 3 ) + $del_R - $del_B;
            else if ($var_B == $var_Max) $H = ( 2 / 3 ) + $del_G - $del_R;

            if ($H<0) $H++;
            if ($H>1) $H--;
        }

        $HSL['h'] = ($H*360);
        $HSL['s'] = $S;
        $HSL['l'] = $L;

        return $HSL;
    }

    public static function hexToRGB($hex) {
        $hex = str_replace("#", "", $hex);
        if(strlen($hex) == 3) {
            $r = hexdec(substr($hex,0,1).substr($hex,0,1));
            $g = hexdec(substr($hex,1,1).substr($hex,1,1));
            $b = hexdec(substr($hex,2,1).substr($hex,2,1));
        } else {
            $r = hexdec(substr($hex,0,2));
            $g = hexdec(substr($hex,2,2));
            $b = hexdec(substr($hex,4,2));
        }
        return ['r' => $r, 'g' => $g, 'b' => $b];
    }

    public static function rgbToHSL($r, $g, $b) {
        $r /= 255;
        $g /= 255;
        $b /= 255;
        $max = max($r, $g, $b);
        $min = min($r, $g, $b);
        $l = ($max + $min) / 2;
        if ($max == $min) {
            $h = $s = 0;
        } else {
            $d = $max - $min;
            $s = $l > 0.5 ? $d / (2 - $max - $min) : $d / ($max + $min);
            switch ($max) {
                case $r:
                    $h = ($g - $b) / $d + ($g < $b ? 6 : 0);
                    break;
                case $g:
                    $h = ($b - $r) / $d + 2;
                    break;
                case $b:
                    $h = ($r - $g) / $d + 4;
                    break;
            }
            $h /= 6;
        }
        $h = floor($h * 360);
        $s = floor($s * 100);
        $l = floor($l * 100);
        return ['h' => $h, 's' => $s, 'l' => $l];
    }

    public static function hslToRGB ($h, $s, $l) {
        $h += 360;
        $c = ( 1 - abs( 2 * $l - 1 ) ) * $s;
        $x = $c * ( 1 - abs( fmod( ( $h / 60 ), 2 ) - 1 ) );
        $m = $l - ( $c / 2 );

        if ( $h < 60 ) {
            $r = $c;
            $g = $x;
            $b = 0;
        } else if ( $h < 120 ) {
            $r = $x;
            $g = $c;
            $b = 0;
        } else if ( $h < 180 ) {
            $r = 0;
            $g = $c;
            $b = $x;
        } else if ( $h < 240 ) {
            $r = 0;
            $g = $x;
            $b = $c;
        } else if ( $h < 300 ) {
            $r = $x;
            $g = 0;
            $b = $c;
        } else {
            $r = $c;
            $g = 0;
            $b = $x;
        }

        $r = ( $r + $m ) * 255;
        $g = ( $g + $m ) * 255;
        $b = ( $b + $m  ) * 255;

        return array( 'r' => floor( $r ), 'g' => floor( $g ), 'b' => floor( $b ) );

    }

    //NOT USED
    public static function rgbToHex($r, $g, $b) {
        $hex = "#";
        $hex .= str_pad(dechex($r), 2, "0", STR_PAD_LEFT);
        $hex .= str_pad(dechex($g), 2, "0", STR_PAD_LEFT);
        $hex .= str_pad(dechex($b), 2, "0", STR_PAD_LEFT);
        return $hex;
    }

    public static function formatName($name) {
        $name = str_replace('_', ' ', $name);
        $name = ucwords($name);
        return $name;
    }

}