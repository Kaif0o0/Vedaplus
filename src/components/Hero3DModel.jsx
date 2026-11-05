import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, Zap, Move3d } from 'lucide-react';
import styles from './Hero3DModel.module.css';

export default function Hero3DModel({ onPowerChange }) {
  const mountRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.1, y: 0 });
  const isHoveredRef = useRef(false);
  const [isBoosted, setIsBoosted] = useState(false);
  const boostedTimerRef = useRef(null);

  // Trigger interactive power boost
  const triggerBoost = useCallback(() => {
    setIsBoosted(true);
    if (onPowerChange) onPowerChange(true);
    if (boostedTimerRef.current) clearTimeout(boostedTimerRef.current);
    boostedTimerRef.current = setTimeout(() => {
      setIsBoosted(false);
      if (onPowerChange) onPowerChange(false);
    }, 2800);
  }, [onPowerChange]);

  const resetRotation = useCallback(() => {
    targetRotationRef.current = { x: 0.1, y: 0 };
    rotationVelocityRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Clean up stale canvas children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 420;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const updateCameraPos = (w) => {
      camera.position.set(0, 0, w < 440 ? 5.8 : (w < 600 ? 5.2 : 4.6));
    };
    updateCameraPos(width);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Lights for authentic metallic highlights & cybernetic reflections
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xf59e0b, 3.4); // Marigold Amber Key Light
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.4); // Cool Cyan Rim Light
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    const coreLight = new THREE.PointLight(0xf59e0b, 4.5, 8); // Inner Arc Reactor Light
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const accentLight = new THREE.PointLight(0x60a5fa, 2.0, 6);
    accentLight.position.set(0, 1.0, 0.5);
    scene.add(accentLight);

    // 3. Root Interactive 3D Model Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // A. Central Quantum Arc Reactor
    // Inner glowing core
    const coreGeo = new THREE.IcosahedronGeometry(0.55, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf59e0b,
      emissiveIntensity: 2.2,
      roughness: 0.15,
      metalness: 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Lattice wireframe around core
    const latticeGeo = new THREE.IcosahedronGeometry(0.68, 1);
    const latticeEdges = new THREE.EdgesGeometry(latticeGeo);
    const latticeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
    });
    const latticeMesh = new THREE.LineSegments(latticeEdges, latticeMat);
    rootGroup.add(latticeMesh);

    // Faceted Crystal Titanium Shell
    const shellGeo = new THREE.OctahedronGeometry(0.98, 0);
    const shellMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.72,
    });
    const shellMesh = new THREE.Mesh(shellGeo, shellMat);
    rootGroup.add(shellMesh);

    const shellEdges = new THREE.EdgesGeometry(shellGeo);
    const shellEdgeMat = new THREE.LineBasicMaterial({
      color: 0xf59e0b,
      linewidth: 2,
      transparent: true,
      opacity: 0.95,
    });
    const shellEdgeMesh = new THREE.LineSegments(shellEdges, shellEdgeMat);
    rootGroup.add(shellEdgeMesh);

    // B. Articulated Titanium Armor Brackets / Wing Blades
    const armorGroup = new THREE.Group();
    rootGroup.add(armorGroup);

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.25,
      metalness: 0.85,
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.95,
      emissive: 0xd97706,
      emissiveIntensity: 0.3,
    });

    // 4 Symmetrical Armor Shoulders / Wings
    const plateGeo = new THREE.BoxGeometry(0.18, 0.95, 0.35);
    const trimGeo = new THREE.BoxGeometry(0.04, 0.98, 0.37);

    // Left Wing
    const leftWing = new THREE.Group();
    const leftPlate = new THREE.Mesh(plateGeo, titaniumMat);
    const leftTrim = new THREE.Mesh(trimGeo, goldTrimMat);
    leftTrim.position.x = 0.09;
    leftWing.add(leftPlate, leftTrim);
    leftWing.position.set(-1.3, 0, 0);
    leftWing.rotation.z = 0.15;
    armorGroup.add(leftWing);

    // Right Wing
    const rightWing = new THREE.Group();
    const rightPlate = new THREE.Mesh(plateGeo, titaniumMat);
    const rightTrim = new THREE.Mesh(trimGeo, goldTrimMat);
    rightTrim.position.x = -0.09;
    rightWing.add(rightPlate, rightTrim);
    rightWing.position.set(1.3, 0, 0);
    rightWing.rotation.z = -0.15;
    armorGroup.add(rightWing);

    // Top Helmet / Visor Crest
    const crestGroup = new THREE.Group();
    const crestGeo = new THREE.ConeGeometry(0.35, 0.65, 4);
    const crestMesh = new THREE.Mesh(crestGeo, titaniumMat);
    crestMesh.rotation.y = Math.PI / 4;
    crestMesh.rotation.z = Math.PI;
    const visorLightGeo = new THREE.BoxGeometry(0.28, 0.05, 0.08);
    const visorLightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const visorLight = new THREE.Mesh(visorLightGeo, visorLightMat);
    visorLight.position.set(0, -0.08, 0.22);
    crestGroup.add(crestMesh, visorLight);
    crestGroup.position.set(0, 1.35, 0);
    armorGroup.add(crestGroup);

    // Bottom Keel / Stabilizer Fin
    const keelGeo = new THREE.ConeGeometry(0.28, 0.75, 4);
    const keelMesh = new THREE.Mesh(keelGeo, titaniumMat);
    keelMesh.rotation.y = Math.PI / 4;
    keelMesh.position.set(0, -1.35, 0);
    armorGroup.add(keelMesh);

    // C. Triple Gimbal Gyroscope Rings
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.032, 16, 72);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.9,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2;

    // Add 8 gold node teeth to Ring 1
    const nodeToothGeo = new THREE.BoxGeometry(0.08, 0.12, 0.08);
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const tooth = new THREE.Mesh(nodeToothGeo, goldTrimMat);
      tooth.position.set(Math.cos(angle) * 1.65, Math.sin(angle) * 1.65, 0);
      ring1.add(tooth);
    }
    rootGroup.add(ring1);

    // Ring 2 (Tilted polar orbit)
    const ring2Geo = new THREE.TorusGeometry(1.95, 0.024, 16, 72);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = 0.4;
    rootGroup.add(ring2);

    // Ring 3 (Outer Horizon Ring)
    const ring3Geo = new THREE.TorusGeometry(2.3, 0.018, 16, 72);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.5,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = -0.5;
    ring3.rotation.z = 0.3;
    rootGroup.add(ring3);

    // D. 4 Orbiting Telemetry Satellites
    const satellites = [];
    const satGroup = new THREE.Group();
    rootGroup.add(satGroup);

    const satGeo = new THREE.OctahedronGeometry(0.12, 0);
    const satMatGold = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.2,
    });
    const satMatCyan = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.2,
    });

    for (let i = 0; i < 4; i++) {
      const mesh = new THREE.Mesh(satGeo, i % 2 === 0 ? satMatGold : satMatCyan);
      const orbitRadius = 2.15 + i * 0.18;
      const speed = 0.8 + i * 0.35;
      const tilt = (i * Math.PI) / 3;
      satellites.push({ mesh, orbitRadius, speed, tilt, angle: (i * Math.PI) / 2 });
      satGroup.add(mesh);
    }

    // E. Volumetric Anti-Gravity Particle Nebula
    const particleCount = 130;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfde68a,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // F. Base Hologram Pulse Disk
    const holoDiskGeo = new THREE.RingGeometry(0.3, 1.8, 32);
    const holoDiskMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    });
    const holoDisk = new THREE.Mesh(holoDiskGeo, holoDiskMat);
    holoDisk.rotation.x = Math.PI / 2;
    holoDisk.position.y = -2.1;
    rootGroup.add(holoDisk);

    // 4. Animation Frame Loop
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const boostFactor = isBoosted ? 2.6 : (isHoveredRef.current ? 1.35 : 1.0);

      // Smooth damped rotation towards target
      if (!isDraggingRef.current) {
        // Auto-rotation when idle
        targetRotationRef.current.y += 0.007 * boostFactor;
        // Apply inertia decay
        targetRotationRef.current.y += rotationVelocityRef.current.y;
        targetRotationRef.current.x += rotationVelocityRef.current.x;
        rotationVelocityRef.current.x *= 0.92;
        rotationVelocityRef.current.y *= 0.92;
      }

      rootGroup.rotation.x += (targetRotationRef.current.x - rootGroup.rotation.x) * 0.08;
      rootGroup.rotation.y += (targetRotationRef.current.y - rootGroup.rotation.y) * 0.08;

      // Anti-gravity floating bobbing physics
      rootGroup.position.y = Math.sin(elapsedTime * 1.6) * 0.08;

      // Rotating gyro rings at distinct speeds and counter-rotations
      ring1.rotation.z += 0.012 * boostFactor;
      ring2.rotation.x -= 0.016 * boostFactor;
      ring3.rotation.y += 0.008 * boostFactor;
      latticeMesh.rotation.y -= 0.015 * boostFactor;
      shellMesh.rotation.y += 0.008 * boostFactor;
      shellEdgeMesh.rotation.y += 0.008 * boostFactor;

      // Core pulsation & breathing intensity
      const pulseRate = isBoosted ? 8 : 3.2;
      const pulse = Math.sin(elapsedTime * pulseRate) * 0.5 + 0.5;
      coreMat.emissiveIntensity = 1.8 + pulse * (isBoosted ? 2.5 : 1.2);
      coreLight.intensity = 3.5 + pulse * 2.5;

      // Orbiting satellites
      satellites.forEach((sat) => {
        sat.angle += 0.018 * sat.speed * boostFactor;
        const x = Math.cos(sat.angle) * sat.orbitRadius;
        const z = Math.sin(sat.angle) * sat.orbitRadius;
        const y = Math.sin(sat.angle * 2) * 0.35;
        sat.mesh.position.set(
          x * Math.cos(sat.tilt) - y * Math.sin(sat.tilt),
          x * Math.sin(sat.tilt) + y * Math.cos(sat.tilt),
          z
        );
        sat.mesh.rotation.x += 0.03;
        sat.mesh.rotation.y += 0.04;
      });

      // Subtle particle swirl
      particles.rotation.y += 0.002 * boostFactor;

      // Holographic disk ripple
      holoDisk.rotation.z += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // 5. Pointer Drag & Touch Listeners for 360-degree orbital rotation
    const onPointerDown = (e) => {
      isDraggingRef.current = true;
      previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
      rotationVelocityRef.current = { x: 0, y: 0 };
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerPosRef.current.x;
      const deltaY = e.clientY - previousPointerPosRef.current.y;

      targetRotationRef.current.y += deltaX * 0.008;
      targetRotationRef.current.x += deltaY * 0.008;

      // Clamp X rotation to prevent flipping upside down
      targetRotationRef.current.x = Math.max(-0.75, Math.min(0.75, targetRotationRef.current.x));

      rotationVelocityRef.current = {
        x: deltaY * 0.004,
        y: deltaX * 0.004,
      };

      previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // Responsive Canvas Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 400;
      camera.aspect = w / h;
      updateCameraPos(w);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvasEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.clear();
      if (boostedTimerRef.current) clearTimeout(boostedTimerRef.current);
    };
  }, [isBoosted]);

  return (
    <div
      className={styles.modelWrapper}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className={styles.canvasContainer}
        title="Interactive 3D Titanium Core • Drag to Rotate"
      />

      {/* Floating 3D Control Pill */}
      <div className={styles.controlsBar}>
        <div className={styles.dragHint}>
          <Move3d size={13} className={styles.hintIcon} />
          <span>Drag to Rotate</span>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={`${styles.actionBtn} ${isBoosted ? styles.actionBtnActive : ''}`}
            onClick={triggerBoost}
            title="Accelerate 3D Core Energy"
          >
            <Zap size={12} className={styles.btnIcon} />
            <span>{isBoosted ? 'Surge' : 'Boost'}</span>
          </button>

          <button
            type="button"
            className={styles.actionBtn}
            onClick={resetRotation}
            title="Reset 3D Perspective"
          >
            <RotateCcw size={12} className={styles.btnIcon} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

