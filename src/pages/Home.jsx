import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import {
  Coffee,
  Stethoscope,
  Store,
  ShieldPlus,
  Pill,
  Sparkles,
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
  Laptop,
  Check
} from 'lucide-react';
import FloatingVisual from '../components/FloatingVisual';
import ServiceCard from '../components/ServiceCard';
import styles from './Home.module.css';

// Website Development Services Data
const SERVICES_DATA = [
  {
    id: 'cafe',
    targetType: 'Cafe / Restaurant & Dining',
    icon: Coffee,
    archetype: 'Dining & Hospitality',
    title: 'Cafes, Bakeries & Bistros',
    tagline: 'Turn casual foot traffic into loyal regulars.',
    description: 'Blazing-fast mobile menus, table reservation engines, and zero-wait QR ordering designed to delight customers during morning rushes.',
    badge: '0.2s Menu Load',
    features: [
      'Interactive visual digital menu (Zero PDF bloat)',
      '1-Click WhatsApp & Instagram reservation bridge',
      'Instant curbside pickup & takeaway dispatch',
      'Optimized Google Maps local SEO geo-tags'
    ]
  },
  {
    id: 'dental',
    targetType: 'Doctor / Dental & Healthcare Clinic',
    icon: Stethoscope,
    archetype: 'Healthcare & Specialists',
    title: 'Dental & Doctor Clinics',
    tagline: 'Instill trust before patients even step through the door.',
    description: 'HIPAA-grade appointment scheduling, digital medical intake, practitioner credential showcases, and automated calendar synchronization.',
    badge: 'HIPAA Protected',
    features: [
      'Seamless slot selection & calendar sync',
      'Paperless mobile pre-registration forms',
      'Emergency 1-tap call & guidance banner',
      'Verified patient reviews & doctor certification badges'
    ]
  },
  {
    id: 'pharmacy',
    targetType: 'Pharmacy & Medical Store',
    icon: Pill,
    archetype: 'Pharmaceutical & Care',
    title: 'Pharmacies & Medical Stores',
    tagline: 'Streamline prescription fulfillments with zero friction.',
    description: 'Mobile-first prescription photo uploads, medicine refill alerts, OTC product directories, and rapid neighborhood delivery triggers.',
    badge: 'Instant Rx Engine',
    features: [
      'Encrypted prescription photo & PDF intake',
      'Automated refill reminder push notifications',
      'Fast OTC medicine & equipment inventory search',
      'Direct pharmacist chat & WhatsApp ordering'
    ]
  },
  {
    id: 'hospital',
    targetType: 'Hospital & Multi-Specialty Facility',
    icon: ShieldPlus,
    archetype: 'Institutional Medicine',
    title: 'Hospitals & Care Centers',
    tagline: 'Critical infrastructure engineered for absolute uptime.',
    description: 'Multi-department doctor directory with availability filters, 24/7 trauma alert banners, diagnostic lab report portals, and multi-location guides.',
    badge: 'High Availability',
    features: [
      '24/7 Red-alert emergency & ambulance hotline',
      'Searchable doctor directory by specialty & ward',
      'Patient lab report download drawer',
      'Campus interactive parking & navigation map'
    ]
  },
  {
    id: 'retail',
    targetType: 'Small Shop / Retail & Boutique',
    icon: Store,
    archetype: 'Local Retail & Merchants',
    title: 'Shops & Specialty Boutiques',
    tagline: 'Compete with e-commerce giants right on your street.',
    description: 'Weightless digital storefronts featuring live local inventory, 2-tap Apple/Google Pay, curbside reservation, and hyper-local shopping incentives.',
    badge: 'Zero Cart Friction',
    features: [
      'Instant-loading seasonal lookbook & collections',
      'In-store reserve & curbside pickup checkout',
      'Local inventory stock status live indicator',
      'Integrated Google Merchant & local map sync'
    ]
  },
  {
    id: 'wellness',
    targetType: 'Other Commercial Business',
    icon: Sparkles,
    archetype: 'Wellness & Salons',
    title: 'Wellness & Specialty Studios',
    tagline: 'Eliminate booking phone tags with automated schedules.',
    description: 'Self-serve booking matrices for salons, spas, physiotherapy, and artisan studios with client preference tracking and SMS reminders.',
    badge: 'Smart Calendar',
    features: [
      'Staff member & treatment duration selection',
      'Automated SMS & calendar appointment reminder',
      'Gift card & recurring package checkout',
      'Gallery showcase with before-after sliders'
    ]
  }
];

// Sample Websites and Projects Data for "Our Work"
const PROJECTS_DATA = [
  {
    id: 'roast-bloom',
    title: 'Roast & Bloom Bistro',
    category: 'Artisan Cafe & Bakery',
    speed: '0.28s First Paint',
    description: 'A custom cafe website featuring an interactive zero-wait mobile menu, live weekend table booking, and direct Google Maps geo-routing.',
    tech: ['React', 'Instant QR Menu', 'WhatsApp Bridge', 'Geo-Schema'],
    targetType: 'Cafe / Restaurant & Dining',
  },
  {
    id: 'aura-dental',
    title: 'Aura Dental Specialists',
    category: 'Dental & Health Clinic',
    speed: 'HIPAA Grade',
    description: 'Custom clinic website with paperless patient appointment booking, practitioner showcases, and 1-tap emergency call button.',
    tech: ['HIPAA Secure', '1-Click Intake', 'Doctor Calendar Sync', 'SSL Mesh'],
    targetType: 'Doctor / Dental & Healthcare Clinic',
  },
  {
    id: 'apex-rx',
    title: 'Apex Hospital & Pharmacy',
    category: 'Hospital & Medical Store',
    speed: '99.99% Monitored',
    description: 'Modern hospital & pharmacy website featuring 24/7 emergency hotline banner, multi-department doctor directory, and prescription photo upload.',
    tech: ['Trauma Alert Bar', 'Rx Photo Upload', 'Multi-Ward Search'],
    targetType: 'Hospital & Multi-Specialty Facility',
  },
  {
    id: 'kite-timber',
    title: 'Kite & Timber Merchants',
    category: 'Boutique Retail & Goods',
    speed: 'Apple & G-Pay',
    description: 'Sleek local merchant retail website with live storefront stock indicators, curbside reservation, and friction-free mobile experience.',
    tech: ['Realtime Stock Sync', 'Curbside Reserve', 'Google Merchant Tag'],
    targetType: 'Small Shop / Retail & Boutique',
  }
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredServices = selectedFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(service => {
        if (selectedFilter === 'health') return ['dental', 'pharmacy', 'hospital'].includes(service.id);
        if (selectedFilter === 'dining') return ['cafe'].includes(service.id);
        if (selectedFilter === 'retail') return ['retail', 'wellness'].includes(service.id);
        return true;
      });

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
              Fast, Modern Websites Built for <span className={styles.accentText}>Growing Local Businesses.</span>
            </h1>

            <p className={styles.heroSubheadline}>
              VedaPlus builds high-speed, modern websites tailored for cafes, dental clinics, medical stores, hospitals, and neighborhood retail shops. Zero bloat, instant customer inquiries, and mobile-friendly design.
            </p>

            {/* CTAs */}
            <div className={styles.heroActions}>
              <Link to="/contact" className={styles.primaryCta} id="hero-get-website-cta">
                <span>Get a Website →</span>
              </Link>

              <a href="#our-work" className={styles.secondaryCta} id="hero-our-work-btn">
                <span>Explore Our Work</span>
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* Live Reliability Metrics */}
            <div className={styles.heroStatsBar}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>&lt; 0.3s</span>
                <span className={styles.statLabel}>Mobile First Paint</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>+64%</span>
                <span className={styles.statLabel}>Avg In-Store Conversion</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Local SEO Schema</span>
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
              No slow templates or generic site builders. Every VedaPlus website is custom-crafted around the exact booking, menu, prescription, or retail workflows of your local trade.
            </p>

            {/* Service Category Filter Tabs */}
            <div className={styles.filterPills}>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'all' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All Services
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'dining' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('dining')}
              >
                Cafes &amp; Bistros
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'health' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('health')}
              >
                Clinics, Hospitals &amp; Rx
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'retail' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('retail')}
              >
                Retail Shops &amp; Boutiques
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

      {/* ================= 3. OUR WORK SECTION ================= */}
      <section id="our-work" className={styles.workSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>
              <Laptop size={14} />
              <span>Our Work</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Sample Websites &amp; Featured Projects
            </h2>
            <p className={styles.sectionDesc}>
              Inspect live previews of custom websites we have built for local merchants, specialty doctors, cafes, and healthcare stores.
            </p>
          </div>

          <div className={styles.projectsGrid}>
            {PROJECTS_DATA.map((project) => (
              <Tilt
                key={project.id}
                perspective={1200}
                glareEnable={true}
                glareMaxOpacity={0.12}
                glareColor="#F59E0B"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                scale={1.01}
                transitionSpeed={600}
                className={styles.projectTiltCard}
              >
                <div className={styles.projectCard}>
                  {/* Top Bar resembling high-tech browser chrome */}
                  <div className={styles.projectTopBar}>
                    <div className={styles.projectDotRow}>
                      <span className={styles.dotRed} />
                      <span className={styles.dotYellow} />
                      <span className={styles.dotGreen} />
                    </div>
                    <span className={styles.projectUrlPill}>
                      {project.id}.vedaplus.in
                    </span>
                    <span className={styles.projectSpeedTag}>{project.speed}</span>
                  </div>

                  <div className={styles.projectBody}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDesc}>{project.description}</p>

                    <div className={styles.projectTechTags}>
                      {project.tech.map((t, idx) => (
                        <span key={idx} className={styles.techTag}>
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className={styles.projectFooter}>
                      <Link
                        to={`/contact?type=${encodeURIComponent(project.targetType)}`}
                        className={styles.projectDeployBtn}
                      >
                        <span>Build Similar →</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. ABOUT US SECTION ================= */}
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
                We combine modern web design with down-to-earth business sense. Whether you manage a bustling 40-seat neighborhood cafe, an urgent care dental clinic, or a legacy retail shop, we build websites that turn local passersby into lifelong customers.
              </p>

              <div className={styles.aboutCheckGrid}>
                <div className={styles.aboutCheckItem}>
                  <CheckCircle2 size={18} className={styles.amberCheck} />
                  <span>Sub-300ms cellular mobile loading speed</span>
                </div>
                <div className={styles.aboutCheckItem}>
                  <CheckCircle2 size={18} className={styles.amberCheck} />
                  <span>Integrated WhatsApp &amp; 1-tap call funnels</span>
                </div>
                <div className={styles.aboutCheckItem}>
                  <CheckCircle2 size={18} className={styles.amberCheck} />
                  <span>Top 3 Google Maps Local Pack schema</span>
                </div>
                <div className={styles.aboutCheckItem}>
                  <CheckCircle2 size={18} className={styles.amberCheck} />
                  <span>14-day guaranteed rapid delivery cycle</span>
                </div>
              </div>

              <div className={styles.aboutCtaBox}>
                <Link to="/contact" className={styles.primaryCta}>
                  <span>Get a Website →</span>
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
                        Designed specifically for thumb ergonomics: 1-click patient intake, tap-to-call, and fast pay.
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
                        No WordPress plugin breakdowns, no server vulnerability alerts. 99.98% monitored uptime.
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
                  Get a comprehensive website speed audit and custom website blueprint for your cafe, clinic, medical store, or shop within 24 hours.
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
