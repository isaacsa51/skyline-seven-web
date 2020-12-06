var BASE_URL = $('#BASE_URL').val(); 
var MODULOS;


$(document).ready(function(e){
	PushTable();
	// getModulos();
});

function getModulos() {
	$.ajax({
		type: 'POST',
		url: BASE_URL+'Administrador/GET2',
		data: {
			topic: 'getOrganizaciones',
		},success: function(payload) {
			payload = JSON.parse(payload);
			for (let index = 0; index < payload.length; index++) {
				MODULOS += `<option  selected value="${payload[index].id}" >${payload[index].nombre}</option>`;
			}
		},error:function(jqXHR, textStatus, errorThrown){
			modalDanger('Hubo un error al cargar la información');
		}
	});
}

function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'getPerfiles',
		data: {
			nombre: busquedaActual,
			desde: desde,
			limite: limite
		},success: function(payload){
			insertarElementosTabla(payload);
		},error:function(jqXHR, textStatus, errorThrown){
			modalDanger('Hubo un error al cargar la información');
		}
	});
}


function insertarElementosTabla(data) {
	try {
		var c = JSON.parse(data);
		totalRows = c.totalRows[0].total;
		paginas = totalRows/limite;
		paginas = Math.ceil(paginas);  // redondea al siguiente numero
		console.log(paginas);
		generarPaginas(c.result.length);
		if (isMobile) {
			$('#contenido_tabla_mobile').children().remove();
			$.each(c.result,function(i,item) {
				$('#contenido_tabla_mobile').append(`<tr>
					<td class="columna-1">
					<div>${item.nombre}</div>
					</td>
					<td class="columna-more">
					<div class="modal-opciones">
					<div class="titulo">Opciones</div>
					<div class="iconos">
					<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\')"></i>
					</div>
					</div> 
					<i class="icon-dots-three-vertical"></i> 
					</td>
				</tr>`);
			});
		} else {
			$('#contenido_tabla').children().remove();
			var inputCheckbox;
			$.each(c.result,function(i,item) {
				if (item.status == 1) {
					inputCheckbox = `<input class="ok" type="checkbox" value="${item.id}" checked>`;
				} else {
					inputCheckbox = `<input class="ok" type="checkbox" value="${item.id}">`;
				}
				$('#contenido_tabla').append(`<tr>	
					<td>${item.nombre}</td>
					<td>
					<label class="switch">
					${inputCheckbox}
					<span class="slider round"></span>
					</label> 
					</td>
					<td>
					<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\')"></i>						
					</td>
				</tr>`);
			});
		}
	} catch(err) {
		modalDanger('Error al cargar tabla');
	}
}

$('tbody').on("click", "input.ok", function(event) {
	if ($(this).is(":checked")) {
		$.ajax({
			type:`POST`,
			url: BASE_URL+'Administrador/PUT',
			data:{
				topic : 'putTipoUsuarios',
				id: $(this).val(),
				status     : 1
			},success:function (payload) {
				console.log(payload);
			},error:function(jqXHR, textStatus, errorThrown){
				modalDanger("Error al guardar la información");
			}
		});   
	} else {  
		$.ajax({
			type:`POST`,
			url: BASE_URL+'Administrador/PUT',
			data:{
				topic : 'putTipoUsuarios',
				id: $(this).val(),
				status     : 0
			},success:function (payload) {
				console.log(payload);
			},error:function(jqXHR, textStatus, errorThrown) {
				modalDanger("Error al guardar la información");
			}
		});   
	}
});

$('#agregarTipoUsuario').click(function(e) {
	let mesnajemodal= `<div>
		<div id="name">
		<label class="col-form-label mr-2 control-label" id="label_ciudad">Nombre</label>
		<input type="text" maxlength="70" id="nombre" class="form-control texto" placeholder="Agregar sub modulo" >
		</div>

		<div>
		<label class="font-weight-bold">Nievel</label>
		<select class="form-control" id="nivel">
		<option selected value="0" >- Seleccionar -</option>
		<option value="1">Grupo</option>
		<option value="2">Empresa</option>
		<option value="3">Sucursal</option>
		</select>
		</div>

	</div>`;
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Perfil`,
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
				if ($('#nombre').val() != '') {
					$.ajax({
						type:`POST`,
						url: 'addPerfil',
						data:{
							nombre: $('#nombre').val(),
							nivel : $('#nivel').val()
						},success:function (payload) {
							payload = JSON.parse(payload);
							if(payload.code == "error"){
								modalDanger(payload.message);
							}else{
								limpiarInputsBusqueda();
								reiniciarPaginado();
								PushTable();
								modalSuccess(payload.message);
								dialogItself.close();
							}
						},error:function(jqXHR, textStatus, errorThrown) {
							modalDanger("Error al guardar la información");
						}
					});
				} else {
					modalDanger("Error, se encontraron espacios en blanco");
				}
			}
		}]
	});
});


function editar(id,nombre) {
	let mesnajemodal= `<div>
		<div id="name">
		<label class="col-form-label mr-2 control-label" id="label_ciudad">Nombre </label>
		<input type="text" maxlength="70" id="nombre" class="form-control texto" value="${nombre}" >
		</div>


		<div>
		<label class="font-weight-bold">Nievel</label>
		<select class="form-control" id="nivel">
		<option selected value="0" >- Seleccionar -</option>
		<option value="1">Grupo</option>
		<option value="2">Empresa</option>
		<option value="3">Sucursal</option>
		</select>
		</div>


	</div>`;
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Editar Modulo`,
		message: mesnajemodal,
		nl2br: false,
		buttons: [{
			label: 'Guardar',
			cssClass: 'btn-success',
			action: function(dialogItself) {
				if ($('#nombre').val() != '') {
					$.ajax({
						type:`POST`,
						url: 'editPerfil',
						data:{
							id: id,
							nombre: $('#nombre').val(),
							nivel : $('#nivel').val()
						},
						success:function (payload) {
							payload = JSON.parse(payload);
							if(payload.code == "error"){
								modalDanger(payload.message);
							}else{
								PushTable();
								modalSuccess(payload.message);
								dialogItself.close();
							}
						},error:function(jqXHR, textStatus, errorThrown) {
							modalDanger("Error al guardar la información");
						}
					});   
				} else {
					modalDanger("Error, se encontraron espacios en blanco");
				}
			}
		},{
			label: 'Cerrar',
			cssClass: 'btn-primary',
			action: function(dialogItself) {
				dialogItself.close();
			}
		}]
	});
}
