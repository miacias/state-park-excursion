var buttonEl = document.getElementById("save-key");
var inputEl = document.getElementsByClassName("map-key-input");
var keyCardEl = document.getElementById("key-card-container");

function saveKeyToStorage() {
    localStorage.setItem('map-key', inputEl[0].value);
}

buttonEl.addEventListener("click", function(event) {
    event.preventDefault();
    saveKeyToStorage();
    if (localStorage.getItem("map-key").length === 39) {
        keyCardEl.classList.add("hide");
    }
})