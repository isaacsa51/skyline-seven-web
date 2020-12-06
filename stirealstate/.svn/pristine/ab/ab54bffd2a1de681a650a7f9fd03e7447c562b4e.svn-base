<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Gerentes extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model('Asociado_model');
        $this->load->library(['form_validation']);
        $this->load->helper(['rules']);
    }

    private $rules;
    

    public function index(){
        validateAdminUser();

        $this->load->view('admin/Gerentes_view');
    }

    public function get(){
        $searchQuery = array('nombre' => $this->input->POST('nombre'));
        $where = [ 'nivel' => NIVEL_GERENTE ];
        $data = $this->Asociado_model->get($searchQuery, $this->input->POST('desde'), $this->input->POST('limite'), $where);
        echo json_encode($data);
    }

    public function addGerente(){
        $this->form_validation->set_error_delimiters('', '');

        $this->rules = getRulesAsociados();
        $this->form_validation->set_rules($this->rules);

        if ($this->form_validation->run()){
            if(count($this->Asociado_model->getWhere(['num_asociado' => $this->input->POST('num_asociado')]))){
                echo json_encode([ 'invalid' => ['num_asociado' => '*El No. de asociado ya fue registrado'] ]);
                return;
            }
            if(count($this->Asociado_model->getWhere(['email' => $this->input->POST('email')]))){
                echo json_encode([ 'invalid' => ['email' => '*El email ya fue registrado'] ]);
                return;
            }

            $data = [
                'nombre' => $this->input->POST('nombre'),
                'apellido' => $this->input->POST('apellido'),
                'num_asociado' => $this->input->POST('num_asociado'),
                'email' => $this->input->POST('email'),
                'password' => md5($this->input->POST('password')),
                'num_tienda' => $this->input->POST('num_tienda'),
                'nivel' => NIVEL_GERENTE,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
                'created_by' => $this->session->userdata('id'),
                'modified_by' => $this->session->userdata('id')
            ];

            echo $this->Asociado_model->save($data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function updateGerente(){
        $this->form_validation->set_error_delimiters('', '');

        $this->rules = getRulesAsociados();
        $rules = [
            $this->rules[0],
            $this->rules[1],
            $this->rules[2],
            $this->rules[3],
            $this->rules[4]
        ];   

        $this->form_validation->set_rules($rules);

        if ($this->form_validation->run()){
            $where = ['num_asociado' => $this->input->POST('num_asociado'), 'id !=' => $this->input->POST('id') ];
            if(count($this->Asociado_model->getWhere($where))){
                echo json_encode([ 'invalid' => ['num_asociado' => '*El No. de asociado ya fue registrado'] ]);
                return;
            }
            $where = ['email' => $this->input->POST('email'), 'id !=' => $this->input->POST('id') ];
            if(count($this->Asociado_model->getWhere($where))){
                echo json_encode([ 'invalid' => ['email' => '*El email ya fue registrado'] ]);
                return;
            }

            $data = [
                'nombre' => $this->input->POST('nombre'),
                'apellido' => $this->input->POST('apellido'),
                'num_asociado' => $this->input->POST('num_asociado'),
                'email' => $this->input->POST('email'),
                'num_tienda' => $this->input->POST('num_tienda'),
                'modified' => date('Y-m-d H:i:s'),
                'modified_by' => $this->session->userdata('id')
            ];

            $where = [
                'id' => $this->input->POST('id')
            ];

            echo $this->Asociado_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function restPassword(){
        $this->form_validation->set_error_delimiters('', '');

        $this->rules = getRulesAsociados();
        $rules = [
            $this->rules[5],
            $this->rules[6],
        ];   

        $this->form_validation->set_rules($rules);

        if ($this->form_validation->run()){
            $data = [
                'password' => md5($this->input->POST('password')),
                'modified' => date('Y-m-d H:i:s'),
                'modified_by' => $this->session->userdata('id')
            ];

            $where = [
                'id' => $this->input->POST('id')
            ];

            echo $this->Asociado_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function deleteGerente(){
        $this->Asociado_model->delete($this->input->POST('id') );
    }

    public function updateStatus(){
        $data = [ 
            'status' => $this->input->POST('status'),
            'modified' => date('Y-m-d H:i:s'),
            'modified_by' => $this->session->userdata('id')
        ];
        $where = [ 'id' => $this->input->POST('id') ];

        echo $this->Asociado_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
    }


}