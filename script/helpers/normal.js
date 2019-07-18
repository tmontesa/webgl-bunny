//
// helpers/normal.js
// =========
// Able to calculate face and vertex normals.
//

function calculate_face_normals(f, v) {
    var nf = new Array(f.length);

    for (var i = 0; i < f.length; i++) {

        nf[i] = cross(
            subtract(v[f[i][1]], v[f[i][0]]),
            subtract(v[f[i][2]], v[f[i][0]])
        );

    }

    return nf;
}

function calculate_vertex_normals(f, v, nf) {
    var nv = new Array(v.length).fill(vec3());

    for (var i = 0; i < f.length; i++) {
        for (var j = 0; j < f[i].length; j++) {
            nv[f[i][j]] = add(nv[f[i][j]], nf[i]);
        }
    }

    for (var k = 0; k < nv.length; k++) {
        nv[k] = normalize(nv[k]);
    }
 
    return nv;
}