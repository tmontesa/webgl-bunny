//
// init/color.js
// =========
// Contains global varaibles, and initialization for the mesh fragment colors (bunny & lights).
//


var colorUniformLocation;
var fColor = vec4(	218 / 256,165 / 256,32 / 256, 1.0);
var PLColor = vec4(1.0, 0.0, 0.0, 0.5);
var SLColor = vec4(0.0, 0.0, 1.0, 0.5);

function init_color() {
    // Set fragment color of the model.
    colorUniformLocation = gl.getUniformLocation(program, 'fColor');
    gl.uniform4fv(colorUniformLocation, new Float32Array(fColor));
}