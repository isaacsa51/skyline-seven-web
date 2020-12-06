<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="stylesheet" href='<?php echo base_url('assets/css/admin/devGenerales.css?v=0.2');?>'>
  <link rel="stylesheet" href='<?php echo base_url('assets/css/bootstrap.min.css');?>'>
  <link rel="stylesheet" href='<?php echo base_url('assets/css/bootstrap-dialog.min.css');?>'>
  <link rel="stylesheet" href='<?php echo base_url('assets/font-awesome-4.7.0/css/font-awesome.min.css');?>'>



<link rel="apple-touch-icon" sizes="57x57" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="<?php echo base_url();?>assets/img/favicon.ico/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="<?php echo base_url();?>assets/img/favicon.ico/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="<?php echo base_url();?>assets/img/favicon.ico/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="<?php echo base_url();?>assets/img/favicon.ico/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="<?php echo base_url();?>assets/img/favicon.ico/favicon-16x16.png">
<link rel="manifest" href="<?php echo base_url();?>assets/img/favicon.ico/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="<?php echo base_url();?>assets/img/favicon.ico/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">





<style>
</style>
  
<title>FONDO NARANJA</title>
</head>
<body>
  <header class="cd-main-header">
    <img id="stir-logo" src="<?php echo base_url('assets/img/admin-logo.png'); ?>" alt="Logo">
    <a href="<?php echo base_url('Sessions/logOut');?>" class="log-out"><i class="icon-exit_to_app" id="icon-log-out"></i></a>
    <i class="icon-menu"></i>
    <span class="usuario" style="display: block;"><?php echo $this->session->userdata('user');?></span>
  </header>

  <main class="cd-main-content">
    <nav class="cd-side-nav">
      <ul id="menu">
        <?php 
        $menu = $this->session->userdata('menu');
        for ($i=0; $i <count($menu['menu']); $i++) {
            $verificacion = true;
            for ($x=0; $x <count($menu['subMenu']); $x++) {
                if( $menu['menu'][$i]->id == $menu['subMenu'][$x]->idMenu ) {
                    if ($verificacion) {
                      echo '<li><a href="#" class="menu-modulo">'.$menu['menu'][$i]->nombreMenu.'</a><ul>';
                      $verificacion = false;
                    }

                    $submenu2 = '';
                    foreach ($menu['subMenu2'] as $item) {
                      if($item->sub_modulo_id  == $menu['subMenu'][$x]->id){
                        $submenu2 .= '<li> <a href="'.base_url().$item->menu2_url.'">'.$item->menu2_nombre.'</a> </li>';
                      }
                    }

                    $ulSubMenu2 = $submenu2 ? '<ul class="sub_menu_2"> '.$submenu2.' </ul>' : '';

                    $subMenuUrl = $menu['subMenu'][$x]->urlSubMenu != '#' ? base_url().$menu['subMenu'][$x]->urlSubMenu : '#';
                    echo '<li class="active"><a href="'.$subMenuUrl .'">'.$menu['subMenu'][$x]->nombreSubMenu.'</a> '.$ulSubMenu2.' </li>';
                }
            }
            if (!$verificacion) {
            echo '</ul></li>';
          }
        }
        ?>
      </ul>
      
      <span class="cerrar-sesion">
        <a href="<?php echo base_url('Sessions/logOut');?>" class="active">Cerrar Sesion</a>
      </span> 

    </nav>

<div class="overlay_block">
  <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  <h2 class="loader_message"></h2>
</div>

