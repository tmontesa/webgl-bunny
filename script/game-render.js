//
// game-render.js
// =========
// Includes the necessary WebGL functions to render game-specific objects.
//

var mTranslate = mat4();
var mRotateX = mat4();
var mRotateY = mat4();

function game_render_world_translate() {
    if (bunny.translateX != 0 || bunny.translateY != 0 || bunny.translateZ != 0) {
        mTranslate = translate(bunny.translateX, bunny.translateY, bunny.translateZ);
        mWorld = mult(mTranslate, mWorld);
    }
}

function game_render_world_rotate() {
     if (bunny.rotateY != 0) {
        mRotateY = rotate(bunny.rotateY, vec3(1.0, 0.0, 0.0));
        mWorld = mult(mRotateY, mWorld);
    }
    
    if (bunny.rotateX != 0) {
        mRotateX = rotate(bunny.rotateX, vec3(0.0, 1.0, 0.0));
        mWorld = mult(mRotateX, mWorld);
    }
}

//
// Main Render Function
//

function game_render() {
    game_render_world_rotate();
    game_render_world_translate();
    

    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorld));
    gl.uniformMatrix4fv(mViewUniformLocation, gl.FALSE, flatten(mView));
    gl.uniformMatrix4fv(mProjUniformLocation, gl.FALSE, flatten(mProj));

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, indices_sent.length, gl.UNSIGNED_SHORT, 0);
}