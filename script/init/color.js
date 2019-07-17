// Fragment color.
var colorUniformLocation;
var fColor = vec4(1.0, 0.7, 0.0, 1.0);
var PLColor = vec4(1.0, 0.0, 0.0, 0.5);
var SLColor = vec4(0.0, 0.0, 1.0, 0.5);

function init_color() {
    // Set fragment color of the model.
    colorUniformLocation = gl.getUniformLocation(program, 'fColor');
    gl.uniform4fv(colorUniformLocation, new Float32Array(fColor));
}