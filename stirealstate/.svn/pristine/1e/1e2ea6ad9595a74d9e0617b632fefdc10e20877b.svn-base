<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Solicitudes extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model('Solicitud_model');
    }

    public function index(){
        validateAdminUser();
        $this->load->view('admin/Solicitudes_view');
    }

    public function get(){
        $data = $this->Solicitud_model->get($this->input->POST('desde'), $this->input->POST('limite'));
        echo json_encode($data);
    }

    public function newRequest(){
        validateAsociadoUser();

        $data = [
            'estatus_id' => 1, // incompleto
            'asociado_id' => $this->session->userdata('userAsociado')['id'],
            'tipo_solicitud' => $this->input->POST('type_request'),
            'created' => date('Y-m-d H:i:s'),
            'modified' => date('Y-m-d H:i:s'),
        ];

        echo $this->Solicitud_model->save($data);

        redirect(base_url());
    }



}