class ThrowableObject extends MovableObject {

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    splash_sound = new Audio('audio/splash.mp3');
    throw_sound = new Audio('audio/throw.mp3');
    
    /**
     * Constructor for the ThrowableObject class.
     * @param {number} x The x-position of the bottle.
     * @param {number} y The y-position of the bottle.
     * @param {World} world The world object that this bottle belongs to.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 70;
        this.throw(x, y);
        this.world = world;
    }


    /**
     * Throws the bottle by playing the throw animation, applying gravity, and moving the bottle to the right.
     * The throw animation is played by looping through the array of images and setting the img property to the
     * current image. The interval is 80 milliseconds.
     * The bottle is thrown by setting its speedY to 10 and applying gravity.
     * The bottle is moved to the right by setting an interval that calls the moveRight method every 1000/60 milliseconds.
     * If the game's sounds are not muted, the throw sound is played.
     */
    throw() {
        if (!soundsMuted) {
            this.throw_sound.play();
        }
        this.speedY = 10;
        this.applyGravity(380);
        this.throwInterval = setInterval(() => {
                this.x += 5.5;
        }, 1000 / 60);
       this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 80)
    }

    /**
     * Removes the bottle from the game after it hits the ground.
     * Clears the gravity, throw and animation intervals and plays the bottle splash animation.
     * It also removes the bottle from the world after 200 milliseconds.
     */
    hit() {
        clearInterval(this.gravityInterval); 
        clearInterval(this.throwInterval);   
        clearInterval(this.animationInterval);
        this.speedY = 0;  
        if (!soundsMuted)  {
            this.splash_sound.play();            
        }                
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        setTimeout(() => {
            this.removeBottle(); 
        }, 50); 
    }

    /**
     * Checks if the bottle has hit the ground.
     * The bottle is considered to have hit the ground if its y-coordinate is greater than or equal to 280.
     * @returns {boolean} True if the bottle has hit the ground, false otherwise.
     */
    hitGround() {
        if (this.y >= 370) {  
            return true;  
        }
        return false;  
    }
 

    /**
     * Removes the bottle from the world's array of throwable objects.
     */
    removeBottle() {
        this.index = this.world.throwableObjects.indexOf(this);
        if (this.index > -1) {
            this.world.throwableObjects.splice(this.index, 1);
        }
    }
}