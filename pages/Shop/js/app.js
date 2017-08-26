// const $form = $("#suscribeForm")
// const $formGroup = $form.find('.form-group')
// const $formControl = $formGroup.find('.form-control')
//
// $form.submit(function (ev) {
//   ev.preventDefault()
//   const error = Math.random() > 0.5;
//   var el;
//   if(error){
//     el = $('<div>', { html: 'Ha ocurrido un error'})
//   }else{
//     el = $('<div>', { html: 'Te enviaremos todas las novedades'})
//   }
// })

function mostrarModal() {
  if(localStorage.noMostrarModal==undefined){ localStorage.noMostrarModal = false }
  const noMostrarModal = JSON.parse(localStorage.noMostrarModal)
  if (!noMostrarModal) {
    $("#modalOferta").modal();
  }

  $("#btnNoRegistrar").click(function noRegistrar(ev) {
    localStorage.noMostrarModal = true;
  })
}

const $filtrosToggle = $('#filtros-toggle')

$filtrosToggle.click(function (ev) {
  ev.preventDefault();
  const $i = $filtrosToggle.find('i.fa')
  const isDown = $i.hasClass('fa-chevron-down')
  if (isDown) {
    $i.removeClass('fa-chevron-down').addClass('fa-chevron-up')
  }else{
    $i.removeClass('fa-chevron-up').addClass('fa-chevron-down')

  }
})
