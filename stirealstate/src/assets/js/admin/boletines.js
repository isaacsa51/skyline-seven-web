$(document).ready(function(e){
	PushTable();
});

function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'Boletines/get',
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
				<td>${item.title}</td>
				<td>${item.description}</td>
				<td>${item.image_name}</td>
				<td>${item.file_name}</td>
				<td>
					<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.title}\', \'${item.description}\')"></i>
					<i class="icon-trash-2 ultimo-icono" onclick="prepareToDelete(${item.id}, \'${item.title}\')"></i>
				</td>
				</tr>`);
			});
		} else {
			$('#contenido_tabla_mobile').children().remove();
			$.each(c.result,function(i,item){
				$('#contenido_tabla_mobile').append(`
				<tr>
					<td class="columna-1">
					<div>${item.title}</div>
					<div>${item.description}</div>
					<div>${item.image_name}</div>
					<div>${item.file_name}</div>
					</td>
					<td class="columna-more">
					<div class="modal-opciones">
						<div class="titulo">Opciones</div>
						<div class="iconos">
						<i class="icon-edit-pencil" title="Editar" onclick="editar(${item.id}, \'${item.title}\', \'${item.description}\')"></i>
						<i class="icon-trash-2 ultimo-icono" onclick="prepareToDelete(${item.id}, \'${item.title}\')"></i>
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
		<label class="col-form-label mr-2 control-label">Titulo</label>
		<input type="text" maxlength="70" id="title" name="title" class="form-control texto" placeholder="Titulo del boletin" >
		<small class="form-text text-danger"></small>
  </div>
  <div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Descripcion </label>
		<input type="text" maxlength="70" id="description" name="description" class="form-control texto" placeholder="Descripcion del boletin" >
		<small class="form-text text-danger"></small>
  </div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Imagen del boletin </label>
		<input type="file" id="boletinImage" name="boletinImage" class="form-control texto"/>
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Archivo del boletin</label>
		<input type="file" id="boletinFile" name="boletinFile" class="form-control texto" >
		<small class="form-text text-danger"></small>
	</div>
	</form>`;
	
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Nuevo boletin`,
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
					contentType: false,
					cache: false,
			  		processData:false,
					url: 'Boletines/addBoletin',
					data: new FormData($('#formulario')[0]),
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
	setStatus($(this).val(), status, 'Gerentes/updateStatus');  
});

function editar(id, title, description) {
	let mesnajemodal = `<form class="form-horizontal" id="formulario" enctype="multipart/form-data">
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Titulo </label>
		<input type="text" maxlength="70" value="${title}" id="title" name="title" class="form-control texto" placeholder="Titulo del boletin" >
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
			<label class="col-form-label mr-2 control-label">Descripcion </label>
			<input type="text" maxlength="70" value="${description}" id="description" name="description" class="form-control texto" placeholder="Descripcion del boletin" >
			<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Imagen del boletin </label>
		<input type="file" id="boletinImage" name="boletinImage" class="form-control texto">
		<small class="form-text text-danger"></small>
	</div>
	<div class="modal-input una-columna">
		<label class="col-form-label mr-2 control-label">Archivo del boletin</label>
		<input type="file" id="boletinFile" name="boletinFile" class="form-control texto">
		<small class="form-text text-danger"></small>
	</div>
  <input type="hidden" name="id" value="${id}" >
	</form>`;

	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_PRIMARY,
		title: `Editar boletin`,
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
					contentType: false,
					cache: false,
			  		processData:false,
					url: 'Boletines/updateBoletin',
					data: new FormData($('#formulario')[0]),
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

function prepareToDelete(id, title){
	deleteRow( id, `¿Seguro desea eliminar el boletin <b>${title}</b>?`, 'Boletines/deleteBoletin', 'Boletin eliminado' );
}

