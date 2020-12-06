var BASE_URL = $('#BASE_URL').val();
var MODULOS='';
var MODULOSX='';
var SUB_MODULOS='';
var SUB_MODULOS2 = '';
var TYPE_USER='';
var MENU = '';
var MENU2 = '';

$(document).ready(function(e){
  $.ajax({
    type: 'POST',
    url: 'getTipoUsuarioMenu',
    data: {
    },success: function(payload) {
      MENU = payload;
    },error:function(jqXHR, textStatus, errorThrown) {
      modalDanger('Hubo un error al cargar la información');
    }
  });
  getTypeUser();
  getModulosx();
  getTipoUsuarioSubModulo2();
});


function getTipoUsuarioSubModulo2(){
  $.ajax({
    type: 'POST',
    url: 'getTipoUsuarioSubModulos2',
    data: {
    },success: function(payload) {
        MENU2 = payload;
    },error:function(jqXHR, textStatus, errorThrown) {
      modalDanger('Hubo un error al cargar la información');
    }
  });
}





function getModulosx() {
	$.ajax({
		type: 'POST',
		url: 'getModulos',
		data: {
			topic: '',
		}, success: function(payload) {
			payload = JSON.parse(payload);
			for (let index = 0; index < payload.length; index++) {
				if(index == 0) {
					MODULOSX += `<option selected value="${payload[index].id}" >${payload[index].nombre}</option>`;
				} else {
					MODULOSX += `<option value="${payload[index].id}" >${payload[index].nombre}</option>`;
				}
			}
		}, error:function(jqXHR, textStatus, errorThrown) {
			modalDanger('Hubo un error al cargar la información');
		}
	});
}







function getModulos() {
  $.ajax({
    type: 'POST',
    url: 'getModulos',
    data: {
    }, success: function(payload) {
      MODULOS=payload;
      getSubModulo();
    }, error:function(jqXHR, textStatus, errorThrown) {
      modalDanger('Hubo un error al cargar la información');
    }
  });
}




function getSubModulo() {
  $.ajax({
    type: 'POST',
    url: 'getSubModulos',
    data: {
    }, success: function(payload) {
      SUB_MODULOS=payload;
      getSubModulo2();
      // PushTable();
    }, error:function(jqXHR, textStatus, errorThrown) {
      modalDanger('Hubo un error al cargar la información');
    }
  });
}

function getSubModulo2() {
  $.ajax({
    type: 'POST',
    url: 'getSubModulos2',
    data: {
    }, success: function(payload) {
      SUB_MODULOS2=payload;
      PushTable();
    }, error:function(jqXHR, textStatus, errorThrown) {
      modalDanger('Hubo un error al cargar la información');
    }
  });
}

function getTypeUser() {
  $.ajax({
    type: 'POST',
    url: 'getTipoUsuarioByStatus',
    data: {
    }, success: function(payload) {
      TYPE_USER=payload;
      getModulos();
    }, error:function(jqXHR, textStatus, errorThrown) {
      modalDanger('Hubo un error al cargar la información');
    }
  });
}


































function PushTable() {
  var global_count=0;
  MENU = JSON.parse(MENU);
  MENU2 = JSON.parse(MENU2);
  console.log('MENU',MENU);
  console.log('TYPE_USER',JSON.parse(TYPE_USER));
  console.log('SUB_MODULOS',JSON.parse(SUB_MODULOS));
  console.log('MODULOS',JSON.parse(MODULOS));
  var exist=false;
  var SUB_MODULOS_STRING='';
  var MODULOS_STRING='';
  Drop();
  TYPE_USER = JSON.parse(TYPE_USER);
  SUB_MODULOS = JSON.parse(SUB_MODULOS);
  MODULOS = JSON.parse(MODULOS);
  SUB_MODULOS2 = JSON.parse(SUB_MODULOS2);
  var NEW_ARRAY = [];
  for (let index = 0; index < TYPE_USER.length; index++) {
    NEW_ARRAY = [];
    SUB_MODULOS_STRING = '';
    MODULOS_STRING = '';
    for (let index3 = 0; index3 < MENU.length; index3++) {
      if (MENU[index3].perfiles_id == TYPE_USER[index].id) {
        NEW_ARRAY.push(MENU[index3].sub_modulos_id);
      }
    }
    for (let index98 = 0; index98 < MODULOS.length; index98++) {
      exist=false;
      SUB_MODULOS_STRING='';
      for (let index2 = 0; index2 < SUB_MODULOS.length; index2++) {
        if(MODULOS[index98].id == SUB_MODULOS[index2].modulos_id) {
          exist=true;
          var verificacion_estatus= false;
          for (let index12 = 0; index12 < NEW_ARRAY.length; index12++) {
            if(SUB_MODULOS[index2].id == NEW_ARRAY[index12]) {
              verificacion_estatus = true;
              break;
            } else {
              verificacion_estatus = false;
            }
          }

          var subModulos2String = ''

          for (let indexSubMod2 = 0; indexSubMod2 < SUB_MODULOS2.length; indexSubMod2++) {
            if(SUB_MODULOS2[indexSubMod2].sub_modulo_id == SUB_MODULOS[index2].id){
              var checkSubmodulo2 = '';
              MENU2.forEach(function(item){
                if(item.sub_modulos2_id == SUB_MODULOS2[indexSubMod2].id && item.perfiles_id == TYPE_USER[index].id){
                  checkSubmodulo2 = 'checked';
                  return false;
                }
              });
              console.log(MENU2);
              subModulos2String += `<li><label><input class="subModulo_2" type="checkbox" name="" ${checkSubmodulo2} value="${TYPE_USER[index].id}-${SUB_MODULOS2[indexSubMod2].id}"> <span>${SUB_MODULOS2[indexSubMod2].nombre}</span></label></li>`;
            }
          }

          SUB_MODULOS_STRING += `<li style="margin-bottom:5px"><label><input class="subModulo_" type="checkbox" name="" value="${TYPE_USER[index].id}-${SUB_MODULOS[index2].id}" ${verificacion_estatus ? 'checked' : ''}> <span>${SUB_MODULOS[index2].nombre}</span></label>
                                 <ul style="margin-left:15px">
                                 ${subModulos2String}
                                 </ul></li>`;
          
        }
      }
      if(exist==false) {
      } else {
        MODULOS_STRING += `<li> 
        <label>
        <!--<input class="modulo_" type="checkbox" name="" value="${index98}">-->
        <span>${MODULOS[index98].nombre}</span>
        </label>
        <ul class="submodulos">
        ${SUB_MODULOS_STRING}
        </ul>
        </li>`;
      }
    }
    $('.lista-tipo-usuario').append(`<li>
    <div>
    <span>${index+1}</span>
    <span>${TYPE_USER[index].nombre}</span>
    <i class="icon-triangle-down detalles rotar"></i>
    </div>
    <ul class="modulos">
    ${MODULOS_STRING}
    </ul>
    </li>`);
  }
}

























function Drop() {
  $('.lista-tipo-usuario li').remove();
}






$('.lista-tipo-usuario').on("click", "input.subModulo_", function(event) {
  if ($(this).is(":checked")) {
    console.log('check',$(this).val());
    var newSplit = $(this).val().split('-');
    console.log(newSplit);
    var typUs = newSplit[0];
    var subMod = newSplit[1];
    $.ajax({
      type:`POST`,
      url: 'postAsignacion',
      data:{
        idTipoUsuario: typUs,
        idSubModulo  : subMod
      }, success:function (payload) {
        console.log(payload);
      }, error:function(jqXHR, textStatus, errorThrown) {
        modalDanger("Error al guardar la información");
      }
    }); 
  } else {
    console.log('not check',$(this).val());
    var newSplit = $(this).val().split('-');
    console.log(newSplit);
    var typUs = newSplit[0];
    var subMod = newSplit[1];
    $.ajax({
      type:`POST`,
      url: 'deleteAsignacion',
      data:{
        idTipoUsuario: typUs,
        idSubModulo  : subMod
      }, success:function (payload) {
        console.log(payload);
      }, error:function(jqXHR, textStatus, errorThrown) {
        modalDanger("Error al guardar la información");
      }
    });  
  }
});


$('.lista-tipo-usuario').on("click", "input.subModulo_2", function(event) {
  if ($(this).is(":checked")) {
    console.log('check',$(this).val());
    var newSplit = $(this).val().split('-');
    console.log(newSplit);
    var typUs = newSplit[0];
    var subMod = newSplit[1];
    $.ajax({
      type:`POST`,
      url: 'postAsignacionSubModulo2',
      data:{
        idTipoUsuario: typUs,
        idSubModulo  : subMod
      }, success:function (payload) {
        console.log(payload);
      }, error:function(jqXHR, textStatus, errorThrown) {
        modalDanger("Error al guardar la información");
      }
    }); 
  } else {
    console.log('not check',$(this).val());
    var newSplit = $(this).val().split('-');
    console.log(newSplit);
    var typUs = newSplit[0];
    var subMod = newSplit[1];
    $.ajax({
      type:`POST`,
      url: 'deleteAsignacionSubModulo2',
      data:{
        idTipoUsuario: typUs,
        idSubModulo  : subMod
      }, success:function (payload) {
        console.log(payload);
      }, error:function(jqXHR, textStatus, errorThrown) {
        modalDanger("Error al guardar la información");
      }
    });  
  }
});






$(document).on('click', '.detalles', function(e) {
  if ($(this).parent('div').siblings('.modulos').css('display') == 'none') {
    $(this).parent('div').siblings('.modulos').slideDown(350);
    $(this).addClass('arriba');
  } else {
    $(this).parent('div').siblings('.modulos').slideUp(350);
    $(this).removeClass('arriba');
  }
});



  $('#addSubModulo').click(function(){
    // window.location.replace(BASE_URL+'Administrador/SubModulos');
  });

  $('#addModulo').click(function(){
    // window.location.replace(BASE_URL+'Administrador/Modulos');
  });


