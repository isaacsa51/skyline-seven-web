<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Videos extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model('Videos_model');
        $this->load->library(['form_validation']);
        $this->load->helper(['rules']);
    }

    private $rules;

    public function index(){
        $this->load->view('admin/Videos_view');
    }

    public function get(){
        $searchQuery = array('video_name' => $this->input->POST('video_name'));
        $data = $this->Videos_model->get($searchQuery, $this->input->POST('desde'), $this->input->POST('limite'));
        echo json_encode($data);
    }

    public function validateFolder($rute){
        if (!is_dir($rute)) {
            mkdir($rute, 0777, TRUE);
        }
    }

    public function addVideo(){

        $config['upload_path']   = './videos/';
        $config['allowed_types'] =  'mp4';
        $config['encrypt_name'] = TRUE;

        $this->validateFolder('./videos/');

        $this->load->library('upload', $config); // cargamos la libreria
        $this->upload->initialize($config); // inicialisamos la libreria

        if ( !$this->upload->do_upload('_video')) //subimos el archivo (retorna 1 y 0)
        {
          $error = array('error' => $this->upload->display_errors());
          $data['invalid'] = json_encode($error);
          echo json_encode($data);
        }
        else
        {
            $video = array('upload_data' => $this->upload->data());
            $this->form_validation->set_error_delimiters('', '');
            
            $data = [
                'video_name' => str_replace("\"", "", json_encode($video['upload_data']['orig_name'])),
                'video_name_hash' => str_replace("\"", "",  json_encode($video['upload_data']['file_name'])),
                'video_url' => str_replace("\"", "",  json_encode($video['upload_data']['full_path']))
            ];
                
            echo $this->Videos_model->save($data) ? true : json_encode(['error' => 'Error al guardar los datos']);
        }
    }

    public function updateVideo(){

        $config['upload_path']   = './videos/';
        $config['allowed_types'] =  'mp4';
        $config['encrypt_name'] = TRUE;

        $this->validateFolder('./videos/');

        $this->load->library('upload', $config); // cargamos la libreria
        $this->upload->initialize($config); // inicialisamos la libreria

        if(json_encode($_FILES['_video']['error']) == 0){
            
            if ( !$this->upload->do_upload('_video')) //subimos el archivo (retorna 1 y 0)
            {
              $error = array('error' => $this->upload->display_errors());
              $data['invalid'] = json_encode($error);
              echo json_encode($data);
            }
            else
            {
                $newVideo = array('upload_data' => $this->upload->data());
                $where = [
                    'id' => $this->input->POST('id')
                ];
                $video_name = $this->Videos_model->getVideoName($where);
                unlink("./videos/" . $video_name->video_name_hash);

                $data = [
                    'video_name' => str_replace("\"", "", json_encode($newVideo['upload_data']['orig_name'])),
                    'video_name_hash' => str_replace("\"", "",  json_encode($newVideo['upload_data']['file_name'])),
                    'video_url' => str_replace("\"", "",  json_encode($newVideo['upload_data']['full_path'])),
                ];
                
                echo $this->Videos_model->update($where, $data) ? true : json_encode(['error' => 'Error al guardar los datos']);
            }
        }
        else
        {
            $data['invalid'] = $this->form_validation->error_array();
            echo json_encode($data);
        }
    }

    public function deleteVideo(){
        $where = [
            'id' => $this->input->POST('id')
        ];
        $video_name = $this->Videos_model->getVideoName($where);
        unlink("./videos/" . $video_name->video_name_hash);

        $this->Videos_model->delete($this->input->POST('id') );
    }
}