function toggleNavMenu(){
    $('.header').toggleClass('menu-expanded');
    $('.top-menu').toggleClass('collapse');
}

$(window).on('load',function(){
    $('.toggle-nav').click(toggleNavMenu)
});


$('.about').click(function(){
    $('.hidden-panel').slideToggle();
  });

  $('.why').click(function(){
    $('.hidden-panel-why').slideToggle();
  });
$('.hidden-panel-why').click(function(){
    $('.hidden-panel-why').slideUp();
});
  

//API calls

function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}


//Map

function initMap() {
    var french = {lat: 46.227638, lng: 2.213749000000007};
    var canada = {lat: 56.130366, lng: -106.34677099999999};
    var mexican = {lat: 23.634501, lng: -102.55278399999997};

    var styledMapType  = new google.maps.StyledMapType([
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#523735"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#c9b2a6"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#dcd2be"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#ae9e90"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#93817c"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#a5b076"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#447530"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f1e6"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fdfcf8"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f8c967"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#e9bc62"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e98d58"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#db8555"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#806b63"
            }
          ]
        },
        {
          "featureType": "transit",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8f7d77"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#ebe3cd"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dfd2ae"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#b9d3c2"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#92998d"
            }
          ]
        }
      ], {name: 'Styled Map'});

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: french
    });
    
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');


    //FRENCH
    var marker = new google.maps.Marker({
      position: french,
      map: map
    });
    marker.addListener('click', function() {
        var json_obj = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/filter.php?a=French"));
        var randomNumber = Math.floor(Math.random() * json_obj.meals.length) + 0  
        var contentString = "<p>" + json_obj.meals[randomNumber].strMeal + "</p>";
        var infowindowF = new google.maps.InfoWindow({
            content: contentString
          });
        infowindowF.open(map, marker);
      });


    //CANADIAN
    var markerCanada = new google.maps.Marker({
      position: canada,
      map: map
    });
    markerCanada.addListener('click', function() {
        var json_obj = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"));
        var randomNumber = Math.floor(Math.random() * json_obj.meals.length) + 0  
        var contentString = "<p>" + json_obj.meals[randomNumber].strMeal + "</p>";
        var infowindowC = new google.maps.InfoWindow({
            content: contentString
          });
        infowindowC.open(map, markerCanada);
      });

    //MEXICAN
    var markerMexico = new google.maps.Marker({
      position: mexican,
      map: map
    });
    markerMexico.addListener('click', function() {
        var json_obj = JSON.parse(Get("https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican"));
        var randomNumber = Math.floor(Math.random() * json_obj.meals.length) + 0  
        var contentString = "<p>" + json_obj.meals[randomNumber].strMeal + "</p>";
        var infowindowM = new google.maps.InfoWindow({
            content: contentString
          });
        infowindowM.open(map, markerMexico);
      });
}