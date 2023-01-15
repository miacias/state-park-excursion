/*
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
var selectionEl = document.getElementById('park-list');
var stateParkFetchBtn = document.getElementById('fetch-park-info');
var carousel = document.querySelector('.carousel');
var clearHistoryBtn = document.querySelector("#clear-history");
var historyContainerEl = document.getElementById("history-collection");
var map = document.querySelector("#googleMap");
// locally retrive Google API key
var storedValue = localStorage.getItem("key");
console.log("Google API key: " + storedValue);
// connects to GoogleMaps autocomplete (switch to user address form input)
var input1 = document.getElementById("from");
// connects to GoogleMaps autocomplete (may not need this)
var input2 = document.getElementById("to");
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
function populateParkNames() {
    var parksInState = JSON.parse(localStorage.getItem("all-parks")) || [];
    var count = parksInState?parksInState.length - 1: 0; // sets counter to begin at index 0 to match localStorage order
    var parkOption = document.getElementsByClassName(".option")
    if (parkOption) {
        for (const unwantedPark of [...selectionEl]) {
            selectionEl.lastChild.remove();
        }
        var placeholderOption = document.createElement("option", {
            id: "placeholder-option",
            value: "",
            disabled: true,
            selected: true,
            textContent: "Parks"
        });
        selectionEl.appendChild(placeholderOption);
    }
    for (const value of parksInState.reverse()) { // fixes order to show A-Z on screen
        var selectOption = document.createElement("option"); // creates option
        selectOption.setAttribute("class", "option"); // adds class of option
        selectOption.setAttribute("value", count); // sets attribute of value number
        selectOption.textContent = value.name; // sets name of park
        document.querySelector("option").after(selectOption); // adds new option after last option
        count --; // counter decreases by one
    }
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
}
// populateParkNames() // calling on refresh for testing purposes

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
        console.log(parkData)
        parksInState = JSON.parse(localStorage.getItem("all-parks")) || [];
        // resets value to [] instead of localStorage.getItem
        for (const item of parkData.data) {
            if (item.addresses[0].stateCode.toLowerCase() !== stateValue.toLowerCase()) {
                continue;
            }
            // var thing1 = {};
            // item.addresses[0].city.length === 0 ? "nothing" : thing1['city'] = item.addresses[0].city
            // pushes anonymous object of each park to array list
            parksInState.push({ // checks if value exists, then adds a placeholder or the API-provided value
                name: item.name === null ? "One of the best parks in state!" : item.name,
                street: item.addresses[0].line1 === null ? "Please call for directions." : item.addresses[0].line1,
                city: item.addresses[0].city === null ? "" : item.addresses[0].city,
                state: item.addresses[0].stateCode === null ? "" : item.addresses[0].stateCode,
                zip: item.addresses[0].postalCode === null ? "" : item.addresses[0].postalCode,
                open: item.operatingHours.length === 0 ? "Please call for updated hours." : item.operatingHours[0].description,
                monHours: item.operatingHours.length === 0 ? "" : item.operatingHours[0].standardHours.monday,
                tueHours: item.operatingHours.length === 0 ? "" : item.operatingHours[0].standardHours.tuesday,
                wedHours: item.operatingHours.length === 0 ? "" : item.operatingHours[0].standardHours.wednesday,
                thuHours: item.operatingHours.length === 0 ? "" : item.operatingHours[0].standardHours.thursday,
                friHours: item.operatingHours.length === 0 ? "" : item.operatingHours[0].standardHours.friday,
                satHours: item.operatingHours.length === 0 ? "" : item.operatingHours[0].standardHours.saturday,
                sunHours: item.operatingHours.length === 0 ? "" : item.operatingHours[0].standardHours.sunday,
                fees: item.entranceFees.length === 0 ? "Call or visit our site for updated prices!" : item.entranceFees[0].description,
                weather: item.weatherInfo === null ? "" : item.weatherInfo
            }
        )}
        // saves all parks within one state into localStorage as stringified array of objects
        localStorage.setItem("all-parks", JSON.stringify(parksInState));
        populateParkNames()
        console.log(parksInState)
    })
    return parksInState;
}

// GOOGLE MAPS API CONTROLS

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
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
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
    // var selectionEl = document.querySelectorAll('select');
    M.FormSelect.init(selectionEl);
});

// RETURN VALUE FROM PARK NAMES LIST SELECTOR
parkSelections.addEventListener("change", function(event) {
    event.preventDefault()
    var indexLocation = event.target.value;
    console.log("value #: " + indexLocation);
    console.log(instance.getSelectedValues())
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

// CLEAR SEARCH HISTORY
clearHistoryBtn.addEventListener("click", function() {
    // empties "park-history"
    localStorage.clear("park-history");
    // checks if search history is on page
    if (document.querySelector(".collection-item")) {
        // for every item, remove them from the end until empty
        for (const unwantedHistory of [...historyContainerEl]) {
            historyContainerEl.lastChild.remove();
        }
    }
    /*
    - removes children from container
    - restores placeholder text/images
    */
})