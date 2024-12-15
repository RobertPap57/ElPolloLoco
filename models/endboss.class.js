class Endboss extends MovableObject {
    y = -45;
    height = 500;
    width = 300;
    speed = 1;
    speedY = 0;
    endbossEncountered = false;
    actionState = 'stop';
    actionTimer = -1;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    attack_sound = new Audio('audio/endboss_attack.mp3');
    hurt_sound = new Audio('audio/endboss_hurt.mp3');
    revealed_sound = new Audio('audio/endboss_revealed.mp3');

    /**
     * Initializes the Endboss object.
     *
     * This constructor sets the endboss's starting position to 4700 on the x-axis, loads the images for the endboss's different animations, and sets the endboss's energy level to 100. It also calls the animate method to start the endboss's animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4700;
        this.energy = 100;
        this.applyGravity(-45);
        this.animate();
    }

    /**
     * Updates the endboss's action state.
     *
     * This method increments an action timer by 1/60th of a second and checks if the timer has reached a certain value. Depending on the value of the timer and the current action state, the endboss's action state is changed to 'move', 'stop', or 'attack'. The timer is reset to 0 after the action state is changed.
     */
    updateActionState() {
        if (this.endbossEncountered && !this.isDead()) {
            this.actionTimer += 1 / 60;
            if (this.actionTimer >= 1.5 && this.actionState === 'move') {
                this.actionState = 'stop';
                this.actionTimer = 0;
            } else if (this.actionTimer >= 1 && this.actionState === 'stop') {
                this.actionState = 'attack';
                this.actionTimer = 0;
            } else if (this.actionTimer >= 1 && this.actionState === 'attack') {
                this.actionState = 'move';
                this.actionTimer = 0;
            }
        }
    }

    /**
     * Handles the movement of the endboss based on its current action state.
     *
     * If the endboss has been encountered and is not dead, this method changes the endboss's speed and moves it to the left accordingly. If the endboss is in the 'attack' state, it will jump up and down while moving left.
     */
    handleMovement() {
        if (this.endbossEncountered && !this.isDead()) {
            if (this.actionState === 'move') {
                this.speed = 1;
                this.moveLeft();
            } else if (this.actionState === 'attack') {
                this.speed = 6;
                this.moveLeft();
                this.jump(1);
            } else if (this.actionState === 'stop') {
                this.speed = 0;
                this.stop();
            }
        }
    }

    
    /**
     * Animates the endboss as dead by playing the dead animation.
     * The endboss's y position is increased by 50.
     * The endboss's sounds are stopped.
     */
    animateDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.stopSounds();
        this.y += 50;
    }
    
    /**
     * Animates the endboss as hurt by playing the hurt animation.
     * If the game's sounds are not muted, the hurt sound is played.
     */
    animateHurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (!soundsMuted) {
            this.hurt_sound.play();
            this.attack_sound.pause();
            this.attack_sound.currentTime = 0;
        }
    }
    
    /**
     * Animates the endboss as attacking by playing the attack animation.
     * If the game's sounds are not muted, the attack sound is played.
     */
    animateAttack() {
        this.playAnimation(this.IMAGES_ATTACK);
        if (!soundsMuted) {
            this.attack_sound.play();
        }
    }

 
    /**
     * Handles the animation of the endboss based on its current state.
     * If the endboss has been encountered, this method will play the dead animation if the endboss is dead,
     * the hurt animation if the endboss is hurt, the attack animation if the endboss is in the 'attack' state,
     * the alert animation if the endboss is in the 'stop' state, and the walking animation if the endboss is in the 'move' state.
     */
    handleAnimations() {
        if (this.endbossEncountered) {
            if (this.isDead()) {this.animateDead(); return;}
            if (this.isHurt()) {
                this.animateHurt();
            } else if (this.actionState === 'attack') {
                this.animateAttack();
            } else if (this.actionState === 'stop') {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * Animates the endboss by updating its action state and handling its movement and animations.
     * The updateActionState and handleMovement methods are called every 1000/60 milliseconds to update the endboss's action state and move it left or right.
     * The handleAnimations method is called every 160 milliseconds to handle the endboss's animations based on its current action state.
     */
    animate() {
        setInterval(() => {
            this.updateActionState();
            this.handleMovement();
        }, 1000 / 60);

        setInterval(() => {
            this.handleAnimations();
        }, 160);

    }

    /**
     * Stops all sounds that the endboss can play.
     * This method is used when the endboss is defeated or when the game is reset.
     */
    stopSounds() {
        this.attack_sound.pause();
        this.attack_sound.currentTime = 0;
        this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;
        this.revealed_sound.pause();
        this.revealed_sound.currentTime = 0;
    }
}