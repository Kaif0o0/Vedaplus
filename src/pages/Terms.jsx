import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileText,
  Clock,
  ArrowLeft,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import styles from './Terms.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Terms() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from(`.${styles.termsHeader}`, {
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: 'power2.out',
      });

      // Sticky sidebar entrance
      gsap.from(`.${styles.sidebarNav}`, {
        opacity: 0,
        x: -20,
        duration: 0.7,
        delay: 0.15,
        ease: 'power2.out',
      });

      // Animate each policy card as it scrolls into view (Bidirectional on scroll down and up)
      const cards = gsap.utils.toArray(`.${styles.policyCard}`);
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 25,
          duration: 0.55,
          ease: 'power2.out',
        });
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const sections = [
    { id: 'section-1', title: '1. About AYUKAM Digital' },
    { id: 'section-2', title: '2. Service Agreement & Scope' },
    { id: 'section-3', title: '3. Payments & Costs' },
    { id: 'section-4', title: '4. Timeline & Revisions' },
    { id: 'section-5', title: '5. Client Responsibilities' },
    { id: 'section-6', title: '6. Ownership & IP' },
    { id: 'section-7', title: '7. Domain, Hosting & Maintenance' },
    { id: 'section-8', title: '8. SEO & Performance' },
    { id: 'section-9', title: '9. Cancellation & Refund Policy' },
    { id: 'section-10', title: '10. Liability & Acceptable Use' },
    { id: 'section-11', title: '11. Contact Information' },
  ];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      const topOffset = elem.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.termsWrapper} ref={containerRef}>
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.termsHeader}>
          <div className={styles.badge}>
            <ShieldCheck size={16} />
            <span>Official Policy Document</span>
          </div>

          <h1 className={styles.title}>
            Terms &amp; <span className={styles.amberText}>Conditions</span>
          </h1>

          <div className={styles.updatedMeta}>
            <Clock size={16} />
            <span>Last Updated: <strong>17 November 2026</strong></span>
          </div>

          <div className={styles.introBox}>
            <p>
              Welcome to <strong>AYUKAM Digital</strong>. These Terms &amp; Conditions govern your use of our website and the digital services provided by AYUKAM Digital. By engaging our services, commissioning a project, or accessing our platform, you agree to comply with and be bound by the terms outlined below.
            </p>
          </div>
        </header>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          {/* Sticky Table of Contents */}
          <aside className={styles.sidebarNav} aria-label="Table of Contents">
            <div className={styles.sidebarTitle}>
              <FileText size={16} />
              <span>Table of Contents</span>
            </div>
            <ul className={styles.tocList}>
              {sections.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className={styles.tocLink}
                    onClick={(e) => scrollToSection(e, sec.id)}
                  >
                    {sec.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Policy Content Sections */}
          <main className={styles.contentArea}>
            {/* 1. About AYUKAM Digital */}
            <article className={styles.policyCard} id="section-1">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>01</span>
                <h2 className={styles.sectionTitle}>1. About AYUKAM Digital</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  <strong>AYUKAM Digital</strong> is a web development agency specializing in building modern, functional, and user-friendly digital solutions for businesses, professionals, and individuals.
                </p>
                <p>Our primary services include:</p>
                <ul>
                  <li>
                    <strong>Web-Based Management Dashboards:</strong> Custom dashboards and management systems designed to streamline business operations, manage data, and improve workflow efficiency.
                  </li>
                  <li>
                    <strong>E-commerce Websites:</strong> Online stores featuring product management, shopping cart functionality, payment integrations, and order management.
                  </li>
                  <li>
                    <strong>Portfolio Websites:</strong> Professional websites designed to showcase skills, projects, services, and achievements.
                  </li>
                </ul>
                <p>
                  We may also provide website customization, redesign, maintenance, and other related digital services as mutually agreed upon with clients.
                </p>
              </div>
            </article>

            {/* 2. Service Agreement and Project Scope */}
            <article className={styles.policyCard} id="section-2">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>02</span>
                <h2 className={styles.sectionTitle}>2. Service Agreement and Project Scope</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    Every project will be developed according to the requirements mutually discussed and agreed upon between AYUKAM Digital and the client before work begins.
                  </li>
                  <li>
                    The agreed project scope, features, pricing, estimated delivery timeline, and payment terms will be documented through an invoice, proposal, or written agreement.
                  </li>
                  <li>
                    Any additional features, modifications, or requirements beyond the agreed scope may involve additional charges and revised delivery timelines, subject to mutual approval.
                  </li>
                </ul>
              </div>
            </article>

            {/* 3. Payments and Additional Costs */}
            <article className={styles.policyCard} id="section-3">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>03</span>
                <h2 className={styles.sectionTitle}>3. Payments and Additional Costs</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    Project prices and payment details will be shared and agreed upon before starting the development of project.
                  </li>
                  <li>
                    An advance payment is required before any development work begins.
                  </li>
                  <li>
                    The remaining amount must be paid according to the agreed payment schedule.
                  </li>
                  <li>
                    Any extra features or changes not included in the original project agreement will cost extra. These charges will be discussed with the client beforehand.
                  </li>
                  <li>
                    Costs for domain names, hosting, premium tools, plugins, and other external services will be charged separately unless already included in the package.
                  </li>
                  <li>
                    AYUKAM Digital may pause work or delay final website delivery if payments are not made as agreed.
                  </li>
                </ul>
              </div>
            </article>

            {/* 4. Project Timeline and Revisions */}
            <article className={styles.policyCard} id="section-4">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>04</span>
                <h2 className={styles.sectionTitle}>4. Project Timeline and Revisions</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    The estimated project completion time will be shared with the client before work begins.
                  </li>
                  <li>
                    Once the project requirements are discussed and approved by both AYUKAM Digital and the client, the project scope will be considered final.
                  </li>
                  <li>
                    Minor changes or corrections to existing features can be made within the agreed project scope.
                  </li>
                  <li>
                    Any new features, additional pages, or major changes to the approved requirements will involve extra charges and may require additional development time.
                  </li>
                  <li>
                    Clients are expected to provide the required content, information, and feedback on time to avoid delays.
                  </li>
                  <li>
                    AYUKAM Digital will make reasonable efforts to complete the project within the agreed timeline.
                  </li>
                </ul>
              </div>
            </article>

            {/* 5. Client Responsibilities */}
            <article className={styles.policyCard} id="section-5">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>05</span>
                <h2 className={styles.sectionTitle}>5. Client Responsibilities</h2>
              </div>
              <div className={styles.cardBody}>
                <p>To ensure smooth project development, clients are responsible for:</p>
                <ul>
                  <li>Providing correct business information, content, images, logos, and other required materials.</li>
                  <li>Ensuring they have permission to use all content shared with AYUKAM Digital.</li>
                  <li>Providing necessary account access, such as domain and hosting details, whenever required.</li>
                  <li>Reviewing the website and sharing feedback or approvals on time.</li>
                  <li>Making payments according to the agreed schedule.</li>
                </ul>
                <p>
                  AYUKAM Digital will not be responsible for project delays caused by late submissions, missing information, or delayed approvals from the client.
                </p>
              </div>
            </article>

            {/* 6. Website Ownership and Intellectual Property */}
            <article className={styles.policyCard} id="section-6">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>06</span>
                <h2 className={styles.sectionTitle}>6. Website Ownership and Intellectual Property</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    After all project payments are completed, full ownership of the completed project will be transferred to the client.
                  </li>
                  <li>
                    This includes the complete source code, GitHub repository, database, hosting account, and related project credentials, wherever applicable.
                  </li>
                  <li>
                    The client will receive the necessary access details to manage and maintain their website independently.
                  </li>
                  <li>
                    AYUKAM Digital will also provide a user manual explaining how to use and manage the completed project.
                  </li>
                  <li>
                    AYUKAM Digital retains ownership of its existing tools, reusable code, components, and development methods that are not exclusively created for the client.
                  </li>
                  <li>
                    Third-party services, tools, plugins, APIs, and hosting platforms follow their own terms and policies. AYUKAM Digital has no control over their pricing, policies, availability, or service interruptions. AYUKAM Digital will not be responsible for problems caused by these third-party providers. Any subscription, renewal, or additional charges for these services will be the client&apos;s responsibility unless agreed otherwise.
                  </li>
                  <li>
                    AYUKAM Digital may showcase completed projects in its portfolio or on social media unless the client requests confidentiality in writing.
                  </li>
                </ul>
              </div>
            </article>

            {/* 7. Domain, Hosting and Maintenance */}
            <article className={styles.policyCard} id="section-7">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>07</span>
                <h2 className={styles.sectionTitle}>7. Domain, Hosting and Maintenance</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    Domain registration and hosting services will be provided according to the agreed project package.
                  </li>
                  <li>
                    Any domain, hosting, or third-party service renewal charges will be the client&apos;s responsibility unless included in the agreement.
                  </li>
                  <li>
                    <strong>Introductory Offer:</strong> AYUKAM Digital currently offers four months of free website maintenance to eligible early-stage clients as an introductory offer. This offer may change or be discontinued for future clients.
                  </li>
                  <li>
                    After the free maintenance period, continued maintenance and technical support will require a separate paid agreement.
                  </li>
                  <li>
                    Once the free maintenance period ends, clients will have <strong>10 days</strong> to decide whether they want to continue with AYUKAM Digital&apos;s maintenance services and complete the required payment.
                  </li>
                  <li>
                    If the client does not continue with the maintenance service within these 10 days, AYUKAM Digital will no longer be responsible for website maintenance, technical support, bug fixes, or issues that arise after the free maintenance period.
                  </li>
                  <li>
                    After this period, AYUKAM Digital may remove its access and involvement from the client&apos;s hosting, deployment, database, and other related platforms. The client will remain responsible for managing these services and maintaining their own accounts.
                  </li>
                  <li>
                    For any major bugs, technical issues, or maintenance-related problems, AYUKAM Digital may require 2–3 working days to investigate and resolve the issue. However, we will always make reasonable efforts to identify and fix issues as early as possible, wherever possible.
                  </li>
                </ul>
              </div>
            </article>

            {/* 8. SEO and Website Performance */}
            <article className={styles.policyCard} id="section-8">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>08</span>
                <h2 className={styles.sectionTitle}>8. SEO and Website Performance</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    AYUKAM Digital will provide basic on-page SEO services free of charge as part of website development.
                  </li>
                  <li>
                    On-page SEO may include page titles, meta descriptions, heading structure, image optimization, and proper URL structure.
                  </li>
                  <li>
                    Off-page SEO services, such as backlink building, external website listings, and promotional activities, will be available at an additional cost if requested by the client.
                  </li>
                  <li>
                    We aim to make websites mobile-friendly, properly structured, and optimized for a smooth user experience.
                  </li>
                  <li>
                    AYUKAM Digital does not guarantee specific Google rankings, website traffic, leads, or sales, as these depend on several factors beyond our control.
                  </li>
                </ul>
              </div>
            </article>

            {/* 9. Cancellation and Refund Policy */}
            <article className={styles.policyCard} id="section-9">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>09</span>
                <h2 className={styles.sectionTitle}>9. Cancellation and Refund Policy</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    Clients must submit project cancellation requests in writing through email or another agreed communication channel.
                  </li>
                  <li>
                    Advance payments are generally non-refundable once project development has started.
                  </li>
                  <li>
                    If a project is cancelled, the client may be charged for the work already completed and any expenses incurred.
                  </li>
                  <li>
                    Refund requests will be reviewed based on the project stage, completed work, and agreed payment terms.
                  </li>
                  <li>
                    No refund will be provided for completed and approved work.
                  </li>
                </ul>
              </div>
            </article>

            {/* 10. Limitation of Liability and Acceptable Use */}
            <article className={styles.policyCard} id="section-10">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>10</span>
                <h2 className={styles.sectionTitle}>10. Limitation of Liability and Acceptable Use</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>
                    AYUKAM Digital will make reasonable efforts to deliver reliable and functional websites and digital services.
                  </li>
                  <li>
                    Once the project is handed over to the client, the client becomes responsible for managing the website, its content, accounts, and all activities carried out through them.
                  </li>
                  <li>
                    AYUKAM Digital will not be responsible for any misuse, illegal activities, unauthorized changes, or harmful content added to the website after handover by the client or any person with access to their accounts.
                  </li>
                  <li>
                    Clients must not use websites developed by AYUKAM Digital for fraud, copyright infringement, phishing, malware, or any other illegal activity.
                  </li>
                  <li>
                    AYUKAM Digital reserves the right to refuse or discontinue services involving unlawful activities.
                  </li>
                  <li>
                    Nothing in these terms excludes responsibilities that cannot legally be excluded under applicable Indian law.
                  </li>
                </ul>
              </div>
            </article>

            {/* 11. Contact Information */}
            <article className={styles.policyCard} id="section-11">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>11</span>
                <h2 className={styles.sectionTitle}>11. Contact Information</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  For questions, project consultations, or clarification regarding these Terms &amp; Conditions, please reach out directly:
                </p>

                <div className={styles.contactGrid}>
                  <div className={styles.contactField}>
                    <span className={styles.contactFieldLabel}>Company</span>
                    <span className={styles.contactFieldValue}>AYUKAM Digital</span>
                  </div>

                  <div className={styles.contactField}>
                    <span className={styles.contactFieldLabel}>Email</span>
                    <span className={styles.contactFieldValue}>
                      <a href="mailto:ayukam99@gmail.com">ayukam99@gmail.com</a>
                    </span>
                  </div>

                  <div className={styles.contactField}>
                    <span className={styles.contactFieldLabel}>Phone / WhatsApp</span>
                    <span className={styles.contactFieldValue}>
                      <a href="tel:+919503956026">+91 9503956026</a> / <a href="tel:+919226115976">+91 9226115976</a>
                    </span>
                  </div>

                  <div className={styles.contactField} style={{ gridColumn: '1 / -1' }}>
                    <span className={styles.contactFieldLabel}>Studio Location</span>
                    <span className={styles.contactFieldValue}>
                      Opp. Rajgurunagar Sahakari Bank, Rajgurunagar, Khed, Pune, Maharashtra – 410505, India
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Navigation Actions */}
            <div className={styles.bottomNavActions}>
              <Link to="/" className={styles.backHomeBtn}>
                <ArrowLeft size={16} />
                <span>Return to Home</span>
              </Link>

              <Link to="/contact" className={styles.contactLegalBtn}>
                <MessageSquare size={16} />
                <span>Contact Legal / Support Team</span>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
