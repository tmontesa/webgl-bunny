//
// VERTEX SHADER
//

precision mediump float;

struct PointLight {
    vec4 position;
    vec4 diffuse;
    vec4 specular;
};

attribute vec3 vPosition;
attribute vec3 vNormal;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform PointLight pointlight;

varying vec3 fNormal;
varying vec3 L;
varying vec3 V;
varying vec3 R;

void main() {
    
    // Calculate model-view matrix, and the position.
    mat4 MVM = mProj * mView * mWorld;
    vec4 position = MVM * vec4(vPosition, 1.0);

    // Calculate normals.
    fNormal = (mWorld * vec4(vNormal, 0.0)).xyz;

    // Calculate L (Light Direction), V (Eye Direction), R (Reflection Direction)
    L = normalize(pointlight.position.xyz - position.xyz);
    V = normalize(vec3(0.0, 0.0, 0.0) - position.xyz);
    R = 2.0 * dot(normalize(L), normalize(fNormal.xyz)) * normalize(fNormal) - normalize(L);

    // Send vertices.
    gl_Position = position;
}