let canvas = document.getElementById("canvas");
let width = window.innerWidth
let height = window.innerHeight
canvas.height = height * 0.6
canvas.width = width * 0.7


let context = canvas.getContext("2d");

context.fillStyle = "black";
context.fillRect(0, 0, canvas.width, canvas.height);

let sphere = {
    color: "red",
    width: 30,
    height: 30,
    posX: 10,
    posY: 10,
}

let speedX = 2;
let speedY = 2;

function drawRect(rect) {
    context.fillStyle = rect.color
    context.fillRect(rect.posX, rect.posY, rect.width, rect.height)
}


function updatePosition(rect) {
    rect.posX += speedX
    // Denna if-sats kontrollerar om rutan nått botten och vänder i så fall på
    // hastigheten, i y-led, så den riktas uppåt.
    if (rect.posY + speedY + rect.height > canvas.height) {
        speedY =- speedY
    }
    else if (rect.postX + speedX + rect.width > canvas.width) {
        speedX =- speedX
    }
    else if (rect.posY < 0) {
        speedY += speedY
    }
    
    rect.posY += speedY
}


function clearCanvas() {
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)
}

// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
function update() {
    clearCanvas()
    updatePosition(sphere)
    drawRect(sphere)
}

// setInterval kör en funktion med jämna mellanrum.
// Argument 1 är funktionen som ska köras.
// Argument 2 är hur många millisekunder det ska vara mellan körningarna.
setInterval(update, 10)