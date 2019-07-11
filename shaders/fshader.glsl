precision mediump float;

struct PointLight {
    vec4 position;
    vec4 ambient;
    vec4 diffuse;
    vec4 specular;
};

varying vec3 fNormal;

uniform PointLight pointlight;

void main() {

    vec3 ambientLightIntensity = vec3(0.1, 0.1, 0.2);
    vec3 sunlightLightIntensity = vec3(1.0, 1.0, 1.0);
    vec3 sunlightLightDirection = normalize(vec3(1.0, 4.0, 0.0));

    vec4 color = vec4(1.0, 0.7, 0.0, 1.0);

    vec3 lightIntensity = ambientLightIntensity + sunlightLightIntensity * max(dot(fNormal, sunlightLightDirection), 0.0);

    gl_FragColor = vec4(color.rgb * lightIntensity, color.a);
}