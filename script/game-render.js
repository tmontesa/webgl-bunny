//
// game-render.js
// =========
// Includes the necessary WebGL functions to render game-specific objects.
//

var mTranslate = mat4();
var mRotateX = mat4();
var mRotateY = mat4();

var PL_mRotateX = rotate(2.0, vec3(0.0, 1.0, 0.0));

var SL_rot = 1.5;
var SL_mRotateZ = rotate(SL_rot, vec3(0.0, 0.0, 1.0));

var SL_translate = mat4();
var SL_translate_inverse = mat4();
var SL_transform = mat4();
var SL_rotcount_max = Math.round(180/SL_rot);
var SL_rotcount = SL_rotcount_max / 2;



function game_render_model_world_translate() {
    if (bunny.translateX != 0 || bunny.translateY != 0 || bunny.translateZ != 0) {
        mTranslate = translate(bunny.translateX, bunny.translateY, bunny.translateZ);
        mWorld = mult(mTranslate, mWorld);
    }
}

function game_render_model_world_rotate() {
     if (bunny.rotateY != 0) {
        mRotateY = rotate(bunny.rotateY, vec3(1.0, 0.0, 0.0));
        mWorld = mult(mRotateY, mWorld);
    }
    
    if (bunny.rotateX != 0) {
        mRotateX = rotate(bunny.rotateX, vec3(0.0, 1.0, 0.0));
        mWorld = mult(mRotateX, mWorld);
    }
}

function game_render_PL_world_rotate() {
    if (!PRotationToggle) { return; }
    mWorldP = mult(PL_mRotateX, mWorldP);
}

function game_render_SL_world_rotate() {
    //if (!sLRotation) { return; }
    //console.log(SL_rotcount + " - " + SL_rot);

    if (!SRotationToggle) { return; }

    if (SL_rotcount <= 0) {
        SL_rot *= -1;
        SL_mRotateZ = rotate(SL_rot, vec3(0.0, 0.0, 1.0));
        SL_rotcount = SL_rotcount_max;
    } 
    SL_rotcount--;
    

    mWorldS = mult(SL_translate, mult(SL_mRotateZ, mult(SL_translate_inverse, mWorldS)));
    
}

//
// Main Render Function
//

function game_render() {
    game_render_model_world_rotate();
    game_render_model_world_translate();
    game_render_PL_world_rotate();
    game_render_SL_world_rotate();

    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorld));
    gl.uniformMatrix4fv(mViewUniformLocation, gl.FALSE, flatten(mView));
    gl.uniformMatrix4fv(mProjUniformLocation, gl.FALSE, flatten(mProj));

    gl.uniformMatrix4fv(mWorldPUniformLocation, gl.FALSE, flatten(mWorldP));
    gl.uniformMatrix4fv(mWorldSUniformLocation, gl.FALSE, flatten(mWorldS));

    gl.clear(gl.COLOR_BUFFER_BIT);

    //
    // Draw the amazing golden bunny!
    //

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.vertexAttribPointer(
        positionAttribLocation,     // Attribute location
        3,                          // Number of elements per attribute
        gl.FLOAT,                   // Data type of element
        gl.FLASE,                   // Is data normalized
        0,                          // Size of each vertex (0 if tightly packed)
        0                           // Offset of the specific attribute
    );
    gl.enableVertexAttribArray(positionAttribLocation);

    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorld));

    gl.uniform4fv(colorUniformLocation, new Float32Array(fColor));
    gl.drawElements(gl.TRIANGLES, indices_sent.length, gl.UNSIGNED_SHORT, 0);

    //
    // Draw the wireframe cube for the pointlight.
    //

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
    gl.vertexAttribPointer(
        cubePositionAttribLocation, // Attribute location
        3,                          // Number of elements per attribute
        gl.FLOAT,                   // Data type of element
        gl.FLASE,                   // Is data normalized
        0,                          // Size of each vertex (0 if tightly packed)
        0                           // Offset of the specific attribute
    );
    gl.enableVertexAttribArray(cubePositionAttribLocation);
    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorldP));

    gl.uniform4fv(colorUniformLocation, new Float32Array(PLColor));
    gl.drawArrays(gl.LINES, 0, cube_vertices.length);

    //
    // Draw the wireframe cone for the pointlight.
    //

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, coneVBO);
    gl.vertexAttribPointer(
        conePositionAttribLocation, // Attribute location
        3,                          // Number of elements per attribute
        gl.FLOAT,                   // Data type of element
        gl.FLASE,                   // Is data normalized
        0,                          // Size of each vertex (0 if tightly packed)
        0                           // Offset of the specific attribute
    );
    gl.enableVertexAttribArray(conePositionAttribLocation);
    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorldS));

    gl.uniform4fv(colorUniformLocation, new Float32Array(SLColor));
    gl.drawArrays(gl.LINES, 0, cone_vertices.length);

}