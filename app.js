// Deklarerar de fundamentala variablerna.
const gameStartBtn = document.getElementById("gameStartBtn");
const canvas = document.getElementById("canvas");
const penn = canvas.getContext("2d");
canvas.height = window.innerHeight * 0.6;
canvas.width = window.innerWidth * 0.7;
canvas.mid_height = canvas.height / 2;
canvas.mid_width = canvas.width / 2;
penn.fillStyle = "black";
penn.fillRect(0, 0, canvas.width, canvas.height);


// Intervall och hastighet av kulor.
const FPS = 60;
let speedX = 5;
let speedY = 5;


class player{
    constructor(name, width, height, x, y, health, shield, weapon) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.health = health;
        this.shield = shield;
        this.weapon = weapon;
    }
}

class enemy{
    constructor(name, width, height, x, y, health, shield) {
        this.name = name;
        this.width = width;
        this.health = health;
        this.height = height;
        this.x = x;
        this.y = y;
        this.shield = shield;
    }
}

let sphere = {
    color: "red",
    radius: 20,
    posX: 95,
    posY: canvas.mid_height - (10),
}

// Deklarera spelaren och andra klasser.
const player1 = new player("artistan", 20, 60, canvas.height - 60, 20, 100, 0, false);
const enemy1 = new enemy("cucckck", 20, 60,canvas.height - 60, 20, 100, 0);


// Define keys and an array to keep key states
// Global key log;
var keyState = [];
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
console.log(KEY_DOWN);
console.log(KEY_LEFT);
console.log(KEY_RIGHT);
console.log(KEY_UP);


// Create a logging function
const keyEventLogger =  function (e) {  keyState[e.code] = e.type == 'keydown';}
window.addEventListener("keydown", keyEventLogger);
window.addEventListener("keyup", keyEventLogger);

// Define something to move
const MOVE_SPEED = 5;

// In the main loop;
function executeMoves(object) {
    if (keyState[KEY_UP]) {
        object.posY -= MOVE_SPEED;
    } 
    if (keyState[KEY_DOWN]) {
        object.posY += MOVE_SPEED;
    }
    if (keyState[KEY_LEFT]) {
        object.posX -= MOVE_SPEED;
    }
    if (keyState[KEY_RIGHT]) {
        object.posX += MOVE_SPEED;
    }
}

// Funktioner för klockan vid toppen av skärmen/fönstret.
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
    if (i < 10) {i = "0" + i};  // lägger till 0 framför siffror < 10
    return i;
}


function drawBall(ball) {
    penn.fillStyle = ball.color;
    penn.beginPath();
    penn.arc(ball.posX, ball.posY, ball.radius, 0, 2 * Math.PI);
    penn.closePath();
    penn.fill();
}

function collisionControl(object) {
    
    const isCollidingWithRightSide = (object.posX + object.radius >= canvas.width);
    const isCollidingWithLeftSide = (object.posX - object.radius <= 0);
    const isCollidingWithFloor = (object.posY + object.radius >= canvas.height);
    const isCollidingWithRoof = (object.posY - object.radius <= 0);

    // Denna if-sats kontrollerar om rutan nått botten och vänder i så fall på
    // hastigheten, i y-led, så den riktas uppåt.
    if (isCollidingWithFloor) {
        object.posY = canvas.height - object.radius;
        speedY = -speedY;
    }
    else if (isCollidingWithRightSide) {
        object.posX = canvas.width - object.radius;
        speedX = -speedX;
    }
    else if (isCollidingWithLeftSide) {
        object.posX = 0 + object.radius;
        speedX = -speedX;
    }
    else if (isCollidingWithRoof) {
        object.posY = 0 + object.radius;
        speedY = -speedY;
    }
}

function clearCanvas() {
    penn.fillStyle = "rgba(0, 0, 0, 0.3)";
    penn.fillRect(0, 0, canvas.width, canvas.height);
}

// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
function update() {
    clearCanvas()
    executeMoves(sphere)
    drawBall(sphere)
    collisionControl(sphere)
}

// setInterval kör en funktion med jämna mellanrum.
// Argument 1 är funktionen som ska köras.
// Argument 2 är hur många millisekunder det ska vara mellan körningarna.

gameStartBtn.addEventListener("click", gameStart);

function gameStart() {
    requestAnimationFrame(update);
}

