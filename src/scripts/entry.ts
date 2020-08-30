import '../css/base.scss';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

// constants
const WIDTH = 960;
const HEIGHT = 540;

// ヘルパーの用意
const axesHelper = new THREE.AxesHelper(10);
const gridHelper = new THREE.GridHelper(10, 5);

// dat.guiの設定
const GUI_PARAMS = {
  isGuide: false,
};
const gui = new dat.GUI();
gui.add(GUI_PARAMS, 'isGuide').onChange((value) => {
  if (value) {
    scene.add(axesHelper);
    scene.add(gridHelper);
  } else {
    scene.remove(axesHelper);
    scene.remove(gridHelper);
  }
});

// レンダラーの作成
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(WIDTH, HEIGHT);
const elApp = document.getElementById('app');
elApp?.appendChild(renderer.domElement);

// シーンの作成
const scene = new THREE.Scene();

// メッシュの追加
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({
    color: 0x0000ff,
  })
);
scene.add(box);

// カメラの作成
const camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 10000);
camera.position.set(0, 0, 5);

// ライトの設定
const light = new THREE.DirectionalLight(0xffffff);
light.intensity = 2;
light.position.set(1, 1, 1);
scene.add(light);

// コントローラーの設定
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;

// ループ処理
function tick() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
