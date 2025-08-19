import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./PYQs.css";

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
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const universities = ["Select University", "LPU", "DU", "JNU"];
  
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
    </div>
  );
};

export default PYQs;