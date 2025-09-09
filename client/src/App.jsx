import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Syllabus from "./pages/Syllabus.jsx";
import Notes from "./pages/Notes.jsx";
import PYQs from "./pages/PYQs.jsx";
import Feedback from "./pages/Feedback.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";
import Contact from "./pages/Contact.jsx";
import Analytics from "./pages/Analytics.jsx";
import Faq from "./pages/Faq.jsx";
import Contribute from "./pages/Contribute.jsx";
import ScrollToTop from "./components/scrolltotop.jsx";
import MindMapEditor from "./pages/MindMapEditor.jsx";
import Profile from "./pages/Profile.jsx";
import SubmitFeedback from "./pages/SubmitFeedback.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
