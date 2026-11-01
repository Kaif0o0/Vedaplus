import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import styles from './ServiceCard.module.css';

export default function ServiceCard({
  icon: Icon,
  archetype,
  title,
  tagline,
  description,
  features = [],
  metric,
  metricLabel,
  targetType,
  badge = 'Zero-G Blueprint',
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
        {/* Top Header */}
        <div className={styles.cardTop}>
          <div className={styles.iconBadge}>
            <Icon size={24} className={styles.iconSvg} />
          </div>
          <span className={styles.blueprintBadge}>{badge}</span>
        </div>

        {/* Archetype Label */}
        <span className={styles.archetypeLabel}>{archetype}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.tagline}>{tagline}</p>
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

        {/* Metric Strip & Action */}
        <div className={styles.cardFooter}>
          <div className={styles.metricBox}>
            <span className={styles.metricValue}>{metric}</span>
            <span className={styles.metricLabel}>{metricLabel}</span>
          </div>

          <Link
            to={`/contact?type=${encodeURIComponent(targetType)}`}
            className={styles.actionBtn}
            title={`Build digital presence for ${title}`}
          >
            <span>Deploy</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </Tilt>
  );
}
