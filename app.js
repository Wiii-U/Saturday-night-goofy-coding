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
const gravity = {x: 0, y: 0.07};
penn.fillStyle = "white";
penn.fillRect(0, 0, canvas.width, canvas.height);


// Intervall av.
const speedX = 3; // Horizontal speed.
const speedY = 5; // Vertical speed.


class player{
    constructor(name, color, image, width, height, posX, posY, yvelocity, xvelocity, health, kills, deaths, shield) {
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
    constructor() {
        this.position = {
            x:0,
            y:0
        }

        this.velocity = {
            x:0,
            y:0
        }

        const image = new Image()
        image.src = 'Images/VergilIdleAnimationLeft.png'
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
        }
        
    }

    draw() {
        if(this.image)
            penn.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}


class projectile{
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.radius = 10
    }

    draw() {
        penn.beginPath()
        penn.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        penn.fillStyle = 'red'
        penn.fill()
        penn.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


class judgementCut{
    constructor({position, duration}) {
        const image = new Image();
        image.src = 'Images/Mirageslash.jpg';

        if (image.complete) {
            this.setImageDimensions(image, position);
        } else {
            image.onload = () => {
                this.setImageDimensions(image, position);
            }
        }

        this.duration = duration;
    }

    setImageDimensions(image, position) { 
        const scale = 3;
        this.image = image;
        this.width = image.width * scale;
        this.height = image.height * scale;
        this.position = position;
    }

    draw() {
        if (this.image) {
            penn.drawImage(
                this.image,
                this.position.x,
                this.position.y - this.height,
                this.width,
                this.height
            );

            // Set a timeout to clear the image after the specified duration
            setTimeout(() => {
                this.clear();
            }, this.duration);
        }
    }

    clear() {
        // Clear the area where the image was drawn
        penn.clearRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
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
        penn.drawImage(that.image, frameIndex * that.width / numberOfFrames+30, 10, that.width / numberOfFrames, that.height, Player.posX, Player.posY, that.width / numberOfFrames, that.height);
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
        penn.drawImage(that.image, frameIndex * that.width / numberOfFrames+30, 10, that.width / numberOfFrames, that.height, Enemy.position.x, Enemy.position.y, that.width / numberOfFrames, that.height);
    };
    
    return that;
}


function randomXToY(minVal, maxVal) {
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}


const VergilIdleAnimationLeftImg = new Image();
VergilIdleAnimationLeftImg.src = "Images/VergilIdleAnimationLeft.png";

const VergilIdleAnimationLeft = enemySprite({
    context: canvas.getContext("2d"),
    width: 576,
    height: 192,
    image: VergilIdleAnimationLeftImg,
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
	ticksPerFrame: 15,
});


function drawPlayerModelLoop(playerModel) {
    playerModel.update();
    playerModel.render();
}


// Initialize, spelaren och andra klasser.
const Enemy = new enemy()
const Player = new player("Vergil", "red", VergilIdleAnimationImg.src, 100, 167, 60, 0, 0, 0, 100, 0, 0, 0);
const projectileArray = [];
const enemyArray = [];


// --- Define keys and an array to keep key states --- Global key log ---//
const keyState = {};
const KEY_UP = 'ArrowUp';
const KEY_DOWN = 'ArrowDown';
const KEY_LEFT = 'ArrowLeft';
const KEY_RIGHT = 'ArrowRight';
const KEY_W = 'KeyW';
const KEY_A = 'KeyA';
const KEY_D = 'KeyD';
const KEY_S = 'KeyS';
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


const keys = {
    a: {
        pressed:false
    },
    d: {
        pressed:false
    },
    w: {
        pressed:false
    },
    s: {
        pressed:false
    },
    space: {
        pressed:false
    },
    enter: {
        pressed:false
    },
    j: {
        pressed:false
    },
    k: {
        pressed:false
    },
    jumping: {
        pressed:false
    }
}

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = true
            break;
        case 'd':
            console.log('right')
            keys.d.pressed = true
            break;
        case 'w':
            console.log('up')
            keys.w.pressed = true
            break;
        case 's':
            console.log('down')
            keys.s.pressed = true
            break;
        case 'j':
            console.log('light_attack')            
            const initialProjectilePosition = {
                x: Player.posX + Player.width + 2,
                y: Player.posY + (Player.height / 2)
            };
            const projectileVelocity = {
                x: 3 + speedX,
                y: 0
            };
            projectileArray.push(new projectile({
                position: initialProjectilePosition,
                velocity: projectileVelocity
            }));
            keys.j.pressed = true
            break;
        case 'k':
            console.log('heavy_attack')
            const judgementCutRange = 300;
            const regularJudgementCut = new judgementCut({
                position: {
                    x: (Player.posX + Player.width) + judgementCutRange,
                    y: canvas.height
                },
                duration: 1000
            });
            regularJudgementCut.draw();
            console.log(regularJudgementCut);
            keys.k.pressed = true
            break;
        case ' ':
            console.log('space')
            keys.space.pressed = true
            break;
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            console.log('left')
            keys.a.pressed = false
            break;
        case 'd':
            console.log('right')
            keys.d.pressed = false
            break;
        case 'w':
            console.log('up')
            keys.w.pressed = false
            break;
        case 's':
            console.log('down')
            keys.s.pressed = false
            break;
        case 'j':
            console.log('light_attack')
            keys.j.pressed = false
            break;
        case 'k':
            console.log('heavy_attack')
            keys.k.pressed = false
            break;
        case ' ':
            console.log('space')
            keys.space.pressed = false
            break;
    }
})

// Utför rörelserna på karatärerna
function executePlayerMoves(object) {
    if (keys.s.pressed && object.posY + object.height <= canvas.height) {
        object.posY += speedY
    }
    else if (keys.w.pressed && object.posY >= 0) {
        object.posY -= speedY
    }
    if (keys.a.pressed && object.posX >=0) {
        object.posX -= speedX
    }
    else if (keys.d.pressed && object.posX + object.width <= canvas.width) {
        object.posX += speedX
    }
    else {
        object.posX += 0
        object.posY += 0
    }
}


// Tids variabler för Timern.
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


function drawLives() {
    penn.font = "18px Arial";
    penn.fillStyle = "black";
    penn.fillText('HP: '+ Player.health, 0,ceiling)
}


function drawScore() {
    penn.font = "18px Arial";
    penn.fillStyle = "black";
    penn.fillText('Enemys killed: '+ Player.kills, 0, 18);
}


function isAlive(object) {
    if (object.health <= 0) {
        return false
    }
    else {
        return true
    }
}


function isPaused() {
    if (pauseBtn.clicked == true) {
        return true;
    }
    else {
        return false;
    }
}


function reset() {
    window.location.reload()
}


// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
// mainLoop har alla funktioner i sig, för att effektivisera strukturen och funktionen av de tillsammans.
function mainLoop() {
    const elapsedTime = Date.now() - startTime;
    const secondsLeft = startingSeconds - Math.floor(elapsedTime / 1000);
    clock.innerHTML = `${secondsLeft}`;

    if (isAlive(Player) && secondsLeft > 0) {
        executePlayerMoves(Player);
        clearCanvas();
        drawPlayers(Player);
        drawPlayerModelLoop(VergilIdleAnimation);
        // Enemy.draw()
        animateGravity(Player);
        collisionControl(Player);
        projectileArray.forEach((projectile, index) => {
            if (projectile.position.x + projectile.radius >= canvas.width) {
                setTimeout(() => {
                    projectileArray.splice(index, 1)
                }, 0)
            } else {
                projectile.update()
            }
        });
        // enemyCollisionControl(Enemy);
        requestAnimationFrame(mainLoop);
    }
    if (secondsLeft <= 0) {
        // --- Stoppa huvudloopen när nedräkningen når 0 --- //
        clearCanvas();
        penn.font = "40px Cormorant Garamond, serif";
        penn.fillStyle = 'black';
        penn.fillText('Press ENTER for Main Menu.', 10, ground);
        document.addEventListener('keypress', function (event) {
            if (event.key == KEY_ENTER) {
                reset();
            }
        })
    }
}


gameStartBtn.onclick = function (e) {
    e.preventDefault()

    gameStartBtn.style.display = 'none';
}


// gameStartBtn är knappen som kör huvudfunktionen mainloop(), om den klickas.
gameStartBtn.addEventListener("click", startCountdown);