import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          {/* Navbar is hidden on login/register via CSS — it checks the route */}
          <NavbarWrapper />
          <ScrollToTop />
          <Routes>
            {/* ── Public routes ── */}
            <Route path="/login"    element={<Login />}    />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy"  element={<><div style={{ padding: "2rem" }}><Privacy /></div></>} />
            <Route path="/about"    element={<><div style={{ padding: "2rem" }}><About /></div></>} />

            {/* ── Public landing page ── */}
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Todo /></div>
              </ProtectedRoute>
            } />
            <Route path="/syllabus" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Syllabus /></div>
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Notes /></div>
              </ProtectedRoute>
            } />
            <Route path="/pyqs" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><PYQs /></div>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Analytics /></div>
              </ProtectedRoute>
            } />
            <Route path="/faq" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Faq /></div>
              </ProtectedRoute>
            } />
            <Route path="/feedback" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Feedback /></div>
              </ProtectedRoute>
            } />
            <Route path="/contribute" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Contribute /></div>
              </ProtectedRoute>
            } />
            <Route path="/mindmap" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><MindMapEditor /></div>
              </ProtectedRoute>
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Contact /></div>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><Profile /></div>
              </ProtectedRoute>
            } />
            <Route path="/feedback/submit" element={
              <ProtectedRoute>
                <div style={{ padding: "2rem" }}><SubmitFeedback /></div>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

// Hide Navbar on login/register pages
const NavbarWrapper = () => {
  const { pathname } = useLocation();
  if (pathname === "/login" || pathname === "/register") return null;
  return <Navbar />;
};

export default App;