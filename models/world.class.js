class World {
    character;
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottleCollected = 0;
    coinCollected = 0;
    throwableObjects = [];
    gameLostScreen = new GameScreen('img/9_intro_outro_screens/game_over/game over.png', 0, 0, 720, 480);
    gameWonScreen = new GameScreen('img/9_intro_outro_screens/win/win_1.png', 0, 190, 500, 100);
    statusBar = new StatusBar();
    endbossStatusBar = new EndbossStatusBar();
    coinStatus = new CollectableStatus('img/7_statusbars/3_icons/icon_coin.png', 100, 58);
    bottleStatus = new CollectableStatus('img/7_statusbars/3_icons/icon_salsa_bottle.png', 10, 60);
    game_music = new Audio('audio/music.mp3');
    game_won_music = new Audio('audio/game_won.mp3');
    game_lost_music = new Audio('audio/game_lost.mp3');

    /**
     * Constructor for the World class.
     * @param {HTMLCanvasElement} canvas The canvas element to draw the game on.
     * @param {Keyboard} keyboard The keyboard object to use for input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.endbossStatusBar.visible = false;
    }

    /**
     * Starts the game by initializing the level, creating a character, and setting the world object on it.
     * Then it starts drawing the game, running the game loop, playing the game music, and setting the world object on the level's enemies.
     */
    startGame() {
        initLevel();
        this.level = level1;
        this.character = new Character(this);
        this.draw();
        this.run();
        this.playGameMusic();
        this.setWorld();
    }

    /**
     * Plays the game music if the game is not muted and the character is not dead and the endboss is not dead.
     * The music is played in an interval every 100 milliseconds.
     */
    playGameMusic() {
        setInterval(() => {
            let endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            if (!soundsMuted && !this.character.isDead() && !(endboss && endboss.isDead())) {
                this.game_music.play();
                this.game_music.volume = 0.1;
            } else {
                this.game_music.pause();
            }
        }, 100);
    }

    /**
     * Sets the world object on the character and the endboss.
     * This is needed to give the character and endboss access to the world's methods and properties.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;
            }
        });
    }

    /**
     * Runs the game loop, which checks for collisions, throwing objects, collecting objects, bottle collisions, the endboss entrance, game over, and game won.
     * The game loop runs every 1000/60 milliseconds.
     */
    run() {
        setInterval(() => {
            this.checkJumpEnemiesCollisions();
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollecting();
            this.checkBottleCollisions();
            this.checkBossEntrance();
            this.checkGameOver();
            this.checkGameWon();
        }, 1000 / 60);
    }

    /**
     * Stops all the world's sounds by pausing them and resetting their current time to 0.
     * This method is used when the game is stopped or reset.
     */
    stopWorldSounds() {
        this.game_music.pause();
        this.game_music.currentTime = 0;
        this.game_won_music.pause();
        this.game_won_music.currentTime = 0;
        this.game_lost_music.pause();
        this.game_lost_music.currentTime = 0;
    }

    /**
     * Stops the game by stopping all sounds, clearing all intervals, and clearing the canvas.
     * This method is used when the game is stopped or reset.
     */
    stopGame() {
        this.stopWorldSounds();
        this.character.stopCharacterSounds();
        if (this.level && this.level.enemies) {
            this.level.enemies.forEach(enemy => {
                if (enemy.stopSounds) {
                    enemy.stopSounds();
                }
            });
        }
        this.clearAllIntervals();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Resets the game by setting the camera's x position to 0, resetting the number of collected bottles and coins, clearing the array of throwable objects, and resetting the status bars.
     */
    resetGame() {
        this.camera_x = 0;
        this.bottleCollected = 0;
        this.coinCollected = 0;
        this.throwableObjects = [];
        this.statusBar = new StatusBar();
        this.endbossStatusBar = new EndbossStatusBar();
        this.endbossStatusBar.visible = false;
    }

    /**
     * Checks if the game is won by checking if the endboss is dead.
     * If the game is won and the game is not muted, the game won music is played.
     * After 1.5 seconds, all intervals are cleared and the game won music is paused.
     */
    checkGameWon() {
        if (this.level.enemies.find(enemy => enemy instanceof Endboss).isDead()) {
            if (!soundsMuted) {
                this.game_won_music.play();
            }
            setTimeout(() => {
                this.clearAllIntervals();
                this.game_won_music.pause();
            }, 1500);
        }
    }


    /**
     * Checks if the game is over by checking if the character is dead.
     * If the game is over and the game is not muted, the game lost music is played with a playback rate of 0.8.
     * After 1.5 seconds, all intervals are cleared and the game lost music is paused.
     */
    checkGameOver() {
        if (this.character.isDead()) {
            if (!soundsMuted) {
                this.game_lost_music.play();
                this.game_lost_music.playbackRate = 0.8;
            }
            setTimeout(() => {
                this.clearAllIntervals();
                this.game_lost_music.pause();
            }, 1500);
        }
    }

    /**
     * Clears all intervals in the range of 1 to 9998.
     * This is a brute force method to clear all intervals, as there is no method to
     * get all currently active intervals.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }

    /**
     * Checks if the character is at or beyond the entrance of the endboss area.
     * If the character is beyond the entrance, the endboss's health bar is made visible and the endboss's encountered flag is set to true.
     * If the sounds are not muted, the endboss's revealed sound is played.
     */
    checkBossEntrance() {
        if (this.character.x >= 4150) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof Endboss) {
                    if (!enemy.endbossEncountered) {
                        this.endbossStatusBar.visible = true;
                        enemy.endbossEncountered = true;
                        if (!soundsMuted) {
                            enemy.revealed_sound.play();
                        }
                    }
                }
            });
        }
    }

    /**
     * Checks for collisions between the bottles and the ground or the enemies.
     * If a bottle hits the ground, it is removed from the game.
     * If a bottle hits an enemy, the enemy is set to dead and removed from the game after 600 milliseconds.
     */
    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.hitGround()) {
                bottle.hit();
            }
            this.checkBottleEnemyCollisions(bottle);
        });
    }

    /**
     * Checks for collisions between the given bottle and the enemies (chicken, chick, or endboss).
     * If a collision is detected, the bottle is set to hit and the enemy is handled accordingly.
     * The enemy is set to dead and removed from the game after 600 milliseconds if it is a chicken or chick.
     * If the enemy is the endboss, its energy is decreased and the endboss status bar is updated.
     * @param {Bottle} bottle The bottle to check for collisions.
     */
    checkBottleEnemyCollisions(bottle) {
        this.level.enemies.forEach((enemy) => {
            let collisionOffset = (enemy instanceof Endboss) ? 20 : -5;
            if (bottle.isColliding(enemy, collisionOffset)) {
                bottle.hit();
                this.handleEnemyHit(enemy);
            }
        });
    }

    /**
     * Handles the hit of an enemy by a bottle.
     * If the enemy is a chicken or chick, it is set to dead and removed from the game after 600 milliseconds.
     * If the enemy is the endboss, its energy is decreased and the endboss status bar is updated.
     * @param {Enemy} enemy The enemy that was hit by the bottle.
     */
    handleEnemyHit(enemy) {
        if (enemy instanceof Chicken || enemy instanceof Chick) {
            enemy.setDead();
            setTimeout(() => {
                this.level.enemies = this.level.enemies.filter(e => e !== enemy);
            }, 600);
        } else if (enemy instanceof Endboss) {
            enemy.hit();
            this.endbossStatusBar.setPercentage(enemy.energy);
        }
    }

    /**
     * Checks for collisions between the character and the enemies (chicken or chick) when the character is jumping.
     * If a collision is detected, the character jumps higher and the enemy is set to dead and removed from the game after 600 milliseconds.
     */
    checkJumpEnemiesCollisions() {
        this.level.enemies.forEach((enemy) => {
            if ((enemy instanceof Chicken || enemy instanceof Chick) &&
                this.character.isColliding(enemy, 0) &&
                this.character.timeInAir > 0.5) {
                this.character.jump(9);
                this.character.jumpImgIndex = 0;
                enemy.setDead();
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 600);
            }
        });
    }

    /**
     * Checks if the character is throwing a bottle and if so, throws a bottle.
     * This method is called in the game loop and checks if the character is throwing by checking the isThrowing property.
     * If the character is throwing, the method sets the isThrowing property to false and uses a timeout to create a new
     * ThrowableObject after 200 milliseconds. The bottle is then added to the array of throwable objects and the bottle
     * collected status is updated.
     */
    checkThrowObjects() {
        if (this.character.isThrowing) {
            this.character.isThrowing = false;
            setTimeout(() => {
                let bottle = new ThrowableObject(this.character.x + 80, this.character.y + 50);
                this.throwableObjects.push(bottle);
                this.bottleCollected -= 1;
                this.bottleStatus.drawStatus(this.ctx, this.bottleCollected);
                this.character.throwImgIndex = 0;
            }, 200);
        }
    }

    /**
     * Checks for collisions between the character and the enemies (chicken, chick, or endboss) when the character is not jumping.
     * If a collision is detected, the character is hit and the character's energy is updated.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy, -5) && enemy instanceof Chicken && !this.character.isJumping) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
            if (this.character.isColliding(enemy, 5) && enemy instanceof Chick && !this.character.isJumping) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            } if (this.character.isColliding(enemy, 30) && enemy instanceof Endboss) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
            }
        });
    }

    /**
     * Checks if the character is colliding with a collectable object (Coin or Bottle)
     * @param {Collectable} collectable The collectable object to check for collision with the character
     * @returns {boolean} True if the character is colliding with the collectable object, false otherwise
     */
    checkCollectableCollision(collectable) {
        if (collectable instanceof Coin) {
            return this.character.isColliding(collectable, 0);  // Coin uses offset of 10
        } else if (collectable instanceof Bottle) {
            return this.character.isColliding(collectable, 30);  // Bottle uses offset of 50
        }
        return false;
    }

    /**
     * Checks if the character is colliding with any collectable objects (coins or bottles)
     * and updates the coin and bottle counters accordingly.
     * The collectable object is also removed from the game and its sound is played.
     */
    checkCollecting() {
        this.level.collectableObjects = this.level.collectableObjects.filter((collectable) => {
            if (this.checkCollectableCollision(collectable)) {
                if (collectable instanceof Coin) {
                    this.coinCollected += 1;
                } else if (collectable instanceof Bottle) {
                    this.bottleCollected += 1;
                }
                collectable.playSound();
                return false;
            }
            return true;
        });
    }

    /**
     * Draws the background of the game by adding the background objects, clouds, and
     * collectable objects to the game map.
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.collectableObjects);
        this.addObjectsToMap(this.level.collectableObjects);
    }

    /**
     * Draws the status bars of the game by drawing the coin, bottle, character and endboss status bars.
     * The coin and bottle status bars are drawn with the corresponding counters.
     * The character status bar is always drawn.
     * The endboss status bar is only drawn if the endboss is visible.
     */
    drawStatus() {
        this.coinStatus.drawStatus(this.ctx, this.coinCollected);
        this.bottleStatus.drawStatus(this.ctx, this.bottleCollected);
        this.addToMap(this.statusBar);
        if (this.endbossStatusBar.visible) {
            this.addToMap(this.endbossStatusBar);
        }
    }

    /**
     * Draws the game screens depending on the game state.
     * If the character is dead, the game lost screen is drawn at the character's position.
     * If the endboss is dead and the character is not dead, the game won screen is drawn at the character's position.
     */
    drawGameScreens() {
        if (this.character.isDead()) {
            this.gameLostScreen.x = this.character.x - 100;
            this.addToMap(this.gameLostScreen);
        }
        if (this.level.enemies.find(enemy => enemy instanceof Endboss).isDead() && !this.character.isDead()) {
            this.gameWonScreen.x = this.character.x;
            this.addToMap(this.gameWonScreen);
        }
    }

    /**
     * Draws the movable objects of the game by adding the character, enemies and
     * throwable objects to the game map.
     */
    drawMovebleObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Draws the game by clearing the canvas, translating to the camera position, drawing the background, translating back to the origin, drawing the status bars, translating to the camera position again, drawing the movable objects, drawing the game screens, and translating back to the origin.
     * Finally, it calls itself with requestAnimationFrame to draw the game again.
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.ctx.translate(- this.camera_x, 0);
        this.drawStatus();
        this.ctx.translate(this.camera_x, 0);
        this.drawMovebleObjects();
        this.drawGameScreens();
        this.ctx.translate(- this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the game map by calling the addToMap method
     * for each object in the array.
     * @param {MovableObject[]} objects The array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        })
    }

    /**
     * Adds a movable object to the game map by drawing it on the context.
     * If the object has the otherDirection property set to true, it flips the
     * object horizontally before and after drawing it.
     * @param {MovableObject} mo The movable object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the movable object horizontally by translating the context to the
     * right edge of the object, scaling it horizontally by -1, and negating the
     * object's x position. This method is used to flip the character and enemies
     * when they are moving to the left.
     * @param {MovableObject} mo The movable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Reverses the effects of the flipImage method by translating the context
     * back to its original position and negating the object's x position.
     * This method is used to flip the character and enemies back to their
     * original orientation after drawing them.
     * @param {MovableObject} mo The movable object to flip back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}