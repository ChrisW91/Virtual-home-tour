import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


var container, scene, camera, renderer, controls, panorama;



init();
animate();



function init() {

  scene = new THREE.Scene();

  // camera
  const viewerElement = document.getElementById('viewer');
  var aspect = viewerElement.offsetWidth / viewerElement.offsetHeight;
  camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
  camera.position.set(0, 0, 375);
  camera.target = new THREE.Vector3(0, 0, 0);

  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(viewerElement.offsetWidth, viewerElement.offsetHeight);
  container = viewerElement;
  container.appendChild(renderer.domElement);

  // panorama sphere
  var geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1); // Invert the geometry so  all of the image faces point inward

  // load the panoramic texture
  var texture = new THREE.TextureLoader().load('');//image path goes here
  var material = new THREE.MeshBasicMaterial({ map: texture });
  panorama = new THREE.Mesh(geometry, material);
  scene.add(panorama);


  // camera controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
}

function animate() {
  requestAnimationFrame(animate);
  update();
}

function update() {
  controls.update();
  renderer.render(scene, camera);
}


window.addEventListener('resize', function () {
  const viewerElement = document.getElementById('viewer');
  var width = viewerElement.offsetWidth;
  var height = viewerElement.offsetHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});


const form = document.getElementById('upload-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData();
  const files = form.querySelector('input[type="file"]').files;

  // setting uploaded image as viewing image & initiating viewer
  setPanoramaTexture(files[0])


  //sending uploaded img to server
  formData.append('image', files[0]);

  fetch('http://localhost:8080/api/upload', {
    method: 'POST',
    body: formData,

  })
    .then(res => res.text())
    .then(data => console.log(data))

});

function setPanoramaTexture(file) {

  const reader = new FileReader();
  reader.onload = function (e) {
    var texture = new THREE.TextureLoader().load(e.target.result);
    panorama.material.map = texture;
    panorama.material.needsUpdate = true;
  };
  reader.readAsDataURL(file);
}
