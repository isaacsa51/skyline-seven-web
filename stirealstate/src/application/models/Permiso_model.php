<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Permiso_model extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    
    public function getModulos($desde=null, $limite=null, $nombre=null) {
        if (isset($limite)) {
            $this->db->select('*');
            $this->db->from('modulos');
            $this->db->like(array('nombre' => $nombre));
            $this->db->order_by("id", "desc");
            $this->db->limit($limite, $desde);
            return $this->db->get()->result();
        } else {
            $this->db->select("*");
            $this->db->order_by("nombre", "asc");
            $this->db->where(array('status' => 1));
            $this->db->from('modulos');
            return $this->db->get()->result(); 
        }
    }

    public function getModulosCount($nombre=null){
        $this->db->select('count(modulos.id) as total');
        $this->db->from('modulos');
        $this->db->like(array('nombre' => $nombre));
        return $this->db->get()->result_array();
    }

    public function postModulo($nombre,$icon){
        $query = $this->db->get_where('modulos', array('nombre' => $nombre));
        if($query->num_rows() == 1) {
            return "error";
        } else {
            $this->db->insert('modulos', array(
                'nombre' => $nombre,
                'icon' => $icon,
                'status' => 1, 
            ));
        }
    }

    public function postSubModulo($nombre,$icon,$url,$modulos)
    {
        $query = $this->db->get_where('sub_modulos', array('nombre' => $nombre));
        if($query->num_rows() == 1) {
            return "error";
        } else {
            $this->db->insert('sub_modulos', array(
                'nombre' => $nombre,
                'icon' => $icon,
                'url' => $url,
                'status' => 1,
                'modulos_id' => $modulos
            ));
        }
    }

    public function postSubModulo2($nombre,$icon,$url,$modulos)
    {
        $query = $this->db->get_where('sub_modulos2', array('nombre' => $nombre));
        if($query->num_rows() == 1) {
            return "error";
        } else {
            $this->db->insert('sub_modulos2', array(
                'nombre' => $nombre,
                'icon' => $icon,
                'url' => $url,
                'status' => 1,
                'sub_modulo_id' => $modulos
            ));
        }
    }

    public function putModulos($id=null,$status=null,$nombre=null,$icon=null)
    {
        $query = $this->db->get_where('modulos', array('nombre' => $nombre));
        if($query->num_rows() == 1) {
            return "error";
        } else {
            $this->db->where(array('id' => $id));
            if ($nombre == null) {
                $this->db->set(array(
                    'status' => $status
                ));
            } else {
                $this->db->set(array(
                    'nombre' => $nombre,
                    'icon' => $icon
                ));
            }
            $this->db->update('modulos');
        }
    }

    public function getSubModulos($desde=null, $limite=null, $nombre=null) {
        if (isset($limite)) {
            $this->db->select('*');
            $this->db->from('sub_modulos');
            $this->db->like(array('nombre' => $nombre));
            $this->db->order_by("id", "desc");
            $this->db->limit($limite, $desde);
            return $this->db->get()->result();
        } else {
            $this->db->select("*");
            $this->db->order_by("nombre", "asc");
            $this->db->where(array('status' => 1));
            $this->db->from('sub_modulos');
            return $this->db->get()->result(); 
        }
    }

    public function getSubModulosCount($nombre=null){
        $this->db->select('count(sub_modulos.id) as total');
        $this->db->from('sub_modulos');
        $this->db->like(array('nombre' => $nombre));
        return $this->db->get()->result_array();
    }

    public function getSubModulos2($desde=null, $limite=null, $nombre=null) {
        if (isset($limite)) {
            $this->db->select('*');
            $this->db->from('sub_modulos2');
            $this->db->like(array('nombre' => $nombre));
            $this->db->order_by("id", "desc");
            $this->db->limit($limite, $desde);
            return $this->db->get()->result();
        } else {
            $this->db->select("*");
            $this->db->order_by("nombre", "asc");
            $this->db->where(array('status' => 1));
            $this->db->from('sub_modulos2');
            return $this->db->get()->result(); 
        }
    }

    public function getSubModulos2Count($nombre=null){
        $this->db->select('count(sub_modulos2.id) as total');
        $this->db->from('sub_modulos2');
        $this->db->like(array('nombre' => $nombre));
        return $this->db->get()->result_array();
    }


    public function putSubModulos($id=null,$status=null,$nombre=null,$icon=null,$url=null,$modulo=null)
    {
        $query = $this->db->get_where('sub_modulos', array('nombre' => $nombre));
        if($query->num_rows() == 1) {
            return "error";
        } else {
            $this->db->where(array('id' => $id));
            
            if($nombre == null) {
                $this->db->set(array(
                    'status' => $status
                ));
            } else {
                $this->db->set(array(
                    'nombre' => $nombre,
                    'icon' => '',
                    'url' => $url,
                    'modulos_id' => $modulo
                ));
            }
            $this->db->update('sub_modulos');
        }
    }

    public function putSubModulos2($id=null,$status=null,$nombre=null,$icon=null,$url=null,$modulo=null)
    {
        $this->db->where(array('id' => $id));
        
        if($nombre == null) {
            $this->db->set(array(
                'status' => $status
            ));
        } else {
            $this->db->set(array(
                'nombre' => $nombre,
                'icon' => '',
                'url' => $url,
                'sub_modulo_id' => $modulo
            ));
        }
        $this->db->update('sub_modulos2');
    }


    public function getTipoUsuarioMenu(){
        $this->db->select('*');
        $this->db->from('sub_modulos_has_perfiles');
        $this->db->order_by("perfiles_id", "asc");
        return $this->db->get()->result();
    }
    
    public function getTipoUsuarioSubModulos2(){
        $this->db->select('*');
        $this->db->from('sub_modulos2_has_perfiles');
        $this->db->order_by("perfiles_id", "asc");
        return $this->db->get()->result();
    }

    public function getPerfiles($desde=null, $limite=null,$nombre=null){
        if (isset($limite)) {
            $this->db->select('*');
            $this->db->from('perfiles');
            $this->db->like(array('nombre' => $nombre));
            $this->db->order_by("id", "desc");
            $this->db->limit($limite, $desde);
            return $this->db->get()->result();
        } else {
            $this->db->select("*");
            $this->db->from('perfiles');
            return $this->db->get()->result();
        }
    }

    public function getPerfilesCount($nombre=null){
        $this->db->select('count(perfiles.id) as total');
        $this->db->from('perfiles');
        $this->db->like(array('nombre' => $nombre));
        return $this->db->get()->result_array();
    }

    public function addPerfil($nombre=null,$nivel=null)
    {
        $query = $this->db->get_where('perfiles', array('nombre' => $nombre));
        if($query->num_rows() == 1) {
            return "error";
        } else {
        
            $this->db->insert('perfiles', array(
                'nombre' => $nombre,
                'status' => 1,
                'nivel' => $nivel
            ));
        }
    }

    public function editPerfil($id=null,$status=null,$nombre=null)
    {
        $query = $this->db->get_where('perfiles', array('nombre' => $nombre));
        if($query->num_rows() == 1) {
            return "error";
        } else {

            $this->db->where(array('id' => $id));
            if ($nombre == null) {
                $this->db->set(array(
                    'status' => $status
                ));
            } else {
                $this->db->set(array(
                    'nombre' => $nombre
                ));
            }
            $this->db->update('perfiles');
        }
    }

    public function getTipoUsuarioByStatus(){
        $this->db->select('*');
        $this->db->from('perfiles');
        $this->db->where(array('status' => 1));
        $this->db->order_by("nombre", "asc");
        return $this->db->get()->result();
    }
    
    public function postAsignacion($idTipoUsuario,$idSubModulo) { //se usa
        
        $this->db->insert('sub_modulos_has_perfiles', array(
            'perfiles_id' => $idTipoUsuario,
            'sub_modulos_id' => $idSubModulo
        ));
    }

    public function postAsignacionSubModulo2($idTipoUsuario,$idSubModulo) { //se usa
        
        $this->db->insert('sub_modulos2_has_perfiles', array(
            'perfiles_id' => $idTipoUsuario,
            'sub_modulos2_id' => $idSubModulo
        ));
    }

    public function deleteAsignacion($idTipoUsuario,$idSubModulo)
    {
        $this->db->delete('sub_modulos_has_perfiles', array(
            'perfiles_id' => $idTipoUsuario,
            'sub_modulos_id' => $idSubModulo
        ));
    }

    public function deleteAsignacionSubModulo2($idTipoUsuario,$idSubModulo)
    {
        $this->db->delete('sub_modulos2_has_perfiles', array(
            'perfiles_id' => $idTipoUsuario,
            'sub_modulos2_id' => $idSubModulo
        ));
    }



}