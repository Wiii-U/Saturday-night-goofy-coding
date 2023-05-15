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
const gravity =  0.15
penn.fillStyle = "white";
penn.fillRect(0, 0, canvas.width, canvas.height);


// Intervall av.
const speedX = 5; // Horizontal speed.
const speedY = 7; // Vertical speed.

const background =  new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc:'Images/backgroundNight.png',
})

const mirageSlash = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: 'Images/Mirageslash.png',
    scale:1,
    framesMax:10,
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
        x:0,
        y:20
    },
    imageSrc: 'Images/VergilIdleAnimationLeft.png',
    framesMax: 3,
    sprites: {
        idle: {
            imageSrc: 'Images/VergilIdleAnimationLeft.png',
            framesMax: 3,
        },
        run: {
            imageSrc: 'Images/VergilIdleAnimationLeft.png',
            framesMax: 3,
        },
        jump: {
            imageSrc: 'Images/VergilIdleAnimationLeft.png',
            framesMax: 3,
        },
        fall: {
            imageSrc: 'Images/VergilIdleAnimationLeft.png',
            framesMax: 3,
        },
        attack1: {
            imageSrc: 'Images/Vergil - Impostor - attack1.png',
            framesMax: 10,
        },
    },
    attackBox: {
        offset: {
            x:0,
            y:-5
        },
        width: 120,
        height: 105
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
        y:20
    },
    imageSrc: 'Images/VergilIdleAnimation.png',
    framesMax: 3,
    sprites: {
        idle: {
            imageSrc: 'Images/VergilIdleAnimation.png',
            framesMax: 3,
        },
        run: {
            imageSrc: 'Images/VergilIdleAnimation.png',
            framesMax: 3,
        },
        jump: {
            imageSrc: 'Images/VergilIdleAnimation.png',
            framesMax: 3,
        },
        fall: {
            imageSrc: 'Images/VergilIdleAnimation.png',
            framesMax: 3,
        },
        attack1: {
            imageSrc: 'Images/Vergil - attack1.png',
            framesMax: 10,
        },
    },
    attackBox: {
        offset: {
            x:72,
            y:-5
        },
        width: 120,
        height: 105
    }
})

let projectileArray = [];

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
    jumping: {pressed:false},
    p: {pressed:false},
}


window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
            break;
        case 'p':
            keys.p.pressed = true
            pauseGame();
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            Enemy2.velocity.y = -10
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
            Player2.velocity.y = -10
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
            Player2.attack();
            keys.j.pressed = true
            break;
        case 'k':
            const initialProjectilePosition = {
                x: Player2.position.x,
                y: Player2.position.y
            };
            const projectileVelocity = {
                x: 3 + speedX,
                y: 0
            };
            projectileArray.push(new projectile({
                position: initialProjectilePosition,
                velocity: projectileVelocity
            }));
            keys.k.pressed = true
            break;
    }
})


window.addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = false
            break;
        case 'p':
            keys.p.pressed = false
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

    if (isAlive(Player2) && isAlive(Enemy2) && secondsLeft > 0 && gamePaused === false) {
        window.requestAnimationFrame(mainLoop);
        clearCanvas();
        background.update();
        Enemy2.update();
        Player2.update();
        projectileArray.forEach((projectile, index) => {
            if (projectile.position.x + projectile.width >= canvas.width || projectile.position.x <= 0) {
                setTimeout(() => {
                    projectileArray.splice(index, 1)
                }, 0)
            } else {
                projectile.update()
            }
        });

        Player2.velocity.x = 0
        Enemy2.velocity.x = 0

        // Player movement
        if(keys.a.pressed) {
            Player2.velocity.x = -3
            Player2.switchSprites('run')
        } else if (keys.d.pressed){
            Player2.velocity.x = 3
            Player2.switchSprites('run')
        } else {
            Player2.switchSprites('idle')
        }

        if (Player2.velocity.y < 0) {
            Player2.switchSprites('jump')
        } else if (Player2.velocity.y > 0) {
            Player2.switchSprites('fall')
        }

        // Enemy movement
        if (keys.ArrowLeft.pressed) {
            Enemy2.velocity.x = -3
            Enemy2.switchSprites('run')
        } else if (keys.ArrowRight.pressed){
            Enemy2.velocity.x = 3
            Enemy2.switchSprites('run')
        } else {
            Enemy2.switchSprites('idle')
        }

        if (Enemy2.velocity.y < 0) {
            Enemy2.switchSprites('jump')
        } else if (Enemy2.velocity.y > 0) {
            Enemy2.switchSprites('fall')
        }

        // Player tar skada
        if (
            rectangularCollision({
                rectangle1:Enemy2,
                rectangle2:Player2
            }) && 
            Enemy2.isAttacking && Enemy2.framesCurrent === 6
        ) {
            Enemy2.isAttacking = false
            Player2.health -= 5; 
            document.querySelector('#playerHealth').style.width = Player2.health +'%';
            console.log('Player attack succesful')
        }

        // Om Enemy missar sin attack
        if (Enemy2.isAttacking && Enemy2.framesCurrent === 6) {
            Enemy2.isAttacking = false
        }

        // Enemy tar skada
        if (
            rectangularCollision({
                rectangle1: Player2,
                rectangle2: Enemy2
            }) && 
            Player2.isAttacking && Player2.framesCurrent === 6
        ) {
            Player2.isAttacking = false
            Enemy2.health -= 5; 
            document.querySelector('#enemyHealth').style.width = Enemy2.health +'%';
            console.log('Enemy attack succesful')
        }

        // Om player missar sin attack
        if (Player2.isAttacking && Player2.framesCurrent === 6) {
            Player2.isAttacking = false
        }

        
    }
    if (Enemy2.health <= 0 || Player2.health <= 0) {
        // clearCanvas();
        VergilThemeMusic.stop();
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
        if (keys.enter.pressed) {
            reset();
        }
        
    }
    if (secondsLeft <= 0) {
        // --- Stoppa huvudloopen när nedräkningen når 0 --- //
        // clearCanvas();
        VergilThemeMusic.stop();
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