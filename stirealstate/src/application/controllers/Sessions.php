<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sessions extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$this->load->model('Session_model');
		$this->load->library(['form_validation']);
	}

	public function index(){
		if($this->session->userdata('user'))	
			return redirect(base_url('admin/dashboard'));

		$this->load->view('admin/Login');
	}

	public function dashboard(){
		if(!$this->session->userdata('user'))
			redirect(base_url('admin/login'));
		
		$this->load->view('admin/Dashboard_view');
	}

	public function login(){
		$this->form_validation->set_error_delimiters('', '');
	    
        $rules = [
			[
				'field' => 'user',
				'label' => 'user',
				'rules' => 'required|min_length[5]|max_length[30]',
				'errors' => [
					'required' => '',
					'min_length' => '',
					'max_length' => ''
				],
			],
			[
				'field' => 'password',
				'label' => 'password',
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
			$result = $this->Session_model->getUser($this->input->POST('user'), $this->input->POST('password'));
			if($result){
				$menu = $this->Session_model->getMenu($result->perfil_id);
				
				$data = [
					'id' => $result->id,
					'user' => $result->user,
					'menu' => $menu,
					'menuDisponible' => $this->menuDisponible($menu)
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

	public function logOut(){
		$data = [ 'id', 'user', 'menu', 'menuDisponible' ];
		$this->session->unset_userdata($data);
		redirect(base_url('admin/login'));
	}
	
	private function menuDisponible($menu){
		$menuDisponible = '';

		foreach ($menu['subMenu'] as $item) {
			$menuDisponible .= $item->urlSubMenu;
		}

		foreach ($menu['subMenu2'] as $item) {
			$menuDisponible .= $item->menu2_url;
		}

		return $menuDisponible;
	}

	
	public function getMenu(){
		$menu = $this->Session_model->getMenu(1);
		echo $this->session->userdata('menuDisponible');
		echo '<br>';
		echo $this->uri->segment('1').'/'.$this->uri->segment('2');
		echo '<br>';

		if(strpos($this->session->userdata('menuDisponible'), $this->uri->segment('1').'/'.$this->uri->segment('2')) !== false){
			echo "modulo disponible";
		}
		else{
			echo "modulo bloquado";
		}
		echo '<br>';
		
		echo '<br><br><pre>';
        print_r($menu);
		echo '</pre><br><br><br>';


	}

	public function destroySession(){
		$this->session->sess_destroy();
	}

}