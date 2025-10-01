import React, { Suspense, lazy } from "react";
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import { ThemeProvider } from "./theme/ThemeProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/scrolltotop";

// Route-level code splitting – only load page chunks when needed
const Home = lazy(() => import("./pages/Home"));
const Syllabus = lazy(() => import("./pages/Syllabus"));
const Notes = lazy(() => import("./pages/Notes"));
const PYQs = lazy(() => import("./pages/PYQs"));
const Feedback = lazy(() => import("./pages/Feedback"));
const About = lazy(() => import("./pages/About"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Contact = lazy(() => import("./pages/Contact"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Faq = lazy(() => import("./pages/Faq"));
const Contribute = lazy(() => import("./pages/Contribute"));
const MindMapEditor = lazy(() => import("./pages/MindMapEditor"));
const Profile = lazy(() => import("./pages/Profile.js"));
const SubmitFeedback = lazy(() => import("./pages/SubmitFeedback"));


const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <Navbar />
          <div style={{ padding: "2rem" }}>
            <ScrollToTop />
            <Suspense fallback={<div className="route-loader" role="status" aria-live="polite">Loading…</div>}>
              <Routes>
                <Route path="/" element={<><SEO title="Home" description="Access syllabus, PYQs, notes, mind maps & feedback to accelerate your exam prep." path="/" /><Home /></>} />
                <Route path="/syllabus" element={<><SEO title="Syllabus" description="Browse structured university & course syllabi in one place." path="/syllabus" /><Syllabus /></>} />
                <Route path="/notes" element={<><SEO title="Notes" description="Curated study notes & quick revision material for students." path="/notes" /><Notes /></>} />
                <Route path="/pyqs" element={<><SEO title="Previous Year Questions" description="Practice with previous year question papers to prepare smarter." path="/pyqs" /><PYQs /></>} />
                <Route path="/analytics" element={<><SEO title="Analytics" description="Visualize performance trends and exam difficulty insights." path="/analytics" /><Analytics /></>} />
                <Route path="/faq" element={<><SEO title="FAQs" description="Answers to common questions about using StudyMatePlus." path="/faq" /><Faq /></>} />
                <Route path="/feedback" element={<><SEO title="Exam Feedback" description="Read and submit real student feedback about exams." path="/feedback" /><Feedback /></>} />
                <Route path="/feedback/submit" element={<><SEO title="Submit Feedback" description="Share your exam experience to help other students." path="/feedback/submit" /><SubmitFeedback /></>} />
                <Route path="/about" element={<><SEO title="About" description="Learn the mission behind StudyMatePlus and how to contribute." path="/about" /><About /></>} />
                <Route path="/privacy" element={<><SEO title="Privacy Policy" description="Understand how StudyMatePlus handles your data." path="/privacy" /><Privacy /></>} />
                <Route path="/contribute" element={<><SEO title="Contribute" description="Get started contributing to StudyMatePlus open-source." path="/contribute" /><Contribute /></>} />
                <Route path="/mindmap" element={<><SEO title="Mind Map Editor" description="Create and edit mind maps to visualize concepts." path="/mindmap" /><MindMapEditor /></>} />
                <Route path="/contact" element={<><SEO title="Contact" description="Reach out for questions, feedback or collaboration." path="/contact" /><Contact /></>} />
                <Route path="/profile" element={<><SEO title="Profile" description="Manage your StudyMatePlus profile." path="/profile" noIndex /><Profile /></>} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
