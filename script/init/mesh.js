//
// Vertices & Indices
//

// Vertices and indices of ALL objects that will be drawn on screen.
var vertices, vertices_sent;
var indices, indices_sent;
var normal_faces, normal_vertices, normal_vertices_sent;
var cube_vertices, cube_vertices_sent;
var cone_vertices, cone_vertices_sent;


function init_vertices() {
    vertices = mesh_bunny.vertices;
    vertices_sent = flatten(vertices);
}

function init_indices() {
    indices = mesh_bunny.indices;

    // Fix indices table cause it's offset
    for (var i = 0; i < indices.length; i++){ 
        for (var j = 0; j < indices[i].length; j++){
            indices[i][j] -= 1;
        }
    }

    indices_sent = new Uint16Array(flatten(indices));
}

function init_normals() {
    normal_faces = calculate_face_normals(indices, vertices);
    normal_vertices = calculate_vertex_normals(indices, vertices, normal_faces);
    normal_vertices_sent = new Float32Array(flatten(normal_vertices));
}

function init_cube_vertices() {
    var cube_length = 0.5;

    var x = pointlight.position[0];
    var y = pointlight.position[1];
    var z = pointlight.position[2];
    var l = cube_length / 2.0;

    cube_vertices = [
        vec3(x-l, y-l, z-l), vec3(x+l, y-l, z-l),
        vec3(x-l, y+l, z-l), vec3(x+l, y+l, z-l),
        vec3(x-l, y-l, z-l), vec3(x-l, y+l, z-l),
        vec3(x+l, y-l, z-l), vec3(x+l, y+l, z-l),

        vec3(x-l, y-l, z+l), vec3(x+l, y-l, z+l),
        vec3(x-l, y+l, z+l), vec3(x+l, y+l, z+l),
        vec3(x-l, y-l, z+l), vec3(x-l, y+l, z+l),
        vec3(x+l, y-l, z+l), vec3(x+l, y+l, z+l),

        vec3(x-l, y-l, z-l), vec3(x-l, y-l, z+l),
        vec3(x+l, y-l, z-l), vec3(x+l, y-l, z+l),
        vec3(x-l, y+l, z-l), vec3(x-l, y+l, z+l),
        vec3(x+l, y+l, z-l), vec3(x+l, y+l, z+l)
        
    ];

    cube_vertices_sent = flatten(cube_vertices);
}

function init_cone_vertices() {
    var cone_length = 0.7;
    var cone_radius = 0.3;
    var cone_step = 24;

    var x = spotlight.position[0];
    var y = spotlight.position[1];
    var z = spotlight.position[2];
    
    var cone_circle_points = [];
    for (var i = 0; i < cone_step; i++) {
        cone_circle_points.push([
            cone_radius * Math.cos(radians(360 *(i/cone_step))),
            cone_radius * Math.sin(radians(360 *(i/cone_step)))
        ]);
    }

    cone_vertices = [];
    for (var j = 0; j < cone_step; j++) {
        cone_vertices.push(vec3(
            x + cone_circle_points[j][0],
            y - cone_length,
            z + cone_circle_points[j][1]
        ));
        cone_vertices.push(vec3(
            x + cone_circle_points[(j+1) % cone_step][0],
            y - cone_length,
            z + cone_circle_points[(j+1) % cone_step][1]
        ));
    }

    for (var k = 0; k < cone_step; k++) {
        cone_vertices.push(vec3(
            x + cone_circle_points[k][0],
            y - cone_length,
            z + cone_circle_points[k][1]
        ));

        cone_vertices.push(vec3(
            x,
            y,
            z
        ));

    }

    
    cone_vertices_sent = flatten(cone_vertices);
}