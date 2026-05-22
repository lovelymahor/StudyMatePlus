import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowUp } from 'react-icons/fa';
import './About.css';
import './ScrollToTop.css';

const sectionViewport = { once: true, margin: '-100px' };

const sectionIntroStyle = {
  maxWidth: '42rem',
  margin: '-1.5rem auto 2.5rem',
  textAlign: 'center',
  color: 'var(--about-muted)',
  lineHeight: 1.75,
  fontSize: 'clamp(0.96rem, 2vw, 1.04rem)',
};

const missionStats = [
  { value: '50+', label: 'Universities' },
  { value: '1000+', label: 'Resources' },
];

const storyItems = [
  {
    icon: '\u{1F4A1}',
    title: 'The Problem',
    text: 'Students often lose valuable time searching across scattered sources for reliable syllabi, past papers, and exam insights.',
  },
  {
    icon: '\u{1F680}',
    title: 'The Solution',
    text: 'StudyMatePlus brings those essentials together in one trusted space, making preparation simpler, faster, and more collaborative.',
  },
  {
    icon: '\u{1F31F}',
    title: 'The Vision',
    text: 'We are building a future where every student can access quality resources, shared guidance, and support without barriers.',
  },
];

const featureItems = [
  {
    icon: '\u{1F4DA}',
    title: 'Comprehensive Resource Library',
    description:
      'Study materials are organized by university and department, so students can find what they need quickly and study with less friction.',
    highlights: [
      'Department-wise organization',
      'Searchable content database',
      'Regular updates and verification',
      'Multiple format support',
    ],
  },
  {
    icon: '\u{1F4DD}',
    title: 'Previous Year Papers Archive',
    description:
      'Authentic past papers help students understand exam patterns, manage difficulty, and prepare with more confidence.',
    highlights: [
      'Multi-year paper collection',
      'Solution guides available',
      'Difficulty level indicators',
      'Topic-wise categorization',
    ],
  },
  {
    icon: '\u{1F4AC}',
    title: 'Real Student Feedback',
    description:
      'Students can learn from firsthand exam experiences, practical preparation advice, and honest reflections from their peers.',
    highlights: [
      'Authentic student reviews',
      'Exam difficulty ratings',
      'Important topic highlights',
      'Preparation time estimates',
    ],
  },
];

const teamStats = [
  { value: '15+', label: 'Contributors' },
  { value: '24/7', label: 'Community Support' },
];

const valueItems = [
  {
    icon: '\u{1F513}',
    title: 'Open Source',
    text: 'Transparency and collaboration guide how we build and improve the platform.',
  },
  {
    icon: '\u{1F393}',
    title: 'Quality Education',
    text: 'We focus on verified, useful, and practical resources that genuinely help students prepare.',
  },
  {
    icon: '\u267F',
    title: 'Accessibility',
    text: "Educational support should be easier to reach, no matter a student's location or background.",
  },
  {
    icon: '\u{1F4AA}',
    title: 'Student Empowerment',
    text: 'We want students to feel equipped, informed, and confident in their academic journey.',
  },
  {
    icon: '\u{1F331}',
    title: 'Continuous Growth',
    text: 'The platform keeps evolving through feedback, contribution, and changing student needs.',
  },
  {
    icon: '\u{1F91D}',
    title: 'Community',
    text: 'We believe strong student communities make learning more supportive, practical, and motivating.',
  },
];

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const storyHover = { y: -8, scale: 1.03 };
  const featureHover = { y: -8, scale: 1.02 };
  const valueHover = { y: -8, scale: 1.05 };
  const buttonHover = { scale: 1.05 };
  const buttonTap = { scale: 0.95 };

  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <main className="about" aria-labelledby="about-page-title">
      {/* Hero Section */}
      <motion.section
        className="about-hero"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        aria-labelledby="about-page-title"
      >
        <div className="container">
          <motion.header className="about-hero-content" variants={fadeInUp}>
            <motion.h1 id="about-page-title" variants={fadeInUp}>
              About StudyMatePlus
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeInUp}>
              Helping students prepare smarter with trusted study resources,
              shared exam insights, and a supportive learning community.
            </motion.p>
          </motion.header>
        </div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="mission"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerChildren}
        aria-labelledby="mission-heading"
      >
        <div className="container">
          <div className="mission-content">
            <motion.div className="mission-text" variants={slideInLeft}>
              <h2 id="mission-heading">Our Mission</h2>
              <p>
                StudyMatePlus makes exam preparation more open, organized, and
                accessible. We bring syllabus guides, previous year papers,
                feedback, and peer learning into one reliable place.
              </p>
              <p>
                We want students to spend less time searching for materials and
                more time learning with clarity, confidence, and community
                support.
              </p>
            </motion.div>

            <motion.div className="mission-visual" variants={slideInRight}>
              <div className="mission-icon" aria-hidden="true">
                {'\u{1F3AF}'}
              </div>
              <motion.div
                className="mission-stats"
                variants={staggerChildren}
                role="list"
                aria-label="StudyMatePlus reach"
              >
                {missionStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="mini-stat"
                    variants={scaleIn}
                    role="listitem"
                  >
                    <span className="stat-num">{stat.value}</span>
                    <span className="stat-text">{stat.label}</span>
                  </motion.div>
                ))}
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
        viewport={sectionViewport}
        variants={staggerChildren}
        aria-labelledby="story-heading"
        aria-describedby="story-intro"
      >
        <div className="container">
          <header>
            <motion.h2 id="story-heading" variants={fadeInUp}>
              Our Story
            </motion.h2>
            <motion.p id="story-intro" variants={fadeInUp} style={sectionIntroStyle}>
              StudyMatePlus started with a simple goal: make important academic
              resources easier to find, trust, and share.
            </motion.p>
          </header>

          <motion.div className="story-content" variants={staggerChildren}>
            {storyItems.map((item) => (
              <motion.article
                key={item.title}
                className="story-card"
                variants={scaleIn}
                whileHover={storyHover}
              >
                <div className="story-icon" aria-hidden="true">
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Deep Dive */}
      <motion.section
        className="features-deep"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerChildren}
        aria-labelledby="features-heading"
        aria-describedby="features-intro"
      >
        <div className="container">
          <header>
            <motion.h2 id="features-heading" variants={fadeInUp}>
              What Makes Us Different
            </motion.h2>
            <motion.p
              id="features-intro"
              variants={fadeInUp}
              style={sectionIntroStyle}
            >
              Everything we build is designed to reduce prep time, improve
              clarity, and help students study with more confidence.
            </motion.p>
          </header>

          <motion.div className="features-deep-grid" variants={staggerChildren}>
            {featureItems.map((feature) => (
              <motion.article
                key={feature.title}
                className="feature-deep"
                variants={fadeInUp}
                whileHover={featureHover}
              >
                <div className="feature-deep-header">
                  <div className="feature-deep-icon" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3>{feature.title}</h3>
                </div>
                <p>{feature.description}</p>
                <ul>
                  {feature.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="team"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerChildren}
        aria-labelledby="team-heading"
        aria-describedby="team-intro"
      >
        <div className="container">
          <motion.div className="team-content" variants={fadeInUp}>
            <header>
              <motion.h2 id="team-heading" variants={fadeInUp}>
                Built by Students, for Students
              </motion.h2>
              <p id="team-intro" className="team-description">
                StudyMatePlus is shaped by students and recent graduates who
                understand the pressure of exam season. That perspective helps
                us build a platform that feels practical, supportive, and easy
                to use.
              </p>
            </header>

            <motion.div
              className="team-stats"
              variants={staggerChildren}
              role="list"
              aria-label="StudyMatePlus team highlights"
            >
              {teamStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="team-stat"
                  variants={scaleIn}
                  role="listitem"
                >
                  <span className="team-stat-number">{stat.value}</span>
                  <span className="team-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="values"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={staggerChildren}
        aria-labelledby="values-heading"
        aria-describedby="values-intro"
      >
        <div className="container">
          <header>
            <motion.h2 id="values-heading" variants={fadeInUp}>
              Our Core Values
            </motion.h2>
            <motion.p id="values-intro" variants={fadeInUp} style={sectionIntroStyle}>
              These principles shape how we build the product, support the
              community, and grow alongside students.
            </motion.p>
          </header>

          <motion.div className="values-grid" variants={staggerChildren} role="list">
            {valueItems.map((value) => (
              <motion.article
                key={value.title}
                className="value-item"
                variants={scaleIn}
                whileHover={valueHover}
                role="listitem"
              >
                <div className="value-icon" aria-hidden="true">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="about-cta"
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
        variants={fadeInUp}
        aria-labelledby="cta-heading"
        aria-describedby="cta-copy"
      >
        <div className="container">
          <motion.div className="cta-content" variants={staggerChildren}>
            <motion.h2 id="cta-heading" variants={fadeInUp}>
              Ready to Transform Your Study Experience?
            </motion.h2>
            <motion.p id="cta-copy" variants={fadeInUp}>
              Explore curated resources, learn from real student insights, and
              study alongside a community that wants you to succeed.
            </motion.p>
            <motion.div className="cta-buttons" variants={fadeInUp}>
              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Link
                  to="/syllabus"
                  className="btn btn-primary"
                  aria-label="Explore study resources on StudyMatePlus"
                >
                  Explore Study Resources
                </Link>
              </motion.div>

              <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                <Link
                  to="/contribute"
                  className="btn btn-secondary"
                  aria-label="Join the StudyMatePlus contributor community"
                >
                  Join the Community
                </Link>
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
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Scroll back to top"
            title="Back to top"
          >
            <FaArrowUp aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
};

export default About;
