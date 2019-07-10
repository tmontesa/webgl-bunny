//
// init-webgl.js
// =========
// Function to initialize WebGL, as well as the main game loop.
//

var canvas, gl;

// Vertices and indices of ALL objects that will be drawn on screen.
var vertices = [];
var indices = [];
var vertices_sent = [];
var indices_sent = [];

// VertexBufferObject and IndexBufferObject for rendering.
var VBO;
var IBO;

// Matrices for world, view, and projection, and their uniform locations in the shader. 
// (Initially set to indentity.)
var mWorldUniformLocation;
var mViewUniformLocation;
var mProjUniformLocation;
var mWorld = mat4();
var mView = mat4();
var mProj = mat4();

function initialize() {
    console.log("Initializing...")

    // Create canvas, check if WebGL is supported.
    canvas = document.getElementById("game");
    gl = canvas.getContext("webgl");
    if (!gl) {
        console.error("ERROR: WebGL is not supported.");
    }
    
    // Set viewport & clear color.
    gl.viewport(0, 0, canvas.width, canvas.height);
    //gl.clearColor(1.0, 1.0, 0.8, 1.0);
    gl.clearColor(1, 1, 1, 1.0);

    // Load shaders.
    var program = initialize_shaders(gl, "shaders/vshader.glsl", "shaders/fshader.glsl");
    gl.useProgram(program);

    
    // Load vertices and indices.
    vertices = get_bunny_vertices();
    indices = get_bunny_indices();

    // Fix indices table cause it's offset
    for (var i = 0; i < indices.length; i++){
        for (var j = 0; j < indices[i].length; j++){
            indices[i][j] -= 1;
        }
    }

    vertices_sent = flatten(vertices);
    indices_sent = new Uint16Array(flatten(indices));

    // Create a vertex & index buffer object to bind vertices & indices to, and buffer.
    VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_sent, gl.STATIC_DRAW);
    
    IBO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices_sent, gl.STATIC_DRAW);

    // Get position attribute location, and bind the buffer to that attribute.
    var positionAttribLocation = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(
        positionAttribLocation,             // Attribute location
        3,                                  // Number of elements per attribute
        gl.FLOAT,                           // Data type of element
        gl.FLASE,
        0, // Size of each vertex
        0                                   // Offset of the specific attribute
    );

    // Enable attributes.
    gl.enableVertexAttribArray(positionAttribLocation);

    // Get uniform matrices from vertex shader, and set initial values.
    mWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    mViewUniformLocation = gl.getUniformLocation(program, 'mView');
    mProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    mWorld = mat4(); // No world transformations initially, so set to identity.
    mView = lookAt(
        vec3(0.0, 0.0, -10.0), // Eye
        vec3(0.0, 0.0, 0.0), // At
        vec3(0.0, 1.0, 0.0) // Up
    );
    mProj = perspective(
        45, // FOVy
        1, // Aspect (set to 1 since viewing on a square canvas)
        0.1, // Near
        1000 // Far
    );

    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorld));
    gl.uniformMatrix4fv(mViewUniformLocation, gl.FALSE, flatten(mView));
    gl.uniformMatrix4fv(mProjUniformLocation, gl.FALSE, flatten(mProj));


    // Start game loop.
    gl.useProgram(program);
    gl.clear(gl.COLOR_BUFFER_BIT);

    
    setInterval(game_loop, 20);
}
