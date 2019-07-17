//
// Point Light
//

function PointLight(position, ambient, diffuse, specular, location) {
    this.position = position;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.location = location;
}

function PointLightLocation(position, ambient, diffuse, specular) {
    this.position = position;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
}

//
// Spot Light
//

function SpotLight(position, at, innerAngle, outerAngle, ambient, diffuse, specular, location) {
    this.position = position;
    this.at = at;
    this.innerAngle = innerAngle; // Where it starts tapering off
    this.outerAngle = outerAngle; // Where light stops completely
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.location = location;
}

function SpotLightLocation(position, at, innerAngle, outerAngle, ambient, diffuse, specular) {
    this.position = position;
    this.at = at;
    this.innerAngle = innerAngle; // Where it starts tapering off
    this.outerAngle = outerAngle; // Where light stops completely
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
}

