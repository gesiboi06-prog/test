

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 360;
canvas.height = 640;


// ========================
// PLAYER
// ========================

const playerImage = new Image();
playerImage.src = "image/pipo-nekonin022.png";

let playerX = 100;
let playerY = 150;
let playerFrame = 0;




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

    ctx.drawImage(
        playerImage,
        playerFrame * 32, 0,
        32, 32,
        playerX,
        playerY,
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

// PREVENT MOBILE ZOOM ON CONTROLS

document.querySelectorAll("#controls button").forEach(function(button) {

    button.addEventListener("touchstart", function(event) {
        event.preventDefault();
    }, { passive: false });

});
