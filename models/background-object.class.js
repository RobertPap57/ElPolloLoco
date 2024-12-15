class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  y = 0;

  /**
   * Creates a new BackgroundObject with the given image path and x position.
   * @param {string} imagePath The path to the image to use for the object.
   * @param {number} x The x position of the object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
  }
}