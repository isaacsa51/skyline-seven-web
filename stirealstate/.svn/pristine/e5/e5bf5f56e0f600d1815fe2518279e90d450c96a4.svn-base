<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>
</head>
<body>
    <div>
        <form class="form-horizontal" id="login">
            <div class="modal-input una-columna">
                    <label class="col-form-label mr-2 control-label">Usario</label>
                    <input type="text" maxlength="70" id="user" name="user" class="form-control texto">
                    <small class="form-text text-danger"></small>
            </div>
            <div class="modal-input una-columna">
                    <label class="col-form-label mr-2 control-label">Contraseña </label>
                    <input type="text" maxlength="70" id="pass" name="pass" class="form-control texto">
                    <small class="form-text text-danger"></small>
            </div>
            <button type="submit">Iniciar sesion</button>
        </form>
    </div>
<br><br>
    <div>
        <form class="form-horizontal" id="nuevoAsociado">
            <div class="modal-input una-columna">
                <label class="col-form-label mr-2 control-label">Nombre(s) </label>
                <input type="text" maxlength="70" id="nombre" name="nombre" class="form-control texto">
                <small class="form-text text-danger"></small>
            </div>
            <div class="modal-input una-columna">
                <label class="col-form-label mr-2 control-label">Apellidos </label>
                <input type="text" maxlength="70" id="apellido" name="apellido" class="form-control texto">
                <small class="form-text text-danger"></small>
            </div>
            <div class="modal-input dos-columnas">
                <label class="col-form-label mr-2 control-label">No. Asociados </label>
                <input type="number" id="num_asociado" name="num_asociado" class="form-control texto">
                <small class="form-text text-danger"></small>
            </div>
            <div class="modal-input una-columna">
                <label class="col-form-label mr-2 control-label">Correo</label>
                <input type="text" maxlength="70" id="email" name="email" class="form-control texto">
                <small class="form-text text-danger"></small>
            </div>
            <div class="modal-input una-columna">
                <label class="col-form-label mr-2 control-label">Contraseña </label>
                <input type="password" maxlength="30" id="password" name="password" class="form-control texto">
                <small class="form-text text-danger"></small>
            </div>
            <div class="modal-input una-columna">
                <label class="col-form-label mr-2 control-label">Confirmar contraseña </label>
                <input type="password" maxlength="30" id="confirm_password" name="confirm_password" class="form-control texto">
                <small class="form-text text-danger"></small>
            </div>
            <button type="submit">Crear cuenta</button>
        </form>
    </div>
</body>
</html>

<script src="<?php echo base_url('assets/js/lib/jquery.min.js'); ?>"></script>

<script>
    $('#nuevoAsociado').submit(function(e){
        e.preventDefault();
        $('#nuevoAsociado small').hide();

        $.ajax({
            type:`POST`,
            url: 'Asociados/addAsociado',
            data: $('#nuevoAsociado').serialize(),
            success:function (payload) {
                payload = JSON.parse(payload);
                
                if(payload.invalid){
                    showInvalidFormMsgs(payload.invalid);
                }
                else{
                    console.log('creado');
                    $('#nuevoAsociado')[0].reset();
                }
            },error:function(jqXHR, textStatus, errorThrown) {

            }
        });
    });

    $('#login').submit(function(e){
        e.preventDefault();
        $('#login small').hide();

        $.ajax({
            type:`POST`,
            url: 'Asociados/login',
            data: $('#login').serialize(),
            success:function (payload) {
                payload = JSON.parse(payload);
                
                if(payload.invalid){
                    alert('Usuario o contraseña incorrecta')
                }
                else{
                    window.location = window.location.origin;
                }
            },error:function(jqXHR, textStatus, errorThrown) {

            }
        });
    });

    function showInvalidFormMsgs(payload){
        let value;
        let keyName;

        for(var item in payload) {
            value = payload[item];
            keyName = item;
            $('#'+keyName).siblings('small').text(value).show();
        }
    }

</script>
