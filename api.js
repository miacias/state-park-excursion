var buttonEl = document.querySelector("button")
var inputEl = document.querySelector("input")

function saveToStorage() {
localStorage.setItem('key', inputEl.value);

}

buttonEl.addEventListener("click", saveToStorage)