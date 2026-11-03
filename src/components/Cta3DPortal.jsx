import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Cta3DPortal.module.css';

export default function Cta3DPortal({ size = 110 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

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

    // 1. Dual Hexagonal Warp Gate (Wireframe)
    const hex1Geo = new THREE.CylinderGeometry(1.4, 1.4, 0.1, 6, 1, true);
    const hex1Edges = new THREE.EdgesGeometry(hex1Geo);
    const hex1Mat = new THREE.LineBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.85 });
    const hex1 = new THREE.LineSegments(hex1Edges, hex1Mat);
    hex1.rotation.x = Math.PI / 2.3;
    root.add(hex1);

    const hex2Geo = new THREE.CylinderGeometry(1.7, 1.7, 0.08, 6, 1, true);
    const hex2Edges = new THREE.EdgesGeometry(hex2Geo);
    const hex2Mat = new THREE.LineBasicMaterial({ color: 0xFBBF24, transparent: true, opacity: 0.5 });
    const hex2 = new THREE.LineSegments(hex2Edges, hex2Mat);
    hex2.rotation.x = Math.PI / 2.3;
    hex2.rotation.z = Math.PI / 6;
    root.add(hex2);

    // 2. Central Floating Octahedron Prism
    const prismGeo = new THREE.OctahedronGeometry(0.7, 0);
    const prismEdges = new THREE.EdgesGeometry(prismGeo);
    const prismMat = new THREE.LineBasicMaterial({ color: 0xF59E0B, linewidth: 2 });
    const prism = new THREE.LineSegments(prismEdges, prismMat);
    root.add(prism);

    // 3. Ascending Light Stream Particle Nodes
    const pCount = 35;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 1.8;
      pPositions[i + 1] = (Math.random() - 0.5) * 2.2;
      pPositions[i + 2] = (Math.random() - 0.5) * 1.2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xF59E0B,
      size: 0.065,
      transparent: true,
      opacity: 0.8,
    });
    const pCloud = new THREE.Points(pGeo, pMat);
    root.add(pCloud);

    // 4. Mouse-only Interaction (Never hijack touch scrolling on mobile)
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };

    const dom = renderer.domElement;

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return; // Allow natural page scroll on touch
      isDragging = true;
      prevPos = { x: e.clientX, y: e.clientY };
      try {
        dom.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevPos.x;
      const dy = e.clientY - prevPos.y;
      root.rotation.y += dx * 0.015;
      root.rotation.x += dy * 0.015;
      prevPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e) => {
      isDragging = false;
      try {
        dom.releasePointerCapture(e.pointerId);
      } catch {}
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointercancel', onPointerUp);

    // 5. Visibility Observer for battery efficiency
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

      if (!isDragging) {
        root.rotation.y += 0.8 * delta;
        root.rotation.x = Math.sin(elapsed * 0.9) * 0.12;
      }

      hex1.rotation.y += 0.9 * delta;
      hex2.rotation.y -= 0.6 * delta;

      prism.rotation.x += 1.2 * delta;
      prism.rotation.y += 1.5 * delta;

      // Particle levitation
      const positions = pGeo.attributes.position.array;
      for (let i = 1; i < pCount * 3; i += 3) {
        positions[i] += 0.8 * delta;
        if (positions[i] > 1.4) {
          positions[i] = -1.4;
        }
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();

      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointercancel', onPointerUp);

      hex1Geo.dispose();
      hex1Edges.dispose();
      hex1Mat.dispose();
      hex2Geo.dispose();
      hex2Edges.dispose();
      hex2Mat.dispose();
      prismGeo.dispose();
      prismEdges.dispose();
      prismMat.dispose();
      pGeo.dispose();
      pMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={styles.portalContainer}
      style={{ width: size, height: size }}
      title="3D Website Launch Portal • Touch to interact"
    />
  );
}

