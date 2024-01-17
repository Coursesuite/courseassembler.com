<?php

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class Fastspring {

    public function __construct() {
    }

    /* get all subscriptions
    {
        "action": "subscription.getall",
        "result": "success",
        "nextPage": 3,
        "subscriptions": [
            "khyNPLY3TYiQhBfHyjZINg",
            "w46bQ2-gTayzJfFXbV1VWg",
            "86cFjtgCRlSmOPbLcX_mCA",
            "v0yPCSTLSyarVe9NlNalSA",
            "FWhWZ3b6StyfiJ_GnyHswQ",
            "A5xx9TF_R26PcCMdagAC8Q",
            "pgNumDwTSbaLeNY6FtUF3Q",
            "IK2eD1nvSP-L3yilE6K7BQ",
            "iZ8qUO-MSwuezTn_elPb3g",
            "gLspcP3NRqmdOm615HSTig",
            "HYKxh1JfTcyUhTgJxAxfWg",
            "1RkJixj_QKOg_c7G_wGIZA",
            "LiPzVuKnT2Go1WWteQkZtw",
            "V5wXtLilSsWGkMYSiLVy2g",
            "MseNZ_LBRu63R84k9knIKg"
        ]
    }
    */
    public static function GetAllSubscriptions() {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'https://api.fastspring.com/subscriptions', [
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic ' . base64_encode(Config::get('FASTSPRING_USERNAME') . ':' . Config::get('FASTSPRING_PASSWORD')),
            ],
            'http_errors' => false,
        ]);
        return $response->getBody();
    }

    public static function GetSubscription($subscription_id) {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('GET', 'https://api.fastspring.com/subscriptions/' . $subscription_id, [
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic ' . base64_encode(Config::get('FASTSPRING_USERNAME') . ':' . Config::get('FASTSPRING_PASSWORD')),
            ],
            'http_errors' => false,
        ]);
        return $response->getBody();     
    }

    /*
     * for a given subscription_id, cancel the subscription
    {
    "subscriptions": [
        {
        "subscription": "id1",
        "action": "subscription.cancel",
        "result": "success"
        }
    ]
    }
    https://docs.guzzlephp.org/en/latest/request-options.html#http-errors
    */
    public static function CancelSubscription($subscription_id) {
        $client = new \GuzzleHttp\Client();
        $response = $client->request('DELETE', 'https://api.fastspring.com/subscriptions/' . $subscription_id, [
            'headers' => [
                'accept' => 'application/json',
                'authorization' => 'Basic ' . base64_encode(Config::get('FASTSPRING_USERNAME') . ':' . Config::get('FASTSPRING_PASSWORD')),
            ],
            'http_errors' => false,
        ]);
        return $response->getBody();
    }    



}