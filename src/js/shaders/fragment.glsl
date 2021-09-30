varying vec3 vNormal;
varying vec2 vUv;

void main () {
    float diff = dot(vec3(1.0), vNormal);

    gl_FragColor = vec4(vNormal, 1.0);

    gl_FragColor = vec4(vec3(abs(sin(diff * 10.0))), 1.0);
}