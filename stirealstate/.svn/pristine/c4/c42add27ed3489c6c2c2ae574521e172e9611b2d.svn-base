<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class WebApp extends CI_Controller 
{
	public function __construct(){
        parent::__construct();
    }

    
    public function login(){
        if($this->session->userdata('userAsociado'))	
        return redirect(base_url());
        
        $this->load->view('web_app/login_view');
    }
    
    public function home(){
        validateAsociadoUser();
        echo '<h1>Home</h1>';
    }
    
    public function formulario(){
        validateAsociadoUser();
            
        $this->load->view('web_app/formulario_view');
    }

    public function perfil(){
        //validateAsociadoUser();
            
        $this->load->view('web_app/perfil_view');
    }

}