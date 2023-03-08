<?php

/**
 * This is under development. Expect changes!
 * Class Request
 * Abstracts the access to $_GET, $_POST and $_COOKIE, preventing direct access to these super-globals.
 * This makes PHP code quality analyzer tools very happy.
 * @see http://php.net/manual/en/reserved.variables.request.php
 */
class Request
{
    /**
     * Gets/returns the value of a specific key of the POST super-global.
     * When using just Request::post('x') it will return the raw and untouched $_POST['x'], when using it like
     * Request::post('x', true) then it will return a trimmed and stripped $_POST['x'] !
     *
     * @param mixed $key key
     * @param bool $clean marker for optional cleaning of the var
     * @param mixed null or http://php.net/manual/en/filter.filters.sanitize.php
     * @return mixed the key's value or nothing
     */
    public static function post($key, $clean = false, $filter = null, $filteroption = null, $default = null)
    {
        if (isset($_POST[$key])) {
            if ($filter !== null) {
                $value = filter_input(INPUT_POST, $key, $filter, $filteroption);
            } else {
                $value = $_POST[$key];
            }
            return ($clean) ? trim(strip_tags($value)) : $value;
        }
        if (isset($default)) return $default;
    }

    public static function post_debug()
    {
        return print_r($_POST, true);
    }

    /**
     * Returns the state of a checkbox.
     *
     * @param mixed $key key
     * @return mixed state of the checkbox
     */
    public static function postCheckbox($key)
    {
        return isset($_POST[$key]) ? 1 : null;
    }

    /**
     * Returns just the character data in a post as captured by the regular expression
     *
     * @param mixed $key key
     * @param string $method 'post' or 'get'
     */
    public static function regex($key, $expression = "/[^a-z]/i", $method = 'post') {
        $method = strtolower($method);
        $data = self::$method($key); // e.g. self::post() or self::get()
        $data = preg_replace($expression,'',$data);
        return $data;
    }

    /**
     * gets/returns the value of a specific key of the GET super-global
     * @param mixed $key key
     * @param mixed null or http://php.net/manual/en/filter.filters.sanitize.php
     * @return mixed the key's value or nothing
     */
    public static function get($key, $filter = null)
    {
        if (isset($_GET[$key])) {
            if ($filter !== null) {
                return filter_input(INPUT_GET, $key, $filter);
            }
            return $_GET[$key];
        }
    }
    public static function getAny($keys, $filter = null) {
        $result = null;
        foreach ($keys as $key) {
            if (!isset($resut)) $result = self::get($key, $filter);
        }
        return $result;
    }

    public static function exists($key)
    {
        return (isset($_GET[$key]) || isset($_POST[$key]));
    }

    /**
     * gets/returns the value of a specific key of the GET super-global, except it doesn't escape + to space
     * @param mixed $key key
     * @return mixed the key's value or nothing
     */
    public static function real_get($key)
    {
        if (isset($_GET[$key])) {
            $raw = str_replace(' ', '+', $_GET[$key]); // space is supposed to be plus
            return $raw;
        }
    }

    /**
     * gets/returns the value of a specific key of the COOKIE super-global
     * @param mixed $key key
     * @param string $filter php filter type
     * @return mixed the key's value or nothing
     */
    public static function cookie($key, $filter = null)
    {
        if (isset($_COOKIE[$key])) {
            if ($filter !== null) {
                $value = filter_input(INPUT_COOKIE, $key, $filter);
            } else {
                $value = $_COOKIE[$key];
            }
            return $value;
        }
    }

    public static function file($key) {
        if (isset($_FILES[$key])) {
            return $_FILES[$key];
        }
        return false;
    }
}
