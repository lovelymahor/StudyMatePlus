import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaSearch, FaChevronDown, FaChevronUp, FaArrowUp,
  FaBook, FaQuestionCircle, FaLifeRing, FaEnvelope,
  FaGithub, FaLinkedin, FaDiscord,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./HelpCenter.css";
import "./ScrollToTop.css";

/* ─── Animation Variants ─────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const staggerFast = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const slideInLeft  = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } } };
const slideInRight = { hidden: { opacity: 0, x:  50 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } } };

/* ─── Data ───────────────────────────────────────────────────── */
const categories = [
  {
    id: "getting-started",
    icon: "🚀",
    label: "Getting Started",
    faqs: [
      { q: "What is StudyMatePlus?", a: "StudyMatePlus is an open-source academic resource hub for students — providing syllabus, PYQs, notes, mind maps, analytics, and community-driven tools, completely free." },
      { q: "Do I need to create an account?", a: "No account is required to browse resources. Creating a profile lets you save notes, track tasks, and personalize your experience." },
      { q: "Which browsers are supported?", a: "StudyMatePlus works on all modern browsers — Chrome, Firefox, Edge, and Safari. We recommend keeping your browser updated for the best experience." },
      { q: "Is the platform free to use?", a: "Yes! Every feature on StudyMatePlus is completely free. We believe in equal access to quality academic resources for every student." },
    ],
  },
  {
    id: "resources",
    icon: "📚",
    label: "Resources & Content",
    faqs: [
      { q: "What resources are available?", a: "You get access to syllabus documents, Previous Year Questions (PYQs), student notes, study guides, and analytics on the most-accessed materials — all organized by branch and semester." },
      { q: "Which engineering branches are supported?", a: "Currently CSE, ECE, ME, and CE are supported. More branches are being added as contributors onboard. Check the Contribute page to help add yours!" },
      { q: "How do I find resources for a specific subject?", a: "Use the Syllabus or Notes page and filter by branch and semester. You can also use the search bar on any resource page to find specific topics." },
      { q: "Can I download notes and PYQs?", a: "Yes, all resources are freely downloadable. Click the download icon on any resource card to save it locally." },
    ],
  },
  {
    id: "contributing",
    icon: "🤝",
    label: "Contributing",
    faqs: [
      { q: "How can I contribute my notes or PYQs?", a: "Head to the Contribute page, fill in the resource details, and upload your file. All submissions are reviewed by the community before going live." },
      { q: "Can I contribute as a developer?", a: "Absolutely! StudyMatePlus is open-source on GitHub. Fork the repo, pick an issue labeled 'good first issue', and submit a PR. See CONTRIBUTING.md for the full guide." },
      { q: "What file formats are accepted for uploads?", a: "We accept PDF, DOCX, and image files (PNG/JPG). PDFs are recommended for the best viewing experience across devices." },
      { q: "Will I get credit for my contributions?", a: "Yes! Contributors are acknowledged on the About page and GitHub contributors list. Open-source contributions also look great on your portfolio." },
    ],
  },
  {
    id: "tools",
    icon: "🛠️",
    label: "Platform Tools",
    faqs: [
      { q: "What is the Mind Map tool?", a: "The Mind Map Editor lets you visually organize topics and concepts using an interactive drag-and-drop canvas. Great for revision and structuring complex subjects." },
      { q: "How does the Task/Todo feature work?", a: "The Tasks page lets you create, manage, and track study tasks. Add deadlines, mark tasks complete, and stay on top of your study schedule." },
      { q: "What does the Analytics page show?", a: "Analytics displays usage statistics like most-downloaded resources, trending topics, and community activity — helping you identify what peers find most valuable." },
      { q: "How do I submit feedback about the platform?", a: "Use the Feedback page to rate your experience, report issues, or share suggestions. You can also submit directly via the Submit Feedback form." },
    ],
  },
  {
    id: "account",
    icon: "👤",
    label: "Account & Privacy",
    faqs: [
      { q: "How do I edit my profile?", a: "Click your avatar in the top-right navbar to go to your Profile page where you can update your display name and preferences." },
      { q: "Does StudyMatePlus collect personal data?", a: "We collect minimal data necessary to provide the service. Please read our Privacy Policy for a full breakdown of what we collect and how it is used." },
      { q: "How is my data protected?", a: "All data is stored securely on MongoDB Atlas with encrypted connections. We never sell personal data to third parties." },
      { q: "Can I delete my account?", a: "Yes, account deletion can be requested by contacting us at support@studymateplus.com. All personal data will be removed within 7 days." },
    ],
  },
];

const quickLinks = [
  { icon: <FaBook />,           label: "Browse Syllabus", to: "/syllabus", color: "#3b82f6" },
  { icon: <FaQuestionCircle />, label: "View FAQs",        to: "/faq",      color: "#8b5cf6" },
  { icon: <FaLifeRing />,       label: "Contact Support",  to: "/contact",  color: "#10b981" },
  { icon: <FaEnvelope />,       label: "Send Feedback",    to: "/feedback", color: "#f59e0b" },
];

/* ─── Component ──────────────────────────────────────────────── */
const HelpCenter = () => {
  const [query, setQuery]                   = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [openMap, setOpenMap]               = useState({});
  const [showScroll, setShowScroll]         = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const filteredCategories = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        faqs: cat.faqs.filter(
          ({ q: question, a }) =>
            (question || "").toLowerCase().includes(q) ||
            a.toLowerCase().includes(q) ||
            cat.label.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.faqs.length > 0);
  }, [query]);

  const displayedCategories = activeCategory
    ? filteredCategories.filter((c) => c.id === activeCategory)
    : filteredCategories;

  const toggleFaq = (catId, idx) => {
    const key = `${catId}-${idx}`;
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalResults = displayedCategories.reduce((s, c) => s + c.faqs.length, 0);

  return (
    <div className="help-page">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="help-hero">
        <div className="help-hero-container">
          <motion.div
            className="help-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
          >
            <span className="help-hero-badge">Help Center</span>
            <h1 className="help-hero-title">
              How can we <span className="help-brand">help you?</span>
            </h1>
            <p className="help-hero-subtitle">
              Search our knowledge base, browse categories, or reach out to our support team.
            </p>

            <div className="help-search-wrapper">
              <FaSearch className="help-search-icon" />
              <input
                id="help-search-input"
                className="help-search-input"
                type="text"
                placeholder="Search for answers, guides, features…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setActiveCategory(null); }}
                aria-label="Search help topics"
              />
              {query && (
                <button
                  className="help-search-clear"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {query && (
              <p className="help-search-meta">
                {totalResults > 0
                  ? `Found ${totalResults} result${totalResults !== 1 ? "s" : ""} for "${query}"`
                  : `No results for "${query}"`}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Quick Links ───────────────────────────────────────── */}
      <section className="help-quicklinks-section">
        <div className="help-container">
          <motion.div
            className="help-quicklinks-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
          >
            {quickLinks.map(({ icon, label, to, color }) => (
              <motion.div key={to} variants={fadeInUp}>
                <Link to={to} className="help-quicklink-card" style={{ "--accent": color }}>
                  <span className="help-quicklink-icon" style={{ color }}>{icon}</span>
                  <span className="help-quicklink-label">{label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Category Pills ────────────────────────────────────── */}
      <section className="help-categories-section">
        <div className="help-container">
          <motion.h2
            className="help-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Browse by Category
          </motion.h2>
          <motion.div
            className="help-pills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerFast}
          >
            <motion.button
              variants={fadeInUp}
              id="help-cat-all"
              className={`help-pill${!activeCategory ? " active" : ""}`}
              onClick={() => setActiveCategory(null)}
            >
              🗂️ All Topics
            </motion.button>
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                id={`help-cat-${cat.id}`}
                variants={fadeInUp}
                className={`help-pill${activeCategory === cat.id ? " active" : ""}`}
                onClick={() => { setActiveCategory(cat.id); setQuery(""); }}
              >
                {cat.icon} {cat.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ Accordions ────────────────────────────────────── */}
      <section className="help-faq-section">
        <div className="help-container">
          {displayedCategories.length === 0 ? (
            <motion.div
              className="help-empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="help-empty-icon">🔍</span>
              <p>No results found. Try a different search or browse a category.</p>
              <button
                className="help-pill active"
                onClick={() => { setQuery(""); setActiveCategory(null); }}
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            displayedCategories.map((cat) => (
              <motion.div
                key={cat.id}
                className="help-faq-group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={staggerChildren}
              >
                <motion.h3 className="help-faq-group-title" variants={fadeInUp}>
                  <span className="help-faq-group-icon">{cat.icon}</span>
                  {cat.label}
                </motion.h3>

                {cat.faqs.map((item, idx) => {
                  const key    = `${cat.id}-${idx}`;
                  const isOpen = !!openMap[key];
                  return (
                    <motion.div
                      key={key}
                      className={`help-faq-item${isOpen ? " open" : ""}`}
                      variants={fadeInUp}
                    >
                      <button
                        id={`faq-btn-${cat.id}-${idx}`}
                        className="help-faq-question"
                        onClick={() => toggleFaq(cat.id, idx)}
                        aria-expanded={isOpen}
                      >
                        <span>{item.q}</span>
                        <span className="help-faq-chevron">
                          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            className="help-faq-answer"
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <p>{item.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* ── Contact / Support ─────────────────────────────────── */}
      <section className="help-contact-section">
        <div className="help-container">
          <motion.div
            className="help-contact-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="help-contact-text">
              <h2>Still need help?</h2>
              <p>
                Can't find what you're looking for? Our team is happy to assist.
                Reach out at{" "}
                <a href="mailto:support@studymateplus.com">support@studymateplus.com</a>
                {" "}or use the form below.
              </p>
            </div>

            <form
              id="help-contact-form"
              className="help-contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Message sent! We'll get back to you shortly.");
                e.target.reset();
              }}
            >
              <div className="help-form-row">
                <div className="help-form-group">
                  <label htmlFor="help-name">Your Name</label>
                  <input id="help-name" type="text" placeholder="Alex Johnson" required />
                </div>
                <div className="help-form-group">
                  <label htmlFor="help-email">Email Address</label>
                  <input id="help-email" type="email" placeholder="alex@example.com" required />
                </div>
              </div>
              <div className="help-form-group">
                <label htmlFor="help-topic">Topic</label>
                <select id="help-topic">
                  <option value="">Select a topic…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="help-form-group">
                <label htmlFor="help-message">Message</label>
                <textarea
                  id="help-message"
                  rows={5}
                  placeholder="Describe your issue or question…"
                  required
                />
              </div>
              <button id="help-submit-btn" type="submit" className="help-submit-btn">
                Send Message 🚀
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <motion.footer
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.div className="footer-content" variants={staggerChildren}>
            <motion.div className="footer-section" variants={slideInLeft}>
              <h3>📚 StudyMatePlus</h3>
              <p>Empowering students with comprehensive academic resources and peer-to-peer learning.</p>
              <div className="social-links">
                <a href="https://github.com/lovelymahor/StudyMatePlus" target="_blank" rel="noopener noreferrer" className="social-icon github"><FaGithub /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin"><FaLinkedin /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter"><FaXTwitter /></a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon discord"><FaDiscord /></a>
              </div>
            </motion.div>

            <motion.div className="footer-section" variants={fadeInUp}>
              <h4>Quick Links</h4>
              <motion.ul variants={staggerFast}>
                {[
                  { to: "/syllabus", text: "Syllabus" },
                  { to: "/pyqs",     text: "Previous Papers" },
                  { to: "/feedback", text: "Feedback" },
                  { to: "/notes",    text: "Notes" },
                ].map((l) => (
                  <motion.li key={l.to} variants={fadeInUp} whileHover={{ x: 5, color: "#3b82f6" }}>
                    <Link to={l.to}>{l.text}</Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div className="footer-section" variants={slideInRight}>
              <h4>Support</h4>
              <motion.ul variants={staggerFast}>
                {[
                  { to: "/help",       text: "Help Center" },
                  { to: "/contact",    text: "Contact Us" },
                  { to: "/contribute", text: "Contribute" },
                  { to: "/privacy",    text: "Privacy Policy" },
                ].map((l) => (
                  <motion.li key={l.to} variants={fadeInUp} whileHover={{ x: 5, color: "#3b82f6" }}>
                    <Link to={l.to}>{l.text}</Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          <motion.div className="footer-bottom" variants={fadeInUp}>
            <p>© {new Date().getFullYear()} StudyMatePlus. Open-source educational platform for students.</p>
          </motion.div>
        </div>
      </motion.footer>

      {/* ── Scroll to Top ─────────────────────────────────────── */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scrollTop"
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpCenter;
