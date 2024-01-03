import * as THREE from './three.js'; // path for vscode

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const geometryBackground = new THREE.PlaneGeometry(100, 100);
const materialBackground = new THREE.MeshPhongMaterial({ color: 0x000066 });

const background = new THREE.Mesh(geometryBackground, materialBackground);
background.receiveShadow = true;
background.castShadow = true;
background.position.set(0, 0, -1);
scene.add(background);

let mesh1;
{
    const geometryCylinder = new THREE.BoxGeometry(2, 10, 2);
    const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 });

    mesh1 = new THREE.Mesh(geometryCylinder, materialCylinder);
    mesh1.position.set(-10, 0, 0);
    mesh1.castShadow = true;
    mesh1.receiveShadow = true;
    scene.add(mesh1);
}

let mesh2;
{
    const geometryCylinder = new THREE.BoxGeometry(2, 10, 2);
    const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 });

    mesh2 = new THREE.Mesh(geometryCylinder, materialCylinder);
    mesh2.position.set(10, 0, 0);
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;
    scene.add(mesh2);
}

let mesh3;
{
    const geometryCylinder = new THREE.SphereGeometry(1);
    const materialCylinder = new THREE.MeshPhongMaterial({ color: 0xff0000 });

    mesh3 = new THREE.Mesh(geometryCylinder, materialCylinder);
    mesh3.position.set(0, 0, 0);
    mesh3.castShadow = true;
    mesh3.receiveShadow = true;
    scene.add(mesh3);
}

const light = new THREE.PointLight(0xffffff, 300);
light.position.set(0, 0, 5);
light.castShadow = true;
light.shadow.normalBias = 0.2;
mesh3.add(light);

camera.position.z = 42;

const key = {};
window.addEventListener('keydown', (e) => {
    key[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    key[e.key] = false;
});


const clock = new THREE.Clock();
let mesh3dx = -0.1;
let frame = 0;
function animate() {
    requestAnimationFrame(animate);

    if (key['w']) mesh1.position.y += 0.1;
    if (key['s']) mesh1.position.y -= 0.1;

    if (key['ArrowUp']) mesh2.position.y += 0.1;
    if (key['ArrowDown']) mesh2.position.y -= 0.1;

    mesh3.position.x += mesh3dx;
    if (mesh3.position.x > 8) mesh3dx = -0.1;
    if (mesh3.position.x < -8) mesh3dx = 0.1;


    const delta = clock.getDelta();
    light.position.x = Math.sin(frame / 20) * 5;
    light.position.y = Math.cos(frame / 20) * 5;

    renderer.render(scene, camera);
    frame++;
}

animate();
