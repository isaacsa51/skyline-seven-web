<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Testimonios extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model('Testimonio_model');
        $this->load->library(['form_validation']);
        $this->load->helper(['rules']);
    }

    private $rules;
    

    public function index(){
        validateAdminUser();

        $this->load->view('admin/Testimonios_view');
    }

    public function validateFolder($rute){
        if (!is_dir($rute)) {
            mkdir($rute, 0777, TRUE);
        }
    }

    public function get(){
        $searchQuery = array('nombre' => $this->input->POST('nombre'));
        $data = $this->Testimonio_model->get($searchQuery, $this->input->POST('desde'), $this->input->POST('limite'));
        echo json_encode($data);
    }

    public function addTestimonio(){
        $config['upload_path']   = './testimonios_assets/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';

        $lastid = $this->Testimonio_model->getLastId();
        $id = intval($lastid->id) + 1;
        $config['file_name'] = "testimonio" . strval($id);

        $this->validateFolder('./testimonios_assets/');

        $this->load->library('upload', $config);
        $this->upload->initialize($config);

        if ( !$this->upload->do_upload('testimonio_imagen')){
          $error = array('error' => $this->upload->display_errors());
          $data['invalid'] = json_encode($error);
          echo json_encode($data);
        }else{
            $dataImage = array('upload_data' => $this->upload->data());

            $config['upload_path']   = './testimonios_assets/';
            $config['allowed_types'] = 'gif|jpg|png|jpeg';
            $lastid = $this->Testimonio_model->getLastId();
            $id = intval($lastid->id) + 1;
            $config['file_name'] = "testimoniocaso" . strval($id);

            $this->validateFolder('./testimonios_assets/');

            $this->load->library('upload', $config);
            $this->upload->initialize($config);

            if ( !$this->upload->do_upload('testimonio_imagen')){
                $error = array('error' => $this->upload->display_errors());
                $data['invalid'] = json_encode($error);
                echo json_encode($data);
            }else{
                $this->form_validation->set_error_delimiters('', '');

                $this->rules = getRulesTestimonios();
                $this->form_validation->set_rules($this->rules);

                if ($this->form_validation->run()){

                    $dataImageCaso = array('upload_data' => $this->upload->data());

                    $data = [
                        'nombre' => $this->input->POST('nombre'),
                        'ciudad' => $this->input->POST('ciudad'),
                        'descripcion' => $this->input->POST('descripcion'),
                        'testimonio' => $this->input->POST('testimonio'),
                        'testimonio_imagen' => $dataImage['upload_data']['full_path'],
                        'testimonio_imagen_name' => $dataImage['upload_data']['file_name'],
                        'testimonio_imagen_caso' => $dataImageCaso['upload_data']['full_path'],
                        'testimonio_imagen_caso_name' => $dataImageCaso['upload_data']['file_name']
                    ];
                    
                    echo $this->Testimonio_model->save($data) ? true : json_encode(['error' => 'Error al guardar los datos']);
                }
                else{
                    $data['invalid'] = $this->form_validation->error_array();
                    echo json_encode($data);
                }
            }
        }
    }

    public function updateTestimonio(){
        $continuar = TRUE;
        $config['upload_path']   = './testimonios_assets/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['file_name'] = "testimonio" . $this->input->POST('id');

        $where = [
            'id' => $this->input->POST('id')
        ];

        $image_name = $this->Testimonio_model->getImageNameById($where);
        unlink("./testimonios_assets/" . $image_name->testimonio_imagen_name);

        $this->validateFolder('./testimonios_assets/');

        $this->load->library('upload', $config);
        $this->upload->overwrite = TRUE;
        $this->upload->initialize($config);

        if ( !$this->upload->do_upload('testimonio_imagen')){
            $error = array('error' => $this->upload->display_errors());
            $data['invalid'] = json_encode($error);
            echo json_encode($data);
            $continuar = FALSE;
        }
        $dataImage = array('upload_data' => $this->upload->data());

        $config['upload_path']   = './testimonios_assets/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        $config['file_name'] = "testimoniocaso" . $this->input->POST('id');

        $image_name = $this->Testimonio_model->getImageCasoNameById($where);
        unlink("./testimonios_assets/" . $image_name->testimonio_imagen_caso_name);

        $this->validateFolder('./testimonios_assets/');

        $this->load->library('upload', $config);
        $this->upload->overwrite = TRUE;
        $this->upload->initialize($config);

        if ( !$this->upload->do_upload('testimonio_imagen_caso')){
            $error = array('error' => $this->upload->display_errors());
            $data['invalid'] = json_encode($error);
            echo json_encode($data);
            $continuar = FALSE;
        }

        if($continuar){
            $this->form_validation->set_error_delimiters('', '');

            $this->rules = getRulesTestimonios();
            $rules = [
                $this->rules[0],
                $this->rules[1],
                $this->rules[2],
                $this->rules[3]
            ];   

            $this->form_validation->set_rules($rules);

            if ($this->form_validation->run()){
                $dataImageCaso = array('upload_data' => $this->upload->data());

                $data = [
                    'nombre' => $this->input->POST('nombre'),
                    'ciudad' => $this->input->POST('ciudad'),
                    'descripcion' => $this->input->POST('descripcion'),
                    'testimonio' => $this->input->POST('testimonio'),
                    'testimonio_imagen' => $dataImage['upload_data']['full_path'],
                    'testimonio_imagen_name' => $dataImage['upload_data']['file_name'],
                    'testimonio_imagen_caso' => $dataImageCaso['upload_data']['full_path'],
                    'testimonio_imagen_caso_name' => $dataImageCaso['upload_data']['file_name']
                ];


                echo $this->Testimonio_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
            }
            else{
                $data['invalid'] = $this->form_validation->error_array();
                echo json_encode($data);
            }
        }

    }

    public function deleteTestimonio(){
        $where = [
            'id' => $this->input->POST('id')
        ];

        $image_name = $this->Testimonio_model->getImageNameById($where);
        unlink("./testimonios_assets/" . $image_name->testimonio_imagen_name);
        $image_name = $this->Testimonio_model->getImageCasoNameById($where);
        unlink("./testimonios_assets/" . $image_name->testimonio_imagen_caso_name);

        $this->Testimonio_model->delete($this->input->POST('id') );
    }


}