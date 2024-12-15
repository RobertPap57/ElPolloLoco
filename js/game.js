let canvas;
let world;
let keyboard = new Keyboard;
let gameStarted = false;
let soundsMuted = false;


/**
 * Initializes the game by getting the canvas element and creating a new World object.
 */
function initGame() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

/**
 * Changes the source of the image with the given id to the given src.
 * @param {string} id The id of the image element to change.
 * @param {string} src The new source of the image.
 */
function changeImageSrc(id, src) {
    const img = document.getElementById(id);
    img.src = src;
}

/**
 * Changes the class of the element with the given id from the oldClass to the newClass.
 * @param {string} id The id of the element to change.
 * @param {string} oldClass The class to remove from the element.
 * @param {string} newClass The class to add to the element.
 */
function changeClass(id, oldClass, newClass) {
    const obj = document.getElementById(id);
    obj.classList.remove(oldClass);
    obj.classList.add(newClass);
}

/**
 * Restarts the game by stopping the game, resetting the game state, and starting the game again.
 */
function restartGame() {
    world.stopGame();
    world.resetGame();
    world.startGame();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('btnHome').addEventListener('click', function () {
        backToHomeScreen();
    });
    document.getElementById('btnStart').addEventListener('click', function () {
        startGame();
    });
    document.getElementById('btnFullscreen').addEventListener('click', function () {
        toggleFullscreen();
    });
    document.getElementById('btnInfo').addEventListener('click', function () {
        toggleInfoPopUp();
    });
    document.getElementById('btnVolume').addEventListener('click', function () {
        toggleSoundsMuted();
    });
    document.addEventListener('click', function (event) {
        const infoPopUp = document.getElementById('instructions');
        const btnInfo = document.getElementById('btnInfo');
        if (!infoPopUp.classList.contains('d-none') &&
            !infoPopUp.contains(event.target) &&
            !btnInfo.contains(event.target)) {
            changeClass('instructions', 'info-container', 'd-none');
        }
    });
});

/**
 * Goes back to the home screen by resetting the buttons and resetting the game state.
 */
function backToHomeScreen() {
    changeImageSrc('btnStartImg', 'img/10_icons/play-fill.svg');
    changeClass('btnStartImg', 'restart-btn-img', 'btn-img');
    changeClass('startImg', 'd-none', 'start-img');
    changeClass('btnHome', 'menu-btn', 'd-none');
    gameStarted = false;
    world.stopGame();
    world.resetGame();
}

/**
 * Toggles the sounds of the game on or off.
 * If the sounds are on, clicking the button will mute them.
 * If the sounds are off, clicking the button will unmute them.
 * The button image is changed to reflect the current state of the sounds.
 */
function toggleSoundsMuted() {
    soundsMuted = !soundsMuted;
    if (soundsMuted) {
        changeImageSrc('btnVolumeImg', 'img/10_icons/volume-up-fill.svg');
    } if (!soundsMuted) {
        changeImageSrc('btnVolumeImg', 'img/10_icons/volume-mute-fill.svg');
    }
}

/**
 * Starts a new game or restarts the current one.
 * If the game has not been started yet, it will change the start button to a restart button,
 * hide the start image, and show the home button.
 * Then, it starts the game.
 * If the game has already been started, it will restart the current game by calling the restartGame function.
 */
function startGame() {
    if (!gameStarted) {
        changeImageSrc('btnStartImg', 'img/10_icons/icons8-reset-100.png');
        changeClass('btnStartImg', 'btn-img', 'restart-btn-img');
        changeClass('startImg', 'start-img', 'd-none');
        changeClass('btnHome', 'd-none', 'menu-btn');
        world.startGame();
        gameStarted = true;
    } else {
        restartGame();
    }
}

/**
 * Toggles the information pop-up on or off.
 * If the pop-up is not visible, it will be shown.
 * If the pop-up is visible, it will be hidden.
 */
function toggleInfoPopUp() {
    const infoPopUp = document.getElementById('instructions');
    if (infoPopUp.classList.contains('d-none')) {
        changeClass('instructions', 'd-none', 'info-container')
    } else {
        changeClass('instructions', 'info-container', 'd-none')
    }
}

/**
 * Toggles the full screen mode of the game on or off.
 * If the game is not in full screen mode, it will be set to full screen mode.
 * If the game is in full screen mode, it will be set to windowed mode.
 */
function toggleFullscreen() {
    const fullscreenElement = document.getElementById('canvasContainer');
    if (!document.fullscreenElement) {
        openFullscreen(fullscreenElement);
    } else {
        closeFullscreen();
    }
}


/**
 * Opens the given element in full screen mode.
 * @param {HTMLElement} elem The element to open in full screen mode.
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}


/**
 * Closes the full screen mode of the game.
 * If the game is in full screen mode, it will be set to windowed mode.
 * If the game is not in full screen mode, nothing will happen.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}