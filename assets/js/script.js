/*
1 MIKE: search history creation: HTML
    - IF statment: if history has values (i.e. if it is TRUE), remove ".hide" class from HTML attribute
    - write a function to make search history item appear in HTML container
    - limit list length 4
    - overwrite list as more than 4 items are added (challenge: focus on MVP first)
2 MIA: Search history functionality: SEARCHES AGAIN
    - create localstorage "park-history"
    - push "this-park" into localStorage "park-history"
    - opens map
    - does not add to search history because it already in search history
    - write separate event listener on click
3 JOSH: ensure map displays correctly
*/

// --------------- GLOBAL VARIABLES ---------------

// DOM query selectors
var usState = document.querySelector('.autocomplete-state');
var parkSelections = document.querySelector("#park-list");
var selectionEl = document.getElementById('park-list');
var stateParkFetchBtn = document.getElementById('fetch-park-info');
var carousel = document.querySelector('.carousel');
var clearHistoryBtn = document.querySelector("#clear-history");
var historyCardEl = document.querySelector(".search-history-card-container");
var historyContainerEl = document.getElementById("history-collection");
var map = document.querySelector("#googleMap");
var userAddressEl = document.getElementsByClassName("user-address-input");
var modal = document.getElementById("modal-trigger");

// connects to GoogleMaps autocomplete (switch to user address form input)
var input1 = document.getElementById("from");

// connects to GoogleMaps autocomplete (may not need this)
var input2 = document.getElementById("to");

// --------------- FUNCTIONALITY BELOW ---------------

// DEFAULT PAGE VIEW ON LOAD (not done) COMMENT BACK IN AFTER INTEGRATING MAP
function defaultView() {
    // if carousel is hidden, show it
    carousel.classList.contains("hide") && carousel.classList.remove("hide");
    // if map isn't hidden, hide it
    !map.parentElement.classList.contains("hide") && map.parentElement.classList.add("hide");
    // if modal isn't hidden, hide it
    !modal.classList.contains("hide") && modal.classList.add("hide");
    // if search history is empty, hide history card
    !(localStorage.getItem("park-history")) && historyCardEl.classList.add("hide");
    // if key is set, hide key card

}
defaultView();

// SHOW MAP, HIDE CAROUSEL
function showMap() {
    var mapParent = document.getElementById("map-parent");
    // if the leftmost statement is true, continue, otherwise skip (code does not break)
    // in this case, if all leftmost statements are true, actionable code is executed until code reaches a false statement
    carousel.classList.add("hide");
    mapParent.classList.contains("hide") && mapParent.classList.remove("hide"); // if map is hidden, remove "hide" class
}

// SHOW MODAL
function showModal() {
    modal.classList.contains("hide") && modal.classList.remove("hide"); // if map is hidden, remove "hide" class
}

function stateParkModal() {
    var parkParentEl = document.getElementById("park-info");
    // resets modal to empty before adding new content
    while (parkParentEl.firstChild) {
        parkParentEl.removeChild(parkParentEl.firstChild);
    }
    var parkChildEl = document.createElement("p");
    parkChildEl.textContent = JSON.parse(localStorage.getItem("this-park")).name;
    parkParentEl.appendChild(parkChildEl);

    var openChildEl = document.createElement("p")
    openChildEl.textContent = JSON.parse(localStorage.getItem("this-park")).open;
    parkParentEl.appendChild(openChildEl);
    
    var weatherChildEl = document.createElement("p")
    weatherChildEl.textContent = JSON.parse(localStorage.getItem("this-park")).weather;
    parkParentEl.appendChild(weatherChildEl);

    var feesChildEl = document.createElement("p")
    feesChildEl.textContent = JSON.parse(localStorage.getItem("this-park")).fees;
    parkParentEl.appendChild(feesChildEl);
}

// MAP API CONTROLS

// adds the Google Maps Directions API key securely to HTML
function apiKeyAdder() {
    // locally retrive Google API key
    var storedValue = localStorage.getItem("map-key");
    console.log("Google API key: " + storedValue);
    var apiKeyLink = document.getElementById("api-key");
    var createdLink = "https://maps.googleapis.com/maps/api/js?key=" + storedValue + "&callback=somethingMeaningless&libraries=places";
    apiKeyLink.setAttribute("src", createdLink);
    apiKeyLink.setAttribute("defer", true);
}
apiKeyAdder();

// CLEAR HISTORY AND HIDE CARD
function clearHistory() {
    historyContainerEl.remove();
    historyCardEl.setAttribute("class", "hide");
}

// POPULATE PARK NAMES DROPDOWN FROM LOCALSTORAGE (not done)
function populateParkNames() {
    var parksInState = JSON.parse(localStorage.getItem("all-parks")) || [];
    var count = parksInState ? parksInState.length - 1 : 0; // sets counter to begin at index 0 to match localStorage order
    var parkOption = document.getElementsByClassName(".option");
    var placeholderOption = document.getElementById("placeholder-option");
    // if there are options available, do things
    if (parkOption) {
        // removes all options
        for (const unwantedPark of [...selectionEl]) {
            selectionEl.lastChild.remove();
        }
        // if (!placeholderOption) { // adding this in prevents duplicate placeholders on first search BUT causes error on second search
            // replaces placeholder that was removed
            placeholderOption = document.createElement("option");
            placeholderOption.setAttribute("id", "placeholder-option");
            placeholderOption.setAttribute("value", "");
            placeholderOption.setAttribute("disabled", true);
            placeholderOption.setAttribute("selected", true);
            placeholderOption.textContent = "PARKS";
            selectionEl.appendChild(placeholderOption);
        // } 

    }
    // adds park names to options
    for (const value of parksInState.reverse()) { // fixes order to show A-Z on screen
        var selectOption = document.createElement("option"); // creates option
        selectOption.setAttribute("class", "option"); // adds class of option
        selectOption.setAttribute("value", count); // sets attribute of value number
        selectOption.textContent = value.name + ", " + value.state; // sets name of park
        document.querySelector("option").after(selectOption); // adds new option after last option
        count--; // counter decreases by one
    }
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
}

// NATIONAL PARK SERVICES API (done)

// gets list of parks within a single US state (done)
function getStateParkApi(stateValue) {
    localStorage.removeItem("all-parks");
    var parksInState = [];
    const stateParkApiKey = "CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8"
    var nationalParksServicesURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateValue + "&api_key=" + stateParkApiKey;
    fetch(nationalParksServicesURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (parkData){
        // console.log(parkData)
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
        // console.log(parksInState)
    })
    return parksInState;
}

// PUTS INFORMATION FROM SELECTED PARK INTO LOCALSTORAGE (done)
function selectedPark(indexLocation) {
    let chosenPark = JSON.parse(localStorage.getItem("all-parks"))[indexLocation]
    var onePark = [];
    onePark = JSON.parse(localStorage.getItem("this-park")) || [];
    localStorage.setItem("this-park", JSON.stringify(chosenPark));
    usState.value = ""
    usState.setAttribute("style", "");
    usState.previousElementSibling.classList.remove("active");
    usState.nextElementSibling.nextElementSibling.classList.remove("active");
}

// saves user address to local storage
function saveAddressToStorage() {
    localStorage.setItem('user-address', userAddressEl[0].value);
}

// GOOGLE MAPS CONTROLS
function somethingMeaningless(){

return

}
// calculates route from user to park
function calcRoute() {
    // sets map options (javascript.js)
    var myLatLng = { lat: 39.9526, lng: -75.1652 };
    var mapOptions = {
        center: myLatLng,
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    // creates map
    var googleMap = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    // creates a DirectionsService object to use the route method and get a result for our request
    var directionsService = new google.maps.DirectionsService();

    // creates a DirectionsRenderer object which we will use to display the route
    var directionsDisplay = new google.maps.DirectionsRenderer();

    // binds the DirectionsRenderer to the map
    directionsDisplay.setMap(googleMap);
    var thisParkAddress = JSON.parse(localStorage.getItem("this-park"));
    var request = {
        origin: localStorage.getItem("user-address"),
        destination: `${thisParkAddress.street}, ${thisParkAddress.city}, ${thisParkAddress.state} ${thisParkAddress.zip}`,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // passes the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            // gets distance and time
            const output = document.querySelector('#output');
            // resets modal to empty before adding new content
            while (output.firstChild) {
                output.removeChild(output.firstChild)
            }
            var from = document.createElement("p");
            from.setAttribute("class", "alert-info");
            from.textContent = "From: " + localStorage.getItem("user-address") || "";
            output.appendChild(from);
            var to = document.createElement("p");
            to.textContent = "To: " + request.destination;
            from.append(to);
            var drivingDistance = document.createElement("p");
            drivingDistance.textContent = "Distance: " + result.routes[0].legs[0].distance.text;
            to.append(drivingDistance);
            var drivingDuration = document.createElement("p");
            drivingDuration.textContent = "Duration: " + result.routes[0].legs[0].duration.text;
            drivingDistance.append(drivingDuration);
            // displays route
            directionsDisplay.setDirections(result);
        } else {
            // deletes route from map
            directionsDisplay.setDirections({ routes: [] });
            // centers map in London
            googleMap.setCenter(myLatLng);
            // shows error message
            output.textContent = "Could not retrieve driving distance."
        }
    })

    // creates autocomplete objects for all inputs
    var options = {
        types: ['(cities)']
    }
    // var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
    // var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
}

// --------------- EVENT LISTENERS BELOW ---------------

// shows map and modal after inputs are added
stateParkFetchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    saveAddressToStorage(); // sends inputted user address to local storage
    if (localStorage.getItem("map-key") && localStorage.getItem("user-address") && localStorage.getItem("this-park")) {
        calcRoute(); // activates google map
        showMap();
        stateParkModal();
        showModal();
    }
})

// IMAGE CAROUSEL CONTROLS (done)
document.addEventListener('DOMContentLoaded', function () {
    // built-in Materialize: full size images, 4s duration, number of showing images
    var options = {
        fullWidth: true,
        duration: 100,
        numVisible: 1,
    };
    var instances = M.Carousel.init(carousel, options);
    // change picture every X milliseconds
    setInterval(function () {
        instances.next();
    }, 8000)
});

// CREATE PARK NAMES LIST SELECTOR
document.addEventListener('DOMContentLoaded', function() {
    // var selectionEl = document.querySelectorAll('select');
    M.FormSelect.init(selectionEl);
});

// RETURN VALUE FROM PARK NAMES LIST SELECTOR
parkSelections.addEventListener("change", function (event) {
    event.preventDefault()
    var indexLocation = event.target.value;
    return selectedPark(indexLocation);
})

// MODAL TRIGGER AND CONTROL (needs work)
// park info
document.addEventListener('DOMContentLoaded', function () {
    var parkInfoModal = document.querySelector('#modal1');
    var instances = M.Modal.init(parkInfoModal);
});

// STATES LIST AUTOCOMPLETE (done)
document.addEventListener('DOMContentLoaded', function () {
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
        onAutocomplete: function (stateValue) {
            getStateParkApi(stateValue)
        }
    }
    var instances = M.Autocomplete.init(usState, statesOptions);
});

var instance = M.Autocomplete.getInstance(usState);
// instance.onAutocomplete(function(fill) {
//     console.log(fill)
// })

// TOOLTIP
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
});

// CLEAR SEARCH HISTORY
clearHistoryBtn.addEventListener("click", function() {
    // empties "park-history"
    localStorage.removeItem("park-history");
    // checks if search history is on page
    if (historyContainerEl.hasChildNodes()) {
        clearHistory()
    }
});