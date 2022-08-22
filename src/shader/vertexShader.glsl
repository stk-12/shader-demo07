varying vec2 vUv;

uniform float uTime;

// uniform float uFrequency;
uniform vec2 uFrequency;

void main() {
  vUv = uv;
  vec3 pos = position;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // modelPosition.x += 0.3;
  // modelPosition.z += sin(modelPosition.x * uFrequency) * 0.2;
  // modelPosition.z += sin(modelPosition.y * uFrequency) * 0.2;

  modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime * 1.5) * 0.1;
  modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime * 1.5) * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;

  // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}