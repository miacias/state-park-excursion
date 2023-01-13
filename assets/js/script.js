/*
- MIKE: save one park data into localStorage under "this-park"
    - one park can be in this spot, use splice to remove the other one when a user switches park
- save one park ADDRESS into localStorage under "park-address"
    - one park can be in this spot, use splice to remove the other one when a user switches park.
    - grab park address from localStorage keyword "this-park"
- JOSH: save user address data in localStorage under key "user-address"
    - one home address can be in this spot, use splice to remove the other one when a user switches park
- MIA: save search history in localStorage under "park-history"
    - fill search history with last 4 Objects (overwrite when more than 4, i.e. max 4 values)
    - write function to populate the search history buttons as needed
    - write event listener on click
- finish show/hide function
- finish default view function
- modals?!?
    - make button that says "show info" to open modal
    - separate modal into two sections: 
        - (1) gets data from localStorage "this-park" (relevant info)
        - (2) gets data from google maps API call (travel distance and time)
- function to clear history
    - clear localStorage by keyword: "park-history"
    - hide empty buttons
*/
// --------------- GLOBAL VARIABLES ---------------

// DOM query selectors
var usState = document.querySelector('.autocomplete-state');
var parkSelections = document.querySelector("#park-list");
var stateParkFetchBtn = document.getElementById('fetch-park-info');
var carousel = document.querySelector('.carousel');
var map = document.querySelector("#map");
// var parkNamesDropdown = document.querySelector('.dropdown-content');
// var dropdownTrigger = document.querySelector(".dropdown-trigger");


// --------------- FUNCTIONALITY BELOW ---------------


// DEFAULT PAGE VIEW ON LOAD (not done)
function defaultView() {
    /* 
    need to add if statement or adjust if statement with &&:
        - include what if a map was loaded (show map), otherwise show default view below
    */
    if (carousel.classList.contains("hide")) {
        carousel.classList.remove("hide");
    }
    if (!map.classList.contains("hide")) {
        map.classList.add("hide");
    }
}
defaultView();

function populateMap() {
    /*
    - insert Josh's code that shows map address
    */
}

// CHANGES ELEMENTS VISIBLE USING MATERIALIZE
function showMap() {
    // checks if "this-park" and "user-address" exists (implies map is populated), then changes view
    if ((JSON.parse(localStorage.getItem("this-park")) !== null) && (JSON.parse(localStorage.getItem("user-address")) !== null)) {
        carousel.classList.add("hide");
        map.classList.remove("hide");
    }
}

// POPULATE PARK NAMES DROPDOWN FROM LOCALSTORAGE (not done)
function populateParkNames(allParks) {
    var parksInState = JSON.parse(localStorage.getItem("all-parks"));
    var count = parksInState.length - 1; // sets counter to begin at index 0 to match localStorage order
    for (const value of parksInState.reverse()) { // fixes order to show A-Z on screen
        var selectOption = document.createElement("option"); // creates option
        selectOption.setAttribute("value", count); // sets attribute of value number
        selectOption.textContent = value.name; // sets name of park
        document.querySelector("option").after(selectOption); // adds new option after last option
        count --; // counter decreases by one
    }
}
populateParkNames() // calling on refresh for testing purposes

// NATIONAL PARK SERVICES API (done)

// gets list of parks within a single US state (done)
function getStateParkApi(stateValue) {
    localStorage.clear("all-parks");
    var parksInState = [];
    const stateParkApiKey = "CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8"
    var nationalParksServicesURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateValue + "&api_key=" + stateParkApiKey;
    fetch(nationalParksServicesURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (parkData){
    parksInState = JSON.parse(localStorage.getItem("all-parks"));
    // resets value to [] instead of localStorage.getItem
    if (parksInState === null) {
        parksInState = [];
    }
    // ISSUE FOUND: for of loop saves data as one giant array of strings into localStorage.
    // currently unusable at extraction point without further research
    // for (const item of parkData.data) {
    //     var parkFees
    //     if (item.entranceFees.length === 0) {
    //         parkFees = "Call for updated prices!"
    //     } else {
    //         parkFees = item.entranceFees[0].description;
    //     }
    //     if (item.addresses[0].stateCode.toLowerCase() !== stateValue.toLowerCase()) {
    //         continue;
    //     }
    //     // pushes anonymous object of each park to array list
    //     parksInState.push({
    //         name: item.name,
    //         street: item.addresses[0].line1,
    //         city: item.addresses[0].city,
    //         state: item.addresses[0].stateCode,
    //         zip: item.addresses[0].postalCode,
    //         open: item.operatingHours[0].description,
    //         monHours: item.operatingHours[0].standardHours.monday,
    //         tueHours: item.operatingHours[0].standardHours.tuesday,
    //         wedHours: item.operatingHours[0].standardHours.wednesday,
    //         thuHours: item.operatingHours[0].standardHours.thursday,
    //         friHours: item.operatingHours[0].standardHours.friday,
    //         satHours: item.operatingHours[0].standardHours.saturday,
    //         sunHours: item.operatingHours[0].standardHours.sunday,
    //         fees: parkFees,
    //         weather: item.weatherInfo
    //     }
    // )}
    for (var i = 0; i < parkData.data.length; i++) {
        var parkFees
        if (parkData.data[i].entranceFees.length === 0) {
            parkFees = "Call for updated prices!"
        } else {
            parkFees = parkData.data[i].entranceFees[0].description;
        }
        if (parkData.data[i].addresses[0].stateCode.toLowerCase() !== stateValue.toLowerCase()) {
            continue;
        }
        // pushes anonymous object of each park to array list
        parksInState.push({
            name: parkData.data[i].name,
            optionValue: i,
            street: parkData.data[i].addresses[0].line1,
            city: parkData.data[i].addresses[0].city,
            state: parkData.data[i].addresses[0].stateCode,
            zip: parkData.data[i].addresses[0].postalCode,
            open: parkData.data[i].operatingHours[0].description,
            monHours: parkData.data[i].operatingHours[0].standardHours.monday,
            tueHours: parkData.data[i].operatingHours[0].standardHours.tuesday,
            wedHours: parkData.data[i].operatingHours[0].standardHours.wednesday,
            thuHours: parkData.data[i].operatingHours[0].standardHours.thursday,
            friHours: parkData.data[i].operatingHours[0].standardHours.friday,
            satHours: parkData.data[i].operatingHours[0].standardHours.saturday,
            sunHours: parkData.data[i].operatingHours[0].standardHours.sunday,
            fees: parkFees,
            weather: parkData.data[i].weatherInfo
        })
    }
    // saves all parks within one state into localStorage as stringified array of objects
    localStorage.setItem("all-parks", JSON.stringify(parksInState));
    return parksInState;
    })
}

// PARK NAMES LIST DROPDOWN (unused)
// document.addEventListener('DOMContentLoaded', function() {
//     // var parkListItem = document.querySelector(".park-item");
//     var instance = M.Dropdown.getInstance(parkListItem);
//     M.Dropdown.init(dropdownTrigger, {
//         coverTrigger: false,
//         onCloseStart: function() {
//             // parkListItem.addEventListener("change", function(event) {
//             //     console.log(event)
//             // })
//             console.log("hello")

//         }
//     });
// });



// GOOGLE MAPS API CONTROLS
var storedValue = localStorage.getItem("key");

console.log("Google API key: " + storedValue);

// set map options (javascript.js)
var myLatLng = { lat: 38.3460, lng: -0.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// creates map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

// creates a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// creates a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


// defines calcRoute function
function calcRoute() {
//create request

/*
- change origin to localStorage.getItem under keyword "user-address"
- change destination to localstorage.getItem under keyword "park-address"

*/

    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // passes the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            // gets distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            // displays route
            directionsDisplay.setDirections(result);
        } else {
            // deletes route from map
            directionsDisplay.setDirections({ routes: [] });
            // centers map in London
            map.setCenter(myLatLng);

            // shows error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}

// creates autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);


// --------------- EVENT LISTENERS BELOW ---------------

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

// START PARK VIEW
/*
- attach to "go" button
- set localStorage "this-park"
- fetch GoogleMaps travel data
- call showModal()
- call populateModal()
- call showMap() to switch view from image carousel to map
- call populateMap() - google map API from local storage to put on map
*/

// CREATE PARK NAMES LIST SELECTOR
document.addEventListener('DOMContentLoaded', function() {
    var selectionEl = document.querySelectorAll('select');
    M.FormSelect.init(selectionEl, { 
        dropdownOptions: function(parksInState){
            populateParkNames(parksInState)
        }
    });
});

// RETURN VALUE FROM PARK NAMES LIST SELECTOR
parkSelections.addEventListener("change", function(event) {
    event.preventDefault()
    var indexLocation = event.target.value;
    console.log("value #: " + indexLocation);
    return indexLocation;
    /* 
    - is it possible to identify the textContent of the selected item instead of value number???
    */
})

// MODAL TRIGGER AND CONTROL (needs work)
// park info
document.addEventListener('DOMContentLoaded', function() {
    var parkInfoModal = document.querySelector('#modal1');
    var instances = M.Modal.init(parkInfoModal);
});

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