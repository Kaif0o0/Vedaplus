import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import {
  Utensils,
  ShoppingBag,
  Briefcase,
  Store,
  Sparkles,
  Coffee,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Globe2,
  Clock,
  ShieldCheck,
  Smartphone,
  Layers,
  Award,
  Users,
  ExternalLink,
  Check
} from 'lucide-react';
import FloatingVisual from '../components/FloatingVisual';
import ServiceCard from '../components/ServiceCard';
import styles from './Home.module.css';

// Website Development Services Data (3 Core Pillars with Subcategories)
const SERVICES_DATA = [
  {
    id: 'hospitality',
    targetType: 'Food & Hospitality (Cafes, Restaurants, Hotels, Bakeries)',
    icon: Utensils,
    archetype: '01. Food & Hospitality',
    title: 'Food & Hospitality',
    subcategories: ['Cafes', 'Restaurants', 'Hotels', 'Bakeries'],
    tagline: 'Turn casual foot traffic and online visitors into loyal regulars.',
    description: 'Custom websites designed for dining and stay experiences featuring interactive mobile menus, direct table & room booking inquiries, and instant Google Maps geo-routing.',
    badge: 'Digital Menu & Booking',
    features: [
      'Interactive visual digital menu (Fast, zero PDF bloat)',
      '1-Click WhatsApp & phone table reservation bridge',
      'Curbside pickup, takeaway, and room inquiry workflows',
      'Optimized Google Maps local SEO geo-tagging'
    ]
  },
  {
    id: 'retail',
    targetType: 'Retail & E-commerce (Clothing, Cosmetics, Grocery, Jewellery)',
    icon: ShoppingBag,
    archetype: '02. Retail & E-commerce',
    title: 'Retail & E-commerce',
    subcategories: ['Clothing', 'Cosmetics', 'Grocery', 'Jewellery'],
    tagline: 'Modern digital storefronts built to showcase your products and drive local sales.',
    description: 'Fast, lightweight online catalogs and storefronts with organized product collections, local stock inquiry buttons, and seamless customer ordering channels.',
    badge: 'Catalog & Storefront',
    features: [
      'Interactive product lookbooks & collection showcases',
      'Curbside reserve and in-store pickup inquiry flow',
      'Fast mobile browsing with instant image previews',
      'Integrated Google Merchant & local search discovery'
    ]
  },
  {
    id: 'services',
    targetType: 'Professional & Local Services (Salons, Repair, Cleaning, Consulting)',
    icon: Briefcase,
    archetype: '03. Professional & Local Services',
    title: 'Professional & Local Services',
    subcategories: ['Salons', 'Repair', 'Cleaning', 'Consulting'],
    tagline: 'Clean, professional websites that build credibility and capture bookings.',
    description: 'Transparent service catalogs, direct appointment booking forms, verified client testimonials, and instant contact funnels tailored for local service providers.',
    badge: 'Service Menu & Inquiries',
    features: [
      'Clear service listings with pricing and duration details',
      'Easy client appointment and estimate request forms',
      'Direct call and WhatsApp consultation funnels',
      'Client reviews showcase and service area mapping'
    ]
  }
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const location = useLocation();

  useEffect(() => {
    let targetId = null;
    if (location.pathname === '/about') {
      targetId = 'about-us';
    } else if (location.pathname === '/services') {
      targetId = 'services';
    } else if (location.hash) {
      targetId = location.hash.replace('#', '');
    }

    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);

  const filteredServices = selectedFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(service => service.id === selectedFilter);

  return (
    <div className={styles.homeWrapper}>
      {/* ================= 1. HOME / HERO SECTION ================= */}
      <section id="home" className={styles.heroSection}>
        <div className={`container ${styles.heroContainer}`}>
          {/* Left Column: Bold Copy & Call-To-Action */}
          <div className={styles.heroCopy}>
            <div className={styles.pillBadge}>
              <span className={styles.pillPulse} />
              <span className={styles.pillText}>VedaPlus • Custom Website Development</span>
            </div>

            <h1 className={styles.heroHeadline}>
              Fast, Modern Websites Built for <span className={styles.accentText}>Local Businesses.</span>
            </h1>

            <p className={styles.heroSubheadline}>
              VedaPlus builds high-speed, modern websites across Food &amp; Hospitality (cafes, restaurants, hotels, bakeries), Retail &amp; E-commerce (clothing, cosmetics, grocery, jewellery), and Professional Local Services (salons, repair, cleaning, consulting). Zero bloat, instant customer inquiries, and clean responsive design.
            </p>

            {/* CTAs */}
            <div className={styles.heroActions}>
              <Link to="/contact" className={styles.primaryCta} id="hero-get-website-cta">
                <span>Get a Website →</span>
              </Link>

              <a href="#services" className={styles.secondaryCta} id="hero-services-btn">
                <span>Explore Services</span>
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* Clean Capability Highlights */}
            <div className={styles.heroStatsBar}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>Fast</span>
                <span className={styles.statLabel}>Mobile-First Loading</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Responsive &amp; SEO Ready</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>Direct</span>
                <span className={styles.statLabel}>WhatsApp &amp; Call Inquiries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Anti-Gravity Visual Element */}
          <div className={styles.heroVisualCol}>
            <FloatingVisual />
          </div>
        </div>
      </section>

      {/* ================= 2. SERVICES SECTION ================= */}
      <section id="services" className={styles.solutionsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>
              <Layers size={14} />
              <span>Services</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Website Development Services for Small Businesses
            </h2>
            <p className={styles.sectionDesc}>
              No slow templates or generic site builders. Every VedaPlus website is custom-crafted around the exact booking, menu, catalog, or retail workflows of your local trade.
            </p>

            {/* Service Category Filter Tabs matching exact user specifications */}
            <div className={styles.filterPills}>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'all' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All Categories
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'hospitality' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('hospitality')}
              >
                01. Food &amp; Hospitality
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'retail' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('retail')}
              >
                02. Retail &amp; E-commerce
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'services' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('services')}
              >
                03. Professional &amp; Local Services
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className={styles.cardsGrid}>
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>

          <div className={styles.servicesFooterCta}>
            <span>Need a custom solution tailored to your exact store layout?</span>
            <Link to="/contact" className={styles.inlineCtaLink}>
              <span>Get a Website →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 3. ABOUT US SECTION ================= */}
      <section id="about-us" className={styles.aboutSection}>
        <div className="container">
          <div className={styles.aboutGrid}>
            {/* Left Story Column */}
            <div className={styles.aboutStoryCol}>
              <div className={styles.sectionTag}>
                <Users size={14} />
                <span>About Us</span>
              </div>
              <h2 className={styles.aboutHeading}>
                We Build Fast, Modern Websites for Local Businesses.
              </h2>
              <p className={styles.aboutLeadText}>
                VedaPlus was founded on a simple truth: small business owners shouldn't have to tolerate clunky, bloated websites that crash and take 8 seconds to load on mobile phones.
              </p>
              <p className={styles.aboutBodyText}>
                We combine modern web design with down-to-earth business sense. Whether you operate in Food &amp; Hospitality, Retail &amp; E-commerce, or Professional &amp; Local Services, we build fast, clean websites that turn local passersby into lifelong customers.
              </p>

              <div className={styles.aboutCheckGrid}>
                <div className={styles.aboutCheckItem}>
                  <CheckCircle2 size={18} className={styles.amberCheck} />
                  <span>Fast cellular mobile loading speed on all devices</span>
                </div>
                <div className={styles.aboutCheckItem}>
                  <CheckCircle2 size={18} className={styles.amberCheck} />
                  <span>Integrated WhatsApp &amp; 1-tap direct call funnels</span>
                </div>
                <div className={styles.aboutCheckItem}>
                  <CheckCircle2 size={18} className={styles.amberCheck} />
                  <span>Optimized Google Maps local SEO discovery</span>
                </div>
                <div className={styles.aboutCheckItem}>
                  <CheckCircle2 size={18} className={styles.amberCheck} />
                  <span>Dedicated 14-day rapid delivery sprint</span>
                </div>
              </div>

              <div className={styles.aboutCtaBox}>
                <Link to="/contact" className={styles.primaryCta}>
                  <span>Get a Website →</span>
                </Link>
                <Link to="/reviews" className={styles.secondaryCta}>
                  <span>Read Client Reviews ★</span>
                </Link>
              </div>
            </div>

            {/* Right Approach Column: The Modern Website Advantage */}
            <div className={styles.aboutApproachCol}>
              <div className={styles.approachCard}>
                <div className={styles.approachBadge}>The VedaPlus Approach</div>
                <h3 className={styles.approachTitle}>Why Custom Website Development?</h3>
                <p className={styles.approachDesc}>
                  Traditional website builders bundle 40 heavy plugins, slow database queries, and uncompressed assets that weigh down your site. We handcraft clean, blazing-fast websites that load instantly on every device.
                </p>

                <div className={styles.approachPillars}>
                  <div className={styles.pillarMini}>
                    <div className={styles.pillarMiniIcon}>
                      <Zap size={20} />
                    </div>
                    <div>
                      <h4 className={styles.pillarMiniTitle}>Zero Resistance</h4>
                      <p className={styles.pillarMiniText}>
                        Edge-rendered static assets deployed across global cloud nodes for instant first paint.
                      </p>
                    </div>
                  </div>

                  <div className={styles.pillarMini}>
                    <div className={styles.pillarMiniIcon}>
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h4 className={styles.pillarMiniTitle}>Mobile First Touch</h4>
                      <p className={styles.pillarMiniText}>
                        Designed specifically for thumb ergonomics: 1-tap WhatsApp chat, instant call button, and streamlined ordering.
                      </p>
                    </div>
                  </div>

                  <div className={styles.pillarMini}>
                    <div className={styles.pillarMiniIcon}>
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className={styles.pillarMiniTitle}>Zero Maintenance Panic</h4>
                      <p className={styles.pillarMiniText}>
                        No bloated WordPress plugins, no server crash alerts. High reliability on modern cloud hosting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. CONTACT / CALL TO ACTION BANNER ================= */}
      <section id="contact" className={styles.ctaBannerSection}>
        <div className="container">
          <Tilt
            tiltMaxAngleX={4}
            tiltMaxAngleY={4}
            scale={1.01}
            transitionSpeed={800}
            className={styles.ctaTilt}
          >
            <div className={styles.ctaBanner}>
              <div className={styles.ctaContent}>
                <div className={styles.ctaPill}>
                  <Award size={14} />
                  <span>VedaPlus • Accepting New Website Development Projects</span>
                </div>
                <h2 className={styles.ctaHeadline}>
                  Ready to elevate your local business with a modern website?
                </h2>
                <p className={styles.ctaSub}>
                  Get a comprehensive website consultation and custom blueprint for your business across Food &amp; Hospitality, Retail &amp; E-commerce, or Professional Services within 24 hours.
                </p>

                <div className={styles.ctaBtnRow}>
                  <Link to="/contact" className={styles.ctaBigBtn} id="banner-get-website-cta">
                    <span>Get a Website →</span>
                  </Link>

                  <div className={styles.ctaPhoneDirect}>
                    <span>Direct Studio Hotline:</span>
                    <div className={styles.ctaHotlineLinks}>
                      <a href="tel:+919503956026">+91 9503956026</a>
                      <span className={styles.ctaHotlineSlash}>/</span>
                      <a href="tel:+919226115976">+91 9226115976</a>
                      <span className={styles.ctaHotlineSlash}>/</span>
                      <a href="tel:+919762874676">+91 9762874676</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tilt>
        </div>
      </section>
    </div>
  );
}
