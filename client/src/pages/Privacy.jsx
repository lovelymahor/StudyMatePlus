import { Link } from "react-router-dom";
import "./Privacy.css";

const Privacy = () => {
  return (
    <div className="privacy">
      {/* Hero Section */}
      <section className="privacy-hero">
        <div className="container">
          <div className="privacy-hero-content">
            <h1>Privacy Policy</h1>
            <p className="hero-subtitle">
              Your privacy matters to us. Learn how we collect, use, and protect
              your information on StudyMatePlus.
            </p>
            <div className="policy-meta">
              <span className="policy-date">Effective Date: July 6, 2025</span>
              <span className="policy-updated">Last Updated: July 6, 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="privacy-intro">
        <div className="container">
          <div className="intro-content">
            <div className="intro-icon">🔐</div>
            <h2>Our Commitment to Your Privacy</h2>
            <p>
              Welcome to StudyMatePlus (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). We are committed
              to protecting your privacy and ensuring a safe, secure experience
              when using our academic resource platform. This Privacy Policy
              explains how we collect, use, and safeguard your information.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="privacy-content">
        <div className="container">
          {/* Section 1 */}
          <div className="privacy-section">
            <div className="section-header">
              <div className="section-icon">📊</div>
              <h2>1. What Information We Collect</h2>
            </div>
            <div className="section-content">
              <p>
                We collect only the necessary information to provide you with
                the best academic experience:
              </p>

              <div className="info-categories">
                <div className="info-category">
                  <h3>Basic Account Information</h3>
                  <ul>
                    <li>Name and email address</li>
                    <li>University and department details</li>
                    <li>Academic year and course information</li>
                    <li>Profile preferences and settings</li>
                  </ul>
                </div>

                <div className="info-category">
                  <h3>Educational Content</h3>
                  <ul>
                    <li>Notes, study materials, and documents you upload</li>
                    <li>Previous year question papers you share</li>
                    <li>Exam feedback and reviews you provide</li>
                    <li>Comments and discussions in forums</li>
                  </ul>
                </div>

                <div className="info-category">
                  <h3>Communication Data</h3>
                  <ul>
                    <li>Messages in senior-junior mentorship chats</li>
                    <li>Forum posts and community interactions</li>
                    <li>Support requests and feedback</li>
                  </ul>
                </div>

                <div className="info-category">
                  <h3>Usage Analytics</h3>
                  <ul>
                    <li>Pages visited and time spent on platform</li>
                    <li>Search queries and filter preferences</li>
                    <li>Download history and resource access patterns</li>
                    <li>Device information and browser details</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="privacy-section">
            <div className="section-header">
              <div className="section-icon">🎯</div>
              <h2>2. How We Use Your Information</h2>
            </div>
            <div className="section-content">
              <p>
                We use your information exclusively to enhance your academic
                experience:
              </p>

              <div className="usage-grid">
                <div className="usage-item">
                  <div className="usage-icon">📚</div>
                  <h3>Personalized Resources</h3>
                  <p>
                    Display relevant study materials based on your department,
                    university, and academic interests.
                  </p>
                </div>

                <div className="usage-item">
                  <div className="usage-icon">🤝</div>
                  <h3>Peer Connections</h3>
                  <p>
                    Connect you with mentors, study groups, and peers in your
                    field of study.
                  </p>
                </div>

                <div className="usage-item">
                  <div className="usage-icon">🚀</div>
                  <h3>Platform Improvement</h3>
                  <p>
                    Analyze usage patterns to improve website functionality and
                    user experience.
                  </p>
                </div>

                <div className="usage-item">
                  <div className="usage-icon">🛡️</div>
                  <h3>Security & Safety</h3>
                  <p>
                    Prevent spam, abuse, and maintain a safe learning
                    environment for all users.
                  </p>
                </div>
              </div>

              <div className="important-note">
                <div className="note-icon">⚠️</div>
                <div className="note-content">
                  <h3>Important:</h3>
                  <p>
                    We <strong>never sell</strong> your personal data or share
                    it with third-party companies for marketing purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="privacy-section">
            <div className="section-header">
              <div className="section-icon">👥</div>
              <h2>3. Information Sharing & Visibility</h2>
            </div>
            <div className="section-content">
              <div className="sharing-categories">
                <div className="sharing-category">
                  <h3>🌟 Public Information</h3>
                  <ul>
                    <li>Your name and department in forum discussions</li>
                    <li>Study materials and notes you choose to share</li>
                    <li>Public reviews and feedback on exams</li>
                    <li>Profile information you make public</li>
                  </ul>
                </div>

                <div className="sharing-category">
                  <h3>🔒 Private Information</h3>
                  <ul>
                    <li>Personal chat messages remain completely private</li>
                    <li>Email addresses are never shared with other users</li>
                    <li>Private study groups and closed discussions</li>
                    <li>Personal academic performance data</li>
                  </ul>
                </div>

                <div className="sharing-category">
                  <h3>🛠️ Administrative Access</h3>
                  <ul>
                    <li>
                      Site administrators can view uploaded content for
                      moderation
                    </li>
                    <li>Reported content may be reviewed by our team</li>
                    <li>Account information for support and troubleshooting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="privacy-section">
            <div className="section-header">
              <div className="section-icon">📁</div>
              <h2>4. User-Generated Content</h2>
            </div>
            <div className="section-content">
              <p>By uploading materials to StudyMatePlus, you agree that:</p>

              <div className="content-guidelines">
                <div className="guideline-item">
                  <div className="guideline-icon">✅</div>
                  <div className="guideline-text">
                    <h3>Content Rights</h3>
                    <p>
                      You have the legal right to share the educational content
                      you upload.
                    </p>
                  </div>
                </div>

                <div className="guideline-item">
                  <div className="guideline-icon">🎓</div>
                  <div className="guideline-text">
                    <h3>Academic Use</h3>
                    <p>
                      Other students may view, download, and use your shared
                      materials for educational purposes.
                    </p>
                  </div>
                </div>

                <div className="guideline-item">
                  <div className="guideline-icon">🚫</div>
                  <div className="guideline-text">
                    <h3>Content Moderation</h3>
                    <p>
                      Inappropriate, copyrighted, or harmful content will be
                      removed from the platform.
                    </p>
                  </div>
                </div>

                <div className="guideline-item">
                  <div className="guideline-icon">🔄</div>
                  <div className="guideline-text">
                    <h3>Content Control</h3>
                    <p>
                      You can request removal of your uploaded content at any
                      time by contacting support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="privacy-section">
            <div className="section-header">
              <div className="section-icon">🔐</div>
              <h2>5. Data Security</h2>
            </div>
            <div className="section-content">
              <p>
                We implement multiple layers of security to protect your
                information:
              </p>

              <div className="security-measures">
                <div className="security-item">
                  <div className="security-icon">🔒</div>
                  <h3>Secure Authentication</h3>
                  <p>
                    Encrypted login system with secure password hashing and
                    optional two-factor authentication.
                  </p>
                </div>

                <div className="security-item">
                  <div className="security-icon">💬</div>
                  <h3>Encrypted Communications</h3>
                  <p>
                    All chat messages and file uploads are encrypted during
                    transmission and storage.
                  </p>
                </div>

                <div className="security-item">
                  <div className="security-icon">🛡️</div>
                  <h3>Regular Monitoring</h3>
                  <p>
                    Continuous security monitoring and regular updates to
                    protect against threats.
                  </p>
                </div>

                <div className="security-item">
                  <div className="security-icon">🏆</div>
                  <h3>Best Practices</h3>
                  <p>
                    Industry-standard security protocols and regular security
                    audits of our systems.
                  </p>
                </div>
              </div>

              <div className="security-disclaimer">
                <div className="disclaimer-icon">ℹ️</div>
                <div className="disclaimer-content">
                  <p>
                    <strong>Please Note:</strong> While we implement robust
                    security measures, no online system is 100% secure. We
                    recommend avoiding sharing highly sensitive personal
                    information on the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className="privacy-section">
            <div className="section-header">
              <div className="section-icon">⚖️</div>
              <h2>6. Your Privacy Rights</h2>
            </div>
            <div className="section-content">
              <p>You have complete control over your personal information:</p>

              <div className="rights-grid">
                <div className="right-item">
                  <div className="right-icon">👁️</div>
                  <h3>Access Your Data</h3>
                  <p>
                    Request a copy of all personal information we have about
                    you.
                  </p>
                </div>

                <div className="right-item">
                  <div className="right-icon">✏️</div>
                  <h3>Update Information</h3>
                  <p>
                    Modify or correct your account details and preferences at
                    any time.
                  </p>
                </div>

                <div className="right-item">
                  <div className="right-icon">🗑️</div>
                  <h3>Delete Account</h3>
                  <p>
                    Request complete deletion of your account and associated
                    data.
                  </p>
                </div>

                <div className="right-item">
                  <div className="right-icon">🚫</div>
                  <h3>Withdraw Consent</h3>
                  <p>
                    Opt out of data collection or specific platform features.
                  </p>
                </div>

                <div className="right-item">
                  <div className="right-icon">📋</div>
                  <h3>Data Portability</h3>
                  <p>Export your data in a readable format for personal use.</p>
                </div>

                <div className="right-item">
                  <div className="right-icon">🚨</div>
                  <h3>Report Issues</h3>
                  <p>
                    Report any misuse of your information or privacy concerns.
                  </p>
                </div>
              </div>

              <div className="privacy-contact-info">
                <h3>Exercise Your Rights</h3>
                <p>
                  To exercise any of these rights, contact our support team:
                </p>
                <div className="contact-methods">
                  <div className="contact-method">
                    <span className="contact-icon">📧</span>
                    <span>Email: privacy@studymateplus.com</span>
                  </div>
                  <div className="contact-method">
                    <span className="contact-icon">📞</span>
                    <span>Support: +1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 7 */}
          <div className="privacy-section">
            <div className="section-header">
              <div className="section-icon">📝</div>
              <h2>7. Policy Updates</h2>
            </div>
            <div className="section-content">
              <p>
                We may update this Privacy Policy to reflect changes in our
                practices or legal requirements:
              </p>

              <div className="update-process">
                <div className="update-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h3>Notification</h3>
                    <p>
                      We&apos;ll notify you via email and platform announcements
                      about any significant changes.
                    </p>
                  </div>
                </div>

                <div className="update-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h3>Review Period</h3>
                    <p>
                      You&apos;ll have 30 days to review changes before they take
                      effect.
                    </p>
                  </div>
                </div>

                <div className="update-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h3>Continued Use</h3>
                    <p>
                      Continued use of the platform constitutes acceptance of
                      the updated policy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 8 */}
          <div className="privacy-section">
            <div className="section-header">
              <div className="section-icon">📬</div>
              <h2>8. Contact Us</h2>
            </div>
            <div className="section-content">
              <p>
                Have questions about this Privacy Policy or your data? We&apos;re
                here to help:
              </p>

              <div className="contact-grid">
                <div className="contact-card">
                  <div className="contact-card-icon">💬</div>
                  <h3>General Inquiries</h3>
                  <p>privacy@studymateplus.com</p>
                  <p>Response time: 24-48 hours</p>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">🚨</div>
                  <h3>Data Concerns</h3>
                  <p>dataprotection@studymateplus.com</p>
                  <p>Response time: 24 hours</p>
                </div>

                <div className="contact-card">
                  <div className="contact-card-icon">🏢</div>
                  <h3>Mailing Address</h3>
                  <p>
                    StudyMatePlus Privacy Team
                    <br />
                    123 Education Street
                    <br />
                    Learning City, LC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="privacy-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Learning Safely?</h2>
            <p>
              Now that you understand how we protect your privacy, join
              thousands of students who trust StudyMatePlus with their academic
              journey.
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary">
                Create Account
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
