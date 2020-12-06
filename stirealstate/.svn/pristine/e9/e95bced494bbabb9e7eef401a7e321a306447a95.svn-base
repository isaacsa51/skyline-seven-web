var BASE_URL = $('#BASE_URL').val(); 

// ------------------------------------------------------  MENÚ  --------------------------------------------------------
$('.menu-modulo').click(function(event) {
  event.preventDefault();
  // if ($(this).parent('li').hasClass('active')) {
  //   _this = $(this);
  //   setTimeout(function(){_this.parent('li').removeClass('active').children('a').removeClass('modulo-seleccionado');},150);
  //   $(this).siblings('ul').slideUp(155);
  // }
  // else{
  //   $('.active').children('ul').slideUp(150);
  //   $('#menu').children('.active').removeClass('active').children('a').removeClass('modulo-seleccionado');
  //   $(this).parent('li').addClass('active').children('a').addClass('modulo-seleccionado');
  //   $(this).siblings('ul').slideDown(200);
  // }

});

$('.icon-menu').click(function(event) {
  console.log('click xd');
  console.log($('.cd-side-nav').css('width'));
  if ($('.cd-side-nav').css('width') != '0px') {
    $('.cd-side-nav').css('width', '0');
  }
  else{
    $('.cd-side-nav').css('width', '100%');
  }
});

// ------------------------------------------------------  MENÚ  --------------------------------------------------------

function modalPrimary(mensaje){
  BootstrapDialog.show({
  cssClass: 'notoficacionDialog',
    size: BootstrapDialog.SIZE_NORMAL,
    type: BootstrapDialog.TYPE_PRIMARY,
    title: 'Notificacion',
    message: '<div class="row"><div class="form-group col-md-12" style="text-align: center;"><h2>'+mensaje+'</h2></div></div>' ,
    buttons: [{
        label: 'Cerrar',
        cssClass: 'btn-primary',
        action: function(dialogItself) 
        {
          dialogItself.close();
        }
    }
    ]
  });
}


function modalInfo(mensaje){
	BootstrapDialog.show({
	cssClass: 'notoficacionDialog',
	  size: BootstrapDialog.SIZE_NORMAL,
	  type: BootstrapDialog.TYPE_INFO,
	  title: 'Notificacion',
	  message: '<div class="row"><div class="form-group col-md-12" style="text-align: center;"><h2>'+mensaje+'</h2></div></div>' ,
	  buttons: [{
	      label: 'Cerrar',
	      cssClass: 'btn-info',
	      action: function(dialogItself) 
	      {
	        dialogItself.close();
	      }
	  }
	  ]
	});
}


function modalSuccess(mensaje){
	BootstrapDialog.show({
	cssClass: 'notoficacionDialog',
	  size: BootstrapDialog.SIZE_NORMAL,
	  type: BootstrapDialog.TYPE_SUCCESS,
	  title: 'Notificacion',
	  message: '<div class="row"><div class="form-group col-md-12" style="text-align: center;"><h2>'+mensaje+'</h2></div></div>' ,
	  buttons: [{
	      label: 'Cerrar',
	      cssClass: 'btn-success',
	      action: function(dialogItself) 
	      {
	        dialogItself.close();
	      }
	  }
	  ]
	});
}


function modalDanger(mensaje){
	BootstrapDialog.show({
	cssClass: 'notoficacionDialog',
	  size: BootstrapDialog.SIZE_NORMAL,
	  type: BootstrapDialog.TYPE_DANGER,
	  title: 'Notificacion',
	  message: '<div class="row"><div class="form-group col-md-12" style="text-align: center;"><h2>'+mensaje+'</h2></div></div>' ,
	  buttons: [{
	      label: 'Cerrar',
	      cssClass: 'btn-danger',
	      action: function(dialogItself) 
	      {
	        dialogItself.close();
	      }
	  }
	  ]
	});
}


$('body').on('keydown', '.numeroInput', function(event) {
	console.log(event.key);
	if (event.keyCode == 32) {
		return false;
	}
	else if (event.keyCode == 8 || event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40) {

	}
	else{
		var numeros = [1,2,3,4,5,6,7,8,9,0];

		var esNumero = false;

		for (var i = 0; i < numeros.length; i++) {
			if (numeros[i] == event.key) {
				esNumero = true;
				break;
			}
		}

		if (!esNumero) { return false; }
	}
});




var isMobile = window.matchMedia("only screen and (max-width: 700px)").matches; // si es mobile, es true


//  ------------------------   PAGINACIÓN, GENERALES Y EVENTOS  ------------------------------ 

// VARIABLES PARA PAGINACION Y BUSQUEDA
var desde = 0;
// var limite = $('#selectLimite').val();
var limite = 24;
var totalRows = 0;
var paginas = 0;
var paginaActual=1;
var busquedaActual='';

var orderBy = {  // para poder ordenar mediante columnas
  columna: '',
  direction: ''
}

var cargandoTabla = true; // si es true, puede realizar busqueda o filtros por tabla, si es false tiene que esperar a que termine 


$('#selectLimite').change(function(e){
  reiniciarPaginado();
  limite = $(this).val();
  PushTable();
});


function generarPaginas(resultadoTabla){
  $('#paginasTabla').children().remove();
  $('.paginado .paginas').children().remove();
  var contadorMedio = 0; //variable para contar hasta 3 si las paginas se superan de 5
  var paginasIzquierda = 0;
  var paginasDerecha = 0;

  // estos ciclos determinan cuantas paginas habrrá a la izquierda y a la derecha en donde se guardan en las varibales que se usaran en el siguiente ciclo
  // son 3 interacciones por ciclo para que entotal haya 6 mas el que está seleccionado
  for (var x = 3; x >= 1; x--) {  // Se busca primero cuantos elemntos hay en la izquierda
    if(paginaActual-x > 0){  // si hay pagina a la izquierda se agrega
      paginasIzquierda++;
    }
    else{  // si no, se lo pasa a las paginas de la derecha
      paginasDerecha++;
    }
  }

  for (var x = 1; x <= 3; x++) { // se busca elementos de la derecha
    if(paginaActual+x <= paginas){  // si hay pag a la derecha se agrega
      paginasDerecha++;  
    }
    else{ // si no se pasa a la izquierda
      paginasIzquierda++;
    }
  }

  for (var i = 1; i <= paginas; i++) {
    if(i == paginaActual){ // encontró página actual
      if(paginaActual-1 != 0){
        $('.flecha-izquierda').show();
      }
      else{
        $('.flecha-izquierda').hide();
      }

      if (!isMobile) { //  si NO es mobile
        for (var x = paginasIzquierda; x >= 1; x--) {  // imrpime los 3 num anteriores que el seleccionado
          if(paginaActual-x > 0){
            $('.paginas').append('<span class="page-num">'+(i-x)+'</span>');
          }
        }        
      }

      $('.paginas').append('<span class="page-num pagina-actual">'+i+'</span>');  // imprime pagina actual

      if (!isMobile) {    // si NO es mobile
        for (var x = 1; x <= paginasDerecha; x++) { // imrpime los 3 num siguientes que el seleccionado
          if(paginaActual+x <= paginas){
            $('.paginas').append('<span class="page-num">'+(i+x)+'</span>');
          }
        }    
      }

      if(paginaActual != paginas){
        $('.flecha-derecha').show();
      }
      else{
        $('.flecha-derecha').hide();
      }
    }
  }


  $('#resultadoFiltro').text('('+totalRows+')');  // al final, agrega el total al titulo de filtros
  $('#resultadoTabla').text('Resultados del '+(desde+1)+' - '+(desde+resultadoTabla)+' de '+totalRows+' en total');
  // console.log($('td').length);

}


$('.paginas').on('click', '.page-num', function(e){
  // PRIMERO SE CALCULA QUE SE REALIZÓ
  if (cargandoTabla) {
    if(!$(this).hasClass('pagina-actual')){ // si es diferente al que ya esta seleccionado
      desde = ($(this).text() - 1) * limite; // se calclula de donde se va a empezar
      paginaActual = parseInt($(this).text());
      PushTable();
    }
    else{
      e.preventDefault(); // evita que la pagina se vaya arriba
    }
  }
  else{
    console.log('la tabla se está cargando, aguanta poquillo');
    e.preventDefault();
  }

});


$('.flecha-izquierda').click(function(event) {
  paginaActual --;
  desde = (paginaActual - 1) * limite;
  PushTable();
});


$('.flecha-derecha').click(function(event) {
  paginaActual ++;
  desde = (paginaActual - 1) * limite;
  PushTable();
});


function reiniciarPaginado(){
  paginaActual = 1;
  desde = 0;
}


function limpiarInputsBusqueda(){
  $('#buscarInput').val('');
  busquedaActual = '';
}

// ------ si presiona a los 3 puntos de la tabla que esté en mobile
$('#contenido_tabla_mobile').on('click', '.icon-dots-three-vertical', function(){
  if ($(this).siblings('.modal-opciones').css('display') == 'block') {
    $(this).siblings('.modal-opciones').hide();
  }
  else{
    $('.columna-more').children('.modal-opciones').hide();
    $(this).siblings('.modal-opciones').show();
  }
});


// ---------------------------- BUSQUEDA --------------------------

var boleanoKeyup = false; // habilita o deshabilita el keyup

$("#buscarInput").keyup(function(){
  if ($(this).val().length == 0 && boleanoKeyup == true) {  // si boleanokeyup es false, recargará pagina
    busquedaActual = $('#buscarInput').val();
    boleanoKeyup = false;
    reiniciarPaginado();
    PushTable();
  }
});


$('#form-buscar').submit(function(e){
  e.preventDefault();// previene recarga automatica de pagina
  if ($('#buscarInput').val() != busquedaActual) {
    busquedaActual = $('#buscarInput').val();
    boleanoKeyup = true;  // se habilita para cuando se vacio input, se recargue todo solo
    reiniciarPaginado();
    PushTable();
  }
  else
    console.log('la tabla se está cargando, aguanta poquillo');
});



// EVENTO PARA ORDENAMIENTO MEDIANTE COLUMNA
$('.tabla .orderByEvent').click(function(event) {
  if (cargandoTabla) {
      $(this).children('.orderBy').addClass('active');
      setOrderBy();
      console.log(orderBy);
      PushTable();
  }
  else
    console.log('la tabla se está cargando, aguanta poquillo');
}); 

$('.tabla .orderByEvent').hover(function(e) {
  $(this).children('orderBy').css({'color': '#2a88db','box-shadow': 'inset 0px 4px 0 #1784c7'});
}, function() {
  $(this).children('orderBy').css({'color': '','box-shadow': ''});
});

function setOrderBy(){  // busca si hay alguna columna activa para ordenar la tabla mediante esa columna
  if ($('.tabla .orderBy.active').attr('column') != undefined) {
    orderBy.columna = $('.tabla .orderBy.active').attr('column');
    orderBy.direction = $('.tabla .orderBy.active').attr('direction');
    if ($('.tabla .orderBy.active').attr('direction') == 'asc')
      $('.tabla .orderBy.active').attr('direction', 'desc');
    else
      $('.tabla .orderBy.active').attr('direction', 'asc');
  }
}

setOrderBy();

//  ------------------------  PAGINACIÓN ----------------------------------



$(document).click(function(event) { 
    if(!$(event.target).closest('.modal-opciones').length && !$(event.target).closest('.icon-dots-three-vertical').length) {  // si da click fuera de...
      $('.columna-more').children('.modal-opciones').hide();
    }      
});


var esPantalla = window.matchMedia("only screen and (min-width: 1079px)").matches;



// ---------------------------- Mensajes validaciones -----------------------------
function showInvalidFormMsgs(payload){
  let value;
  let keyName;

  for(var item in payload) {
    value = payload[item];
    keyName = item;
    $('#'+keyName).siblings('small').text(value).show();
  }
}


function setStatus(id, status, url){
  $.ajax({
		type:`POST`,
		url,
		data:{
			id,
			status
		},success:function (payload) {
		},error:function(jqXHR, textStatus, errorThrown) {
			modalDanger("Error al cambiar status");
		}
	}); 
}


function deleteRow(id, title, url, successMsg){
	BootstrapDialog.show({
		cssClass: 'notoficacionDialog',
		size: BootstrapDialog.SIZE_NORMAL,
		type: BootstrapDialog.TYPE_DANGER,
		title: 'Confirmación',
		message: '<h3 style="text-align:center;">'+title+'</h3>',
		buttons: [
			{
				label: 'No',
				cssClass: 'btn-danger',
				action: function(dialogItself){
					dialogItself.close();
				}
			},
			{
				label: 'Sí',
				cssClass: 'btn-success',
				action: function(dialogItself){
					$.ajax({
						type: 'POST',
						url: url,
						data:{ id },
						success:function(respuesta){
							PushTable();
							modalSuccess(successMsg);
							dialogItself.close();
						},
						error:function(jqXHR, textStatus, errorThrown){
							modalDanger('Hubo un error al momento de eliminar');
						}
					});
				}
			}
		]
	});
}
