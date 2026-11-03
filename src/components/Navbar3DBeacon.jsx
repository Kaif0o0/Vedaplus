import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Navbar3DBeacon.module.css';

export default function Navbar3DBeacon({ size = 32 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = size;
    const height = size;

    // Scene, Camera, Renderer
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

    // Group for combined rotation
    const group = new THREE.Group();
    scene.add(group);

    // 1. Inner Icosahedron (Geometric Crystal Core)
    const innerGeo = new THREE.IcosahedronGeometry(0.85, 0);
    const innerWire = new THREE.WireframeGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B, // Marigold Amber
      linewidth: 1.5,
      transparent: true,
      opacity: 0.9,
    });
    const innerMesh = new THREE.LineSegments(innerWire, innerMat);
    group.add(innerMesh);

    // 2. Central Pulse Core (Glowing Point)
    const coreGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 3. Outer Orbital Gyro Ring (Torus)
    const ringGeo = new THREE.TorusGeometry(1.22, 0.025, 8, 36);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xFBBF24,
      transparent: true,
      opacity: 0.55,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // 4. Secondary Counter-Orbital Ring
    const ringGeo2 = new THREE.TorusGeometry(1.36, 0.02, 8, 36);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x0F172A,
      transparent: true,
      opacity: 0.8,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);

    // Hover acceleration variables
    let isHovered = false;
    let speedMult = 1.0;

    const onEnter = () => {
      isHovered = true;
    };
    const onLeave = () => {
      isHovered = false;
    };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);
    container.addEventListener('touchstart', onEnter, { passive: true });
    container.addEventListener('touchend', onLeave, { passive: true });

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const targetSpeed = isHovered ? 2.8 : 1.0;
      speedMult += (targetSpeed - speedMult) * 0.08;

      innerMesh.rotation.x += 0.9 * delta * speedMult;
      innerMesh.rotation.y += 1.2 * delta * speedMult;

      ringMesh.rotation.z += 0.7 * delta * speedMult;
      ringMesh2.rotation.x -= 0.6 * delta * speedMult;
      ringMesh2.rotation.y += 0.8 * delta * speedMult;

      // Subtle pulse
      const t = clock.getElapsedTime() * 3;
      const pulse = 1 + Math.sin(t) * 0.08;
      coreMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
      container.removeEventListener('touchstart', onEnter);
      container.removeEventListener('touchend', onLeave);

      innerGeo.dispose();
      innerWire.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={styles.beaconContainer}
      style={{ width: size, height: size }}
      title="VedaPlus 3D Tech Core"
    />
  );
}

