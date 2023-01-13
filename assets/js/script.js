/*
- MIKE: save one park data into localStorage under "this-park"
    - one park can be in this spot, use splice to remove the other one when a user switches park
- save one park ADDRESS into localStorage under "park-address"
    - one park can be in this spot, use splice to remove the other one when a user switches park.
    - grab park address from localStorage keyword "this-park"
- JOSH: save user address data in localStorage under key "user-address"
    - one home address can be in this spot, use splice to remove the other one when a user switches park
- fill dropdown with park names
- save search history in localStorage under "park-history"
    - fill search history with last 4 Objects (overwrite when more than 4, i.e. max 4 values)
    - write function to populate the search history buttons as needed
    - write event listener on click
- finish show/hide function
- finish default view function
- MIA:change HTML
    - combine navbar boxes, remove one of the "go" buttons
    - remove clear home button
- modals?!?
    - make button that says "show info" to open modal
    - separate modal into two sections: 
        - (1) gets data from localStorage "this-park" (relevant info)
        - (2) gets data from google maps API call (travel distance and time)
- function to clear history
    - clear localStorage by keyword: "park-history"
    - hide empty buttons
*/

// GLOBAL VARIABLES LIST: DOM query selectors
var usState = document.querySelector('.autocomplete-state');
var stateParkFetchBtn = document.getElementById('fetch-park-info');
var carousel = document.querySelector('.carousel');
var map = document.querySelector("#map");

// DEFAULT PAGE VIEW ON LOAD (not done)
function defaultView() {
    /*
    if (carousel.hasClass("hide")) {
        - carousel.removeClass("hide");
    }
    - map.removeClass("hide");
    */
}
// defaultView();

// IMAGE CAROUSEL CONTROLS (done)
// DOMContentLoaded: loads safely after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
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

/*
EVENT LISTENER ON PARK SEARCH GO BUTTON
- call showMap() to switch view from image carousel to map
- call populateMap() - google map API from local storage to put on map
*/

function populateMap() {
    /*
    - insert Josh's code that shows map address
    */
}

// CHANGES ELEMENTS VISIBLE USING MATERIALIZE
function showMap() {
    /*
    - if state AND park have values...
        - carousel.addClass("hide");
        - if map.hasClass("hide") {
            - map.removeClass("hide")
        }
    */
}

// STATES LIST AUTOCOMPLETE (done)
document.addEventListener('DOMContentLoaded', function() {
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
        limit: 3,
        onAutocomplete: function(stateValue) { 
            getStateParkApi(stateValue)
        }
    }
    var instances = M.Autocomplete.init(usState, statesOptions);
});

var instance = M.Autocomplete.getInstance(usState);
// instance.onAutocomplete(function(fill) {
//     console.log(fill)
// })

// NATIONAL PARK SERVICES API (needs work, read comments)

// get list of parks within a single US state
function getStateParkApi(stateValue) {
    var park = [];
    const stateParkApiKey = "CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8"
    var nationalParksServicesURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateValue + "&api_key=" + stateParkApiKey;
    fetch(nationalParksServicesURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (parkData){
    // pushes anonymous object to array list (needs work)
    for (const item of parkData.data) {
        var parkFees
        if (item.entranceFees.length === 0) {
            parkFees = "Call for updated prices!"
        } else {
            parkFees = item.entranceFees[0].description;
        }
        if (item.addresses[0].stateCode.toLowerCase() !== stateValue.toLowerCase()) {
            continue;
        }
        park.push({
            name: item.name,
            street: item.addresses[0].line1,
            city: item.addresses[0].city,
            state: item.addresses[0].stateCode,
            zip: item.addresses[0].postalCode,
            open: item.operatingHours[0].description,
            monHours: item.operatingHours[0].standardHours.monday,
            tueHours: item.operatingHours[0].standardHours.tuesday,
            wedHours: item.operatingHours[0].standardHours.wednesday,
            thuHours: item.operatingHours[0].standardHours.thursday,
            friHours: item.operatingHours[0].standardHours.friday,
            satHours: item.operatingHours[0].standardHours.saturday,
            sunHours: item.operatingHours[0].standardHours.sunday,
            fees: parkFees,
            weather: item.weatherInfo
        }
    )}
    console.log(park)
    })
}

// stateParkFetchBtn.addEventListener('click', getStateParkAPI);

// PARK NAMES LIST DROPDOWN (unused)
// document.addEventListener('DOMContentLoaded', function() {
//     var parkNames = document.querySelector('#park-names-dropdown');
//     var instances = M.Dropdown.init(parkNames, options);
// });

// MODAL TRIGGER AND CONTROL (needs work)
// park info
document.addEventListener('DOMContentLoaded', function() {
    var parkInfoModal = document.querySelector('#modal1');
    var instances = M.Modal.init(parkInfoModal);
  });






// // GOOGLE MAPS API CONTROLS
// var storedValue = localStorage.getItem("key");

// console.log(storedValue);



// //javascript.js
// //set map options
// var myLatLng = { lat: 38.3460, lng: -0.4907 };
// var mapOptions = {
//     center: myLatLng,
//     zoom: 7,
//     mapTypeId: google.maps.MapTypeId.ROADMAP

// };

// //create map
// var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

// //create a DirectionsService object to use the route method and get a result for our request
// var directionsService = new google.maps.DirectionsService();

// //create a DirectionsRenderer object which we will use to display the route
// var directionsDisplay = new google.maps.DirectionsRenderer();

// //bind the DirectionsRenderer to the map
// directionsDisplay.setMap(map);


// //define calcRoute function
// function calcRoute() {
//     //create request
/*
- change origin to localStorage.getItem under keyword "user-address"
- change destination to localstorage.getItem under keyword "park-address"

*/

//     var request = {
//         origin: document.getElementById("from").value,
//         destination: document.getElementById("to").value,
//         travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
//         unitSystem: google.maps.UnitSystem.IMPERIAL
//     }

//     //pass the request to the route method
//     directionsService.route(request, function (result, status) {
//         if (status == google.maps.DirectionsStatus.OK) {

//             //Get distance and time
//             const output = document.querySelector('#output');
//             output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

//             //display route
//             directionsDisplay.setDirections(result);
//         } else {
//             //delete route from map
//             directionsDisplay.setDirections({ routes: [] });
//             //center map in London
//             map.setCenter(myLatLng);

//             //show error message
//             output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
//         }
//     });

// }



// //create autocomplete objects for all inputs
// var options = {
//     types: ['(cities)']
// }

// var input1 = document.getElementById("from");
// var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

// var input2 = document.getElementById("to");
// var autocomplete2 = new google.maps.places.Autocomplete(input2, options);