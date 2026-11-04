import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import {
  Star,
  CheckCircle2,
  MessageSquare,
  Send,
  Sparkles,
  Award,
  ArrowRight,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import styles from './Reviews.module.css';

// Initial Demo Reviews by Kaif, Mahesh, and Ayush in simple English
const DEMO_REVIEWS = [
  {
    id: 'demo-1',
    name: 'Rohan',
    stars: 5,
    date: '2 weeks ago',
    verified: true,
    review:
      'VedaPlus created a website for my cafe. The website is very fast and works smoothly on mobile phones. My customers can see the menu and book tables easily. Very happy with their work.',
  },
  {
    id: 'demo-2',
    name: 'Abhishek',
    stars: 5,
    date: '1 month ago',
    verified: true,
    review:
      'I needed a website for my retail clothing shop. They made a clean website where I can show all my products. The team is very helpful and finished the work quickly. Great service.',
  },
  {
    id: 'demo-3',
    name: 'Akash',
    stars: 5,
    date: '3 weeks ago',
    verified: true,
    review:
      'Very good experience with VedaPlus. They built a clean website for my repair and local services business. People find me on Google Maps easily now and contact directly on WhatsApp. Thank you.',
  },
];

const LOCAL_STORAGE_KEY = 'vedaplus_client_reviews';

export default function Reviews() {
  // Load reviews from localStorage or fallback to demo reviews
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not load stored reviews', e);
    }
    return DEMO_REVIEWS;
  });

  // Exactly 3 Form Fields: Name, Stars, Review
  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [review, setReview] = useState('');

  // Form error and success state
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Sync reviews to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Could not save reviews to localStorage', e);
    }
  }, [reviews]);

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your name';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!review.trim()) {
      newErrors.review = 'Please write your review';
    } else if (review.trim().length < 5) {
      newErrors.review = 'Review must be at least 5 characters';
    }

    if (!stars || stars < 1 || stars > 5) {
      newErrors.stars = 'Please select a star rating between 1 and 5';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const newReview = {
      id: `review-${Date.now()}`,
      name: name.trim(),
      stars: Number(stars),
      review: review.trim(),
      date: 'Just now',
      verified: true,
    };

    setReviews([newReview, ...reviews]);
    setSuccessMessage(`Thank you, ${name.trim()}! Your review has been added.`);

    // Reset Form Fields (3 fields only)
    setName('');
    setStars(5);
    setHoverStars(0);
    setReview('');

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 5000);
  };

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, curr) => acc + curr.stars, 0) / totalReviews).toFixed(1)
    : '5.0';

  const starDescriptions = {
    1: '1 Star - Needs Improvement',
    2: '2 Stars - Fair',
    3: '3 Stars - Good',
    4: '4 Stars - Very Good',
    5: '5 Stars - Excellent Experience',
  };

  return (
    <div className={styles.reviewsPage}>
      {/* ================= 1. REVIEWS HERO SECTION ================= */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.pillBadge}>
              <Award size={14} className={styles.pillAmberIcon} />
              <span>Verified Client Testimonials</span>
            </div>

            <h1 className={styles.heroTitle}>
              Client <span className={styles.accentText}>Reviews</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Read honest feedback from small business owners who got their websites developed by VedaPlus, or share your own experience using our review form below.
            </p>

            {/* Quick Rating Summary Strip */}
            <div className={styles.ratingSummaryBar}>
              <div className={styles.summaryStatItem}>
                <div className={styles.scoreRow}>
                  <span className={styles.scoreNum}>{averageRating}</span>
                  <div className={styles.summaryStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={styles.starFilled}
                        fill="#F59E0B"
                      />
                    ))}
                  </div>
                </div>
                <span className={styles.statLabel}>Average Client Rating</span>
              </div>

              <div className={styles.statDivider} />

              <div className={styles.summaryStatItem}>
                <span className={styles.scoreNum}>{totalReviews}</span>
                <span className={styles.statLabel}>Total Reviews</span>
              </div>

              <div className={styles.statDivider} />

              <div className={styles.summaryStatItem}>
                <div className={styles.verifiedRow}>
                  <ShieldCheck size={18} className={styles.shieldIcon} />
                  <span className={styles.verifiedTagText}>100% Genuine</span>
                </div>
                <span className={styles.statLabel}>Local Business Owners</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. MAIN CONTENT (FORM + REVIEWS GRID) ================= */}
      <section className={styles.mainSection}>
        <div className={`container ${styles.mainGrid}`}>
          
          {/* LEFT COLUMN: THE REVIEW SUBMISSION FORM (3 FIELDS ONLY) */}
          <div className={styles.formCol}>
            <div className={styles.formCardSticky}>
              <Tilt
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.08}
                glareColor="#F59E0B"
                glarePosition="all"
                glareBorderRadius="20px"
                tiltMaxAngleX={4}
                tiltMaxAngleY={4}
                scale={1.01}
                transitionSpeed={600}
              >
                <div className={styles.formCard}>
                  <div className={styles.formHeader}>
                    <div className={styles.formIconBadge}>
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h2 className={styles.formTitle}>Leave a Review</h2>
                      <p className={styles.formSub}>
                        Share your feedback about your website with VedaPlus.
                      </p>
                    </div>
                  </div>

                  {/* Success Notification Banner */}
                  {successMessage && (
                    <div className={styles.successAlert}>
                      <CheckCircle2 size={18} className={styles.successIcon} />
                      <span>{successMessage}</span>
                    </div>
                  )}

                  {/* FORM WITH ONLY 3 FIELDS: NAME, STARS, REVIEW */}
                  <form onSubmit={handleSubmit} className={styles.reviewForm} noValidate>
                    
                    {/* FIELD 1: STARS (RATING) */}
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>
                        Rating <span className={styles.requiredStar}>*</span>
                      </label>
                      <div
                        className={styles.starPicker}
                        onMouseLeave={() => setHoverStars(0)}
                        role="radiogroup"
                        aria-label="Star Rating"
                      >
                        {[1, 2, 3, 4, 5].map((starValue) => {
                          const isFilled =
                            (hoverStars || stars) >= starValue;
                          return (
                            <button
                              key={starValue}
                              type="button"
                              className={styles.starButton}
                              onClick={() => setStars(starValue)}
                              onMouseEnter={() => setHoverStars(starValue)}
                              aria-label={`${starValue} Stars`}
                            >
                              <Star
                                size={28}
                                className={
                                  isFilled ? styles.starFilledInteractive : styles.starEmptyInteractive
                                }
                                fill={isFilled ? '#F59E0B' : 'none'}
                              />
                            </button>
                          );
                        })}
                        <span className={styles.starStatusText}>
                          {starDescriptions[hoverStars || stars]}
                        </span>
                      </div>
                      {errors.stars && (
                        <p className={styles.fieldError}>{errors.stars}</p>
                      )}
                    </div>

                    {/* FIELD 2: CLIENT NAME */}
                    <div className={styles.formGroup}>
                      <label htmlFor="client-name" className={styles.formLabel}>
                        Your Name <span className={styles.requiredStar}>*</span>
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        className={`${styles.formInput} ${
                          errors.name ? styles.inputError : ''
                        }`}
                      />
                      {errors.name && (
                        <p className={styles.fieldError}>{errors.name}</p>
                      )}
                    </div>

                    {/* FIELD 3: REVIEW TEXT */}
                    <div className={styles.formGroup}>
                      <label htmlFor="client-review" className={styles.formLabel}>
                        Your Review <span className={styles.requiredStar}>*</span>
                      </label>
                      <textarea
                        id="client-review"
                        rows={4}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review in simple English..."
                        className={`${styles.formTextarea} ${
                          errors.review ? styles.inputError : ''
                        }`}
                      />
                      {errors.review && (
                        <p className={styles.fieldError}>{errors.review}</p>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      className={styles.submitBtn}
                      id="submit-review-btn"
                    >
                      <span>Submit Review</span>
                      <Send size={16} />
                    </button>
                  </form>
                </div>
              </Tilt>
            </div>
          </div>

          {/* RIGHT COLUMN: ALL REVIEWS DISPLAY */}
          <div className={styles.reviewsCol}>
            <div className={styles.reviewsHeaderRow}>
              <div className={styles.reviewsHeadingGroup}>
                <h2 className={styles.reviewsListTitle}>All Client Reviews</h2>
                <span className={styles.reviewsCountPill}>
                  {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                </span>
              </div>
            </div>

            {/* REVIEWS LIST */}
            <div className={styles.reviewsFeed}>
              {reviews.map((item) => (
                <div key={item.id} className={styles.reviewCardWrapper}>
                  <div className={styles.reviewCard}>
                    {/* Review Card Header */}
                    <div className={styles.cardHeader}>
                      <div className={styles.clientProfile}>
                        {/* Avatar Initial with Midnight and Gold */}
                        <div className={styles.avatarBubble}>
                          <span>{item.name ? item.name.charAt(0).toUpperCase() : 'C'}</span>
                        </div>
                        <div className={styles.clientMeta}>
                          <div className={styles.nameRow}>
                            <h3 className={styles.clientName}>{item.name}</h3>
                            {item.verified && (
                              <span className={styles.verifiedBadge} title="Verified Client">
                                <UserCheck size={12} className={styles.verifiedBadgeIcon} />
                                <span>Verified Client</span>
                              </span>
                            )}
                          </div>
                          <span className={styles.reviewDate}>{item.date}</span>
                        </div>
                      </div>

                      {/* Stars Rating Display */}
                      <div className={styles.starsRow} aria-label={`${item.stars} out of 5 stars`}>
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={16}
                            className={s <= item.stars ? styles.starFilled : styles.starEmpty}
                            fill={s <= item.stars ? '#F59E0B' : 'none'}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Review Body Text in Simple English */}
                    <p className={styles.reviewText}>{item.review}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ================= 3. BOTTOM CTA BANNER ================= */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBanner}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Ready to build a website for your business?
              </h2>
              <p className={styles.ctaSubtitle}>
                Get a clean, fast, and mobile-friendly website that helps customers find you easily.
              </p>
            </div>
            <div className={styles.ctaBtnWrapper}>
              <Link to="/contact" className={styles.ctaButton} id="reviews-cta-get-website">
                <span>Get a Website →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

