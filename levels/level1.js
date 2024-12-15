let level1;

/**
 * Initializes the game with a level 1.
 *
 * Creates a new level object with enemies, clouds, background objects, bottles, and coins.
 * The level object is stored in the level1 variable.
 */
function initLevel() {

    level1 = new Level(
        [
            new Chick(600),
            new Chick(900),
            new Chick(1200),
            new Chick(1500),
            new Chicken(1800),
            new Chick(2100),
            new Chicken(2400),
            new Chick(2700),
            new Chicken(3000),
            new Chick(3300),
            new Chicken(3600),
            new Chicken(3900),
            new Chicken(4200),
            new Endboss(),
        ],
        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 100),
            new Cloud('img/5_background/layers/4_clouds/2.png', 700),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1400),
            new Cloud('img/5_background/layers/4_clouds/2.png', 2100),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2800),
            new Cloud('img/5_background/layers/4_clouds/2.png', 3500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 4200),
            new Cloud('img/5_background/layers/4_clouds/2.png', 4900),

        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),


            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),


            new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
        ],
        [
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),


            new Coin(390, 165),
            new Coin(430, 110),
            new Coin(500, 80),
            new Coin(570, 110),
            new Coin(610, 165),

            new Coin(390 + 1000, 165),
            new Coin(430 + 1000, 110),
            new Coin(500 + 1000, 80),
            new Coin(570 + 1000, 110),
            new Coin(610 + 1000, 165),

            new Coin(390 + 2000, 165),
            new Coin(430 + 2000, 110),
            new Coin(500 + 2000, 80),
            new Coin(570 + 2000, 110),
            new Coin(610 + 2000, 165),

            new Coin(390 + 3000, 165),
            new Coin(430 + 3000, 110),
            new Coin(500 + 3000, 80),
            new Coin(570 + 3000, 110),
            new Coin(610 + 3000, 165),
        ]

    );
}