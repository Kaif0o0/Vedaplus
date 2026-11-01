import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer upon route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const closeDrawer = () => setMobileMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Top Utility Contact Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.topBarLocation}>
            <MapPin size={13} className={styles.topBarIcon} />
            <span>Front of Rajgurunagar Sarkari Bank, Khed, Rajgurunagar</span>
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
        {/* Brand Monogram & Name: Logo — VedaPlus */}
        <Link
          to="/"
          className={styles.brandLink}
          aria-label="VedaPlus Home"
          onClick={closeDrawer}
        >
          <Logo size="medium" />
        </Link>

        {/* Desktop Navigation Links matching exact requested terms:
            Home | Services | Our Work | About Us | Contact */}
        <nav className={styles.navMenu} aria-label="Main Navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
            }
          >
            Home
          </NavLink>
          <a href="/#services" className={styles.navLink}>
            Services
          </a>
          <a href="/#our-work" className={styles.navLink}>
            Our Work
          </a>
          <a href="/#about-us" className={styles.navLink}>
            About Us
          </a>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
            }
          >
            Contact
          </NavLink>
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
          <NavLink
            to="/"
            end
            onClick={closeDrawer}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`
            }
          >
            Home
          </NavLink>
          <a href="/#services" onClick={closeDrawer} className={styles.mobileNavLink}>
            Services
          </a>
          <a href="/#our-work" onClick={closeDrawer} className={styles.mobileNavLink}>
            Our Work
          </a>
          <a href="/#about-us" onClick={closeDrawer} className={styles.mobileNavLink}>
            About Us
          </a>
          <NavLink
            to="/contact"
            onClick={closeDrawer}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`
            }
          >
            Contact
          </NavLink>

          {/* Direct Mobile Contact Details */}
          <div className={styles.mobileContactSection}>
            <div className={styles.mobileContactItem}>
              <Mail size={15} className={styles.drawerAmberIcon} />
              <a href="mailto:vedaplus76@gmail.com">vedaplus76@gmail.com</a>
            </div>
            <div className={styles.mobileContactItem}>
              <MapPin size={15} className={styles.drawerAmberIcon} />
              <span>Front of Rajgurunagar Sarkari Bank, Khed, Rajgurunagar</span>
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
