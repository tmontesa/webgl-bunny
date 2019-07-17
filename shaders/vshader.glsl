//
// VERTEX SHADER
//

precision mediump float;

struct PointLight {
    vec4 position;
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
};

struct SpotLight {
    vec4 position;
    vec4 at;
    float innerAngle;
    float outerAngle;
    vec4 ambient;
    vec4 diffuse;
    vec4 specular; 
};

attribute vec3 vPosition;
attribute vec3 vNormal;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform PointLight pointlight;
uniform SpotLight spotlight;
uniform mat4 PL_mWorld;
uniform mat4 SL_mWorld;

varying vec3 fNormal;
varying vec3 L;
varying vec3 V;
varying vec3 R;
varying float PL_dist;
varying float SL_dist;

varying vec3 Ls;
varying vec3 Rs;
varying float angle;

void main() {
    
    // Calculate model-view matrix, and the position.
    mat4 MVM = mProj * mView * mWorld;
    vec4 position = MVM * vec4(vPosition, 1.0);

    // Calculate light position.
    vec4 PL_position = mProj * mView * PL_mWorld * pointlight.position;
    vec4 SL_position =  mProj * mView  * SL_mWorld * spotlight.position;

    // Cube pos.


    // Calculate normals.
    fNormal = (vec4(vNormal, 0.0)).xyz;

    // Calculate L (Light Direction), V (Eye Direction), R (Reflection Direction)
    L = normalize(PL_position.xyz - position.xyz);
    V = normalize(vec3(0.0, 0.0, 8.0) - position.xyz);
    R = 2.0 * dot(normalize(L), normalize(fNormal.xyz)) * normalize(fNormal.xyz) - normalize(L);

    vec3 SL_direction = normalize(spotlight.at.xyz - SL_position.xyz);  // Direction
    Ls = normalize(SL_position.xyz - position.xyz);  // Surface to light
    angle = acos(dot(normalize(-Ls), normalize(SL_direction)));

    Rs = 2.0 * dot(normalize(Ls), normalize(fNormal.xyz)) * normalize(fNormal.xyz) - normalize(Ls);

    // Calc distance.
    PL_dist = length(pointlight.position - position);
    SL_dist = length(spotlight.position - position);

    // Send vertices.
    gl_Position = position;
}