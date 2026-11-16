import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo({ size = 'medium', className = '' }) {
  return (
    <Link
      to="/"
      className={`${styles.logoLink} ${styles[size] || ''} ${className}`}
      aria-label="Ayukam Digital Home"
      title="Ayukam Digital"
    >
      <img
        src="/logo.png"
        alt="Ayukam Digital Logo"
        className={styles.logoImg}
      />
    </Link>
  );
}
