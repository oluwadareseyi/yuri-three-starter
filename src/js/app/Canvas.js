import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as dat from "dat.gui";
import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

export default class Canvas {
  constructor() {
    this.gui = new dat.GUI();
    this.canvas = document.querySelector("canvas.webgl");
    this.scene = new THREE.Scene();
    this.textureLoader = new THREE.TextureLoader();
    this.loader = new GLTFLoader();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.createCamera();
    this.createRenderer();
    this.createMesh();
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.sizes.width / this.sizes.height,
      0.001,
      1000
    );
    this.camera.position.set(0, 0, 1);
    this.scene.add(this.camera);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0xeeeeee, 0);
    this.renderer.sRGBEncoding = true;
    this.renderer.physicallyCorrectLights = true;

    this.controls = new OrbitControls(this.camera, this.canvas);
    // this.controls.enabled = false;
    this.controls.enableDamping = true;
  }

  createMesh() {
    // Geometry
    this.geometry = new THREE.PlaneGeometry(1, 1, 100, 100);

    // Material
    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      // transparent: false,
    });

    // Mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  onResize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render(time) {
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);
  }
}
