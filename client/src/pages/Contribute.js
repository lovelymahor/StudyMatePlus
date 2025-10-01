import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contribute.css';
import './ScrollToTop.css';

const Contribute = () => {
  const [activeStep, setActiveStep] = useState(1);

  const contributionSteps = [
    {
      step: 1,
      title: "Fork the Repository",
      description: "Create your own copy of the StudyMatePlus repository",
      code: "# Click the 'Fork' button on our GitHub repository",
      details: [
        "Navigate to our GitHub repository",
        "Click the 'Fork' button in the top right corner",
        "This creates a copy under your GitHub account",
        "You now have full control over your fork"
      ]
    },
    {
      step: 2,
      title: "Clone Your Fork",
      description: "Download your forked repository to your local machine",
      code: "git clone https://github.com/lovelymahor/StudyMatePlus.git\ncd studymateplus",
      details: [
        "Open your terminal or command prompt",
        "Run the clone command with your fork's URL",
        "This downloads the code to your computer",
        "Navigate into the project directory",
        "You're now ready to make changes locally"
      ]
    },
    {
      step: 3,
      title: "Create a New Branch",
      description: "Create a dedicated branch for your contribution",
      code: "git checkout -b feature/your-feature-name\n# or\ngit checkout -b fix/issue-description",
      details: [
        "Use descriptive branch names",
        "Prefix with 'feature/' for new features",
        "Prefix with 'fix/' for bug fixes",
        "Keep branch names concise but meaningful"
      ]
    },
    {
      step: 4,
      title: "Make Your Changes",
      description: "Implement your feature or fix the issue",
      code: "npm install  # Install dependencies\nnpm start    # Test your changes locally",
      details: [
        "Follow our coding standards and conventions",
        "Write clean, readable, and well-documented code",
        "Test your changes thoroughly",
        "Ensure all existing tests pass"
      ]
    },
    {
      step: 5,
      title: "Commit Your Changes",
      description: "Save your changes with a meaningful commit message",
      code: "git add .\ngit commit -m \"Add: Brief description of your changes\"\n# Use prefixes: Add:, Fix:, Update:, Remove:",
      details: [
        "Write clear and concise commit messages",
        "Use conventional commit format",
        "Explain what and why, not just what",
        "Keep commits atomic and focused"
      ]
    },
    {
      step: 6,
      title: "Push and Create PR",
      description: "Upload your changes and create a Pull Request",
      code: "git push origin feature/your-feature-name\n# Then create PR on GitHub",
      details: [
        "Push your branch to your fork",
        "Go to GitHub and create a Pull Request",
        "Fill out the PR template completely",
        "Link any related issues"
      ]
    }
  ];

  const techStack = [
    {
      area: "Frontend",
      technologies: [
        { name: "React.js", version: "18.x", description: "UI library for building user interfaces" },
        { name: "Next.js", version: "13.x+", description: "Full-stack React framework" }
      ]
    },
    {
      area: "Backend", 
      technologies: [
        { name: "Node.js", version: "18.x+", description: "JavaScript runtime environment" },
        { name: "Express", version: "4.x", description: "Web application framework" },
        { name: "Firebase", version: "9.x", description: "Backend-as-a-Service platform" }
      ]
    },
    {
      area: "Database",
      technologies: [
        { name: "MongoDB", version: "5.x+", description: "NoSQL document database" },
        { name: "Firebase Firestore", version: "9.x", description: "Cloud NoSQL database" }
      ]
    }
  ];

  const contributionTypes = [
    {
      icon: "💻",
      title: "Code Contributions",
      description: "Add features, fix bugs, improve performance",
      examples: ["New components", "Bug fixes", "Performance optimizations", "Test coverage"]
    },
    {
      icon: "📖",
      title: "Documentation",
      description: "Improve docs, write tutorials, create guides",
      examples: ["API documentation", "User guides", "Code comments", "README improvements"]
    },
    {
      icon: "🎨",
      title: "Design & UI/UX",
      description: "Enhance user interface and experience",
      examples: ["UI improvements", "Accessibility features", "Mobile responsiveness", "Design systems"]
    },
    {
      icon: "📊",
      title: "Content & Data",
      description: "Add study materials, verify information",
      examples: ["Syllabus content", "Previous papers", "University data", "Subject materials"]
    },
    {
      icon: "🐛",
      title: "Testing & QA",
      description: "Find bugs, write tests, improve quality",
      examples: ["Bug reports", "Test cases", "User testing", "Quality assurance"]
    },
    {
      icon: "🌐",
      title: "Translation",
      description: "Help make StudyMatePlus multilingual",
      examples: ["Malayalam translation", "Hindi support", "Regional languages", "Localization"]
    }
  ];

  const codeOfConductRules = [
    {
      icon: "🤝",
      title: "Be Respectful",
      description: "Treat everyone with respect and kindness, regardless of background or experience level."
    },
    {
      icon: "🎯",
      title: "Stay Focused",
      description: "Keep discussions relevant to the project and maintain constructive conversations."
    },
    {
      icon: "📚",
      title: "Help Others Learn",
      description: "Share knowledge, mentor newcomers, and create an inclusive learning environment."
    },
    {
      icon: "⚡",
      title: "Quality First",
      description: "Prioritize code quality, documentation, and user experience in all contributions."
    }
  ];

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
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  // Removed unused fadeIn variant (was defined but not applied anywhere)

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

  return (
    <div className="contribute">
      {/* Hero Section */}
      <motion.section 
        className="contribute-hero"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="container">
          <div className="contribute-hero-content">
            <motion.h1
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              🤝 Contribute to StudyMatePlus
            </motion.h1>
            <motion.p 
              className="hero-subtitle"
              variants={fadeInUp}
              transition={{ delay: 0.3 }}
            >
              Join our mission to democratize education! Help us build the ultimate 
              platform for student resources and make a real impact on thousands of lives.
            </motion.p>
            <motion.div 
              className="hero-stats"
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              {[
                { number: "7+", label: "Contributors" },
                { number: "30+", label: "Commits" },
                { number: "15+", label: "Universities" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="hero-stat"
                  variants={bounceIn}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Project Overview */}
      <motion.section 
        className="project-overview"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <div className="overview-content">
            <motion.div className="overview-text" variants={slideInLeft}>
              <h2>Why Your Contribution Matters</h2>
              <p>
                StudyMatePlus isn't just another educational platform – it's a movement to make 
                quality academic resources accessible to every student, regardless of their 
                geographical location or economic background.
              </p>
              <p>
                Every line of code you write, every bug you fix, and every improvement you suggest 
                directly impacts thousands of students preparing for their exams. Your contribution 
                becomes part of a larger mission to level the educational playing field.
              </p>
              <motion.div 
                className="impact-metrics"
                variants={staggerChildren}
              >
                {[
                  { icon: "👥", number: "10,000+", desc: "Students Helped" },
                  { icon: "📚", number: "1,000+", desc: "Resources Added" },
                  { icon: "🎓", number: "85%", desc: "Success Rate" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="impact-item"
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="impact-icon">{item.icon}</div>
                    <div className="impact-text">
                      <span className="impact-number">{item.number}</span>
                      <span className="impact-desc">{item.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="overview-visual"
              variants={slideInRight}
            >
              <div className="contribution-types-preview">
                <h3>Ways to Contribute</h3>
                {contributionTypes.slice(0, 3).map((type, index) => (
                  <motion.div 
                    key={index} 
                    className="contrib-type-mini"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="contrib-icon-mini">{type.icon}</span>
                    <span className="contrib-title-mini">{type.title}</span>
                  </motion.div>
                ))}
                <motion.div 
                  className="contrib-more"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  +3 more ways
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contribution Types */}
      <motion.section 
        className="contribution-types"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>How You Can Contribute</motion.h2>
          <motion.div className="contrib-grid" variants={staggerChildren}>
            {contributionTypes.map((type, index) => (
              <motion.div 
                key={index} 
                className="contrib-card"
                variants={scaleIn}
                whileHover={{ 
                  scale: 1.03, 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="contrib-header">
                  <motion.div 
                    className="contrib-icon"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {type.icon}
                  </motion.div>
                  <h3>{type.title}</h3>
                </div>
                <p className="contrib-description">{type.description}</p>
                <div className="contrib-examples">
                  <h4>Examples:</h4>
                  <ul>
                    {type.examples.map((example, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {example}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Step-by-Step Guide */}
      <motion.section 
      className="contribution-guide"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="container">
        <motion.h2 variants={fadeInUp}>Step-by-Step Contribution Guide</motion.h2>
        <motion.p 
          className="guide-subtitle"
          variants={fadeInUp}
        >
          Follow these steps to make your first contribution to StudyMatePlus
        </motion.p>
        
        <div className="steps-container">
          <motion.div 
            className="steps-nav"
            variants={slideInLeft}
          >
            {contributionSteps.map((step, index) => (
              <motion.button
                key={step.step}
                className={`step-nav-button ${activeStep === step.step ? 'active' : ''}`}
                onClick={() => setActiveStep(step.step)}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  x: 5,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="step-number"
                  whileHover={{ scale: 1.1 }}
                >
                  {step.step}
                </motion.span>
                <span className="step-title">{step.title}</span>
              </motion.button>
            ))}
          </motion.div>
          
          <div className="step-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                className="step-details active"
                initial={{ opacity: 0, x: 30, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.98 }}
                transition={{ 
                  duration: 0.4, 
                  ease: "easeInOut",
                  scale: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="step-header"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <h3>Step {contributionSteps[activeStep - 1].step}: {contributionSteps[activeStep - 1].title}</h3>
                  <p>{contributionSteps[activeStep - 1].description}</p>
                </motion.div>
                
                {contributionSteps[activeStep - 1].code && (
                  <motion.div 
                    className="code-block"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    whileHover={{ 
                      scale: 1.01,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="code-header">
                      <span className="code-lang">Terminal</span>
                      <motion.button 
                        className="copy-button"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(59, 130, 246, 0.1)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        📋 Copy
                      </motion.button>
                    </div>
                    <pre><code>{contributionSteps[activeStep - 1].code}</code></pre>
                  </motion.div>
                )}
                
                <motion.div 
                  className="step-details-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <h4>Details:</h4>
                  <motion.ul
                    variants={staggerChildren}
                    initial="hidden"
                    animate="visible"
                  >
                    {contributionSteps[activeStep - 1].details.map((detail, idx) => (
                      <motion.li 
                        key={idx}
                        variants={fadeInUp}
                        whileHover={{ 
                          x: 5,
                          color: "#3b82f6",
                          transition: { duration: 0.2 }
                        }}
                      >
                        {detail}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>

      {/* Tech Stack */}
      <motion.section 
        className="tech-stack"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Tech Stack & Prerequisites</motion.h2>
          <motion.p className="tech-subtitle" variants={fadeInUp}>
            Familiarize yourself with our technology stack before contributing
          </motion.p>
          
          <motion.div className="tech-categories" variants={staggerChildren}>
            {techStack.map((category, index) => (
              <motion.div 
                key={index} 
                className="tech-category"
                variants={scaleIn}
                whileHover={{ y: -5 }}
              >
                <h3 className="category-title">{category.area}</h3>
                <div className="tech-items">
                  {category.technologies.map((tech, idx) => (
                    <motion.div 
                      key={idx} 
                      className="tech-item"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.02)" }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="tech-info">
                        <span className="tech-name">{tech.name}</span>
                        <span className="tech-version">{tech.version}</span>
                      </div>
                      <span className="tech-description">{tech.description}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div className="prerequisites" variants={fadeInUp}>
            <h3>Prerequisites</h3>
            <motion.div className="prereq-grid" variants={staggerChildren}>
              {[
                {
                  icon: "💻",
                  title: "Basic Knowledge",
                  desc: "Familiarity with React, JavaScript, and Git version control"
                },
                {
                  icon: "🔧",
                  title: "Development Environment",
                  desc: "Node.js 18+, npm 8+, and your favorite code editor"
                },
                {
                  icon: "🌐",
                  title: "GitHub Account",
                  desc: "Required for forking the repository and submitting pull requests"
                },
                {
                  icon: "⏰",
                  title: "Time Commitment",
                  desc: "Even 15-30 minutes of your time can make a meaningful contribution"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="prereq-item"
                  variants={scaleIn}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span 
                    className="prereq-icon"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {item.icon}
                  </motion.span>
                  <div className="prereq-content">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Code of Conduct */}
      <motion.section 
        className="code-of-conduct"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Code of Conduct</motion.h2>
          <motion.p className="conduct-subtitle" variants={fadeInUp}>
            We are committed to providing a welcoming and inclusive environment for all contributors
          </motion.p>
          
          <motion.div className="conduct-rules" variants={staggerChildren}>
            {codeOfConductRules.map((rule, index) => (
              <motion.div 
                key={index} 
                className="conduct-rule"
                variants={slideInLeft}
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="rule-icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {rule.icon}
                </motion.div>
                <div className="rule-content">
                  <h3>{rule.title}</h3>
                  <p>{rule.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div className="conduct-links" variants={fadeInUp}>
            <motion.a 
              href="https://github.com/lovelymahor/StudyMatePlus/blob/main/CODE_OF_CONDUCT.md" 
              className="conduct-link"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              📖 Read Full Code of Conduct
            </motion.a>
            <motion.a 
              href="https://github.com/lovelymahor/StudyMatePlus/issues/new?labels=code+of+conduct+violation&title=%5BCoC%5D+" 
              className="conduct-link"
              aria-label="Report a Code of Conduct violation on GitHub (opens in new tab)"
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🚨 Report a Violation
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Community Links */}
      <motion.section 
        className="community"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Join Our Community</motion.h2>
          <motion.p className="community-subtitle" variants={fadeInUp}>
            Connect with fellow contributors and get help when you need it
          </motion.p>
          
          <motion.div className="community-links" variants={staggerChildren}>
            {[
              {
                href: "https://github.com/studymateplus/studymateplus",
                className: "github",
                icon: "🐙",
                title: "GitHub Repository",
                desc: "View code, report issues, and submit pull requests"
              },
              {
                href: "https://github.com/lovelymahor/StudyMatePlus/discussions",
                className: "discord",
                icon: "💬",
                title: "Community Discussions",
                desc: "Ask questions and chat with contributors (GitHub Discussions)"
              },
              {
                href: "https://github.com/lovelymahor/StudyMatePlus/discussions/categories/announcements",
                className: "telegram",
                icon: "📱",
                title: "Announcements Feed",
                desc: "Project updates and release notes (GitHub)"
              }
            ].map((link, index) => (
              <motion.a 
                key={index}
                href={link.href} 
                className={`community-link ${link.className}`}
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="community-icon"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {link.icon}
                </motion.div>
                <div className="community-content">
                  <h3>{link.title}</h3>
                  <p>{link.desc}</p>
                  <motion.span 
                    className="link-arrow"
                    whileHover={{ x: 5 }}
                  >
                    →
                  </motion.span>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Documentation Links */}
      <motion.section 
        className="documentation"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.h2 variants={fadeInUp}>Important Documentation</motion.h2>
          <motion.div className="docs-grid" variants={staggerChildren}>
            {[
              {
                icon: "📋",
                title: "CONTRIBUTING.md",
                desc: "Detailed contribution guidelines and best practices",
                href: "https://github.com/lovelymahor/StudyMatePlus?tab=contributing-ov-file",
                linkText: "Read Guidelines →"
              },
              {
                icon: "🏗️",
                title: "Architecture Guide",
                desc: "Understand the project structure and design patterns",
                href: "https://github.com/lovelymahor/StudyMatePlus?tab=readme-ov-file",
                linkText: "View Architecture →"
              }
            ].map((doc, index) => (
              <motion.div 
                key={index}
                className="doc-card"
                variants={scaleIn}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div 
                  className="doc-icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                >
                  {doc.icon}
                </motion.div>
                <h3>{doc.title}</h3>
                <p>{doc.desc}</p>
                <motion.a 
                  href={doc.href} 
                  className="doc-link"
                  whileHover={{ x: 5 }}
                >
                  {doc.linkText}
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="contribute-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.div className="cta-content" variants={staggerChildren}>
            <motion.h2 variants={fadeInUp}>Ready to Make Your First Contribution?</motion.h2>
            <motion.p variants={fadeInUp}>
              Join hundreds of contributors who are helping make education accessible to everyone. 
              Every contribution, no matter how small, makes a difference!
            </motion.p>
            <motion.div className="cta-buttons" variants={staggerChildren}>
              <motion.a 
                href="https://github.com/lovelymahor/StudyMatePlus" 
                className="btn btn-primary"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Start Contributing
              </motion.a>
              <motion.a 
                href="https://github.com/lovelymahor/StudyMatePlus/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22" 
                className="btn btn-secondary"
                aria-label="View open 'good first issue' tickets on GitHub (opens in new tab)"
                target="_blank" rel="noopener noreferrer"
                variants={scaleIn}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                📋 View Good First Issues
              </motion.a>
            </motion.div>
            <motion.div className="cta-note" variants={fadeInUp}>
              <p>
                <strong>New to open source?</strong> Check out our 
                <motion.a 
                  href="https://github.com/lovelymahor/StudyMatePlus/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"
                  aria-label="Browse beginner friendly issues on GitHub (opens in new tab)"
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                >
                  {" "}beginner-friendly issues
                </motion.a> to get started!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contribute;