function determineWinner({player, enemy}) {
    if (player.health === enemy.health || enemy.health > 0 && player.health > 0) {
        penn.font = "40px Cormorant Garamond, serif";
        penn.fillStyle = 'black';
        penn.fillText('Tie', canvas.mid_width, canvas.mid_height);
    } else if (player.health > enemy.health && enemy.health <= 0) {
        penn.font = "40px Cormorant Garamond, serif";
        penn.fillStyle = 'black';
        penn.fillText('Player wins', canvas.mid_width - 80, canvas.mid_height);
    } else if (player.health < enemy.health && player.health <= 0) {
        penn.font = "40px Cormorant Garamond, serif";
        penn.fillStyle = 'black';
        penn.fillText('Enemy wins', canvas.mid_width - 80, canvas.mid_height);
    }
}


function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
            rectangle2.position.x && 
        rectangle1.attackBox.position.x <= 
            rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= 
            rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
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


function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        this.sound.pause();
    };
}

let Music = {
    VergilThemeMusic: {src:"Music/BuryTheLight.mp3"},
}
const VergilThemeMusic = new sound(Music.VergilThemeMusic.src);

function isAlive(object) {
    if (object.health <= 0) {
        return false
    }
    else {
        return true
    }
}

let gamePaused = false;
function pauseGame() {
    if (!gamePaused) {
        gamePaused = true
        return
    }
    else {
        gamePaused = false
        return
    }
}

function reset() {
    window.location.reload()
}