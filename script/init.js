//
// init.js
// =========
// Function to initialize WebGL, as well as the main game loop.
//

var canvas, gl;
var program;

function initialize() {
    console.log("Initializing...");

    // Create canvas, check if WebGL is supported.
    canvas = document.getElementById("game");
    gl = canvas.getContext("webgl");
    if (!gl) {
        console.error("ERROR: WebGL is not supported.");
    }
    
    // Set viewport & clear color.
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 1.0);

    // Load shaders.
    program = initialize_shaders(gl, "shaders/vshader.glsl", "shaders/fshader.glsl");
    gl.useProgram(program);
    
    //
    // Lighting, reflection.
    //

    init_lighting_global_ambient();
    init_lighting_pointlight();
    init_lighting_spotlight();
    init_lighting_material_reflection(); 
    
    //
    // Mesh vertices, faces, normals.
    //

    init_vertices();
    init_indices();
    init_normals();
    init_cube_vertices();
    init_cone_vertices();
    
    //
    // Transformation matrices.
    //

    init_transformations();
    init_light_transformations();

    //
    // Fragment color.
    //

    init_color();

    //
    // Buffer objects.
    //
    
    init_buffer_vertices();
    init_buffer_indices();
    init_buffer_normals();
    init_buffer_cube_vertices();
    init_buffer_cone_vertices();
    
    // Start game loop.
    gl.useProgram(program);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);

    console.log("Good to go!");
    setInterval(game_loop, 20);
}
