<?php

class Controller {

	protected $Method;
	protected $Ajax = false;

	public function __construct() {
		$this->Ajax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
		$this->Method = strtoupper($_SERVER['REQUEST_METHOD']);
	}

    public function requiresAuth($key = null) {
        $digest = new \Rakshazi\Digestauth;
        $valid = $digest->setUsers(Config::get('DIGEST_USERS'))->setRealm("courseassembler")->enable();
        if (!$valid) {
            header('HTTP/1.1 401 Unauthorized');
            die("Digest Authentication Failed");
        }
        return $digest->user;
    }

   public function allowCORS() {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-Requested-With");
        if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
                header("Access-Control-Allow-Methods: POST, OPTIONS");
            if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
                header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
            exit(0);
        }
    }

    public function requiresAjax() {
        if ($this->Ajax === true) {
            return; // all good
        }
        header('HTTP/1.1 405 Method Not Allowed');
        die("Method Not Allowed " . $this->Method);
    }

    public function requiresPost() {
        if ($this->Method === "POST") {
            return true;
        }
        header('HTTP/1.1 405 Method Not Allowed');
        die("Method Not Allowed " . $this->Method);
    }

    public function requiresGet() {
        if ($this->Method === "GET") {
            return true;
        }
        header('HTTP/1.1 405 Method Not Allowed');
        die("Method Not Allowed " . $this->Method);
    }

}