precision mediump float;

attribute vec3 vPosition;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main() {
    gl_Position = mProj * mView * mWorld * vec4(vPosition, 1.0);
}