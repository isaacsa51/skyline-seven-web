<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Usuario_model extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function get($like, $desde, $limite){
		$this->db->select('*');
        $this->db->from('usuarios');
		$this->db->order_by("id", "desc");
		$this->db->limit($limite, $desde);
        $this->db->like($like);
        $data['result'] = $this->db->get()->result();

        $this->db->select('count(id) as total');
        $this->db->from('usuarios');
        $this->db->like($like);
        $data['totalRows'] = $this->db->get()->result_array();

        return $data;
    }

    function getWhere($where){
        $this->db->where($where);
        $this->db->from('usuarios');
        return $this->db->get()->result();
    }
    
    function save($data){
        return $this->db->insert('usuarios', $data);
    }

    function update($where, $data){
        $this->db->where($where);
        $this->db->set($data);
        return $this->db->update('usuarios');
    }

    function delete($id){
        $this->db->delete('usuarios', array('id' => $id));
    }
    
}