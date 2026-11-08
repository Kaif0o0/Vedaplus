import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Utensils,
  ShoppingBag,
  Briefcase,
  GraduationCap,
  Compass,
  Camera,
  Layers,
  ArrowRight
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import styles from './Services.module.css';

gsap.registerPlugin(ScrollTrigger);

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
    targetType: 'Interior Designers & Modular Kitchens (Living Spaces, Kitchens, 3D Walkthroughs)',
    icon: Compass,
    archetype: '05. Interior Designers & Modular Kitchens',
    title: 'Interior Designers & Modular Kitchens',
    subcategories: ['Luxury Living Spaces', 'Modular Kitchens', 'Architectural Makeovers', 'Turnkey Fitouts'],
    tagline: 'Present your design projects with rich visual portfolios and 3D floorplan previews.',
    description: 'High-end visual showcase websites with before/after project sliders, categorized residential & commercial galleries, material cost calculators, and direct consultation booking.',
    badge: 'Lookbook & Floorplan Showcase',
    features: [
      'Ultra-high definition before/after slider transformations',
      'Categorized modular kitchen finish & material sample catalog',
      'Interactive project cost estimator & floor plan request form',
      'Client project walkthrough video embeds & WhatsApp inquiries'
    ]
  },
  {
    id: 'photography',
    targetType: 'Wedding Photographers & Studios (Cinematography, Lookbooks, Client Proofing)',
    icon: Camera,
    archetype: '06. Wedding Photographers & Studios',
    title: 'Wedding Photographers & Studios',
    subcategories: ['Destination Weddings', 'Pre-Wedding Films', 'Studio Portraits', 'Event Lookbooks'],
    tagline: 'Tell unforgettable love stories through cinematic galleries and booking funnels.',
    description: 'Immersive media-rich websites featuring 4K video reel embeds, client password-protected proofing galleries, package inquiry calculators, and instant date availability schedulers.',
    badge: 'Cinematic Gallery & Proofing',
    features: [
      'Edge-to-edge 4K photo showcase & video trailer embeds',
      'Interactive wedding package breakdown & inquiry calculator',
      'Private password-protected client album proofing portal',
      'Instant wedding date availability checker & WhatsApp bridge'
    ]
  }
];

export default function Services() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedFilter, setSelectedFilter] = useState(initialCategory);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Header Reveal (Stagger)
      gsap.from(`.${styles.pageHeader} > *`, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      });

      // 2. Filter Pills Reveal
      gsap.from(`.${styles.filterPills}`, {
        y: 15,
        opacity: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
      });

      // 3. Service Cards Reveal (Bidirectional on scroll down and up)
      gsap.from('.gsap-service-card-item', {
        scrollTrigger: {
          trigger: `.${styles.servicesGrid}`,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: 'power2.out',
      });

      // 4. Value Banner Reveal (Bidirectional)
      gsap.from(`.${styles.valueBanner}`, {
        scrollTrigger: {
          trigger: `.${styles.valueBanner}`,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.97,
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Micro-fade when filter pill changes
  useEffect(() => {
    gsap.fromTo(
      '.gsap-service-card-item',
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
    );
  }, [selectedFilter]);

  const filteredServices = selectedFilter === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === selectedFilter);

  return (
    <div className={styles.servicesPageWrapper} ref={containerRef}>
      <div className={styles.container}>
        {/* Page Header */}
        <header className={styles.pageHeader}>
          <div className={styles.pillBadge}>
            <Layers size={14} />
            <span>Web Solutions by Trade</span>
          </div>

          <h1 className={styles.title}>
            Website Development <span className={styles.amberText}>Services</span>
          </h1>

          <p className={styles.description}>
            Tailored digital platforms crafted for small businesses, professionals, and students. Select a category below to explore specific features, workflows, and deliverables.
          </p>

          {/* Filter Pills */}
          <div className={styles.filterPills} role="tablist" aria-label="Service Categories">
            <button
              type="button"
              className={`${styles.filterBtn} ${selectedFilter === 'all' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All Categories (6)
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${selectedFilter === 'hospitality' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('hospitality')}
            >
              01. Food &amp; Hospitality
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${selectedFilter === 'retail' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('retail')}
            >
              02. Retail &amp; E-commerce
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${selectedFilter === 'services' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('services')}
            >
              03. Professional &amp; Local Services
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${selectedFilter === 'students' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('students')}
            >
              04. Students &amp; Fresh Graduates
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${selectedFilter === 'interiors' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('interiors')}
            >
              05. Interior Designers &amp; Modular Kitchens
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${selectedFilter === 'photography' ? styles.filterActive : ''}`}
              onClick={() => setSelectedFilter('photography')}
            >
              06. Wedding Photographers &amp; Studios
            </button>
          </div>
        </header>

        {/* Services Grid (Zero empty gaps) */}
        <main
          className={`${styles.servicesGrid} ${
            filteredServices.length === 1 ? styles.singleServiceCentered : ''
          }`}
        >
          {filteredServices.map((service) => (
            <div key={service.id} className="gsap-service-card-item">
              <ServiceCard {...service} />
            </div>
          ))}
        </main>

        {/* Bottom Value Banner & Proposal CTA */}
        <section className={styles.valueBanner}>
          <div className={styles.valueContent}>
            <h2 className={styles.valueTitle}>
              Need custom integrations or an unlisted service?
            </h2>
            <p className={styles.valueSubtitle}>
              From custom database portals to localized booking engines, we build clean, lightning-fast web solutions with guaranteed 24-hour consultation response.
            </p>
          </div>

          <Link to="/contact" className={styles.ctaBtn}>
            <span>Request Custom Specification</span>
            <ArrowRight size={18} />
          </Link>
        </section>
      </div>
    </div>
  );
}
