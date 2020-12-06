<?php defined('BASEPATH') OR exit('No direct script access allowed');

function validateAdminUser(){
    $CI =& get_instance();
    $menuDisponible = $CI->session->userdata('menuDisponible');
    $uriActual = $CI->uri->segment('2') ? $CI->uri->segment('1').'/'.$CI->uri->segment('2') : $CI->uri->segment('1');

    if(strpos($menuDisponible, $uriActual) === false || !$CI->session->userdata('user')){
        redirect(base_url('admin/login'));
    }
}

function validateAsociadoUser(){
    $CI =& get_instance();

    if(!$CI->session->userdata('userAsociado')){
        redirect(base_url('login'));
    }
}