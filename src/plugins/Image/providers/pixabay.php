<?php

putenv("DB_USER=root");
putenv("DB_PASS=root");

// this just finds where the autoloader is
$fold = __DIR__; $path = ""; $exit = false;
do {
	$fold = dirname($fold);
	if (file_exists($path."vendor") || $fold === "/") {
		$exit = true;
	} else {
		$path .= "../";
	}
} while ($exit === false);
require_once($path . 'vendor/autoload.php');

define("APIKEY", "34599051-daf48f1800690e9298d364142");
define("ENDPOINT", "https://pixabay.com/api/");

/* ------------- THE REQUEST ---------------- */
$query = Request::get('q');

$page = intval(Request::get('page'),10);
if ($page < 1) $page = 1;

$type = Request::get('image_type');
if (!in_array($type, ["photo","ilustration","vector"])) $type = 'photo';

$orientation = Request::get('orientation');
if (!in_array($orientation, ["horizontal","vertical","all"])) $orientation = 'vertical';

$result = '{error:1}';
$code = 204; // no content

/* ------------- THE CALL ---------------- */
// https://pixabay.com/api/docs/

if (!empty($query)) {
    $returnHeaders = [];

    $operation = ENDPOINT . '?' . http_build_query([
        'key' => APIKEY,
        'q' => $query,
        'type' => $type,
        'page' => $page,
        'orientation' => $orientation,
    ]);

	$curl = curl_init();
	// curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_URL, $operation);
    curl_setopt($curl, CURLOPT_HEADERFUNCTION,
        function($ch, $header) use (&$returnHeaders) { // https://stackoverflow.com/a/41135574/1238884
            $len = strlen($header);
            $header = explode(':', $header, 2);
            if (count($header) < 2) // ignore invalid headers
            return $len;

            $returnHeaders[strtolower(trim($header[0]))][] = trim($header[1]);
            
            return $len;
        }
    );
	$result = json_decode(curl_exec($curl));
    $code = 200;
	curl_close($curl);

    $log = new dbRow('log');
    $log->method_name = 'pixabay';
    $log->param0 = $operation;
    $log->param1 = $returnHeaders;
    $log->save();

}

/* ------------- THE RESULT ---------------- */

header('content-type: application/json');
http_response_code($code);
die(json_encode($result));