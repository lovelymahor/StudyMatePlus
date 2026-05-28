import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter, FaDiscord } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">

          {/* Left Section */}
          <div className="footer-section">
            <p>
              Empowering students with comprehensive academic resources
              and peer-to-peer learning.
            </p>

            <div className="social-links">
              <a
                href="https://github.com/lovelymahor/StudyMatePlus"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon github"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon linkedin"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon twitter"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon discord"
              >
                <FaDiscord />
              </a>
            </div>
          </div>

          {/* Quick Links */}
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

          {/* Support Links */}
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

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} StudyMatePlus.
            Open-source educational platform for students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;