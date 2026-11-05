import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { Activity } from 'lucide-react';
import Hero3DModel from './Hero3DModel';
import styles from './FloatingVisual.module.css';

export default function FloatingVisual() {
  const [isPowerBoosted, setIsPowerBoosted] = useState(false);

  return (
    <div className={styles.heroVisualWrapper}>
      {/* Ambient Spatial Background Glows */}
      <div className={styles.ambientSpatialGlow} />
      <div className={styles.ambientRadialBlue} />

      {/* 3D Parallax Tilt Container */}
      <Tilt
        perspective={1400}
        glareEnable={true}
        glareMaxOpacity={0.16}
        glareColor="#F59E0B"
        glarePosition="all"
        glareBorderRadius="24px"
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        scale={1.01}
        transitionSpeed={800}
        className={styles.suitTiltCard}
        onEnter={() => setIsPowerBoosted(true)}
        onLeave={() => setIsPowerBoosted(false)}
      >
        <div className={`${styles.suitStage} ${isPowerBoosted ? styles.suitStageBoosted : ''}`}>
          {/* Spatial Layer 1: Background Holographic Tech Rings */}
          <div className={styles.holoRingOuter} />
          <div className={styles.holoRingInner} />
          <div className={styles.holoGridMatrix} />

          {/* Top Minimal Hologram Status Bar */}
          <div className={styles.stageHeader}>
            <div className={styles.statusGroup}>
              <span className={styles.statusPulseDot} />
              <span className={styles.statusLabel}>VEDAPLUS 3D CORE</span>
            </div>
            <div className={styles.telemetryTag}>
              <Activity size={12} className={styles.tagIcon} />
              <span>LIVE WEBGL</span>
            </div>
          </div>

          {/* Spatial Layer 2: Interactive 3D Model with Real-Time WebGL Lighting & 360° Drag */}
          <div className={styles.suitFigureContainer}>
            <Hero3DModel onPowerChange={setIsPowerBoosted} />
          </div>
        </div>
      </Tilt>
    </div>
  );
}
