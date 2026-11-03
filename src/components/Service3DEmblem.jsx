import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Service3DEmblem.module.css';

export default function Service3DEmblem({ type = 'hospitality', size = 44 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.6;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    // Common Amber Line Material
    const amberLineMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.9,
    });

    const amberMeshMat = new THREE.MeshBasicMaterial({
      color: 0xFBBF24,
      transparent: true,
      opacity: 0.65,
    });

    let primaryMesh, secondaryMesh;

    if (type === 'hospitality') {
      // 1. Food & Hospitality: Steaming Chalice & Dual Orbital Ring
      const cupGeo = new THREE.CylinderGeometry(0.55, 0.35, 0.7, 8, 1);
      const cupEdges = new THREE.EdgesGeometry(cupGeo);
      primaryMesh = new THREE.LineSegments(cupEdges, amberLineMat);
      primaryMesh.position.y = -0.15;
      root.add(primaryMesh);

      const steamRingGeo = new THREE.TorusGeometry(0.68, 0.02, 6, 24);
      secondaryMesh = new THREE.Mesh(steamRingGeo, amberMeshMat);
      secondaryMesh.rotation.x = Math.PI / 2.5;
      secondaryMesh.position.y = 0.35;
      root.add(secondaryMesh);
    } else if (type === 'retail') {
      // 2. Retail & E-commerce: Floating Retail Diamond / Shopping Prism
      const gemGeo = new THREE.OctahedronGeometry(0.85, 0);
      const gemEdges = new THREE.EdgesGeometry(gemGeo);
      primaryMesh = new THREE.LineSegments(gemEdges, amberLineMat);
      root.add(primaryMesh);

      const orbitTagGeo = new THREE.TorusGeometry(1.2, 0.02, 6, 32);
      secondaryMesh = new THREE.Mesh(orbitTagGeo, amberMeshMat);
      secondaryMesh.rotation.x = Math.PI / 3;
      secondaryMesh.rotation.y = Math.PI / 6;
      root.add(secondaryMesh);
    } else {
      // 3. Professional & Local Services: Precision Gyro Gear & Cloud Cube
      const gearGeo = new THREE.BoxGeometry(0.85, 0.85, 0.85);
      const gearEdges = new THREE.EdgesGeometry(gearGeo);
      primaryMesh = new THREE.LineSegments(gearEdges, amberLineMat);
      root.add(primaryMesh);

      const toolRingGeo = new THREE.TorusGeometry(1.25, 0.025, 6, 28);
      secondaryMesh = new THREE.Mesh(toolRingGeo, amberMeshMat);
      secondaryMesh.rotation.y = Math.PI / 4;
      root.add(secondaryMesh);
    }

    // Touch & Pointer Drag
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };

    // Visibility Observer to pause render loop when off-screen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      root.rotation.y += 1.2 * delta;
      root.rotation.x = Math.sin(elapsed * 1.5) * 0.12;

      if (secondaryMesh) {
        secondaryMesh.rotation.z += 1.6 * delta;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();

      amberLineMat.dispose();
      amberMeshMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type, size]);

  return (
    <div
      ref={mountRef}
      className={styles.emblemContainer}
      style={{ width: size, height: size }}
      title={`3D Category Visualizer: ${type}`}
    />
  );
}

