import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.github.com/repos/lovelymahor/StudyMatePlus/contributors")
      .then((response) => setContributors(response.data))
      .catch((error) => console.error("Error fetching contributors", error));
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="brand-highlight">StudyMatePlus</span>
            </h1>
            <p className="hero-subtitle">
              Your one-stop destination for academic resources, previous year
              questions, and connecting with seniors for exam preparation
              success.
            </p>
            <div className="hero-buttons">
              <Link to="/syllabus" className="btn btn-primary">
                Browse Syllabus
              </Link>
              <Link to="/pyqs" className="btn btn-secondary">
                Previous Papers
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">
              <span className="card-icon">📚</span>
              <span className="card-text">Study Materials</span>
            </div>
            <div className="floating-card">
              <span className="card-icon">📝</span>
              <span className="card-text">Previous Papers</span>
            </div>
            <div className="floating-card">
              <span className="card-icon">🎓</span>
              <span className="card-text">Senior Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose StudyMatePlus?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Organized Syllabus</h3>
              <p>
                Department-wise syllabus collection with easy navigation and
                search functionality.
              </p>
              <Link to="/syllabus" className="feature-link">
                Explore Syllabus →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Previous Year Papers</h3>
              <p>
                Comprehensive collection of PYQs from multiple universities and
                departments.
              </p>
              <Link to="/pyqs" className="feature-link">
                Browse PYQs →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Exam Feedback</h3>
              <p>
                Real student feedback on difficulty levels, important topics,
                and exam patterns.
              </p>
              <Link to="/feedback" className="feature-link">
                Read Feedback →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Study Materials</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Universities</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Previous Papers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">200+</div>
              <div className="stat-label">Active Mentors</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How StudyMatePlus Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Your Department</h3>
              <p>
                Select your university and department to access relevant study
                materials.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Browse Resources</h3>
              <p>
                Explore syllabus, previous papers, and feedback from fellow
                students.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Connect & Learn</h3>
              <p>
                Get guidance from seniors and share your own exam experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Students Say</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <p>
                "StudyMatePlus helped me organize my entire semester. I wish I
                had found this earlier!"
              </p>
              <h4>— Priya Sharma, B.Tech CSE</h4>
            </div>
            <div className="testimonial-card">
              <p>
                "Thanks to the previous papers section, I was able to focus on
                the most important topics."
              </p>
              <h4>— Rahul Meena, BBA</h4>
            </div>
            <div className="testimonial-card">
              <p>
                "The senior guidance feature is a game-changer. Got great tips
                and motivation."
              </p>
              <h4>— Ayesha Khan, B.Sc Physics</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Ace Your Exams?</h2>
            <p>
              Join thousands of students who are already using StudyMatePlus for
              their exam preparation.
            </p>
            <div className="cta-buttons">
              <Link to="/syllabus" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="contributors">
        <div className="container">
          <h2 className="section-title">Our Contributors</h2>
          <div className="contributors-grid">
            {contributors.map((contributor) => (
              <a
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="contributor-card"
              >
                <img src={contributor.avatar_url} alt={contributor.login} />
                <p>{contributor.login}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>📚 StudyMatePlus</h3>
              <p>
                Empowering students with comprehensive academic resources and
                peer-to-peer learning.
              </p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/syllabus">Syllabus</Link>
                </li>
                <li>
                  <Link to="/pyqs">Previous Papers</Link>
                </li>
                <li>
                  <Link to="/feedback">Feedback</Link>
                </li>
                <li>
                  <Link to="/mentorship">Mentorship</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li>
                  <Link to="/help">Help Center</Link>
                </li>
                <li>
                  <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link to="/contribute">Contribute</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; 2024 StudyMatePlus. Open-source educational platform for
              students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
