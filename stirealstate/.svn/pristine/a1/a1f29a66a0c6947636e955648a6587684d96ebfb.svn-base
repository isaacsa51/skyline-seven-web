<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Permisos extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model('Permiso_model');
    }

    public function Modulos() {	
		validateAdminUser();

        $this->load->view('admin/Modulos_view');
    }

    public function SubModulos() {	
		validateAdminUser();

        $this->load->view('admin/SubModulos_view');
    }

    public function SubModulos2() {	
		validateAdminUser();

        $this->load->view('admin/SubModulos2_view');
    }
    
    public function asignarPermisos() {	
		validateAdminUser();

        $this->load->view('admin/Permisos_view');
    }
    
    public function perfiles() {	
		validateAdminUser();

        $this->load->view('admin/Perfiles_view');
	}
    
    public function getModulos(){
        if ($this->input->POST('limite') != null) {
            $data['result'] = $this->Permiso_model->getModulos($this->input->POST('desde'), $this->input->POST('limite'),$this->input->POST('nombre'));
            $data['totalRows'] = $this->Permiso_model->getModulosCount($this->input->POST('nombre'));
            echo json_encode($data);
        } else {
            echo json_encode($this->Permiso_model->getModulos());
        }
    }

    public function getSubModulos(){
        if ($this->input->POST('limite') != null) {
            $data['result'] = $this->Permiso_model->getSubModulos($this->input->POST('desde'), $this->input->POST('limite'),$this->input->POST('nombre'));
            $data['totalRows'] = $this->Permiso_model->getSubModulosCount($this->input->POST('nombre'));
            echo json_encode($data);
        } else {
            echo json_encode($this->Permiso_model->getSubModulos());
        }
    }

    public function getSubModulos2(){
        if ($this->input->POST('limite') != null) {
            $data['result'] = $this->Permiso_model->getSubModulos2($this->input->POST('desde'), $this->input->POST('limite'),$this->input->POST('nombre'));
            $data['totalRows'] = $this->Permiso_model->getSubModulos2Count($this->input->POST('nombre'));
            echo json_encode($data);
        } else {
            echo json_encode($this->Permiso_model->getSubModulos2());
        }
    }

    public function addModulo(){
        $this->Permiso_model->postModulo($this->input->POST('nombre'),$this->input->POST('icon'));
        echo json_encode(array('code' => 'success','message' => 'Modulo guardado.'));
    }

    public function addSubmodulo(){
        $this->Permiso_model->postSubModulo($this->input->POST('nombre'),$this->input->POST('icon'),$this->input->POST('url'),$this->input->POST('modulo'));
        echo json_encode(array('code' => 'success','message' => 'Modulo modificado.'));        
    }

    public function addSubmodulo2(){
        $this->Permiso_model->postSubModulo2($this->input->POST('nombre'),$this->input->POST('icon'),$this->input->POST('url'),$this->input->POST('modulo'));
        echo json_encode(array('code' => 'success','message' => 'Modulo modificado.'));        
    }

    public function addPerfil(){
        $this->Permiso_model->addPerfil($this->input->POST('nombre'),$this->input->POST('nivel'));
        echo json_encode(array('code' => 'success','message' => 'Modulo modificado.'));        
    }
    
    public function editModulo(){
        $this->Permiso_model->putModulos($this->input->POST('id'),$this->input->POST('status'),$this->input->POST('nombre'),$this->input->POST('icon'));
        echo json_encode(array('code' => 'success','message' => 'Modulo modificado.'));        
    }

    public function editSubModulo(){
        $this->Permiso_model->putSubModulos($this->input->POST('id'),$this->input->POST('status'),$this->input->POST('nombre'),$this->input->POST('icon'),$this->input->POST('url'),$this->input->POST('modulo'));
        echo json_encode(array('code' => 'success','message' => 'Modulo modificado.'));        
    }

    public function editSubModulo2(){
        $this->Permiso_model->putSubModulos2($this->input->POST('id'),$this->input->POST('status'),$this->input->POST('nombre'),$this->input->POST('icon'),$this->input->POST('url'),$this->input->POST('modulo'));
        echo json_encode(array('code' => 'success','message' => 'Modulo modificado.'));        
    }

    public function editPerfil(){
        $this->Permiso_model->editPerfil($this->input->POST('id'),$this->input->POST('status'),$this->input->POST('nombre'),$this->input->POST('organizaciones_id'));
        echo json_encode(array('code' => 'success','message' => 'Modulo modificado.'));        
    }

    public function getTipoUsuarioMenu(){
        echo json_encode($this->Permiso_model->getTipoUsuarioMenu());
    }

    public function getTipoUsuarioSubModulos2(){
        echo json_encode($this->Permiso_model->getTipoUsuarioSubModulos2());
    }

    public function getTipoUsuarioByStatus(){
        echo json_encode($this->Permiso_model->getTipoUsuarioByStatus());
    }

    public function postAsignacion(){
        $this->Permiso_model->postAsignacion($this->input->POST('idTipoUsuario'),$this->input->POST('idSubModulo'));
        echo json_encode(array('code' => 'success','message' => 'peticion completada.'));
    }

    public function deleteAsignacion(){
        $this->Permiso_model->deleteAsignacion($this->input->POST('idTipoUsuario'),$this->input->POST('idSubModulo'));
        echo json_encode(array('code' => 'success','message' => 'peticion completada.'));
    }

    public function postAsignacionSubModulo2(){
        $this->Permiso_model->postAsignacionSubModulo2($this->input->POST('idTipoUsuario'),$this->input->POST('idSubModulo'));
        echo json_encode(array('code' => 'success','message' => 'peticion completada.'));
    }

    public function deleteAsignacionSubModulo2(){
        $this->Permiso_model->deleteAsignacionSubModulo2($this->input->POST('idTipoUsuario'),$this->input->POST('idSubModulo'));
        echo json_encode(array('code' => 'success','message' => 'peticion completada.'));
    }

    public function getPerfiles(){
        if ($this->input->POST('limite') != null) {
            $searchQuery = array('nombre' => $this->input->POST('nombre'));
            $data['result'] = $this->Permiso_model->getPerfiles($this->input->POST('desde'), $this->input->POST('limite'),$this->input->POST('nombre'));
            $data['totalRows'] = $this->Permiso_model->getPerfilesCount($this->input->POST('nombre'));
            echo json_encode($data);
        } else {
            echo json_encode($this->Permiso_model->getPerfiles());
        }
    }

}