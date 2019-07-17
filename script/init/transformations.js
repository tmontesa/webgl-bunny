// Matrices for world, view, and projection, and their uniform locations in the shader. 
// (Initially set to indentity.)
var mWorldUniformLocation;
var mViewUniformLocation;
var mProjUniformLocation;
var mWorld = mat4();
var mView = mat4();
var mProj = mat4();

var PL_mWorldUniformLocation;
var PL_mWorld = mat4();

var SL_mWorldUniformLocation;
var SL_mWorld = mat4();

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
    // Rotate light.
    PL_mWorldUniformLocation = gl.getUniformLocation(program, 'PL_mWorld');
    gl.uniformMatrix4fv(PL_mWorldUniformLocation, gl.FALSE, flatten(PL_mWorld));

    SL_mWorldUniformLocation = gl.getUniformLocation(program, 'SL_mWorld');
    gl.uniformMatrix4fv(SL_mWorldUniformLocation, gl.FALSE, flatten(SL_mWorld));

}