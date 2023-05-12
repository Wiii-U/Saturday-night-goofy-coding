// Deklarerar de fundamentala variablerna.
const gameMenuBtn = document.getElementById('mainMenuBtn');
const pauseBtn = document.getElementById('pauseBtn');
const gameStartBtn = document.getElementById("gameStartBtn");
const canvas = document.getElementById("canvas");
const clock = document.getElementById('clock');
const penn = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
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
        this.attackBox = {
            position: {
                x:this.posX,
                y:this.posY
            },
            width: 100,
            height: this.height
        }
        this.isAttacking
    }

    draw() {
        penn.fillStyle = 'green'
        penn.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}


const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './Images/backgroundNight.png'
})
const Enemy2 = new Fighter({
    position: {
        x: canvas.width - 350,
        y: 100
    },
    velocity: {
        x: 0, 
        y: 0
    },
    offset: {
        x:-50,
        y:0
    }
    
})

const Player2 = new Fighter({
    position: {
        x: 350,
        y: 100,
    },
    velocity: {
        x: 0, 
        y: 0
    },
    offset: {
        x:0,
        y:0
    }
})

class projectile{
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.width = 100
        this.height = 167
        const image = new Image()
        image.src = 'Images/Mirageslash.png'
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
        }
    }

    draw() {
        penn.fillStyle = 'green';
        penn.fillRect(this.position.x, this.position.y, this.width, this.height)
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


function IdleVergilSpritePC (options) {

    let that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;
    
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.posX = options.posX;
    that.posY = options.posY;
    
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
        penn.drawImage(that.image, frameIndex * that.width / numberOfFrames+30, 10, that.width / numberOfFrames, that.height, that.posX, that.posY, that.width / numberOfFrames, that.height);
    };
    
    return that;
}


function drawPlayerModelLoop(playerModel) {
    playerModel.update();
    playerModel.render();
}

const VergilIdleAnimationLeftImg = new Image();
VergilIdleAnimationLeftImg.src = "Images/VergilIdleAnimationLeft.png";
const VergilIdleAnimationImg = new Image();
VergilIdleAnimationImg.src = "Images/VergilIdleAnimation.png";
const Player = new player("Vergil", "red", VergilIdleAnimationImg.src, 120, 167, 60, 0, 0, 0, 100, 0, 0, 0);
const Enemy = new player("Vergil", "red", VergilIdleAnimationLeftImg.src, 120, 167, canvas.width - (Player.posX+ Player.width), 0, 0, 0, 100, 0, 0, 0);
const projectileArray = [];
const VergilIdleAnimationLeft = IdleVergilSpritePC({
    context: canvas.getContext("2d"),
    width: 576,
    height: 192,
    image: VergilIdleAnimationLeftImg,
    posX: Enemy.posX,
    posY: Enemy.posY,
    numberOfFrames: 3,
	ticksPerFrame: 15
});
const VergilIdleAnimation = IdleVergilSpritePC({
    context: canvas.getContext("2d"),
    width: 576,
    height: 192,
    image: VergilIdleAnimationImg,
    posX: Player.posX,
    posY: Player.posY,
    numberOfFrames: 3,
	ticksPerFrame: 15,
});


const keys = {
    a: { pressed:false},
    ArrowUp: { pressed:false},
    ArrowDown: { pressed:false},
    ArrowLeft: {pressed:false},
    ArrowRight: {pressed:false},
    d: {pressed:false},
    w: {pressed:false},
    s: {pressed:false},
    space: {pressed:false},
    enter: {pressed:false},
    j: {pressed:false},
    k: {pressed:false},
    jumping: {pressed:false}
}


window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            Enemy2.velocity.y = -5
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break;
        case 'd':
            keys.d.pressed = true
            break;
        case 'w':
            keys.w.pressed = true
            Player2.velocity.y = -5
            break;
        case 's':
            keys.s.pressed = true
            break;
        case ' ':
            keys.space.pressed = true
            Enemy2.attack();
            break;
        case 'Enter':
            keys.enter.pressed = true
            break;
        case 'j':          
            const initialProjectilePosition = {
                x: Player.posX,
                y: Player.posY
            };
            const projectileVelocity = {
                x: 3 + speedX,
                y: 0
            };
            projectileArray.push(new projectile({
                position: initialProjectilePosition,
                velocity: projectileVelocity
            }));
            Player.attack();
            Player2.attack();
            keys.j.pressed = true
            break;
        case 'k':
            const judgementCutRange = 300;
            const regularJudgementCut = new judgementCut({
                position: {
                    x: (Player.posX + Player.width) + judgementCutRange,
                    y: canvas.height
                },
                duration: 1000
            });
            regularJudgementCut.draw();
            Player.attack()
            keys.k.pressed = true
            break;
    }
})


window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        case 'w':
            keys.w.pressed = false
            break;
        case 's':
            keys.s.pressed = false
            break;
        case 'j':
            keys.j.pressed = false
            break;
        case 'k':
            keys.k.pressed = false
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case ' ':
            keys.space.pressed = false
            break;
        case 'Enter':
            keys.enter.pressed = false
            break;
    }
})


// Utför rörelserna på karatärerna
function executePlayerMoves(object) {
    if(object == Player){
        if (keys.s.pressed && object.posY + object.height <= canvas.height) {
            object.posY += speedY
        }
        else if (keys.w.pressed && object.posY >= 0) {
            object.posY -= speedY
            keys.jumping.pressed = true
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
    else {
        if (keys.ArrowDown.pressed && object.posY + object.height <= canvas.height) {
            object.posY += speedY
        }
        else if (keys.ArrowUp.pressed && object.posY >= 0) {
            object.posY -= speedY
            keys.jumping.pressed = true
        }
        if (keys.ArrowLeft.pressed && object.posX >=0) {
            object.posX -= speedX
        }
        else if (keys.ArrowRight.pressed && object.posX + object.width <= canvas.width) {
            object.posX += speedX
        }
        else {
            object.posX += 0
            object.posY += 0
        }
    }
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
    penn.fillStyle = "rgba(255, 255, 255, 0.8)";
    penn.fillRect(0, 0, canvas.width, canvas.height);
}



// Det här är huvudfunktionen som kör funktioner för att animeringen ska fungera.
// mainLoop har alla funktioner i sig, för att effektivisera strukturen och funktionen av de tillsammans.
function mainLoop() {
    const elapsedTime = Date.now() - startTime;
    const secondsLeft = startingSeconds - Math.floor(elapsedTime / 1000);
    clock.innerHTML = `${secondsLeft}`;

    if (isAlive(Player) && isAlive(Enemy) && secondsLeft > 0) {
        window.requestAnimationFrame(mainLoop);
        // executePlayerMoves(Player);
        // executePlayerMoves(Enemy);
        clearCanvas();
        background.update()
        Enemy2.update();
        Player2.update();

        Player2.velocity.x = 0
        if(keys.a.pressed) {
            Player2.velocity.x = -1
        } else if (keys.d.pressed){
            Player2.velocity.x = 1
        }

        Enemy2.velocity.x = 0
        if(keys.ArrowLeft.pressed) {
            Enemy2.velocity.x = -1
        } else if (keys.ArrowRight.pressed){
            Enemy2.velocity.x = 1
        }
        if (
            rectangularCollision({
                rectangle1:Enemy2,
                rectangle2:Player2
            }) && Enemy2.isAttacking
        ) {
            Enemy2.isAttacking = false
            Player2.health -= 5; 
            document.querySelector('#playerHealth').style.width = Player2.health +'%';
            console.log('Player attack succesful')
        }
        if (
            rectangularCollision({
                rectangle1:Player2,
                rectangle2:Enemy2
            }) && 
            Player2.isAttacking
        ) {
            Player2.isAttacking = false
            Enemy2.health -= 5; 
            document.querySelector('#enemyHealth').style.width = Enemy2.health +'%';
            console.log('Enemy attack succesful')
        }
        // drawPlayers(Player);
        // drawPlayers(Enemy);
        // drawPlayerModelLoop(VergilIdleAnimationLeft);
        // drawPlayerModelLoop(VergilIdleAnimation);
        // animateGravity(Player);
        // animateGravity(Enemy);
        // collisionControl(Player);
        // collisionControl(Enemy);
        // projectileArray.forEach((projectile, index) => {
        //     if (projectile.position.x + projectile.width >= canvas.width) {
        //         setTimeout(() => {
        //             projectileArray.splice(index, 1)
        //         }, 0)
        //     } else {
        //         projectile.update()
        //     }
        // }); 
    }
    if (Enemy2.health <= 0 || Player2.health <= 0) {
        // clearCanvas();
        determineWinner({
            player: Player2, 
            enemy: Enemy2
        })
        setTimeout(() => {
            penn.fillStyle = 'white';
            penn.fillRect(0, 0, canvas.width, canvas.height)
            penn.font = "40px Cormorant Garamond, serif";
            penn.fillStyle = 'black';
            penn.fillText('Press ENTER To Reset', 0, ground);
        }, 500);
        VergilThemeMusic.stop();
        if (keys.enter.pressed) {
            reset();
        }
        
    }
    if (secondsLeft <= 0) {
        // --- Stoppa huvudloopen när nedräkningen når 0 --- //
        // clearCanvas();
        determineWinner({
            player: Player2,
            enemy: Enemy2
        })
        setTimeout(() => {
            penn.fillStyle = 'white';
            penn.fillRect(0, 0, canvas.width, canvas.height)
            penn.font = "40px Cormorant Garamond, serif";
            penn.fillStyle = 'black';
            penn.fillText('Press ENTER To Reset', 0, ground);
        }, 500);
        VergilThemeMusic.stop();
        if (keys.enter.pressed) {
            reset();
        }
    }
}


gameStartBtn.onclick = function (e) {
    e.preventDefault()

    gameStartBtn.style.display = 'none';
    // VergilThemeMusic.play();
}


// gameStartBtn är knappen som kör huvudfunktionen mainloop(), om den klickas.
gameStartBtn.addEventListener("click", startCountdown);