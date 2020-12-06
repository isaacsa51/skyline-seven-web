<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
  }

  public function index() {
    $this->load->view('layouts/header');
    $this->load->view('navbar/navbar.php');
    $this->load->view('home/jumbotron');
    $this->load->view('home/intro-info');
    $this->load->view('home/models-info');
    $this->load->view('home/amenidades-info');
    $this->load->view('home/galeria');
    $this->load->view('home/redes');
    $this->load->view('home/contacto');
    $this->load->view('footer/footer.php');
    $this->load->view('layouts/footer');
  }
}
