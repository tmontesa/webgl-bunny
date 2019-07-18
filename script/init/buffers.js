//
// init/buffers.js
// =========
// Contains global varaibles, and initialization for WebGL buffer objects.
//

var VBO, IBO, NBO;
var cubeVBO, coneVBO;
var positionAttribLocation, normalAttribLocation, cubePositionAttribLocation, conePositionAttribLocation;

function init_buffer_vertices() {
    VBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, vertices_sent, gl.STATIC_DRAW);

    positionAttribLocation = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(
        positionAttribLocation,     // Attribute location
        3,                          // Number of elements per attribute
        gl.FLOAT,                   // Data type of element
        gl.FLASE,                   // Is data normalized
        0,                          // Size of each vertex (0 if tightly packed)
        0                           // Offset of the specific attribute
    );

    gl.enableVertexAttribArray(positionAttribLocation);
}

function init_buffer_indices() {
    IBO = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, IBO);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices_sent, gl.STATIC_DRAW);
}

function init_buffer_normals() {
    NBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, NBO);
    gl.bufferData(gl.ARRAY_BUFFER, normal_vertices_sent, gl.STATIC_DRAW);
    
    normalAttribLocation = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(
        normalAttribLocation,       // Attribute location
        3,                          // Number of elements per attribute
        gl.FLOAT,                   // Data type of element
        gl.TRUE,                    // Is data normalized
        0,                          // Size of each vertex (0 if tightly packed)
        0                           // Offset of the specific attribute
    );

    gl.enableVertexAttribArray(normalAttribLocation);
}

function init_buffer_cube_vertices() {
    cubeVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
    gl.bufferData(gl.ARRAY_BUFFER, cube_vertices_sent, gl.STATIC_DRAW);

    cubePositionAttribLocation = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(
        cubePositionAttribLocation, // Attribute location
        3,                          // Number of elements per attribute
        gl.FLOAT,                   // Data type of element
        gl.FLASE,                   // Is data normalized
        0,                          // Size of each vertex (0 if tightly packed)
        0                           // Offset of the specific attribute
    );

    gl.enableVertexAttribArray(cubePositionAttribLocation);
}

function init_buffer_cone_vertices() {
    coneVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, coneVBO);
    gl.bufferData(gl.ARRAY_BUFFER, cone_vertices_sent, gl.STATIC_DRAW);

    conePositionAttribLocation = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(
        conePositionAttribLocation, // Attribute location
        3,                          // Number of elements per attribute
        gl.FLOAT,                   // Data type of element
        gl.FLASE,                   // Is data normalized
        0,                          // Size of each vertex (0 if tightly packed)
        0                           // Offset of the specific attribute
    );

    gl.enableVertexAttribArray(conePositionAttribLocation);
}