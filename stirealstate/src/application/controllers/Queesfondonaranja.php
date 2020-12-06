<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Queesfondonaranja extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index() {
    $this->load->view('layouts/header');
    $this->load->view('navbar/navbar.php');
    $this->load->view('que_es_fondo_naranja/header-section');
    $this->load->view('que_es_fondo_naranja/que-es-fondo-naranja');
    $this->load->view('que_es_fondo_naranja/objetivo');
    $this->load->view('que_es_fondo_naranja/politicas-coberturas');
    $this->load->view('que_es_fondo_naranja/solicitar-apoyo');
    $this->load->view('footer/footer.php');
    $this->load->view('layouts/footer');
  }
}