import React, { useState, useMemo, useEffect } from 'react';
import './Notes.css';

const Notes = () => {
  // Mock data for notes
  const notesData = [
    {
      id: 1,
      title: "Python - Notes",
      university: "Mumbai University",
      department: "Electronics Engineering",
      semester: 1,
      subject: "Python",
      fileType: "PDF",
      downloadCount: 1400,
      uploadDate: "2024-02-01",
      fileSize: "3.5 MB",
      tags: ["CSE", "Python", "First Year"],
      difficulty: "Beginner",
      link: "/pdf/python.pdf"
    },
    {
      id: 2,
      title: "Operating Systems - Detailed Notes",
      university: "NIT Trichy",
      department: "Computer Science",
      semester: 2,
      subject: "Operating Systems",
      fileType: "PDF",
      downloadCount: 870,
      uploadDate: "2024-04-02",
      fileSize: "5.8 MB",
      tags: ["CSE", "OS", "Semester 4"],
      difficulty: "Intermediate",
      link: "/pdf/OS.pdf"
    },
    {
      id: 3,
      title: "Data Structures - Notes",
      university: "Anna University",
      department: "Computer Science",
      semester: 3,
      subject: "Data Structures",
      fileType: "PDF",
      downloadCount: 980,
      uploadDate: "2024-03-15",
      fileSize: "4.2 MB",
      tags: ["CSE", "DSA"],
      difficulty: "Intermediate",
      link: "/pdf/DSA.pdf"
    },
    {
      id: 4,
      title: "Database Management Systems (DBMS) - Notes",
      university: "IIT Delhi",
      department: "Computer Science",
      semester: 4,
      subject: "Database Systems",
      fileType: "PDF",
      downloadCount: 1100,
      uploadDate: "2024-03-18",
      fileSize: "6.0 MB",
      tags: ["CSE", "DBMS", "SQL"],
      difficulty: "Intermediate",
      link: "/pdf/DBMS.pdf"
    },
    {
      id: 5,
      title: "Java - Notes",
      university: "Delhi University",
      department: "Computer Science",
      semester: 5,
      subject: "Java",
      fileType: "PDF",
      downloadCount: 1400,
      uploadDate: "2024-02-01",
      fileSize: "3.5 MB",
      tags: ["CSE", "Java", "First Year"],
      difficulty: "Beginner",
      link: "/pdf/Java.pdf"
    },
    {
      id: 6,
      title: "Advance Web Development",
      university: "VIT Vellore",
      department: "Computer Science",
      semester: 6,
      subject: "Web Development",
      fileType: "PDF",
      downloadCount: 640,
      uploadDate: "2024-07-01",
      fileSize: "6.5 MB",
      tags: ["CSE", "Web", "Semester 6"],
      difficulty: "Advanced",
      link: "/pdf/WebDevelopment.pdf"
    }
  ];

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [sortBy, setSortBy] = useState('downloads');
  const [previewUrl, setPreviewUrl] = useState(null);

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

      return matchesSearch && matchesUniversity && matchesDepartment && matchesSemester;
    });

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
  }, [searchTerm, selectedUniversity, selectedDepartment, selectedSemester, sortBy, notesData]);

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
      <section className="notes-hero">
        <div className="container">
          <div className="hero-content">
            <h1>📝 Notes, Books & PPTs</h1>
            <p>
              Access and share comprehensive study notes, reference books, and PPTs
              uploaded by peers and seniors from top universities.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">{notesData.length}</span>
                <span className="stat-label">Resources Available</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">{universities.length - 1}</span>
                <span className="stat-label">Universities</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">{departments.length - 1}</span>
                <span className="stat-label">Departments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="search-filters">
        <div className="container">
          <div className="search-bar">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search notes, books, or PPTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="filters">
            <div className="filter-group">
              <label>University:</label>
              <select value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)}>
                {universities.map(uni => (
                  <option key={uni} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Department:</label>
              <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Semester:</label>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>{sem === 'All' ? 'All' : `Semester ${sem}`}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="downloads">Most Downloaded</option>
                <option value="date">Latest Upload</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results">
        <div className="container">
          <div className="results-header">
            <h2>Found {filteredNotes.length} resources</h2>
            <p>Browse notes, books, and PPTs shared by your peers and seniors</p>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">📭</div>
              <h3>No resources found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className="notes-grid">
              {filteredNotes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="card-header">
                    <div className="card-title-section">
                      <h3 className="card-title">{note.title}</h3>
                      <div className="card-meta">
                        <span className="university">{note.university}</span>
                        <span className="separator">•</span>
                        <span className="department">{note.department}</span>
                      </div>
                    </div>
                    <div className="difficulty-badge" style={{ backgroundColor: getDifficultyColor(note.difficulty) }}>
                      {note.difficulty}
                    </div>
                  </div>

                  <div className="card-content">
                    <p className="subject">Subject: {note.subject}</p>
                    <div className="tags-section">
                      <div className="tags">
                        {note.tags.map((tag, index) => (
                          <span key={index} className="tag">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card-stats">
                    <div className="stat">
                      <span className="stat-icon">📥</span>
                      <span>{note.downloadCount.toLocaleString()} downloads</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">📅</span>
                      <span>{new Date(note.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-icon">📄</span>
                      <span>{note.fileSize}</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <a href={note.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      📥 Download
                    </a>
                    <button
                      className="btn btn-outline"
                      onClick={() => setPreviewUrl(note.link)}
                    >
                      👁️ Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upload Section */}
      <section className="upload-section">
        <div className="container">
          <h3>Want to Share Your Notes, Books or PPTs?</h3>
          <p>Upload your study materials to help others in your community.</p>
          <button className="btn btn-primary">
            📤 Upload Resource
          </button>
        </div>
      </section>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="modal-overlay" onClick={() => setPreviewUrl(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <embed
              src={previewUrl}
              type="application/pdf"
              width="100%"
              height="600px"
            />
            <button className="btn btn-primary close-btn" onClick={() => setPreviewUrl(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;

