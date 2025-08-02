import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import PYQs from './pages/PYQs';
import Feedback from './pages/Feedback';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/pyqs" element={<PYQs />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
