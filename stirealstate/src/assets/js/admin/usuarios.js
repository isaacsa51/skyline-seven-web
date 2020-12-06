$(document).ready(function(e){
	PushTable();
	getPerfiles();
});

var perfilesOptions = "";
var perfilesJson;

function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'Usuarios/get',
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

function getPerfiles(){
	$.ajax({
		type: 'POST',
		url: window.location.origin+'/Permisos/getPerfiles',
		success: function(payload) {
			payload = JSON.parse(payload);
			perfilesJson = payload;
			for (let index = 0; index < payload.length; index++) {
				perfilesOptions += `<option value="${payload[index].id}" >${payload[index].nombre}</option>`;
			}
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
					<td>${item.user}</td>
					<td>
						<label class="switch">
							<input class="ok" type="checkbox" value="${item.id}" ${item.status == 1 ? 'checked' : '' }>
							<span class="slider round"></span>
						</label> 
					</td>
					<td>
						<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.user}\', ${item.perfil_id})"></i>
						<i class="icon-lock" title="Restablecer contraseña" onclick="resetPassword(${item.id}, \'${item.user}\')"></i>
						<i class="icon-trash-2 ultimo-icono" onclick="prepareToDelete(${item.id}, \'${item.user}\')"></i>
					</td>
				</tr>`);
			});
		} else {
			$('#contenido_tabla_mobile').children().remove();
			$.each(c.result,function(i,item){
				$('#contenido_tabla_mobile').append(`
				<tr>
					<td class="columna-1">
					<div>${item.user}</div>
					</td>
					<td class="columna-more">
					<div class="modal-opciones">
						<div class="titulo">Opciones</div>
						<div class="iconos">
							<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.user}\', ${item.perfil_id})"></i>
							<i class="icon-trash-2 ultimo-icono" onclick="prepareToDelete(${item.id}, \'${item.user}\')"></i>
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
	<form class="form-horizontal" id="formUser">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Usuario </label>
		<input type="text" maxlength="30" id="nombre" name="nombre" class="form-control texto" placeholder="Nombre de usuario" >
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Tipo de usuario</label>
		<select class="form-control" name="perfil" id="perfil">
			<option selected value="0" >- Seleccionar -</option>
			${perfilesOptions}
		</select>
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Contraseña </label>
		<input type="password" maxlength="30" id="password" name="password" class="form-control texto" placeholder="Contraseña del usuario" >
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Confirmar contraseña </label>
		<input type="password" maxlength="30" id="confirm_password" name="confirm_password" class="form-control texto" placeholder="Contraseña del usuario" >
		<small class="form-text text-danger"></small>
	</div>
	</form>`;
	
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Nuevo usuario`,
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
				$('#formUser small').hide();

				$.ajax({
					type:`POST`,
					url: 'Usuarios/post',
					data: $('#formUser').serialize(),
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


$('tbody').on("click", "input.ok", function(event) {
	var status = ($(this).is(":checked")) ? 1 : 0;
	setStatus($(this).val(), status, 'Usuarios/updateStatus');  
});


function editar(id, nombre, perfil_id) {
	var optionsPefiles = "";
	for (let index = 0; index < perfilesJson.length; index++) {
		optionsPefiles += `<option ${perfilesJson[index].id == perfil_id ? 'selected' : ''} value="${perfilesJson[index].id}" >${perfilesJson[index].nombre}</option>`;
	}

	let mesnajemodal = `
	<form class="form-horizontal" id="formUser">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Usuario </label>
		<input type="text" maxlength="30" id="nombre" name="nombre" value="${nombre}" class="form-control texto" placeholder="Nombre de usuario" >
		<small class="form-text text-danger"></small>
		<input type="hidden" name="id" value="${id}" >
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Tipo de usuario</label>
		<select class="form-control" name="perfil" id="perfil">
			${optionsPefiles}
		</select>
		<small class="form-text text-danger"></small>
	</div>
	</form>`;

	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Editar usuario`,
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
				$('#formUser small').hide();

				$.ajax({
					type:`POST`,
					url: 'Usuarios/update',
					data: $('#formUser').serialize(),
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
	deleteRow( id, `¿Seguro desea eliminar el usuario <b>${nombre}</b>?`, 'Usuarios/delete', 'Usuario eliminado' );
}


function resetPassword(id, nombre){
	let mesnajemodal = `
	<form class="form-horizontal" id="formUser">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Usuario </label>
		<input type="text" disabled maxlength="30" id="nombre" name="nombre" value="${nombre}" class="form-control texto" placeholder="Nombre de usuario" >
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Contraseña </label>
		<input type="password" maxlength="30" id="password" name="password" class="form-control texto" placeholder="Contraseña del usuario" >
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Confirmar contraseña </label>
		<input type="password" maxlength="30" id="confirm_password" name="confirm_password" class="form-control texto" placeholder="Contraseña del usuario" >
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
				$('#formUser small').hide();

				$.ajax({
					type:`POST`,
					url: 'Usuarios/restPassword',
					data: $('#formUser').serialize(),
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

