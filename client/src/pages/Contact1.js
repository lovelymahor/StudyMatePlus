import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDiscord, FaArrowUp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import './Contact1.css';
import './ScrollToTop.css';
import logo from "./logo.png";
import "./Home.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
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

  const bounceIn = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        bounce: 0.4
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const [showScroll, setShowScroll] = useState(false);

   useEffect(() => {
      const checkScrollTop = () => {
        if (!showScroll && window.scrollY > 300) {
          setShowScroll(true);
        } else if (showScroll && window.scrollY <= 300) {
          setShowScroll(false);
        }
      };
  
      window.addEventListener("scroll", checkScrollTop);
      return () => {
        window.removeEventListener("scroll", checkScrollTop);
      };
    }, [showScroll]);


  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero glass-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            We'd love to hear from you. Send us a message and we'll respond as soon as
            possible.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-content glass-container">

            {/* Contact Info (Left Side) */}
            <div className="contact-info glass-card">
              <h2>Let's Connect</h2>

              <div className="info-item">
                <div className="info-icon">
                  <img src={require('./email.png')} alt="email" />
                </div>
                <div className="info-content">
                  <p>support@studymateplus.com</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <img src={require('./call.png')} alt="phone" />
                </div>
                <div className="info-content">
                  {/* <h3>Phone</h3> */}
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <img src={require('./pin.png')} alt="location" />
                </div>
                <div className="info-content">
                  {/* <h3>Address</h3> */}
                  <p>
                    123 Education Street
                    <br />
                    Learning City, LC 12345
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <img src={require('./clock.png')} alt="clock" />
                </div>
                <div className="info-content">
                  {/* <h3>Business Hours</h3> */}
                  <p>
                    Monday - Friday
                    <br />
                    9:00 AM - 6:00 PM IST
                  </p>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon"><img src={require('./facebook.png')} alt="" /></a>
                  <a href="#" className="social-icon"><img src={require('./twitter.png')} alt="" /></a>
                  <a href="#" className="social-icon"><img src={require('./linkedin.png')} alt="" /></a>
                  <a href="#" className="social-icon"><img src={require('./instagram.png')} alt="" /></a>
                </div>
              </div>
            </div>

            {/* Contact Form (Right Side) */}
            <div className="contact-form-container glass-card">
              <h2>Send us a message</h2>

              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Message sent successfully!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section glass-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>How quickly will you respond?</h3>
              <p>We typically respond to all inquiries within 24 hours during business days.</p>
            </div>

            <div className="faq-item">
              <h3>Can I request specific study materials?</h3>
              <p>Absolutely! Let us know what materials you need and we'll help you find them.</p>
            </div>

            <div className="faq-item">
              <h3>How do I report a problem?</h3>
              <p>
                Use the contact form above or email us directly at support@studymateplus.com
              </p>
            </div>
          </div>
        </div>
      </section>




      {/* Footer */}
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
                      <a href="https://github.com/lovelymahor/StudyMatePlus" target="_blank" rel="noopener noreferrer" className="social-icon github">
                        <FaGithub />
                      </a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                        <FaLinkedin />
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                        <FaXTwitter />
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
      
            {/* Scroll to Top Button */}
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
                >
                  <FaArrowUp />
                </motion.button>
              )}
            </AnimatePresence>
    </div>
  );
};

export default Contact;