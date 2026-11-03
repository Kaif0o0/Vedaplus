import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Service3DEmblem from './Service3DEmblem';
import styles from './ServiceCard.module.css';

export default function ServiceCard({
  id,
  icon: Icon,
  archetype,
  title,
  subcategories,
  tagline,
  description,
  features = [],
  targetType,
  badge = 'Custom Website',
}) {
  return (
    <Tilt
      perspective={1000}
      glareEnable={true}
      glareMaxOpacity={0.12}
      glareColor="#F59E0B"
      glarePosition="all"
      glareBorderRadius="20px"
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.02}
      transitionSpeed={600}
      className={styles.tiltCard}
    >
      <div className={styles.cardContainer}>
        {/* Top Header with 3D Category Model */}
        <div className={styles.cardTop}>
          <div className={styles.iconBadge}>
            <Service3DEmblem type={id || 'hospitality'} size={44} />
          </div>
          <span className={styles.blueprintBadge}>{badge}</span>
        </div>

        {/* Archetype Label */}
        <span className={styles.archetypeLabel}>{archetype}</span>
        <h3 className={styles.title}>{title}</h3>

        {/* Subcategories Box */}
        {subcategories && (
          <div className={styles.subcategoriesBox}>
            <span className={styles.subcategoriesText}>
              {Array.isArray(subcategories) ? subcategories.join(' · ') : subcategories}
            </span>
          </div>
        )}

        {tagline && <p className={styles.tagline}>{tagline}</p>}
        <p className={styles.description}>{description}</p>

        {/* Features Checklist */}
        <div className={styles.featuresList}>
          {features.map((feature, idx) => (
            <div key={idx} className={styles.featureItem}>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Action Button Centered at Bottom */}
        <div className={styles.cardFooter}>
          <Link
            to={`/contact?type=${encodeURIComponent(targetType)}`}
            className={styles.actionBtn}
            title={`Build website for ${title}`}
          >
            <span>Get Website</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Tilt>
  );
}
