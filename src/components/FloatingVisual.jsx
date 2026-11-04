import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import {
  Zap,
  ShieldCheck,
  Smartphone,
  Cpu,
  Wifi,
  Sparkles,
  ArrowUpRight,
  Activity,
} from 'lucide-react';
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
        glareMaxOpacity={0.22}
        glareColor="#F59E0B"
        glarePosition="all"
        glareBorderRadius="24px"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        scale={1.02}
        transitionSpeed={800}
        className={styles.suitTiltCard}
        onEnter={() => setIsPowerBoosted(true)}
        onLeave={() => setIsPowerBoosted(false)}
      >
        <div className={styles.suitStage}>
          {/* Spatial Layer 1: Background Holographic Tech Rings */}
          <div className={styles.holoRingOuter} />
          <div className={styles.holoRingInner} />
          <div className={styles.holoGridMatrix} />

          {/* Top Hologram Status Bar */}
          <div className={styles.stageHeader}>
            <div className={styles.statusGroup}>
              <span className={styles.statusPulseDot} />
              <span className={styles.statusLabel}>VEDAPLUS TITANIUM CORE</span>
            </div>
            <div className={styles.telemetryTag}>
              <Activity size={13} className={styles.tagIcon} />
              <span>100% PEAK PERFORMANCE</span>
            </div>
          </div>

          {/* Spatial Layer 2: Full-Body 3D Iron Man Suit with Anti-Gravity Float */}
          <div className={`${styles.suitFigureContainer} ${styles.antiGravityFloat}`}>
            <div className={styles.suitArtWrapper}>
              <picture>
                <source srcSet="/ironman_suit.webp" type="image/webp" />
                <img
                  src="/ironman_suit.png"
                  alt="VedaPlus High-Performance Website Architecture"
                  className={styles.suitImage}
                  draggable="false"
                />
              </picture>

              {/* Exact Light Node 1: Helmet Optical Sensors (Left: 56.4%, Top: 8.5%) */}
              <div className={`${styles.lightNode} ${styles.helmetEyesLight}`}>
                <span className={styles.eyeGlow} />
              </div>

              {/* Exact Light Node 2: Raised Palm Repulsor (Left: 80.8%, Top: 12.4%) */}
              <div className={`${styles.lightNode} ${styles.palmRepulsorLight}`}>
                <span className={styles.repulsorCore} />
                <span className={styles.repulsorRays} />
                <span className={styles.repulsorWave} />
              </div>

              {/* Exact Light Node 3: Chest Arc Reactor (Left: 36.8%, Top: 20.0%) */}
              <div className={`${styles.lightNode} ${styles.arcReactorLight}`}>
                <span className={styles.coreFlare} />
                <span className={styles.energyPulseWave} />
              </div>

              {/* Exact Light Node 4: Lower Hand Repulsor (Left: 18.6%, Top: 40.9%) */}
              <div className={`${styles.lightNode} ${styles.lowerRepulsorLight}`}>
                <span className={styles.coreFlareSmall} />
              </div>
            </div>

            {/* Ground Contact Shadow Cushion under Boots */}
            <div className={styles.suitShadowCushion} />
          </div>

          {/* Spatial Layer 3: Floating 3D Telemetry Chips (Elevated in Z-space) */}
          <div className={`${styles.floatingChip} ${styles.chipVelocity}`}>
            <div className={styles.chipIconBubble}>
              <Zap size={14} className={styles.chipAmberIcon} />
            </div>
            <div className={styles.chipTextGroup}>
              <span className={styles.chipTitle}>Fast Mobile Velocity</span>
              <span className={styles.chipSub}>Sub-second cellular display</span>
            </div>
          </div>

          <div className={`${styles.floatingChip} ${styles.chipDirect}`}>
            <div className={styles.chipIconBubble}>
              <Smartphone size={14} className={styles.chipAmberIcon} />
            </div>
            <div className={styles.chipTextGroup}>
              <span className={styles.chipTitle}>Direct Inquiries</span>
              <span className={styles.chipSub}>1-Tap WhatsApp &amp; Call Bridge</span>
            </div>
          </div>

          <div className={`${styles.floatingChip} ${styles.chipZeroBloat}`}>
            <div className={styles.chipIconBubble}>
              <ShieldCheck size={14} className={styles.chipAmberIcon} />
            </div>
            <div className={styles.chipTextGroup}>
              <span className={styles.chipTitle}>Clean Architecture</span>
              <span className={styles.chipSub}>Zero crash alerts • Zero bloat</span>
            </div>
          </div>

          {/* Bottom Diagnostics Spec Bar */}
          <div className={styles.stageFooter}>
            <div className={styles.footerSpecItem}>
              <span className={styles.specLabel}>ENGINE</span>
              <span className={styles.specValue}>Custom Cloud</span>
            </div>
            <div className={styles.specDivider} />
            <div className={styles.footerSpecItem}>
              <span className={styles.specLabel}>UPTIME</span>
              <span className={styles.specValue}>24/7 Shield</span>
            </div>
            <div className={styles.specDivider} />
            <div className={styles.footerSpecItem}>
              <span className={styles.specLabel}>SPEED</span>
              <span className={styles.specValue}>Ultra-Rapid</span>
            </div>
          </div>

        </div>
      </Tilt>
    </div>
  );
}
