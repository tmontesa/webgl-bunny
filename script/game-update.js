//
// game-update.js
// =========
// Includes the necessary functions in order to calculate game-specific events.
//

var LMBReleased = false;
var RMBReleased = false;
var LMBLastPosX = 0;
var LMBLastPosY = 0;
var RMBLastPosX = 0;
var RMBLastPosY = 0;

function game_update_translate() {
    bunny.translateX = 0;
    bunny.translateY = 0;
    bunny.translateZ = 0;

    if (key.MOUSE_1) {
        if (LMBReleased) {
            LMBReleased = false;
        } else {
            bunny.translateX = bunny.translateSpeed * ((mouse.ABS_X - LMBLastPosX) / 100);
            bunny.translateY = -bunny.translateSpeed * ((mouse.ABS_Y - LMBLastPosY) / 100);
        }

        LMBLastPosX = mouse.ABS_X;
        LMBLastPosY = mouse.ABS_Y;
    } else {
        LMBReleased = true;
    }

    if (key.UP) { bunny.translateZ = bunny.translateSpeed; }
    if (key.DOWN) { bunny.translateZ = -bunny.translateSpeed; }
}

function game_update_rotate() {
    bunny.rotateX = 0;
    bunny.rotateY = 0;

    if (key.MOUSE_2) {
        if (RMBReleased) {
            RMBReleased = false;
        } else {
            bunny.rotateX = bunny.rotateSpeed * (mouse.ABS_X - RMBLastPosX);
            bunny.rotateY = bunny.rotateSpeed * (mouse.ABS_Y - RMBLastPosY);
        }

        RMBLastPosX = mouse.ABS_X;
        RMBLastPosY = mouse.ABS_Y;
    } else {
        RMBReleased = true;
    }

}

//
// Main Update Function
//

function game_update() {
    game_update_translate();
    game_update_rotate();
}