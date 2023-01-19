var buttonEl = document.getElementById("save-key");
var inputEl = document.getElementsByClassName("map-key-input");
var keyCardEl = document.getElementById("key-card-container");
var goButton = document.getElementById("fetch-park-info");

function saveKeyToStorage() {
    localStorage.setItem('map-key', inputEl[0].value);
}

buttonEl.addEventListener("click", function(event) {
    saveKeyToStorage();
    apiKeyAdder();

    // manages show/hide of key input card
    if (localStorage.getItem("map-key")) {
        if (localStorage.getItem("map-key").length === 39) {
            keyCardEl.classList.add("hide");
            goButton.classList.remove("tooltipped");
        }
    }
    if (!localStorage.getItem("map-key")) {
        keyCardEl.classList.remove("hide");
        goButton.classList.add("tooltipped");
    }
});