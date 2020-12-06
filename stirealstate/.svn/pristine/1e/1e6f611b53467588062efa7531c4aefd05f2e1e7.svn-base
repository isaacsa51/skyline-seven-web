<?php $this->load->view('admin/helpers/Header'); ?>

<style>

  .lista-tipo-usuario{margin: 0;}
  .lista-tipo-usuario > li{border: 1px #000 solid;margin-bottom: 7px;position: relative;}
  .lista-tipo-usuario > li > div {line-height: 30px;}
  .lista-tipo-usuario > li > div > span{margin: 0 20px;}
  .lista-tipo-usuario label{display: unset;font-weight: normal;cursor: pointer;}
  ul.modulos {padding: 3px 20px;border-top: 1px #000 solid;display: none;}
  ul.modulos > li{margin-bottom: 7px;}
  ul.submodulos{margin: 0 20px;}
  .icon-triangle-down{font-size: 28px;position: absolute;top: 0;right: 0;margin: auto;line-height: 30px;}

  /*ANIMACIÓN ROTACIÓN*/
  .rotar{-moz-transition: all .3s linear;-webkit-transition: all .3s linear;transition: all .3s linear;}
  .rotar.arriba{-moz-transform:rotate(-61deg);-webkit-transform:rotate(-61deg);transform:rotate(-61deg);}

</style>


<div class="content-wrapper">
  <input type="hidden" id="BASE_URL" value="<?php echo base_url();?>">
  <div class="encabezado-modulo">
    <h2  class="titulo-modulo">Permisos</h2>
    <button id="addSubModulo">Agregar SubModulo</button>
    <button id="addModulo"style="margin-right: 10px;">Agregar Modulo</button>
    
  </div>
  <div class="contenedor-filtros">
    <h3 class="titulo-filtro">Filtrar resultados <span id="resultadoFiltro"><span></h3>
    <div class="filtros-elementos">
      <form id="form-buscar">
        <label>Por nombre</label>
        <input type="text" name="buscar" id="buscarInput" placeholder="Buscar por Nombre" class="">
        <button type="submit" class="boton-buscar" id="buscar">
          <span class="fa fa-search"></span>
        </button>
      </form>
      <div class="paginado">
        <span class="msg">Página</span>
        <img class="flecha-izquierda" src="<?php echo base_url('assets/img/flecha-izquierda.png');?>" srcset="<?php echo base_url('assets/img/flecha-izquierda@2x.png');?>" 2x" alt="izquierda">
        <div class="paginas">

        </div>
        <img class="flecha-derecha" src="<?php echo base_url('assets/img/flecha-derecha.png');?>" srcset="<?php echo base_url('assets/img/flecha-derecha@2x.png');?>" 2x" alt="derecha">
      </div>
    </div>
  </div>



  <div class="tabla">
    <ul class="lista-tipo-usuario">
       
    </ul>
  </div>

  <div class="footer-tabla">
    <span class="resultado" id="resultadoTabla"></span>
    <div class="paginado">
      <span class="msg">Página</span>
      <img class="flecha-izquierda" src="<?php echo base_url('assets/img/flecha-izquierda.png');?>" srcset="<?php echo base_url('assets/img/flecha-izquierda@2x.png');?>" 2x" alt="izquierda">
      <div class="paginas">

      </div>
      <img class="flecha-derecha" src="<?php echo base_url('assets/img/flecha-derecha.png');?>" srcset="<?php echo base_url('assets/img/flecha-derecha@2x.png');?>" 2x" alt="derecha">
    </div>
  </div>

</div>

<?php $this->load->view('admin/helpers/Footer'); ?>

<script src="<?php echo base_url('assets/js/admin/permisos.js'); ?>"></script>
