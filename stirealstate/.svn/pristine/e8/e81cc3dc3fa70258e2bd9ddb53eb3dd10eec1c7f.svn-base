<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AtracctionHome extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model('AtracctionHome_model');
        $this->load->library(['form_validation']);
        $this->load->helper(['rules']);
    }

    private $rules;
    
    public function index(){
        validateAdminUser();

        $this->load->view('admin/AtracctionHome_view');
    }

    public function validateFolder($rute){
        if (!is_dir($rute)) {
            mkdir($rute, 0777, TRUE);
        }
    }

    public function get(){
        $searchQuery = array('nombre' => $this->input->POST('nombre'));
        $data = $this->AtracctionHome_model->get($searchQuery, $this->input->POST('desde'), $this->input->POST('limite'));
        echo json_encode($data);
    }

    public function addImages(){
        $config['upload_path']   = './atracction_home_assets/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';

        $lastid = $this->AtracctionHome_model->getLastId();
        $id = intval($lastid->id) + 1;
        $config['file_name'] = "attractionhome" . strval($id);

        $this->validateFolder('./atracction_home_assets/');

        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if ( !$this->upload->do_upload('atracction_imagen')){
          $error = array('error' => $this->upload->display_errors());
          $data['invalid'] = json_encode($error);
          echo json_encode($data);
        }else{
            $dataImage = array('upload_data' => $this->upload->data());

            $config['upload_path']   = './atracction_home_assets/';
            $config['allowed_types'] = 'gif|jpg|png|jpeg';
            $lastid = $this->AtracctionHome_model->getLastId();
            $id = intval($lastid->id) + 1;
            $config['file_name'] = "attractionhomemobile" . strval($id);

            $this->validateFolder('./atracction_home_assets/');

            $this->load->library('upload', $config);
            $this->upload->initialize($config);

            if ( !$this->upload->do_upload('atracction_imagen_mobile')){
                $error = array('error' => $this->upload->display_errors());
                $data['invalid'] = json_encode($error);
                echo json_encode($data);
            }else{

                $dataImageMobile = array('upload_data' => $this->upload->data());

                $data = [
                    'nombre' => $this->input->POST('nombre'),
                    'atracction_imagen' => $dataImage['upload_data']['full_path'],
                    'atracction_imagen_name' => $dataImage['upload_data']['file_name'],
                    'atracction_imagen_mobile' => $dataImageMobile['upload_data']['full_path'],
                    'atracction_imagen_mobile_name' => $dataImageMobile['upload_data']['file_name']
                ];
                
                echo $this->AtracctionHome_model->save($data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        
            }
        }
    }

    public function updateImages(){
        $continuar = TRUE;
        $config['upload_path']   = './atracction_home_assets/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['file_name'] = "attractionhome" . $this->input->POST('id');

        $where = [
            'id' => $this->input->POST('id')
        ];

        $image_name = $this->AtracctionHome_model->getImageNameById($where);
        unlink("./atracction_home_assets/" . $image_name->atracction_imagen_name);

        $this->validateFolder('./atracction_home_assets/');

        $this->load->library('upload', $config);
        $this->upload->overwrite = TRUE;
        $this->upload->initialize($config);

        if ( !$this->upload->do_upload('atracction_imagen')){
            $error = array('error' => $this->upload->display_errors());
            $data['invalid'] = json_encode($error);
            echo json_encode($data);
            $continuar = FALSE;
        }
        $dataImage = array('upload_data' => $this->upload->data());

        $config['upload_path']   = './atracction_home_assets/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['file_name'] = "attractionhomemobile" . $this->input->POST('id');

        $image_name = $this->AtracctionHome_model->getImageMobileNameById($where);
        unlink("./atracction_home_assets/" . $image_name->atracction_imagen_mobile_name);

        $this->validateFolder('./atracction_home_assets/');

        $this->load->library('upload', $config);
        $this->upload->overwrite = TRUE;
        $this->upload->initialize($config);

        if ( !$this->upload->do_upload('atracction_imagen_mobile')){
            $error = array('error' => $this->upload->display_errors());
            $data['invalid'] = json_encode($error);
            echo json_encode($data);
            $continuar = FALSE;
        }

        if($continuar){
            $dataImageMobile = array('upload_data' => $this->upload->data());

            $data = [
                'nombre' => $this->input->POST('nombre'),
                'atracction_imagen' => $dataImage['upload_data']['full_path'],
                'atracction_imagen_name' => $dataImage['upload_data']['file_name'],
                'atracction_imagen_mobile' => $dataImageMobile['upload_data']['full_path'],
                'atracction_imagen_mobile_name' => $dataImageMobile['upload_data']['file_name']
            ];

            echo $this->AtracctionHome_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
            
        }

    }

    public function deleteImages(){
        $where = [
            'id' => $this->input->POST('id')
        ];

        $image_name = $this->AtracctionHome_model->getImageNameById($where);
        unlink("./atracction_home_assets/" . $image_name->atracction_imagen_name);
        $image_name = $this->AtracctionHome_model->getImageMobileNameById($where);
        unlink("./atracction_home_assets/" . $image_name->atracction_imagen_mobile_name);

        $this->AtracctionHome_model->delete($this->input->POST('id') );
    }


}