import React, { useState, useMemo } from 'react';
import './Syllabus.css';

const Syllabus = () => {
  // Mock data for syllabi
  const syllabusData = [
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
  ];

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
      <section className="syllabus-hero">
        <div className="container">
          <div className="hero-content">
            <h1>📚 Syllabus Collection</h1>
            <p>Access comprehensive syllabus materials from top universities across India. Find subject details, course structures, and academic requirements all in one place.</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">{syllabusData.length}</span>
                <span className="stat-label">Syllabi Available</span>
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

      {/* Search and Filters */}
      <section className="search-filters">
        <div className="container">
          <div className="search-bar">
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
            <h2>Found {filteredAndSortedSyllabi.length} syllabi</h2>
            <p>Browse through our collection of verified academic syllabi</p>
          </div>

          {filteredAndSortedSyllabi.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">📭</div>
              <h3>No syllabi found</h3>
              <p>Try adjusting your search criteria or filters to find what you're looking for.</p>
            </div>
          ) : (
            <div className="syllabus-grid">
              {filteredAndSortedSyllabi.map(syllabus => (
                <div key={syllabus.id} className="syllabus-card">
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
                    <button className="btn btn-primary" onClick={() => handleDownload(syllabus)}>
                      📥 Download Syllabus
                    </button>
                    <button className="btn btn-outline">
                      👁️ Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Syllabus;