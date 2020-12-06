var BASE_URL = $('#BASE_URL').val(); 

$(document).ready(function(e){
	PushTable();
});

function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'getModulos',
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
				</td>
				<td class="columna-more">
				<div class="modal-opciones">
				<div class="titulo">Opciones</div>
				<div class="iconos">
				<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id},\'${item.nombre}\')"></i>
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
				<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id},\'${item.nombre}\')"></i>
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
				topic : 'putModulos',
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
				topic : 'putModulos',
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

$('#AgregarModulo').click(function(e) {
	let mesnajemodal= `<form class="form-horizontal" action="">
		<div id="name"><label class="col-form-label mr-2 control-label" id="label_ciudad">Nombre </label>
		<input type="text" maxlength="70" id="nombre" class="form-control texto" placeholder="Nombre de modulo" >
		</div>

		<div id="divestado">
		<label class="font-weight-bold">Unique</label>
		<select class="form-control" id="selectEstadoModal">
		<option disabled selected value="0" style="display: none">- Seleccionar -</option>
		</select>

		<div class="" id="Url">
		<label class="col-form-label mr-2 control-label" id="label_url">Url </label>
		<input type="text" maxlength="70" id="url" class="form-control texto" placeholder="Agregar una Url" >
		<small class="form-text text-danger"></small>
		</div>

		<!--<div id="divestado">
		<label class="font-weight-bold">Unique</label>
		<select class="form-control" id="selectEstadoModal">
		<option disabled selected value="0" style="display: none">- Seleccionar -</option>
		</select>-->

		</div>
	</form>`;
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Modulos`,
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
				if ($('#nombre').val()!= '') {
					$.ajax({
						type:`POST`,
						url: BASE_URL+'Permisos/addModulo',
						data:{
							nombre     : $('#nombre').val(),
							icon: ''
						}, success:function (payload) {
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
						}, error:function(jqXHR, textStatus, errorThrown) {
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
	let mesnajemodal= `<form class="form-horizontal" action="">
		<div id="name"><label class="col-form-label mr-2 control-label" id="label_ciudad">Nombre </label>
		<input type="text" maxlength="70" id="nombre" class="form-control texto" value="${nombre}" >
		</div>
		<!--<div id="divestado">
		<label class="font-weight-bold">Icono</label>
		<select class="form-control" id="selectEstadoModal">
		<option disabled selected value="0" style="display: none">- Seleccionar -</option>
		</select>
		</div>-->
	</form>`;
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
				if ($('#nombre').val()!= '') {
					$.ajax({
						type:`POST`,
						url: BASE_URL+'Permisos/editModulo',
						data:{
							id     : id,
							nombre     : $('#nombre').val(),
							icon:     ''
						},success:function (payload) {
							payload = JSON.parse(payload);
							if(payload.code == "error"){
								modalDanger(payload.message);
							}else{
								PushTable();
								modalSuccess(payload.message);
								dialogItself.close();
							}
						},error:function(jqXHR, textStatus, errorThrown){
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
