$(".dialog").before("<div class='dialogBlack'></div>");
$(".dialog").prepend('<div id="close"><i class="fa fa-times"></i></div>');

function dialogMensaje() {
  $(".dialogBlack").css("opacity", "0.75");
  $(".dialogBlack").css("z-index", "2250");
  setTimeout(function() {
    $(".dialog").css("display", "block");
    $(".dialog p, .dialog h2").css("opacity", "1");
    $("#close").css("opacity", "1");
    $("#okButton").css("opacity", "1");
    $(".dialog").css("height", "auto");
    $(".dialog").css("width", "300px");
    $(".dialog").css("padding", "0px");
    $(".dialog").css("padding-bottom", "15px");
    $(".dialog").addClass("bounceIn");
    $(".dialog").css("opacity", "1");
  }, 100);
}

$(".dialog #close, .dialog #okButton, .dialogBlack").click(function() {
  $(".dialog").addClass("bounceOut");
  setTimeout(function() {
    $(".dialogBlack").css("opacity", "0");
    $(".dialogBlack").css("z-index", "-5");
  }, 400);
  setTimeout(function() {
    $(".dialog").css("opacity", "0");
    $(".dialog").css("display", "none");
    $(".dialog").removeClass("bounceOut");
  }, 800);
});


$(".formulario-servicios").before("<div class='formulario-serviciosBlack'></div>");

function dialogServicios() {
  $(".formulario-serviciosBlack").css("opacity", "0.75");
  $(".formulario-serviciosBlack").css("z-index", "2250");
  setTimeout(function() {
    $(".formulario-servicios").css("opacity", "1");
    $(".formulario-servicios").css("display", "block");
    $(".formulario-servicios").addClass("fadeIn");
  }, 100);
}

$(".formulario-servicios #enviado, .formulario-servicios #cerrar, .formulario-serviciosBlack").click(function() {
  $(".formulario-servicios").addClass("fadeOut");
  setTimeout(function() {
    $(".formulario-serviciosBlack").css("opacity", "0");
    $(".formulario-serviciosBlack").css("z-index", "-5");
  }, 400);
  setTimeout(function() {
    $(".formulario-servicios").css("opacity", "0");
    $(".formulario-servicios").css("display", "none");
    $(".formulario-servicios").removeClass("fadeOut");
    $(".inner-content").css("left", "0");
  }, 800);
});


$(".ticket-recibido").before("<div class='ticket-recibidoBlack'></div>");

function dialogTicket() {
  $(".ticket-recibidoBlack").css("opacity", "0.75");
  $(".ticket-recibidoBlack").css("z-index", "2250");
  setTimeout(function() {
    $(".ticket-recibido").css("opacity", "1");
    $(".ticket-recibido").css("display", "block");
    $(".ticket-recibido").addClass("fadeIn");
  }, 100);
}

/*
$(".ticket-recibido #aceptar, .ticket-recibidoBlack").click(function() {
  $(".ticket-recibido").addClass("zoomOut");
  setTimeout(function() {
    $(".ticket-recibidoBlack").css("opacity", "0");
    $(".ticket-recibidoBlack").css("z-index", "-5");
  }, 400);
  setTimeout(function() {
    $(".ticket-recibido").css("opacity", "0");
    $(".ticket-recibido").css("display", "none");
    $(".ticket-recibido").removeClass("zoomOut");
  }, 800);
});*/