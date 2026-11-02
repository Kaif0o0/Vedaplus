import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo({ size = 'medium', className = '' }) {
  return (
    <Link
      to="/"
      className={`${styles.logoLink} ${styles[size] || ''} ${className}`}
      aria-label="VedaPlus Studios Home"
      title="VedaPlus Studios"
    >
      <div className={styles.imageCard}>
        <img
          src="/logo.png"
          alt="VedaPlus Studios"
          className={styles.logoImg}
        />
        {/* Ambient Amber Glow Beacon */}
        <span className={styles.beaconGlow} />
      </div>
    </Link>
  );
}
