import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          📚 StudyMatePlus
        </Link>
        
        {/* Desktop Menu */}
        <ul className="navbar-links">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          <li><Link to="/syllabus" className="navbar-link">Syllabus</Link></li>
          <li><Link to="/pyqs" className="navbar-link">PYQs</Link></li>
          <li><Link to="/feedback" className="navbar-link">Feedback</Link></li>
        </ul>
        
        {/* Mobile Menu Toggle */}
        <button className="navbar-toggle" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`navbar-menu-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="navbar-links-mobile">
          <li><Link to="/" className="navbar-link-mobile" onClick={toggleMobileMenu}>Home</Link></li>
          <li><Link to="/syllabus" className="navbar-link-mobile" onClick={toggleMobileMenu}>Syllabus</Link></li>
          <li><Link to="/pyqs" className="navbar-link-mobile" onClick={toggleMobileMenu}>PYQs</Link></li>
          <li><Link to="/feedback" className="navbar-link-mobile" onClick={toggleMobileMenu}>Feedback</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;