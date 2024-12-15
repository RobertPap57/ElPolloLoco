class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.35;
    lastHit = 0;
    isJumping = false;
    jumpStartTime = 0;   
    timeInAir = 0;   
    
    /**
     * Plays the animation by setting the img property to the next image in the given array.
     * The animation is played by looping through the array and setting the img property to the
     * current image. The currentImage property is incremented to keep track of the current frame.
     * @param {string[]} images The array of image paths to play the animation with.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    
    /**
     * Plays the animation by setting the img property to the given image index in the given array.
     * The image at the given index is set to the img property.
     * @param {string[]} images The array of image paths to play the animation with.
     * @param {number} currentImageIndex The index of the image in the array to play.
     */
    playAnimationFrame(images, currentImageIndex) {
        let i = currentImageIndex;
        let path = images[i];
        this.img = this.imageCache[path];
    }

    /**
     * Applies gravity to the object by changing its y position and speedY.
     * The gravity is applied every 16.67 milliseconds.
     * @param {number} ground The y-coordinate of the ground of the game.
     */
    applyGravity(ground) {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround(ground) || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (!this.isAboveGround(ground)) {
                    this.y = ground;  
                    this.speedY = 0;  
                }
            }
        }, 1000 / 60);
    }

    /**
     * Checks if the object is above the ground.
     * If the object is a ThrowableObject, it is always considered to be above the ground.
     * Otherwise, it checks if the y-coordinate of the object is less than the ground parameter.
     * @param {number} ground The y-coordinate of the ground of the game.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround(ground) {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < ground;
        }
    }

    /**
     * Makes the object jump by setting the speedY to the given y and
     * setting the isJumping property to true. The jumpStartTime is set
     * to the current time. The object will continue to jump until the
     * y-coordinate of the object reaches the ground (y = 280). The time
     * the object has been in the air can be accessed through the timeInAir
     * property.
     * @param {number} y The y-coordinate to jump to.
     */
    jump(y) {
        this.speedY = y;
        this.isJumping = true;     
        this.jumpStartTime = Date.now(); 
    }

    /**
     * Checks how long the object has been in the air by comparing the current
     * time with the jumpStartTime. If the object is not jumping, the timeInAir
     * property is set to 0.
     * @returns {number} The time the object has been in the air in seconds.
     */
    checkTimeInAir() {
        if (this.isJumping) {
            this.timeInAir = (Date.now() - this.jumpStartTime) / 1000; 
            if (this.y >= 175) {
                this.isJumping = false;
                this.timeInAir = 0;
            }
        }
    }

    /**
     * Checks if the object is colliding with the given MovableObject (mo)
     * by checking if the x and y coordinates of the two objects are within
     * a certain range of each other.
     * @param {MovableObject} mo The object to check for collision.
     * @param {number} offset The offset to use for the collision check.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo, offset) {
        return this.x + (this.width - 40) > mo.x + offset &&
            this.x + 40 < mo.x + (mo.width + offset) &&
            this.y + (this.height - 15)  > mo.y &&
            this.y + 100 < mo.y + mo.height;
    }

    /**
     * Decreases the energy of the object by 20 if it is not already hurt.
     * If the object's energy is less than 0 after the hit, it is set to 0.
     * The lastHit property is set to the current time.
     */
    hit() {
        if (!this.isHurt()) {
            this.energy -= 20;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.lastHit = new Date().getTime(); 
        }
    }

    /**
     * Checks if the object is hurt.
     * This method checks if the difference between the current time and the lastHit property
     * is less than 1 second. If it is, the object is considered hurt.
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead.
     * This method checks if the energy of the object is 0.
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by adding the speed to its x position.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by subtracting the speed from its x position.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object attack by moving it to the left by 10 times its speed.
     */
    attack() {
        this.x -= this.speed * 10;
    }
    /**
     * Moves the object to the right by 20 times its speed, used after an attack.
     */
    afterAttack() {
        this.x += this.speed * 20;
    }
    /**
     * Stops the object from moving by setting its speed to 0.
     */
    stop() {
        this.speed = 0;
    }



}