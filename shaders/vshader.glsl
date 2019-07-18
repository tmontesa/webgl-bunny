//
// VERTEX
// SHADER
//

precision mediump float;

//
// Attributes
//

attribute vec3 vPosition;
attribute vec3 vNormal;

//
// Uniform
//

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

//
// Varying
//

varying vec4 pos;
varying vec3 fNormal;

void main() {
    
    // Calculate position in clip-space.
    pos =  mView * mWorld * vec4(vPosition, 1.0);
    
    // Send normals.
    fNormal = (mWorld * vec4(vNormal, 1.0)).xyz;

    // Send vertices.
    gl_Position =  mProj *  pos;
}