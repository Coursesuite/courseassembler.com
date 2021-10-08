<?php

class Config {

    public static function get($key) {
        $a = array(
            'URL' => (isset($_SERVER['HTTPS']) ? 'https://' : 'http://') . $_SERVER['HTTP_HOST'] . str_replace('public', '', dirname($_SERVER['SCRIPT_NAME'])),

            'DB_TYPE' => 'mysql',
            'DB_HOST' => '127.0.0.1',
            'DB_NAME' => 'ca_licence',
            'DB_USER' => getenv("DB_USER"),
            'DB_PASS' => getenv("DB_PASS"),
            'DB_PORT' => '3306',
            'DB_CHARSET' => 'utf8',

            'DIGEST_USERS' => array(
                'tokenuser' => 'GEv6mJ7wJgWR',
                'fastspring' => 'e93NcNdpntFq',
            ),

            'debug' => true,
            'security_private_key' => '60a25bde18b15bd53941c664aa5b1e7f',

        )[$key];
        return $a;
    }

}
