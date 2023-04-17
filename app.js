const gameStartBtn = document.getElementById("gameStartBtn");
const canvas = document.getElementById("canvas");
const penn = canvas.getContext("2d");
canvas.height = window.innerHeight * 0.6;
canvas.width = window.innerWidth * 0.7;

penn.fillStyle = "black";
penn.fillRect(0, 0, canvas.width, canvas.height);

let sphere = {
    color: "yellow",
    radius: 40,
    posX: 95,
    posY: 50,
}

const FPS = 60;
let speedX = 2;
let speedY = 2;

function drawBall(ball) {
    penn.fillStyle = ball.color
    penn.beginPath();
    penn.arc(ball.posX, ball.posY, ball.radius, 0, 2 * Math.PI);
    penn.closePath();
    penn.fill();
}

function updatePosition(ball) {
    ball.posX += speedX
    ball.posY += speedY
    const isCollidingWithRightSide = (ball.posX + ball.radius >= canvas.width);
    const isCollidingWithLeftSide = (ball.posX - ball.radius <= 0);
    const isCollidingWithFloor = (ball.posY + ball.radius >= canvas.height);
    const isCollidingWithRoof = (ball.posY - ball.radius <= 0);
    // Denna if-sats kontrollerar om rutan nått botten och vänder i så fall på
    // hastigheten, i y-led, så den riktas uppåt.
    if (isCollidingWithFloor) {
        ball.posY = canvas.height - ball.radius;
        speedY = -speedY;
    }
    else if (isCollidingWithRightSide) {
        ball.posX = canvas.width - ball.radius;
        speedX = -speedX;
    }
    else if (isCollidingWithLeftSide) {
        ball.posX = 0 + ball.radius;
        speedX = -speedX;
    }
    else if (isCollidingWithRoof) {
        ball.posY = 0 + ball.radius;
        speedY = -speedY;
    }
}

function clearCanvas() {
    penn.fillStyle = "rgba(0, 0, 0, 0.3)";
    penn.fillRect(0, 0, canvas.width, canvas.height)
}

// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
function update() {
    clearCanvas()
    drawBall(sphere)
    updatePosition(sphere)
}

// setInterval kör en funktion med jämna mellanrum.
// Argument 1 är funktionen som ska köras.
// Argument 2 är hur många millisekunder det ska vara mellan körningarna.

gameStartBtn.addEventListener("click", gameStart);

function gameStart() {
    setInterval(update, 500 / FPS);
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}
  
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}