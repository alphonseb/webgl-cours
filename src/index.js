import './css/style.styl'
import grassTextureSrc from './images/textures/house/grass.jpg'

import Planet from './js/Planet'

import * as THREE from 'three'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const grassTexture = textureLoader.load(grassTextureSrc)
grassTexture.wrapS = THREE.RepeatWrapping
grassTexture.wrapT = THREE.RepeatWrapping
grassTexture.repeat.set(4, 4)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', _event => {
    cursor.x = _event.clientX / sizes.width - 0.5
    cursor.y = _event.clientY / sizes.height - 0.5
})

/**
 * Scene
 */
const scene = new THREE.Scene()

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

/**
 * Planete
 */
const planet = new Planet({
    textureLoader
})
scene.add(planet.container)

// /**
//  * House
//  */
// const house = new THREE.Object3D()
// // scene.add(house)

// const walls = new THREE.Mesh(
//     new THREE.BoxGeometry(1.5, 1, 1.5),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.8,
//         color: 0xff0000
//     })
// )
// walls.castShadow = true
// walls.receiveShadow = true
// house.add(walls)

// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(4, 4),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.8,
//         map: grassTexture
//     })
// )
// floor.rotation.x = -Math.PI * 0.5
// floor.position.y = -0.5
// floor.receiveShadow = true
// house.add(floor)

// const bush = new THREE.Mesh(
//     new THREE.SphereGeometry(0.3),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.8,
//         color: 0x518c51
//     })
// )
// bush.position.x = 1.75
// bush.position.y = -0.25
// bush.receiveShadow = true
// bush.castShadow = true
// house.add(bush)

// const bush2 = new THREE.Mesh(
//     new THREE.SphereGeometry(0.3),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.8,
//         color: 0x518c51
//     })
// )
// bush2.position.x = -1.75
// bush2.position.z = -1.25
// bush2.position.y = -0.25
// bush2.receiveShadow = true
// bush2.castShadow = true
// house.add(bush2)

// for (let i = 0; i < 50; i++) {
//     const radius = Math.random() * 0.25

//     const bush = new THREE.Mesh(
//         new THREE.SphereGeometry(radius),
//         new THREE.MeshStandardMaterial({
//             metalness: 0.3,
//             roughness: 0.8,
//             color: 0x518c51
//         })
//     )
//     bush.position.x = (Math.random() - 0.5) * 4
//     bush.position.z = (Math.random() - 0.5) * 4
//     bush.position.y = -0.5 + radius * 0.5

//     bush.receiveShadow = true
//     bush.castShadow = true
//     house.add(bush)
// }

// //Roof
// const roof = new THREE.Mesh(
//     new THREE.ConeGeometry(1.25, 0.5, 4),
//     new THREE.MeshStandardMaterial({
//         metalness: 0.3,
//         roughness: 0.8,
//         color: 0x885522
//     })
// )
// roof.position.y = 0.75
// roof.rotation.y = Math.PI * 0.25

// roof.receiveShadow = true
// roof.castShadow = true
// house.add(roof)

/**
 * Lights
 */
// const doorLight = new THREE.PointLight()
// doorLight.position.x = -1.02
// doorLight.castShadow = true
// house.add(doorLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

const sunLight = new THREE.DirectionalLight(0xffcccc, 1.2)
sunLight.castShadow = true
sunLight.shadow.camera.top = 1.2
sunLight.shadow.camera.right = 1.2
sunLight.shadow.camera.bottom = -1.2
sunLight.shadow.camera.left = -1.2
sunLight.position.x = 1
sunLight.position.y = 1
sunLight.position.z = 1
scene.add(sunLight)

// /**
//  * Shader
//  */
// const shaderGeometry = new THREE.SphereGeometry(1.5, 45, 45)
// const shaderMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//         uTime: { value: 0 }
//     },
//     vertexShader: `
//         uniform float uTime;

//         varying vec3 vNormal;
//         varying float vOffset;

//         void main()
//         {
//             vec4 modelPosition = vec4(position, 1.0);

//             float offset = 0.0;
//             offset += sin(modelPosition.y * 30.0 + uTime * 0.03);
//             offset += sin(uv.x * 3.14 * 2.0);
//             modelPosition.xyz += normal * offset * 0.1;

//             vNormal = normal;
//             vOffset = offset;

//             gl_Position = projectionMatrix * viewMatrix * modelPosition;
//         }
//     `,
//     fragmentShader: `
//         varying vec3 vNormal;
//         varying float vOffset;

//         void main()
//         {
//             vec3 color = vNormal + vec3(vOffset);
//             gl_FragColor = vec4(color, 1.0);
//         }
//     `
// })
// const shaderMesh = new THREE.Mesh(shaderGeometry, shaderMaterial)
// scene.add(shaderMesh)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

/**
 * Loop
 */
const loop = () => {
    window.requestAnimationFrame(loop)

    // Update shader
    // shaderMaterial.uniforms.uTime.value += 1

    //Update house
    // house.rotation.y += 0.003

    //update camera
    camera.position.x = cursor.x * 7
    camera.position.y = -cursor.y * 7

    camera.lookAt(new THREE.Vector3())

    //REnderer
    renderer.render(scene, camera)
}

loop()

// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//     })
// }
