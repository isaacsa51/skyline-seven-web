<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Asociado_model extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function get($like, $desde, $limite, $where = []){
		$this->db->select('*');
        $this->db->from('asociados');
        $this->db->order_by("id", "desc");
        $this->db->where($where);
		$this->db->limit($limite, $desde);
        $this->db->like($like);
        $data['result'] = $this->db->get()->result();

        $this->db->select('count(id) as total');
        $this->db->from('asociados');
        $this->db->where($where);
        $this->db->like($like);
        $data['totalRows'] = $this->db->get()->result_array();

        return $data;
    }

    
    function save($data){
        return $this->db->insert('asociados', $data);
    }

    function update($where, $data){
        $this->db->where($where);
        $this->db->set($data);
        return $this->db->update('asociados');
    }

    function delete($id){
        $this->db->delete('asociados', array('id' => $id));
    }

    function getWhere($where){
        $this->db->where($where);
        $this->db->from('asociados');
        return $this->db->get()->result();
    }

    function getAsociadoUser($where, $orWhere, $orWhere2){
        $this->db->where($where);
        $this->db->where($orWhere);
        $this->db->where($orWhere2);
        $this->db->from('asociados');
        return $this->db->get()->row();
    }
    
}