// Deklarerar de fundamentala variablerna.
const gameMenuBtn = document.getElementById('mainMenuBtn');
const pauseBtn = document.getElementById('pauseBtn');
const gameMenu = document.getElementById('gameMenu');
const gameStartBtn = document.getElementById("gameStartBtn");
const canvas = document.getElementById("canvas");
const clock = document.getElementById('clock');
const penn = canvas.getContext("2d");
canvas.mid_height = canvas.height / 2;
canvas.mid_width = canvas.width / 2;
const ceiling = 0;
const ground = canvas.height;
const bounce = 0;
const gravity = {x: 0, y: 0.1};
penn.fillStyle = "white";
penn.fillRect(0, 0, canvas.width, canvas.height);


class player{
    constructor(name, color, image, width, height, posX, posY, yvelocity, xvelocity, health, kills, deaths,shield) {
        this.name = name;
        this.color = color;
        this.image = image;
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.yvelocity = yvelocity;
        this.xvelocity = xvelocity;
        this.health = health;
        this.kills = kills;
        this.deaths = deaths;
        this.shield = shield;
    }
}


class enemy{
    constructor(name, color, width, height, posX, posY, yvelocity, xvelocity, health, shield) {
        this.name = name;
        this.color = color;
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
        this.yvelocity = yvelocity;
        this.xvelocity = xvelocity;
        this.health = health;
        this.shield = shield;
    }
}


class projectile{
    constructor(name, color, width, height, radius, posX, posY, yvelocity, xvelocity) {
        this.name = name;
        this.color = color;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.posX = posX;
        this.posY = posY;
        this.yvelocity = yvelocity;
        this.xvelocity = xvelocity;
    }
}


function mcSprite (options) {

    let that = {},
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
            
            // Om det nuvarande indexet är i intervallet.
            if (frameIndex < numberOfFrames - 1) {	
                // Gå till nästa frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };
    
    that.render = function () {
    
        // Tömma canvasen
        penn.fillStyle = "transparent";
        penn.fillRect(0, 0, that.width/numberOfFrames , that.height);
        
        // Rita animationen
        penn.drawImage(that.image, frameIndex * that.width / numberOfFrames+30, 10, that.width / numberOfFrames, that.height, player1.posX, player1.posY, that.width / numberOfFrames, that.height);
    };
    
    return that;
}


function enemySprite (options) {

    let that = {},
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
            
            // Om det nuvarande indexet är i intervallet.
            if (frameIndex < numberOfFrames - 1) {	
                // Gå till nästa frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    };
    
    that.render = function () {
    
        // Tömma canvasen
        penn.fillStyle = "white";
        penn.fillRect(0, 0, that.width/numberOfFrames , that.height);
        
        // Rita animationen
        penn.drawImage(that.image, frameIndex * that.width / numberOfFrames+30, 10, that.width / numberOfFrames, that.height, player1.posX, player1.posY, that.width / numberOfFrames, that.height);
    };
    
    return that;
}


const LumberJackIdleAnimationImg = new Image();
LumberJackIdleAnimationImg.src = "Images/LumberjackIdleAnimation.png";

const LumberJackIdleAnimation = enemySprite({
    context: canvas.getContext("2d"),
    width: 576,
    height: 140,
    image: LumberJackIdleAnimationImg,
    numberOfFrames: 3,
	ticksPerFrame: 15,
});


const VergilIdleAnimationImg = new Image();
VergilIdleAnimationImg.src = "Images/VergilIdleAnimation.png";

const VergilIdleAnimation = mcSprite({
    context: canvas.getContext("2d"),
    width: 576,
    height: 192,
    image: VergilIdleAnimationImg,
    numberOfFrames: 3,
	ticksPerFrame: 10,
});


// Initialize, spelaren och andra klasser.
const enemy1 = new enemy("Mcucc", "red", 30, 60, canvas.width, 0, 0, 100, 0);
const bowlingBall = new projectile('Sploading Bowling Ball', 'black', 30, 30, 20, 0, 0, 0, 0);
const player1 = new player("Vergil", "red", VergilIdleAnimationImg.src, 130, 167, 60, 0, 0, 0, 100, 0);


function drawPlayerModelLoop(playerModel) {
    playerModel.update();
    playerModel.render();
}

// Define keys and an array to keep key states
// Global key log;
const keyState = {};
const KEY_UP = 'KeyW';
const KEY_DOWN = 'KeyS';
const KEY_LEFT = 'KeyA';
const KEY_RIGHT = 'KeyD';
const KEY_SPACE = 'Space';
const KEY_ENTER = 'Enter';
const LIGHT_ATTACK = 'KeyJ';
const HEAVY_ATTACK = 'KeyK';


//Logging function, för keys.
const keyEventLogger =  function (e) { 
    keyState[e.code] = e.type == 'keydown'; 
}
document.addEventListener('keydown', keyEventLogger);
document.addEventListener('keyup', keyEventLogger);


// Intervall av.
const speedX = 5; // Horizontal speed.
const speedY = 7; // Vertical speed.

// Utför rörelserna på karatärerna
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
    if (keyState[LIGHT_ATTACK]) {

    }
    if (keyState[HEAVY_ATTACK]) {

    }
}

// Tids variabler för Timer.
let startTime;
const startingSeconds = 100;
let time = startingSeconds;

function startCountdown() {
    // Spara starttiden
    startTime = Date.now();
  
    // Starta huvudloopen
    requestAnimationFrame(mainLoop);
}


function drawPlayers(object) {
    penn.fillStyle = object.color;
    penn.fillRect(object.posX, object.posY, object.width, object.height);
}


function randomXToY(minVal, maxVal) {
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}


function drawMobs(mob) {
    penn.fillStyle = mob.color;
    mob.posY = randomXToY(0, canvas.height);
    penn.fillRect(mob.posX, mob.posY, mob.width, mob.height);
}


function updateMobPos(object) {
    object.posX += speedX;
}


const drawImage = (object) => {
    const image = new Image();
    image.src = object.image.src;
    image.onload = () => {
        penn.drawImage(image, object.posX, object.posY, 200, 200);
    }
}


function drawLives() {
    penn.font = "18px Arial";
    penn.fillStyle = "black";
    penn.fillText('HP: '+ player1.health, 0,ceiling)
}


function drawScore() {
    penn.font = "18px Arial";
    penn.fillStyle = "black";
    penn.fillText('Enemys killed: '+ player1.kills, 0, 18);
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
    const g = ground - object.height;
    if(object.posY >= g) {  
        object.posY = g - (object.posY - g); 
        object.yvelocity = -Math.abs(object.yvelocity) * bounce;
    }
}


function drawProjectile(object) {
    penn.fillStyle = object.color;
    penn.beginPath();
    penn.arc(object.posX + object.width, object.posY + (object.height/2), object.radius, 0, 2 * Math.PI);
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
    penn.fillStyle = "rgba(255, 255, 255, 0.5)";
    penn.fillRect(0, 0, canvas.width, canvas.height);
}


function isPaused() {
    if (pauseBtn.clicked == true) {
        return true;
    }
    else {
        return false;
    }
}


function reload() {
    window.location.reload()
}


// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
// mainLoop har alla funktioner i sig, för att effektivisera strukturen och funktionen av de tillsammans.
function mainLoop() {
    // isPaused();
    // while (!isPaused) {
        const elapsedTime = Date.now() - startTime;
        const secondsLeft = startingSeconds - Math.floor(elapsedTime / 1000);
        clock.innerHTML = `${secondsLeft}`;

        if (isAlive(player1) && secondsLeft > 0) {
            executeMoves(player1);
            clearCanvas();

            //UI
            penn.font = "18px Arial";
            penn.fillStyle = "black";
            penn.fillText("HEALTH: "+player1.health,0,18);
            penn.fillText("Enemys killed: "+player1.kills,0,36);
            

            drawPlayers(player1);
            drawPlayerModelLoop(VergilIdleAnimation);
            drawMobs(enemy1);
            updateMobPos(enemy1);
            animateGravity(player1);
            collisionControl(player1);
            collisionControl(enemy1);
            requestAnimationFrame(mainLoop);
        }
        if (secondsLeft <= 0) {
            // Stoppa huvudloopen när nedräkningen når 0
            clearCanvas();
            penn.font = "40px Cormorant Garamond, serif";
            penn.fillStyle = 'black';
            penn.fillText('Press ENTER for Main Menu.', 10, ground);
            document.addEventListener('keypress', function (event) {
                if (event.key == KEY_ENTER) {
                    reload();
                }
            })
        }
    // }
}

gameStartBtn.onclick = function (e) {
    e.preventDefault()

    gameStartBtn.style.display = 'none';
}

gameMenuBtn.onclick = function (e) {
    e.preventDefault()

    gameMenu.style.height = '100%';
}

// gameStartBtn är knappen som kör huvudfunktionen mainloop(), om den klickas.
gameStartBtn.addEventListener("click", startCountdown);