<?php
/*
 * This file replicates noembed except from the server side
 * and adds extra information that you can't normally pull easily, such as video thumbnails
 *
 * The page could be slow at times since it may be hitting and scraping data sources more often than
 * it needs to; caching of some form could be implemented if required (e.g. using url as a hash)
 * but this also occurs at the beginning of the process so initialisation can be a little slow
 *
 */

require_once('../../vendor/autoload.php');

define('YOUTUBE_APIKEY', 'AIzaSyA_Mcas04kp8LcWBQwduFsrAPuJ-WCwIwg'); // AIzaSyDYwPzLevXauI-kTSVXTLroLyHEONuF9Rw
define('OEMBED_SERVICE', 'https://noembed.com/embed?url=');

// define('MAILCHIMP_API_KEY', '0803286b6f9c681c80d7ad751d6beec3-us11');
// define('CLOUDCONVERT_API_KEY', '8pxT0DHRE5lpcVzildrPoEbztL9rc5Es89xG0incUfPNB93LLZueEr7zTK7PTuZmcV1hXkRMITbhjS-U1NnnzQ');

header("Content-Type: application/json");

$url = Request::get("url");
$data = new stdClass();
$data->error = "Unsupported provider";
$options = JSON_PRETTY_PRINT;

/*
 *	Use URL matching to filter to the services we are supporting
 *
 * 	Most oEmbed providers already normalise the urls their-end, so just send in the raw value
 */

if (strpos($url, "soundcloud") !== false) {

	$data = oEmbed($url);
	$data->type = "soundcloud";
	$data->duration = 0; // can't get it
    $data->storyboard = []; // unsupported
	unset($data->error);

} else if (strpos($url, "youtu") !== false) {

	// if you choose privacy enhanced youtube mode it changes to this other domain, which most oEmbed providers don't support
	$url = str_replace("youtube-nocookie", "youtube", $url);
	$data = oEmbed($url);
	$data->type = "youtube";
	unset($data->error);

	// https://stackoverflow.com/questions/3392993/php-regex-to-get-youtube-video-id
	// parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
	// echo $my_array_of_vars['v'];
	// $data->media_id = str_replace("\/hqdefault.jpg", "", str_replace("https:\/\/i.ytimg.com\/vi\/","", $data->thumbnail_url));

	preg_match("/^(?:http(?:s)?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'>]+)/", $url, $matches);
	if (count($matches)>0) {
		$data->video_id = $matches[1];

		$ytdata = YoutubeVideoInfo($data->video_id);
		$data->duration = ConvertYouTubeDuration($ytdata->items[0]->contentDetails->duration);
		$data->description = $ytdata->items[0]->snippet->description;
        $data->storyboard = $ytdata->storyboards;
	}

} else if (strpos($url, "vimeo") !== false) {

	$data = oEmbed($url);
	$data->type = "vimeo";
    $data->storyboard = VimeoScrapeStoryboards($data->video_id);
	unset($data->error);

}

echo json_encode($data, $options);



/*
 * perform OEmbed, normalise the return fields to just those we care about
 */
function oEmbed($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, OEMBED_SERVICE . $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 2);
    $response = curl_exec($ch);
    curl_close($ch);
    $json = json_decode($response);
    $fields = ['description','duration','height','width','thumbnail_url','title','url','html','video_id'];
    foreach ($json as $key => $value) {
    	if (!in_array($key, $fields)) {
    		unset($json->$key);
    	}
    }
    $json->uuid = md5($json->url);
    // notably missing from YouTube - the video Description and Duration
    return $json;
}

/*
 * use the youtube data api to find out extra details about the video that oembed won't provide
 */
function YoutubeVideoInfo($video_id) {
    $url = 'https://www.googleapis.com/youtube/v3/videos?id='.$video_id.'&key='.YOUTUBE_APIKEY.'&part=snippet,contentDetails';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    $response = curl_exec($ch);
    curl_close($ch);
    $json = json_decode($response);
    $json->storyboards = YoutubeScrapeStoryboards($video_id);
    return $json;
}

/*
 * convert youtube time format to seconds (which is a standard format, thankfully)
 */
function ConvertYouTubeDuration($inp) {
	$interval = new DateInterval($inp); // e.g. PT2M45S
	return $interval->h * 3600 + $interval->i * 60 + $interval->s;
}

/*
 * The YouTube API doesn't expose the storyboard images for some reason
 * so we have to go to the youtube page and scrape for the player config json
 *
 * this function might break if youtube change their player config format or ytplayer script
 * this routine could nearly replace the googleapis call except it doesn't contain the video description!
 */
function YoutubeScrapeStoryboards($video_id) {
    $storyboard = [];

    $page = file_get_contents("https://www.youtube.com/watch?v={$video_id}");

    $dom = new IvoPetkov\HTML5DOMDocument();
    $dom->loadHTML($page);

    $scripts = $dom->querySelectorAll("script");
    foreach ($scripts as $script) {
        $code = $script->innerHTML;
        if (strpos($code, "ytplayer.config = {") !== false) {
            $code = str_replace("var ytplayer = ytplayer || {};ytplayer.config = ","", $code);
            $json = json_decode(substr($code, 0, strpos($code,";ytplayer.load = function()")))->args;

            $duration = intval($json->length_seconds);
            $storyboard = $json->storyboard_spec;

            $urls = [];

            // this looks like
            // https://i9.ytimg.com/sb/iSFn_kgvwso/storyboard3_L$L/$N.jpg|48#27#100#10#10#0#default#rs$AOn4CLBShkq2tG_pfbFSOc9GKRTJwHop0g|80#45#69#10#10#2000#M$M#rs$AOn4CLA3XgMmeDqqC7KtGdTOnS1O2g3MXQ|160#90#69#5#5#2000#M$M#rs$AOn4CLALznaRipjUAScMDRd1YMrhRAEaXQ

            // and we want it to look like
            // https://i9.ytimg.com/sb/iSFn_kgvwso/storyboard3_L2/M0.jpg?sigh=rs$AOn4CLALznaRipjUAScMDRd1YMrhRAEaXQ

            $b = explode('|', $storyboard);
            $base = explode('$', $b[0])[0] . '2/M';
            $c = explode('#', $b[3]);
            $sigh = end($c);

            // there are 5 sheets for videos less than 20 minutes, otherwise a new sheet for every 4 minutes
            $n = ($duration < (60 * 20)) ? 5 : ($duration / (60 * 4));

            // grab the urls that exist
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_HEADER,         true);
            curl_setopt($ch, CURLOPT_NOBODY,         true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT,        10);
            for ($i = 0; $i < $n; $i++) {
                $sburl = "{$base}{$i}.jpg?sigh={$sigh}";
                curl_setopt($ch, CURLOPT_URL,            $sburl);
                curl_exec($ch); // don't care about response
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                if($httpCode > 199 && $httpCode < 300) { // e.g. 200 OK
                    $urls[] = $sburl;
                }
            }
            curl_close($ch);

            // we could just send in the raw storyboards and let clientside deal with it ... but no
            // for ($i = 0; $i < $n; $i++) {
            //     $sburl = "{$base}{$i}.jpg?sigh={$sigh}";
            //     $data = @file_get_contents($sburl); // skip errors, i.e. 404
            //     if ($data !== false) {
            //         $storyboards[] = [
            //             "data" => "data:image/jpg;base64," . base64_encode($data),
            //             "width" => 800,
            //             "height" => 360,
            //             "columns" => 5,
            //             "rows" => 4,
            //         ];
            //     }
            // }

            // append all images one under another to form one large image
            $count = count($urls);
            $height = $count * 360;
            $final = imagecreatetruecolor(800,$height);
            for ($i = 0; $i < $count; $i++) {
                $top = $i * 360;
                $src = imagecreatefromjpeg($urls[$i]);
                imagecopy($final, $src, 0, $top, 0,0, 800, 360);
                imagedestroy($src);
            }
            ob_start();
            imagejpeg( $final, NULL, 100 );
            imagedestroy( $final );
            $data = ob_get_clean();
            $storyboard = [
                "data" => "data:image/jpeg;base64," . base64_encode($data),
                "width" => 800,
                "height" => $height,
                "columns" => 5,
                "rows" => 4 * $count,
            ];

        }
    }
    return $storyboard;
}

/*
 * Vimeo storyboards are hidden inside a second config file that is called from javascript when their player load
 * we need to first capture where that script is loading from, parse that, then grab the correct property
 *
 * if vimeo change their page code structure, this routine coudld break.
 */
function VimeoScrapeStoryboards($video_id) {
    $storyboard = [];

    $page = file_get_contents("https://vimeo.com/{$video_id}");

    $dom = new IvoPetkov\HTML5DOMDocument();
    $dom->loadHTML($page);

    $scripts = $dom->querySelectorAll("script");
    foreach ($scripts as $script) {
        $code = $script->innerHTML;
        if (strpos($code, "window.vimeo.clip_page_config.player = ") !== false) {
            $code = substr($code, strpos($code, "window.vimeo.clip_page_config.player = ") + 39);
            $json = json_decode(trim(substr($code, 0, strpos($code, "}};") + 2))); // first occurrence of end of string
            $config = json_decode(file_get_contents($json->config_url)); // grab the player config file
            $board = $config->request->thumb_preview;

            // file_get_contents doesn't send a browser type, so you get the generic format JPG instead of webp/etc
            // you can see this by looking at the first bytes of bin2hex(result) to see the bytes start with FFD8FF, see https://en.wikipedia.org/wiki/List_of_file_signatures
            // vimeo only cache the storyboard image for a short time, so you have to grab the image now
            $storyboard = [
                "data" => "data:image/jpg;base64," . base64_encode(file_get_contents($board->url)),
                "width" => $board->width,
                "height" => $board->height,
                "columns" => $board->columns,
                "rows" => ($board->height / $board->frame_height),
            ];

        }
    }
    return $storyboard;
}