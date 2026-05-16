import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import "./PYQs.css";
import './ScrollToTop.css';
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "./logo.png";
import { Link } from "react-router-dom";
const PYQs = () => {
  // Animation Variants from Home.js
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const staggerChildrenFast = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };
 const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Component State
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const universities = ["Select University", "LPU", "DU", "JNU"];
  const [showScroll, setShowScroll] = useState(false);
  
  // Sample papers data (remains the same)
  const samplePapers = [
    { id: 1, university: "LPU", department: "Engineering", semester: "4th", subject: "Computer Science", uploader: "Harish", date: "2024-05-20" },
    { id: 2, university: "DU", department: "Science", semester: "3rd", subject: "Mathematics", uploader: "Ananya Gupta", date: "2023-12-10" },
    { id: 3, university: "JNU", department: "Science", semester: "2nd", subject: "Physics", uploader: "Ravi Verma", date: "2022-06-15" },
    { id: 4, university: "LPU", department: "Engineering", semester: "4th", subject: "Computer Science", uploader: "Sneha Singh", date: "2023-11-02" },
  ];

  // Memoized lists of available options based on selections
  const availableDepartments = useMemo(() => {
    if (!selectedUniversity) return [];
    return [...new Set(samplePapers.filter(paper => paper.university === selectedUniversity).map(paper => paper.department))];
  }, [selectedUniversity]);

  const availableSemesters = useMemo(() => {
    if (!selectedUniversity || !selectedDepartment) return [];
    return [...new Set(samplePapers.filter(paper => paper.university === selectedUniversity && paper.department === selectedDepartment).map(paper => paper.semester))];
  }, [selectedUniversity, selectedDepartment]);

  const availableSubjects = useMemo(() => {
    if (!selectedUniversity || !selectedDepartment || !selectedSemester) return [];
    return [...new Set(samplePapers.filter(paper => paper.university === selectedUniversity && paper.department === selectedDepartment && paper.semester === selectedSemester).map(paper => paper.subject))];
  }, [selectedUniversity, selectedDepartment, selectedSemester]);

  // Filter papers based on selected options
  const filteredPapers = samplePapers.filter(
    (paper) =>
      paper.university === selectedUniversity &&
      paper.department === selectedDepartment &&
      paper.semester === selectedSemester &&
      paper.subject === selectedSubject
  );

  const areFiltersSelected = selectedUniversity && selectedDepartment && selectedSubject && selectedSemester;

  useEffect(() => {
  const checkScrollTop = () => {
    if (!showScroll && window.scrollY > 300) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 300) {
      setShowScroll(false);
    }
  };

  window.addEventListener('scroll', checkScrollTop);
  return () => {
    window.removeEventListener('scroll', checkScrollTop);
  };
}, [showScroll]);

// Add this function to perform the scroll action
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

  return (
    <div className="pyqs-page">
      <motion.section 
        className="pyqs-hero"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="container">
          <motion.div className="pyqs-hero-content" variants={fadeInUp}>
            <motion.h1 variants={fadeInUp}>Access Previous Year Question Papers</motion.h1>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="pyqs-selection"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="container">
          <motion.div className="pyqs-form" variants={staggerChildren}>
            {/* University Dropdown */}
            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="university">University</label>
              <select
                id="university"
                value={selectedUniversity}
                onChange={(e) => {
                  setSelectedUniversity(e.target.value);
                  setSelectedDepartment("");
                  setSelectedSemester("");
                  setSelectedSubject("");
                }}
              >
                <option value="" disabled>Select University</option>
                {universities.slice(1).map((uni, idx) => (<option key={idx} value={uni}>{uni}</option>))}
              </select>
            </motion.div>

            {/* Other dropdowns follow the same pattern... */}
            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="department">Department</label>
              <select id="department" value={selectedDepartment} onChange={(e) => { setSelectedDepartment(e.target.value); setSelectedSemester(""); setSelectedSubject(""); }} disabled={!selectedUniversity}>
                <option value="" disabled>Select Department</option>
                {availableDepartments.map((dept, idx) => (<option key={idx} value={dept}>{dept}</option>))}
              </select>
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="semester">Semester</label>
              <select id="semester" value={selectedSemester} onChange={(e) => { setSelectedSemester(e.target.value); setSelectedSubject(""); }} disabled={!selectedUniversity || !selectedDepartment}>
                <option value="" disabled>Select Semester</option>
                {availableSemesters.map((sem, idx) => (<option key={idx} value={sem}>{sem}</option>))}
              </select>
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="subject">Subject</label>
              <select id="subject" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedUniversity || !selectedDepartment || !selectedSemester}>
                <option value="" disabled>Select Subject</option>
                {availableSubjects.map((subj, idx) => (<option key={idx} value={subj}>{subj}</option>))}
              </select>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="pyqs-results"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <AnimatePresence mode="wait">
            {areFiltersSelected ? (
              <motion.div
                key="results"
                className="pyqs-results-box"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2>
                  Previous Year Question Papers for{" "}
                  <strong>{selectedSubject}</strong> – {selectedSemester}{" "}
                  Semester, {selectedDepartment} Department, {selectedUniversity}
                </h2>

                {filteredPapers.length > 0 ? (
                  <motion.div
                    className="pyqs-cards-grid"
                    variants={staggerChildren}
                    initial="hidden"
                    animate="visible"
                  >
                    {filteredPapers.map((paper) => (
                      <motion.div
                        key={paper.id}
                        className="pyq-card"
                        variants={scaleIn}
                        layout
                        whileHover={{ y: -8, scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                      >
                        <h3>{paper.subject}</h3>
                        <p>Uploaded on: {paper.date}</p>
                        <p>Uploader: {paper.uploader}</p>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          View ➜
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.p className="prompt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    No papers found for selected filters.
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="prompt"
                className="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Please select university, department, semester, and subject to view available question papers.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
            {/* Footer */}
      <motion.footer 
        className="footer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
      >
        <div className="container">
          <motion.div className="footer-content" variants={staggerChildren}>
            {/* Left Section */}
            <motion.div className="footer-section" variants={slideInLeft}>
              <img 
                src={logo} 
                alt="StudyMatePlus Logo" 
                style={{ height: "50px", marginBottom: "10px" }} 
              />
              <p>Empowering students with comprehensive academic resources and peer-to-peer learning.</p>
              {/* Social Links with Icons */}
              <div className="social-links">
                <a href="https://github.com/lovelymahor/StudyMatePlus" target="_blank" rel="noopener noreferrer" className="social-icon github">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                  <FaXTwitter />
                </a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon discord">
                  <FaDiscord />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div className="footer-section" variants={fadeInUp}>
              <h4>Quick Links</h4>
              <motion.ul variants={staggerChildrenFast}>
                {[
                  { to: "/syllabus", text: "Syllabus" },
                  { to: "/pyqs", text: "Previous Papers" },
                  { to: "/feedback", text: "Feedback" },
                  { to: "/mentorship", text: "Mentorship" }
                ].map((link, index) => (
                  <motion.li key={index} variants={fadeInUp} whileHover={{ x: 5, color: "#3b82f6" }}>
                    <Link to={link.to}>{link.text}</Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Support Links */}
            <motion.div className="footer-section" variants={slideInRight}>
              <h4>Support</h4>
              <motion.ul variants={staggerChildrenFast}>
                {[
                  { to: "/help", text: "Help Center" },
                  { to: "/contact", text: "Contact Us" },
                  { to: "/contribute", text: "Contribute" },
                  { to: "/privacy", text: "Privacy Policy" }
                ].map((link, index) => (
                  <motion.li key={index} variants={fadeInUp} whileHover={{ x: 5, color: "#3b82f6" }}>
                    <Link to={link.to}>{link.text}</Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div className="footer-bottom" variants={fadeInUp}>
            <p>&copy; {new Date().getFullYear()} StudyMatePlus. Open-source educational platform for students.</p>
          </motion.div>
        </div>
      </motion.footer>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scrollTop"
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PYQs;