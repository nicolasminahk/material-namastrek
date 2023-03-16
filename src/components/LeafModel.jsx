// import React, { useEffect, useRef } from 'react'
// import * as THREE from 'three'

// const LeafModel = () => {
//     const containerRef = useRef(null)

//     useEffect(() => {
//         const scene = new THREE.Scene()
//         const camera = new THREE.PerspectiveCamera(
//             75,
//             containerRef.current.clientWidth / containerRef.current.clientHeight,
//             0.1,
//             1000
//         )
//         const renderer = new THREE.WebGLRenderer({ alpha: true })
//         renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
//         containerRef.current.appendChild(renderer.domElement)

//         const geometry = new THREE.BoxGeometry()
//         const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
//         const cube = new THREE.Mesh(geometry, material)
//         scene.add(cube)

//         camera.position.z = 5

//         const animate = function () {
//             requestAnimationFrame(animate)

//             cube.rotation.x += 0.01
//             cube.rotation.y += 0.01

//             renderer.render(scene, camera)
//         }

//         animate()

//         return () => {
//             containerRef.current.removeChild(renderer.domElement)
//         }
//     }, [])

//     return (
//         <div style={{ position: 'relative' }}>
//             <div
//                 ref={containerRef}
//                 style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                 }}
//             />
//         </div>
//     )
// }

// export default LeafModel

// import React, { useEffect, useRef } from 'react'
// import * as THREE from 'three'

// const ThreeScene = () => {
//     const containerRef = useRef(null)

//     useEffect(() => {
//         const container = containerRef.current

//         const scene = new THREE.Scene()
//         const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
//         const renderer = new THREE.WebGLRenderer({ antialias: true })

//         renderer.setSize(container.clientWidth, container.clientHeight)
//         renderer.setClearColor('#f0f0f0')
//         container.appendChild(renderer.domElement)

//         const geometry = new THREE.BoxGeometry(1, 1, 1)
//         const material = new THREE.MeshBasicMaterial({ color: '#433F81' })
//         const cube = new THREE.Mesh(geometry, material)
//         scene.add(cube)

//         camera.position.z = 5

//         const animate = () => {
//             requestAnimationFrame(animate)

//             cube.rotation.x += 0.01
//             cube.rotation.y += 0.01

//             renderer.render(scene, camera)
//         }

//         animate()

//         return () => {
//             container.removeChild(renderer.domElement)
//         }
//     }, [])

//     return (
//         <div
//             ref={containerRef}
//             style={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//             }}
//         />
//     )
// }

// export default ThreeScene
