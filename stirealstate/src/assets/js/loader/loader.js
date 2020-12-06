var     obj = {}, someBlock = $('body');

    function getValues() {
        obj.textVal = "Espere.";
        obj.percentVal = $('#percentInput').val();
        obj.durationVal = $('#durationInput').val();
    }

    function startLoader(whereLoad){
        someBlock = $(whereLoad);
        getValues();
        someBlock.preloader({
            text: obj.textVal,
            percent: obj.percentVal,
            duration: obj.durationVal
        });
        $('.form-control').each(function(k,v) {
            if (v.value.length == 0) $(v).attr('disabled', true);
        });
    }

    function stopLoader(){
        someBlock.preloader('remove');
    }