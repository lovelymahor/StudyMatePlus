import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Faq.css";
import { FaGithub, FaLinkedin, FaDiscord} from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiX } from "react-icons/si";

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const staggerChildrenFast = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "📘 What resources are available on StudyMatePlus?",
      a: "You can access syllabus, previous year question papers (PYQs), notes, and study guides tailored for each branch."
    },
    {
      q: "💡 Is StudyMatePlus free to use?",
      a: "Yes! All resources are completely free for students. We believe in open access to learning materials."
    },
    {
      q: "📂 Can I contribute notes or PYQs?",
      a: "Absolutely! You can submit your notes, assignments, or question papers to help others in the community."
    },
    {
      q: "🔔 How do I stay updated with new uploads?",
      a: "You can subscribe to our newsletter or enable notifications to get alerts about new resources."
    },
    {
      q: "⚙️ Which branches are supported?",
      a: "Currently, CSE, ECE, ME, and CE branches are supported. More will be added soon!"
    },
    {
      q: "❓ How can I contact support?",
      a: "Reach out to us via the Contact section at the bottom of the page or email support@studymateplus.com."
    }
  ];

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Got Questions? <span className="brand-highlight">We’ve Got Answers</span>
            </h1>
            <p className="hero-subtitle">
              Explore frequently asked questions about StudyMatePlus, resources, and features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section container">
        <h2 className="section-title">🙋 Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((item, idx) => (
            <motion.div
              key={idx}
              className={`faq-item ${openIndex === idx ? "active" : ""}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="faq-question">{item.q}</div>
              {openIndex === idx && <div className="faq-answer">{item.a}</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title">✨ Why Choose StudyMatePlus?</h2>
        <ul className="features-list">
          <li>📘 Free access to syllabus, notes, and PYQs</li>
          <li>📊 Analytics of most downloaded resources</li>
          <li>🤝 Community-driven contributions</li>
          <li>⚡ Fast and mobile-friendly platform</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section className="contact-section container">
        <h2 className="section-title">📩 Contact Us</h2>
        <p>
          Still have questions? Reach out to us at <b>support@studymateplus.com</b> or fill out the form below.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
      
        <motion.footer 
  className="footer"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
  variants={fadeInUp}
>
  <div className="container">
    <motion.div className="footer-content" variants={staggerChildren}>
      
      {/* Left Section */}
      <motion.div className="footer-section" variants={slideInLeft}>
        <h3>📚 StudyMatePlus</h3>
        <p>Empowering students with comprehensive academic resources and peer-to-peer learning.</p>

        {/* Social Links with Icons */}
        <div className="social-links">
          <a href="https://github.com/lovelymahor/StudyMatePlus" target="_blank" rel="noopener noreferrer" className="social-icon github">
            <FaGithub />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
            <FaLinkedin />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
            <SiX />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon discord">
            <FaDiscord />
          </a>
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div className="footer-section" variants={fadeInUp}>
        <h4>Quick Links</h4>
        <motion.ul variants={staggerChildrenFast}>
          {[
            { to: "/syllabus", text: "Syllabus" },
            { to: "/pyqs", text: "Previous Papers" },
            { to: "/feedback", text: "Feedback" },
            { to: "/mentorship", text: "Mentorship" }
          ].map((link, index) => (
            <motion.li key={index} variants={fadeInUp} whileHover={{ x: 5, color: "#3b82f6" }}>
              <Link to={link.to}>{link.text}</Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Support Links */}
      <motion.div className="footer-section" variants={slideInRight}>
        <h4>Support</h4>
        <motion.ul variants={staggerChildrenFast}>
          {[
            { to: "/help", text: "Help Center" },
            { to: "/contact", text: "Contact Us" },
            { to: "/contribute", text: "Contribute" },
            { to: "/privacy", text: "Privacy Policy" }
          ].map((link, index) => (
            <motion.li key={index} variants={fadeInUp} whileHover={{ x: 5, color: "#3b82f6" }}>
              <Link to={link.to}>{link.text}</Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>

    {/* Footer Bottom */}
    <motion.div className="footer-bottom" variants={fadeInUp}>
      <p>&copy; {new Date().getFullYear()} StudyMatePlus. Open-source educational platform for students.</p>
    </motion.div>
  </div>
</motion.footer>
    </div>
  );
};

export default Faq;
