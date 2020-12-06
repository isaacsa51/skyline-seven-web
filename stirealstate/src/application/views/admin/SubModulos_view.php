<?php $this->load->view('admin/helpers/Header'); ?>



<div class="content-wrapper">
<input type="hidden" id="BASE_URL" value="<?php echo base_url();?>">
                <div class="encabezado-modulo">
                  <h2 class="titulo-modulo">SubModulos</h2>
                  <button id="AgregarSubModulo">Agregar SubModulo</button>
                </div>
        
                <div class="contenedor-filtros">
                    <div class="contenedor-titulo-boton">
                        <h3 class="titulo-filtro">Filtrar resultados <span id="resultadoFiltro"><span></h3>
                    </div>
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
                <table class="table-desktop">
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col">Icon</th>
                      <th scope="col">Url</th>
                      <th scope="col">Estatus</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody id="contenido_tabla">
                  </tbody>
                </table>






                <table class="table-mobile">
                  <thead>
                    <tr>
                      <th scope="col">Nombre</th>
                      <th scope="col" class="col-paginado">    
                        <div class="paginado">
                          <span class="msg">Página</span>
                          <img class="flecha-izquierda" src="<?php echo base_url('assets/img/flecha-izquierda.png');?>" srcset="<?php echo base_url('assets/img/flecha-izquierda@2x.png');?>" 2x" alt="izquierda">
                          <div class="paginas">

                          </div>
                          <img class="flecha-derecha" src="<?php echo base_url('assets/img/flecha-derecha.png');?>" srcset="<?php echo base_url('assets/img/flecha-derecha@2x.png');?>" 2x" alt="derecha">
                        </div>
                      </th>
                    </tr>
                  </thead>
                  </thead>
                  <tbody id="contenido_tabla_mobile">
                    
                  </tbody>
                </table>

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

<script src="<?php echo base_url('assets/js/admin/submodulos.js'); ?>"></script>
