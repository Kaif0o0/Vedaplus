import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Utensils,
  ShoppingBag,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import styles from './GsapScrollShowcase.module.css';

gsap.registerPlugin(ScrollTrigger);

const SHOWCASE_CARDS = [
  {
    id: 'food',
    num: '01',
    archetype: 'Food & Hospitality',
    subcategories: 'Cafes · Restaurants · Hotels · Bakeries',
    icon: Utensils,
    tagline: 'High-Speed Menus & 1-Tap Table Reservations',
    description:
      'We craft dining and stay websites engineered for instant customer action. Customers can flip through high-definition visual menus without waiting for slow PDFs to download.',
    features: [
      'Interactive visual digital menu (Instant cellular load)',
      '1-Click WhatsApp & call table reservation bridge',
      'Curbside pickup, takeaway, and room inquiry funnels',
      'Optimized Google Maps local SEO geo-tagging',
    ],
    targetType: 'Food & Hospitality (Cafes, Restaurants, Hotels, Bakeries)',
    badge: 'Digital Menu & Booking',
  },
  {
    id: 'retail',
    num: '02',
    archetype: 'Retail & E-commerce',
    subcategories: 'Clothing · Cosmetics · Grocery · Jewellery',
    icon: ShoppingBag,
    tagline: 'Weightless Storefronts & Curbside Reserve',
    description:
      'Turn local foot traffic into digital store repeat buyers. Modern product showcases with fast image caching, collection filters, and direct WhatsApp ordering.',
    features: [
      'Interactive product lookbooks & collection showcases',
      'Curbside reserve and in-store pickup inquiry flow',
      'Fast mobile browsing with instant image previews',
      'Integrated Google Merchant & local search discovery',
    ],
    targetType: 'Retail & E-commerce (Clothing, Cosmetics, Grocery, Jewellery)',
    badge: 'Catalog & Storefront',
  },
  {
    id: 'services',
    num: '03',
    archetype: 'Professional & Local Services',
    subcategories: 'Salons · Repair · Cleaning · Consulting',
    icon: Briefcase,
    tagline: 'Transparent Service Menus & Instant Inquiries',
    description:
      'Build trust and fill your appointment calendar. Transparent service listings, client testimonial galleries, and direct tap-to-call consultation bridges.',
    features: [
      'Clear service listings with pricing and duration details',
      'Easy client appointment and estimate request forms',
      'Direct call and WhatsApp consultation funnels',
      'Client reviews showcase and service area mapping',
    ],
    targetType: 'Professional & Local Services (Salons, Repair, Cleaning, Consulting)',
    badge: 'Service Menu & Inquiries',
  },
];

export default function GsapScrollShowcase() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!section || cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Create master scrub timeline pinned to the viewport
      const totalCards = cards.length;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalCards * 1100}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentIdx = Math.min(
              totalCards - 1,
              Math.floor(progress * totalCards)
            );
            setActiveStep(currentIdx);
          },
        },
      });

      // Initially set all cards off-screen to the right
      gsap.set(cards, {
        x: '100vw',
        opacity: 0,
        scale: 0.88,
        rotateY: 12,
        visibility: 'hidden',
      });

      // Animate each card: Right -> Middle (stop) -> Left (disappear)
      cards.forEach((card, i) => {
        tl.set(card, { visibility: 'visible' })
          // Phase 1: Come from right to middle
          .to(card, {
            x: '0vw',
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power2.out',
          })
          // Phase 2: Rest in middle so user reads comfortably
          .to(card, {
            x: '0vw',
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.8,
          })
          // Phase 3: Slide to left and disappear
          .to(card, {
            x: '-100vw',
            opacity: 0,
            scale: 0.88,
            rotateY: -12,
            duration: 1,
            ease: 'power2.in',
          })
          .set(card, { visibility: 'hidden' });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.scrollShowcaseSection} id="industry-showcase">
      {/* Background Ambience */}
      <div className={styles.ambientBackdrop} />

      <div className={`container ${styles.showcaseContainer}`}>
        
        {/* Pinned Section Header */}
        <div className={styles.headerBlock}>
          <div className={styles.sectionBadge}>
            <Layers size={13} className={styles.badgeIcon} />
            <span>Interactive Scroll Showcase</span>
          </div>
          <h2 className={styles.mainTitle}>
            Engineered Specifically for <span className={styles.accentText}>Your Trade</span>
          </h2>
          <p className={styles.subTitle}>
            Scroll down to watch our custom website architecture adapt for every local business industry.
          </p>

          {/* Stepper Progress Bar */}
          <div className={styles.stepperRow}>
            {SHOWCASE_CARDS.map((item, idx) => (
              <div
                key={item.id}
                className={`${styles.stepPill} ${
                  activeStep === idx ? styles.stepPillActive : ''
                }`}
              >
                <span className={styles.stepNum}>{item.num}</span>
                <span className={styles.stepLabel}>{item.archetype}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The 3D Sliding Cards Stage (Right -> Middle -> Left) */}
        <div ref={cardsContainerRef} className={styles.cardsStage}>
          {SHOWCASE_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[idx] = el)}
                className={styles.slidingCard}
              >
                <div className={styles.cardInner}>
                  
                  {/* Left Column: Archetype Details */}
                  <div className={styles.cardDetailsCol}>
                    <div className={styles.cardTopBar}>
                      <div className={styles.iconCircle}>
                        <Icon size={24} className={styles.iconAmber} />
                      </div>
                      <span className={styles.blueprintTag}>{card.badge}</span>
                    </div>

                    <span className={styles.archetypeLabel}>
                      {card.num}. {card.archetype}
                    </span>
                    <h3 className={styles.cardHeadline}>{card.tagline}</h3>

                    {/* Subcategories Pill */}
                    <div className={styles.subcategoriesPill}>
                      <span>{card.subcategories}</span>
                    </div>

                    <p className={styles.cardDescription}>{card.description}</p>

                    <Link
                      to={`/contact?type=${encodeURIComponent(card.targetType)}`}
                      className={styles.cardCtaBtn}
                    >
                      <span>Get a Website for {card.archetype}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* Right Column: Key Feature Checklist */}
                  <div className={styles.cardFeaturesCol}>
                    <div className={styles.featuresHeadingRow}>
                      <Sparkles size={16} className={styles.sparkleIcon} />
                      <span className={styles.featuresHeading}>Core Capabilities</span>
                    </div>

                    <div className={styles.featuresList}>
                      {card.features.map((feat, fIdx) => (
                        <div key={fIdx} className={styles.featureItem}>
                          <CheckCircle2 size={17} className={styles.checkIcon} />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.verifiedTechBadge}>
                      <span className={styles.techPulseDot} />
                      <span>Clean Code Architecture • Zero Bloat</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Prompt Guidance */}
        <div className={styles.scrollGuide}>
          <div className={styles.mouseWheelIcon}>
            <div className={styles.mouseWheelDot} />
          </div>
          <span>Scroll to advance industry cards</span>
        </div>

      </div>
    </section>
  );
}

