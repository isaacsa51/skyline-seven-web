<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AtracctionHome_model extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function get($like, $desde, $limite, $where = []){
		$this->db->select('*');
        $this->db->from('atracction_home');
        $this->db->order_by("id", "desc");
        $this->db->where($where);
		$this->db->limit($limite, $desde);
        $this->db->like($like);
        $data['result'] = $this->db->get()->result();

        $this->db->select('count(id) as total');
        $this->db->from('atracction_home');
        $this->db->where($where);
        $this->db->like($like);
        $data['totalRows'] = $this->db->get()->result_array();

        return $data;
    }

    
    function save($data){
        return $this->db->insert('atracction_home', $data);
    }

    function update($where, $data){
        $this->db->where($where);
        $this->db->set($data);
        return $this->db->update('atracction_home');
    }

    function delete($id){
        $this->db->delete('atracction_home', array('id' => $id));
    }

    function getWhere($where){
        $this->db->where($where);
        $this->db->from('atracction_home');
        return $this->db->get()->result();
    }

    function getLastId(){
        $this->db->select('id');
        $this->db->from('atracction_home');
        $this->db->order_by("id", "desc");
        $this->db->limit(1);
        return $this->db->get()->row();
    }

    function getImageNameById($where){
        $this->db->select('atracction_imagen_name');
        $this->db->from('atracction_home');
        $this->db->where($where);
        return $this->db->get()->row();
    }

    function getImageMobileNameById($where){
        $this->db->select('atracction_imagen_mobile_name');
        $this->db->from('atracction_home');
        $this->db->where($where);
        return $this->db->get()->row();
    }

    function getAsociadoUser($where, $orWhere, $orWhere2){
        $this->db->where($where);
        $this->db->where($orWhere);
        $this->db->where($orWhere2);
        $this->db->from('atracction_home');
        return $this->db->get()->row();
    }
    
}