$(document).ready(function(e){
	PushTable();
});

function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'AtracctionHome/get',
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
				<td>
					<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\')"></i>
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
					</td>
					<td class="columna-more">
					<div class="modal-opciones">
						<div class="titulo">Opciones</div>
						<div class="iconos">
							<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\')"></i>
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
		<input type="text" maxlength="100" id="nombre" name="nombre" class="form-control texto" placeholder="Nombre del banner" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Imagen del banner</label>
        <input type="file" name="atracction_imagen" id="atracction_imagen">
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Imagen mobile del banner</label>
        <input type="file" name="atracction_imagen_mobile" id="atracction_imagen_mobile">
		<small class="form-text text-danger"></small>
  </div>
	</form>`;
	
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Nuevo banner`,
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
					url: 'AtracctionHome/addImages',
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


function editar(id, nombre) {
	let mesnajemodal = `<form class="form-horizontal" id="formulario" enctype="multipart/form-data">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Nombre </label>
		<input type="text" maxlength="100" value="${nombre}" id="nombre" name="nombre" class="form-control texto" placeholder="Nombre del testigo" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Imagen del banner</label>
        <input type="file" name="atracction_imagen" id="atracction_imagen">
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Imagen mobile del banner</label>
        <input type="file" name="atracction_imagen_mobile" id="atracction_imagen_mobile">
		<small class="form-text text-danger"></small>
  </div>
  <input type="hidden" name="id" value="${id}" >
	</form>`;

	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Editar banner`,
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
					url: 'AtracctionHome/updateImages',
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


function prepareToDelete(id, nombre){
	deleteRow( id, `¿Seguro desea eliminar el banner <b>${nombre}</b>?`, 'AtracctionHome/deleteImages', 'Banner eliminado' );
}