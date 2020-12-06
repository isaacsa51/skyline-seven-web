<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Sinaportaciones extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index() {
    $this->load->view('layouts/header');
    $this->load->view('navbar/navbar.php');
    $this->load->view('sin_aportaciones/header-mi-perfil');
    $this->load->view('sin_aportaciones/mis-aportaciones');
    $this->load->view('sin_aportaciones/mis-solicitudes');
    $this->load->view('mi_perfil/modal-modificar-aportacion');
    $this->load->view('mi_perfil/modal-historial-aportaciones');
    $this->load->view('footer/footer.php');
    $this->load->view('layouts/footer');
  }
} 