
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

// IMAGE CAROUSEL
// DOMContentLoaded: loads safely after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('.carousel');
    // built-in Materialize: full size images, 4s duration,
    var options = {
        fullWidth: true,
        duration: 4000,
        numVisible: 1,
    };
    var instances = M.Carousel.init(carousel, options);
    // change picture every X milliseconds
    setInterval(function() {
        instances.next();
    }, 8000)
});


// STATES LIST AUTOCOMPLETE
// import { statesOptions } from './us-states.js';
// const { statesOptions } = from ('./us-states.js');

document.addEventListener('DOMContentLoaded', function() {
    var usState = document.querySelector('.autocomplete-state');
    const statesOptions = {
        data: {
            AL: "Alabama",
            AK: "Alaska",
            AZ: "Arizona",
            AR: "Arkansas",
            CA: "California",
            CO: "Colorado",
            CT: "Connecticut",
            DE: "Delaware",
            FL: "Florida",
            GA: "Georgia",
            HI: "Hawaii",
            ID: "Idaho",
            IL: "Illinois",
            IN: "Indiana",
            IA: "Iowa",
            KS: "Kansas",
            KY: "Kentucky",
            LA: "Louisiana",
            ME: "Maine",
            MD: "Maryland",
            MA: "Massachusetts",
            MI: "Michigan",
            MN: "Minnesota",
            MO: "Missouri",
            MT: "Montana",
            NE: "Nebraska",
            NV: "Nevada",
            NH: "New Hampshire",
            NJ: "New Jersey",
            NM: "New Mexico",
            NY: "New York",
            NC: "North Carolina",
            ND: "North Dakota",
            OH: "Ohio",
            OK: "Oklahoma",
            OR: "Oregon",
            PA: "Pennsylvania",
            RI: "Rhode Island",
            SC: "South Carolina",
            SD: "South Dakota",
            TN: "Tennessee",
            TX: "Texas",
            UT: "Utah",
            VT: "Vermont",
            VA: "Virginia",
            WA: "Washington",
            WV: "West Virginia",
            WI: "Wisconsin",
            WY: "Wyoming"
        },
        limit: 3
    }
    var instances = M.Autocomplete.init(usState, statesOptions);
});

// PARKS LIST DROPDOWN
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelector('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
});