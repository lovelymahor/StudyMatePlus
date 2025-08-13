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
import Contribute from './pages/Contribute';
<<<<<<< HEAD
import Help from './pages/Help';
import './App.css';  
=======
import ScrollToTop from './components/scrolltotop';
>>>>>>> ccac551312483a140e11c8aff669ee5679e765f9

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
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />}  />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/contact" element={<Contact />} />
           <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
