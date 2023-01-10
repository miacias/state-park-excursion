
// NATIONAL PARK SERVICES API
const stateParkapiKey = "CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8"
var stateParkFetchBtn = document.getElementById('fetch-stateParkInfo');

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
var carousel = document.querySelector('.carousel');
var instance = M.Carousel.getInstance(elems);

// loads safely after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // var elems = document.querySelector('.carousel');
    var options = 20000;
    var instances = M.Carousel.init(carousel, options);
    setInterval(function() {
        instances.next();
    }, 5000)
  });