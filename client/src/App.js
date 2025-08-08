import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import PYQs from './pages/PYQs';
import Feedback from './pages/Feedback';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Analytics from './pages/Analytics';
import Contribute from './pages/Contribute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/pyqs" element={<PYQs />} />
          <Route path="/analytics" element={<Analytics/>} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
