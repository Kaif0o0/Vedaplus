import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, MapPin } from 'lucide-react';
import Navbar3DBeacon from './Navbar3DBeacon';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isManualClickRef = useRef(false);
  const clickTimerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear any pending click scroll lock on unmount
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  // Sync active section based on URL hash or path changes
  useEffect(() => {
    if (location.pathname === '/about') {
      setActiveSection('about-us');
    } else if (location.pathname === '/services') {
      setActiveSection('services');
    } else if (location.pathname === '/') {
      if (location.hash) {
        const hashId = location.hash.replace('#', '');
        if (['services', 'about-us', 'home'].includes(hashId)) {
          setActiveSection(hashId);
        }
      } else if (window.scrollY < 120) {
        setActiveSection('home');
      }
    }
  }, [location.pathname, location.hash]);

  // Scroll spy for home page sections
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'services', 'about-us']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const handleScrollSpy = () => {
      if (isManualClickRef.current) return;

      if (window.scrollY < 120) {
        setActiveSection('home');
        return;
      }

      // Check sections from bottom to top to identify which is active
      const scrollPosition = window.scrollY + 220;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPosition) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [location.pathname]);

  // Close mobile drawer upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const closeDrawer = () => setMobileMenuOpen(false);

  const handleSectionClick = (e, sectionId) => {
    setActiveSection(sectionId);
    closeDrawer();

    if (location.pathname === '/') {
      if (e) e.preventDefault();
      isManualClickRef.current = true;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => {
        isManualClickRef.current = false;
      }, 1000);

      window.history.pushState(null, '', sectionId === 'home' ? '/' : `/#${sectionId}`);
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Top Utility Contact Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.topBarLocation}>
            <MapPin size={13} className={styles.topBarIcon} />
            <span>Opp. Rajgurunagar Sahakari Bank, Rajgurunagar, Khed, Pune, Maharashtra – 410505</span>
          </div>
          <div className={styles.topBarRight}>
            <a href="mailto:vedaplus76@gmail.com" className={styles.topBarLink}>
              <Mail size={13} className={styles.topBarIcon} />
              <span>vedaplus76@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.navContainer}`}>
        {/* Brand Name Text: VedaPlus with 3D Tech Beacon */}
        <Link
          to="/"
          className={styles.brandLink}
          aria-label="VedaPlus Home"
          onClick={(e) => handleSectionClick(e, 'home')}
        >
          <Navbar3DBeacon size={32} />
          <span className={styles.brandNameText}>VedaPlus</span>
        </Link>

        {/* Desktop Navigation Links matching exact requested terms:
            Home | Services | About Us | Contact */}
        <nav className={styles.navMenu} aria-label="Main Navigation">
          <Link
            to="/"
            onClick={(e) => handleSectionClick(e, 'home')}
            className={`${styles.navLink} ${
              location.pathname === '/' && activeSection === 'home'
                ? styles.activeNavLink
                : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/#services"
            onClick={(e) => handleSectionClick(e, 'services')}
            className={`${styles.navLink} ${
              location.pathname === '/services' || (location.pathname === '/' && activeSection === 'services')
                ? styles.activeNavLink
                : ''
            }`}
          >
            Services
          </Link>
          <Link
            to="/#about-us"
            onClick={(e) => handleSectionClick(e, 'about-us')}
            className={`${styles.navLink} ${
              location.pathname === '/about' || (location.pathname === '/' && activeSection === 'about-us')
                ? styles.activeNavLink
                : ''
            }`}
          >
            About Us
          </Link>
          <Link
            to="/reviews"
            onClick={closeDrawer}
            className={`${styles.navLink} ${
              location.pathname === '/reviews' ? styles.activeNavLink : ''
            }`}
          >
            Reviews
          </Link>
          <Link
            to="/contact"
            onClick={closeDrawer}
            className={`${styles.navLink} ${
              location.pathname === '/contact' ? styles.activeNavLink : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Button & Status Pill */}
        <div className={styles.actions}>
          <div className={styles.systemStatusPill} title="Fast Website Development">
            <span className={styles.statusDot} />
            <span className={styles.statusLabel}>Fast Websites</span>
          </div>

          <Link to="/contact" className={styles.ctaButton} id="nav-get-website-cta">
            <span>Get a Website →</span>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            className={styles.hamburgerBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`${styles.mobileDrawer} ${
          mobileMenuOpen ? styles.mobileDrawerOpen : ''
        }`}
      >
        <div className={styles.mobileDrawerContent}>
          <Link
            to="/"
            onClick={(e) => handleSectionClick(e, 'home')}
            className={`${styles.mobileNavLink} ${
              location.pathname === '/' && activeSection === 'home'
                ? styles.mobileActive
                : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/#services"
            onClick={(e) => handleSectionClick(e, 'services')}
            className={`${styles.mobileNavLink} ${
              location.pathname === '/services' || (location.pathname === '/' && activeSection === 'services')
                ? styles.mobileActive
                : ''
            }`}
          >
            Services
          </Link>
          <Link
            to="/#about-us"
            onClick={(e) => handleSectionClick(e, 'about-us')}
            className={`${styles.mobileNavLink} ${
              location.pathname === '/about' || (location.pathname === '/' && activeSection === 'about-us')
                ? styles.mobileActive
                : ''
            }`}
          >
            About Us
          </Link>
          <Link
            to="/reviews"
            onClick={closeDrawer}
            className={`${styles.mobileNavLink} ${
              location.pathname === '/reviews' ? styles.mobileActive : ''
            }`}
          >
            Reviews
          </Link>
          <Link
            to="/contact"
            onClick={closeDrawer}
            className={`${styles.mobileNavLink} ${
              location.pathname === '/contact' ? styles.mobileActive : ''
            }`}
          >
            Contact
          </Link>

          {/* Direct Mobile Contact Details */}
          <div className={styles.mobileContactSection}>
            <div className={styles.mobileContactItem}>
              <Mail size={15} className={styles.drawerAmberIcon} />
              <a href="mailto:vedaplus76@gmail.com">vedaplus76@gmail.com</a>
            </div>
            <div className={styles.mobileContactItem}>
              <MapPin size={15} className={styles.drawerAmberIcon} />
              <span>Opp. Rajgurunagar Sarkari Bank, Rajgurunagar, Khed, Pune, Maharashtra – 410505</span>
            </div>
          </div>

          <div className={styles.mobileCtaBox}>
            <Link to="/contact" onClick={closeDrawer} className={styles.mobileCtaButton}>
              <span>Get a Website →</span>
            </Link>
            <p className={styles.mobileHelperText}>
              24-hour turnaround on project architecture blueprints.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
