import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Syllabus from './pages/Syllabus';
import Notes from './pages/Notes';
import PYQs from './pages/PYQs';
import Feedback from './pages/Feedback';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Contact from './pages/Contact';
import Analytics from './pages/Analytics';
import Faq from './pages/Faq';
import Contribute from './pages/Contribute';
import ScrollToTop from './components/scrolltotop';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/pyqs" element={<PYQs />} />
          <Route path="/analytics" element={<Analytics/>} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />}  />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
