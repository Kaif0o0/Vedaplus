import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import {
  Zap,
  Activity,
  Globe,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';
import styles from './FloatingVisual.module.css';

const PREVIEW_DATA = [
  {
    id: 'hospitality',
    title: 'Food & Dining Showcase',
    metric: 'Instant Mobile Menu & 1-Tap Booking',
    speed: '0.38s',
    vitals: '100% Mobile',
    tag: 'Hospitality',
  },
  {
    id: 'retail',
    title: 'Retail & Storefront Catalog',
    metric: 'Fast Product Grid & WhatsApp Order',
    speed: '0.42s',
    vitals: 'Zero Lag',
    tag: 'E-Commerce',
  },
  {
    id: 'services',
    title: 'Professional Service Hub',
    metric: 'Appointment Funnel & Reviews',
    speed: '0.35s',
    vitals: 'A+ Grade',
    tag: 'Services',
  },
  {
    id: 'students',
    title: 'Student & Academic Portfolio',
    metric: 'Interactive Resume & GitHub Links',
    speed: '0.29s',
    vitals: '100/100',
    tag: 'Portfolio',
  },
  {
    id: 'interiors',
    title: 'Modular Interiors Showcase',
    metric: '3D Lookbooks & Cost Estimators',
    speed: '0.45s',
    vitals: 'Retina HD',
    tag: 'Design',
  },
  {
    id: 'photography',
    title: 'Wedding Cinema & Photo Gallery',
    metric: '4K Full-Screen & Date Booking',
    speed: '0.48s',
    vitals: 'Ultra Fast',
    tag: 'Studios',
  },
];

export default function FloatingVisual() {
  const [activeTab, setActiveTab] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentPreview = PREVIEW_DATA[activeTab];

  const runAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
    }, 1200);
  };

  const cardContent = (
    <div className={styles.terminalStage}>
      {/* Top Browser / Window Header */}
      <div className={styles.windowHeader}>
        <div className={styles.trafficDots}>
          <span className={styles.dotRed} />
          <span className={styles.dotAmber} />
          <span className={styles.dotGreen} />
        </div>

        <div className={styles.urlBar}>
          <Lock size={11} className={styles.lockIcon} />
          <span className={styles.urlText}>vedaplus.agency/live-blueprint</span>
        </div>

        <div className={styles.liveScoreBadge}>
          <span className={styles.scoreDot} />
          <span>99/100 SCORE</span>
        </div>
      </div>

      {/* Architecture Stage Sub-Header */}
      <div className={styles.stageHeader}>
        <div className={styles.statusGroup}>
          <span className={styles.statusPulseDot} />
          <span className={styles.statusLabel}>VEDAPLUS CLOUD BLUEPRINT</span>
        </div>
        <div className={styles.telemetryTag}>
          <Activity size={12} className={styles.tagIcon} />
          <span>EDGE CDN ACTIVE</span>
        </div>
      </div>

      {/* Live Architecture Display Terminal */}
      <div className={styles.terminalBody}>
        {/* Category Switcher Tabs */}
        <div className={styles.previewTabsRow}>
          {PREVIEW_DATA.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`${styles.previewTabBtn} ${activeTab === idx ? styles.previewTabActive : ''}`}
            >
              {item.tag}
            </button>
          ))}
        </div>

        {/* Central Live Device Canvas */}
        <div className={styles.deviceScreen}>
          <div className={styles.screenHeader}>
            <div className={styles.screenTitleBox}>
              <Globe size={14} className={styles.screenAmberIcon} />
              <span className={styles.screenTitle}>{currentPreview.title}</span>
            </div>
            <span className={styles.speedPill}>{currentPreview.speed} TTFB</span>
          </div>

          {/* Wireframe UI Blocks */}
          <div className={styles.wireframeLayout}>
            <div className={styles.wireNavLine} />
            <div className={styles.wireHeroBlock}>
              <div className={styles.wireHeading} />
              <div className={styles.wireSubheading} />
              <div className={styles.wireBtn} />
            </div>
            <div className={styles.wireCardsGrid}>
              <div className={styles.wireMiniCard} />
              <div className={styles.wireMiniCard} />
              <div className={styles.wireMiniCard} />
            </div>
          </div>

          {/* Live Metric Overlay Pill */}
          <div className={styles.screenMetricRow}>
            <div className={styles.metricItem}>
              <CheckCircle2 size={13} className={styles.metricCheckIcon} />
              <span>{currentPreview.metric}</span>
            </div>
            <div className={styles.vitalScoreBadge}>
              <Zap size={11} className={styles.vitalZapIcon} />
              <span>{currentPreview.vitals}</span>
            </div>
          </div>
        </div>

        {/* Performance Indicators Grid */}
        <div className={styles.indicatorsGrid}>
          <div className={styles.indicatorCard}>
            <span className={styles.indValue}>0.35s</span>
            <span className={styles.indLabel}>First Contentful Paint</span>
          </div>
          <div className={styles.indicatorCard}>
            <span className={styles.indValue}>0.00</span>
            <span className={styles.indLabel}>Cumulative Layout Shift</span>
          </div>
          <div className={styles.indicatorCard}>
            <span className={styles.indValue}>100%</span>
            <span className={styles.indLabel}>Mobile Viewport SEO</span>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Bar */}
      <div className={styles.terminalFooter}>
        <div className={styles.footerSpec}>
          <span className={styles.footerSpecDot} />
          <span>Zero-Bloat Next Architecture</span>
        </div>

        <button
          type="button"
          onClick={runAudit}
          className={`${styles.auditBtn} ${isAuditing ? styles.auditBtnActive : ''}`}
          title="Test Live Speed"
        >
          <Sparkles size={12} className={styles.auditIcon} />
          <span>{isAuditing ? 'Testing Speed...' : 'Run Speed Audit'}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.heroVisualWrapper}>
      {/* Ambient Spatial Background Glows */}
      <div className={styles.ambientSpatialGlow} />
      <div className={styles.ambientRadialBlue} />

      {/* 2D Modern Tilt Card Container */}
      {isMobile ? (
        <div className={styles.blueprintTiltCard}>
          {cardContent}
        </div>
      ) : (
        <Tilt
          perspective={1200}
          tiltEnable={true}
          glareEnable={true}
          glareMaxOpacity={0.12}
          glareColor="#F59E0B"
          glarePosition="all"
          glareBorderRadius="24px"
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          scale={1.01}
          transitionSpeed={800}
          className={styles.blueprintTiltCard}
        >
          {cardContent}
        </Tilt>
      )}
    </div>
  );
}
