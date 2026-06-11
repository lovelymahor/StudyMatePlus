import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../theme/ThemeProvider";
import { useAuth } from "../context/AuthContext";
import { FaMoon, FaSun, FaChevronDown } from "react-icons/fa";

// Primary links always visible in the bar
const primaryLinks = [
  { to: "/",         label: "Home"     },
  { to: "/syllabus", label: "Syllabus" },
  { to: "/notes",    label: "Notes"    },
  { to: "/pyqs",     label: "PYQs"     },
  { to: "/feedback", label: "Feedback" },
];

// Secondary links hidden inside "More" dropdown
const moreLinks = [
  { to: "/about",     label: "About Us"  },
  { to: "/analytics", label: "Analytics" },
  { to: "/tasks",     label: "Tasks"     },
  { to: "/mindmap",   label: "Mind Map"  },
  { to: "/faq",       label: "FAQs"      },
];

const allLinks = [...primaryLinks, ...moreLinks];

const Navbar = () => {
  const { theme, toggleTheme }              = useTheme();
  const { user, isAuthenticated, logout }   = useAuth();
  const navigate                            = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen,   setIsDropdownOpen]   = useState(false);
  const [isUserMenuOpen,   setIsUserMenuOpen]   = useState(false);
  const [loggingOut,       setLoggingOut]       = useState(false);

  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen((p) => !p);
  const closeMobileMenu  = () => setIsMobileMenuOpen(false);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))  setIsUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setIsMobileMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    setIsUserMenuOpen(false);
    closeMobileMenu();
    navigate("/login");
  };

  const avatarSrc = user?.avatar || `https://avatar.iran.liara.run/public/boy?username=${user?.name || "user"}`;

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
            {primaryLinks.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {/* "More" dropdown */}
            <li
              className={`navbar-dropdown${isDropdownOpen ? " open" : ""}`}
              ref={dropdownRef}
            >
              <button
                className="navbar-dropdown-btn"
                onClick={() => setIsDropdownOpen((p) => !p)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                More <FaChevronDown className="navbar-dropdown-arrow" />
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

          {/* User menu / Auth */}
          {isAuthenticated ? (
            <div className="navbar-user-menu" ref={userMenuRef}>
              <button
                className="navbar-profile-btn"
                onClick={() => setIsUserMenuOpen((p) => !p)}
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <img src={avatarSrc} alt={user?.name || "User"} className="navbar-profile-img" />
                <span className="navbar-user-name">{user?.name?.split(" ")[0]}</span>
                <FaChevronDown className={`navbar-user-chevron ${isUserMenuOpen ? "open" : ""}`} />
              </button>
              {isUserMenuOpen && (
                <div className="navbar-user-dropdown" role="menu">
                  <div className="navbar-user-info">
                    <img src={avatarSrc} alt={user?.name} className="navbar-user-avatar-lg" />
                    <div>
                      <p className="navbar-user-fullname">{user?.name}</p>
                      <p className="navbar-user-email">{user?.email}</p>
                    </div>
                  </div>
                  <div className="navbar-user-dropdown-divider" />
                  <Link to="/profile" className="navbar-user-action" onClick={() => setIsUserMenuOpen(false)} role="menuitem">
                    👤 My Profile
                  </Link>
                  <Link to="/analytics" className="navbar-user-action" onClick={() => setIsUserMenuOpen(false)} role="menuitem">
                    📊 Analytics
                  </Link>
                  <div className="navbar-user-dropdown-divider" />
                  <button
                    className="navbar-user-action navbar-logout-btn"
                    onClick={handleLogout}
                    disabled={loggingOut}
                    role="menuitem"
                  >
                    {loggingOut ? "Signing out…" : "🚪 Sign Out"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth-btns">
              <Link to="/login"    className="navbar-login-btn">Log In</Link>
              <Link to="/register" className="navbar-signup-btn">Sign Up</Link>
            </div>
          )}

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
          {allLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) => "navbar-link-mobile" + (isActive ? " active" : "")}
                onClick={closeMobileMenu}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile bottom controls */}
        <div className="navbar-mobile-controls">
          <button aria-label="Toggle theme" className="navbar-theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="navbar-profile-link" onClick={closeMobileMenu}>
                <img src={avatarSrc} alt={user?.name} className="navbar-profile-img" />
              </Link>
              <button
                className="navbar-mobile-logout"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? "…" : "Sign Out"}
              </button>
            </>
          ) : (
            <div className="navbar-mobile-auth">
              <Link to="/login"    className="navbar-login-btn"  onClick={closeMobileMenu}>Log In</Link>
              <Link to="/register" className="navbar-signup-btn" onClick={closeMobileMenu}>Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;