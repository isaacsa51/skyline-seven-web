$(document).ready(function(e){
	PushTable();
});

function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'Testimonios/get',
		data: {
			nombre: busquedaActual,
			desde: desde,
			limite: limite
		},success: function(payload) {
			insertarElementosTabla(payload);
		},error:function(jqXHR, textStatus, errorThrown) {
			modalDanger('Error al cargar los datos');
		}
	});
}


function insertarElementosTabla(data){
	try{
		var c = JSON.parse(data);
		totalRows = c.totalRows[0].total;
		paginas = totalRows/limite;
		paginas = Math.ceil(paginas);
		generarPaginas(c.result.length);

		if (!isMobile) {
			$('#contenido_tabla').children().remove();
			$.each(c.result,function(i,item){
				$('#contenido_tabla').append(`<tr>
                <td>${item.nombre}</td>
                <td>${item.ciudad}</td>
				<td>${item.descripcion}</td>
				<td>${item.testimonio}</td>
				<td>
					<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\', \'${item.ciudad}\', \'${item.descripcion}\', \'${item.testimonio}\')"></i>
					<i class="icon-trash-2 ultimo-icono" onclick="prepareToDelete(${item.id}, \'${item.nombre}\')"></i>
				</td>
				</tr>`);
			});
		} else {
			$('#contenido_tabla_mobile').children().remove();
			$.each(c.result,function(i,item){
				$('#contenido_tabla_mobile').append(`
				<tr>
					<td class="columna-1">
                    <td>${item.nombre}</td>
                    <td>${item.ciudad}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.testimonio}</td>
					</td>
					<td class="columna-more">
					<div class="modal-opciones">
						<div class="titulo">Opciones</div>
						<div class="iconos">
							<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\', \'${item.ciudad}\', \'${item.descripcion}\', \'${item.testimonio}\')"></i>
							<i class="icon-trash-2 ultimo-icono" onclick="prepareToDelete(${item.id}, \'${item.nombre}\')"></i>
						</div>
					</div> 
					<i class="icon-dots-three-vertical"></i> 
					</td>
				</tr>`);
			});
		}
	}
	catch(err){
		modalDanger('Error al cargar tabla');
	}
}


$('#add').click(function(e) {
	let mesnajemodal = `
	<form class="form-horizontal" id="formulario" enctype="multipart/form-data">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Nombre</label>
		<input type="text" maxlength="100" id="nombre" name="nombre" class="form-control texto" placeholder="Nombre del testigo" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Ciudad donde trabaja</label>
		<input type="text" maxlength="100" id="ciudad" name="ciudad" class="form-control texto" placeholder="Ciudad donde trabaja" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Descripción</label>
		<input type="text" maxlength="100" id="descripcion" name="descripcion" class="form-control texto" placeholder="Descripción del caso de ayuda" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Testimonio</label>
		<input type="text" maxlength="200" id="testimonio" name="testimonio" class="form-control texto" placeholder="Testimonio del cliente" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Foto del asociado</label>
        <input type="file" name="testimonio_imagen" id="testimonio_imagen">
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Imagen del caso de apoyo</label>
        <input type="file" name="testimonio_imagen_caso" id="testimonio_imagen_caso">
		<small class="form-text text-danger"></small>
  </div>
	</form>`;
	
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Nuevo testimonio`,
		message: mesnajemodal,
		nl2br: false,
		buttons: [{
			label: 'Cancelar',
			cssClass: 'btn-danger',
			action: function(dialogItself) {
				dialogItself.close();
			}
		},{
			label: 'Guardar',
			cssClass: 'btn-success',
			action: function(dialogItself) {
				$('#formulario small').hide();

				$.ajax({
					type:`POST`,
					url: 'Testimonios/addTestimonio',
                    data: new FormData($('#formulario')[0]),
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,   // tell jQuery not to set contentType
					success:function (payload) {
						payload = JSON.parse(payload);
						
						if(payload.invalid){
							showInvalidFormMsgs(payload.invalid);
						}
						else{
							limpiarInputsBusqueda();
							reiniciarPaginado();
							PushTable();
							modalSuccess('Datos guardados');
							dialogItself.close();
						}
					},error:function(jqXHR, textStatus, errorThrown) {
						modalDanger("Error al guardar los datos");
					}
				});
		
			}
		}]
	});
});


function editar(id, nombre, ciudad, descripcion, testimonio) {
	let mesnajemodal = `<form class="form-horizontal" id="formulario" enctype="multipart/form-data">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Nombre </label>
		<input type="text" maxlength="100" value="${nombre}" id="nombre" name="nombre" class="form-control texto" placeholder="Nombre del testigo" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Ciudad donde trabaja</label>
		<input type="text" maxlength="100" value="${ciudad}" id="ciudad" name="ciudad" class="form-control texto" placeholder="Ciudad donde trabaja" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Descripción </label>
		<input type="text" maxlength="200" value="${descripcion}" id="descripcion" name="descripcion" class="form-control texto" placeholder="Descripción del caso de ayuda" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Testimonio </label>
		<input type="text" maxlength="200" value="${testimonio}" id="testimonio" name="testimonio" class="form-control texto" placeholder="Testimonio del cliente" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Foto del asociado</label>
        <input type="file" name="testimonio_imagen" id="testimonio_imagen">
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Imagen del caso de apoyo</label>
        <input type="file" name="testimonio_imagen_caso" id="testimonio_imagen_caso">
		<small class="form-text text-danger"></small>
  </div>
  <input type="hidden" name="id" value="${id}" >
	</form>`;

	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Editar testimonio`,
		message: mesnajemodal,
		nl2br: false,
		buttons: [{
			label: 'Cancelar',
			cssClass: 'btn-danger',
			action: function(dialogItself) {
				dialogItself.close();
			}
		},
		{
			label: 'Guardar',
			cssClass: 'btn-success',
			action: function(dialogItself) {
				$('#formulario small').hide();

				$.ajax({
					type:`POST`,
					url: 'Testimonios/updateTestimonio',
					data: new FormData($('#formulario')[0]),
                    processData: false,  // tell jQuery not to process the data
                    contentType: false,   // tell jQuery not to set contentType
					success:function (payload) {
                        try {
                            // Parse a JSON
                            payload = JSON.parse(payload); 
                        } catch (e) {
                            payload = payload;
                        }
						
						if(payload.invalid){
							showInvalidFormMsgs(payload.invalid);
						}
						else{
							PushTable();
							modalSuccess('Datos guardados');
							dialogItself.close();
						}
					},error:function(jqXHR, textStatus, errorThrown){
						modalDanger("Error al guardar los datos");
					}
				});   
			}
		}]
	});
}


function prepareToDelete(id, titulo){
	deleteRow( id, `¿Seguro desea eliminar el testimonio <b>${titulo}</b>?`, 'Testimonios/deleteTestimonio', 'Testimonio eliminado' );
}