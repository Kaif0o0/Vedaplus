import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { useSpring, animated } from '@react-spring/web';
import {
  Coffee,
  Sparkles,
  Store,
  Wrench,
  Cpu,
  Wifi,
} from 'lucide-react';
import styles from './FloatingVisual.module.css';

export default function FloatingVisual() {
  const [activeNode, setActiveNode] = useState(null);

  // Subtle continuous anti-gravity springs for satellites
  const floatSpring1 = useSpring({
    from: { y: 0, rot: -2 },
    to: async (next) => {
      while (true) {
        await next({ y: -16, rot: 2, config: { duration: 3200 } });
        await next({ y: 0, rot: -2, config: { duration: 3200 } });
      }
    },
  });

  const floatSpring2 = useSpring({
    from: { y: 0, rot: 2 },
    to: async (next) => {
      while (true) {
        await next({ y: 14, rot: -1.5, config: { duration: 3800 } });
        await next({ y: 0, rot: 2, config: { duration: 3800 } });
      }
    },
  });

  const floatSpring3 = useSpring({
    from: { y: -8, rot: 1 },
    to: async (next) => {
      while (true) {
        await next({ y: 8, rot: -2, config: { duration: 3500 } });
        await next({ y: -8, rot: 1, config: { duration: 3500 } });
      }
    },
  });

  const floatSpring4 = useSpring({
    from: { y: 6, rot: -1 },
    to: async (next) => {
      while (true) {
        await next({ y: -12, rot: 2, config: { duration: 4200 } });
        await next({ y: 6, rot: -1, config: { duration: 4200 } });
      }
    },
  });

  return (
    <div className={styles.antiGravityViewport}>
      {/* Background Orbit Ring Vectors (Desktop only) */}
      <div className={styles.orbitRingOuter} />
      <div className={styles.orbitRingInner} />

      {/* Parallax Tilt on the Central High-Tech Hub */}
      <Tilt
        perspective={1200}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#F59E0B"
        glarePosition="all"
        glareBorderRadius="24px"
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        scale={1.02}
        transitionSpeed={800}
        className={styles.tiltCoreWrapper}
      >
        <div className={styles.centralHub}>
          {/* Header of Core Glass Panel */}
          <div className={styles.hubHeader}>
            <div className={styles.hubStatus}>
              <span className={styles.hubPulseDot} />
              <span className={styles.hubTag}>VEDAPLUS / ACTIVE</span>
            </div>
            <div className={styles.hubSpecs}>
              <Wifi size={14} className={styles.specIcon} />
              <span>Ultra-Fast Load Speed</span>
            </div>
          </div>

          {/* Central Holographic Preview */}
          <div className={styles.hubBody}>
            <div className={styles.hubBadge}>
              <Cpu size={16} />
              <span>Local Business Website Development</span>
            </div>
            <h3 className={styles.hubHeading}>High-Speed Website Engine</h3>
            <p className={styles.hubDesc}>
              Fast mobile menus, instant appointment forms, and local Google Maps search visibility built into every website.
            </p>

            {/* Live Performance & Feature Strip */}
            <div className={styles.telemetryGrid}>
              <div className={styles.telemetryCard}>
                <span className={styles.telemetryVal}>Fast</span>
                <span className={styles.telemetryKey}>Mobile-First Loading</span>
              </div>
              <div className={styles.telemetryCard}>
                <span className={styles.telemetryVal}>Clean</span>
                <span className={styles.telemetryKey}>SEO &amp; Code Quality</span>
              </div>
              <div className={styles.telemetryCard}>
                <span className={styles.telemetryVal}>Direct</span>
                <span className={styles.telemetryKey}>WhatsApp &amp; Calls</span>
              </div>
            </div>

            {/* Glowing Pulse Line Vector */}
            <div className={styles.pulseGraph}>
              <svg viewBox="0 0 320 40" fill="none" className={styles.pulseSvg}>
                <path
                  d="M0 20H40L60 8L80 34L100 20H150L170 6L190 32L210 20H260L275 12L285 28L295 20H320"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="170" cy="6" r="3" fill="#F59E0B" />
                <circle cx="275" cy="12" r="3" fill="#F59E0B" />
              </svg>
            </div>
          </div>
        </div>
      </Tilt>

      {/* Orbiting Satellites Group */}
      <div className={styles.satellitesWrapper}>
        {/* Orbiting Satellite 1: Food & Hospitality */}
        <animated.div
          style={{
            transform: floatSpring1.y.to(
              (y) => `translate3d(0, ${y}px, 0) rotate(${floatSpring1.rot.get()}deg)`
            ),
          }}
          className={`${styles.satelliteCard} ${styles.satCafe}`}
          onMouseEnter={() => setActiveNode('cafe')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            scale={1.03}
            transitionSpeed={600}
          >
            <div className={styles.satInner}>
              <div className={styles.satIconBubble}>
                <Coffee size={18} className={styles.satIcon} />
              </div>
              <div className={styles.satContent}>
                <div className={styles.satHeader}>
                  <span className={styles.satArchetype}>Food &amp; Hospitality</span>
                  <span className={styles.satSpeed}>Digital Menu</span>
                </div>
                <h4 className={styles.satTitle}>Cafes &amp; Bakeries</h4>
                <p className={styles.satSub}>Online Menus • Table Booking</p>
              </div>
            </div>
          </Tilt>
        </animated.div>

        {/* Orbiting Satellite 2: Professional & Local Services */}
        <animated.div
          style={{
            transform: floatSpring2.y.to(
              (y) => `translate3d(0, ${y}px, 0) rotate(${floatSpring2.rot.get()}deg)`
            ),
          }}
          className={`${styles.satelliteCard} ${styles.satClinic}`}
          onMouseEnter={() => setActiveNode('wellness')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            scale={1.03}
            transitionSpeed={600}
          >
            <div className={styles.satInner}>
              <div className={styles.satIconBubble}>
                <Sparkles size={18} className={styles.satIcon} />
              </div>
              <div className={styles.satContent}>
                <div className={styles.satHeader}>
                  <span className={styles.satArchetype}>Local Services</span>
                  <span className={styles.satSpeed}>Appointments</span>
                </div>
                <h4 className={styles.satTitle}>Salons &amp; Wellness</h4>
                <p className={styles.satSub}>Direct WhatsApp • Quick Inquiries</p>
              </div>
            </div>
          </Tilt>
        </animated.div>

        {/* Orbiting Satellite 3: Retail & E-commerce */}
        <animated.div
          style={{
            transform: floatSpring3.y.to(
              (y) => `translate3d(0, ${y}px, 0) rotate(${floatSpring3.rot.get()}deg)`
            ),
          }}
          className={`${styles.satelliteCard} ${styles.satRetail}`}
          onMouseEnter={() => setActiveNode('retail')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            scale={1.03}
            transitionSpeed={600}
          >
            <div className={styles.satInner}>
              <div className={styles.satIconBubble}>
                <Store size={18} className={styles.satIcon} />
              </div>
              <div className={styles.satContent}>
                <div className={styles.satHeader}>
                  <span className={styles.satArchetype}>Retail &amp; E-commerce</span>
                  <span className={styles.satSpeed}>Live Catalog</span>
                </div>
                <h4 className={styles.satTitle}>Clothing &amp; Jewellery</h4>
                <p className={styles.satSub}>Product Showcase • WhatsApp Orders</p>
              </div>
            </div>
          </Tilt>
        </animated.div>

        {/* Orbiting Satellite 4: Professional & Local Services */}
        <animated.div
          style={{
            transform: floatSpring4.y.to(
              (y) => `translate3d(0, ${y}px, 0) rotate(${floatSpring4.rot.get()}deg)`
            ),
          }}
          className={`${styles.satelliteCard} ${styles.satHospital}`}
          onMouseEnter={() => setActiveNode('repair')}
          onMouseLeave={() => setActiveNode(null)}
        >
          <Tilt
            tiltMaxAngleX={12}
            tiltMaxAngleY={12}
            scale={1.03}
            transitionSpeed={600}
          >
            <div className={styles.satInner}>
              <div className={styles.satIconBubble}>
                <Wrench size={18} className={styles.satIcon} />
              </div>
              <div className={styles.satContent}>
                <div className={styles.satHeader}>
                  <span className={styles.satArchetype}>Professional Services</span>
                  <span className={styles.satSpeed}>Instant Calls</span>
                </div>
                <h4 className={styles.satTitle}>Repair &amp; Cleaning</h4>
                <p className={styles.satSub}>Local Inquiries • Fast Response</p>
              </div>
            </div>
          </Tilt>
        </animated.div>
      </div>
    </div>
  );
}
