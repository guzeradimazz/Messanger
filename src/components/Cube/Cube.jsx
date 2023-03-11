import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const Cube = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    scene.background = null
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    )
    containerRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FBE7B5'),
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)

      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)
    }
    animate()

    // const cubeInScene = scene.getObjectById(cube.id)
    return () => {
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div style={{ width: '100%', height: '100%' }} ref={containerRef} />
}
