import React, { useState } from 'react';
import './Contribute.css';

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
      code: "git clone https://github.com/YOUR-USERNAME/studymateplus.git\ncd studymateplus",
      details: [
        "Replace YOUR-USERNAME with your GitHub username",
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
      code: "# Make your code changes\nnpm install  # Install dependencies\nnpm start    # Test your changes locally",
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

  return (
    <div className="contribute">
      {/* Hero Section */}
      <section className="contribute-hero">
        <div className="container">
          <div className="contribute-hero-content">
            <h1>🤝 Contribute to StudyMatePlus</h1>
            <p className="hero-subtitle">
              Join our mission to democratize education! Help us build the ultimate 
              platform for student resources and make a real impact on thousands of lives.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">150+</span>
                <span className="stat-label">Contributors</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">2.5k+</span>
                <span className="stat-label">Commits</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Universities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="project-overview">
        <div className="container">
          <div className="overview-content">
            <div className="overview-text">
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
              <div className="impact-metrics">
                <div className="impact-item">
                  <div className="impact-icon">👥</div>
                  <div className="impact-text">
                    <span className="impact-number">10,000+</span>
                    <span className="impact-desc">Students Helped</span>
                  </div>
                </div>
                <div className="impact-item">
                  <div className="impact-icon">📚</div>
                  <div className="impact-text">
                    <span className="impact-number">1,000+</span>
                    <span className="impact-desc">Resources Added</span>
                  </div>
                </div>
                <div className="impact-item">
                  <div className="impact-icon">🎓</div>
                  <div className="impact-text">
                    <span className="impact-number">85%</span>
                    <span className="impact-desc">Success Rate</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="overview-visual">
              <div className="contribution-types-preview">
                <h3>Ways to Contribute</h3>
                {contributionTypes.slice(0, 3).map((type, index) => (
                  <div key={index} className="contrib-type-mini">
                    <span className="contrib-icon-mini">{type.icon}</span>
                    <span className="contrib-title-mini">{type.title}</span>
                  </div>
                ))}
                <div className="contrib-more">+3 more ways</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contribution Types */}
      <section className="contribution-types">
        <div className="container">
          <h2>How You Can Contribute</h2>
          <div className="contrib-grid">
            {contributionTypes.map((type, index) => (
              <div key={index} className="contrib-card">
                <div className="contrib-header">
                  <div className="contrib-icon">{type.icon}</div>
                  <h3>{type.title}</h3>
                </div>
                <p className="contrib-description">{type.description}</p>
                <div className="contrib-examples">
                  <h4>Examples:</h4>
                  <ul>
                    {type.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section className="contribution-guide">
        <div className="container">
          <h2>Step-by-Step Contribution Guide</h2>
          <p className="guide-subtitle">
            Follow these steps to make your first contribution to StudyMatePlus
          </p>
          
          <div className="steps-container">
            <div className="steps-nav">
              {contributionSteps.map((step) => (
                <button
                  key={step.step}
                  className={`step-nav-button ${activeStep === step.step ? 'active' : ''}`}
                  onClick={() => setActiveStep(step.step)}
                >
                  <span className="step-number">{step.step}</span>
                  <span className="step-title">{step.title}</span>
                </button>
              ))}
            </div>
            
            <div className="step-content">
              {contributionSteps.map((step) => (
                <div
                  key={step.step}
                  className={`step-details ${activeStep === step.step ? 'active' : ''}`}
                >
                  <div className="step-header">
                    <h3>Step {step.step}: {step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  
                  {step.code && (
                    <div className="code-block">
                      <div className="code-header">
                        <span className="code-lang">Terminal</span>
                        <button className="copy-button">📋 Copy</button>
                      </div>
                      <pre><code>{step.code}</code></pre>
                    </div>
                  )}
                  
                  <div className="step-details-list">
                    <h4>Details:</h4>
                    <ul>
                      {step.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-stack">
        <div className="container">
          <h2>Tech Stack & Prerequisites</h2>
          <p className="tech-subtitle">
            Familiarize yourself with our technology stack before contributing
          </p>
          
          <div className="tech-categories">
            {techStack.map((category, index) => (
              <div key={index} className="tech-category">
                <h3 className="category-title">{category.area}</h3>
                <div className="tech-items">
                  {category.technologies.map((tech, idx) => (
                    <div key={idx} className="tech-item">
                      <div className="tech-info">
                        <span className="tech-name">{tech.name}</span>
                        <span className="tech-version">{tech.version}</span>
                      </div>
                      <span className="tech-description">{tech.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="prerequisites">
            <h3>Prerequisites</h3>
            <div className="prereq-grid">
              <div className="prereq-item">
                <span className="prereq-icon">💻</span>
                <div className="prereq-content">
                  <h4>Basic Knowledge</h4>
                  <p>Familiarity with React, JavaScript, and Git version control</p>
                </div>
              </div>
              <div className="prereq-item">
                <span className="prereq-icon">🔧</span>
                <div className="prereq-content">
                  <h4>Development Environment</h4>
                  <p>Node.js 18+, npm 8+, and your favorite code editor</p>
                </div>
              </div>
              <div className="prereq-item">
                <span className="prereq-icon">🌐</span>
                <div className="prereq-content">
                  <h4>GitHub Account</h4>
                  <p>Required for forking the repository and submitting pull requests</p>
                </div>
              </div>
              <div className="prereq-item">
                <span className="prereq-icon">⏰</span>
                <div className="prereq-content">
                  <h4>Time Commitment</h4>
                  <p>Even 15-30 minutes of your time can make a meaningful contribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className="code-of-conduct">
        <div className="container">
          <h2>Code of Conduct</h2>
          <p className="conduct-subtitle">
            We are committed to providing a welcoming and inclusive environment for all contributors
          </p>
          
          <div className="conduct-rules">
            {codeOfConductRules.map((rule, index) => (
              <div key={index} className="conduct-rule">
                <div className="rule-icon">{rule.icon}</div>
                <div className="rule-content">
                  <h3>{rule.title}</h3>
                  <p>{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="conduct-links">
            <a href="https://github.com/lovelymahor/StudyMatePlus/blob/main/CODE_OF_CONDUCT.md" className="conduct-link">
              📖 Read Full Code of Conduct
            </a>
            <a href="#" className="conduct-link">
              🚨 Report a Violation
            </a>
          </div>
        </div>
      </section>

      {/* Community Links */}
      <section className="community">
        <div className="container">
          <h2>Join Our Community</h2>
          <p className="community-subtitle">
            Connect with fellow contributors and get help when you need it
          </p>
          
          <div className="community-links">
            <a href="https://github.com/studymateplus/studymateplus" className="community-link github">
              <div className="community-icon">🐙</div>
              <div className="community-content">
                <h3>GitHub Repository</h3>
                <p>View code, report issues, and submit pull requests</p>
                <span className="link-arrow">→</span>
              </div>
            </a>
            
            <a href="#" className="community-link discord">
              <div className="community-icon">💬</div>
              <div className="community-content">
                <h3>Discord Community</h3>
                <p>Real-time chat with contributors and maintainers</p>
                <span className="link-arrow">→</span>
              </div>
            </a>
            <a href="#" className="community-link telegram">
              <div className="community-icon">📱</div>
              <div className="community-content">
                <h3>Telegram Group</h3>
                <p>Quick updates and community announcements</p>
                <span className="link-arrow">→</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="documentation">
        <div className="container">
          <h2>Important Documentation</h2>
          <div className="docs-grid">
            <div className="doc-card">
              <div className="doc-icon">📋</div>
              <h3>CONTRIBUTING.md</h3>
              <p>Detailed contribution guidelines and best practices</p>
              <a href="https://github.com/lovelymahor/StudyMatePlus?tab=contributing-ov-file" className="doc-link">Read Guidelines →</a>
            </div>
            
            <div className="doc-card">
              <div className="doc-icon">🏗️</div>
              <h3>Architecture Guide</h3>
              <p>Understand the project structure and design patterns</p>
              <a href="https://github.com/lovelymahor/StudyMatePlus?tab=readme-ov-file" className="doc-link">View Architecture →</a>
            </div>
            
            
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contribute-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Make Your First Contribution?</h2>
            <p>
              Join hundreds of contributors who are helping make education accessible to everyone. 
              Every contribution, no matter how small, makes a difference!
            </p>
            <div className="cta-buttons">
              <a href="https://github.com/lovelymahor/StudyMatePlus" className="btn btn-primary">
                🚀 Start Contributing
              </a>
              <a href="#" className="btn btn-secondary">
                📋 View Good First Issues
              </a>
            </div>
            <div className="cta-note">
              <p>
                <strong>New to open source?</strong> Check out our 
                <a href="#"> beginner-friendly issues</a> to get started!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contribute;