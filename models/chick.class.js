class Chick extends MovableObject {
    y = 362;
    height = 55;
    width = 55;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    isDead = false;
    chick_dead_sound = new Audio('audio/chick_dead.mp3');

    /**
     * Constructor for the Chick class.
     * @param {number} x The x-position of the chick.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + Math.random() * 200;
        this.speed = 0.15 + Math.random() * 0.35;
        this.animate();
    }

    /**
     * Sets the chick as dead and plays the corresponding sound.
     * This sets the image of the chick to its dead image and stops the animation.
     */
    setDead() {
        if (!soundsMuted) {
            this.chick_dead_sound.play();
        }
        this.isDead = true;
        this.loadImage(this.IMAGE_DEAD); // Set the dead image
    }

    /**
     * Animates the chick by moving it to the left and playing its walking animation.
     * The animation is done by setting an interval that calls the moveLeft and playAnimation
     * methods every 1000/60 milliseconds and 120 milliseconds respectively.
     * If the chick is dead, the animation will not run.
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
     * Stops the chick dead sound by pausing it and resetting its current time to 0.
     */
    stopSounds() {
        this.chick_dead_sound.pause();
        this.chick_dead_sound.currentTime = 0;
    }
}