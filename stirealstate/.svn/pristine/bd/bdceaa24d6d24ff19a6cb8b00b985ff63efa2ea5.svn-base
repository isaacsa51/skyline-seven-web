<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Asociados extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model('Asociado_model');
        $this->load->library(['form_validation']);
        $this->load->helper(['rules']);
    }

    public function index(){
        validateAdminUser();

        $this->load->view('admin/Asociados_view');
    }

    public function get(){
        $searchQuery = array('nombre' => $this->input->POST('nombre'));
        $data = $this->Asociado_model->get($searchQuery, $this->input->POST('desde'), $this->input->POST('limite'));
        echo json_encode($data);
    }

    public function addAsociado(){
        $this->form_validation->set_error_delimiters('', '');

        $this->rules = getRulesAsociados();
        $rules = [
            $this->rules[0],
            $this->rules[1],
            $this->rules[2],
            $this->rules[4],
            $this->rules[5],
            $this->rules[6],
        ];

        $this->form_validation->set_rules($rules);

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
                'nivel' => NIVEL_CORPORATIVO,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ];

            echo $this->Asociado_model->save($data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function login(){
		$this->form_validation->set_error_delimiters('', '');
	    
        $rules = [
			[
				'field' => 'user',
				'label' => 'user',
				'rules' => 'required',
				'errors' => [
					'required' => '',
				],
			],
			[
				'field' => 'pass',
				'label' => 'pass',
				'rules' => 'required|min_length[5]|max_length[30]',
				'errors' => [
					'required' => '',
					'min_length' => '',
					'max_length' => ''
				],
			]
		];

		$this->form_validation->set_rules($rules);

        if ($this->form_validation->run()){
            $where = [ 'password' => md5($this->input->POST('pass')), 'status' => 1 ];
            $orWhere = '(num_asociado = "'.$this->input->POST('user').'" or email = "'.$this->input->POST('user').'")';
            $orWhere2 = '(nivel = '.NIVEL_GERENTE.' or nivel = '.NIVEL_CORPORATIVO.')';

            $result = $this->Asociado_model->getAsociadoUser($where, $orWhere, $orWhere2);
            
			if($result){				
                $data = [
                    'userAsociado' => [
                        'id' => $result->id,
                        'num_asociado' => $result->num_asociado,
                        'nombre' => $result->nombre,
                        'apellido' => $result->apellido,
                    ]
                ];
                
				$this->session->set_userdata($data);

				echo json_encode([]);
			}
			else
				echo json_encode(['invalid' => []]);
		}
		else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }

    }
    
    public function destroySesion(){
        $this->session->unset_userdata('userAsociado');
        redirect(base_url());
    }
}