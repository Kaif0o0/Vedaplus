import React from 'react';
import {
  Utensils,
  ShoppingBag,
  Briefcase,
  Zap,
  Smartphone,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Clock,
  Sparkles,
  GraduationCap,
  Compass,
  Camera,
} from 'lucide-react';
import styles from './Marquee3D.module.css';

const ROW_ONE_ITEMS = [
  {
    icon: Utensils,
    tag: '01. Food & Hospitality',
    text: 'Cafes · Restaurants · Hotels · Bakeries',
    highlight: 'Digital Menus & Booking',
  },
  {
    icon: ShoppingBag,
    tag: '02. Retail & E-commerce',
    text: 'Clothing · Cosmetics · Grocery · Jewellery',
    highlight: 'Product Catalogs & WhatsApp Buy',
  },
  {
    icon: Briefcase,
    tag: '03. Professional & Local Services',
    text: 'Salons · Repair · Cleaning · Consulting',
    highlight: 'Instant Inquiries & Quotes',
  },
  {
    icon: GraduationCap,
    tag: '04. Students & Fresh Graduates',
    text: 'Personal Portfolios · Interactive CVs · Capstones',
    highlight: 'Recruiter & University Ready',
  },
  {
    icon: Compass,
    tag: '05. Interior Designers & Modular Kitchens',
    text: 'Living Spaces · Kitchens · 3D Walkthroughs',
    highlight: 'Lookbooks & Cost Estimators',
  },
  {
    icon: Camera,
    tag: '06. Wedding Photographers & Studios',
    text: 'Wedding Films · Pre-Wedding · Client Proofing',
    highlight: '4K Gallery & Date Booking',
  },
  {
    icon: MapPin,
    tag: 'Local Maharashtra Businesses',
    text: 'Opp. Rajgurunagar Sahakari Bank, Khed, Pune',
    highlight: 'Hyper-Local SEO Presence',
  },
];

const ROW_TWO_ITEMS = [
  {
    icon: Zap,
    tag: 'Fast Cellular Loading',
    text: 'Lightweight static bundles built for rapid mobile display',
  },
  {
    icon: Smartphone,
    tag: '100% Mobile Responsive',
    text: 'Handcrafted layouts optimized for natural thumb ergonomics',
  },
  {
    icon: MessageCircle,
    tag: 'Direct WhatsApp & Call Funnel',
    text: '1-tap customer conversion with zero forms friction',
  },
  {
    icon: ShieldCheck,
    tag: 'Clean Code Architecture',
    text: 'Zero bloated plugins, zero server crash alerts',
  },
  {
    icon: Clock,
    tag: '14-Day Delivery Sprint',
    text: 'Rapid agile turnaround from blueprint to deployment',
  },
];

export default function Marquee3D() {
  return (
    <section className={styles.marquee3DSection} aria-label="Key Capabilities and Categories 3D Marquee">
      {/* Subtle Spatial Ambient Glow */}
      <div className={styles.ambientGlow} />

      {/* 3D Perspective Viewport */}
      <div className={styles.viewport3D}>
        
        {/* Track 1: Moving Right to Left with 3D Tilt */}
        <div className={`${styles.marqueeRow} ${styles.rowTiltTop}`}>
          <div className={styles.marqueeTrackLeft}>
            {/* Render items twice for a truly seamless infinite loop */}
            {[...ROW_ONE_ITEMS, ...ROW_ONE_ITEMS, ...ROW_ONE_ITEMS].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`r1-${idx}`} className={styles.marqueeCard}>
                  <div className={styles.cardIconBox}>
                    <Icon size={16} className={styles.cardIcon} />
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTagRow}>
                      <span className={styles.cardTag}>{item.tag}</span>
                      <span className={styles.cardBadge}>{item.highlight}</span>
                    </div>
                    <span className={styles.cardText}>{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Track 2: Moving Left to Right with Counter 3D Tilt */}
        <div className={`${styles.marqueeRow} ${styles.rowTiltBottom}`}>
          <div className={styles.marqueeTrackRight}>
            {[...ROW_TWO_ITEMS, ...ROW_TWO_ITEMS, ...ROW_TWO_ITEMS].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={`r2-${idx}`} className={`${styles.marqueeCard} ${styles.cardDark}`}>
                  <div className={styles.cardIconBoxDark}>
                    <Icon size={16} className={styles.cardIconAmber} />
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.cardTagDark}>{item.tag}</span>
                    <span className={styles.cardTextDark}>{item.text}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Side Vignette Fades to hide track edges seamlessly */}
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />
    </section>
  );
}

