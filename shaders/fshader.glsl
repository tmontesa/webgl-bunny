//
// FRAGMENT SHADER
//

precision mediump float;

struct PointLight {
    vec4 position;
    vec4 diffuse;
    vec4 specular;
};

uniform vec4 fColor;
uniform vec4 ambientIntensity;
uniform PointLight pointlight;

varying vec3 fNormal;
varying vec3 L;
varying vec3 V;
varying vec3 R;

void main() {

    float diffuseConst = .25;
    float specularConst = 2.0;
    float shinyConst = 2.5;
   
    vec3 diffuseEffect = diffuseConst * dot(normalize(L), normalize(fNormal)) * pointlight.diffuse.rgb;
    vec3 specularEffect = specularConst * pow(dot(normalize(R), normalize(V)), shinyConst) * pointlight.specular.rgb;

    vec3 intensity = ambientIntensity.rgb + diffuseEffect + specularEffect;

    gl_FragColor = vec4(fColor.rgb * intensity, fColor.a);
}


/*

int ambientConst, diffuseConst, specularConst, shinyConst;

// Independent
vec4 ambientEffect  = ambientConst  * pointlight.ambient;

// For each light
vec4 diffuseEffect  = diffuseConst  *  (dot(normalize(L), normalize(N))               * pointlight.diffuse;
vec4 specularEffect = specularConst * ((dot(normalize(R), normalize(V)) ^ shinyConst) * pointlight.specular;

vec4 intensity = ambientEffect + diffuseEffect + specularEffect;

*/
