$(document).ready(function(e){
	PushTable();
});

function PushTable() {
	$.ajax({
		type: 'POST',
		url: 'Solicitudes/get',
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
				<td>${item.no_solicitud}</td>
				<td>${item.asociado_nombre} ${item.asociado_apellido}</td>
				<td>${item.tipo_solicitud}</td>
				<td>${item.estatus}</td>
				<td>${item.created}</td>
				</tr>`);
			});
		} else {
			$('#contenido_tabla_mobile').children().remove();
			$.each(c.result,function(i,item){
				$('#contenido_tabla_mobile').append(`
				<tr>
					<td class="columna-1">
					<div>${item.no_solicitud}</div>
                    <div>${item.asociado_nombre} ${item.asociado_apellido}</div>
                    <div>${item.created}</div>
                    <div>${item.estatus}</div>
					</td>
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
	setStatus($(this).val(), status, 'Solicitudes/updateStatus');  
});




function prepareToDelete(id, nombre){
	deleteRow( id, `¿Seguro desea eliminar al gerente <b>${nombre}</b>?`, 'Solicitudes/deleteGerente', 'Gerente eliminado' );
}


