//
// FRAGMENT SHADER
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

uniform vec4 fColor;
uniform vec4 globalAmbient;
uniform PointLight pointlight;
uniform SpotLight spotlight;

varying vec3 fNormal;
varying vec3 L;
varying vec3 V;
varying vec3 R;
varying float PL_dist;
varying float SL_dist;

varying vec3 Ls;
varying vec3 Rs;
varying float angle;

vec3 ambient_effect(vec3 material_reflection, vec3 light_intensity) {
    return material_reflection * light_intensity;
}

vec3 diffuse_effect(vec3 material_reflection, vec3 light_intensity, vec3 n, vec3 l) {
    return material_reflection * clamp(dot(n, l), 0.0, 1.0) * light_intensity;
}

vec3 specular_effect(vec3 material_reflection, vec3 light_intensity, vec3 r, vec3 v, float shiny) {
    return material_reflection  * pow(clamp(dot(r, v), 0.0 , 1.0), shiny) * light_intensity;
}

void main() {

    float shinyConst = 100.0;
    float ambientConst = 1.0;
    float diffuseConst = 1.0;
    float specularConst = 1.0;

    float PL_d_a = 0.05;
    float PL_d_b = 0.05;
    float PL_d_c = 0.01;
    float PL_distConst = 1.0 / (PL_d_a + (PL_d_b * PL_dist) + (PL_d_c * PL_dist * PL_dist));

    vec4 material_reflection_ambient = vec4(1.0, 1.0, 1.0, 1.0);
    vec4 material_reflection_diffuse = vec4(0.9, 0.9, 0.9, 1.0);
    vec4 material_reflection_specular = vec4(1.0, 1.0, 1.0, 1.0);
   
    vec3 PL_ambientEffect   = ambientConst  * ambient_effect(material_reflection_ambient.rgb, pointlight.ambient.rgb);
    vec3 PL_diffuseEffect   = diffuseConst  * diffuse_effect(material_reflection_diffuse.rgb, pointlight.diffuse.rgb, normalize(fNormal), normalize(L));
    vec3 PL_specularEffect  = specularConst * specular_effect(material_reflection_specular.rgb, pointlight.specular.rgb, normalize(R), normalize(V), shinyConst);

    float SL_d_a = 0.05;
    float SL_d_b = 0.01;
    float SL_d_c = 0.01;
    float SL_distConst = 1.0 / (SL_d_a + (SL_d_b * SL_dist) + (SL_d_c * SL_dist * SL_dist));

    vec3 SL_ambientEffect = vec3(0.0, 0.0, 0.0);
    vec3 SL_diffuseEffect = vec3(0.0, 0.0, 0.0);
    vec3 SL_specularEffect = vec3(0.0, 0.0, 0.0);

    if (angle <= spotlight.innerAngle) {
        SL_ambientEffect = ambientConst  * ambient_effect(material_reflection_ambient.rgb, spotlight.ambient.rgb);
        SL_diffuseEffect = diffuseConst  * diffuse_effect(material_reflection_diffuse.rgb, spotlight.diffuse.rgb, normalize(fNormal), normalize(Ls));
        SL_specularEffect = specularConst * specular_effect(material_reflection_specular.rgb, spotlight.specular.rgb, normalize(Rs), normalize(V), shinyConst);
    }

    vec3 PLEffect = PL_ambientEffect + PL_distConst * (PL_diffuseEffect + PL_specularEffect);                       
    vec3 SLEffect = SL_ambientEffect + SL_distConst * (SL_diffuseEffect + SL_specularEffect);
    vec3 intensity = globalAmbient.rgb  + PLEffect  + SLEffect;


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
