// GLOBAL VARIABLES LIST: DOM query selectors
var usState = document.querySelector('.autocomplete-state');
var stateParkFetchBtn = document.getElementById('fetch-park-info');


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

// STATES LIST AUTOCOMPLETE
    // attempting to use import to be able to put states in separate JS file
    // import { statesOptions } from ('./us-states.js');
    // const { statesOptions } = from ('./us-states.js');
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
        limit: 3
    }
    var instances = M.Autocomplete.init(usState, statesOptions);
    // var instance = M.Autocomplete.getInstance(usState);
});

usState.addEventListener("change", function(event) {
    event.preventDefault();
    var instance = M.Autocomplete.getInstance(usState);
    if ((event.target.value).length === 2) {
        var stateValue = event.target.value;
        getStateParkApi(stateValue)
    }
})

// NATIONAL PARK SERVICES API




// get list of parks within a single US state
function getStateParkApi(stateValue) {
    var park = [];
    const stateParkApiKey = "CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8"
    var nationalParksServicesURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateValue + "&api_key=" + stateParkApiKey;

    fetch(nationalParksServicesURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
    console.log(data)
    /*
    - make a for loop that loops through data[i] to
        - grab the name of each park
        - grab the fullAddress of each park
        - set data into object
        - how to name the object??
    - set name of each park into dropdown as the object that carries park name and fullAddress variable
    - data[i].addresses[0] is full address object {}
    - address format for GoogleMaps: street, town name, state, zip
        - var street = data[i].addresses[0].line1;
        - var city = data[i].addresses[0].city;
        - var state = data[i].addresses[0].stateCode;
        - var zip = data[i].addresses[0].postalCode;
        - var fullAddress = street + ", " + city + ", " + state + " " + zip;
    - give GoogleMaps the fullAddress after user clicks GO button
    - make sure to pass variable "park" to whatever function needs the park addresses
    */
    for (i = 0; i < data.length; i++) {
        park.push( { // pushes anonymous object to array list
            // name: ,
            street: data.data[i].addresses[0].line1,
            city: data.data[i].addresses[0].city,
            state: data.data[i].addresses[0].stateCode,
            zip: data.data[i].addresses[0].postalCode,
            // does not work
            fullAddress1: `${this.street}, ${this.city} ${this.state}, ${this.zip}`, // template literal (not a string literal) includes spaces and commas
            // does not work
            fullAddress2: [this.street, this.city, this.state, this.zip].join(" ")
        })
    }
    console.log(park)
    })
}

stateParkFetchBtn.addEventListener('click', getStateParkAPI);

// PARK NAMES LIST DROPDOWN
// document.addEventListener('DOMContentLoaded', function() {
//     var parkNames = document.querySelector('#park-names-dropdown');
//     var instances = M.Dropdown.init(parkNames, options);
// });

// MODAL TRIGGER AND CONTROL
// park info
document.addEventListener('DOMContentLoaded', function() {
    var parkInfoModal = document.querySelector('#modal1');
    var instances = M.Modal.init(parkInfoModal);
  });