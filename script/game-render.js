//
// game-render.js
// =========
// Includes the necessary WebGL functions to render game-specific objects.
//

var rotationX = 0;
var rotationY = 0;
var mRotX = mat4();
var mRotY = mat4();


function game_render_world_rotate() {
    rotationX = 0;

    if (key.LEFT) {
        rotationX = -5;
        console.log("Rotating left...");
    } 

    if (key.RIGHT) {
        rotationX = 5;
        console.log("Rotating right...");
    }

    mRotX = rotate(rotationX, vec3(0.0, 1.0, 0.0));

    mWorld = mult(mRotX, mWorld);
}

//
// Main Render Function
//

function game_render() {
    game_render_world_rotate();

    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorld));
    gl.uniformMatrix4fv(mViewUniformLocation, gl.FALSE, flatten(mView));
    gl.uniformMatrix4fv(mProjUniformLocation, gl.FALSE, flatten(mProj));

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices_sent.length, gl.UNSIGNED_SHORT, 0);
}