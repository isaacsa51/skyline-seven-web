$(document).ready(function () {
  var currentTab = 0; // Current tab is set to be the first tab (0)
  var endForm = 0;
  showTab(currentTab); // Display the current tab

  $("#nextBtn").click(function () {
    var beneficiado = $("input:radio[name=beneficiado]:checked").val();

    if (beneficiado === "otro") {
      var cuestionario = document.querySelector(
        ".container-cuestionario-solicitar-apoyo"
      );
      var form = document.getElementById("regForm");
      cuestionario.removeChild(form);
      var navegacion = document.getElementById("navegacion-formulario");
      navegacion.remove();
      var footer = document.getElementById("footer-form-custionario");
      footer.remove();

      document.getElementById("cuestionario-container").innerHTML +=
        '<div class="tab"><h1>Element</h1></div>' +
        '<div class="container-no-elegible">' +
        "<h3>No elegible para apoyo</h3>" +
        "<p>Los apoyos de Fondo Naranja son para asociados,  familiares directos o dependientes económicos del asociado.</p>" +
        '<span class="divider-elegibilidad-form"></span>' +
        '<h4 class="tienes-dudas">¿Tienes dudas? Contáctanos</h4>' +
        '<a class="email-no-elegible" href="mailto:ayuda@fondonaranja.com"><i class="far fa-envelope"></i>Envíanos un correo <strong>ayuda@fondonaranja.com</strong></a>' +
        "<span>o</span>" +
        '<a class="tel-no-elegible" href="tel:8000046633"><i class="fas fa-phone-alt"></i>Llámanos <strong>800 004 6633</strong></a>' +
        "</div>" +
        "</div>";
    }

    nextPrev(1);
  });

  $("#prevBtn").click(function () {
    nextPrev(-1);
  });

  $("#enviar-solicitud").click(function () {
    var cuestionario = document.querySelector(
      ".container-cuestionario-solicitar-apoyo"
    );
    var form = document.getElementById("regForm");
    cuestionario.removeChild(form);
    var navegacion = document.getElementById("navegacion-formulario");
    navegacion.remove();
    var footer = document.getElementById("footer-form-custionario");
    footer.remove();

    document.getElementById("cuestionario-container").innerHTML +=
      '<div class="tab-success">' +
      '<div class="container-solicitud-enviada">' +
      '<h3><i class="fas fa-check"></i>Solicitud enviada</h3>' +
      '<p>Tu solicitud ha sido enviada con éxito, podrás ver los detalles de ésta en <a href=""><strong>tu perfil.</strong></a></p>' +
      '<span class="divider-elegibilidad-form"></span>' +
      '<h4 class="tienes-dudas">¿Tienes dudas? Contáctanos</h4>' +
      '<a class="email-no-elegible" href="mailto:ayuda@fondonaranja.com"><i class="far fa-envelope"></i>Envíanos un correo <strong>ayuda@fondonaranja.com</strong></a>' +
      "<span>o</span>" +
      '<a class="tel-no-elegible" href="tel:8000046633"><i class="fas fa-phone-alt"></i>Llámanos <strong>800 004 6633</strong></a>' +
      "</div>" +
      "</div>";
  });

  function showTab(n) {
    var cuestionarioSolicitud = document.getElementsByClassName("cuestionario-solicitar-apoyo");
    if(cuestionarioSolicitud.length){
           // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.opacity = "0.5";
      document.getElementById("prevBtn").setAttribute("disabled", "");
    } else {
      document.getElementById("prevBtn").style.opacity = "1";
      document.getElementById("prevBtn").removeAttribute("disabled");
    }
    if (n == x.length - 1) {
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById(
        "guardar-respuesta-cuestionario-nav"
      ).style.display = "block";
      document.getElementById("guardar-respuesta-cuestionario").style.display =
        "none";
      document.getElementById("enviar-solicitud").style.display = "block";
    } else {
      document.getElementById("nextBtn").style.display = "block";
      document.getElementById("guardar-respuesta-cuestionario").style.display =
        "block";
      document.getElementById(
        "guardar-respuesta-cuestionario-nav"
      ).style.display = "none";
      document.getElementById("enviar-solicitud").style.display = "none";
    }
    // ... and run a function that displays the correct step indicator:
    //fixStepIndicator(n)
    }
  }

  function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    //if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      document.getElementById("regForm").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
  }

  function validateForm() {
    // This function deals with validation of the form fields
    var x,
      y,
      i,
      valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
    return valid; // return the valid status
  }
});
