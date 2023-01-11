const stateParkapiKey = "CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8"
var stateParkFetchBtn = document.getElementById('fetch-stateParkInfo');
var parkList = document.querySelector('ul');
var state = ""
function getStateParkAPI() {
    var requestURL= 'https://developer.nps.gov/api/v1/visitorcenters?state=' + state + '&api_key=CBfyxbdetzhPX1Eb6AkF8tKog9tRDva0gzXJylB8';

    fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
     console.log(data)
    })

}


stateParkFetchBtn.addEventListener('click', getStateParkAPI);