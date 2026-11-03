import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Footer3DLaunch.module.css';

export default function Footer3DLaunch({ size = 48 }) {
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

    // 1. Launch Rocket / Cone Beacon (Wireframe)
    const coneGeo = new THREE.ConeGeometry(0.7, 1.4, 6);
    const coneEdges = new THREE.EdgesGeometry(coneGeo);
    const coneMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.9,
    });
    const coneMesh = new THREE.LineSegments(coneEdges, coneMat);
    coneMesh.position.y = 0.15;
    root.add(coneMesh);

    // 2. Base Propulsion Ring
    const baseRingGeo = new THREE.TorusGeometry(0.85, 0.02, 6, 24);
    const baseRingMat = new THREE.MeshBasicMaterial({ color: 0xFBBF24, transparent: true, opacity: 0.6 });
    const baseRing = new THREE.Mesh(baseRingGeo, baseRingMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -0.55;
    root.add(baseRing);

    // 3. Glowing Center Core
    const coreGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xF59E0B });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.y = -0.15;
    root.add(core);

    // Visibility Observer to pause render loop when off-screen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      root.rotation.y += 1.4 * delta;
      root.rotation.z = Math.sin(elapsed * 1.5) * 0.1;
      root.position.y = Math.sin(elapsed * 2.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();

      coneGeo.dispose();
      coneEdges.dispose();
      coneMat.dispose();
      baseRingGeo.dispose();
      baseRingMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={styles.launchContainer}
      style={{ width: size, height: size }}
      title="3D Website Launch Engine"
    />
  );
}

