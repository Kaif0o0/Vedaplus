import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Subtle top amber border highlight */}
      <div className={styles.topAccentBar} />

      <div className={`container ${styles.footerContainer}`}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <Logo size="medium" />
          <p className={styles.brandMission}>
            VedaPlus builds high-performance, modern websites for local businesses. We create fast, clean, and mobile-friendly websites that turn local visitors into regular customers.
          </p>

          <div className={styles.statusBox}>
            <ShieldCheck size={18} className={styles.statusIcon} />
            <div className={styles.statusText}>
              <span className={styles.statusTitle}>Zero-Downtime Guarantee</span>
              <span className={styles.statusSub}>Local business continuity 24/7/365</span>
            </div>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Navigation</h4>
          <ul className={styles.linksList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="/#services">Services</a>
            </li>
            <li>
              <a href="/#about-us">About Us</a>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Website Development Services */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Services</h4>
          <ul className={styles.linksList}>
            <li>
              <Link to="/contact?type=hospitality">01. Food &amp; Hospitality</Link>
            </li>
            <li>
              <Link to="/contact?type=retail">02. Retail &amp; E-commerce</Link>
            </li>
            <li>
              <Link to="/contact?type=services">03. Professional &amp; Local Services</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Direct Contact */}
        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Direct Contact</h4>
          <div className={styles.contactItem}>
            <Mail size={16} className={styles.contactIcon} />
            <a href="mailto:vedaplus76@gmail.com">vedaplus76@gmail.com</a>
          </div>
          <div className={styles.contactItem}>
            <Phone size={16} className={styles.contactIcon} />
            <div className={styles.footerPhoneGroup}>
              <a href="tel:+919503956026">+91 9503956026</a>
              <span className={styles.footerPhoneDivider}>/</span>
              <a href="tel:+919226115976">+91 9226115976</a>
              <span className={styles.footerPhoneDivider}>/</span>
              <a href="tel:+919762874676">+91 9762874676</a>
            </div>
          </div>
          <div className={styles.contactItem}>
            <MapPin size={16} className={styles.contactIcon} />
            <span>Opp. Rajgurunagar Sarkari Bank, Rajgurunagar, Khed, Pune, Maharashtra – 410505</span>
          </div>

          <div className={styles.ctaMiniBox}>
            <span className={styles.ctaMiniLabel}>Ready to launch?</span>
            <Link to="/contact" className={styles.ctaMiniBtn}>
              <span>Get a Website →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sub-footer Bar */}
      <div className={styles.subFooter}>
        <div className={`container ${styles.subFooterContainer}`}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} VedaPlus. All Rights Reserved. Custom Website Development.
          </div>
          <div className={styles.paletteBadge}>
            <span className={styles.swatchPrimary} title="Royal Midnight Blue (#0F172A)" />
            <span className={styles.swatchSecondary} title="Marigold Amber (#F59E0B)" />
            <span className={styles.swatchBase} title="Soft Chalk White (#F8FAFC)" />
            <span className={styles.paletteLabel}>VedaPlus 3-Spectrum Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
