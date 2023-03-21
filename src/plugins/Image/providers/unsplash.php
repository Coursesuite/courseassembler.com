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

define("APIKEY", "bBNZNwqMhCRn9SdiBDRoISn9oaWGjkwiFt0icqLMRv8");
define("ENDPOINT", "https://api.unsplash.com/search/photos/");

/* ------------- THE REQUEST ---------------- */
$query = Request::get('query');

$download = intval(Request::get('download'),10);
if ($download != 1) $download = 0;
if (empty($query)) $download = 0;

$page = intval(Request::get('page'),10);
if ($page < 1) $page = 1;

$orientation = Request::get('orientation');
if (!in_array($orientation, ["landscape","portrait","squarish"])) $orientation = 'portrait';

$result = '{error:1}';
$code = 204; // no content

/* ------------- THE CALL ---------------- */

if (!empty($query)) {
    $headers = [
        'Authorization: Client-ID ' . APIKEY,
    ];
    $returnHeaders = [];

    $operation = ENDPOINT . '?' . http_build_query([
        'query' => $query,
        'page' => $page,
        'orientation' => $orientation,
    ]);

    if ($download === 1) {
        $operation = ENDPOINT . '/photos/' . $query; //  send the photo id to the query
    }

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_URL, $operation);
    curl_setopt($curl, CURLOPT_HEADERFUNCTION,
        function($ch, $header) use (&$returnHeaders) { // https://stackoverflow.com/a/41135574/1238884
            $len = strlen($header);
            $header = explode(':', $header, 2);
            if (count($header) < 2) // ignore invalid headers
            return $len;

            $returnHeaders[strtolower(trim($header[0]))][] = trim($header[1]);

            // Link: <https://api.unsplash.com/search/photos?page=1&query=office>; rel="first", <https://api.unsplash.com/search/photos?page=1&query=office>; rel="prev", <https://api.unsplash.com/search/photos?page=3&query=office>; rel="last", <https://api.unsplash.com/search/photos?page=3&query=office>; rel="next"
            // Link: <https://api.unsplash.com/search/photos?page=1&query=office>; rel="first",
            // <https://api.unsplash.com/search/photos?page=1&query=office>; rel="prev",
            // <https://api.unsplash.com/search/photos?page=3&query=office>; rel="last",
            // <https://api.unsplash.com/search/photos?page=3&query=office>; rel="next"
            return $len;
        }
    );
	$result = json_decode(curl_exec($curl));
    $code = 200;
	curl_close($curl);

    $log = new dbRow('log');
    $log->method_name = 'unsplash';
    $log->param0 = $operation;
    $log->param1 = $returnHeaders;
    $log->save();

}

/* ------------- THE RESULT ---------------- */

header('content-type: application/json');
http_response_code($code);
die(json_encode($result));