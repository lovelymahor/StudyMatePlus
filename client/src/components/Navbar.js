import React, { useState, useEffect } from "react"; // Ensure useEffect is imported
import { Link } from "react-router-dom";
import "./Navbar.css"; // This imports the CSS file we've already set up

const user = {
  avatar: "https://avatar.iran.liara.run/public/boy",
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // This function ensures the menu closes when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // --- FIX #1: THE "STICKY MENU" FIX ---
  // This useEffect hook listens for window resize events.
  useEffect(() => {
    const handleResize = () => {
      // If the window is wider than our mobile breakpoint (768px)...
      if (window.innerWidth > 768) {
        // ...force the mobile menu to close.
        setIsMobileMenuOpen(false);
      }
    };

    // Add the listener when the component mounts
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // The empty [] array means this effect only runs once on mount.
  // --- END OF FIX #1 ---

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

        {/* --- FIX #2: THE RESPONSIVE STRUCTURE --- */}
        <div className="navbar-right">
          {/* Desktop links */}
          <ul className="navbar-links">
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/about" className="navbar-link">About Us</Link></li>
            <li><Link to="/syllabus" className="navbar-link">Syllabus</Link></li>
            <li><Link to="/notes" className="navbar-link">Notes</Link></li>
            <li><Link to="/pyqs" className="navbar-link">PYQs</Link></li>
            <li><Link to="/analytics" className="navbar-link">Analytics</Link></li>
            <li><Link to="/mindmap" className="navbar-link">Mind Map</Link></li>
            <li><Link to="/feedback" className="navbar-link">Feedback</Link></li>
            <li><Link to="/faq" className="navbar-link">FAQs</Link></li>
          </ul>

          {/* Profile icon is now outside the list that gets hidden */}
          <Link to="/profile" className="navbar-profile-link">
            <img
              src={user.avatar}
              alt="User Profile"
              className="navbar-profile-img"
            />
          </Link>

          {/* Mobile toggle button */}
          <button className="navbar-toggle" onClick={toggleMobileMenu}>
            ☰
          </button>
        </div>
        {/* --- END OF FIX #2 --- */}
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-menu-mobile ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="navbar-links-mobile">
          {/* Onclick now calls closeMobileMenu for better UX */}
          <li><Link to="/" className="navbar-link-mobile" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/syllabus" className="navbar-link-mobile" onClick={closeMobileMenu}>Syllabus</Link></li>
          <li><Link to="/pyqs" className="navbar-link-mobile" onClick={closeMobileMenu}>PYQs</Link></li>
          <li><Link to="/feedback" className="navbar-link-mobile" onClick={closeMobileMenu}>Feedback</Link></li>
          <li><Link to="/about" className="navbar-link-mobile" onClick={closeMobileMenu}>About Us</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

