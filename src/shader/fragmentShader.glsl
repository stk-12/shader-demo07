varying vec2 vUv;

uniform float uTime;

uniform sampler2D uTex;

void main() {

  // vec3 color = texture2D(uTex, vUv).rgb;
  // gl_FragColor = vec4(color, 1.0);



  vec4 textureColor = texture2D(uTex, vUv);
  gl_FragColor = textureColor;
  
}