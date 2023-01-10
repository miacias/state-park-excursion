
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
    // loads safely after DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        var carousel = document.querySelector('.carousel');
        var options = {
            fullWidth: true,
            duration: 4000,
            numVisible: 1
        };
        var instances = M.Carousel.init(carousel, options);

        setInterval(function() {
            instances.next();
        }, 8000)
    });