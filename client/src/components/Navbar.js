import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

const user = {
  avatar: "https://avatar.iran.liara.run/public/boy",
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img
            src="/logo.png"
            alt="StudyMatePlus Logo"
            className="navbar-logo"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/syllabus" className="navbar-link">
              Syllabus
            </Link>
          </li>
          <li>
            <Link to="/notes" className="navbar-link">
              Notes
            </Link>
          </li>
          <li>
            <Link to="/pyqs" className="navbar-link">
              PYQs
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="navbar-link">
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/mindmap" className="navbar-link">
              Mind Map
            </Link>
          </li>
          <li>
            <Link to="/feedback" className="navbar-link">
              Feedback
            </Link>
          </li>
          <li>
            <Link to="/faq" className="navbar-link">
              FAQs
            </Link>
          </li>
          <li className="navbar-profile-item">
            <Link to="/profile" className="navbar-profile-link">
              <img
                src={user.avatar}
                alt="User Profile"
                className="navbar-profile-img"
              />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="navbar-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-menu-mobile ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="navbar-links-mobile">
          <li>
            <Link
              to="/"
              className="navbar-link-mobile"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/syllabus"
              className="navbar-link-mobile"
              onClick={toggleMobileMenu}
            >
              Syllabus
            </Link>
          </li>
          <li>
            <Link
              to="/pyqs"
              className="navbar-link-mobile"
              onClick={toggleMobileMenu}
            >
              PYQs
            </Link>
          </li>
          <li>
            <Link
              to="/feedback"
              className="navbar-link-mobile"
              onClick={toggleMobileMenu}
            >
              Feedback
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="navbar-link-mobile"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
