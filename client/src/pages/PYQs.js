import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import "./PYQs.css";
import './ScrollToTop.css';

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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Component State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");

  const universities = ["All", "LPU", "DU", "JNU"];
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
    return ["All", ...new Set(samplePapers.map(paper => paper.department))];
  }, []);

  const availableSemesters = useMemo(() => {
    return ["All", ...new Set(samplePapers.map(paper => paper.semester))];
  }, []);

  const availableSubjects = useMemo(() => {
    return ["All", ...new Set(samplePapers.map(paper => paper.subject))];
  }, []);

  // Filter papers based on selected options and search term
  const filteredPapers = samplePapers.filter((paper) => {
    const matchesSearch = 
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
      paper.uploader.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.university.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUniversity = selectedUniversity === "All" || paper.university === selectedUniversity;
    const matchesDepartment = selectedDepartment === "All" || paper.department === selectedDepartment;
    const matchesSemester = selectedSemester === "All" || paper.semester === selectedSemester;
    const matchesSubject = selectedSubject === "All" || paper.subject === selectedSubject;

    return matchesSearch && matchesUniversity && matchesDepartment && matchesSemester && matchesSubject;
  });

  const areFiltersSelected = true; // Always show results now, as we default to "All"

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
            {/* Search Bar */}
            <motion.div className="form-group search-group" variants={fadeInUp} style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
              <input 
                type="text" 
                placeholder="Search PYQs by subject, university, or uploader..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pyqs-search-input"
                style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
              />
            </motion.div>

            {/* University Dropdown */}
            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="university">University</label>
              <select
                id="university"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                {universities.map((uni, idx) => (<option key={idx} value={uni}>{uni}</option>))}
              </select>
            </motion.div>

            {/* Department Dropdown */}
            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="department">Department</label>
              <select id="department" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                {availableDepartments.map((dept, idx) => (<option key={idx} value={dept}>{dept}</option>))}
              </select>
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="semester">Semester</label>
              <select id="semester" value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                {availableSemesters.map((sem, idx) => (<option key={idx} value={sem}>{sem}</option>))}
              </select>
            </motion.div>

            <motion.div className="form-group" variants={fadeInUp}>
              <label htmlFor="subject">Subject</label>
              <select id="subject" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
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
                  Found {filteredPapers.length} Previous Year Question Papers
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