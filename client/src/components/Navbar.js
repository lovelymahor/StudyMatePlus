// STEP 1: Import NavLink along with Link
import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom"; // CHANGED HERE
import "./Navbar.css";
import { useTheme } from "../theme/ThemeProvider";
import { AuthContext } from "../context/AuthContext";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";

const user = {
  avatar: "https://avatar.iran.liara.run/public/boy",
};

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user: authUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMobileMenu();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Profile still use <Link> which is fine */}
        <Link to="/" className="navbar-brand">
          <img
            src="/logo.png"
            alt="StudyMatePlus Logo"
            className="navbar-logo"
          />
        </Link>

        <div className="navbar-right">
          
          {/* STEP 2: Change Desktop <Link> to <NavLink> */}
          <ul className="navbar-links">
            <li><NavLink to="/" className="navbar-link">Home</NavLink></li>
            <li><NavLink to="/about" className="navbar-link">About Us</NavLink></li>
            <li><NavLink to="/syllabus" className="navbar-link">Syllabus</NavLink></li>
            <li><NavLink to="/notes" className="navbar-link">Notes</NavLink></li>
            <li><NavLink to="/pyqs" className="navbar-link">PYQs</NavLink></li>
            <li><NavLink to="/analytics" className="navbar-link">Analytics</NavLink></li>
            <li><NavLink to="/tasks" className="navbar-link">Tasks</NavLink></li>
            <li><NavLink to="/mindmap" className="navbar-link">Mind Map</NavLink></li>
            <li><NavLink to="/feedback" className="navbar-link">Feedback</NavLink></li>
            <li><NavLink to="/faq" className="navbar-link">FAQs</NavLink></li>
          </ul>
          {/* END OF STEP 2 CHANGE */}


          <button
            aria-label="Toggle theme"
            className="navbar-theme-toggle"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {authUser ? (
            <div className="navbar-auth">
              <Link to="/profile" className="navbar-profile-link">
                <img
                  src={authUser.avatar || user.avatar}
                  alt="User Profile"
                  className="navbar-profile-img"
                  title={authUser.name}
                />
              </Link>
              <button
                className="navbar-logout-btn"
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-auth-link">
                Sign In
              </Link>
              <Link to="/register" className="navbar-auth-link signup">
                Sign Up
              </Link>
            </div>
          )}

          <button className="navbar-toggle" onClick={toggleMobileMenu}>
            ☰
          </button>
        </div>
      </div>

      <div className={`navbar-menu-mobile ${isMobileMenuOpen ? "active" : ""}`}>
        
        {/* STEP 3: Change Mobile <Link> to <NavLink> */}
        <ul className="navbar-links-mobile">
          <li><NavLink to="/" className="navbar-link-mobile" onClick={closeMobileMenu}>Home</NavLink></li>
          <li><NavLink to="/about" className="navbar-link-mobile" onClick={closeMobileMenu}>About Us</NavLink></li>
          <li><NavLink to="/syllabus" className="navbar-link-mobile" onClick={closeMobileMenu}>Syllabus</NavLink></li>
          <li><NavLink to="/notes" className="navbar-link-mobile" onClick={closeMobileMenu}>Notes</NavLink></li>
          <li><NavLink to="/pyqs" className="navbar-link-mobile" onClick={closeMobileMenu}>PYQs</NavLink></li>
          <li><NavLink to="/analytics" className="navbar-link-mobile" onClick={closeMobileMenu}>Analytics</NavLink></li>
          <li><NavLink to="/tasks" className="navbar-link-mobile" onClick={closeMobileMenu}>Tasks</NavLink></li>
          <li><NavLink to="/mindmap" className="navbar-link-mobile" onClick={closeMobileMenu}>Mind Map</NavLink></li>
          <li><NavLink to="/feedback" className="navbar-link-mobile" onClick={closeMobileMenu}>Feedback</NavLink></li>
          <li><NavLink to="/faq" className="navbar-link-mobile" onClick={closeMobileMenu}>FAQs</NavLink></li>
        </ul>
        {/* END OF STEP 3 CHANGE */}

        <div className="navbar-mobile-auth">
          {authUser ? (
            <>
              <Link
                to="/profile"
                className="navbar-link-mobile"
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
              <button
                className="navbar-link-mobile logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="navbar-link-mobile"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="navbar-link-mobile signup"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
    </nav>
  );
};

export default Navbar;