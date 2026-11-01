import React from 'react';
import styles from './Logo.module.css';

export default function Logo({ size = 'medium', showTagline = true }) {
  return (
    <div className={`${styles.logoContainer} ${styles[size]}`}>
      <div className={styles.iconWrapper}>
        <img
          src="/logo.png"
          alt="Vyora Studio"
          className={styles.logoImg}
        />
        {/* Ambient Amber Core Beacon */}
        <span className={styles.beaconGlow} />
      </div>

      <div className={styles.textWrapper}>
        <div className={styles.brandTitle}>
          <span className={styles.brandName}>Vyora Studio</span>
          <span className={styles.brandBadge}>STUDIOS</span>
        </div>
        {showTagline && (
          <span className={styles.brandSubtitle}>
            Anti-Gravity Web Systems
          </span>
        )}
      </div>
    </div>
  );
}
