<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Boletines_model extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function get($like, $desde, $limite, $where = []){
		$this->db->select('*');
        $this->db->from('boletines');
        $this->db->order_by("id", "desc");
        $this->db->where($where);
		$this->db->limit($limite, $desde);
        $this->db->like($like);
        $data['result'] = $this->db->get()->result();

        $this->db->select('count(id) as total');
        $this->db->from('boletines');
        $this->db->where($where);
        $this->db->like($like);
        $data['totalRows'] = $this->db->get()->result_array();

        return $data;
    }

    function getImageName($where){
        $this->db->select('image_name_hash');
        $this->db->from('boletines');
        $this->db->where($where);
        return $this->db->get()->row();
    }

    function getFileName($where){
        $this->db->select('file_name_hash');
        $this->db->from('boletines');
        $this->db->where($where);
        return $this->db->get()->row();
    }
    
    function save($data){
        return $this->db->insert('boletines', $data);
    }

    function update($where, $data){
        $this->db->where($where);
        $this->db->set($data);
        return $this->db->update('boletines');
    }

    function delete($id){
        $this->db->delete('boletines', array('id' => $id));
    }

    function getWhere($where){
        $this->db->where($where);
        $this->db->from('boletines');
        return $this->db->get()->result();
    }
}