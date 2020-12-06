$('#loguear').click(function(){
  LogIn();
});

$('#password').on("keypress", function(e) {
  if (e.keyCode == 13) {
    LogIn();
    return false; 
  }
});

function LogIn() {
  $.ajax({
    type:'POST',
    url: 'Sessions/login',
    data:{
      'user': $('#user').val(),
      'password': $('#password').val()
    }, success:function (payload) {
      payload = JSON.parse(payload);

      if(payload.invalid)
        alert('Usuario o contraseña incorrecta');
      else
        window.location = 'dashboard';

    }, error:function(jqXHR, textStatus, errorThrown) {
      console.log('err');
    }
  });
}

