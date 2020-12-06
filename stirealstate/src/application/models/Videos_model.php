<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Videos_model extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function get($like, $desde, $limite, $where = []){
		$this->db->select('*');
        $this->db->from('videos');
        $this->db->order_by("id", "desc");
        $this->db->where($where);
		$this->db->limit($limite, $desde);
        $this->db->like($like);
        $data['result'] = $this->db->get()->result();

        $this->db->select('count(id) as total');
        $this->db->from('videos');
        $this->db->where($where);
        $this->db->like($like);
        $data['totalRows'] = $this->db->get()->result_array();

        return $data;
    }

    function getVideoName($where){
        $this->db->select('video_name_hash');
        $this->db->from('videos');
        $this->db->where($where);
        return $this->db->get()->row();
    }
    
    function save($data){
        return $this->db->insert('videos', $data);
    }

    function update($where, $data){
        $this->db->where($where);
        $this->db->set($data);
        return $this->db->update('videos');
    }

    function delete($id){
        $this->db->delete('videos', array('id' => $id));
    }
}