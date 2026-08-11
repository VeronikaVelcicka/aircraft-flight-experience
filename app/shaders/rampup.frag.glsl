// rampup.frag.glsl
// Animates color over time via the uTime uniform, and shades faces by
// their normal so rotation is visible even under flat lighting.

uniform float uTime;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 baseColor = vec3(0.1, 0.5, 0.9);
  vec3 pulse = 0.5 + 0.5 * sin(uTime * vec3(1.0, 1.3, 1.7) + vPosition.xyz * 2.0);

  float lightFactor = 0.4 + 0.6 * max(dot(vNormal, normalize(vec3(0.5, 1.0, 0.3))), 0.0);

  vec3 color = mix(baseColor, pulse, 0.5) * lightFactor;

  gl_FragColor = vec4(color, 1.0);
}
