class EndbossStatusBar extends StatusBar {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];
    
    /**
     * Constructor for the EndbossStatusBar class.
     * The EndbossStatusBar class is used to display the health of the endboss.
     * The constructor loads the images for the health bar, sets its position, and sets its initial value to 100.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 210; 
        this.y = 415;  
        this.width = 300; 
        this.height = 70; 
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the endboss's health bar.
     * @param {number} percentage The percentage to set the endboss's health bar to.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}