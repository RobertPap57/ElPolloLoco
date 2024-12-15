class Character extends MovableObject {
    height = 250;
    width = 120;
    x = 100;
    y = 175;
    speed = 5;
    idleTime = 0;
    longIdleThreshold = 5000;
    isLongIdle = false;
    jumpStarted = false;
    beforeJumpImgIndex = 0;
    jumpImgIndex = 0;
    throwImgIndex = 0;
    deadImgIndex = 0;
    isThrowing = false;
    alreadyThrown = false;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_BEFORE_JUMPING = [
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-33.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_THROWING = [
        'img/2_character_pepe/6_throw_bottle/T-61.png',
        'img/2_character_pepe/6_throw_bottle/T-62.png',
        'img/2_character_pepe/6_throw_bottle/T-63.png',
        'img/2_character_pepe/6_throw_bottle/T-64.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    walking_sound = new Audio('audio/walk.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    dead_sound = new Audio('audio/death.mp3');
    snoring = new Audio('audio/snoring.mp3');

    /**
     * Constructor for the Character class.
     * @param {World} world The world object that this character belongs to.
     */
    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_BEFORE_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_THROWING);
        this.energy = 100;
        this.applyGravity(175);
        this.animationInterval = null;
        this.currentFrameRate = 140;
        this.movements();
        this.animate();
    }

    /**
     * Moves the character to the right and plays the walking sound if the character
     * is not in the air and the sounds are not muted.
     * The sound is played with a playback rate of 3.
     * The otherDirection property is set to false.
     */
    movementsRight() {
        this.moveRight();
        if (!this.isAboveGround(175) && !soundsMuted) {
            this.walking_sound.play();
            this.walking_sound.playbackRate = 3;
        }
        this.otherDirection = false;
    }

    /**
     * Moves the character to the left and plays the walking sound if the character
     * is not in the air and the sounds are not muted.
     * The sound is played with a playback rate of 3.
     * The otherDirection property is set to true.
     */
    movementsLeft() {
        this.moveLeft();
        if (!this.isAboveGround(175) && !soundsMuted) {
            this.walking_sound.play();
            this.walking_sound.playbackRate = 3;
        }
        this.otherDirection = true;
    }

    /**
     * Throws a ThrowableObject if the character is not already throwing and
     * the space key is pressed. The character is set to the throwing state and
     * a timeout is set to reset the already thrown property after 220ms.
     */
    movementsThrow() {
        if (!this.alreadyThrown) {
            this.isThrowing = true;
            this.alreadyThrown = true;
            this.resetIdleTimer();
            setTimeout(() => {
                this.alreadyThrown = false;
            }, 220);
        }
    }

    /**
     * Starts the jump animation by setting the jumpStarted property to true
     * and scheduling a timeout of 200ms to call the jump() method with a
     * parameter of 11. The jumpStarted property is then set to false and
     * the jumping sound is played with a volume of 0.2 if the sounds are not
     * muted.
     */
    movementsJump() {
        this.jumpStarted = true;
        setTimeout(() => {
            this.jump(11);
            this.jumpStarted = false;
            if (!soundsMuted) {
                this.jumping_sound.play();
                this.jumping_sound.volume = 0.2;
            }
        }, 200)
    }

    /**
     * Checks if the character is allowed to throw a bottle.
     * The conditions are that the space key is pressed, there are bottles to throw,
     * no bottle is currently in the air, and the character is not moving left.
     * @returns {boolean} True if the character is allowed to throw a bottle, false otherwise.
     */
    throwCondition() {
        return this.world.keyboard.SPACE
            && this.world.bottleCollected > 0
            && this.world.throwableObjects.length === 0
            && !this.otherDirection;
    }

    /**
     * Checks if the character is allowed to move right.
     * The conditions are that the right arrow key is pressed, the character is not at the end of the level,
     * and the character is not dead.
     * @returns {boolean} True if the character is allowed to move right, false otherwise.
     */
    moveRightCondition() {
        return this.world.keyboard.RIGHT
            && this.x < this.world.level.level_end_x
            && !this.isDead()
    }

    /**
     * Checks if the character is allowed to move left.
     * The conditions are that the left arrow key is pressed, the character is not at the start of the level,
     * and the character is not dead.
     * @returns {boolean} True if the character is allowed to move left, false otherwise.
     */
    moveLeftCondition() {
        return this.world.keyboard.LEFT
            && this.x > 100
            && !this.isDead()
    }

    /**
     * Checks if the character is allowed to jump.
     * The conditions are that the up arrow key is pressed, the character is not above ground,
     * the jump has not already started, and the character is not dead.
     * @returns {boolean} True if the character is allowed to jump, false otherwise.
     */
    jumpCondition() {
        return this.world.keyboard.UP
            && !this.isAboveGround(175)
            && !this.jumpStarted
            && !this.isDead()
    }

    /**
     * The main game loop function for the character. It checks the conditions for the character to move, jump, throw, and checks the time in the air and jumping status.
     * It also updates the camera position based on the character's position.
     * The function is called every 16.6 milliseconds (60 times a second).
     */
    movements() {
        setInterval(() => {
            this.checkTimeInAir();
            this.checkJumpingStatus();
            if (this.isAboveGround(175)) {
                this.walking_sound.pause();
            }
            if (this.throwCondition()) this.movementsThrow();
            if (this.moveRightCondition()) this.movementsRight();
            if (this.moveLeftCondition()) this.movementsLeft();
            if (this.jumpCondition()) this.movementsJump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Animates the character when it is preparing to jump by playing the jumping animation.
     * The animation is played by looping through the array of images and setting the img property to the
     * current image. The beforeJumpImgIndex property is incremented to keep track of the current frame.
     * If the beforeJumpImgIndex is greater than or equal to the length of the array, the index is reset to 0.
     * The idle timer is reset to prevent the character from going idle while preparing to jump.
     * @returns {number} The time in milliseconds between each frame of the animation.
     */
    beforeJumpAnimation() {
        this.playAnimationFrame(this.IMAGES_BEFORE_JUMPING, this.beforeJumpImgIndex);
        this.beforeJumpImgIndex++;
        if (this.beforeJumpImgIndex >= this.IMAGES_BEFORE_JUMPING.length) {
            this.beforeJumpImgIndex = 0;
        }
        this.resetIdleTimer();
        return 50;
    }

    /**
     * Animates the character when it is jumping by playing the jumping animation.
     * The animation is played by looping through the array of images and setting the img property to the
     * current image. The jumpImgIndex property is incremented to keep track of the current frame.
     * If the jumpImgIndex is greater than or equal to the length of the array, the index is reset to 0.
     * The idle timer is reset to prevent the character from going idle while jumping.
     * @return {number} The time in milliseconds between each frame of the animation.
     */
    jumpAnimation() {
        this.playAnimationFrame(this.IMAGES_JUMPING, this.jumpImgIndex);
        this.jumpImgIndex++;
        if (this.jumpImgIndex >= this.IMAGES_JUMPING.length) {
            this.jumpImgIndex = 0;
        }
        this.resetIdleTimer();
        return 150;
    }

    /**
     * Animates the character when it is dead by playing the dead animation.
     * The animation is played by looping through the array of images and setting the img property to the
     * current image. The deadImgIndex property is incremented to keep track of the current frame.
     * If the deadImgIndex is greater than or equal to the length of the array, the index is set to 6.
     * If the sounds are not muted, the dead sound is played with a playback rate of 0.4.
     * The character's y position is increased by 30.
     * The idle timer is reset to prevent the character from going idle while dead.
     * @return {number} The time in milliseconds between each frame of the animation.
     */
    animationIsDead() {
        this.playAnimationFrame(this.IMAGES_DEAD, this.deadImgIndex);
        this.deadImgIndex++;
        if (this.deadImgIndex >= this.IMAGES_DEAD.length) {
            this.deadImgIndex = 6;
        }
        if (!soundsMuted) {
            this.dead_sound.play();
            this.dead_sound.playbackRate = 0.4;
        }
        this.y += 30;
        this.resetIdleTimer();
        return 150;
    }

    /**
     * Animates the character as hurt by playing the hurt animation.
     * The animation is played by looping through the array of images and setting the img property to the
     * current image. If the sounds are not muted, the hurt sound is played.
     * The idle timer is reset to prevent the character from going idle while hurt.
     * @return {number} The time in milliseconds between each frame of the animation.
     */
    animationIsHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (!soundsMuted) {
            this.hurt_sound.play();
        }
        this.resetIdleTimer();
        return 100;
    }

    /**
     * Animates the character as throwing by playing the throwing animation.
     * The animation is played by looping through the array of images and setting the img property to the
     * current image. The throwImgIndex property is incremented to keep track of the current frame.
     * If the throwImgIndex is greater than or equal to the length of the array, the index is reset to 0.
     * The idle timer is reset to prevent the character from going idle while throwing.
     * @return {number} The time in milliseconds between each frame of the animation.
     */
    animationThrowing() {
        this.playAnimationFrame(this.IMAGES_THROWING, this.throwImgIndex);
        this.throwImgIndex++;
        if (this.throwImgIndex >= this.IMAGES_THROWING.length) {
            this.throwImgIndex = 0;
        }
        this.resetIdleTimer();
        return 50;
    }

    /**
     * Animates the character as moving by playing the walking animation.
     * The animation is played by looping through the array of images and setting the img property to the
     * current image. The idle timer is reset to prevent the character from going idle while moving.
     * @return {number} The time in milliseconds between each frame of the animation.
     */
    animationMoving() {
        this.playAnimation(this.IMAGES_WALKING);
        this.resetIdleTimer();
        return 80;
    }

    /**
     * Animates the character as idle by playing the idle animation.
     * The animation is played by looping through the array of images and setting the img property to the
     * current image. If the character is long idle, the long idle animation is played, otherwise the idle animation is played.
     * The idle timer is checked and increased if the character is not long idle.
     * If the sounds are not muted, the snoring sound is played with a playback rate of 1.5 if the character is long idle.
     * @return {number} The time in milliseconds between each frame of the animation.
     */
    animationIdle() {
        if (this.isLongIdle) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!soundsMuted) {
                this.snoring.play();
                this.snoring.playbackRate = 1.5;
            } else {
                this.snoring.pause();
            }
        } else {
            this.playAnimation(this.IMAGES_IDLE);
            this.checkIdleTime();
        }
        return 300;
    }

    /**
     * Animates the character depending on its current state.
     * If the character is dead, it plays the dead animation. If the character is hurt, it plays the hurt animation.
     * If the character has thrown a bottle, it plays the throwing animation. If the character is jumping, it plays the
     * before jumping animation until the character is above the ground, then it plays the jumping animation.
     * If the character is moving, it plays the walking animation. Otherwise, it plays the idle animation.
     * The function returns the frame rate of the animation in milliseconds.
     */
    animationMovements() {
        const conditions = [{ condition: this.isDead(), action: () => this.animationIsDead() },
        { condition: this.isHurt(), action: () => this.animationIsHurt() },
        { condition: this.alreadyThrown, action: () => this.animationThrowing() },
        { condition: this.jumpStarted, action: () => this.beforeJumpAnimation() },
        { condition: this.isAboveGround(175), action: () => this.jumpAnimation() },
        { condition: this.world.keyboard.RIGHT || this.world.keyboard.LEFT, action: () => this.animationMoving() }
        ];
        for (let { condition, action } of conditions) {
            if (condition) {
                return action();
            }
        }
        return this.animationIdle();
    }

    /**
     * Animates the character by starting an interval that calls animationMovements() at a rate of
     * currentFrameRate milliseconds. If the frame rate returned by animationMovements() is different
     * from the current frame rate, the interval is restarted with the new frame rate.
    */
    animate() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        this.animationInterval = setInterval(() => {
            let frameRate = this.animationMovements();

            if (frameRate !== this.currentFrameRate) {
                this.currentFrameRate = frameRate;
                clearInterval(this.animationInterval);
                this.animate();
            }
        }, this.currentFrameRate);
    }

    /**
     * Checks if the character is jumping and resets the jumpImgIndex and
     * beforeJumpImgIndex properties accordingly.
     * If the character is not jumping, the jumpImgIndex is set to 0.
     * If the character is not jump-starting, the beforeJumpImgIndex is set to 0.
     */
    checkJumpingStatus() {
        if (!this.isAboveGround(175)) {
            this.jumpImgIndex = 0;
        }
        if (!this.jumpStarted) {
            this.beforeJumpImgIndex = 0;
        }
    }

    /**
     * Checks if the character is idle for a long time.
     * The idle time is increased by 140ms every time this method is called.
     * If the idle time is greater than or equal to the long idle threshold, the character is set to
     * be long idle.
    */
    checkIdleTime() {
        if (this.idleTime >= this.longIdleThreshold) {
            this.isLongIdle = true;
        } else {
            this.idleTime += 140;
        }
    }

    /**
     * Resets the idle timer by setting the idle time to 0 and setting the character as not long idle.
     * The snoring sound is also paused and reset to its start time.
    */
    resetIdleTimer() {
        this.idleTime = 0;
        this.isLongIdle = false;
        this.snoring.pause();
        this.snoring.currentTime = 0;
    }

    /**
     * Stops all character sounds by pausing them and resetting their current time to 0.
     */
    stopCharacterSounds() {
        this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;
        this.dead_sound.pause();
        this.dead_sound.currentTime = 0;
        this.jumping_sound.pause();
        this.jumping_sound.currentTime = 0;
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0;
        this.snoring.pause();
        this.snoring.currentTime = 0;
    }
}