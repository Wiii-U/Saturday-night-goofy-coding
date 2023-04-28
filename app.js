// Deklarerar de fundamentala variablerna.
const gameStartBtn = document.getElementById("gameStartBtn");
const canvas = document.getElementById("canvas");
const penn = canvas.getContext("2d");
canvas.height = window.innerHeight * 0.6;
canvas.width = window.innerWidth * 0.7;
canvas.mid_height = canvas.height / 2;
canvas.mid_width = canvas.width / 2;
const ceiling = 0;
const ground = canvas.height;
const bounce = 0;
const gravity = {x: 0, y: 0.1};
penn.fillStyle = "black";
penn.fillRect(0, 0, canvas.width, canvas.height);


// Intervall och hastighet av kulor.
let speedX = 5; // Horizontal speed.
let speedY = 7; // Vertical speed.

// Define something to move
const MOVE_SPEED = 2;

class player{
    constructor(name, color, imagesrc, width, height, posX, posY, yvelocity, xvelocity, health, shield, weapon) {
        this.name = name;
        this.color = color;
        this.image = new Image();
        this.image.src = imagesrc;
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.yvelocity = yvelocity;
        this.xvelocity = xvelocity;
        this.health = health;
        this.shield = shield;
        this.weapon = weapon;
    }
}

class enemy{
    constructor(name, color, width, height, posX, posY, velocity, health, shield) {
        this.name = name;
        this.color = color;
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.velocity = velocity;
        this.health = health;
        this.shield = shield;
    }
}

let bullet = {
    color: "red",
    radius: 10,
    posX: 0,
    posY: 0,
}


// Deklarera spelaren och andra klasser.
let player1 = new player("artistan", "red", 'Images/Greed2.png', 50, 60, 60, 30, 0, 0, 100, 0, false);
let enemy1 = new enemy("cucckck", "red", 30, 60, canvas.width - 60, 30, 0, 100, 0);


// Define keys and an array to keep key states
// Global key log;
const keyState = {};
const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const KEY_SPACE = 'Space';
const KEY_ENTER = 'Enter';

// Create a logging function
const keyEventLogger =  function (e) { 
    keyState[e.code] = e.type == 'keydown';
    console.log(keyState);
}
document.addEventListener('keydown', keyEventLogger);
document.addEventListener('keyup', keyEventLogger);

// In the main loop;
function executeMoves(object) {
    if (keyState[KEY_UP]) {       
        object.posY -= speedY;
    } 
    if (keyState[KEY_DOWN]) {        
        object.posY += speedY;
    }
    if (keyState[KEY_LEFT]) {        
        object.posX -= speedX;
    }
    if (keyState[KEY_RIGHT]) {      
        object.posX += speedX;
    }
    if (keyState[KEY_SPACE]) {
        drawProjectile(bullet);
        bullet.posX += speedX;
    }
}
 
// Funktioner för klockan vid toppen av fönstret.
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
    if (i < 10) {i = "0" + i}; // lägger till 0 framför siffror < 10
    return i;
}

function drawPlayers(object) {
    penn.fillStyle = object.color;
    penn.fillRect(object.posX, object.posY, object.width, object.height);
}

const drawImage = (object) => {
    const image = new Image();
    image.src = object.image.src;
    image.onload = () => {
        penn.drawImage(image, object.posX, object.posY, 200, 200);
    }
}

var playerImage = new Image();
playerImage.src = "Images/Greed2.png";

var playerModel = sprite({
    context: canvas.getContext("2d"),
    width: 64,
    height: 32,
    image: playerImage,
    numberOfFrames: 2,
	ticksPerFrame: 4,
});

function drawPlayerModelLoop() {
    playerModel.update();
    playerModel.render();
    requestAnimationFrame(drawPlayerModelLoop);
}
	
function sprite (options) {

    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;
    
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    
    that.update = function () {

        tickCount += 1;

        if (tickCount > ticksPerFrame) {

            tickCount = 0;
            
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {	
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };
    
    that.render = function () {
    
        // Clear the canvas
        penn.fillStyle = "black";
        penn.fillRect(0, 0, that.width, that.height);
        
        // Draw the animation
        that.context.drawImage(that.image, frameIndex * that.width / numberOfFrames, 0, that.width / numberOfFrames, that.height, player1.posX, player1.posY, that.width / numberOfFrames, that.height);
    };
    
    return that;
}

function isAlive(object) {
    if (object.health <= 0) {
        return false
    }
    else {
        return true
    }
}

function animateGravity(object) {
    object.yvelocity += gravity.y;
    object.xvelocity += gravity.x;
    object.posX += object.xvelocity;
    object.posY += object.yvelocity;
    const g = ground - object.height; // adjust for size
    if(object.posY >= g) {  
        object.posY = g - (object.posY - g); // 
        object.yvelocity = -Math.abs(object.yvelocity) * bounce;
    }
}

function drawProjectile(object) {
    penn.fillStyle = object.color;
    penn.beginPath();
    penn.arc(player1.posX + player1.width, player1.posY + (player1.height/2), object.radius, 0, 2 * Math.PI);
    penn.closePath();
    penn.fill();
}

function collisionControl(object) {
    const isCollidingWithRightSide = (object.posX + object.width >= canvas.width);
    const isCollidingWithLeftSide = (object.posX <= 0);
    const isCollidingWithFloor = (object.posY + object.height >= canvas.height);
    const isCollidingWithRoof = (object.posY <= 0);

    // Denna if-sats kontrollerar om rutan nått botten och vänder i så fall på
    // hastigheten, i y-led, så den riktas uppåt.
    if (isCollidingWithFloor) {
        object.posY = canvas.height - object.height;
    }
    if (isCollidingWithRightSide) {
        object.posX = canvas.width - object.width;
    }
    if (isCollidingWithLeftSide) {
        object.posX = 0;
    }
    if (isCollidingWithRoof) {
        object.posY = 0 + object.height;
    }
}

function clearCanvas() {
    penn.fillStyle = "rgba(0, 0, 0, 0.5)";
    penn.fillRect(0, 0, canvas.width, canvas.height);
}

// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
// mainLoop har alla funktioner i sig, för att effektivisera strukturen och funktionen av de tillsammans.
function mainLoop() {
    if (isAlive(player1)) {
        executeMoves(player1);
        clearCanvas();
        drawPlayers(player1);
        drawPlayerModelLoop();
        animateGravity(player1);
        collisionControl(player1);
        requestAnimationFrame(mainLoop);
    }
    else {
        penn.font = "'30px Cormorant Garamond', serif";
        penn.fillText('YOU ARE DEAD!', 0 , ceiling);
        penn.fillText('Press ENTER to Restart', 0 , ground);
        document.addEventListener('keydown', keyEventLogger);
        if (keyState[KEY_ENTER]) {
            player1.health = 100;
        }
    }
}

// gameStartBtn är en knapp, som kör huvudfunktionen om den klickas.
gameStartBtn.addEventListener("click", mainLoop);