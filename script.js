

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
let speed    = 2;

let playerFrame = 0;
let frameCounter = 0;
let playerDirection = "down";




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
        playerFrame * 32, sourceY,
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
    
   if (moveRight || moveLeft || moveUp || moveDown) {

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
