import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDiscord , FaArrowUp} from "react-icons/fa";
import { SiX } from "react-icons/si";
import logo from "./logo.png";


import "./Home.css";

const Home = () => {
  const [contributors, setContributors] = useState([]);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/lovelymahor/StudyMatePlus/contributors")
      .then((response) => setContributors(response.data))
      .catch((error) => console.error("Error fetching contributors", error));
  }, []);



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

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};



  

  // Animation variants
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

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section 
        className="hero"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="hero-container">
          <motion.div className="hero-content" variants={slideInLeft}>
            <motion.h1 className="hero-title" variants={fadeInUp}>
              Welcome to <span className="brand-highlight">StudyMatePlus</span>
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              variants={fadeInUp}
            >
              Your one-stop destination for academic resources, previous year
              questions, and connecting with seniors for exam preparation
              success.
            </motion.p>
            <motion.div 
              className="hero-buttons"
              variants={staggerChildrenFast}
            >
              <motion.div variants={scaleIn}>
                <Link to="/syllabus" className="btn btn-primary-home">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse Syllabus
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div variants={scaleIn}>
                <Link to="/pyqs" className="btn btn-secondary">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Previous Papers
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="hero-image"
            variants={slideInRight}
          >
            <motion.div 
              className="floating-card"
              variants={bounceIn}
              {...floatingAnimation}
              style={{ animationDelay: '0s' }}
            >
              <span className="card-icon">📚</span>
              <span className="card-text">Study Materials</span>
            </motion.div>
            <motion.div 
              className="floating-card"
              variants={bounceIn}
              animate={{
                y: [0, -15, 0],
                transition: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }}
            >
              <span className="card-icon">📝</span>
              <span className="card-text">Previous Papers</span>
            </motion.div>
            <motion.div 
              className="floating-card"
              variants={bounceIn}
              animate={{
                y: [0, -12, 0],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }}
            >
              <span className="card-icon">🎓</span>
              <span className="card-text">Senior Guidance</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={fadeInUp}>
            Why Choose StudyMatePlus?
          </motion.h2>
          <motion.div className="features-grid" variants={staggerChildren}>
            {[
              {
                icon: "📋",
                title: "Organized Syllabus",
                description: "Department-wise syllabus collection with easy navigation and search functionality.",
                link: "/syllabus",
                linkText: "Explore Syllabus →"
              },
              {
                icon: "📄",
                title: "Previous Year Papers",
                description: "Comprehensive collection of PYQs from multiple universities and departments.",
                link: "/pyqs",
                linkText: "Browse PYQs →"
              },
              {
                icon: "💬",
                title: "Exam Feedback",
                description: "Real student feedback on difficulty levels, important topics, and exam patterns.",
                link: "/feedback",
                linkText: "Read Feedback →"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-card"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="feature-icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link to={feature.link} className="feature-link">
                    {feature.linkText}
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="stats"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.div className="stats-grid" variants={staggerChildrenFast}>
            {[
              { number: "500+", label: "Study Materials" },
              { number: "50+", label: "Universities" },
              { number: "1000+", label: "Previous Papers" },
              { number: "200+", label: "Active Mentors" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="stat-item"
                variants={bounceIn}
                whileHover={{ scale: 1.05, y: -5 }}
                {...pulseAnimation}
              >
                <motion.div 
                  className="stat-number"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <motion.div 
                  className="stat-label"
                  variants={fadeInUp}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="how-it-works"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={fadeInUp}>
            How StudyMatePlus Works
          </motion.h2>
          <motion.div className="steps-grid" variants={staggerChildren}>
            {[
              {
                number: "1",
                title: "Choose Your Department",
                description: "Select your university and department to access relevant study materials."
              },
              {
                number: "2",
                title: "Browse Resources",
                description: "Explore syllabus, previous papers, and feedback from fellow students."
              },
              {
                number: "3",
                title: "Connect & Learn",
                description: "Get guidance from seniors and share your own exam experiences."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="step"
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="step-number"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.number}
                </motion.div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="testimonials"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={fadeInUp}>
            What Students Say
          </motion.h2>
          <motion.div className="testimonial-grid" variants={staggerChildren}>
            {[
              {
                quote: "StudyMatePlus helped me organize my entire semester. I wish I had found this earlier!",
                author: "— Priya Sharma, B.Tech CSE"
              },
              {
                quote: "Thanks to the previous papers section, I was able to focus on the most important topics.",
                author: "— Rahul Meena, BBA"
              },
              {
                quote: "The senior guidance feature is a game-changer. Got great tips and motivation.",
                author: "— Ayesha Khan, B.Sc Physics"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial-card"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  "{testimonial.quote}"
                </motion.p>
                <motion.h4
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {testimonial.author}
                </motion.h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.div className="cta-content" variants={staggerChildren}>
            <motion.h2 variants={fadeInUp}>Ready to Ace Your Exams?</motion.h2>
            <motion.p variants={fadeInUp}>
              Join thousands of students who are already using StudyMatePlus for
              their exam preparation.
            </motion.p>
            <motion.div className="cta-buttons" variants={staggerChildrenFast}>
              <motion.div variants={scaleIn}>
                <Link to="/syllabus" className="btn btn-primary">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div variants={scaleIn}>
                <Link to="/about" className="btn btn-outline">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contributors Section */}
      <motion.section 
        className="contributors"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={fadeInUp}>
            Our Contributors
          </motion.h2>
          <motion.div className="contributors-grid" variants={staggerChildren}>
            <AnimatePresence>
              {contributors.map((contributor, index) => (
                <motion.a
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contributor-card"
                  variants={scaleIn}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img 
                    src={contributor.avatar_url} 
                    alt={contributor.login}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  >
                    {contributor.login}
                  </motion.p>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}

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
    <FaArrowUp/>
    </motion.button>
  )}
</AnimatePresence>

    </div>
  );
};

export default Home;