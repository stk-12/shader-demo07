import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import fragmentSource from "./shader/fragmentShader.glsl";
import vertexSource from "./shader/vertexShader.glsl";

let renderer, scene, camera;

const canvas = document.querySelector("#canvas");

//window size
let size = {
  width: window.innerWidth,
  height: window.innerHeight
};

init();

function init() {
  //renderer
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(size.width, size.height);
  renderer.shadowMap.enable = true;

  //scene
  scene = new THREE.Scene();

  //camera
  camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 100);
  camera.position.set(0, 0, 5);
  scene.add(camera);
  // camera.lookAt(new THREE.Vector3(0, 0, 0));

  //controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  //light
  // const light = new THREE.DirectionalLight(0xffffff, 1.5);
  // light.position.set(3, 5, 3);
  // scene.add(light);

  //group
  // const group = new THREE.Group();
  // scene.add(group);

  //Geometry
  const geometry = new THREE.PlaneGeometry(2, 2, 16, 16);

  //Texture
  const loader = new THREE.TextureLoader();
  const texture = loader.load("https://picsum.photos/id/1028/1024/1024");

  //uniforms
  let uniforms = {
    uTime: {
      value: 0.0
    },
    uTex: {
      value: texture
    },
    uFrequency: {
      // value: 3.0
      value: new THREE.Vector2(4, 6)
    }
  };

  //Material
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexSource,
    fragmentShader: fragmentSource,
    side: THREE.DoubleSide
  });

  //Mesh
  const mesh = new THREE.Mesh(geometry, material);
  // mesh.rotation.x = radian(45);
  // mesh.rotation.y = radian(45);
  scene.add(mesh);

  const clock = new THREE.Clock();

  animate();
  function animate() {
    // mesh.rotation.y += 0.005;

    const elapsedTime = clock.getElapsedTime();
    uniforms.uTime.value = elapsedTime;

    // const sec = performance.now() / 1000;
    // uniforms.uTime.value = sec;

    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  }
}

// ラジアンに変換
// function radian(val) {
//   return (val * Math.PI) / 180;
// }
// ランダムな数
// function random(min, max) {
//     return Math.random() * (max - min) + min;
// }

//resize
function onWindowResize() {
  // レンダラーのサイズを修正
  renderer.setSize(window.innerWidth, window.innerHeight);

  // カメラのアスペクト比を修正
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
window.addEventListener("resize", onWindowResize);
