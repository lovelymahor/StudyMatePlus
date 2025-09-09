// STEP 1: Import NavLink along with Link
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom"; // CHANGED HERE
import "./Navbar.css";

const user = {
  avatar: "https://avatar.iran.liara.run/public/boy",
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
            <li><NavLink to="/mindmap" className="navbar-link">Mind Map</NavLink></li>
            <li><NavLink to="/feedback" className="navbar-link">Feedback</NavLink></li>
            <li><NavLink to="/faq" className="navbar-link">FAQs</NavLink></li>
          </ul>
          {/* END OF STEP 2 CHANGE */}


          <Link to="/profile" className="navbar-profile-link">
            <img
              src={user.avatar}
              alt="User Profile"
              className="navbar-profile-img"
            />
          </Link>

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
          <li><NavLink to="/mindmap" className="navbar-link-mobile" onClick={closeMobileMenu}>Mind Map</NavLink></li>
          <li><NavLink to="/feedback" className="navbar-link-mobile" onClick={closeMobileMenu}>Feedback</NavLink></li>
          <li><NavLink to="/faq" className="navbar-link-mobile" onClick={closeMobileMenu}>FAQs</NavLink></li>
        </ul>
        {/* END OF STEP 3 CHANGE */}

      </div>
    </nav>
  );
};

export default Navbar;