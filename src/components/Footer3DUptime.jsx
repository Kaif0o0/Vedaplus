import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Footer3DUptime.module.css';

export default function Footer3DUptime({ size = 52 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = size;
    const height = size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.8;

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

    // 1. Stacked 3-Tier Cloud Server Cubes (Wireframe)
    const cubeGeo = new THREE.BoxGeometry(1.2, 0.28, 1.2);
    const cubeEdges = new THREE.EdgesGeometry(cubeGeo);

    const layerMaterials = [
      new THREE.LineBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.95 }),
      new THREE.LineBasicMaterial({ color: 0xFBBF24, transparent: true, opacity: 0.8 }),
      new THREE.LineBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.95 }),
    ];

    const layers = [-0.45, 0, 0.45].map((yPos, i) => {
      const lineMesh = new THREE.LineSegments(cubeEdges, layerMaterials[i]);
      lineMesh.position.y = yPos;
      root.add(lineMesh);
      return lineMesh;
    });

    // 2. Central Glowing Uptime Core
    const coreGeo = new THREE.SphereGeometry(0.22, 12, 12);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xF59E0B });
    const core = new THREE.Mesh(coreGeo, coreMat);
    root.add(core);

    // 3. Orbital Defense Ring (Zero-Downtime Shield)
    const ringGeo = new THREE.TorusGeometry(1.45, 0.025, 8, 36);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.6,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.8;
    root.add(ring);

    // 4. Visibility Observer to pause render loop when off-screen
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

      root.rotation.y += 0.8 * delta;
      root.rotation.x = 0.2 + Math.sin(elapsed * 1.2) * 0.08;

      ring.rotation.z += 1.2 * delta;

      // Pulse core
      const pulse = 1 + Math.sin(elapsed * 4) * 0.15;
      core.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();

      cubeGeo.dispose();
      cubeEdges.dispose();
      layerMaterials.forEach((m) => m.dispose());
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={styles.uptimeContainer}
      style={{ width: size, height: size }}
      title="3D Zero-Downtime Server Node • Drag to rotate"
    />
  );
}

