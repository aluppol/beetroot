//add: autocmplete

let map, markerFrom, geocoder, trafficLayer, transitLayer, markerTo, pinMarkerTo = {}, directionsService, directionsRenderer;

document.getElementById('to').focus();

document.addEventListener('click', (e)=>{
    if(!e.target) return;

    if(e.target.closest('#currentLocation')) {
        setCurrentPosition();
        return;
    }
})


document.addEventListener('dragend', (e)=>{
    console.log(e.target);
    if(e.target == document.body.querySelector('img[src="img/cur-marker.gif"]')) {
        setCurrentPosition(markerFrom.getPosition());
    }
})


document.forms.navigator.addEventListener('submit',(e)=>{
    e.preventDefault();
    calcRoute();
});


document.addEventListener('mousedown', (e)=>{

    if(!e.target) return;

    if(e.target == document.getElementById('map').querySelector('div[style="z-index: 3; position: absolute; height: 100%; width: 100%; padding: 0px; border-width: 0px; margin: 0px; left: 0px; top: 0px; touch-action: pan-x pan-y;"]')){

        // console.log('started');
        pinMarkerTo.timer = setTimeout(()=>{

            markerTo.setMap(null);
            markerTo.setPosition(pinMarkerTo.event.latLng);
            markerTo.setMap(map);
            markerTo.setAnimation(google.maps.Animation.DROP);
            setTargetPosition(pinMarkerTo.event.latLng);
            // console.log('pined');
        
        }, 700);
    }

    if(e.target.closest('img[src="img/cur-marker.gif"]')){
        e.target.closest('img[src="img/cur-marker.gif"]').addEventListener('mouseup', setDropAddresFrom);
    }

    if(e.target.closest('img[src="img/to-marker.gif"]')){
        e.target.closest('img[src="img/to-marker.gif"]').addEventListener('mouseup', setDropAddresTo);
    }

});

document.addEventListener('mouseup', (e)=>{
    pinMarkerTo.event = null;
    clearTimeout(pinMarkerTo.timer);
});

function calcRoute() {
    let start = document.getElementById('from').value,
        end = document.getElementById('to').value,
        request = {
            origin:start,
            destination:end,
            travelMode: 'WALKING'
        };
    directionsService.route(request, function(response, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(response);

        geocoder.geocode( { 'address': start}, function(results, status) {
            if (status == 'OK') {
                let pos = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
                markerFrom.setPosition(pos);
            }
        });

        geocoder.geocode( { 'address': end}, function(results, status) {
            if (status == 'OK') {
                let pos = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
                markerTo.setPosition(pos);
            }
        });
        }
    });
}


function setDropAddresTo(e){
    setTargetPosition(markerTo.getPosition());
    e.target.removeEventListener('mouseup', setDropAddresTo);
}


function setDropAddresFrom(e){
    setCurrentPosition(markerFrom.getPosition());
    e.target.removeEventListener('mouseup', setDropAddresFrom);
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 47.095909, lng: 37.546490},
        zoom: 16,
        
        // mapTypeId: 'satellite'
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsRenderer.setMap(map);

    trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);

    markerFrom = new google.maps.Marker({
        position: {lat: 47.095909, lng: 37.546490},
        map: map,
        draggable: true,
        icon: {
            url: 'img/cur-marker.gif',
            scaledSize: new google.maps.Size(50,50)
        },
       
        animation: google.maps.Animation.DROP,
    });

    markerTo = new google.maps.Marker({
        position: {lat: 47.095909, lng: 37.546490},
        map: map,
        draggable: true,
        icon: {
            url: 'img/to-marker.gif',
            scaledSize: new google.maps.Size(70,70)
        },
       
        animation: google.maps.Animation.DROP,
    });


    setCurrentPosition();

    map.addListener('mousemove', (e)=>{
        pinMarkerTo.event = e;
    });

    map.addListener('drag', (e)=>{
        pinMarkerTo.event = null;
        clearTimeout(pinMarkerTo.timer);
    });

    geocoder = new google.maps.Geocoder();
}


function setTargetPosition(pos){
    if(pos) {
        geocoder.geocode({'location': pos}, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
               document.getElementById('to').value = results[0].formatted_address;
               if(document.getElementById('from').value) calcRoute();
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}


function setCurrentPosition(pos){

    if(pos){
        geocoder.geocode({'location': pos}, function(results, status) {
            if (status === 'OK') {
              if (results[0]) {
               document.getElementById('from').value = results[0].formatted_address;
               if(document.getElementById('to').value) calcRoute();
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
        });
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // console.log(position);

            map.setCenter(pos);
            markerFrom.setPosition(pos);
            

            geocoder.geocode({'location': pos}, function(results, status) {
                if (status === 'OK') {
                  if (results[0]) {
                   document.getElementById('from').value = results[0].formatted_address
                  } else {
                    window.alert('No results found');
                  }
                } else {
                  window.alert('Geocoder failed due to: ' + status);
                }
            });

        }, function() {
            alert('Error occurs!');
        });

    } else {
        alert("Your browser doesn't support geolocation!");
    }
}
