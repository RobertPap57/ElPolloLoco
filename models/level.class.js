class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableObjects;
    level_end_x = 4410;

    /**
     * Constructor for the Level class.
     * @param {array} enemies An array of enemies for the level.
     * @param {array} clouds An array of clouds for the level.
     * @param {array} backgroundObjects An array of background objects for the level.
     * @param {array} collectableObjects An array of collectable objects for the level.
     */
    constructor(enemies, clouds, backgroundObjects, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjects = collectableObjects;
    }
}