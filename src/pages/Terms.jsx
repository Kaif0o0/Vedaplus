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
    { id: 'section-1', title: '1. About VedaPlus' },
    { id: 'section-2', title: '2. Service Agreement' },
    { id: 'section-3', title: '3. Payments and Pricing' },
    { id: 'section-4', title: '4. Project Timeline and Delivery' },
    { id: 'section-5', title: '5. Revisions and Modifications' },
    { id: 'section-6', title: '6. Client Responsibilities' },
    { id: 'section-7', title: '7. Website Ownership & IP' },
    { id: 'section-8', title: '8. Domain and Hosting' },
    { id: 'section-9', title: '9. Maintenance & Support' },
    { id: 'section-10', title: '10. SEO & Performance' },
    { id: 'section-11', title: '11. Student & Academic Projects' },
    { id: 'section-12', title: '12. Cancellation & Refund Policy' },
    { id: 'section-13', title: '13. Limitation of Liability' },
    { id: 'section-14', title: '14. Prohibited Use' },
    { id: 'section-15', title: '15. Privacy & Data Protection' },
    { id: 'section-16', title: '16. Changes to Terms' },
    { id: 'section-17', title: '17. Governing Law & Jurisdiction' },
    { id: 'section-18', title: '18. Contact Information' },
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
      <div className={styles.backgroundAura} />
      
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
            <span>Last Updated: <strong>7 November 2026</strong></span>
          </div>

          <div className={styles.introBox}>
            <p>
              Welcome to <strong>VedaPlus</strong>. These Terms &amp; Conditions govern your use of our website and the services provided by VedaPlus. By accessing our website, contacting us, or purchasing any of our services, you agree to these terms.
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
            {/* 1. About VedaPlus */}
            <article className={styles.policyCard} id="section-1">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>01</span>
                <h2 className={styles.sectionTitle}>1. About VedaPlus</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  VedaPlus is a web development agency providing digital solutions to individuals, students, startups, professionals, and local businesses.
                </p>
                <p>Our services may include:</p>
                <ul>
                  <li>Website design and development.</li>
                  <li>Business and portfolio websites.</li>
                  <li>E-commerce website development.</li>
                  <li>Student and academic project websites.</li>
                  <li>Landing pages and custom web applications.</li>
                  <li>Website redesign and customization.</li>
                  <li>Website maintenance and technical support.</li>
                  <li>Other digital services agreed upon with the client.</li>
                </ul>
              </div>
            </article>

            {/* 2. Service Agreement */}
            <article className={styles.policyCard} id="section-2">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>02</span>
                <h2 className={styles.sectionTitle}>2. Service Agreement</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  Every project will be developed according to the requirements discussed and mutually agreed upon between VedaPlus and the client.
                </p>
                <p>
                  The project scope, features, estimated delivery time, pricing, and other important details will be communicated before starting the project.
                </p>
                <p>
                  Any additional requirements outside the agreed scope may involve additional charges.
                </p>
              </div>
            </article>

            {/* 3. Payments and Pricing */}
            <article className={styles.policyCard} id="section-3">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>03</span>
                <h2 className={styles.sectionTitle}>3. Payments and Pricing</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>Project pricing will be communicated before the commencement of work.</li>
                  <li>An advance payment may be required to initiate a project.</li>
                  <li>The remaining payment must be completed according to the agreed payment schedule.</li>
                  <li>Additional features or modifications outside the agreed scope may incur extra charges.</li>
                  <li>Domain registration, hosting, premium themes, plugins, APIs, and third-party services may involve additional costs unless explicitly included in the package.</li>
                  <li>VedaPlus reserves the right to pause or withhold project delivery if agreed payments are not received.</li>
                </ul>
              </div>
            </article>

            {/* 4. Project Timeline and Delivery */}
            <article className={styles.policyCard} id="section-4">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>04</span>
                <h2 className={styles.sectionTitle}>4. Project Timeline and Delivery</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>Estimated delivery timelines will be communicated before project commencement.</li>
                  <li>Delivery timelines depend on project complexity and client cooperation.</li>
                  <li>Delays in providing content, images, approvals, or other required information may affect the delivery date.</li>
                  <li>VedaPlus will make reasonable efforts to deliver projects within the agreed timeframe.</li>
                  <li>Any significant changes to project requirements may result in revised delivery timelines.</li>
                </ul>
              </div>
            </article>

            {/* 5. Revisions and Modifications */}
            <article className={styles.policyCard} id="section-5">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>05</span>
                <h2 className={styles.sectionTitle}>5. Revisions and Modifications</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>Clients may request revisions according to the revision policy agreed upon before the project starts.</li>
                  <li>Minor corrections within the approved project scope may be included.</li>
                  <li>Major design changes, additional pages, new functionalities, and changes to previously approved requirements may involve additional charges.</li>
                  <li>Revisions must be communicated clearly to avoid misunderstandings.</li>
                </ul>
              </div>
            </article>

            {/* 6. Client Responsibilities */}
            <article className={styles.policyCard} id="section-6">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>06</span>
                <h2 className={styles.sectionTitle}>6. Client Responsibilities</h2>
              </div>
              <div className={styles.cardBody}>
                <p>Clients are responsible for:</p>
                <ul>
                  <li>Providing accurate business or personal information.</li>
                  <li>Providing required images, text, logos, and other content.</li>
                  <li>Ensuring they have permission to use the content provided.</li>
                  <li>Reviewing the website and providing feedback within a reasonable timeframe.</li>
                  <li>Providing necessary domain, hosting, and third-party account access when required.</li>
                  <li>Making payments according to the agreed schedule.</li>
                </ul>
                <p>
                  VedaPlus will not be responsible for delays or issues caused by incomplete, inaccurate, or late information supplied by the client.
                </p>
              </div>
            </article>

            {/* 7. Website Ownership and Intellectual Property */}
            <article className={styles.policyCard} id="section-7">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>07</span>
                <h2 className={styles.sectionTitle}>7. Website Ownership and Intellectual Property</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>Ownership and usage rights for the completed website will be transferred according to the payment and ownership agreement.</li>
                  <li>Clients must complete all agreed payments before receiving final ownership and administrative access, unless otherwise agreed.</li>
                  <li>Third-party libraries, plugins, themes, fonts, images, and software remain subject to their respective licenses.</li>
                  <li>VedaPlus retains ownership of its pre-existing tools, reusable components, development methods, and proprietary resources.</li>
                  <li>VedaPlus may display completed projects in its portfolio unless the client requests confidentiality in writing.</li>
                </ul>
              </div>
            </article>

            {/* 8. Domain and Hosting */}
            <article className={styles.policyCard} id="section-8">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>08</span>
                <h2 className={styles.sectionTitle}>8. Domain and Hosting</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>Domain registration and hosting services may be provided separately or through third-party providers.</li>
                  <li>Domain and hosting renewal charges are generally the client&apos;s responsibility unless included in a service agreement.</li>
                  <li>VedaPlus is not responsible for downtime, service interruptions, or failures caused by third-party hosting or domain providers.</li>
                  <li>Clients are responsible for maintaining access to their domain and hosting accounts.</li>
                </ul>
              </div>
            </article>

            {/* 9. Website Maintenance and Technical Support */}
            <article className={styles.policyCard} id="section-9">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>09</span>
                <h2 className={styles.sectionTitle}>9. Website Maintenance and Technical Support</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>Ongoing maintenance and technical support are not automatically included unless specified in the selected package or agreement.</li>
                  <li>Maintenance may include bug fixes, content updates, security updates, and technical assistance.</li>
                  <li>Additional development work or major modifications may require separate payment.</li>
                  <li>VedaPlus is not responsible for issues caused by unauthorized modifications, third-party services, or client-side changes.</li>
                </ul>
              </div>
            </article>

            {/* 10. SEO and Website Performance */}
            <article className={styles.policyCard} id="section-10">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>10</span>
                <h2 className={styles.sectionTitle}>10. SEO and Website Performance</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  VedaPlus may implement basic SEO practices, including website structure optimization, metadata, mobile responsiveness, and performance improvements, depending on the selected package.
                </p>
                <p>However:</p>
                <ul>
                  <li>We do not guarantee specific Google rankings.</li>
                  <li>We cannot guarantee a particular number of visitors, leads, or sales.</li>
                  <li>Search engine algorithms and ranking factors are controlled by third-party platforms.</li>
                  <li>SEO results depend on multiple factors beyond our control.</li>
                </ul>
              </div>
            </article>

            {/* 11. Student Projects and Academic Services */}
            <article className={styles.policyCard} id="section-11">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>11</span>
                <h2 className={styles.sectionTitle}>11. Student Projects and Academic Services</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  VedaPlus may provide website development and technical assistance for students and academic projects.
                </p>
                <ul>
                  <li>Students are responsible for understanding their projects and complying with their institution&apos;s academic policies.</li>
                  <li>We do not guarantee academic grades, marks, project approval, or examination results.</li>
                  <li>Students must ensure that submitted work complies with their institution&apos;s rules regarding external assistance.</li>
                  <li>Any project customization or additional requirements may involve additional charges.</li>
                </ul>
              </div>
            </article>

            {/* 12. Cancellation and Refund Policy */}
            <article className={styles.policyCard} id="section-12">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>12</span>
                <h2 className={styles.sectionTitle}>12. Cancellation and Refund Policy</h2>
              </div>
              <div className={styles.cardBody}>
                <ul>
                  <li>Project cancellation requests must be communicated in writing.</li>
                  <li>Advance payments may be non-refundable once project work has commenced, subject to the agreed cancellation policy and applicable law.</li>
                  <li>If a project is cancelled, charges may apply for work already completed and expenses already incurred.</li>
                  <li>Refund eligibility will be assessed based on the project stage, completed work, and applicable agreement.</li>
                  <li>No refund will be provided for completed and approved work, except where required by applicable law.</li>
                </ul>
              </div>
            </article>

            {/* 13. Limitation of Liability */}
            <article className={styles.policyCard} id="section-13">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>13</span>
                <h2 className={styles.sectionTitle}>13. Limitation of Liability</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  VedaPlus will make reasonable efforts to provide reliable website development services.
                </p>
                <p>However, VedaPlus will not be liable for:</p>
                <ul>
                  <li>Losses caused by incorrect information provided by clients.</li>
                  <li>Third-party hosting or domain failures.</li>
                  <li>Unauthorized website modifications.</li>
                  <li>Business losses, lost revenue, or missed opportunities arising from website use.</li>
                  <li>Issues caused by external software, plugins, APIs, or service providers.</li>
                </ul>
                <p>
                  Nothing in these terms excludes liability that cannot legally be excluded under applicable law.
                </p>
              </div>
            </article>

            {/* 14. Prohibited Use */}
            <article className={styles.policyCard} id="section-14">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>14</span>
                <h2 className={styles.sectionTitle}>14. Prohibited Use</h2>
              </div>
              <div className={styles.cardBody}>
                <p>Clients must not use websites developed by VedaPlus for:</p>
                <ul>
                  <li>Illegal activities or fraudulent purposes.</li>
                  <li>Copyright infringement or unauthorized distribution of content.</li>
                  <li>Phishing, malware, or other malicious activities.</li>
                  <li>Any activity prohibited by applicable Indian law.</li>
                </ul>
                <p>
                  VedaPlus reserves the right to refuse or discontinue services involving unlawful activities.
                </p>
              </div>
            </article>

            {/* 15. Privacy and Data Protection */}
            <article className={styles.policyCard} id="section-15">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>15</span>
                <h2 className={styles.sectionTitle}>15. Privacy and Data Protection</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  VedaPlus respects user privacy and handles personal information according to its Privacy Policy.
                </p>
                <p>
                  Information submitted through contact forms, WhatsApp, email, or other communication channels may be used to respond to inquiries and provide requested services.
                </p>
                <p>
                  Please refer to our Privacy Policy for additional information.
                </p>
              </div>
            </article>

            {/* 16. Changes to Terms */}
            <article className={styles.policyCard} id="section-16">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>16</span>
                <h2 className={styles.sectionTitle}>16. Changes to Terms</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  VedaPlus reserves the right to update or modify these Terms &amp; Conditions at any time.
                </p>
                <p>
                  Updated terms will be published on this page with a revised update date. Continued use of our website and services after such changes will be subject to the updated terms, to the extent permitted by applicable law.
                </p>
              </div>
            </article>

            {/* 17. Governing Law and Jurisdiction */}
            <article className={styles.policyCard} id="section-17">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>17</span>
                <h2 className={styles.sectionTitle}>17. Governing Law and Jurisdiction</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  These Terms &amp; Conditions shall be governed by the laws of India.
                </p>
                <p>
                  Any disputes arising from the use of our website or services shall be subject to the jurisdiction of the competent courts in Pune, Maharashtra, subject to applicable law.
                </p>
              </div>
            </article>

            {/* 18. Contact Information */}
            <article className={styles.policyCard} id="section-18">
              <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>18</span>
                <h2 className={styles.sectionTitle}>18. Contact Information</h2>
              </div>
              <div className={styles.cardBody}>
                <p>
                  For questions, concerns, or clarification regarding these Terms &amp; Conditions, please contact us.
                </p>

                <div className={styles.contactGrid}>
                  <div className={styles.contactField}>
                    <span className={styles.contactFieldLabel}>Company</span>
                    <span className={styles.contactFieldValue}>VedaPlus</span>
                  </div>

                  <div className={styles.contactField}>
                    <span className={styles.contactFieldLabel}>Website</span>
                    <span className={styles.contactFieldValue}>
                      <a href="https://vedaplus-website.vercel.app/" target="_blank" rel="noopener noreferrer">
                        vedaplus-website.vercel.app
                      </a>
                    </span>
                  </div>

                  <div className={styles.contactField}>
                    <span className={styles.contactFieldLabel}>Email</span>
                    <span className={styles.contactFieldValue}>
                      <a href="mailto:vedaplus76@gmail.com">vedaplus76@gmail.com</a>
                    </span>
                  </div>

                  <div className={styles.contactField}>
                    <span className={styles.contactFieldLabel}>Phone / WhatsApp</span>
                    <span className={styles.contactFieldValue}>
                      <a href="tel:+919503956026">+91 9503956026</a> / <a href="tel:+919226115976">+91 9226115976</a> / <a href="tel:+919762874676">+91 9762874676</a>
                    </span>
                  </div>

                  <div className={styles.contactField} style={{ gridColumn: '1 / -1' }}>
                    <span className={styles.contactFieldLabel}>Location</span>
                    <span className={styles.contactFieldValue}>
                      Opp. Rajgurunagar Sarkari Bank, Rajgurunagar, Khed, Pune, Maharashtra – 410505, India
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Navigation Actions */}
            <div className={styles.bottomNavActions}>
              <Link to="/" className={styles.backHomeBtn}>
                <ArrowLeft size={18} />
                <span>Return to Home</span>
              </Link>

              <Link to="/contact" className={styles.contactLegalBtn}>
                <MessageSquare size={18} />
                <span>Contact Legal / Support Desk</span>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
