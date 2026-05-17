import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from "react-icons/fa";
import './Notes.css';

const Notes = () => {
  const fileInputRef = useRef(null);
  
  // Dynamic state initialized with mock data as fallback
  const [notesData, setNotesData] = useState([
    { id: 1, title: "Python - Notes", university: "Mumbai University", department: "Electronics Engineering", semester: 1, subject: "Python", fileType: "PDF", downloadCount: 1400, uploadDate: "2024-02-01", fileSize: "3.5 MB", tags: ["CSE", "Python", "First Year"], difficulty: "Beginner", link: "/pdf/python.pdf" },
    { id: 2, title: "Operating Systems - Detailed Notes", university: "NIT Trichy", department: "Computer Science", semester: 2, subject: "Operating Systems", fileType: "PDF", downloadCount: 870, uploadDate: "2024-04-02", fileSize: "5.8 MB", tags: ["CSE", "OS", "Semester 4"], difficulty: "Intermediate", link: "/pdf/OS.pdf" },
    { id: 3, title: "Data Structures - Notes", university: "Anna University", department: "Computer Science", semester: 3, subject: "Data Structures", fileType: "PDF", downloadCount: 980, uploadDate: "2024-03-15", fileSize: "4.2 MB", tags: ["CSE", "DSA"], difficulty: "Intermediate", link: "/pdf/DSA.pdf" },
    { id: 4, title: "Database Management Systems (DBMS) - Notes", university: "IIT Delhi", department: "Computer Science", semester: 4, subject: "Database Systems", fileType: "PDF", downloadCount: 1100, uploadDate: "2024-03-18", fileSize: "6.0 MB", tags: ["CSE", "DBMS", "SQL"], difficulty: "Intermediate", link: "/pdf/DBMS.pdf" },
    { id: 5, title: "Java - Notes", university: "Delhi University", department: "Computer Science", semester: 5, subject: "Java", fileType: "PDF", downloadCount: 1400, uploadDate: "2024-02-01", fileSize: "3.5 MB", tags: ["CSE", "Java", "First Year"], difficulty: "Beginner", link: "/pdf/Java.pdf" },
    { id: 6, title: "Advance Web Development", university: "VIT Vellore", department: "Computer Science", semester: 6, subject: "Web Development", fileType: "PDF", downloadCount: 640, uploadDate: "2024-07-01", fileSize: "6.5 MB", tags: ["CSE", "Web", "Semester 6"], difficulty: "Advanced", link: "/pdf/WebDevelopment.pdf" },
  ]);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [sortBy, setSortBy] = useState('downloads');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  
  // Progress Monitor States
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Fetch saved database notes on screen load and merge with mock data
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/notes');
        if (response.ok) {
          const dbData = await response.json();
          if (dbData && dbData.length > 0) {
            setNotesData(prevMockData => {
              // Deduplicate based on ID string structures perfectly
              const uniqueDbData = dbData.filter(
                dbItem => !prevMockData.some(mockItem => mockItem.id === dbItem._id || mockItem.id === dbItem.id)
              );
              return [...uniqueDbData, ...prevMockData];
            });
          }
        }
      } catch (error) {
        console.error("Could not connect to backend database, displaying local mock assets only:", error);
      }
    };
    fetchNotes();
  }, []);

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const fileObj = e.target.files[0];

    const formData = new FormData();
    formData.append('file', fileObj);
    
    const cleanTitle = fileObj.name ? fileObj.name.split('.')[0] : 'Untitled Resource';
    
    formData.append('title', cleanTitle);
    formData.append('university', selectedUniversity === 'All' ? 'Mumbai University' : selectedUniversity);
    formData.append('department', selectedDepartment === 'All' ? 'Computer Science' : selectedDepartment);
    formData.append('semester', selectedSemester === 'All' ? 1 : Number(selectedSemester));
    formData.append('subject', selectedSubject === 'All' ? 'General' : selectedSubject);

    setIsUploading(true);
    setUploadProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5001/api/notes/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentage);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status === 201 || xhr.status === 200) {
        const parsedResponse = JSON.parse(xhr.responseText);
        
        // CRITICAL SYSTEM PATCH: Safely fallback handles if object wrapper layer exists
        const actualNoteObj = parsedResponse.note ? parsedResponse.note : parsedResponse;

        alert("File uploaded and saved permanently!");
        setNotesData((prevNotes) => [actualNoteObj, ...prevNotes]);
        if (fileInputRef.current) fileInputRef.current.value = ""; 
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          alert(`Upload failed: ${errorData.message || 'Server formatting issue'}`);
        } catch {
          alert(`Upload failed with status code: ${xhr.status}`);
        }
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      alert("Could not connect to backend server or upload interrupted.");
    };

    xhr.send(formData);
  };

  // Helper Function: Force cross-origin direct file download
const handleDownload = (e, note) => {
  e.preventDefault();
  
  if (note.link.startsWith('/pdf/')) {
    window.open(note.link, '_blank');
    return;
  }

  // Construct absolute URL pointing explicitly to your Node backend instance
  const absoluteDownloadUrl = note.link.startsWith('http') 
    ? note.link 
    : `http://localhost:5001${note.link}`;

  // Force a secure file detachment window opening link sequence
  const link = document.createElement('a');
  link.href = absoluteDownloadUrl;
  link.setAttribute('download', `${note.title}.${note.fileType?.toLowerCase() || 'pdf'}`); 
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  // Scroll tracking visibility controllers
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    document.body.classList.toggle('modal-open', !!previewUrl);
    return () => document.body.classList.remove('modal-open');
  }, [previewUrl]);

  const universities = useMemo(() => ['All', ...new Set(notesData.map(item => item.university).filter(Boolean))], [notesData]);
  const departments = useMemo(() => ['All', ...new Set(notesData.map(item => item.department).filter(Boolean))], [notesData]);
  const semesters = useMemo(() => ['All', ...new Set(notesData.map(item => item.semester?.toString()).filter(Boolean))], [notesData]);
  const subjects = useMemo(() => ['All', ...new Set(notesData.map(item => item.subject).filter(Boolean))], [notesData]);

  const filteredNotes = useMemo(() => {
    let filtered = notesData.filter(item => {
      const matchesSearch =
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesUniversity = selectedUniversity === 'All' || item.university === selectedUniversity;
      const matchesDepartment = selectedDepartment === 'All' || item.department === selectedDepartment;
      const matchesSemester = selectedSemester === 'All' || item.semester?.toString() === selectedSemester;
      const matchesSubject = selectedSubject === 'All' || item.subject === selectedSubject;
      return matchesSearch && matchesUniversity && matchesDepartment && matchesSemester && matchesSubject;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'downloads': return (b.downloadCount || 0) - (a.downloadCount || 0);
        case 'date': return new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0);
        case 'title': return (a.title || '').localeCompare(b.title || '');
        default: return 0;
      }
    });
  }, [searchTerm, selectedUniversity, selectedDepartment, selectedSemester, selectedSubject, sortBy, notesData]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return '#4ade80';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

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

  return (
    <div className="notes">
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*,application/pdf" 
        onChange={handleFileChange} 
      />

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
              <motion.div className="hero-stat" variants={scaleIn}><span className="stat-number">{Math.max(0, universities.length - 1)}</span><span className="stat-label">Universities</span></motion.div>
              <motion.div className="hero-stat" variants={scaleIn}><span className="stat-number">{Math.max(0, departments.length - 1)}</span><span className="stat-label">Departments</span></motion.div>
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
                  <motion.div key={note._id || note.id} className="note-card" layout variants={scaleIn} whileHover={{ y: -10, scale: 1.03, boxShadow: "0 15px 30px rgba(0,0,0,0.1)" }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="card-header">
                      <div className="card-title-section"><h3 className="card-title">{note.title}</h3><div className="card-meta"><span className="university">{note.university}</span><span className="separator">•</span><span className="department">{note.department}</span></div></div>
                      <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(note.difficulty || 'Intermediate') }}>{note.difficulty || 'Intermediate'}</div>
                    </div>
                    <div className="card-content"><p className="subject">Subject: {note.subject}</p><div className="tags-section"><div className="tags">{(note.tags || []).map((tag, index) => (<span key={index} className="tag">#{tag}</span>))}</div></div></div>
                    <div className="card-stats"><div className="stat"><span className="stat-icon">📥</span><span>{(note.downloadCount || 0).toLocaleString()} downloads</span></div><div className="stat"><span className="stat-icon">📅</span><span>{note.uploadDate ? new Date(note.uploadDate).toLocaleDateString() : new Date().toLocaleDateString()}</span></div><div className="stat"><span className="stat-icon">📄</span><span>{note.fileSize || 'N/A'}</span></div></div>
                    
                    <div className="card-actions">
                      <motion.button 
                        className="btn btn-primary" 
                        onClick={(e) => handleDownload(e, note)}
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                      >
                        📥 Download
                      </motion.button>
                      <motion.button 
                        className="btn btn-outline" 
                        onClick={() => setPreviewUrl(note.link)} 
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

      {/* Upload Section */}
      <motion.section className="upload-section" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerChildren}>
        <div className="container">
          <motion.h3 variants={fadeInUp}>Want to Share Your Notes, Books or PPTs?</motion.h3>
          <motion.p variants={fadeInUp}>Upload your study materials to help others in your community.</motion.p>
          
          {isUploading && (
            <div style={{ width: '100%', maxWidth: '400px', margin: '15px auto', background: '#e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: `${uploadProgress}%`, height: '8px', background: '#4f46e5', transition: 'width 0.2s ease-on-out' }}></div>
              <p style={{ marginTop: '5px', fontSize: '14px', fontWeight: 'bold', color: '#4f46e5' }}>Uploading... {uploadProgress}%</p>
            </div>
          )}

          <motion.button 
            className="btn btn-primary" 
            variants={fadeInUp} 
            whileHover={{ scale: 1.05, y: -5 }} 
            whileTap={{ scale: 0.95 }}
            onClick={handleUploadClick}
            disabled={isUploading}
          >
            {isUploading ? `Uploading (${uploadProgress}%)` : "📤 Upload Resource"}
          </motion.button>
        </div>
      </motion.section>
{/* Preview Modal */}
<AnimatePresence>
  {previewUrl && (
    <motion.div key="modal" className="modal-overlay" onClick={() => setPreviewUrl(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal-content" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
        
        <div className="preview-container" style={{ width: '100%', minHeight: '450px', maxHeight: '70vh', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#f9fafb', borderRadius: '8px' }}>
          {(() => {
            // Resolve absolute paths properly
            let absolutePreviewUrl = previewUrl;
            if (!previewUrl.startsWith('http')) {
              if (previewUrl.startsWith('/pdf/')) {
                absolutePreviewUrl = `http://localhost:3000${previewUrl}`;
              } else {
                absolutePreviewUrl = `http://localhost:5001${previewUrl}`;
              }
            }

            const isImage = absolutePreviewUrl.match(/\.(jpeg|jpg|gif|png)$/i) || notesData.find(n => n.link === previewUrl)?.fileType?.toLowerCase() === 'png';

            if (isImage) {
              return (
                <img 
                  src={absolutePreviewUrl} 
                  alt="Resource Preview" 
                  style={{ maxWidth: '100%', maxHeight: '550px', objectFit: 'contain', borderRadius: '8px' }} 
                />
              );
            }

            // For uploaded PDFs - Use a reliable fallback layout if the iframe renders empty
            return (
              <div style={{ width: '100%', height: '550px', display: 'flex', flexDirection: 'column' }}>
                <iframe 
                  src={`${absolutePreviewUrl}#toolbar=0&navpanes=0`} 
                  title="Document Preview Container"
                  width="100%" 
                  height="100%"
                  style={{ borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white' }}
                />
                
                {/* Safe Assist Bar: Ensures users can always read the document even if their browser blocks native nested rendering */}
                <div style={{ padding: '12px', background: '#f3f4f6', borderTop: '1px solid #e5e7eb', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0 0 8px 8px' }}>
                  <span style={{ fontSize: '13px', color: '#4b5563', fontWeight: '500' }}>
                     Empty space? Your browser plugin blocked inline loading.
                  </span>
                  <a 
                    href={absolutePreviewUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ background: '#4f46e5', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                  >
                     Open in New Tab
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
        
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
          <motion.button className="btn btn-primary close-btn" onClick={() => setPreviewUrl(null)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Close</motion.button>
        </div>
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