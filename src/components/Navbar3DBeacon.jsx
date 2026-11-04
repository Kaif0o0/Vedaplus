import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './Navbar3DBeacon.module.css';

export default function Navbar3DBeacon({ size = 38 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Clean up any stale child canvases to avoid duplicate WebGL contexts in React 19
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = size;
    const height = size;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // 2. Lights for authentic 3D shading & metallic reflections
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfde68a, 2.2);
    dirLight.position.set(3, 4, 4);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0x60a5fa, 0.6);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xf59e0b, 1.8, 8);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 3. Central 3D Faceted Crystal Core (Shaded Octahedron with Gold Edges)
    const crystalGeo = new THREE.OctahedronGeometry(0.85, 0);
    const crystalMat = new THREE.MeshPhongMaterial({
      color: 0xf59e0b,
      emissive: 0xb45309,
      emissiveIntensity: 0.35,
      specular: 0xfde68a,
      shininess: 90,
      transparent: true,
      opacity: 0.88,
      flatShading: true,
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    rootGroup.add(crystalMesh);

    // Golden wireframe precision overlay on crystal edges
    const edgesGeo = new THREE.EdgesGeometry(crystalGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0xfde68a,
      transparent: true,
      opacity: 0.95,
    });
    const edgesMesh = new THREE.LineSegments(edgesGeo, edgesMat);
    crystalMesh.add(edgesMesh);

    // Central Glowing Energy Core (Internal Pulse Sphere)
    const coreGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    crystalMesh.add(coreMesh);

    // 4. Inner Gyroscopic Orbital Ring (Gold/Amber)
    const ring1Geo = new THREE.TorusGeometry(1.22, 0.034, 12, 48);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.85,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    rootGroup.add(ring1Mesh);

    // 5. Outer Counter-Orbital Ring (Midnight Dark Slate with Gold Beacon Nodes)
    const ring2Geo = new THREE.TorusGeometry(1.42, 0.026, 12, 48);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.3,
      metalness: 0.75,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    rootGroup.add(ring2Mesh);

    // 2 Mini Gold Satellite Nodes on Outer Ring
    const nodeGeo = new THREE.SphereGeometry(0.065, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    const nodeA = new THREE.Mesh(nodeGeo, nodeMat);
    nodeA.position.set(1.42, 0, 0);
    ring2Mesh.add(nodeA);

    const nodeB = new THREE.Mesh(nodeGeo, nodeMat);
    nodeB.position.set(-1.42, 0, 0);
    ring2Mesh.add(nodeB);

    // 6. Interactive Hover Acceleration (Works on both beacon & parent brand link)
    let isHovered = false;
    let speedMult = 1.0;

    const onEnter = () => {
      isHovered = true;
    };
    const onLeave = () => {
      isHovered = false;
    };

    const parentLink = container.closest('a');
    const hoverTarget = parentLink || container;

    hoverTarget.addEventListener('mouseenter', onEnter);
    hoverTarget.addEventListener('mouseleave', onLeave);

    // 7. Visibility Observer (Pause render loop when off-screen)
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    // 8. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const targetSpeed = isHovered ? 2.6 : 1.0;
      speedMult += (targetSpeed - speedMult) * 0.08;

      // Crystal multi-axis spin
      crystalMesh.rotation.y += 1.1 * delta * speedMult;
      crystalMesh.rotation.x += 0.6 * delta * speedMult;

      // Gyro rings counter-rotation
      ring1Mesh.rotation.z += 0.9 * delta * speedMult;
      ring2Mesh.rotation.x -= 0.7 * delta * speedMult;
      ring2Mesh.rotation.y += 0.85 * delta * speedMult;

      // Internal energy pulse
      const t = clock.getElapsedTime() * 3.5;
      const pulse = 1 + Math.sin(t) * 0.12;
      coreMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // 9. Complete Resource Cleanup
    return () => {
      cancelAnimationFrame(animId);
      visibilityObserver.disconnect();

      hoverTarget.removeEventListener('mouseenter', onEnter);
      hoverTarget.removeEventListener('mouseleave', onLeave);

      crystalGeo.dispose();
      crystalMat.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();

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
      aria-hidden="true"
    />
  );
}
