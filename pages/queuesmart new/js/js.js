
  // Steppers
  $(document).ready(function () {
    var navListItems = $('div.setup-panel-2 div a'),
            allWells = $('.setup-content-2'),
            allNextBtn = $('.nextBtn-2'),
            allPrevBtn = $('.prevBtn-2');
  
    allWells.hide();
  
    navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
                $item = $(this);
  
        if (!$item.hasClass('disabled')) {
            navListItems.removeClass('btn-amber').addClass('btn-blue-grey');
            $item.addClass('btn-amber');
            allWells.hide();
            $target.show();
            $target.find('input:eq(0)').focus();
        }
    });
  
    allPrevBtn.click(function(){
        var curStep = $(this).closest(".setup-content-2"),
            curStepBtn = curStep.attr("id"),
            prevStepSteps = $('div.setup-panel-2 div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
  
            prevStepSteps.removeAttr('disabled').trigger('click');
    });
  
    allNextBtn.click(function(){
        var curStep = $(this).closest(".setup-content-2"),
            curStepBtn = curStep.attr("id"),
            nextStepSteps = $('div.setup-panel-2 div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
            curInputs = curStep.find("input[type='text'],input[type='number']"),
            isValid = true;
  
        $(".form-group").removeClass("has-error");


        for(var i=0; i< curInputs.length; i++){
            if (!curInputs[i].validity.valid && !curInputs[i].val()){
                isValid = false;
                $(curInputs[i]).closest(".form-group").addClass("has-error");
            }
        }
  
        if (isValid)
            nextStepSteps.removeClass('disabled');
            nextStepSteps.trigger('click');
    });
  
    $('div.setup-panel-2 div a.btn-amber').trigger('click');
  });

  function initMap(){
    var map = new google.maps.Map(document.getElementById('map_canvas'), {
    center:   new google.maps.LatLng(-12.112551, -77.028301),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom:11
     });
     
     var agencias = [
         {
             'name':'S001', 
             'lat':-12.112551,
             'lng':-77.028301, 
             'title':'Agencia Principal', 
             'direccion':'Jr. Camaná 370, Cercado de Lima'   
         },
         {
             'name':'S002', 
             'lat':-12.0467074, 
             'lng':-77.0805447, 
             'title':'Agencia Argentina', 
             'direccion':'Av. Argentina Nº 2926, Lima'
         },
         {
             'name':'S003', 
             'lat':-12.1553371, 
             'lng':-76.9709161, 
             'title':'Agencia San Juan de Miraflores', 
             'direccion':'Av. De los Héroes 638-A, San Juan de Miraflores'
         }
 
 ];
 
   for (var x in agencias){
      var agencia = agencias[x];
      var location = new google.maps.LatLng(agencia.lat,agencia.lng);
      addMarker(map, agencia.name, location, agencia.title, agencia.direccion);
   }
 }
 
 function addMarker(map, name, location, title, direccion){
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
 
     var contentString = '<div id="content">'+
     '<div id="bodyContent">'+
     '<div class="title">'+ title +'</div>'+
     '<div>'+direccion+'</div>'+
     '<button type="button" data-toggle="modal" data-target="#frameModalBottom" class="btn btn-amber btn-sm" id="ticket_'+name+'">Ticket <i class="fas fa-ticket-alt"></i></button>'+
     '</div>'+
     '</div>';
 
   google.maps.event.addListener(marker,'click', function(){
    if(typeof infowindow != 'undefined') infowindow.close();
       infowindow = new google.maps.InfoWindow({
       content: contentString
    });
      
    infowindow.open(map,marker);
    google.maps.event.addListener(infowindow, 'domready', function() {

      $('#title-modal').text(title);
      $('#direccion-modal').text(direccion);

      // $("#ticket_"+name).on('click',function(){
      //    $( "body" ).append( "<div id="+name+"' class='modal fade bottom'><div class='modal-dialog modal-frame modal-bottom' role='document'><div class='row'><a href='#' class='close-classic'></a><div class='description-body'><div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'><div class='pin'><i class='fa fa-map-marker' aria-hidden='true'></i></div><div class='description'><h4>"+name+" - "+title+"</h4><p>"+direccion+"</p><p>Tickets en espera: 033</p><button class='bot_"+name+"' onClick='javascript:dialogServicios();'>Selecciona un servicio <i class='fa fa-angle-double-right'></i></button></div></div><div class='clearfix'></div></div></div></div></div>" );
      
      //    $("a.close-classic").on('click',function(){
      //      $(".slide_kore").remove();
      //    });
            
      //        serv_total();
                
        // });
    
      });    
        
     
 })


 function serv_total(){

   
  for (var i in servicios_agencias){
   var servicio = servicios_agencias[i];
      serv_call(servicio.codigo, servicio.tipo, servicio.smenu)
}
     
  

 function serv_call(codigo, tipo, smenu){
  var cod = $(".bot_S00"+codigo)

      cod.on('click',function(){  
          
          $('ul.servicios').empty(); 
          
         //var kore = servicios_agencias.slice(1,3)
          var kore = servicios_agencias.slice();

  for(var i=0;i<kore.length;i++){    
  
 //alert('Codigo:' +servicios_agencias[i]["codigo"] + ' Servicio:' + servicios_agencias[i]["tipo"] + ' SubMenu:' + servicios_agencias[i]["smenu"]); 

             var datax = "<li><input type='radio' name='servicios' class='check-label' id='servicio"+servicios_agencias[i]["codigo"]+"' value="+servicios_agencias[i]["smenu"]+" ><label class='label-check'  for='servicio"+servicios_agencias[i]["codigo"]+"'>"+servicios_agencias[i]["tipo"]+"</label></li>";
                    
     $( "ul.servicios").append(datax);

  }
  

    $(".check-label") // select the radio by its id
  .change(function(){ // bind a function to the change event
      if( $(this).is(":checked") ){ // check if the radio is checked
          var val = $(this).val(); // retrieve the value

          var codx = servicios_agencias[val]["codigo"];
          var smx = servicios_agencias[val]["smenu"];
          var tipx = servicios_agencias[val]["tipo"];

      }
  });

          
      });
     
  }     
   
}
  
}
