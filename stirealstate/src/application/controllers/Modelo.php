<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Modelo extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index() {
    $this->load->view('propiedad-detalles/modelo-header.php');
    $this->load->view('propiedad-detalles/modelo-navbar.php');
    $this->load->view('propiedad-detalles/section-modelo.php');
    $this->load->view('propiedad-detalles/section-amenidades.php');
    $this->load->view('propiedad-detalles/section-formulario.php');
    $this->load->view('propiedad-detalles/section-otros.php');
    $this->load->view('propiedad-detalles/modelo-footer-nav.php');
    $this->load->view('propiedad-detalles/section-footer.php');
  }
}
