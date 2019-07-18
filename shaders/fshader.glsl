//
// FRAGMENT
// SHADER
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

struct MaterialReflection {
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
};

//
// Varying
//

varying vec4 pos;
varying vec3 fNormal;

//
// Uniforms
//

uniform PointLight p;
uniform SpotLight s;
uniform MaterialReflection matref;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;
uniform mat4 mWorldP;
uniform mat4 mWorldS;

uniform vec4 fColor;
uniform vec4 globalAmbient;

vec3 ambient(vec3 ref, vec3 i) {
    return ref * i;
}

vec3 diffuse(vec3 ref, vec3 i, vec3 n, vec3 l) {
    return ref * i * clamp(dot(n, l), 0.0, 1.0) ;
}

vec3 specular(vec3 ref, vec3 i, vec3 r, vec3 v, float s) {
    return ref * i * pow(clamp(dot(r, v), 0.0 , 1.0), s);
}

void main() {
    // Shiny constant.
    float shiny = 10.0;

    // Calculate positions of light.
    vec4 posP = mView * mWorldP * p.position;
    vec4 posS = mView * mWorldS * s.position;

    // Normal, View.
    vec3 N = normalize(fNormal);
    vec3 V = normalize(vec3(0.0, 0.0, 10.0) - pos.xyz);

    // Light direction.
    vec3 Lp = normalize(posP.xyz - pos.xyz);
    vec3 Ls = normalize(posS.xyz - pos.xyz);

    // Reflection direction.
    vec3 Rp = normalize(reflect(-Lp, N));
    vec3 Rs = normalize(reflect(-Ls, N));

    // Calculate the angle for the spotlight.
    vec3 dirS = normalize(mView * mWorldS * vec4(s.at.xyz - posS.xyz, 1.0)).xyz;
    float angle = acos(dot(normalize(-Ls), normalize(dirS)));

    // Calculate ambient, diffuse, specular for pointlight.
    vec3 ambientP = ambient(matref.ambient.rgb, p.ambient.rgb);
    vec3 diffuseP = diffuse(matref.diffuse.rgb, p.diffuse.rgb, N, Lp);
    vec3 specularP = specular(matref.specular.rgb, p.specular.rgb, Rp, V, shiny);

    // Calculate ambient, diffuse, specular for spotlight.
    vec3 ambientS = vec3(0.0, 0.0, 0.0);
    vec3 diffuseS = vec3(0.0, 0.0, 0.0);
    vec3 specularS = vec3(0.0, 0.0, 0.0);

    if (angle < s.innerAngle) {
        ambientS = ambient(matref.ambient.rgb, s.ambient.rgb);
        diffuseS = diffuse(matref.diffuse.rgb, s.diffuse.rgb, N, Ls);
        specularS = specular(matref.specular.rgb, s.specular.rgb, Rs, V, shiny);
    }


    // Calculate total intensity.
    vec3 intensityP = ambientP + diffuseP + specularP;
    vec3 intensityS = ambientS + diffuseS + specularS;
    vec3 intensity = globalAmbient.rgb + intensityP + intensityS;

    // Finally, calculate fragment color.
    gl_FragColor = vec4(fColor.rgb * intensity, fColor.a);
}