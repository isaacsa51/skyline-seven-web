$(document).ready(function(e){
	PushTable();
});

function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'Asociados/get',
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
				<td>${item.apellido}</td>
				<td>${item.email}</td>
				<td>${item.num_asociado}</td>
				<!--
				<td>
					<label class="switch">
						<input class="ok" type="checkbox" value="${item.id}" ${item.status == 1 ? 'checked' : '' }>
						<span class="slider round"></span>
					</label> 
				</td>
				<td>
					<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\', \'${item.apellido}\', \'${item.email}\', \'${item.num_asociado}\', \'${item.num_tienda}\')"></i>
					<i class="icon-lock" title="Restablecer contraseña" onclick="resetPassword(${item.id}, \'${item.nombre}\', \'${item.apellido}\')"></i>
					<i class="icon-trash-2 ultimo-icono" onclick="prepareToDelete(${item.id}, \'${item.nombre}\')"></i>
				</td>
				-->
				</tr>`);
			});
		} else {
			$('#contenido_tabla_mobile').children().remove();
			$.each(c.result,function(i,item){
				$('#contenido_tabla_mobile').append(`
				<tr>
					<td class="columna-1">
					<div>${item.nombre}</div>
					<div>${item.apellido}</div>
					<div>${item.email}</div>
					<div>${item.num_asociado}</div>
					</td>
					<!--
					<td class="columna-more">
					<div class="modal-opciones">
						<div class="titulo">Opciones</div>
						<div class="iconos">
							<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\', \'${item.apellido}\', \'${item.email}\', \'${item.num_asociado}\', \'${item.num_tienda}\')"></i>
							<i class="icon-trash-2 ultimo-icono" onclick="prepareToDelete(${item.id}, \'${item.nombre}\')"></i>
						</div>
					</div> 
					<i class="icon-dots-three-vertical"></i> 
					</td>
					-->
				</tr>`);
			});
		}
	}
	catch(err){
		modalDanger('Error al cargar tabla');
	}
}


$('tbody').on("click", "input.ok", function(event) {
	var status = ($(this).is(":checked")) ? 1 : 0;
	setStatus($(this).val(), status, 'Asociados/updateStatus');  
});


function editar(id, nombre, apellido, email, num_asociado, num_tienda) {
	let mesnajemodal = `<form class="form-horizontal" id="formulario">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Nombre(s) </label>
		<input type="text" maxlength="70" value="${nombre}" id="nombre" name="nombre" class="form-control texto" placeholder="Nombre de gerente" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Apellidos </label>
		<input type="text" maxlength="70" value="${apellido}" id="apellido" name="apellido" class="form-control texto" placeholder="Apellidos de gerente" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input dos-columnas">
		<label class="col-form-label mr-2 control-label">No. Asociados </label>
		<input type="number" id="num_asociado" value="${num_asociado}" name="num_asociado" class="form-control texto" placeholder="Número de asociado" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input dos-columnas">
		<label class="col-form-label mr-2 control-label">No. Tienda </label>
		<input type="number" id="num_tienda" value="${num_tienda}" name="num_tienda" class="form-control texto" placeholder="Número de tienda" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Correo</label>
		<input type="text" maxlength="70" id="email" value="${email}" name="email" class="form-control texto" placeholder="Correo electrónico (@homedepot.com.mx)" >
		<small class="form-text text-danger"></small>
  </div>
  <input type="hidden" name="id" value="${id}" >
	</form>`;

	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Editar gerente`,
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
					url: 'Asociados/updateGerente',
					data: $('#formulario').serialize(),
					success:function (payload) {
						payload = JSON.parse(payload);
						
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
	deleteRow( id, `¿Seguro desea eliminar al gerente <b>${nombre}</b>?`, 'Asociados/deleteGerente', 'Gerente eliminado' );
}


function resetPassword(id, nombre, apellido){
	let mesnajemodal = `
	<form class="form-horizontal" id="formulario">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Gerente </label>
		<input type="text" disabled maxlength="30" id="nombre" name="nombre" value="${nombre} ${apellido}" class="form-control texto" placeholder="Nombre de usuario" >
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Contraseña </label>
		<input type="password" maxlength="30" id="password" name="password" class="form-control texto" placeholder="Contraseña del gerente" >
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Confirmar contraseña </label>
		<input type="password" maxlength="30" id="confirm_password" name="confirm_password" class="form-control texto" placeholder="Contraseña del gerente" >
		<small class="form-text text-danger"></small>
	</div>
	<input type="hidden" name="id" value="${id}" >
	</form>`;
	
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: 'Restablecer contraseña',
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
					url: 'Asociados/restPassword',
					data: $('#formulario').serialize(),
					success:function (payload) {
						payload = JSON.parse(payload);
						
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

