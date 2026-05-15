import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from '../pages/logo.png';
import './Footer.css';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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

  return (
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
            <img 
              src={logo} 
              alt="StudyMatePlus Logo" 
              style={{ height: "50px", marginBottom: "10px" }} 
            />
            <p>Empowering students with comprehensive academic resources and peer-to-peer learning.</p>
            {/* Social Links with Icons */}
            <div className="social-links">
              <a href="https://github.com/lovelymahor/StudyMatePlus" target="_blank" rel="noopener noreferrer" className="social-icon github" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon discord" aria-label="Discord">
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
  );
};

export default Footer;
