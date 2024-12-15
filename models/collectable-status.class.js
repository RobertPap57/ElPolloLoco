class CollectableStatus extends DrawableObject {
  width = 60;
  height = 60;

  /**
   * Constructor for the CollectableStatus class.
   * @param {string} imagePath The path to the image to use for the status.
   * @param {number} x The x position of the status.
   * @param {number} y The y position of the status.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
  }

  /**
   * Draws the status on the given context with the given text.
   * The status is drawn at the position (this.x, this.y) and the text is drawn
   * to the right of the status at the position (this.x + this.width, this.y + this.height - 15).
   * @param {CanvasRenderingContext2D} ctx The context to draw on.
   * @param {string} text The text to draw.
   */
  drawStatus(ctx, text) {
    this.draw(ctx);
    this.drawText(ctx, text, this.x + this.width, this.y + this.height - 15);
  }
}