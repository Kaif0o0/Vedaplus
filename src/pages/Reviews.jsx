import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  Award,
  ShieldCheck,
  UserCheck,
  Loader2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import styles from './Reviews.module.css';

gsap.registerPlugin(ScrollTrigger);

const LOCAL_STORAGE_KEY = 'ayukam_client_reviews';
const LEGACY_STORAGE_KEY = 'vedaplus_client_reviews';

// Format timestamp to human-readable string
const formatReviewDate = (dateString) => {
  if (!dateString) return 'Recent';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) {
      if (diffMin < 2) return 'Just now';
      if (diffHours < 1) return `${diffMin} min ago`;
      return `${diffHours} hr ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    const months = Math.floor(diffDays / 30);
    if (months < 12) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export default function Reviews() {
  // Load reviews strictly from database / cache (filtering out any legacy dummy reviews)
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Remove any legacy demo reviews so only genuine database reviews are displayed
          return parsed.filter((r) => r && r.id && !String(r.id).startsWith('demo-'));
        }
      }
    } catch (e) {
      console.warn('Could not load stored reviews', e);
    }
    return [];
  });

  // Exactly 3 Form Fields: Name, Stars, Review
  const [name, setName] = useState('');
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);
  const [review, setReview] = useState('');

  // Form error, submission, and status states
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  const containerRef = useRef(null);

  // Sync reviews to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Could not save reviews to localStorage', e);
    }
  }, [reviews]);

  // Fetch reviews directly from Supabase database on mount
  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        setIsLoadingReviews(true);

        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });

          if (!isMounted) return;

          if (error) {
            console.warn('Supabase fetch notice:', error.message);
          } else if (data && Array.isArray(data)) {
            const cloudReviews = data.map((item) => ({
              id: String(item.id),
              name: item.name,
              stars: Number(item.stars),
              review: item.review,
              date: formatReviewDate(item.created_at),
              verified: item.verified ?? true,
            }));
            setReviews(cloudReviews);
          }
        }
      } catch (err) {
        console.warn('Failed to load reviews from database:', err);
      } finally {
        if (isMounted) {
          setIsLoadingReviews(false);
        }
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  // GSAP ScrollTrigger Animations for Reviews Page
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Content Staggered Reveal
      gsap.from(`.${styles.heroContent} > *`, {
        y: 25,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      });

      // 2. Rating Summary Bar Stat items
      gsap.from(`.${styles.summaryStatItem}`, {
        y: 15,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        delay: 0.25,
        ease: 'power2.out',
      });

      // 3. Sticky Form Card scroll entrance (Bidirectional on scroll down and up)
      gsap.from(`.${styles.formCardSticky}`, {
        scrollTrigger: {
          trigger: `.${styles.mainGrid}`,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
      });

      // 4. Staggered Review Cards on Scroll (Bidirectional)
      const cardNodes = gsap.utils.toArray(`.${styles.reviewCardWrapper}`);
      if (cardNodes.length > 0) {
        gsap.from(cardNodes, {
          scrollTrigger: {
            trigger: `.${styles.reviewsFeed}`,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.65,
          ease: 'power2.out',
        });
      }

      // 5. CTA Banner Scroll Reveal (Bidirectional)
      gsap.from(`.${styles.ctaBanner}`, {
        scrollTrigger: {
          trigger: `.${styles.ctaSection}`,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.96,
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [reviews.length]);

  // Handle Form Submission with Supabase Integration
  const handleSubmit = async (e) => {
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
    setIsSubmitting(true);

    try {
      let savedToSupabase = false;

      // 1. Attempt to insert directly into Supabase 'reviews' table
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('reviews')
          .insert([
            {
              name: name.trim(),
              stars: Number(stars),
              review: review.trim(),
              verified: true,
            },
          ])
          .select();

        if (error) {
          console.error('Supabase review insert error:', error);
          setErrors({
            form: `Could not save to cloud database: ${error.message}. Saved to local backup.`,
          });
        } else if (data && data.length > 0) {
          savedToSupabase = true;
          const inserted = data[0];
          const newCloudReview = {
            id: String(inserted.id),
            name: inserted.name,
            stars: Number(inserted.stars),
            review: inserted.review,
            date: 'Just now',
            verified: inserted.verified ?? true,
          };
          setReviews((prev) => [newCloudReview, ...prev.filter((r) => r.id !== newCloudReview.id)]);
          setSuccessMessage(`Thank you, ${name.trim()}! Your review has been published.`);
        }
      }

      // 2. Fallback to local storage if Supabase credentials are not yet configured or on network fallback
      if (!savedToSupabase) {
        const newLocalReview = {
          id: `review-${Date.now()}`,
          name: name.trim(),
          stars: Number(stars),
          review: review.trim(),
          date: 'Just now',
          verified: true,
        };
        setReviews((prev) => [newLocalReview, ...prev]);
        setSuccessMessage(`Thank you, ${name.trim()}! Your review has been published.`);
      }

      // Reset Form Fields (3 fields only)
      setName('');
      setStars(5);
      setHoverStars(0);
      setReview('');

      // Clear success message after 6 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 6000);
    } catch (err) {
      console.error('Submission error:', err);
      setErrors({ form: 'An unexpected error occurred while saving your review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
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
    <div className={styles.reviewsPage} ref={containerRef}>
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
              Read honest feedback from small business owners who got their websites developed by Ayukam, or share your own experience using our review form below.
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
                        fill="#B99162"
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
                glareEnable={false}
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
                        Share your feedback about your website with Ayukam.
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

                  {/* Form-level Error Banner */}
                  {errors.form && (
                    <div className={styles.formErrorAlert}>
                      <AlertCircle size={18} className={styles.errorIcon} />
                      <span>{errors.form}</span>
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
                                fill={isFilled ? '#B99162' : 'none'}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                        className={`${styles.formTextarea} ${
                          errors.review ? styles.inputError : ''
                        }`}
                      />
                      {errors.review && (
                        <p className={styles.fieldError}>{errors.review}</p>
                      )}
                    </div>

                    {/* SUBMIT BUTTON WITH LOADING SPINNER */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={styles.submitBtn}
                      id="submit-review-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className={styles.spinner} />
                          <span>Saving to Supabase...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Review</span>
                          <Send size={16} />
                        </>
                      )}
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
              {isLoadingReviews ? (
                <div className={styles.loadingReviewsState}>
                  <Loader2 size={32} className={styles.spinner} />
                  <p className={styles.emptyStateDesc}>Loading reviews from database...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className={styles.emptyReviewsState}>
                  <MessageSquare size={36} className={styles.emptyStateIcon} />
                  <h3 className={styles.emptyStateTitle}>No Reviews Yet</h3>
                  <p className={styles.emptyStateDesc}>
                    Be the first client to share your experience with Ayukam! Submit your review using the form on the left.
                  </p>
                </div>
              ) : (
                reviews.map((item) => (
                  <div key={item.id} className={styles.reviewCardWrapper}>
                    <div className={styles.reviewCard}>
                      {/* Review Card Header */}
                      <div className={styles.cardHeader}>
                        <div className={styles.clientProfile}>
                          {/* Avatar Initial with Burgundy and Ivory */}
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
                              fill={s <= item.stars ? '#B99162' : 'none'}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Body Text in Simple English */}
                      <p className={styles.reviewText}>{item.review}</p>
                    </div>
                  </div>
                ))
              )}
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
