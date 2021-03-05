<?php

// $foo = new Licence()

class Licence extends Controller {

	protected $licencekey;

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
			}
		}');
		$record = new LicenceModel('licencekey', $key);
		if ($record->loaded()) {
			if ($record->ends < time()) {
				$result->valid = false;
				$result->licence->error = "licence-key-expired";
			} else {
				$result->licence->error = "ready";
				$result->valid = true;
				$result->tier = 99;
				$result->user->email = $record->email;
				$result->user->container = "" . $record->company;
			}
		}
		return $result;
	}

	// create a new licence record based on posted data
	public function __construct()  {
		parent::__construct();
		parent::requiresPost();
		// digest auth isn't working so we have to rely on FS internal hash checking
		// $username = parent::requiresAuth();

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

		$product = Request::post("internalProductName"); // course-assembler, course-engine-10, quizzard-30, builder

		$spl = explode('-',$product);
		$days = (is_numeric(end($spl))) ? array_pop($spl) : 10; // default to 10 days if product doesn't set it
		$id = implode('',array_map(function($v){return $v[0];}, $spl));

		// request security has is already unique for the posted data values - this is the basis of the licence key
		$licence = strtoupper(implode('',[
			$id,
			substr($security_request_hash, strlen($id),5-strlen($id)),
			'-',
			substr($security_request_hash, 6,5),
			'-',
			substr($security_request_hash, 12,5),
			'-',
			substr($security_request_hash, 18,5),
			'-',
			substr($security_request_hash, 24,5)
		]));

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
			$record->ends = strtotime("+{$days} days");
			$record->licencekey = $licence;
			$record->save();
		}

		// set the raw licence string
		$this->licencekey = $licence;

	}

	// public method for accessing the licence key
	public function get() {
		return $this->licencekey;
	}

}