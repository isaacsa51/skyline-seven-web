<?php defined('BASEPATH') OR exit('No direct script access allowed');

if (!function_exists('output')) {
    function output($elements, $status) {
        $CI =& get_instance();
        $CI->output->set_content_type('application/json',UTF8)->set_status_header($status)->set_output(json_encode($elements));
    }
}