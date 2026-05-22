import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../theme/ThemeProvider";
import { FaMoon, FaSun, FaChevronDown } from "react-icons/fa";

const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='avatarGrad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23818cf8'/><stop offset='100%25' stop-color='%234f46e5'/></linearGradient></defs><circle cx='16' cy='16' r='16' fill='url(%23avatarGrad)'/><circle cx='16' cy='13' r='5' fill='%23ffffff'/><path d='M7 26.5c0-4.5 3.5-8 8-8h2c4.5 0 8 3.5 8 8' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round'/></svg>";

const user = {
  avatar: null, // Set to null by default to showcase our beautiful default SVG profile image
};


// Primary links always visible in the bar
const primaryLinks = [
  { to: "/",         label: "Home"      },
  { to: "/syllabus", label: "Syllabus"  },
  { to: "/notes",    label: "Notes"     },
  { to: "/pyqs",     label: "PYQs"      },
  { to: "/feedback", label: "Feedback"  },
];

// Secondary links hidden inside "More" dropdown
const moreLinks = [
  { to: "/about",     label: "About Us"  },
  { to: "/analytics", label: "Analytics" },
  { to: "/tasks",     label: "Tasks"     },
  { to: "/mindmap",   label: "Mind Map"  },
  { to: "/faq",       label: "FAQs"      },
];

// All links for mobile menu
const allLinks = [...primaryLinks, ...moreLinks];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const currentPath = location.pathname;
  const isHomeActive = currentPath === "/" || currentPath === "/homenew";
  const isMoreActive = moreLinks.some(({ to }) => currentPath === to || currentPath.startsWith(to + "/"));

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu  = () => setIsMobileMenuOpen(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="StudyMatePlus Logo" className="navbar-logo" />
        </Link>

        {/* Right side — desktop */}
        <div className="navbar-right">

          {/* Primary nav links */}
          <ul className="navbar-links">
            {primaryLinks.map(({ to, label }) => {
              const isActive = to === "/" ? isHomeActive : (currentPath === to || currentPath.startsWith(to + "/"));
              return (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={`navbar-link${isActive ? " active" : ""}`}
                  >
                    {label}
                  </NavLink>
                </li>
              );
            })}

            {/* "More" dropdown */}
            <li
              className={`navbar-dropdown${isDropdownOpen ? " open" : ""}`}
              ref={dropdownRef}
            >
              <button
                className={`navbar-dropdown-btn${isMoreActive ? " active" : ""}`}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                More
                <FaChevronDown className="navbar-dropdown-arrow" />
              </button>
              <div className="navbar-dropdown-menu" role="menu">
                {moreLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => isActive ? "active" : ""}
                    onClick={() => setIsDropdownOpen(false)}
                    role="menuitem"
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </li>
          </ul>

          {/* Divider */}
          <span className="navbar-divider" aria-hidden="true" />

          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            className="navbar-theme-toggle"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Profile */}
          <Link to="/profile" className="navbar-profile-link" aria-label="User profile">
            <img src={user.avatar || DEFAULT_AVATAR} alt="User Profile" className="navbar-profile-img" />
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="navbar-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div className={`navbar-menu-mobile${isMobileMenuOpen ? " active" : ""}`}>
        <ul className="navbar-links-mobile">
          {allLinks.map(({ to, label }) => {
            const isActive = to === "/" ? isHomeActive : (currentPath === to || currentPath.startsWith(to + "/"));
            return (
              <li key={to}>
                <NavLink
                  to={to}
                  className={`navbar-link-mobile${isActive ? " active" : ""}`}
                  onClick={closeMobileMenu}
                >
                  {label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Mobile bottom controls */}
        <div className="navbar-mobile-controls">
          <button
            aria-label="Toggle theme"
            className="navbar-theme-toggle"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          <Link
            to="/profile"
            className="navbar-profile-link"
            onClick={closeMobileMenu}
            aria-label="User profile"
          >
            <img src={user.avatar || DEFAULT_AVATAR} alt="User Profile" className="navbar-profile-img" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;