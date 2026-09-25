const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 240;
canvas.height = 440;


// ========================
// PLAYER
// ========================

const playerImage = new Image();
playerImage.src = "image/pipo-nekonin022.png";


// ========================
// BACKGROUND TILESET
// ========================

const backgroundImage = new Image();
backgroundImage.src = "image/tile.png";


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
// GROUND MAP
// ========================

const groundMap = [
    [71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,71],
    [23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,24,25,71],
    [23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,25,71],
    [46,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,48,71],
    [71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71],
    [71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71],
    [71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71,71]
];


// ========================
// OBJECT MAP
// ========================
// 0 = walang object
// 6,7,8,9 = test objects

const objectMap = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,6,7,8,9,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,96,94,28,29,30,31,32,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,51,52,53,54,55,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,75,76,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,10,0,11,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,10,0,11,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,67,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,4,89,90,91,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,27,112,113,114,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,35,36,37,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];


// ========================
// MAP SIZE
// ========================

const mapWidth = groundMap[0].length * 32;
const mapHeight = groundMap.length * 32;


// ========================
// DRAW GROUND
// ========================

function drawGround() {

    for (let row = 0; row < groundMap.length; row++) {

        for (let col = 0; col < groundMap[row].length; col++) {

            let tile = groundMap[row][col];

            const TILESET_COLS = 23;

            let tileX = tile % TILESET_COLS;
            let tileY = Math.floor(tile / TILESET_COLS);

            ctx.drawImage(
                backgroundImage,

                // SOURCE
                tileX * 32,
                tileY * 32,
                32,
                32,

                // DESTINATION
                col * 32 - cameraX,
                row * 32 - cameraY,
                32,
                32
            );

        }
    }
}


// ========================
// DRAW OBJECTS
// ========================

function drawObjects() {

    for (let row = 0; row < objectMap.length; row++) {

        for (let col = 0; col < objectMap[row].length; col++) {

            let object = objectMap[row][col];

            // 0 = walang object
            if (object === 0) {
                continue;
            }

            // ========================
            // OBJECT TILE POSITION
            // ========================

            const TILESET_COLS = 23;

            let tileX = object % TILESET_COLS;
            let tileY = Math.floor(object / TILESET_COLS);

            // ========================
            // DRAW OBJECT FROM TILESET
            // ========================

            ctx.drawImage(

                backgroundImage,

                // SOURCE
                tileX * 32,
                tileY * 32,
                32,
                32,

                // DESTINATION
                col * 32 - cameraX,
                row * 32 - cameraY,
                32,
                32
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

    if (playerDirection === "left") {
        sourceY = 32;
    }

    if (playerDirection === "right") {
        sourceY = 64;
    }

    if (playerDirection === "up") {
        sourceY = 96;
    }

    ctx.drawImage(
        playerImage,
        playerFrame * 32,
        sourceY,
        32,
        32,

        playerX - cameraX,
        playerY - cameraY,
        32,
        32
    );
}


// ========================
// UPDATE GAME
// ========================

function updateGame() {

    // MOVEMENT

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


    // PLAYER BOUNDARIES

    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > mapWidth - 32) {
        playerX = mapWidth - 32;
    }

    if (playerY < 0) {
        playerY = 0;
    }

    if (playerY > mapHeight - 32) {
        playerY = mapHeight - 32;
    }


    // CAMERA

    cameraX = playerX - canvas.width / 2 + 16;
    cameraY = playerY - canvas.height / 2 + 16;

    if (cameraX < 0) {
        cameraX = 0;
    }

    if (cameraY < 0) {
        cameraY = 0;
    }

    if (cameraX > mapWidth - canvas.width) {
        cameraX = Math.max(
            0,
            mapWidth - canvas.width
        );
    }

    if (cameraY > mapHeight - canvas.height) {
        cameraY = Math.max(
            0,
            mapHeight - canvas.height
        );
    }


    // WALKING ANIMATION

    if (
        moveRight ||
        moveLeft ||
        moveUp ||
        moveDown
    ) {

        frameCounter = frameCounter + 1;

        if (frameCounter >= 10) {

            playerFrame =
                (playerFrame + 1) % 3;

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

    // 1. GROUND
    drawGround();

    // 2. OBJECTS
    drawObjects();

    // 3. PLAYER
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
