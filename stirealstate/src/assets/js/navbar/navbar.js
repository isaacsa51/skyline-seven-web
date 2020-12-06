$(document).ready(function() {
    $('#openButton').click(function() {
        $(".menu-options__table").addClass('open');
    });

    $('#closeButton').click(function() {
        $(".menu-options__table").removeClass('open');
    });

    $('#submenu__button').click(function() {
        $(".submenu-options__table").toggle('show');
    });

    $(window).scroll(function(){
        if($(window).scrollTop() > .1){
            $(".navbar__container").addClass('fix');
        }else{
            $(".navbar__container").removeClass('fix');
        }
    })
  });