<?php

// $foo = new Licence()

class Licence extends Controller {

	protected $licencekey;

	public static function unsubscribe() {
		return self::handle_subscribes("unsubscribe");
	}

	// public static function subscribe() {
	// 	return self::handle_subscribes("subscribe");
	// }

	private static function remember($source, $name) {
		$log = new dbRow("log");
		$log->method_name = $name;
		$log->param2 = $source;
		$log->param1 = serialize($_GET);
		$log->param0 = serialize($_POST);
		$log->save();
	}

	private static function handle_subscribes($name = "unknown") {

		// can't parent::requiresPost() because we are a static method, so ...
		if (strtoupper($_SERVER['REQUEST_METHOD']) !== "POST") {
			Response::stop("Method Not Allowed", "text/plain", 405);
		}

		$source = file_get_contents("php://input");

		// log everything we just heard
		self::remember($source,$name);

		switch (Request::get('path')) {
			case "unsubscribe":
				$data = (object)json_decode($source,false);
				$ref = $data->events[0]->data->initialOrderReference; // record generated when licence key was created
				$end = $data->events[0]->data->nextInSeconds; // date of next rebill (up to 12 months away), rather than canceledDateInSeconds which is right now;
				$record = new LicenceModel('reference', $ref);
				if ($record->loaded()) {
					$record->ends = $end;
					$record->save();
				}
				break;

		}

	}


	// does the key exist in the database?
	public static function validate($key) {

		$result = json_decode('{
			"valid": false,
			"home": "/",
			"licence": {
				"tier": 0,
				"seats": 1,
				"remaining": 1,
				"error": "bad-token"
			},
			"code": {
				"minified": true,
				"debug": false
			},
			"api": {
				"bearer": null,
				"publish": "",
				"header": {
					"html": "",
					"css": ""
				}
			},
			"user": {
				"container":"",
				"email":""
			},
			"app": {
				"addons": []
			},
			"hash": ""
		}');

		$debug = ($_SERVER['SERVER_NAME'] === '127.0.0.1');
		if (isset($key)) {
			$hash = $key;
		} else if ($debug) {
			$hash = "debug";
		} else {
			$hash = null;
		}
		$result->hash = $hash;
		if (empty($hash)) return $result;
		if (defined('DEVELOPER') || $debug) { // bypass licencing
			$result->licence->error = "ready";
			$result->valid = true;
			$result->tier = 99;
			$result->user->email = "developer@courseassember.com";
			$result->user->container = "course assembler";
			$result->code->minified = false;
			return $result;
		}
		$record = new LicenceModel('licencekey', $key);
		$validate = new ValidateModel();
		$validate->licencekey = $key;
		$validate->date = time();
		$validate->source = Utils::client_ip();
		if ($record->loaded()) {
			if ($record->ends > 0 && $record->ends < time()) {
				$validate->valid = 0;
				$result->valid = false;
				$result->licence->error = "licence-key-expired";
			} else {
				$validate->valid = 1;
				$result->licence->error = "ready";
				$result->valid = true;
				$result->tier = 99;
				$result->user->email = $record->email;
				$result->user->container = "" . $record->company;
			}
		}
		$validate->save();
		return $result;
	}

	// create a new licence record based on posted data
	public function __construct()  {
		parent::__construct();
		parent::requiresPost();
		// digest auth isn't working so we have to rely on FS internal hash checking
		// $username = parent::requiresAuth();

		// a subscription will post value to generate the licence key, then post the webhook which won't have $_POST values. We can ignore this reqest.
		if (!$_POST) return;

		// this is a hash of all the values of the fields posted in plus a private key ...
		$security_request_hash = Request::post("security_request_hash");
		$security_private_key = Config::get("security_private_key");

		// FS supplied code for validating the request
		ksort($_REQUEST);
		$data = '';
		foreach ($_REQUEST as $key => $val) {
			if ($key !== 'security_request_hash' && $key !== 'path') { $data .= stripslashes($val); }
		}

		if (md5($data . $security_private_key) != $security_request_hash) {
			return;
		}

		$product = Request::post("internalProductName"); // course-assembler, course-engine-10, quizzard-30, builder, etc
		$spl = explode('-',$product);

		 // default to 10 days if product doesn't set it
		$days = (is_numeric(end($spl))) ? array_pop($spl) : 10;
		$end = strtotime("+{$days} days");

		// a subscription is valid until cancelled
		if (Request::get('path') === "subscribe") {
			$end = 0;
		}

		// not really required but prefix the licence with the initials of the product
		// course-assembler-10 => ca; course-assembler-sub => cas
		$id = implode('',array_map(function($v){return $v[0];}, $spl));

		// request security has is already unique for the posted data values - this is the basis of the licence key
		$licence = self::generate_key($id, $security_request_hash);

		// write this model to the database
		$record = new LicenceModel("licencekey", $licence);
		if (!$record->loaded()) {
			$record->email = Request::post("email");
			$record->name = Request::post("name");
			$record->company = Request::post("company");
			$record->product = $product;
			$record->reference = Request::post("reference");
			$record->store = Request::post("referrer");
			$record->testmode = (Request::post("test") === "true") ? 1 : 0;
			$record->starts = time();
			$record->ends = $end;
			$record->licencekey = $licence;
			$record->times = 0;
			$record->save();
		}

		// set the raw licence string
		$this->licencekey = $licence;

	}

	private static function generate_key($id, $hash){
		$key = strtoupper(implode('',[
			$id,
			substr($hash, strlen($id),5-strlen($id)),
			'-',
			substr($hash, 6,5),
			'-',
			substr($hash, 12,5),
			'-',
			substr($hash, 18,5),
			'-',
			substr($hash, 24,5)
		]));
		return $key;
	}

	// public method for accessing the licence key
	public function get() {
		return $this->licencekey;
	}

}