<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuarios extends CI_Controller 
{
    private $rules;

	public function __construct(){
        parent::__construct();
        $this->load->model('Usuario_model');
        $this->load->library(['form_validation']);
    }

    public function index(){
        validateAdminUser();

        $this->load->view('admin/Usuarios');
    }

    private function setRules(){
        $this->rules = [
            [
                'field' => 'nombre',
                'label' => 'nombre',
                'rules' => 'required|min_length[5]|max_length[30]',
                'errors' => [
                    'required' => '*Campo requerido',
                    'min_length' => '*Minimo 5 carácteres',
                    'max_length' => '*Máximo 30 carácteres'
                ],
            ],
            [
                'field' => 'password',
                'label' => 'password',
                'rules' => 'required|min_length[5]|max_length[30]',
                'errors' => [
                    'required' => '*Campo requerido',
                    'min_length' => '*Minimo 5 carácteres',
                    'max_length' => '*Máximo 30 carácteres'
                ],
            ],
            [
                'field' => 'confirm_password',
                'label' => 'confirm_password',
                'rules' => 'matches[password]',
                'errors' => [
                    'matches' => '*Las contraseñas no coinciden'
                ],
            ],
            [
                'field' => 'perfil',
                'label' => 'perfil',
                'rules' => 'greater_than[0]',
                'errors' => [
                    'greater_than' => '*Campo requerido'
                ],
            ]
        ];     
    }

    public function get(){
        $searchQuery = array('user' => $this->input->POST('nombre'));
        $data = $this->Usuario_model->get($searchQuery, $this->input->POST('desde'), $this->input->POST('limite'));
        echo json_encode($data);
    }

    public function post(){
        $this->form_validation->set_error_delimiters('', '');
        $this->setRules();

        $rules = $this->rules;

        $this->form_validation->set_rules($rules);

        if ($this->form_validation->run()){
            if(count($this->Usuario_model->getWhere(['user' => $this->input->POST('nombre')]))){
                echo json_encode([
                    'invalid' => ['nombre' => '*El usuario ya existe']
                ]);
                return;
            }

            $data = [
                'user' => $this->input->POST('nombre'),
                'password' => md5($this->input->POST('password')),
                'perfil_id' => $this->input->POST('perfil'),
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
                'created_by' => $this->session->userdata('id'),
                'modified_by' => $this->session->userdata('id')
            ];

            echo $this->Usuario_model->save($data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function update(){
        $this->form_validation->set_error_delimiters('', '');
        $this->setRules();

        $rules = [
            $this->rules[0],
            $this->rules[3]
        ];   

        $this->form_validation->set_rules($rules);

        if ($this->form_validation->run()){
            if(count($this->Usuario_model->getWhere(['user' => $this->input->POST('nombre'), 'id !=' => $this->input->POST('id')]))){
                echo json_encode([
                    'invalid' => ['nombre' => '*El usuario ya existe']
                ]);
                return;
            }

            $data = [
                'user' => $this->input->POST('nombre'),
                'perfil_id' => $this->input->POST('perfil'),
                'modified' => date('Y-m-d H:i:s'),
                'modified_by' => $this->session->userdata('id')
            ];

            $where = [
                'id' => $this->input->POST('id')
            ];

            echo $this->Usuario_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function restPassword(){
        $this->form_validation->set_error_delimiters('', '');
        $this->setRules();

        $rules = [
            $this->rules[1],
            $this->rules[2],
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

            echo $this->Usuario_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function updateStatus(){
        $data = [ 
            'status' => $this->input->POST('status'),
            'modified' => date('Y-m-d H:i:s'),
            'modified_by' => $this->session->userdata('id')
        ];
        $where = [ 'id' => $this->input->POST('id') ];

        echo $this->Usuario_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
    }

    public function delete(){
        $this->Usuario_model->delete($this->input->POST('id') );
    }

}