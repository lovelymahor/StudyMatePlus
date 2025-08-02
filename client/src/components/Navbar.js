import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
      <h1>📚 StudyMatePlus</h1>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <Link to="/">Home</Link>
        <Link to="/syllabus">Syllabus</Link>
        <Link to="/pyqs">PYQs</Link>
        <Link to="/feedback">Feedback</Link>
      </div>
    </nav>
  );
};

export default Navbar;
