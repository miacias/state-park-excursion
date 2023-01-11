
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
            Alabama: null,
            Alaska: null,
            Arizona: null,
            Arkansas: null,
            California: null,
            Colorado: null,
            Connecticut: null,
            Delaware: null,
            Florida: null,
            Georgia: null,
            Hawaii: null,
            Idaho: null,
            Illinois: null,
            Indiana: null,
            Iowa: null,
            Kansas: null,
            Kentucky: null,
            Louisiana: null,
            Maine: null,
            Maryland: null,
            Massachusetts: null,
            Michigan: null,
            Minnesota: null,
            Missouri: null,
            Montana: null,
            Nebraska: null,
            Nevada: null,
            NewHampshire: null, // double-word states need formatting?
            NewJersey: null, // double-word states need formatting?
            NewMexico: null, // double-word states need formatting?
            NewYork: null,  // double-word states need formatting?
            NorthCarolina: null, // double-word states need formatting?
            NorthDakota: null, // double-word states need formatting?
            Ohio: null,
            Oklahoma: null,
            Oregon: null,
            Pennsylvania: null,
            RhodeIsland: null, // double-word states need formatting?
            SouthCarolina: null, // double-word states need formatting?
            SouthDakota: null, // double-word states need formatting?
            Tennessee: null,
            Texas: null,
            Utah: null,
            Vermont: null,
            Virginia: null,
            Washington: null,
            WestVirginia: null, // double-word states need formatting?
            Wisconsin: null,
            Wyoming: null
        },
        limit: 3
    }
    var instances = M.Autocomplete.init(usState, statesOptions);
});

// // PARKS LIST DROPDOWN
// // by name
// document.addEventListener('DOMContentLoaded', function() {
//     var parkNames = document.querySelector('.dropdown-trigger');
//     var instances = M.Dropdown.init(parkNames, options);
// });

// MODAL TRIGGER AND CONTROL
// park info
document.addEventListener('DOMContentLoaded', function() {
    var parkModal = document.querySelector('.modal');
    var instances = M.Modal.init(parkModal);
  });