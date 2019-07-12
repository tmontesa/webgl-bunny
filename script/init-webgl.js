//
// init-webgl.js
// =========
// Function to initialize WebGL, as well as the main game loop.
//

var canvas, gl;

// Vertices and indices of ALL objects that will be drawn on screen.

var normal_faces = [];
var normal_vertices = [];
var normal_vertices_sent = [];

// Matrices for world, view, and projection, and their uniform locations in the shader. 
// (Initially set to indentity.)
var mWorldUniformLocation;
var mViewUniformLocation;
var mProjUniformLocation;
var mWorld = mat4();
var mView = mat4();
var mProj = mat4();

// Lighting.
var ambientUniformLocation;
var pointlightPositionUniformLocation;
var pointlightDiffuseUniformLocation;
var pointlightSpecularUniformLocation;
var colorUniformLocation;

var ambient;
var pointlight;
var fColor;


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
    vertices = mesh_bunny.vertices;
    indices = mesh_bunny.indices;

    
    for (var i = 0; i < indices.length; i++){ // Fix indices table cause it's offset
        for (var j = 0; j < indices[i].length; j++){
            indices[i][j] -= 1;
        }
    }

    vertices_sent = flatten(vertices);
    indices_sent = new Uint16Array(flatten(indices));

    // Calculate normals.
    normal_faces = calculate_face_normals(indices, vertices);
    normal_vertices = calculate_vertex_normals(indices, vertices, normal_faces);

    normal_vertices_sent = new Float32Array(flatten(normal_vertices));

    // Create a vertex, faces (index), and normal buffer objects.
    var VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_sent, gl.STATIC_DRAW);
    
    var IBO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices_sent, gl.STATIC_DRAW);

    var NBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, NBO);
    gl.bufferData(gl.ARRAY_BUFFER, normal_vertices_sent, gl.STATIC_DRAW);

    // Get position attribute location, and bind the buffer to that attribute.
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    var positionAttribLocation = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(
        positionAttribLocation,             // Attribute location
        3,                                  // Number of elements per attribute
        gl.FLOAT,                           // Data type of element
        gl.FLASE,
        0, // Size of each vertex
        0                                   // Offset of the specific attribute
    );
    gl.enableVertexAttribArray(positionAttribLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, NBO);
    var normalAttribLocation = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(
        normalAttribLocation,             // Attribute location
        3,                                  // Number of elements per attribute
        gl.FLOAT,                           // Data type of element
        gl.TRUE,
        0, // Size of each vertex
        0                                   // Offset of the specific attribute
    );
    gl.enableVertexAttribArray(normalAttribLocation);


    // Get uniform matrices from vertex shader, and set initial values.
    mWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    mViewUniformLocation = gl.getUniformLocation(program, 'mView');
    mProjUniformLocation = gl.getUniformLocation(program, 'mProj');

    mWorld = mat4(); // No world transformations initially, so set to identity.
    mView = lookAt(
        vec3(0.0, 0.0, 8.0), // Eye
        vec3(0.0, 0.0, 0.0), // At
        vec3(0.0, 1.0, 0.0) // Up
    );
    mProj = perspective(
        45, // FOV-Y
        1, // Aspect (set to 1 since viewing on a square canvas)
        0.1, // Near
        1000 // Far
    );

    gl.uniformMatrix4fv(mWorldUniformLocation, gl.FALSE, flatten(mWorld));
    gl.uniformMatrix4fv(mViewUniformLocation, gl.FALSE, flatten(mView));
    gl.uniformMatrix4fv(mProjUniformLocation, gl.FALSE, flatten(mProj));

    // Intialize lighting.

    ambientUniformLocation = gl.getUniformLocation(program, 'ambientIntensity');
    pointlightPositionUniformLocation = gl.getUniformLocation(program, 'pointlight.position');
    pointlightDiffuseUniformLocation = gl.getUniformLocation(program, 'pointlight.diffuse');
    pointlightSpecularUniformLocation = gl.getUniformLocation(program, 'pointlight.specular');
    colorUniformLocation = gl.getUniformLocation(program, 'fColor');

    ambient = new AmbientLight(
        vec4(0.15, 0.15, 0.95, 1.0) // Ambient
    );

    pointlight = new PointLight(
        vec4(5.0, 5.0, 5.0, 1.0),   // Position
        vec4(1.0, 1.0, 1.0, 1.0),   // Diffuse
        vec4(1.0, 1.0, 1.0, 1.0)    // Specular
    );

    fColor = vec4(1.0, 0.7, 0.0, 1.0);
    
    gl.uniform4fv(ambientUniformLocation, new Float32Array(ambient.ambient));
    gl.uniform4fv(pointlightPositionUniformLocation, new Float32Array(pointlight.position));
    gl.uniform4fv(pointlightDiffuseUniformLocation, new Float32Array(pointlight.diffuse));
    gl.uniform4fv(pointlightSpecularUniformLocation, new Float32Array(pointlight.specular));
    gl.uniform4fv(colorUniformLocation, new Float32Array(fColor));

    // Start game loop.
    gl.useProgram(program);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.frontFace(gl.CCW);
    gl.cullFace(gl.BACK);
    
    setInterval(game_loop, 20);
}
