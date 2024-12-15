class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;

    /**
     * Binds the key press events and button press events.
     * Initializes the object by binding the key press and button press events.
     */
    constructor() {
        this.bindkeyPressEvents();
        this.bindBtnPressEvents();
    }

    /**
     * Binds the key down events for the left, right, up, down, and space keys.
     * When a key is pressed, it sets the corresponding property of the keyboard object to true.
     */
    bindKeyDownEvents() {
        window.addEventListener("keydown", (event) => {
            if (event.keyCode == 39) {
                keyboard.RIGHT = true;
            }
            if (event.keyCode == 37) {
                keyboard.LEFT = true;
            }
            if (event.keyCode == 38) {
                keyboard.UP = true;
            }
            if (event.keyCode == 40) {
                keyboard.DOWN = true;
            }
            if (event.keyCode == 32) {
                keyboard.SPACE = true;
            }
        });
    }
    
 
    /**
     * Binds the key up events for the left, right, up, down, and space keys.
     * When a key is released, it sets the corresponding property of the keyboard object to false.
     */
    bindKeyUpEvents() {
        window.addEventListener("keyup", (event) => {
            if (event.keyCode == 39) {
                keyboard.RIGHT = false;
            }
            if (event.keyCode == 37) {
                keyboard.LEFT = false;
            }
            if (event.keyCode == 38) {
                keyboard.UP = false;
            }
            if (event.keyCode == 40) {
                keyboard.DOWN = false;
            }
            if (event.keyCode == 32) {
                keyboard.SPACE = false;
            }
        });
    }
    
    
    /**
     * Binds the key down and key up events for the left, right, up, down, and space keys.
     * This function should be called once the document has loaded.
     * The events are bound using addEventListener.
     */
    bindkeyPressEvents() {
        this.bindKeyDownEvents();
        this.bindKeyUpEvents();
    }
    
    /**
     * Binds the event listeners for the game buttons.
     * This function should be called once the document has loaded.
     * The event listeners are added to the 'btnThrow', 'btnRight', 'btnLeft', and 'btnUp' elements.
     * The event listeners are added for the touchstart and touchend events as well as the mousedown and mouseup events.
     * The event listeners trigger the corresponding key press on the keyboard object.
     */
    bindBtnPressEvents() {
        document.addEventListener("DOMContentLoaded", () => {
            const btnThrow = document.getElementById('btnThrow');
            const btnRight = document.getElementById('btnRight');
            const btnLeft = document.getElementById('btnLeft');
            const btnUp = document.getElementById('btnUp');

            this.addEventListeners(btnThrow, 'SPACE');
            this.addEventListeners(btnRight, 'RIGHT');
            this.addEventListeners(btnLeft, 'LEFT');
            this.addEventListeners(btnUp, 'UP');
        });
    }

    /**
     * Adds event listeners for the given button and key to the keyboard object.
     * The event listeners are added for the mousedown, mouseup, touchstart, and touchend events.
     * The event listeners trigger the corresponding key press on the keyboard object.
     * @param {HTMLElement} button The button element to add the event listeners to.
     * @param {string} key The key to trigger on the keyboard object when the button is pressed.
     */
    addEventListeners(button, key) {
        button.addEventListener('mousedown', () => {
            this[key] = true;
        });
        button.addEventListener('mouseup', () => {
            this[key] = false;
        });
        button.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this[key] = true;
        }, { passive: false });
        button.addEventListener('touchend', (event) => {
            event.preventDefault();
            this[key] = false;
        }, { passive: false });
    }

}