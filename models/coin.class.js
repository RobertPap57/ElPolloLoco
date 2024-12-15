class Coin extends MovableObject {
    width = 60;
    height = 60;
    coin_sound = new Audio('audio/coin.mp3');

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];



    /**
     * Constructor for the Coin class.
     * @param {number} x The x-position of the coin.
     * @param {number} y The y-position of the coin.
     */
    constructor(x, y) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * Animates the coin by playing the animation in the IMAGES array.
     * The animation is played by calling the playAnimation method every 160ms.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 160)
    }

    /**
     * Plays the coin sound.
     * If the game's sounds are muted, the sound is not played.
     */
    playSound() {
        if (!soundsMuted) {
            this.coin_sound.play();
            this.coin_sound.volume = 0.5;
        }
    }
}