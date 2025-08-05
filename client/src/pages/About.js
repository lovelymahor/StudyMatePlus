import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About StudyMatePlus</h1>
            <p className="hero-subtitle">
              Empowering students with comprehensive academic resources and fostering 
              a collaborative learning environment for exam preparation success.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
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
            </div>
            <div className="mission-visual">
              <div className="mission-icon">🎯</div>
              <div className="mission-stats">
                <div className="mini-stat">
                  <span className="stat-num">50+</span>
                  <span className="stat-text">Universities</span>
                </div>
                <div className="mini-stat">
                  <span className="stat-num">1000+</span>
                  <span className="stat-text">Resources</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story">
        <div className="container">
          <h2>Our Story</h2>
          <div className="story-content">
            <div className="story-card">
              <div className="story-icon">💡</div>
              <h3>The Problem</h3>
              <p>
                Students often struggle to find authentic academic materials scattered across 
                different sources. Critical resources like syllabus PDFs, previous year papers, 
                and exam insights are either unavailable or difficult to access when needed most.
              </p>
            </div>
            <div className="story-card">
              <div className="story-icon">🚀</div>
              <h3>The Solution</h3>
              <p>
                StudyMatePlus was born from the idea of creating a centralized, reliable platform 
                where students can access all their academic needs. We've built a community-driven 
                ecosystem that grows stronger with each contribution.
              </p>
            </div>
            <div className="story-card">
              <div className="story-icon">🌟</div>
              <h3>The Vision</h3>
              <p>
                We envision a future where every student, regardless of their background, has 
                equal access to quality educational resources and mentorship opportunities. 
                Our open-source approach ensures transparency and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="features-deep">
        <div className="container">
          <h2>What Makes Us Different</h2>
          <div className="features-deep-grid">
            <div className="feature-deep">
              <div className="feature-deep-header">
                <div className="feature-deep-icon">📚</div>
                <h3>Comprehensive Resource Library</h3>
              </div>
              <p>
                Our platform hosts an extensive collection of study materials organized by 
                university and department. From detailed syllabi to comprehensive notes, 
                we ensure students have everything they need in one place.
              </p>
              <ul>
                <li>Department-wise organization</li>
                <li>Searchable content database</li>
                <li>Regular updates and verification</li>
                <li>Multiple format support</li>
              </ul>
            </div>

            <div className="feature-deep">
              <div className="feature-deep-header">
                <div className="feature-deep-icon">📝</div>
                <h3>Previous Year Papers Archive</h3>
              </div>
              <p>
                Access to authentic previous year question papers is crucial for exam preparation. 
                Our curated collection spans multiple years and universities, giving students 
                the practice they need to excel.
              </p>
              <ul>
                <li>Multi-year paper collection</li>
                <li>Solution guides available</li>
                <li>Difficulty level indicators</li>
                <li>Topic-wise categorization</li>
              </ul>
            </div>

            <div className="feature-deep">
              <div className="feature-deep-header">
                <div className="feature-deep-icon">💬</div>
                <h3>Real Student Feedback</h3>
              </div>
              <p>
                Learn from the experiences of students who have already taken the exams. 
                Our feedback system provides insights into exam patterns, difficulty levels, 
                and preparation strategies.
              </p>
              <ul>
                <li>Authentic student reviews</li>
                <li>Exam difficulty ratings</li>
                <li>Important topic highlights</li>
                <li>Preparation time estimates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="container">
          <h2>Built by Students, for Students</h2>
          <div className="team-content">
            <p className="team-description">
              StudyMatePlus is developed and maintained by a passionate team of students and 
              recent graduates who understand the challenges of exam preparation. Our diverse 
              team brings together expertise in technology, education, and user experience 
              to create the best possible platform for academic success.
            </p>
            <div className="team-stats">
              <div className="team-stat">
                <span className="team-stat-number">15+</span>
                <span className="team-stat-label">Contributors</span>
              </div>
              <div className="team-stat">
                <span className="team-stat-number">24/7</span>
                <span className="team-stat-label">Community Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Values Section */}
      <section className="values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🔓</div>
              <h3>Open Source</h3>
              <p>Transparency and community collaboration drive our development.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🎓</div>
              <h3>Quality Education</h3>
              <p>We're committed to providing accurate, verified, and high-quality resources.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤲</div>
              <h3>Accessibility</h3>
              <p>Education should be accessible to everyone, regardless of their circumstances.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💪</div>
              <h3>Student Empowerment</h3>
              <p>We believe in empowering students with the tools they need to succeed.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🌱</div>
              <h3>Continuous Growth</h3>
              <p>Our platform evolves based on student feedback and emerging needs.</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>Building a supportive network where students help each other succeed.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Study Experience?</h2>
            <p>
              Join thousands of students who are already using StudyMatePlus to ace their exams. 
              Start exploring our resources today and connect with a supportive community of learners.
            </p>
            <div className="cta-buttons">
              <Link to="/syllabus" className="btn btn-primary">Explore Resources</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;