<?php

class Response
{
    public static function stop($message, $type = 'application/json', $status = 200) {
        header('Content-Type: ' . $type);
        header('HTTP/1.1 ' . $status . ' ' . $message);
        exit;
    }

    public static function json($data, $status = 200) {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data);
        exit;
    }

    public static function html($data, $status = 200) {
        header('Content-Type: text/html');
        http_response_code($status);
        echo $data;
        exit;
    }

    public static function text($data, $status = 200) {
        header('Content-Type: text/plain');
        http_response_code($status);
        echo $data;
        exit;
    }

    public static function redirect($url, $status = 302) {
        header('Location: ' . $url);
        header('HTTP/1.1 ' . $status . ' ' . $url);
        exit;
    }
    
}