

let moveRight = false;
let moveLeft = false;
let moveUp = false;
let moveDown = false;


// RIGHT
const rightButton = document.getElementById("right");

rightButton.addEventListener("pointerdown", function() {
    moveRight = true;
});


// LEFT
const leftButton = document.getElementById("left");

leftButton.addEventListener("pointerdown", function() {
    moveLeft = true;
});


// UP
const upButton = document.getElementById("up");

upButton.addEventListener("pointerdown", function() {
    moveUp = true;
});


// DOWN
const downButton = document.getElementById("down");

downButton.addEventListener("pointerdown", function() {
    moveDown = true;
});


// STOP
function stopMoving() {

    moveRight = false;
    moveLeft = false;
    moveUp = false;
    moveDown = false;

}

document.addEventListener("pointerup", stopMoving);
document.addEventListener("pointercancel", stopMoving);