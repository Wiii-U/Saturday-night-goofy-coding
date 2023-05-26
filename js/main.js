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
const gravity =  0.4;


// Intervall av.
const speedX = 10; // Horizontal speed.
const speedY = 10; // Vertical speed.

const background =  new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc:'Images/backgroundNight.png',
})

const Judgementcut = new Sprite({
    position: {
        x:0,
        y:0
    },
    width:300,
    height:280,
    imageSrc: 'Images/Vergil - JudgementcutAttackbox.png',
    scale: 3,
    framesMax:6,
    offset: {
        x:0,
        y:0
    },
    framesHold: 3,
})  

const player2 = new Fighter({
    position: {
        x: canvas.width - 350,
        y: 100
    },
    velocity: {
        x: 0, 
        y: 0
    },
    offset: {
        x:85,
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
        attack2: {
            imageSrc: 'Images/Vergil - Judgementcut.png',
            framesMax: 7, 
        }
    },
    attackBox: {
        offset: {
            x:-85,
            y:-5
        },
        width: 120,
        height: 105
    }
})

const player = new Fighter({
    position: {
        x: 350,
        y: 100,
    },
    velocity: {
        x: 0, 
        y: 0
    },
    offset: {
        x:60,
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
        attack2: {
            imageSrc: 'Images/Vergil - Judgementcut.png',
            framesMax: 7,
            framesHold: 5 
        }
    },
    attackBox: {
        offset: {
            x:12,
            y:-5
        },
        width: 120,
        height: 105
    }
})

let projectileArray = [];

const keys = {
    a: {pressed:false},
    ArrowUp: {pressed:false},
    ArrowDown: {pressed:false},
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
    v: {pressed:false},
    l: {pressed:false},
}

window.addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'a':
            keys.a.pressed = true
            break;
        case 'p':
            pauseGame();
            keys.p.pressed = true
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            player2.velocity.y = -10
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
            player.velocity.y = -10
            break;
        case 's':
            keys.s.pressed = true
            break;
        case ' ':
            player2.attack();
            player2.switchSprites('attack1')
            keys.space.pressed = true
            break;
        case 'v':
            player2.attack();
            player2.switchSprites('attack2')
            keys.v.pressed = true
            break;
        case 'Enter':
            keys.enter.pressed = true
            break;
        case 'j':          
            player.attack();
            player.switchSprites('attack1')
            keys.j.pressed = true
            break;
        case 'k':
            player.attack();
            player.switchSprites('attack2');
            keys.k.pressed = true
            break;
        case 'l':
            // const initialProjectilePosition = {
            //     x: player.position.x,
            //     y: player.position.y
            // };
            // const projectileVelocity = {
            //     x: 3 + speedX,
            //     y: 0
            // };
            // projectileArray.push(new projectile({
            //     position: initialProjectilePosition,
            //     velocity: projectileVelocity
            // }));
            // console.log(projectileArray);
            keys.l.pressed = true
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
            setTimeout(() => {
                keys.k.pressed = false
            }, 500);
            break;
        case 'v':
            setTimeout(() => {
                keys.v.pressed = false
            }, 500);
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
        case 'l':
            keys.l.pressed = false
            break;
    }
})


function clearCanvas() {
    penn.fillStyle = "rgba(255, 255, 255, 1)";
    penn.fillRect(0, 0, canvas.width, canvas.height);
}


// Det här är huvudfunktionen, mainLoop, som har alla funktioner i sig.
function mainLoop() {
    const elapsedTime = Date.now() - startTime;
    const secondsLeft = startingSeconds - Math.floor(elapsedTime / 1000);
    clock.innerHTML = `${secondsLeft}`;

    if (isAlive(player) && isAlive(player2) && secondsLeft > 0 && gamePaused === false) {
        window.requestAnimationFrame(mainLoop);
        clearCanvas();
        background.update();
        player2.update();
        player.update();

        player.velocity.x = 0;
        player2.velocity.x = 0;

        // Player movement
        if(keys.a.pressed) {
            player.velocity.x = -8
            player.switchSprites('run')
        } else if (keys.d.pressed) {
            player.velocity.x = 8
            player.switchSprites('run')
        } else {
            player.switchSprites('idle')
        }

        if (player.velocity.y < 0) {
            player.switchSprites('jump')
        } else if (player.velocity.y > 0) {
            player.switchSprites('fall')
        }

        if (keys.k.pressed) {
            Judgementcut.position.x = player.position.x + 400
            Judgementcut.position.y = player.position.y - 100
            Judgementcut.update()
        }

        // Enemy movement
        if (keys.ArrowLeft.pressed) {
            player2.velocity.x = -8
            player2.switchSprites('run')
        } else if (keys.ArrowRight.pressed) {
            player2.velocity.x = 8
            player2.switchSprites('run')
        } else {
            player2.switchSprites('idle')
        }

        if (player2.velocity.y < 0) {
            player2.switchSprites('jump')
        } else if (player2.velocity.y > 0) {
            player2.switchSprites('fall')
        }

        if (keys.v.pressed) {
            Judgementcut.position.x = player2.position.x - 400
            Judgementcut.position.y = player2.position.y - 100
            Judgementcut.update()
        }

        if ( (Judgementcut.position.x + Judgementcut.width >=
            player2.position.x && Judgementcut.position.x <=
            player2.position.x + player2.width &&
            Judgementcut.position.y + Judgementcut.height >=
            player2.position.y && Judgementcut.position.y <=
            player2.position.y + player2.height)
            && player.isAttacking && player.image == player.sprites.attack2.image
        ) {
            player.isAttacking = false
            player2.health -= 10;
            document.querySelector('#enemyHealth').style.width = player2.health +'%';
        }

        if ( (Judgementcut.position.x + Judgementcut.width >=
            player.position.x && Judgementcut.position.x <=
            player.position.x + player.width &&
            Judgementcut.position.y + Judgementcut.height >=
            player.position.y && Judgementcut.position.y <=
            player.position.y + player.height)
            && player2.isAttacking && player2.image == player2.sprites.attack2.image
        ) {
            player2.isAttacking = false
            player.health -= 10;
            document.querySelector('#playerHealth').style.width = player.health +'%';
        }

        // Player tar skada
        if (
            rectangularCollision({
                rectangle1:player2,
                rectangle2:player
            }) && 
            player2.isAttacking && player2.framesCurrent === 6
        ) {
            player2.isAttacking = false
            player.health -= 5; 
            document.querySelector('#playerHealth').style.width = player.health +'%';
        }   

        // Enemy tar skada
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: player2
            }) && 
            player.isAttacking && player.framesCurrent === 6
        ) {
            player.isAttacking = false
            player2.health -= 5; 
            document.querySelector('#enemyHealth').style.width = player2.health +'%';
        }

        // Om Enemy missar sin attack
        if (player2.isAttacking && player2.framesCurrent === 6) {
            player2.isAttacking = false
        }      

        // Om player missar sin attack
        if (player.isAttacking && player.framesCurrent === 6) {
            player.isAttacking = false
        }

        
        
    }
    if (player2.health <= 0 || player.health <= 0) {
        clearCanvas();
        VergilThemeMusic.stop();
        determineWinner({
            player: player,
            enemy: player2
        })
        setTimeout(() => {
            clearCanvas();
            penn.font = "40px Cormorant Garamond, serif";
            penn.fillStyle = 'black';
            penn.fillText('Game will reset in 5 seconds....', canvas.mid_width - 160, canvas.mid_height);
        }, 2000);
        setTimeout(() => {
            reset();
        }, 5000);
    }
    if (secondsLeft <= 0) {
        // --- Stoppa huvudloopen när nedräkningen når 0 --- //
        clearCanvas();
        VergilThemeMusic.stop();
        determineWinner({
            player: player,
            enemy: player2
        })
        setTimeout(() => {
            clearCanvas();
            penn.font = "40px Cormorant Garamond, serif";
            penn.fillStyle = 'black';
            penn.fillText('Game will reset in 5 seconds....', canvas.mid_width - 160, canvas.mid_height);
        }, 2000);
        setTimeout(() => {
            reset();
        }, 5000);
    }
}


gameStartBtn.onclick = function (e) {
    e.preventDefault()

    gameStartBtn.style.display = 'none';
    // VergilThemeMusic.play();
    startCountdown();
}
