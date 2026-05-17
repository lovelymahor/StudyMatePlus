import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Syllabus from "./pages/Syllabus";
import Notes from "./pages/Notes";
import PYQs from "./pages/PYQs";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Analytics from "./pages/Analytics";
import Faq from "./pages/Faq";
import Contribute from "./pages/Contribute";
import ScrollToTop from "./components/scrolltotop";
import MindMapEditor from "./pages/MindMapEditor";
import Profile from "./pages/Profile.js";
import SubmitFeedback from "./pages/SubmitFeedback";
import Todo from "./pages/Todo";


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
