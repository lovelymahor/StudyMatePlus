import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowUp, FaLightbulb, FaRocket, FaStar, FaBookOpen, FaClipboardList, FaComments, FaUnlock, FaGraduationCap, FaHandsHelping, FaCogs, FaChartLine, FaUsers, FaBullseye } from "react-icons/fa";
import './About.css';

const About = () => {
  // Enhanced Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="about">
      {/* Hero Section */}
      <motion.section
        className="about-hero"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="container">
          <motion.div className="about-hero-content" variants={fadeInUp}>
            <motion.h1 variants={fadeInUp}>Our Story. Our Vision.</motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp}>
              Redefining academic success through collaboration, transparency, and
              unrestricted access to quality educational resources.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="mission"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <div className="mission-content">
            <motion.div className="mission-text" variants={slideInLeft}>
              <h2>Our Mission</h2>
              <p>
                At StudyMatePlus, we believe that education is a right, not a privilege.
                Our platform is built on the principle of democratizing knowledge,
                ensuring every student has the tools they need to excel.
              </p>
              <p>
                We're bridging the gap between classroom teaching and exam reality
                by providing a curated, community-driven ecosystem of high-quality
                study materials and peer insights.
              </p>
            </motion.div>
            <motion.div className="mission-visual" variants={slideInRight}>
              <div className="mission-icon"><FaBullseye color="#ef4444" /></div>
              <motion.div className="mission-stats" variants={staggerChildren}>
                <motion.div className="mini-stat" variants={scaleIn}>
                  <span className="stat-num">50+</span>
                  <span className="stat-text">Universities</span>
                </motion.div>
                <motion.div className="mini-stat" variants={scaleIn}>
                  <span className="stat-num">10k+</span>
                  <span className="stat-text">Resources</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Story Section */}
      <motion.section
        className="story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Why We Started</motion.h2>
          <motion.div className="story-content" variants={staggerChildren}>
            <motion.div className="story-card" variants={fadeInUp}>
              <div className="story-icon"><FaLightbulb color="#f59e0b" /></div>
              <h3>The Challenge</h3>
              <p>
                Disorganized materials and inaccessible past papers often make exam
                preparation a source of unnecessary stress for students.
              </p>
            </motion.div>
            <motion.div className="story-card" variants={fadeInUp}>
              <div className="story-icon"><FaRocket color="#3b82f6" /></div>
              <h3>The Solution</h3>
              <p>
                A centralized, open-source hub where verified resources are
                just a click away, powered by the very community it serves.
              </p>
            </motion.div>
            <motion.div className="story-card" variants={fadeInUp}>
              <div className="story-icon"><FaStar color="#ef4444" /></div>
              <h3>The Impact</h3>
              <p>
                Empowering students to focus on learning rather than searching,
                ultimately leading to better academic outcomes and confidence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Deep Dive */}
      <motion.section
        className="features-deep"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Unmatched Functionality</motion.h2>
          <motion.div className="features-deep-grid" variants={staggerChildren}>
            <motion.div className="feature-deep" variants={fadeInUp}>
              <div className="feature-deep-header">
                <div className="feature-deep-icon"><FaBookOpen color="#6366f1" /></div>
                <h3>Resource Library</h3>
              </div>
              <p>Extensive collections of notes and syllabi organized for maximum efficiency.</p>
              <ul>
                <li>Verified by peer review</li>
                <li>Department-specific filtering</li>
                <li>Regularly updated content</li>
              </ul>
            </motion.div>
            <motion.div className="feature-deep" variants={fadeInUp}>
              <div className="feature-deep-header">
                <div className="feature-deep-icon"><FaClipboardList color="#10b981" /></div>
                <h3>Question Archives</h3>
              </div>
              <p>Access authentic previous year questions to master exam patterns.</p>
              <ul>
                <li>Spanning 10+ years</li>
                <li>Difficulty indicators</li>
                <li>Topic-wise breakdown</li>
              </ul>
            </motion.div>
            <motion.div className="feature-deep" variants={fadeInUp}>
              <div className="feature-deep-header">
                <div className="feature-deep-icon"><FaComments color="#ec4899" /></div>
                <h3>Student Insights</h3>
              </div>
              <p>Detailed feedback from students who previously aced their exams.</p>
              <ul>
                <li>Real exam strategies</li>
                <li>Time management tips</li>
                <li>Common pitfall alerts</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="team"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Built with Passion</motion.h2>
          <motion.div className="team-content" variants={fadeInUp}>
            <p className="team-description">
              Our team consists of developers and students dedicated to building
              a more equitable education system. Join our growing community of
              contributors today.
            </p>
            <motion.div className="team-stats" variants={staggerChildren}>
              <motion.div className="team-stat" variants={scaleIn}>
                <span className="team-stat-number">15+</span>
                <span className="team-stat-label">Active Contributors</span>
              </motion.div>
              <motion.div className="team-stat" variants={scaleIn}>
                <span className="team-stat-number">24/7</span>
                <span className="team-stat-label">Uptime Support</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="values"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Our Commitment</motion.h2>
          <div className="values-grid">
            <motion.div className="value-item" variants={scaleIn}>
              <div className="value-icon"><FaUnlock color="#2563eb" /></div>
              <h3>Open Source</h3>
              <p>Our code and content are open for everyone to study and improve.</p>
            </motion.div>
            <motion.div className="value-item" variants={scaleIn}>
              <div className="value-icon"><FaGraduationCap color="#7c3aed" /></div>
              <h3>Quality First</h3>
              <p>We maintain high standards for all user-contributed materials.</p>
            </motion.div>
            <motion.div className="value-item" variants={scaleIn}>
              <div className="value-icon"><FaHandsHelping color="#db2777" /></div>
              <h3>Community Driven</h3>
              <p>Decisions are made based on direct feedback from our student base.</p>
            </motion.div>
            <motion.div className="value-item" variants={scaleIn}>
              <div className="value-icon"><FaCogs color="#0891b2" /></div>
              <h3>Agile Innovation</h3>
              <p>We constantly evolve to meet the changing needs of academic exams.</p>
            </motion.div>
            <motion.div className="value-item" variants={scaleIn}>
              <div className="value-icon"><FaChartLine color="#059669" /></div>
              <h3>Scale & Growth</h3>
              <p>Regularly adding new universities and more diverse content types.</p>
            </motion.div>
            <motion.div className="value-item" variants={scaleIn}>
              <div className="value-icon"><FaUsers color="#d97706" /></div>
              <h3>Inclusive</h3>
              <p>Building a platform where every student feels represented and supported.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="about-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.div className="cta-content" variants={staggerChildren}>
            <motion.h2 variants={fadeInUp}>Start Your Journey to Success</motion.h2>
            <motion.p variants={fadeInUp}>
              Join the StudyMatePlus community today and get the edge you need for your exams.
            </motion.p>
            <motion.div className="cta-buttons" variants={fadeInUp}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/syllabus" className="btn btn-primary">Explore Now</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

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
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;