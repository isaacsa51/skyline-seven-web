<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Apoyo extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index() {
    $this->load->view('layouts/header');
    $this->load->view('navbar/navbar.php');
    $this->load->view('solicitarApoyo/header-section');
    $this->load->view('solicitarApoyo/necesitas-apoyo');
    $this->load->view('solicitarApoyo/informacion-proceso');
    $this->load->view('solicitarApoyo/solicitar-apoyo');
    $this->load->view('footer/footer.php');
    $this->load->view('layouts/footer');
  }
}