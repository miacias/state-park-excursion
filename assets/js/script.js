
// NATIONAL PARK SERVICES API
const stateParkapiKey = "CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8"
var stateParkFetchBtn = document.getElementById('fetch-park-info');

function getStateParkAPI() {
    var requestURL= 'https://developer.nps.gov/api/v1/parks?&api_key=CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8';

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
    console.log(data)
    })
}

stateParkFetchBtn.addEventListener('click', getStateParkAPI);



// IMAGE CAROUSEL CONTROLS
// DOMContentLoaded: loads safely after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('.carousel');
    // built-in Materialize: full size images, 4s duration, number of showing images
    var options = {
        fullWidth: true,
        duration: 100,
        numVisible: 1,
    };
    var instances = M.Carousel.init(carousel, options);
    // change picture every X milliseconds
    setInterval(function() {
        instances.next();
    }, 8000)
});

// SLIDER CONTROLS
// document.addEventListener('DOMContentLoaded', function() {
//     var slider = document.querySelector('.slider');
//     var options = {
//         indicators: false,
//         duration: 100,
//     }
//     var instances = M.Slider.init(slider, options);
//     setInterval(function() {
//         instances.next();
//     }, 8000)
//   });

// STATES LIST AUTOCOMPLETE
    // attempting to use import to be able to put states in separate JS file
    // import { statesOptions } from ('./us-states.js');
    // const { statesOptions } = from ('./us-states.js');
document.addEventListener('DOMContentLoaded', function() {
    var usState = document.querySelector('.autocomplete-state');
    const statesOptions = {
        data: {
            AL: null,
            AK: null,
            AZ: null,
            AR: null,
            CA: null,
            CO: null,
            CT: null,
            DE: null,
            FL: null,
            GA: null,
            HI: null,
            ID: null,
            IL: null,
            IN: null,
            IA: null,
            KS: null,
            KY: null,
            LA: null,
            ME: null,
            MD: null,
            MA: null,
            MI: null,
            MN: null,
            MO: null,
            MT: null,
            NE: null,
            NV: null,
            NH: null,
            NJ: null,
            NM: null,
            NY: null,
            NC: null,
            ND: null,
            OH: null,
            OK: null,
            OR: null,
            PA: null,
            RI: null,
            SC: null,
            SD: null,
            TN: null,
            TX: null,
            UT: null,
            VT: null,
            VA: null,
            WA: null,
            WV: null,
            WI: null,
            WY: null
        },
        limit: 3
    }
    var instances = M.Autocomplete.init(usState, statesOptions);
});


// PARK NAMES LIST DROPDOWN
document.addEventListener('DOMContentLoaded', function() {
    var parkNames = document.querySelector('#park-names-dropdown');
    var instances = M.Dropdown.init(parkNames, options);
});

// MODAL TRIGGER AND CONTROL
// park info
document.addEventListener('DOMContentLoaded', function() {
    var parkInfoModal = document.querySelector('#modal1');
    var instances = M.Modal.init(parkInfoModal);
  });







  var storedValue = localStorage.getItem("key");

console.log(storedValue);



//javascript.js
//set map options
var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);