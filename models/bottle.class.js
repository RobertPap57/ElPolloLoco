class Bottle extends MovableObject {
    width = 70;
    height = 70;
    y = 355;
    bottle_sound = new Audio('audio/bottle.mp3');

    /**
     * Creates a new Bottle object with the given image path.
     * The x position is set to a random value between 1000 and 4000.
     * @param {string} imagePath The path to the image to use for the bottle.
     */
    constructor(imagePath) {
        super().loadImage(imagePath); 
        this.x = this.x = 1000 + Math.random() * 3000;
    }

    /**
     * Plays the bottle sound.
     * If the game's sounds are muted, the sound is not played.
     */
    playSound() {
        if (!soundsMuted) {
            this.bottle_sound.play();
        } 
    }
}