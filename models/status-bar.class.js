class StatusBar extends DrawableObject {

IMAGES = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',  
];

percentage = 0

/**
 * Constructor for the StatusBar class.
 * 
 * Initializes the status bar with the green images at the top left of the screen.
 * The status bar is set to 100%.
 */
constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
}

/**
 * Sets the percentage of the status bar.
 * @param {number} percentage The percentage to set the status bar to.
 */
setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
}

/**
 * Returns the index of the image in the IMAGES array that corresponds to the current percentage.
 * 100% maps to the 5th image, 80% maps to the 4th image, and so on.
 * @returns {number} The index of the image in the IMAGES array.
 */
resolveImageIndex() {
    if (this.percentage == 100) {
        return 5;
    } else if (this.percentage >= 80) {
        return 4;
    } else if (this.percentage >= 60) {
        return 3;
    } else if (this.percentage >= 40) {
        return 2;
    } else if (this.percentage >= 20) {
        return 1;
    } else {
        return 0;
    }
}
}