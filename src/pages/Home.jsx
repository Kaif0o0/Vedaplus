import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import {
  Utensils,
  ShoppingBag,
  Briefcase,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Smartphone,
  Layers,
  Award,
  Users,
  GraduationCap,
  Compass,
  Camera
} from 'lucide-react';
import FloatingVisual from '../components/FloatingVisual';
import ServiceCard from '../components/ServiceCard';
import Marquee3D from '../components/Marquee3D';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Home.module.css';

gsap.registerPlugin(ScrollTrigger);

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
  },
  {
    id: 'students',
    targetType: 'Students & Fresh Graduates (Portfolios, Resumes, Capstones, Academics)',
    icon: GraduationCap,
    archetype: '04. Students & Fresh Graduates',
    title: 'Students & Fresh Graduates',
    subcategories: ['Personal Portfolios', 'Interactive Resumes', 'Academic Projects', 'Global Applications'],
    tagline: 'Stand out to top tech recruiters, hiring managers, and global universities.',
    description: 'Ultra-fast personal portfolio websites, interactive digital resumes, project repositories, and GitHub/LinkedIn integrations built to land dream tech, design, and corporate roles.',
    badge: 'Portfolio & CV Showcase',
    features: [
      'Interactive project showcase with live demos & source links',
      'Downloadable ATS-friendly PDF resume & 1-tap contact buttons',
      'Custom personal domain setup (yourname.dev / yourname.com)',
      'Sub-second mobile loading speed for recruiter scans'
    ]
  },
  {
    id: 'interiors',
    targetType: 'Interior Designers & Modular Kitchens (Modular Kitchens, Living Spaces, 3D Walkthroughs, Renovation)',
    icon: Compass,
    archetype: '05. Interior Designers & Modular Kitchens',
    title: 'Interior Designers & Modular Kitchens',
    subcategories: ['Modular Kitchens', 'Residential Interiors', 'Commercial Spaces', '3D Walkthroughs'],
    tagline: 'Showcase luxury transformations, floorplans, and modular spaces with high-definition visual storytelling.',
    description: 'High-converting interior design portfolio websites featuring full-screen lookbooks, modular layout cost estimators, 3D walkthrough video embeds, and direct WhatsApp site visit bookings.',
    badge: '3D Lookbook & Estimator',
    features: [
      'High-definition project lookbooks with before-and-after sliders',
      'Interactive modular kitchen layout & material inquiry funnel',
      '1-Click WhatsApp site visit & design consultation bridge',
      'Client video walkthroughs & verified homeowner reviews'
    ]
  },
  {
    id: 'photography',
    targetType: 'Wedding Photographers & Studios (Weddings, Pre-Wedding Films, Destination, Portraiture)',
    icon: Camera,
    archetype: '06. Wedding Photographers & Studios',
    title: 'Wedding Photographers & Studios',
    subcategories: ['Wedding Films', 'Pre-Wedding Shoots', 'Destination Events', 'Client Proofing'],
    tagline: 'Turn breathtaking wedding celebrations and cinematic love stories into premium, high-ticket bookings.',
    description: 'Immersive photography portfolios with edge-to-edge 4K photo galleries, cinematic video trailer players, private client album proofing, and direct wedding date booking availability checks.',
    badge: '4K Gallery & Date Booking',
    features: [
      'Edge-to-edge 4K photo showcase & video trailer embeds',
      'Interactive wedding package breakdown & inquiry calculator',
      'Private password-protected client album proofing portal',
      'Instant wedding date availability checker & WhatsApp bridge'
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

  // Simple, Smooth & Lightweight GSAP Scroll Animations (100% Mobile Responsive)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal Animation (Stagger up cleanly)
      gsap.from('.gsap-hero-item', {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      });

      // 1b. Hero Blueprint Visual Reveal
      gsap.from('.gsap-hero-visual', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      });

      // 1c. Marquee Strip Scroll Reveal (Bidirectional: plays on scroll down, reverses on scroll up)
      gsap.from('.gsap-marquee-wrap', {
        scrollTrigger: {
          trigger: '.gsap-marquee-wrap',
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
        duration: 0.65,
        ease: 'power2.out',
      });

      // 2. Services Header & Category Filter Tabs Reveal
      gsap.from('.gsap-services-header', {
        scrollTrigger: {
          trigger: '#services',
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: 'power2.out',
      });

      // 2b. Services Section Cards Stagger
      gsap.from('.gsap-service-card', {
        scrollTrigger: {
          trigger: '#services',
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out',
      });

      // 3. About Us Section Vertical Reveals (Bidirectional for down & up scrolling)
      gsap.from('.gsap-about-story', {
        scrollTrigger: {
          trigger: '#about-us',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.from('.gsap-about-card', {
        scrollTrigger: {
          trigger: '#about-us',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        ease: 'power2.out',
      });

      gsap.from('.gsap-pillar', {
        scrollTrigger: {
          trigger: '.gsap-about-card',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.55,
        ease: 'power2.out',
      });

      // 4. CTA Banner Reveal (Bidirectional)
      gsap.from('.gsap-cta-banner', {
        scrollTrigger: {
          trigger: '#contact',
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.97,
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });

      // 5. Scroll-linked Parallax for Hero Visual (Smooth on scroll down and scroll up)
      gsap.to('.gsap-hero-visual', {
        scrollTrigger: {
          trigger: '#home',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
        y: 35,
        ease: 'none',
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  // Smooth micro-fade when category filter changes
  useEffect(() => {
    gsap.fromTo(
      '.gsap-service-card',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
    );
  }, [selectedFilter]);

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
            <div className={`${styles.pillBadge} gsap-hero-item`}>
              <span className={styles.pillPulse} />
              <span className={styles.pillText}>VedaPlus • Custom Website Development</span>
            </div>

            <h1 className={`${styles.heroHeadline} gsap-hero-item`}>
              Fast, Modern Websites Built for <span className={styles.accentText}>Local Businesses.</span>
            </h1>

            <p className={`${styles.heroSubheadline} gsap-hero-item`}>
              VedaPlus builds high-speed, modern websites across Food &amp; Hospitality, Retail &amp; E-commerce, Professional Local Services, Students &amp; Fresh Graduates, Interior Designers, and Wedding Photography Studios. Zero bloat, instant customer inquiries, and clean responsive design.
            </p>

            {/* CTAs */}
            <div className={`${styles.heroActions} gsap-hero-item`}>
              <Link to="/contact" className={styles.primaryCta} id="hero-get-website-cta">
                <span>Get a Website →</span>
              </Link>

              <a href="#services" className={styles.secondaryCta} id="hero-services-btn">
                <span>Explore Services</span>
                <ArrowUpRight size={18} />
              </a>
            </div>

            {/* Clean Capability Highlights */}
            <div className={`${styles.heroStatsBar} gsap-hero-item`}>
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
          <div className={`${styles.heroVisualCol} gsap-hero-visual`}>
            <FloatingVisual />
          </div>
        </div>
      </section>

      {/* ================= 1.5 3D MARQUEE SHOWCASE ================= */}
      <div className="gsap-marquee-wrap" style={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
        <Marquee3D />
      </div>

      {/* ================= 2. SERVICES SECTION ================= */}
      <section id="services" className={styles.solutionsSection}>
        <div className="container">
          <div className={`${styles.sectionHeader} gsap-services-header`}>
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
                All Categories (6)
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
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'students' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('students')}
              >
                04. Students &amp; Fresh Graduates
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'interiors' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('interiors')}
              >
                05. Interior Designers &amp; Modular Kitchens
              </button>
              <button
                className={`${styles.filterBtn} ${selectedFilter === 'photography' ? styles.filterActive : ''}`}
                onClick={() => setSelectedFilter('photography')}
              >
                06. Wedding Photographers &amp; Studios
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className={styles.cardsGrid}>
            {filteredServices.map((service) => (
              <div key={service.id} className="gsap-service-card">
                <ServiceCard {...service} />
              </div>
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
            <div className={`${styles.aboutStoryCol} gsap-about-story`}>
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
                We combine modern web design with down-to-earth business sense. Whether you operate in Food &amp; Hospitality, Retail &amp; E-commerce, Professional Services, Interior Design, Wedding Photography, or are a Student launching a standout portfolio, we build fast, clean websites that turn visitors into opportunities.
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
            <div className={`${styles.aboutApproachCol} gsap-about-card`}>
              <div className={styles.approachCard}>
                <div className={styles.approachHeaderRow}>
                  <div>
                    <div className={styles.approachBadge}>The VedaPlus Approach</div>
                    <h3 className={styles.approachTitle}>Why Custom Website Development?</h3>
                  </div>
                  <div className={styles.approachScoreBox}>
                    <div className={styles.approachRadialMeter}>
                      <span className={styles.meterNumber}>99+</span>
                      <span className={styles.meterLabel}>Speed Score</span>
                    </div>
                    <div className={styles.approachMetricBadge}>
                      <Zap size={13} className={styles.metricAmberIcon} />
                      <span>0.4s Fast Paint</span>
                    </div>
                  </div>
                </div>
                <p className={styles.approachDesc}>
                  Traditional website builders bundle 40 heavy plugins, slow database queries, and uncompressed assets that weigh down your site. We handcraft clean, blazing-fast websites that load instantly on every device.
                </p>

                <div className={styles.approachPillars}>
                  <div className={`${styles.pillarMini} gsap-pillar`}>
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

                  <div className={`${styles.pillarMini} gsap-pillar`}>
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

                  <div className={`${styles.pillarMini} gsap-pillar`}>
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
            <div className={`${styles.ctaBanner} gsap-cta-banner`}>
              <div className={styles.ctaContent}>
                <div className={styles.ctaEmblemBox}>
                  <div className={styles.ctaEmblemInner}>
                    <Sparkles size={36} className={styles.ctaEmblemIcon} />
                    <span className={styles.ctaEmblemPulse} />
                  </div>
                  <span className={styles.ctaEmblemTag}>FAST DISPATCH</span>
                </div>

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
