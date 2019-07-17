//
// init-shaders.js
// =========
// Functions needed to initialize shaders and import external files.
//

// Credit:
// Taken from class files, initShader2.js.

function initialize_shaders(gl, vShaderFilename, fShaderFilename) {

    function get_shader(gl, shaderFilename, type) {
        
        // Create a shader of type <type>.
        var shader = gl.createShader(type);

        // load shader file, check if exists.
        var shaderFile = loadFileAJAX(shaderFilename);
        if (!shaderFile) {
            console.error("ERROR: Shader file " + shaderFilename + 
                " could not be loaded.");
            return;
        }

        // Compile the shader, check if it complies successfully.
        gl.shaderSource(shader, shaderFile);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("ERROR: Shader file " + shaderFilename + 
                " could not be complied.");
            return;
        }

        // Return shader.
        return shader;

    }

    // Get both shaders.
    var vShader = get_shader(gl, vShaderFilename, gl.VERTEX_SHADER);
    var fShader = get_shader(gl, fShaderFilename, gl.FRAGMENT_SHADER);

    // Create a program and attach shaders, check if linked successfully.
    var program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("ERROR: Cannot initialize shaders.");
        return;
    }

    return program;
}