<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Quieroaportar extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index() {
    $this->load->view('layouts/header');
    $this->load->view('navbar/navbar.php');
    $this->load->view('quiero_aportar/header-section');
    $this->load->view('quiero_aportar/como-puedo-aportar');
    $this->load->view('quiero_aportar/mis-aportaciones');
    $this->load->view('quiero_aportar/modal-historial-aportaciones');
    $this->load->view('footer/footer.php');
    $this->load->view('layouts/footer');
  }
}