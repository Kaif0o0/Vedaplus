import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './ScrollController.module.css';

export default function ScrollController() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          
          if (scrollHeight > 0) {
            const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
            setScrollProgress(progress);
          } else {
            setScrollProgress(0);
          }

          setIsVisible(scrollTop > 240);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Top amber scroll progress line */}
      <div className={styles.scrollProgressBarContainer} aria-hidden="true">
        <div
          className={styles.scrollProgressBarFill}
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll to top button */}
      <button
        type="button"
        onClick={scrollToTop}
        className={`${styles.scrollTopBtn} ${isVisible ? styles.scrollTopBtnVisible : ''}`}
        aria-label="Scroll to top of page"
        title="Scroll to top"
      >
        <div className={styles.iconWrapper}>
          <ArrowUp size={16} />
        </div>
        <span className={styles.btnLabel}>Top</span>
        <span className={styles.percentBadge}>{Math.round(scrollProgress)}%</span>
      </button>
    </>
  );
}

