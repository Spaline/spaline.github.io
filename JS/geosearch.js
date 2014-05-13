var map;
var service;
var infowindow;
var initialLocation;
var browserSupportFlag =  new Boolean();


function initialize() {

  /*=== Initialize the map ===*/
  initialLocation = new google.maps.LatLng(42.053317, -87.672788);

  var myOptions = {
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: initialLocation
  }
  var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);

  /*=== Get the user's location ===*/

  // // Try W3C Geolocation (Preferred)
  // if(navigator.geolocation) {
  //   browserSupportFlag = true;
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  //     map.setCenter(initialLocation);
  //   }, function() {
  //     handleNoGeolocation(browserSupportFlag);
  //   });
  // }
  // // Browser doesn't support Geolocation
  // else {
  //   browserSupportFlag = false;
  //   handleNoGeolocation(browserSupportFlag);
  // }


  /*=== Create a places request ===*/
  
  var request = {
    location: initialLocation,
    radius: '1500',
    types: ['hair_care', 'beauty_salon']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
    console.log(JSON.stringify(results))
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

  // function handleNoGeolocation(errorFlag) {
  //   if (errorFlag == true) {
  //     alert("Geolocation service failed.");
  //     initialLocation = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
  //   } else {
  //     alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
  //     initialLocation = new google.maps.LatLng(60, 105);
  //   }
  //   map.setCenter(initialLocation);
  // }

google.maps.event.addDomListener(window, 'load', initialize);