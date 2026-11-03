import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './TechGlobe3D.module.css';

export default function TechGlobe3D({ size = 150 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

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

    const root = new THREE.Group();
    scene.add(root);

    // 1. Wireframe Digital Globe Sphere
    const sphereGeo = new THREE.SphereGeometry(1.05, 16, 16);
    const sphereWire = new THREE.WireframeGeometry(sphereGeo);
    const sphereMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B, // Marigold Amber
      transparent: true,
      opacity: 0.65,
      linewidth: 1,
    });
    const sphereMesh = new THREE.LineSegments(sphereWire, sphereMat);
    root.add(sphereMesh);

    // 2. Vertex Points Cloud on Sphere Surface
    const pointGeo = new THREE.SphereGeometry(1.06, 12, 12);
    const pointMat = new THREE.PointsMaterial({
      color: 0xFBBF24,
      size: 0.055,
      transparent: true,
      opacity: 0.9,
    });
    const pointsMesh = new THREE.Points(pointGeo, pointMat);
    root.add(pointsMesh);

    // 3. Orbital Tech Rings
    const ring1Geo = new THREE.TorusGeometry(1.4, 0.02, 8, 36);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xF59E0B, transparent: true, opacity: 0.5 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    root.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.55, 0.015, 8, 36);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x94A3B8, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    root.add(ring2);

    // 4. Mouse-only Drag Interaction (Never hijack touch scrolling on mobile)
    let isDragging = false;
    let prevPos = { x: 0, y: 0 };
    let rotSpeedY = 0.008;

    const dom = renderer.domElement;

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch') return; // Allow natural page scroll on touch devices
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
      root.rotation.y += dx * 0.012;
      root.rotation.x += dy * 0.012;
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

    // 5. Visibility Observer for battery & scroll efficiency
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

      if (!isDragging) {
        root.rotation.y += rotSpeedY;
        root.rotation.x += 0.003;
      }

      ring1.rotation.z += 0.01;
      ring2.rotation.z -= 0.008;

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

      sphereGeo.dispose();
      sphereWire.dispose();
      sphereMat.dispose();
      pointGeo.dispose();
      pointMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size]);

  return (
    <div
      ref={mountRef}
      className={styles.globeContainer}
      title="3D Global Cloud Architecture"
    />
  );
}

