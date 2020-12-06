<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Session_model extends CI_Model{
    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function getUser($user, $passwrod){
    	$query = $this->db->get_where('usuarios', array(
            'user' => $user, 
            'password' => md5($passwrod),
            'status' => 1
        ));
        return $query->row();
    }

    public function getMenu ($idtipoUsuario)
    {   
        $this->db->select("sub_modulos.id AS id, sub_modulos.nombre AS nombreSubMenu, sub_modulos.url AS urlSubMenu, sub_modulos.icon AS iconSubMenu, sub_modulos.modulos_id AS idMenu ");
        $this->db->from('sub_modulos');

        $this->db->join('sub_modulos_has_perfiles', 'sub_modulos.id = sub_modulos_has_perfiles.sub_modulos_id', 'left');
        $this->db->join('perfiles', 'sub_modulos_has_perfiles.perfiles_id = perfiles.id', 'left');

        $this->db->where(array('perfiles.id' => $idtipoUsuario));
        $dataResult['subMenu'] = $this->db->get()->result(); 


        $this->db->select(" sub_modulos2.nombre AS menu2_nombre, sub_modulos2.url AS menu2_url, sub_modulos2.sub_modulo_id AS sub_modulo_id ");
        $this->db->from('sub_modulos2');
        
        $this->db->join('sub_modulos2_has_perfiles', 'sub_modulos2.id = sub_modulos2_has_perfiles.sub_modulos2_id', 'left');
        $this->db->join('perfiles', 'sub_modulos2_has_perfiles.perfiles_id = perfiles.id', 'left');

        $this->db->where(array('perfiles.id' => $idtipoUsuario));
        $dataResult['subMenu2'] = $this->db->get()->result(); 

        
        $this->db->select(" modulos.nombre AS nombreMenu, modulos.icon AS iconMenu, modulos.id AS id ");
        $this->db->from('modulos');

        $dataResult['menu'] = $this->db->get()->result(); 

        return $dataResult;
    }

}