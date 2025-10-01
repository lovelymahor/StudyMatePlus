import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from "react-icons/fa";
import './Syllabus.css';

const Syllabus = () => {
  // Mock data for syllabi (memoized so reference stays stable; avoids eslint exhaustive-deps warning)
  const syllabusData = useMemo(() => [
    {
      id: 1,
      title: "Computer Science Engineering - Semester 1",
      university: "Delhi University",
      department: "Computer Science",
      semester: 1,
      subjects: ["Mathematics I", "Physics", "Chemistry", "Programming in C", "English Communication"],
      downloadCount: 1250,
      uploadDate: "2024-01-15",
      fileSize: "2.4 MB",
      difficulty: "Beginner",
      tags: ["CSE", "First Year", "Basic Programming"]
    },
    {
      id: 2,
      title: "Computer Science Engineering - Semester 3",
      university: "Delhi University",
      department: "Computer Science",
      semester: 3,
      subjects: ["Data Structures", "Computer Organization", "Discrete Mathematics", "Database Systems", "Software Engineering"],
      downloadCount: 890,
      uploadDate: "2024-01-20",
      fileSize: "3.1 MB",
      difficulty: "Intermediate",
      tags: ["CSE", "Data Structures", "Database"]
    },
    {
      id: 3,
      title: "Mechanical Engineering - Semester 2",
      university: "Mumbai University",
      department: "Mechanical Engineering",
      semester: 2,
      subjects: ["Engineering Mechanics", "Thermodynamics", "Manufacturing Processes", "Engineering Drawing", "Materials Science"],
      downloadCount: 675,
      uploadDate: "2024-01-18",
      fileSize: "2.8 MB",
      difficulty: "Intermediate",
      tags: ["Mechanical", "Thermodynamics", "Manufacturing"]
    },
    {
      id: 4,
      title: "Electronics Engineering - Semester 4",
      university: "IIT Delhi",
      department: "Electronics Engineering",
      semester: 4,
      subjects: ["Digital Electronics", "Microprocessors", "Control Systems", "Signals & Systems", "Communication Systems"],
      downloadCount: 1120,
      uploadDate: "2024-01-22",
      fileSize: "3.5 MB",
      difficulty: "Advanced",
      tags: ["Electronics", "Microprocessors", "Communication"]
    },
    {
      id: 5,
      title: "Information Technology - Semester 1",
      university: "Anna University",
      department: "Information Technology",
      semester: 1,
      subjects: ["Programming Fundamentals", "Digital Logic", "Computer Networks Basics", "Web Technologies", "Statistics"],
      downloadCount: 945,
      uploadDate: "2024-01-25",
      fileSize: "2.2 MB",
      difficulty: "Beginner",
      tags: ["IT", "Web Development", "Networks"]
    },
    {
      id: 6,
      title: "Civil Engineering - Semester 3",
      university: "NIT Trichy",
      department: "Civil Engineering",
      semester: 3,
      subjects: ["Structural Analysis", "Fluid Mechanics", "Surveying", "Building Materials", "Environmental Engineering"],
      downloadCount: 720,
      uploadDate: "2024-01-12",
      fileSize: "2.9 MB",
      difficulty: "Intermediate",
      tags: ["Civil", "Structural", "Environmental"]
    },
    {
      id: 7,
      title: "Computer Science Engineering - Semester 5",
      university: "VIT Vellore",
      department: "Computer Science",
      semester: 5,
      subjects: ["Machine Learning", "Compiler Design", "Computer Graphics", "Network Security", "Mobile Computing"],
      downloadCount: 1340,
      uploadDate: "2024-01-28",
      fileSize: "4.2 MB",
      difficulty: "Advanced",
      tags: ["CSE", "Machine Learning", "Security"]
    },
    {
      id: 8,
      title: "Electrical Engineering - Semester 2",
      university: "IIT Bombay",
      department: "Electrical Engineering",
      semester: 2,
      subjects: ["Circuit Analysis", "Electromagnetic Theory", "Power Systems", "Digital Circuits", "Instrumentation"],
      downloadCount: 850,
      uploadDate: "2024-01-14",
      fileSize: "3.3 MB",
      difficulty: "Intermediate",
      tags: ["Electrical", "Power Systems", "Circuits"]
    }
  ], []);

  // Animation variants from Home.js
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

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

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [sortBy, setSortBy] = useState('downloads');

  // Get unique values for filters
  const universities = ['All', ...new Set(syllabusData.map(item => item.university))];
  const departments = ['All', ...new Set(syllabusData.map(item => item.department))];
  const semesters = ['All', ...new Set(syllabusData.map(item => item.semester))];

  // Filter and sort logic
  const filteredAndSortedSyllabi = useMemo(() => {
    let filtered = syllabusData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesUniversity = selectedUniversity === 'All' || item.university === selectedUniversity;
      const matchesDepartment = selectedDepartment === 'All' || item.department === selectedDepartment;
      const matchesSemester = selectedSemester === 'All' || item.semester.toString() === selectedSemester;

      return matchesSearch && matchesUniversity && matchesDepartment && matchesSemester;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'downloads':
          return b.downloadCount - a.downloadCount;
        case 'date':
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedUniversity, selectedDepartment, selectedSemester, sortBy, syllabusData]);

  const handleDownload = (syllabus) => {
    // Simulate download
    alert(`Downloading: ${syllabus.title}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4ade80';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="syllabus">
      {/* Hero Section */}
      <motion.section 
        className="syllabus-hero"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="container">
          <motion.div className="hero-content" variants={fadeInUp}>
            <motion.h1 variants={fadeInUp}>📚 Syllabus Collection</motion.h1>
            <motion.p variants={fadeInUp}>
              Access comprehensive syllabus materials from top universities across India. Find subject details, course structures, and academic requirements all in one place.
            </motion.p>
            <motion.div className="hero-stats" variants={staggerChildren}>
              <motion.div className="hero-stat" variants={scaleIn}>
                <span className="stat-number">{syllabusData.length}</span>
                <span className="stat-label">Syllabi Available</span>
              </motion.div>
              <motion.div className="hero-stat" variants={scaleIn}>
                <span className="stat-number">{universities.length - 1}</span>
                <span className="stat-label">Universities</span>
              </motion.div>
              <motion.div className="hero-stat" variants={scaleIn}>
                <span className="stat-number">{departments.length - 1}</span>
                <span className="stat-label">Departments</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <motion.section 
        className="search-filters"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.div className="search-bar" variants={fadeInUp}>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search by subject, course name, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </motion.div>

          <motion.div className="filters" variants={staggerChildren}>
            <motion.div className="filter-group" variants={fadeInUp}>
              <label>University:</label>
              <select value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)}>
                {universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </motion.div>

            <motion.div className="filter-group" variants={fadeInUp}>
              <label>Department:</label>
              <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </motion.div>

            <motion.div className="filter-group" variants={fadeInUp}>
              <label>Semester:</label>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>{sem === 'All' ? 'All' : `Semester ${sem}`}</option>
                ))}
              </select>
            </motion.div>

            <motion.div className="filter-group" variants={fadeInUp}>
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="downloads">Most Downloaded</option>
                <option value="date">Latest Upload</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Results Section */}
      <motion.section 
        className="results"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <div className="container">
          <motion.div className="results-header" variants={fadeInUp}>
            <h2>Found {filteredAndSortedSyllabi.length} syllabi</h2>
            <p>Browse through our collection of verified academic syllabi</p>
          </motion.div>
          
          <AnimatePresence>
            {filteredAndSortedSyllabi.length === 0 ? (
              <motion.div 
                className="no-results"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                <div className="no-results-icon">📭</div>
                <h3>No syllabi found</h3>
                <p>Try adjusting your search criteria or filters to find what you're looking for.</p>
              </motion.div>
            ) : (
              <motion.div 
                className="syllabus-grid"
                layout
                variants={staggerChildren}
              >
                {filteredAndSortedSyllabi.map(syllabus => (
                  <motion.div 
                    key={syllabus.id} 
                    className="syllabus-card"
                    layout
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ y: -10, scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="card-header">
                      <div className="card-title-section">
                        <h3 className="card-title">{syllabus.title}</h3>
                        <div className="card-meta">
                          <span className="university">{syllabus.university}</span>
                          <span className="separator">•</span>
                          <span className="department">{syllabus.department}</span>
                        </div>
                      </div>
                      <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(syllabus.difficulty) }}>
                        {syllabus.difficulty}
                      </div>
                    </div>

                    <div className="card-content">
                      <div className="subjects-section">
                        <h4>Subjects Covered:</h4>
                        <div className="subjects-list">
                          {syllabus.subjects.map((subject, index) => (
                            <span key={index} className="subject-tag">{subject}</span>
                          ))}
                        </div>
                      </div>

                      <div className="tags-section">
                        <div className="tags">
                          {syllabus.tags.map((tag, index) => (
                            <span key={index} className="tag">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="card-stats">
                      <div className="stat">
                        <span className="stat-icon">📥</span>
                        <span>{syllabus.downloadCount.toLocaleString()} downloads</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">📅</span>
                        <span>{new Date(syllabus.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-icon">📄</span>
                        <span>{syllabus.fileSize}</span>
                      </div>
                    </div>

                    <div className="card-actions">
                      <motion.button 
                        className="btn btn-primary" 
                        onClick={() => handleDownload(syllabus)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        📥 Download Syllabus
                      </motion.button>
                      <motion.button 
                        className="btn btn-outline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        👁️ Preview
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
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

export default Syllabus;