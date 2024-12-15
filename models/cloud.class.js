class Cloud extends MovableObject {
    height = 250;
    width = 650;
    
    /**
     * Constructor for the Cloud class.
     * @param {string} path The path to the image to use for the cloud.
     * @param {number} x The x position of the cloud.
     */
    constructor(path, x) {
        super().loadImage(path)
        this.x = x;
        this.y = Math.random() * 30;
        this.speed = 0.05 + Math.random() * 0.2;
        this.animate();
    }
    
    /**
     * Animates the cloud by moving it to the left.
     * The animation is done by setting an interval that calls the moveLeft
     * method every 1000/60 milliseconds.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }
}