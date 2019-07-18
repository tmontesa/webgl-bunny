//
// init/transformations.js
// =========
// Contains global varaibles, and initialization for model-view matrix, projection matrix,
// and model matrices for the point and spotlight transformations.
//

// Matrices for world, view, and projection, and their uniform locations in the shader. 
// (Initially set to indentity.)
var mWorldUniformLocation;
var mViewUniformLocation;
var mProjUniformLocation;
var mWorld = mat4();
var mView = mat4();
var mProj = mat4();

var mWorldPUniformLocation;
var mWorldP = mat4();

var mWorldSUniformLocation;
var mWorldS = mat4();

function init_transformations() {
    // Get uniform matrices from vertex shader, and set initial values.
    mWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    mViewUniformLocation = gl.getUniformLocation(program, 'mView');
    mProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    mWorld = mat4(); // No world transformations initially, so set to identity.
    mView = lookAt(
        vec3(0.0, 0.0, 10.0), // Eye
        vec3(0.0, 0.0, 0.0), // At
        vec3(0.0, 1.0, 0.0) // Up
    );
    mProj = perspective(
        60, // FOV-Y
        canvas.width/canvas.height, // Aspect 
        0.1, // Near
        1000 // Far
    );

    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorld));
    gl.uniformMatrix4fv(mViewUniformLocation, gl.FALSE, flatten(mView));
    gl.uniformMatrix4fv(mProjUniformLocation, gl.FALSE, flatten(mProj));
}

function init_light_transformations() {
    mWorldPUniformLocation = gl.getUniformLocation(program, 'mWorldP');
    gl.uniformMatrix4fv(mWorldPUniformLocation, gl.FALSE, flatten(mWorldP));

    mWorldSUniformLocation = gl.getUniformLocation(program, 'mWorldS');
    gl.uniformMatrix4fv(mWorldSUniformLocation, gl.FALSE, flatten(mWorldS));
}