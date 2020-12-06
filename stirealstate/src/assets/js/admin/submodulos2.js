var BASE_URL = $('#BASE_URL').val(); 
var MODULOS;


$(document).ready(function(e){
	PushTable();
	getSubModulos();
});

function getSubModulos() {
	$.ajax({
		type: 'POST',
		url: 'getSubModulos',
		success: function(payload){
			payload = JSON.parse(payload);
			for (let index = 0; index < payload.length; index++) {
				if(index == 0){
					MODULOS += `<option selected value="${payload[index].id}" >${payload[index].nombre}</option>`;
				} else {
					MODULOS += `<option value="${payload[index].id}" >${payload[index].nombre}</option>`;
				}
			}
		},error:function(jqXHR, textStatus, errorThrown) {
			modalDanger('Hubo un error al cargar la información');
		}
	});
}


function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'getSubModulos2',
		data: {
			nombre: busquedaActual,
			desde: desde,
			limite: limite
		},success: function(payload) {
			insertarElementosTabla(payload);
		},error:function(jqXHR, textStatus, errorThrown) {
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
					<div>${item.url} segundos</div>
					</td>
					<td class="columna-more">
					<div class="modal-opciones">
					<div class="titulo">Opciones</div>
					<div class="iconos">
					<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\', \'${item.url}\')"></i>
					<!--<i class="icon-drawer" title="Asignar Modulo" onclick="AsignarModulo(${item.id})"></i>-->
					</div>
					</div> 
					<i class="icon-dots-three-vertical"></i> 
					</td>
				</tr>`);
			});
		} else {
			$('#contenido_tabla').children().remove();
			$.each(c.result,function(i,item) {
				if (item.status == 1) {
					inputCheckbox = `<input class="ok" type="checkbox" value="${item.id}" checked>`;
				} else {
				inputCheckbox = `<input class="ok" type="checkbox" value="${item.id}">`;
				}
				$('#contenido_tabla').append(`<tr>	
					<td>${item.nombre}</td>
					<td>${item.icon}</td>
					<td>${item.url}</td>
					<td>
					<label class="switch">
					${inputCheckbox}
					<span class="slider round"></span>
					</label> 
					</td>
					<td>
					<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.nombre}\', \'${item.url}\')"></i>
					<!--<i class="icon-drawer" title="Asignar Modulo" onclick="AsignarModulo(${item.id})"></i>-->
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
				topic : 'putSubModulos',
				id: $(this).val(),
				status     : 1
			},success:function (payload) {
				console.log(payload);
			},error:function(jqXHR, textStatus, errorThrown) {
				modalDanger("Error al guardar la información");
			}
		});   
	} else {
		$.ajax({
			type:`POST`,
			url: BASE_URL+'Administrador/PUT',
			data:{
				topic : 'putSubModulos',
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







$('#AgregarSubModulo').click(function(e) {
	let mesnajemodal= `<form class="form-horizontal" action="" id="modalFormulario">
		<div class="modal-input una-columna" id="name"><label class="col-form-label mr-2 control-label" id="label_ciudad">Nombre </label>
		<input type="text" maxlength="70" id="nombre" class="form-control texto" placeholder="Agregar sub modulo" >
		<small class="form-text text-danger"></small>
		</div>
		<!--<div class="modal-input una-columna" id="divestado">
		<label class="font-weight-bold">Icono</label>
		<select class="form-control" id="selectEstadoModal">
		<option disabled selected value="0" style="display: none">- Seleccionar -</option>
		</select>
		</div>-->
		<div class="modal-input una-columna" id="Url">
		<label class="col-form-label mr-2 control-label" id="label_url">Url </label>
		<input type="text" maxlength="70" id="url" class="form-control texto" placeholder="Agregar una Url" >
		<small class="form-text text-danger"></small>
		</div>
		<div class="modal-input una-columna" id="divestado">
		<label class="font-weight-bold">Sub Modulo</label>
		<select class="form-control" id="modulo">
		<option disabled selected value="0" style="display: none">- Seleccionar -</option>${MODULOS}</select>
		<small class="form-text text-danger"></small>
		</div>
	</form>`;
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Sub Modulos`,
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
				var boleano = true;
				$('#modalFormulario small').hide();

				if($('#nombre').val()==''){  
				$('#nombre').siblings('small').text('*Campo requerido').show();
				boleano = false;
				}

				if($('#url').val()==''){
				$('#url').siblings('small').text('*Campo requerido').show();
				boleano = false;
				}

				if (boleano) {
					$.ajax({
						type:`POST`,
						url: 'addSubmodulo2',
						data:{
							nombre: $('#nombre').val(),
							icon: '',
							url: $('#url').val(),
							modulo: $('#modulo').val(),
						},success:function (payload) {
							payload = JSON.parse(payload);
							if(payload.code == "error") {
								modalDanger(payload.message);
							} else {
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
				}
			}
		}]
	});
});








function editar(id,nombre,url) {
	let mesnajemodal= `<form class="form-horizontal" action="" id="modalFormulario">
		<div class="modal-input una-columna" id="name">
		<label class="col-form-label mr-2 control-label" id="label_ciudad">Nombre </label>
		<input type="text" maxlength="70" id="nombre" class="form-control texto" value="${nombre}">
		<small class="form-text text-danger"></small>
		</div>
		<!--<div class="modal-input una-columna" id="divestado">
		<label class="font-weight-bold">Icono</label>
		<select class="form-control" id="selectEstadoModal">
		<option disabled selected value="0" style="display: none">- Seleccionar -</option>
		</select>
		</div>-->
		<div class="modal-input una-columna" id="Url"><label class="col-form-label mr-2 control-label" id="label_url">Url </label>
		<input type="text" maxlength="70" id="url" class="form-control texto" value="${url}">
		<small class="form-text text-danger"></small>
		</div>
		<div class="modal-input una-columna" id="divestado">
		<label class="font-weight-bold">Sub Modulo</label>
		<select class="form-control" id="modulo">
		<option disabled selected value="0" style="display: none">- Seleccionar -</option>${MODULOS}</select>
		<small class="form-text text-danger"></small>
		</div>
	</form>`;
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Editar Modulo`,
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
				var boleano = true;
				$('#modalFormulario small').hide();

				if($('#nombre').val()==''){  
				$('#nombre').siblings('small').text('*Campo requerido').show();
				boleano = false;
				}

				if($('#url').val()==''){
				$('#url').siblings('small').text('*Campo requerido').show();
				boleano = false;
				}

				if (boleano) {
					$.ajax({
						type:`POST`,
						url: 'editSubModulo2',
						data:{
							id: id,
							nombre: $('#nombre').val(),
							icon: '',
							url: $('#url').val(),
							modulo: $('#modulo').val(),
						},success:function (payload) {
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
				}
			}
		}]
	});
}
