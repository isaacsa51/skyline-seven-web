<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Testimonio_model extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function get($like, $desde, $limite, $where = []){
		$this->db->select('*');
        $this->db->from('testimonios');
        $this->db->order_by("id", "desc");
        $this->db->where($where);
		$this->db->limit($limite, $desde);
        $this->db->like($like);
        $data['result'] = $this->db->get()->result();

        $this->db->select('count(id) as total');
        $this->db->from('testimonios');
        $this->db->where($where);
        $this->db->like($like);
        $data['totalRows'] = $this->db->get()->result_array();

        return $data;
    }

    
    function save($data){
        return $this->db->insert('testimonios', $data);
    }

    function update($where, $data){
        $this->db->where($where);
        $this->db->set($data);
        return $this->db->update('testimonios');
    }

    function delete($id){
        $this->db->delete('testimonios', array('id' => $id));
    }

    function getWhere($where){
        $this->db->where($where);
        $this->db->from('testimonios');
        return $this->db->get()->result();
    }

    function getLastId(){
        $this->db->select('id');
        $this->db->from('testimonios');
        $this->db->order_by("id", "desc");
        $this->db->limit(1);
        return $this->db->get()->row();
    }

    function getImageNameById($where){
        $this->db->select('testimonio_imagen_name');
        $this->db->from('testimonios');
        $this->db->where($where);
        return $this->db->get()->row();
    }

    function getImageCasoNameById($where){
        $this->db->select('testimonio_imagen_caso_name');
        $this->db->from('testimonios');
        $this->db->where($where);
        return $this->db->get()->row();
    }

    function getAsociadoUser($where, $orWhere, $orWhere2){
        $this->db->where($where);
        $this->db->where($orWhere);
        $this->db->where($orWhere2);
        $this->db->from('testimonios');
        return $this->db->get()->row();
    }
    
}