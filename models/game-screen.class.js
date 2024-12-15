class GameScreen extends MovableObject {

    /**
     * Constructor for the GameScreen class.
     * @param {string} imgPath The path to the image to use for the game screen.
     * @param {number} x The x position of the game screen.
     * @param {number} y The y position of the game screen.
     * @param {number} width The width of the game screen.
     * @param {number} height The height of the game screen.
     */
    constructor(imgPath, x, y, width, height) {
        super().loadImage(imgPath);  
        this.width = width;  
        this.height = height;
        this.x = x;  
        this.y = y;
    }
}