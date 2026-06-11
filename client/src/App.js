import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home, Syllabus, Notes, PYQs, Feedback, About, Privacy, Contact, Analytics, Faq, Contribute, MindMapEditor, Profile, SubmitFeedback, Todo} from './pages';
import {Navbar, ScrollToTop} from "./components";


const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div style={{ padding: "2rem" }}>
          <ScrollToTop />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Todo />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/pyqs" element={<PYQs />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/mindmap" element={<MindMapEditor />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback/submit" element={<SubmitFeedback />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
