<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Solicitud_model extends CI_Model{

    function __construct(){
        parent::__construct();
        $this->load->database();
    }

    function get($desde, $limite){
		$this->db->select('solicitudes.id as no_solicitud, asociados.nombre as asociado_nombre, asociados.apellido as asociado_apellido, solicitudes.created as created, solicitudes_estatus.nombre as estatus, tipos_solicitudes.nombre as tipo_solicitud');
        $this->db->from('solicitudes');
        $this->db->join('solicitudes_estatus', 'solicitudes_estatus.id = solicitudes.estatus_id');
        $this->db->join('asociados', 'asociados.id = solicitudes.asociado_id');
        $this->db->join('tipos_solicitudes', 'tipos_solicitudes.id = solicitudes.tipo_solicitud');
        $this->db->order_by("solicitudes.id", "desc");
		$this->db->limit($limite, $desde);
        $data['result'] = $this->db->get()->result();

        $this->db->select('count(id) as total');
        $this->db->from('solicitudes');
        $data['totalRows'] = $this->db->get()->result_array();

        return $data;
    }

    function save($data){
        return $this->db->insert('solicitudes', $data);
    }
}