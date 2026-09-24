const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 360;
canvas.height = 640;


// ========================
// PLAYER
// ========================

const playerImage = new Image();
playerImage.src = "image/pipo-nekonin022.png";


// ========================
// BACKGROUND TILE
// ========================

const backgroundImage = new Image();
backgroundImage.src = "image/forest_tile.png";


// ========================
// PLAYER SETTINGS
// ========================

let playerX = 100;
let playerY = 150;
let speed = 2;

let cameraX = 0;
let cameraY = 0;

let playerFrame = 0;
let frameCounter = 0;
let playerDirection = "down";


// ========================
// MAP
// ========================

const map = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,3,3,3,0,0,0,0],
    [0,0,3,0,3,0,0,0,0],
    [0,0,3,3,3,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
];


// ========================
// DRAW MAP
// ========================

function drawMap() {

    for (let row = 0; row < map.length; row++) {

        for (let col = 0; col < map[row].length; col++) {

            let tile = map[row][col];

            let tileX = tile % 9;
            let tileY = Math.floor(tile / 9);

            ctx.drawImage(
                backgroundImage,
                tileX * 64,
                tileY * 64,
                64,
                64,
                col * 64 - cameraX,
                row * 64,
                64,
                64
            );

        }

    }

}


// ========================
// CLEAR SCREEN
// ========================

function clearScreen() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "green";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// ========================
// DRAW PLAYER
// ========================

function drawPlayer() {

    if (!playerImage.complete) {
        return;
    }

    let sourceY = 0;


    // PLAYER DIRECTION

    if (playerDirection === "left") {
        sourceY = 32;
    }

    if (playerDirection === "right") {
        sourceY = 64;
    }

    if (playerDirection === "up") {
        sourceY = 96;
    }


    // DRAW PLAYER

    ctx.drawImage(
        playerImage,
        playerFrame * 32,
        sourceY,
        32,
        32,
        playerX - cameraX,
        playerY,
        32,
        32
    );

}


// ========================
// UPDATE GAME
// ========================

function updateGame() {


    // ========================
    // MOVEMENT
    // ========================

    if (moveRight) {

        playerX = playerX + speed;
        playerDirection = "right";

    }


    if (moveLeft) {

        playerX = playerX - speed;
        playerDirection = "left";

    }


    if (moveUp) {

        playerY = playerY - speed;
        playerDirection = "up";

    }


    if (moveDown) {

        playerY = playerY + speed;
        playerDirection = "down";

    }


    // ========================
    // PLAYER BOUNDARIES
    // ========================

    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > 544) {
        playerX = 544;
    }
	if (playerY < 0) {
    playerY = 0;
	}

	if (playerY > 608) {
    playerY = 608;
	}


    // ========================
    // CAMERA
    // ========================

    cameraX = playerX - 180;


    if (cameraX < 0) {
        cameraX = 0;
    }


    if (cameraX > 216) {
        cameraX = 216;
    }


    // ========================
    // WALKING ANIMATION
    // ========================

    if (
        moveRight ||
        moveLeft ||
        moveUp ||
        moveDown
    ) {

        frameCounter = frameCounter + 1;


        if (frameCounter >= 10) {

            playerFrame = (playerFrame + 1) % 3;

            frameCounter = 0;

        }

    }

}


// ========================
// GAME LOOP
// ========================

function gameLoop() {

    clearScreen();

    updateGame();

    drawMap();

    drawPlayer();

    requestAnimationFrame(gameLoop);

}


// ========================
// START GAME
// ========================

playerImage.onload = function() {

    gameLoop();

};


// ========================
// PREVENT MOBILE ZOOM
// ========================

document.querySelectorAll("#controls button")
.forEach(function(button) {

    button.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

        },
        { passive: false }
    );

});
