<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Boletines extends CI_Controller {
    public function __construct(){
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        $this->load->model('Boletines_model');
        $this->load->library(['form_validation']);
        $this->load->helper(['rules']);
    }

    private $rules;

    public function index(){
        validateAdminUser();
        $this->load->view('admin/Boletines_view');
    }

    public function get(){
        $searchQuery = array('title' => $this->input->POST('title'));
        $data = $this->Boletines_model->get($searchQuery, $this->input->POST('desde'), $this->input->POST('limite'));
        echo json_encode($data);
    }

    public function validateFolder($rute){
        if (!is_dir($rute)) {
            mkdir($rute, 0777, TRUE);
        }
    }

    public function upload($form, $format){
        $config['upload_path']   = './boletines/';
        $config['allowed_types'] = $format;
        $config['encrypt_name'] = TRUE;

        $this->validateFolder('./boletines/');

        $this->load->library('upload', $config); // cargamos la libreria
        $this->upload->initialize($config); // inicialisamos la libreria

        if ( !$this->upload->do_upload($form)) //subimos el archivo (retorna 1 y 0)
        {
            $error = array('error' => $this->upload->display_errors());
            $data['invalid'] = json_encode($error);
            echo json_encode($data);
        }
        else
        {
            $data = array('upload_data' => $this->upload->data());
            return $data;
        }
    }

    public function addBoletin(){
       $this->form_validation->set_error_delimiters('', '');
        $rules = [
            [
                'field' => 'title',
                'label' => 'title',
                'rules' => 'required|max_length[50]',
                'errors' => [
                    'required' => '*Campo requerido',
                    'max_length' => '*Máximo 50 carácteres'
                ],
            ],
            [
                'field' => 'description',
                'label' => 'description',
                'rules' => 'required|max_length[70]',
                'errors' => [
                    'required' => '*Campo requerido',
                    'max_length' => '*Máximo 70 carácteres'
                ],
            ],
        ];
        
        $this->form_validation->set_rules($rules);

        if ($this->form_validation->run()){

            $image = $this->upload('boletinImage', 'gif|jpg|png|jpeg');
            $file = $this->upload('boletinFile', 'pdf');

            $data = [
                'title' => $this->input->POST('title'),
                'description' => $this->input->POST('description'),
                'image_name' =>  str_replace("\"", "", json_encode($image['upload_data']['orig_name'])),
                'image_name_hash' =>  str_replace("\"", "", json_encode($image['upload_data']['file_name'])),
                'image_url' => str_replace("\"", "", json_encode($image['upload_data']['full_path'])),
                'file_name' =>  str_replace("\"", "", json_encode($file['upload_data']['orig_name'])),
                'file_name_hash' =>  str_replace("\"", "", json_encode($file['upload_data']['file_name'])),
                'file_url' => str_replace("\"", "", json_encode($file['upload_data']['full_path'])),
            ];
           echo $this->Boletines_model->save($data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        } 
    }

    public function updateBoletin(){
        $this->form_validation->set_error_delimiters('', '');
        $rules = [
            [
                'field' => 'title',
                'label' => 'title',
                'rules' => 'required|max_length[50]',
                'errors' => [
                    'required' => '*Campo requerido',
                    'max_length' => '*Máximo 50 carácteres'
                ],
            ],
            [
                'field' => 'description',
                'label' => 'description',
                'rules' => 'required|max_length[70]',
                'errors' => [
                    'required' => '*Campo requerido',
                    'max_length' => '*Máximo 70 carácteres'
                ],
            ],
        ];

        $this->form_validation->set_rules($rules);

        if ($this->form_validation->run()){

            $data = [
                'title' => $this->input->POST('title'),
                'description' => $this->input->POST('description')
            ];

            $where = [
                'id' => $this->input->POST('id')
            ]; 

            if(json_encode($_FILES['boletinImage']['error']) == 0){// Valida si se agrego una image nueva
                $image_name = $this->Boletines_model->getImageName($where);
                unlink("./boletines/" . $image_name->image_name_hash);

                $newImage = $this->upload('boletinImage', 'gif|jpg|png|jpeg');
                $data = [
                    'image_name' =>  str_replace("\"", "", json_encode($newImage['upload_data']['orig_name'])),
                    'image_name_hash' =>  str_replace("\"", "", json_encode($newImage['upload_data']['file_name'])),
                    'image_url' => str_replace("\"", "", json_encode($newImage['upload_data']['full_path'])),
                ]; 
                $this->Boletines_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
            }

            if(json_encode($_FILES['boletinFile']['error']) == 0){ // Valida si se agrego un archivo nuevo
                $file_name = $this->Boletines_model->getFileName($where);
                unlink("./boletines/" . $file_name->file_name_hash);

                $newFile = $this->upload('boletinFile', 'pdf');
                $data = [
                    'file_name' =>  str_replace("\"", "", json_encode($newFile['upload_data']['orig_name'])),
                    'file_name_hash' =>  str_replace("\"", "", json_encode($newFile['upload_data']['file_name'])),
                    'file_url' => str_replace("\"", "", json_encode($newFile['upload_data']['full_path'])),
                ];
                $this->Boletines_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
            }
            // Actualiza los campos de texto en caso de haber un cambi o no!
            echo $this->Boletines_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
        else{
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function deleteBoletin(){

        $where = [
            'id' => $this->input->POST('id')
        ];

        $file_name = $this->Boletines_model->getFileName($where);
        unlink("./boletines/" . $file_name->file_name_hash);

        $image_name = $this->Boletines_model->getImageName($where);
        unlink("./boletines/" . $image_name->image_name_hash);

        $this->Boletines_model->delete($this->input->POST('id') );
    }
}