import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../theme/ThemeProvider";
import { FaMoon, FaSun, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const user = {
  avatar: "https://avatar.iran.liara.run/public/boy",
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/syllabus", label: "Syllabus" },
    { to: "/notes", label: "Notes" },
    { to: "/pyqs", label: "PYQs" },
    { to: "/analytics", label: "Analytics" },
    { to: "/tasks", label: "Tasks" },
    { to: "/mindmap", label: "Mind Map" },
    { to: "/feedback", label: "Feedback" },
    { to: "/faq", label: "FAQs" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <img
            src="/logo.png"
            alt="StudyMatePlus"
            className="navbar-logo"
          />
        </Link>

        {/* Desktop Links - Hidden on Mobile */}
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className="navbar-link">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-right">
          <button
            aria-label="Toggle theme"
            className="navbar-theme-toggle"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FaSun className="sun-icon" /> : <FaMoon className="moon-icon" />}
          </button>

          <Link to="/profile" className="navbar-profile-link" onClick={closeMobileMenu}>
            <img
              src={user.avatar}
              alt="Profile"
              className="navbar-profile-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <FaUserCircle className="navbar-profile-fallback" style={{ display: 'none', fontSize: '2rem', color: 'var(--muted)' }} />
          </Link>

          <button
            className="navbar-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`navbar-menu-mobile ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="navbar-links-mobile">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className="navbar-link-mobile"
                onClick={closeMobileMenu}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
