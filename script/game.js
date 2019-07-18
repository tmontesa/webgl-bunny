//
// game.js
// =========
// Initializes game-specific objects, constants, and functions that will be used outside of 
// rendering and game updates.
//

// Create listeners for keyboard & mouse input.
document.addEventListener("keydown", handlerKeyDown, false);
document.addEventListener("keyup", handlerKeyUp, false);
document.addEventListener("mousedown", handlerMouseDown, false);
document.addEventListener("mouseup", handlerMouseUp, false);
document.addEventListener("mousemove", handlerMousePosition, false);

var bunny = new Bunny();
var PRotationToggle = false;
var PRotationToggleCDMax = 7;
var PRotationToggleCD = 0;

var SRotationToggle = false;
var SRotationToggleCDMax = 7;
var SRotationToggleCD = 0;


//
// Game Functions
//

function reset() {
    mWorld = mat4();
}

function togglePRotation() {
    if (PRotationToggleCD > 0) { return; }
    PRotationToggle = !PRotationToggle;
    PRotationToggleCD = PRotationToggleCDMax;
}

function toggleSRotation() {
    if (SRotationToggleCD > 0) { return; }
    SRotationToggle = !SRotationToggle;
    SRotationToggleCD = SRotationToggleCDMax;
}

//
// Game Loop
//

function game_loop() {
    if (key.R) { reset(); }

    if (key.P) { togglePRotation(); }
    PRotationToggleCD--;

    if (key.S) { toggleSRotation(); }
    SRotationToggleCD--;

    game_update();
    game_render();
}