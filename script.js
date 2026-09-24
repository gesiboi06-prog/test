console.log("GAME JS STARTED");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 360;
canvas.height = 640;


// ========================
// PLAYER
// ========================

const playerImage = new Image();
playerImage.src = "image/pipo-nekonin022.png";

let playerX = 300;
let playerY = 150;


console.log(playerImage);


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

    ctx.drawImage(
        playerImage,

        // Sprite sheet source
        0, 0,
        32, 32,

        // Position on canvas
        playerX, playerY,

        // Size on screen
        32, 32
    );
}


// ========================
// UPDATE GAME
// ========================

function updateGame() {

    if (moveRight) {
        playerX = playerX + 5;
    }

    if (moveLeft) {
        playerX = playerX - 5;
    }

    if (moveUp) {
        playerY = playerY - 5;
    }

    if (moveDown) {
        playerY = playerY + 5;
    }

}



// ========================
// GAME LOOP
// ========================

function gameLoop() {

    clearScreen();

    updateGame();

    drawPlayer();

    requestAnimationFrame(gameLoop);
}


// START GAME

playerImage.onload = function() {
    gameLoop();
};
