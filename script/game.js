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

// New objects.
var bunny = new Bunny();


//
// Game Functions
//

function reset() {
    mWorld = mat4();
}

//
// Game Loop
//

function game_loop() {
    if (key.R) { reset(); }
    game_update();
    game_render();
}