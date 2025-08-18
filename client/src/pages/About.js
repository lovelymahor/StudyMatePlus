import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  // Animation Variants from Home.js
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };
  
  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
            <motion.h1 variants={fadeInUp}>About StudyMatePlus</motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp}>
              Empowering students with comprehensive academic resources and fostering 
              a collaborative learning environment for exam preparation success.
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
                At StudyMatePlus, we believe that every student deserves access to quality 
                educational resources. Our mission is to democratize exam preparation by 
                creating an open-source platform that brings together syllabus materials, 
                previous year questions, exam feedback, and peer-to-peer learning opportunities.
              </p>
              <p>
                We're committed to breaking down barriers in education and ensuring that 
                geographical limitations or resource constraints don't hinder a student's 
                academic success.
              </p>
            </motion.div>
            <motion.div className="mission-visual" variants={slideInRight}>
              <div className="mission-icon">🎯</div>
              <motion.div className="mission-stats" variants={staggerChildren}>
                <motion.div className="mini-stat" variants={scaleIn}>
                  <span className="stat-num">50+</span>
                  <span className="stat-text">Universities</span>
                </motion.div>
                <motion.div className="mini-stat" variants={scaleIn}>
                  <span className="stat-num">1000+</span>
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
          <motion.h2 variants={fadeInUp}>Our Story</motion.h2>
          <motion.div className="story-content" variants={staggerChildren}>
            <motion.div className="story-card" variants={scaleIn} whileHover={{ y: -8, scale: 1.03 }}>
              <div className="story-icon">💡</div>
              <h3>The Problem</h3>
              <p>
                Students often struggle to find authentic academic materials scattered across 
                different sources. Critical resources like syllabus PDFs, previous year papers, 
                and exam insights are either unavailable or difficult to access when needed most.
              </p>
            </motion.div>
            <motion.div className="story-card" variants={scaleIn} whileHover={{ y: -8, scale: 1.03 }}>
              <div className="story-icon">🚀</div>
              <h3>The Solution</h3>
              <p>
                StudyMatePlus was born from the idea of creating a centralized, reliable platform 
                where students can access all their academic needs. We've built a community-driven 
                ecosystem that grows stronger with each contribution.
              </p>
            </motion.div>
            <motion.div className="story-card" variants={scaleIn} whileHover={{ y: -8, scale: 1.03 }}>
              <div className="story-icon">🌟</div>
              <h3>The Vision</h3>
              <p>
                We envision a future where every student, regardless of their background, has 
                equal access to quality educational resources and mentorship opportunities. 
                Our open-source approach ensures transparency and continuous improvement.
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
          <motion.h2 variants={fadeInUp}>What Makes Us Different</motion.h2>
          <motion.div className="features-deep-grid" variants={staggerChildren}>
            <motion.div className="feature-deep" variants={fadeInUp} whileHover={{ y: -8, scale: 1.02 }}>
              <div className="feature-deep-header"><div className="feature-deep-icon">📚</div><h3>Comprehensive Resource Library</h3></div>
              <p>Our platform hosts an extensive collection of study materials organized by university and department. From detailed syllabi to comprehensive notes, we ensure students have everything they need in one place.</p>
              <ul><li>Department-wise organization</li><li>Searchable content database</li><li>Regular updates and verification</li><li>Multiple format support</li></ul>
            </motion.div>
            <motion.div className="feature-deep" variants={fadeInUp} whileHover={{ y: -8, scale: 1.02 }}>
              <div className="feature-deep-header"><div className="feature-deep-icon">📝</div><h3>Previous Year Papers Archive</h3></div>
              <p>Access to authentic previous year question papers is crucial for exam preparation. Our curated collection spans multiple years and universities, giving students the practice they need to excel.</p>
              <ul><li>Multi-year paper collection</li><li>Solution guides available</li><li>Difficulty level indicators</li><li>Topic-wise categorization</li></ul>
            </motion.div>
            <motion.div className="feature-deep" variants={fadeInUp} whileHover={{ y: -8, scale: 1.02 }}>
              <div className="feature-deep-header"><div className="feature-deep-icon">💬</div><h3>Real Student Feedback</h3></div>
              <p>Learn from the experiences of students who have already taken the exams. Our feedback system provides insights into exam patterns, difficulty levels, and preparation strategies.</p>
              <ul><li>Authentic student reviews</li><li>Exam difficulty ratings</li><li>Important topic highlights</li><li>Preparation time estimates</li></ul>
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
          <motion.h2 variants={fadeInUp}>Built by Students, for Students</motion.h2>
          <motion.div className="team-content" variants={fadeInUp}>
            <p className="team-description">
              StudyMatePlus is developed and maintained by a passionate team of students and 
              recent graduates who understand the challenges of exam preparation. Our diverse 
              team brings together expertise in technology, education, and user experience 
              to create the best possible platform for academic success.
            </p>
            <motion.div className="team-stats" variants={staggerChildren}>
              <motion.div className="team-stat" variants={scaleIn}><span className="team-stat-number">15+</span><span className="team-stat-label">Contributors</span></motion.div>
              <motion.div className="team-stat" variants={scaleIn}><span className="team-stat-number">24/7</span><span className="team-stat-label">Community Support</span></motion.div>
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
          <motion.h2 variants={fadeInUp}>Our Core Values</motion.h2>
          <motion.div className="values-grid" variants={staggerChildren}>
            <motion.div className="value-item" variants={scaleIn} whileHover={{ y: -8, scale: 1.05 }}><div className="value-icon">🔓</div><h3>Open Source</h3><p>Transparency and community collaboration drive our development.</p></motion.div>
            <motion.div className="value-item" variants={scaleIn} whileHover={{ y: -8, scale: 1.05 }}><div className="value-icon">🎓</div><h3>Quality Education</h3><p>We're committed to providing accurate, verified, and high-quality resources.</p></motion.div>
            <motion.div className="value-item" variants={scaleIn} whileHover={{ y: -8, scale: 1.05 }}><div className="value-icon">🤲</div><h3>Accessibility</h3><p>Education should be accessible to everyone, regardless of their circumstances.</p></motion.div>
            <motion.div className="value-item" variants={scaleIn} whileHover={{ y: -8, scale: 1.05 }}><div className="value-icon">💪</div><h3>Student Empowerment</h3><p>We believe in empowering students with the tools they need to succeed.</p></motion.div>
            <motion.div className="value-item" variants={scaleIn} whileHover={{ y: -8, scale: 1.05 }}><div className="value-icon">🌱</div><h3>Continuous Growth</h3><p>Our platform evolves based on student feedback and emerging needs.</p></motion.div>
            <motion.div className="value-item" variants={scaleIn} whileHover={{ y: -8, scale: 1.05 }}><div className="value-icon">🤝</div><h3>Community</h3><p>Building a supportive network where students help each other succeed.</p></motion.div>
          </motion.div>
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
            <motion.h2 variants={fadeInUp}>Ready to Transform Your Study Experience?</motion.h2>
            <motion.p variants={fadeInUp}>
              Join thousands of students who are already using StudyMatePlus to ace their exams. 
              Start exploring our resources today and connect with a supportive community of learners.
            </motion.p>
            <motion.div className="cta-buttons" variants={fadeInUp}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/syllabus" className="btn btn-primary">Explore Resources</Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;