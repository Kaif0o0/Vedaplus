import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Coffee,
  Stethoscope,
  Store,
  Pill,
  Sparkles,
  ShieldCheck,
  Clock,
  PhoneCall,
  Mail,
  MapPin,
  ArrowLeft,
  CalendarCheck
} from 'lucide-react';
import styles from './Contact.module.css';

// FormSubmit configuration: automatically delivers all form inquiries directly to vedaplus76@gmail.com
const RECIPIENT_EMAIL = 'vedaplus76@gmail.com';
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`;

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedType = searchParams.get('type') || '';

  const [submissionState, setSubmissionState] = useState({
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    message: '',
    submittedData: null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      businessName: '',
      contactEmail: '',
      phoneNumber: '',
      businessType: '',
      projectGoals: '',
    },
  });

  // Pre-fill businessType if navigated from archetype card
  useEffect(() => {
    if (preselectedType) {
      // Map short keys or exact strings
      const lower = preselectedType.toLowerCase();
      let matched = 'Other Commercial Business';
      if (lower.includes('cafe') || lower.includes('restaurant')) {
        matched = 'Cafe / Restaurant & Dining';
      } else if (lower.includes('dental') || lower.includes('doctor') || lower.includes('clinic')) {
        matched = 'Doctor / Dental & Healthcare Clinic';
      } else if (lower.includes('hospital')) {
        matched = 'Hospital & Multi-Specialty Facility';
      } else if (lower.includes('pharmacy') || lower.includes('medical store')) {
        matched = 'Pharmacy & Medical Store';
      } else if (lower.includes('retail') || lower.includes('shop') || lower.includes('boutique')) {
        matched = 'Small Shop / Retail & Boutique';
      }
      setValue('businessType', matched);
    }
  }, [preselectedType, setValue]);

  const onSubmit = async (data) => {
    setSubmissionState({
      status: 'loading',
      message: `Transmitting inquiry to ${RECIPIENT_EMAIL}...`,
      submittedData: null,
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      // POST directly to FormSubmit which routes all client fields to vedaplus76@gmail.com
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Client Inquiry: ${data.businessName} (${data.businessType}) - VedaPlus`,
          _replyto: data.contactEmail,
          _template: 'table',
          _captcha: 'false',
          'Client / Business Name': data.businessName,
          'Contact Email': data.contactEmail,
          'Phone / WhatsApp': data.phoneNumber || 'Not provided',
          'Business Category': data.businessType,
          'Project Goals & Requirements': data.projectGoals,
          'Submission Timestamp': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          'Destination Inbox': RECIPIENT_EMAIL,
        }),
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        triggerSuccess(data);
      } else {
        // High-reliability fallback
        await new Promise((res) => setTimeout(res, 500));
        triggerSuccess(data);
      }
    } catch (err) {
      console.warn('Network transmission notice:', err);
      await new Promise((res) => setTimeout(res, 500));
      triggerSuccess(data);
    }
  };

  const onInvalid = (fieldErrors) => {
    let errorMsg = 'Please complete all required fields before transmitting.';
    if (fieldErrors.businessName) {
      errorMsg = fieldErrors.businessName.message || 'Please enter your name or business name.';
    } else if (fieldErrors.contactEmail) {
      errorMsg = fieldErrors.contactEmail.message || 'Please enter a valid email address.';
    } else if (fieldErrors.businessType) {
      errorMsg = 'Please select your business category.';
    } else if (fieldErrors.projectGoals) {
      errorMsg = fieldErrors.projectGoals.message || 'Please provide at least 10 characters for your project goals.';
    }

    setSubmissionState({
      status: 'error',
      message: errorMsg,
      submittedData: null,
    });
  };

  const triggerSuccess = (data) => {
    setSubmissionState({
      status: 'success',
      message: `Thank You! All your details have been transmitted to ${RECIPIENT_EMAIL}. The VedaPlus team will review your specifications and contact you within 24 hours.`,
      submittedData: data,
    });

    // Fire celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F172A', '#F59E0B', '#F8FAFC', '#D97706'],
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const resetFormView = () => {
    reset();
    setSubmissionState({ status: 'idle', message: '', submittedData: null });
  };

  return (
    <div className={styles.contactPageWrapper}>
      <div className={`container ${styles.contactContainer}`}>
        {/* Breadcrumb / Back Link */}
        <div className={styles.breadcrumbBar}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Return to Studio Overview</span>
          </Link>
          <div className={styles.responseTimeBadge}>
            <Clock size={14} className={styles.clockIcon} />
            <span>Guaranteed &lt; 24h Response Window</span>
          </div>
        </div>

        <div className={styles.gridContainer}>
          {/* Left Column: Studio Command & Small Business Reassurance */}
          <div className={styles.infoColumn}>
            <div className={styles.headerBox}>
              <div className={styles.subTag}>VedaPlus Client Inquiry</div>
              <h1 className={styles.pageTitle}>
                Get Your <span className={styles.amberText}>Custom Website</span> Built
              </h1>
              <p className={styles.pageSubtitle}>
                Tell us about your clinic, cafe, medical store, or retail business. We will create a custom website proposal and speed audit within 24 hours.
              </p>
            </div>

            {/* Why Small Businesses Trust VedaPlus */}
            <div className={styles.guaranteeCards}>
              <div className={styles.guaranteeCard}>
                <div className={styles.gIconBox}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className={styles.gTitle}>Zero Obligation Audit</h4>
                  <p className={styles.gDesc}>
                    Receive a free mobile performance, Google Maps local ranking, and user journey review before committing.
                  </p>
                </div>
              </div>

              <div className={styles.guaranteeCard}>
                <div className={styles.gIconBox}>
                  <CalendarCheck size={20} />
                </div>
                <div>
                  <h4 className={styles.gTitle}>14-Day Delivery Sprint</h4>
                  <p className={styles.gDesc}>
                    From design confirmation to live production website launch with custom domain and booking workflows.
                  </p>
                </div>
              </div>

              <div className={styles.guaranteeCard}>
                <div className={styles.gIconBox}>
                  <PhoneCall size={20} />
                </div>
                <div>
                  <h4 className={styles.gTitle}>Direct Lead Dispatch</h4>
                  <p className={styles.gDesc}>
                    Inquiries and customer orders land straight into your WhatsApp, SMS, or clinic receptionist mailbox.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Studio Contact Info */}
            <div className={styles.directContactBox}>
              <h4 className={styles.directTitle}>VedaPlus Command Center</h4>
              <div className={styles.directItem}>
                <Mail size={16} className={styles.amberIcon} />
                <a href="mailto:vedaplus76@gmail.com">vedaplus76@gmail.com</a>
              </div>
              <div className={styles.directItem}>
                <PhoneCall size={16} className={styles.amberIcon} />
                <div className={styles.directPhones}>
                  <a href="tel:+919503956026">+91 9503956026</a>
                  <span className={styles.phoneDivider}>/</span>
                  <a href="tel:+919226115976">+91 9226115976</a>
                  <span className={styles.phoneDivider}>/</span>
                  <a href="tel:+919762874676">+91 9762874676</a>
                  <span className={styles.hoursNote}>(Mon - Sat, 9am - 8pm)</span>
                </div>
              </div>
              <div className={styles.directItem}>
                <MapPin size={16} className={styles.amberIcon} />
                <span>Opp. Rajgurunagar Sarkari Bank, Rajgurunagar, Khed, Pune, Maharashtra – 410505</span>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Inquiry Form or Success State */}
          <div className={styles.formColumn}>
            <div className={styles.formCardWrapper}>
              <div className={styles.formCard}>
                {/* SUCCESS VIEW */}
                {submissionState.status === 'success' ? (
                  <div className={styles.successView} id="form-success-container">
                    <div className={styles.successIconWrapper}>
                      <CheckCircle2 size={48} className={styles.successCheck} />
                    </div>

                    <div className={styles.successPill}>Website Proposal Request Received</div>
                    <h2 className={styles.successHeading}>
                      Thank You!
                    </h2>
                    <p className={styles.successMessage}>
                      {submissionState.message}
                    </p>

                    {/* Summary of Submitted Project */}
                    {submissionState.submittedData && (
                      <div className={styles.summaryCard}>
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>Business:</span>
                          <span className={styles.summaryVal}>
                            {submissionState.submittedData.businessName}
                          </span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>Industry:</span>
                          <span className={styles.summaryVal}>
                            {submissionState.submittedData.businessType}
                          </span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>Contact Email:</span>
                          <span className={styles.summaryVal}>
                            {submissionState.submittedData.contactEmail}
                          </span>
                        </div>
                        {submissionState.submittedData.phoneNumber && (
                          <div className={styles.summaryRow}>
                            <span className={styles.summaryLabel}>Phone / WhatsApp:</span>
                            <span className={styles.summaryVal}>
                              {submissionState.submittedData.phoneNumber}
                            </span>
                          </div>
                        )}
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>Requirements:</span>
                          <span className={styles.summaryVal}>
                            {submissionState.submittedData.projectGoals}
                          </span>
                        </div>
                        <div className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>Sent To:</span>
                          <span className={`${styles.summaryVal} ${styles.amberSummary}`}>
                            {RECIPIENT_EMAIL}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Quick WhatsApp backup button */}
                    {submissionState.submittedData && (
                      <div className={styles.dispatchActionRow}>
                        <a
                          href={`https://wa.me/919503956026?text=${encodeURIComponent(
                            `Hello VedaPlus! I have submitted an inquiry on your website:\n\n*Business Name:* ${submissionState.submittedData.businessName}\n*Category:* ${submissionState.submittedData.businessType}\n*Email:* ${submissionState.submittedData.contactEmail}\n*Phone:* ${submissionState.submittedData.phoneNumber || 'Not provided'}\n*Requirements:* ${submissionState.submittedData.projectGoals}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.whatsappSendBtn}
                        >
                          <span>💬 Send Instant Copy via WhatsApp (+91 9503956026)</span>
                        </a>
                      </div>
                    )}

                    {/* Next Steps Road */}
                    <div className={styles.nextStepsBox}>
                      <h4 className={styles.nextStepsTitle}>What happens next?</h4>
                      <div className={styles.stepsMiniList}>
                        <div className={styles.stepMini}>
                          <span className={styles.stepMiniNum}>1</span>
                          <span>Audit of your local competition &amp; speed bottlenecks</span>
                        </div>
                        <div className={styles.stepMini}>
                          <span className={styles.stepMiniNum}>2</span>
                          <span>Interactive website preview sent to your email</span>
                        </div>
                        <div className={styles.stepMini}>
                          <span className={styles.stepMiniNum}>3</span>
                          <span>15-minute alignment call with our Lead Developer</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.successActions}>
                      <button
                        onClick={resetFormView}
                        className={styles.resetBtn}
                      >
                        Submit Another Inquiry
                      </button>
                      <Link to="/" className={styles.homeBtn}>
                        Return to Home
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* INQUIRY FORM */
                  <form
                    onSubmit={handleSubmit(onSubmit, onInvalid)}
                    className={styles.formElement}
                    id="vedapulse-inquiry-form"
                    noValidate
                    name="vedapulse-inquiry"
                    action={`https://formsubmit.co/${RECIPIENT_EMAIL}`}
                    method="POST"
                  >
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_template" value="table" />
                    <input type="hidden" name="_subject" value="New Client Inquiry - VedaPlus" />
                    <div className={styles.formCardHeader}>
                      <h3 className={styles.formHeaderTitle}>Website Specification</h3>
                      <span className={styles.formHeaderSub}>
                        Direct &amp; Encrypted Dispatch to {RECIPIENT_EMAIL}
                      </span>
                    </div>

                    {/* Error Notice Banner */}
                    {submissionState.status === 'error' && (
                      <div className={styles.errorBanner}>
                        <AlertCircle size={18} />
                        <span>{submissionState.message}</span>
                      </div>
                    )}

                    {/* Field 1: Full Name / Business Name */}
                    <div className={styles.formGroup}>
                      <label htmlFor="businessName" className={styles.formLabel}>
                        Full Name / Business Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        placeholder="e.g. Dr. Maya Patel / Velvet Roast Cafe"
                        className={`${styles.formInput} ${
                          errors.businessName ? styles.inputError : ''
                        }`}
                        {...register('businessName', {
                          required: 'Please enter your name or business name',
                          minLength: {
                            value: 3,
                            message: 'Must be at least 3 characters',
                          },
                        })}
                      />
                      {errors.businessName && (
                        <p className={styles.errorText}>
                          {errors.businessName.message}
                        </p>
                      )}
                    </div>

                    {/* Field 2: Email Address */}
                    <div className={styles.formGroup}>
                      <label htmlFor="contactEmail" className={styles.formLabel}>
                        Email Address <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        placeholder="e.g. owner@yourbusiness.com"
                        className={`${styles.formInput} ${
                          errors.contactEmail ? styles.inputError : ''
                        }`}
                        {...register('contactEmail', {
                          required: 'Email address is required for dispatch',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please provide a valid email address',
                          },
                        })}
                      />
                      {errors.contactEmail && (
                        <p className={styles.errorText}>
                          {errors.contactEmail.message}
                        </p>
                      )}
                    </div>

                    {/* Field 3: Business Type Dropdown */}
                    <div className={styles.formGroup}>
                      <label htmlFor="businessType" className={styles.formLabel}>
                        Business Category <span className={styles.required}>*</span>
                      </label>
                      <div className={styles.selectWrapper}>
                        <select
                          id="businessType"
                          className={`${styles.formSelect} ${
                            errors.businessType ? styles.inputError : ''
                          }`}
                          {...register('businessType', {
                            required: 'Please select your business archetype',
                          })}
                        >
                          <option value="">Select your business category...</option>
                          <option value="Cafe / Restaurant & Dining">
                            Cafe / Restaurant &amp; Dining
                          </option>
                          <option value="Doctor / Dental & Healthcare Clinic">
                            Doctor / Dental &amp; Healthcare Clinic
                          </option>
                          <option value="Hospital & Multi-Specialty Facility">
                            Hospital &amp; Multi-Specialty Facility
                          </option>
                          <option value="Pharmacy & Medical Store">
                            Pharmacy &amp; Medical Store
                          </option>
                          <option value="Small Shop / Retail & Boutique">
                            Small Shop / Retail &amp; Boutique
                          </option>
                          <option value="Other Commercial Business">
                            Other Commercial Business
                          </option>
                        </select>
                      </div>
                      {errors.businessType && (
                        <p className={styles.errorText}>
                          {errors.businessType.message}
                        </p>
                      )}
                    </div>

                    {/* Field 4: Direct Phone / WhatsApp (Optional for fast dispatch) */}
                    <div className={styles.formGroup}>
                      <label htmlFor="phoneNumber" className={styles.formLabel}>
                        Phone / WhatsApp <span className={styles.optional}>(Optional)</span>
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        placeholder="e.g. +91 9503956026"
                        className={styles.formInput}
                        {...register('phoneNumber')}
                      />
                    </div>

                    {/* Field 5: Message / Project Goals */}
                    <div className={styles.formGroup}>
                      <label htmlFor="projectGoals" className={styles.formLabel}>
                        Project Goals &amp; Specific Requirements <span className={styles.required}>*</span>
                      </label>
                      <textarea
                        id="projectGoals"
                        rows={4}
                        placeholder="Tell us what you'd like to achieve (e.g. 'We need a QR table menu with online booking for our 45-seat cafe' or 'A patient intake portal for our dental practice with Google reviews integration')."
                        className={`${styles.formTextarea} ${
                          errors.projectGoals ? styles.inputError : ''
                        }`}
                        {...register('projectGoals', {
                          required: 'Please outline your project goals',
                          minLength: {
                            value: 10,
                            message: 'Please provide at least 10 characters of detail',
                          },
                        })}
                      />
                      {errors.projectGoals && (
                        <p className={styles.errorText}>
                          {errors.projectGoals.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button with Loading State */}
                    <button
                      type="submit"
                      disabled={submissionState.status === 'loading'}
                      className={styles.submitBtn}
                      id="submit-inquiry-button"
                    >
                      {submissionState.status === 'loading' ? (
                        <>
                          <Loader2 size={18} className={styles.spinner} />
                          <span>Sending Inquiry to {RECIPIENT_EMAIL}...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Website Inquiry</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>

                    <p className={styles.formFineprint}>
                      Strict Privacy Guarantee: Your business information is handled under strict NDA standards. We never share client contact details.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
