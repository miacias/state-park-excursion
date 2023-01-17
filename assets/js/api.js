var buttonEl = document.getElementById("save-key");
var inputEl = document.getElementsByClassName("map-key-input");

function saveToStorage() {
    localStorage.setItem('map-key', inputEl[0].value);
}

buttonEl.addEventListener("click", function(event) {
    event.preventDefault();
    saveToStorage();
})