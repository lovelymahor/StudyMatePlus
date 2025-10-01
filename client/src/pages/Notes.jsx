import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from "react-icons/fa";
import './Notes.css';

const Notes = () => {
  // Animation Variants from Home.js
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Mock data for notes (memoized to keep stable reference and satisfy exhaustive-deps)
  const notesData = useMemo(() => [
    { id: 1, title: "Python - Notes", university: "Mumbai University", department: "Electronics Engineering", semester: 1, subject: "Python", fileType: "PDF", downloadCount: 1400, uploadDate: "2024-02-01", fileSize: "3.5 MB", tags: ["CSE", "Python", "First Year"], difficulty: "Beginner", link: "/pdf/python.pdf" },
    { id: 2, title: "Operating Systems - Detailed Notes", university: "NIT Trichy", department: "Computer Science", semester: 2, subject: "Operating Systems", fileType: "PDF", downloadCount: 870, uploadDate: "2024-04-02", fileSize: "5.8 MB", tags: ["CSE", "OS", "Semester 4"], difficulty: "Intermediate", link: "/pdf/OS.pdf" },
    { id: 3, title: "Data Structures - Notes", university: "Anna University", department: "Computer Science", semester: 3, subject: "Data Structures", fileType: "PDF", downloadCount: 980, uploadDate: "2024-03-15", fileSize: "4.2 MB", tags: ["CSE", "DSA"], difficulty: "Intermediate", link: "/pdf/DSA.pdf" },
    { id: 4, title: "Database Management Systems (DBMS) - Notes", university: "IIT Delhi", department: "Computer Science", semester: 4, subject: "Database Systems", fileType: "PDF", downloadCount: 1100, uploadDate: "2024-03-18", fileSize: "6.0 MB", tags: ["CSE", "DBMS", "SQL"], difficulty: "Intermediate", link: "/pdf/DBMS.pdf" },
    { id: 5, title: "Java - Notes", university: "Delhi University", department: "Computer Science", semester: 5, subject: "Java", fileType: "PDF", downloadCount: 1400, uploadDate: "2024-02-01", fileSize: "3.5 MB", tags: ["CSE", "Java", "First Year"], difficulty: "Beginner", link: "/pdf/Java.pdf" },
    { id: 6, title: "Advance Web Development", university: "VIT Vellore", department: "Computer Science", semester: 6, subject: "Web Development", fileType: "PDF", downloadCount: 640, uploadDate: "2024-07-01", fileSize: "6.5 MB", tags: ["CSE", "Web", "Semester 6"], difficulty: "Advanced", link: "/pdf/WebDevelopment.pdf" },
  ], []);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [sortBy, setSortBy] = useState('downloads');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

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

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (previewUrl) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [previewUrl]);

  // Unique filter values
  const universities = ['All', ...new Set(notesData.map(item => item.university))];
  const departments = ['All', ...new Set(notesData.map(item => item.department))];
  const semesters = ['All', ...new Set(notesData.map(item => item.semester))];
  const subjects = ['All', ...new Set(notesData.map(item => item.subject))]; // New subject filter list

  // Filter & sort logic
  const filteredNotes = useMemo(() => {
    let filtered = notesData.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesUniversity = selectedUniversity === 'All' || item.university === selectedUniversity;
      const matchesDepartment = selectedDepartment === 'All' || item.department === selectedDepartment;
      const matchesSemester = selectedSemester === 'All' || item.semester.toString() === selectedSemester;
      const matchesSubject = selectedSubject === 'All' || item.subject === selectedSubject;
      return matchesSearch && matchesUniversity && matchesDepartment && matchesSemester && matchesSubject;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'downloads': return b.downloadCount - a.downloadCount;
        case 'date': return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'title': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedUniversity, selectedDepartment, selectedSemester, selectedSubject, sortBy, notesData]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4ade80';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="notes">
      {/* Hero Section */}
      <motion.section className="notes-hero" initial="hidden" animate="visible" variants={staggerChildren}>
        <div className="container">
          <motion.div className="hero-content" variants={fadeInUp}>
            <motion.h1 variants={fadeInUp}>📝 Notes, Books & PPTs</motion.h1>
            <motion.p variants={fadeInUp}>
              Access and share comprehensive study notes, reference books, and PPTs uploaded by peers and seniors from top universities.
            </motion.p>
            <motion.div className="hero-stats" variants={staggerChildren}>
              <motion.div className="hero-stat" variants={scaleIn}><span className="stat-number">{notesData.length}</span><span className="stat-label">Resources Available</span></motion.div>
              <motion.div className="hero-stat" variants={scaleIn}><span className="stat-number">{universities.length - 1}</span><span className="stat-label">Universities</span></motion.div>
              <motion.div className="hero-stat" variants={scaleIn}><span className="stat-number">{departments.length - 1}</span><span className="stat-label">Departments</span></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Search & Filters */}
      <motion.section className="search-filters" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerChildren}>
        <div className="container">
          <motion.div className="search-bar" variants={fadeInUp}>
            <div className="search-input-container">
              <input type="text" placeholder="Search notes, books, or PPTs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
              <span className="search-icon">🔍</span>
            </div>
          </motion.div>
          <motion.div className="filters" variants={staggerChildren}>
            <motion.div className="filter-group" variants={fadeInUp}><label>University:</label><select value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)}>{universities.map(uni => (<option key={uni} value={uni}>{uni}</option>))}</select></motion.div>
            <motion.div className="filter-group" variants={fadeInUp}><label>Department:</label><select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>{departments.map(dept => (<option key={dept} value={dept}>{dept}</option>))}</select></motion.div>
            <motion.div className="filter-group" variants={fadeInUp}><label>Semester:</label><select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>{semesters.map(sem => (<option key={sem} value={sem}>{sem === 'All' ? 'All' : `Semester ${sem}`}</option>))}</select></motion.div>
            <motion.div className="filter-group" variants={fadeInUp}><label>Subject:</label><select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>{subjects.map(sub => (<option key={sub} value={sub}>{sub}</option>))}</select></motion.div>
            <motion.div className="filter-group" variants={fadeInUp}><label>Sort by:</label><select value={sortBy} onChange={(e) => setSortBy(e.target.value)}><option value="downloads">Most Downloaded</option><option value="date">Latest Upload</option><option value="title">Title (A-Z)</option></select></motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Results Section */}
      <motion.section className="results" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
        <div className="container">
          <motion.div className="results-header" variants={fadeInUp}>
            <h2>Found {filteredNotes.length} resources</h2>
            <p>Browse notes, books, and PPTs shared by your peers and seniors</p>
          </motion.div>
          <AnimatePresence mode="wait">
            {filteredNotes.length === 0 ? (
              <motion.div key="no-results" className="no-results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}>
                <div className="no-results-icon">📭</div>
                <h3>No resources found</h3>
                <p>Try adjusting your search criteria or filters.</p>
              </motion.div>
            ) : (
              <motion.div key="notes-grid" className="notes-grid" variants={staggerChildren}>
                {filteredNotes.map(note => (
                  <motion.div key={note.id} className="note-card" layout variants={scaleIn} whileHover={{ y: -10, scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="card-header">
                      <div className="card-title-section"><h3 className="card-title">{note.title}</h3><div className="card-meta"><span className="university">{note.university}</span><span className="separator">•</span><span className="department">{note.department}</span></div></div>
                      <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(note.difficulty) }}>{note.difficulty}</div>
                    </div>
                    <div className="card-content"><p className="subject">Subject: {note.subject}</p><div className="tags-section"><div className="tags">{note.tags.map((tag, index) => (<span key={index} className="tag">#{tag}</span>))}</div></div></div>
                    <div className="card-stats"><div className="stat"><span className="stat-icon">📥</span><span>{note.downloadCount.toLocaleString()} downloads</span></div><div className="stat"><span className="stat-icon">📅</span><span>{new Date(note.uploadDate).toLocaleDateString()}</span></div><div className="stat"><span className="stat-icon">📄</span><span>{note.fileSize}</span></div></div>
                    <div className="card-actions">
                      <motion.a href={note.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>📥 Download</motion.a>
                      <motion.button className="btn btn-outline" onClick={() => setPreviewUrl(note.link)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>👁️ Preview</motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* Upload Section */}
      <motion.section className="upload-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerChildren}>
        <div className="container">
          <motion.h3 variants={fadeInUp}>Want to Share Your Notes, Books or PPTs?</motion.h3>
          <motion.p variants={fadeInUp}>Upload your study materials to help others in your community.</motion.p>
          <motion.button className="btn btn-primary" variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
            📤 Upload Resource
          </motion.button>
        </div>
      </motion.section>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div key="modal" className="modal-overlay" onClick={() => setPreviewUrl(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <embed src={previewUrl} type="application/pdf" width="100%" height="600px" />
              <motion.button className="btn btn-primary close-btn" onClick={() => setPreviewUrl(null)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Close</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Notes;

