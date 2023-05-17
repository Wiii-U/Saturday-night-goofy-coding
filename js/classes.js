class Sprite{
    constructor({ position, imageSrc, width = 50, height = 150, scale = 1, framesMax = 1, framesHold = 10, offset = {x: 0, y:0} }) {
        this.position = position
        this.width = width
        this.height = height
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
        this.offset = offset
    }

    draw() {
        if (this.image) {

            // Ritar ut spritens rektangel
            // penn.fillStyle = 'green'
            // penn.fillRect(this.position.x, this.position.y, this.width, this.height)

            penn.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x - this.offset.x,
                this.position.y - this.offset.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            )
        }
    }

    animateFrames() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax -  1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }
}


class Fighter extends Sprite {
    constructor({ position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, framesHold = 10, offset = {x: 0, y:0}, sprites, attackBox = { offset: {}, width: undefined, height: undefined }}) {
        super({ position, imageSrc, scale, framesMax, framesHold, offset })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset, 
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
        this.sprites = sprites

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }


    update() {
        this.draw()
        this.animateFrames()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // Ritar ut attackbox.
        // penn.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        // Ritar ut spelarens hitbox.
        // penn.fillRect(this.position.x, this.position.y, this.width, this.height);

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // gravity implementation
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 170) {
            this.velocity.y = 0
            this.position.y = 649
        }
        else {
            this.velocity.y += gravity
        }

        if (this.position.x <= 0) {
            this.position.x = 0
            this.velocity.x = 0
        } else if (this.position.x + this.width >= canvas.width) {
            this.velocity.x = 0
            this.position.x = canvas.width - this.width
        }
    }

    attack() {
        this.isAttacking = true
    }

    switchSprites(sprite) {
        if (this.image === this.sprites.attack1.image && 
            this.framesCurrent < this.sprites.attack1.framesMax - 1
            ) return
        if (this.image === this.sprites.attack2.image && 
            this.framesCurrent < this.sprites.attack2.framesMax - 1
            ) return

        switch(sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image != this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image != this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image != this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack2':
                if (this.image != this.sprites.attack2.image) {
                    this.image = this.sprites.attack2.image
                    this.framesMax = this.sprites.attack2.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}
