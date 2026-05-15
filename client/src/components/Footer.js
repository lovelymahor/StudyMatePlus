import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <motion.footer 
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
    >
      <div className="container">
        <div className="footer-content">
          {/* Left Section */}
          <div className="footer-section main-info">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="StudyMatePlus Logo" />
              <span>StudyMatePlus</span>
            </Link>
            <p>Empowering students with comprehensive academic resources and peer-to-peer learning.</p>
            <div className="social-links">
              <a href="https://github.com/lovelymahor/StudyMatePlus" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)"><FaXTwitter /></a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord"><FaDiscord /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/syllabus">Syllabus</Link></li>
              <li><Link to="/pyqs">Previous Papers</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
              <li><Link to="/mindmap">Mind Map</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/contribute">Contribute</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} StudyMatePlus. Open-source educational platform for students.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
