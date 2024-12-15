class Chicken extends MovableObject {
    y = 348;
    height = 70;
    width = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    isDead = false;
    chicken_dead_sound = new Audio('audio/chicken_dead.mp3');

    /**
     * Constructor for the Chicken class.
     * @param {number} x The x-position of the chicken.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }

    /**
     * Sets the chicken as dead and plays the corresponding sound.
     * This sets the image of the chicken to its dead image and stops the animation.
     */
    setDead() {
        if (!soundsMuted) {
            this.chicken_dead_sound.play();
        }
        this.isDead = true;
        this.loadImage(this.IMAGE_DEAD); // Set the dead image
    }

    /**
     * Animates the chicken by moving it to the left and playing its walking animation.
     * The animation is done by setting an interval that calls the moveLeft and playAnimation
     * methods every 1000/60 milliseconds and 120 milliseconds respectively.
     * If the chicken is dead, the animation will not run.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 120);
    }

    /**
     * Stops the chicken dead sound by pausing it and resetting its current time to 0.
     */
    stopSounds() {
        this.chicken_dead_sound.pause();
        this.chicken_dead_sound.currentTime = 0;
    }
}