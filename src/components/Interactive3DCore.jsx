import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, RotateCcw } from 'lucide-react';
import styles from './Interactive3DCore.module.css';

export default function Interactive3DCore() {
  const mountRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = [
    { label: '01. Food & Hospitality', sub: 'Cafes · Bakeries · Restaurants' },
    { label: '02. Retail & E-commerce', sub: 'Clothing · Cosmetics · Jewellery' },
    { label: '03. Professional Services', sub: 'Salons · Repair · Consulting' },
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 340;
    let height = container.clientHeight || 260;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, width < 440 ? 6.4 : (width < 600 ? 5.6 : 5.0));

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    container.appendChild(renderer.domElement);

    // Root interactive group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 2. Center 3D Floating Webpage Device / Canvas Panel
    const panelGeo = new THREE.BoxGeometry(2.4, 1.5, 0.08);
    const panelEdges = new THREE.EdgesGeometry(panelGeo);
    const panelMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B, // Amber edge
      linewidth: 2,
      transparent: true,
      opacity: 0.85,
    });
    const panelMesh = new THREE.LineSegments(panelEdges, panelMat);
    rootGroup.add(panelMesh);

    // Glass Fill for Panel
    const glassMat = new THREE.MeshBasicMaterial({
      color: 0x0F172A,
      transparent: true,
      opacity: 0.65,
    });
    const glassMesh = new THREE.Mesh(panelGeo, glassMat);
    rootGroup.add(glassMesh);

    // 3. Webpage UI Elements inside 3D Panel (Navbar line, Hero block, Card wireframes)
    const uiGroup = new THREE.Group();
    panelMesh.add(uiGroup);

    // Browser Header Bar Line
    const headerLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.1, 0.55, 0.05),
      new THREE.Vector3(1.1, 0.55, 0.05),
    ]);
    const headerLineMat = new THREE.LineBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.5 });
    uiGroup.add(new THREE.Line(headerLineGeo, headerLineMat));

    // 3 Browser Dots
    [-0.95, -0.85, -0.75].forEach((xPos) => {
      const dotGeo = new THREE.CircleGeometry(0.035, 12);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.8 });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(xPos, 0.62, 0.05);
      uiGroup.add(dot);
    });

    // Wireframe Hero Card Block
    const heroCardGeo = new THREE.PlaneGeometry(0.95, 0.45);
    const heroCardEdges = new THREE.EdgesGeometry(heroCardGeo);
    const heroCardMat = new THREE.LineBasicMaterial({ color: 0xFBBF24, transparent: true, opacity: 0.75 });
    const heroCard = new THREE.LineSegments(heroCardEdges, heroCardMat);
    heroCard.position.set(-0.55, 0.15, 0.05);
    uiGroup.add(heroCard);

    // 3 Mini Cards (Representing 3 Services)
    [-0.7, 0, 0.7].forEach((xPos, idx) => {
      const miniGeo = new THREE.PlaneGeometry(0.55, 0.35);
      const miniEdges = new THREE.EdgesGeometry(miniGeo);
      const miniMat = new THREE.LineBasicMaterial({
        color: idx === 1 ? 0xF59E0B : 0xCBD5E1,
        transparent: true,
        opacity: idx === 1 ? 0.9 : 0.45,
      });
      const mini = new THREE.LineSegments(miniEdges, miniMat);
      mini.position.set(xPos, -0.38, 0.05);
      uiGroup.add(mini);
    });

    // 4. Orbiting Gyro Ring (Digital Infrastructure Orbit)
    const orbitRingGeo = new THREE.TorusGeometry(1.95, 0.02, 8, 48);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: 0.45,
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 2.6;
    orbitRing.rotation.y = Math.PI / 6;
    rootGroup.add(orbitRing);

    // Counter Orbit Ring
    const orbitRing2Geo = new THREE.TorusGeometry(2.1, 0.015, 8, 48);
    const orbitRing2Mat = new THREE.MeshBasicMaterial({
      color: 0x94A3B8,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat);
    orbitRing2.rotation.x = -Math.PI / 3;
    orbitRing2.rotation.z = Math.PI / 4;
    rootGroup.add(orbitRing2);

    // 5. Orbiting 3 Category Satellite Nodes
    const satelliteGroup = new THREE.Group();
    rootGroup.add(satelliteGroup);

    const satGeos = [
      new THREE.IcosahedronGeometry(0.18, 0),
      new THREE.OctahedronGeometry(0.18, 0),
      new THREE.TetrahedronGeometry(0.2, 0),
    ];

    const satMeshes = satGeos.map((geo) => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xF59E0B,
        wireframe: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      satelliteGroup.add(mesh);
      return mesh;
    });

    // 6. Constellation Particle Cloud (60 glowing micro-nodes)
    const particleCount = 65;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5.2;
      particlePositions[i + 1] = (Math.random() - 0.5) * 3.8;
      particlePositions[i + 2] = (Math.random() - 0.5) * 2.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xF59E0B,
      size: 0.055,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 7. Interactive Touch and Mouse Drag Rotation
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotationX = 0.15;
    let targetRotationY = -0.25;
    let currentRotationX = 0.15;
    let currentRotationY = -0.25;

    // 7. Mouse-only Interaction (Never hijack touch scrolling on mobile)
    const domEl = renderer.domElement;

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return; // Do not hijack touch scrolling
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
      try {
        domEl.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      // Clamp vertical tilt to avoid flipping upside down
      targetRotationX = Math.max(-0.65, Math.min(0.65, targetRotationX));

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e) => {
      isDragging = false;
      try {
        domEl.releasePointerCapture(e.pointerId);
      } catch {}
    };

    domEl.addEventListener('pointerdown', onPointerDown);
    domEl.addEventListener('pointermove', onPointerMove);
    domEl.addEventListener('pointerup', onPointerUp);
    domEl.addEventListener('pointercancel', onPointerUp);

    // 8. Auto-Resize Observer (Dynamically fits mobile viewports)
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const newW = container.clientWidth || 340;
      const newH = container.clientHeight || 260;
      camera.aspect = newW / newH;
      if (newW < 440) {
        camera.position.z = 6.4;
      } else if (newW < 600) {
        camera.position.z = 5.6;
      } else {
        camera.position.z = 5.0;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // 9. Intersection Observer (pause animation when off-screen for battery efficiency)
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    // 10. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Continuous Idle Float and Rotation
      if (!isDragging) {
        targetRotationY += 0.35 * delta;
        targetRotationX = 0.12 + Math.sin(elapsed * 0.8) * 0.06;
      }

      // Smooth damping interpolation
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      rootGroup.rotation.x = currentRotationX;
      rootGroup.rotation.y = currentRotationY;

      // Subtle breathing float on Y
      rootGroup.position.y = Math.sin(elapsed * 1.4) * 0.08;

      // Counter-rotate orbital rings for depth
      orbitRing.rotation.z += 0.5 * delta;
      orbitRing2.rotation.z -= 0.4 * delta;

      // Position the 3 satellites along the orbit
      satMeshes.forEach((mesh, idx) => {
        const angle = elapsed * 0.6 + (idx * (Math.PI * 2 / 3));
        const radius = 2.0;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y = Math.sin(angle * 2) * 0.35;
        mesh.rotation.x += 1.2 * delta;
        mesh.rotation.y += 1.5 * delta;
      });

      // Update active category pill cycle
      const activeIdx = Math.floor((elapsed * 0.4) % 3);
      setActiveCategory(activeIdx);

      // Shimmer particles
      particles.rotation.y += 0.08 * delta;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('pointermove', onPointerMove);
      domEl.removeEventListener('pointerup', onPointerUp);
      domEl.removeEventListener('pointercancel', onPointerUp);

      panelGeo.dispose();
      panelEdges.dispose();
      panelMat.dispose();
      glassMat.dispose();
      headerLineGeo.dispose();
      headerLineMat.dispose();
      heroCardGeo.dispose();
      heroCardEdges.dispose();
      heroCardMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();
      orbitRing2Geo.dispose();
      orbitRing2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      satGeos.forEach((g) => g.dispose());
      satMeshes.forEach((m) => m.material.dispose());

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.interactive3DWrapper}>
      {/* Three.js Canvas Container (Touch & Mouse interactive on Mobile & Desktop) */}
      <div ref={mountRef} className={styles.canvasContainer}>
        {/* Interactive Gesture Hint Badge */}
        <div className={styles.gestureHint}>
          <RotateCcw size={11} className={styles.hintIcon} />
          <span>Interactive 3D • Drag to Rotate</span>
        </div>
      </div>

      {/* Synchronized 3D Active Category Indicator */}
      <div className={styles.categorySyncBar}>
        <div className={styles.syncDot} />
        <div className={styles.syncContent}>
          <span className={styles.syncTitle}>{categories[activeCategory].label}</span>
          <span className={styles.syncSub}>{categories[activeCategory].sub}</span>
        </div>
      </div>
    </div>
  );
}

