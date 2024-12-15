class DrawableObject {
    img;
    imageCache = {};
    intervals = [];
    currentImage = 0;
    height = 150;
    width = 80;
    x = 120;
    y = 280;

    /**
     * Loads an image from the given path and assigns it to the object's img attribute.
     * @param {string} path The path to the image to load.
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }
    
    /**
     * Draws the object on the given canvas context at the object's position
     * and size.
     * @param {CanvasRenderingContext2D} ctx The context to draw on.
    */
   draw(ctx) {
       ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    

    /**
     * Loads all the images in the given array into the object's imageCache.
     * @param {string[]} arr The array of paths to the images to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    
    /**
     * Draws the given text at the given position on the given context.
     * The text is drawn in white with a font size of 30px and the Arial font.
     * @param {CanvasRenderingContext2D} ctx The context to draw on.
     * @param {string} text The text to draw.
     * @param {number} x The x position of the text.
     * @param {number} y The y position of the text.
    */
   drawText(ctx, text, x, y) {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(`${text}`, x, y)
    }
}