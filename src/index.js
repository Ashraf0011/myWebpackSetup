//  ANCHOR Imports
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
import './style.scss';

// ANCHOR Base Canvas
const canvas = document.getElementById('canvas')

// ANCHOR Scene
const scene = new THREE.Scene()

// ANCHOR Renderer
const width = window.innerWidth
const height = window.innerHeight
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas
})
renderer.setSize(width, height)
renderer.setClearColor(0xfef23a, 1)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ANCHOR Camera
const camera = new THREE.PerspectiveCamera(
    70,
    width / height,
    0.1,
    1000
)
// NOTE fov calculation in redme.md
camera.position.set(0, 0, 5)
const z = camera.position.z
camera.fov = 2 * Math.atan((height / 2) / z) * (180 / Math.PI)
scene.add(camera)

// ANCHOR Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ANCHOR animation variables
// NOTE Declareing global variables here
const clock = new THREE.Clock()
let time = 0


// TODO add objects through functions and call them here
// ANCHOR function     const example = () =>{     } Calls



// ANCHOR func Render
const render = () => {
    controls.update()

    // TODO we will manipulate this section for animation
    let elapsedTime = clock.getElapsedTime()
    time += 0.05

    // this.material.uniforms.time.valur = this.time
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render();


// ANCHOR func resize function and Event
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.updateProjectionMatrix()
})