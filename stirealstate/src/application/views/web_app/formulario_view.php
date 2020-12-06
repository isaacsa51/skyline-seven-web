<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>formulario</title>
</head>
<body>
    <div>
        <form class="form-horizontal" id="formulario">
        <!-- <p>1. ¿Quién va a ser el beneficiado por el apoyo?</p>
            <input type="radio" id="male" name="pregunta1" value="male">
            <label for="male">Male</label><br>
            <input type="radio" id="female" name="pregunta1" value="female">
            <label for="female">Female</label><br>
            <input type="radio" id="other" name="pregunta1" value="other">
            <label for="other">Other</label><br>
            <input type="radio" id="other2" name="pregunta1" value="other">
            <label for="other2">Other</label><br><br>
            <button type="button" id="next_question">Siguiente</button> -->
        </form>
    </div>
<br><br>

<form action="Solicitudes/newRequest" method="post" id="newRequest">
    <input type="hidden" name="type_request" id="type_request">
</form>

</body>
</html>

<script src="<?php echo base_url('assets/js/lib/jquery.min.js'); ?>"></script>
<script src="<?php echo base_url('assets/js/web_app/questions.js'); ?>"></script>

<script>

var preguntaActual = 'pregunta1';

renderQuestion();

$(document).on('click', '#next_question', function(){
    var respuestaSelected = $('input[name="pregunta"]:checked').val();
    if(respuestaSelected){
        respuestaSelected = questionario[preguntaActual].respuestas[respuestaSelected];

        if(respuestaSelected.destino === 'rejected'){
            renderSolicitudRechazada(respuestaSelected.rejectedMsg);
        }
        else if(respuestaSelected.destino === 'acepted'){
            $('#type_request').val(respuestaSelected.requestType);
            $('#newRequest').submit();
        }
        else{
            cleanAnswerSelecteds(questionario[preguntaActual].respuestas);
            var preguntaAnterior = preguntaActual;
            respuestaSelected.selected = true;
            preguntaActual = respuestaSelected.destino;
            questionario[preguntaActual].lastQuestion = preguntaAnterior;
            renderQuestion();
        }
    }
});

$(document).on('click', '#back_question', function(){
    if(preguntaActual !== 'pregunta1'){
        var lastQuestion = questionario[preguntaActual].lastQuestion;
        cleanAnswerSelecteds(questionario[preguntaActual].respuestas);
        delete questionario[preguntaActual].lastQuestion;
        preguntaActual = lastQuestion;
        renderQuestion();
    }
});

function renderQuestion(){
    $('#formulario').children().remove();
    $('#formulario').append('<p>'+ questionario[preguntaActual].pregunta+'</p>');

    questionario[preguntaActual].respuestas.forEach(function(item, index){
        var checked = item.selected ? 'checked' : '';
        $('#formulario').append('<input type="radio" id="response'+index+'" name="pregunta" value="'+index+'" '+ checked +' ><label for="response'+index+'">'+item.label+'</label><br>');
    });

    $('#formulario').append('<button type="button" id="back_question">Atrás</button> <button type="button" id="next_question">Siguiente</button>')
}

function renderSolicitudRechazada(msg){
    $('#formulario').children().remove();
    $('#formulario').append('<h3>No elegible para apoyo</h3>');
    $('#formulario').append('<p>'+msg+'</p>');
}

function cleanAnswerSelecteds(respuestas){
    respuestas.forEach(function(item, index){
        delete item.selected;
    });
}

</script>
