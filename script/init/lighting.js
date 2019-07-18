//
// init/lighting.js
// =========
// Contains global varaibles, and initialization for point & spot lights,
// and material reflection values.
//

// Global ambient.
var ambientUniformLocation;
var globalAmbient;

// Point & spotlight.
var pointlight;
var spotlight;

// Material reflection.
var matref;


function init_lighting_global_ambient() {
    ambientUniformLocation = gl.getUniformLocation(program, 'ambientIntensity');
    globalAmbient = vec4(0.1, 0.1, 0.1, 1.0);
    gl.uniform4fv(ambientUniformLocation, new Float32Array(globalAmbient));
}

function init_lighting_pointlight() {

    pointlight = new PointLight(
        vec4(5.0, 5.0, 0.0, 1.0),  // Position
        vec4(0.3, 0.3, 0.3, 1.0),   // Ambient
        vec4(0.6, 0.6, 0.6, 1.0),   // Diffuse
        vec4(1.0, 1.0, 1.0, 1.0),   // Specular

        new PointLightLocation(
            gl.getUniformLocation(program, 'p.position'),
            gl.getUniformLocation(program, 'p.ambient'),
            gl.getUniformLocation(program, 'p.diffuse'),
            gl.getUniformLocation(program, 'p.specular')
        )
    );
    
    gl.uniform4fv(pointlight.location.position, new Float32Array(pointlight.position));
    gl.uniform4fv(pointlight.location.ambient,  new Float32Array(pointlight.ambient));
    gl.uniform4fv(pointlight.location.diffuse,  new Float32Array(pointlight.diffuse));
    gl.uniform4fv(pointlight.location.specular, new Float32Array(pointlight.specular));
}

function init_lighting_spotlight() {

    spotlight = new SpotLight(
        vec4(0.0, 4.0, 2.0, 1.0),   // Position
        vec4(0.0, 0.0, 0.0, 1.0),   // (Looking) At
        radians(30.0),   // Inner Angle
        radians(40.0),   // Outer Angle
        vec4(0.5, 0.5, 0.5, 1.0),   // Ambient
        vec4(0.9, 0.9, 0.9, 1.0),   // Diffuse
        vec4(1.0, 1.0, 1.0, 1.0),   // Specular

        new SpotLightLocation(
            gl.getUniformLocation(program, 's.position'),
            gl.getUniformLocation(program, 's.at'),
            gl.getUniformLocation(program, 's.innerAngle'),
            gl.getUniformLocation(program, 's.outerAngle'),
            gl.getUniformLocation(program, 's.ambient'),
            gl.getUniformLocation(program, 's.diffuse'),
            gl.getUniformLocation(program, 's.specular')
        )
    );

    gl.uniform4fv(spotlight.location.position,  new Float32Array(spotlight.position));
    gl.uniform4fv(spotlight.location.at,        new Float32Array(spotlight.at));
    gl.uniform1f(spotlight.location.innerAngle, spotlight.innerAngle);
    gl.uniform1f(spotlight.location.outerAngle, spotlight.outerAngle);
    gl.uniform4fv(spotlight.location.ambient,   new Float32Array(spotlight.ambient));
    gl.uniform4fv(spotlight.location.diffuse,   new Float32Array(spotlight.diffuse));
    gl.uniform4fv(spotlight.location.specular,  new Float32Array(spotlight.specular));

    SL_translate = translate(spotlight.position[0], spotlight.position[1], spotlight.position[2]);
    SL_translate_inverse = inverse(SL_translate);
}

function init_lighting_material_reflection() {

    var aVal = 0.3;
    var dVal = 0.4;
    var sVal = 1.0;

    matref = new MaterialReflection(
        vec4(aVal, aVal, aVal, 1.0),
        vec4(dVal, dVal, dVal, 1.0),
        vec4(sVal, sVal, sVal, 1.0),

        new MaterialReflectionLocation (
            gl.getUniformLocation(program, 'matref.ambient'),
            gl.getUniformLocation(program, 'matref.diffuse'),
            gl.getUniformLocation(program, 'matref.specular')
        )
    );

    gl.uniform4fv(matref.location.ambient,  new Float32Array(matref.ambient));
    gl.uniform4fv(matref.location.diffuse,  new Float32Array(matref.diffuse));
    gl.uniform4fv(matref.location.specular, new Float32Array(matref.specular));
}