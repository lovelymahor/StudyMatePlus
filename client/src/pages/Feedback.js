import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUniversity, setSelectedUniversity] = useState('all');

  // Sample feedback data
  const feedbackData = [
    {
      id: 1,
      studentName: "Arjun K.",
      university: "Kerala University",
      department: "Computer Science",
      subject: "Data Structures",
      semester: "4th Semester",
      examDate: "May 2024",
      difficulty: "moderate",
      rating: 4,
      preparationTime: "6 weeks",
      importantTopics: ["Trees", "Graphs", "Sorting Algorithms", "Dynamic Programming"],
      examPattern: "3 sections: MCQs (20 marks), Short answers (40 marks), Long problems (40 marks)",
      tips: "Focus heavily on tree traversals and graph algorithms. Practice coding problems daily. Previous year papers are very helpful.",
      timeManagement: "Spent 40% time on basics, 60% on problem solving",
      resources: ["Textbook", "GeeksforGeeks", "Previous Papers", "YouTube tutorials"]
    },
    {
      id: 2,
      studentName: "Priya S.",
      university: "Calicut University",
      department: "Electronics",
      subject: "Digital Signal Processing",
      semester: "6th Semester",
      examDate: "April 2024",
      difficulty: "hard",
      rating: 3,
      preparationTime: "8 weeks",
      importantTopics: ["Z-Transform", "DFT & FFT", "FIR Filters", "IIR Filters"],
      examPattern: "2 sections: Theory (60 marks), Numerical problems (40 marks)",
      tips: "Mathematical derivations are crucial. Practice numerical problems extensively. Understanding concepts is more important than memorizing.",
      timeManagement: "70% theory, 30% numericals",
      resources: ["Reference books", "MATLAB practice", "Online courses"]
    },
    {
      id: 3,
      studentName: "Mohammed R.",
      university: "Cochin University",
      department: "Mechanical",
      subject: "Thermodynamics",
      semester: "3rd Semester",
      examDate: "June 2024",
      difficulty: "easy",
      rating: 5,
      preparationTime: "4 weeks",
      importantTopics: ["Laws of Thermodynamics", "Steam Tables", "Heat Engines", "Refrigeration"],
      examPattern: "Mixed: 5 short questions (50 marks), 3 long problems (50 marks)",
      tips: "Memorize steam table values. Practice problem-solving daily. Understand the physical concepts behind formulas.",
      timeManagement: "Equal time for theory and numericals",
      resources: ["Class notes", "Standard textbooks", "Problem banks"]
    },
    {
      id: 4,
      studentName: "Sneha M.",
      university: "Kerala University",
      department: "Mathematics",
      subject: "Real Analysis",
      semester: "5th Semester",
      examDate: "May 2024",
      difficulty: "hard",
      rating: 4,
      preparationTime: "10 weeks",
      importantTopics: ["Sequences & Series", "Continuity", "Differentiability", "Riemann Integration"],
      examPattern: "Proof-based: 6 questions, attempt any 4 (25 marks each)",
      tips: "Focus on understanding proofs rather than memorizing. Practice writing clear, logical arguments. Work through examples step by step.",
      timeManagement: "80% proof understanding, 20% problem practice",
      resources: ["Standard textbooks", "Proof writing guides", "Study groups"]
    },
    {
      id: 5,
      studentName: "Rahul T.",
      university: "Calicut University",
      department: "Physics",
      subject: "Quantum Mechanics",
      semester: "6th Semester",
      examDate: "April 2024",
      difficulty: "moderate",
      rating: 4,
      preparationTime: "7 weeks",
      importantTopics: ["Schrödinger Equation", "Wave Functions", "Operators", "Angular Momentum"],
      examPattern: "Theory + Derivations: 4 long questions (25 marks each)",
      tips: "Master the mathematical formalism. Practice derivations multiple times. Understand physical interpretations of mathematical results.",
      timeManagement: "60% derivations, 40% conceptual understanding",
      resources: ["Griffiths textbook", "Video lectures", "Problem sets"]
    },
    {
      id: 6,
      studentName: "Aisha K.",
      university: "Cochin University",
      department: "Chemical",
      subject: "Process Control",
      semester: "7th Semester",
      examDate: "March 2024",
      difficulty: "moderate",
      rating: 5,
      preparationTime: "5 weeks",
      importantTopics: ["PID Controllers", "Stability Analysis", "Root Locus", "Frequency Response"],
      examPattern: "Numerical heavy: 3 sections with increasing difficulty",
      tips: "MATLAB simulations helped a lot. Practice controller design problems. Understand stability criteria thoroughly.",
      timeManagement: "50% theory, 50% MATLAB practice",
      resources: ["Course materials", "MATLAB", "Industrial case studies"]
    }
  ];

  const universities = ['all', 'Kerala University', 'Calicut University', 'Cochin University'];
  const difficulties = ['all', 'easy', 'moderate', 'hard'];

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesDifficulty = selectedFilter === 'all' || feedback.difficulty === selectedFilter;
    const matchesUniversity = selectedUniversity === 'all' || feedback.university === selectedUniversity;
    return matchesDifficulty && matchesUniversity;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '#10b981';
      case 'moderate': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'easy': return '😊';
      case 'moderate': return '😐';
      case 'hard': return '😰';
      default: return '❓';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star ${index < rating ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="feedback">
      {/* Hero Section */}
      <section className="feedback-hero">
        <div className="container">
          <div className="feedback-hero-content">
            <h1>🗣️ Student Feedback</h1>
            <p className="hero-subtitle">
              Real experiences from students who have taken the exams. Get insights into 
              difficulty levels, important topics, exam patterns, and preparation strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="feedback-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Student Reviews</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎓</div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Subjects Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🏛️</div>
              <div className="stat-number">15+</div>
              <div className="stat-label">Universities</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">4.2</div>
              <div className="stat-label">Avg. Helpfulness</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="feedback-filters">
        <div className="container">
          <div className="filters-wrapper">
            <div className="filter-group">
              <label htmlFor="difficulty-filter">Filter by Difficulty:</label>
              <select 
                id="difficulty-filter"
                value={selectedFilter} 
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Difficulties</option>
                {difficulties.slice(1).map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="university-filter">Filter by University:</label>
              <select 
                id="university-filter"
                value={selectedUniversity} 
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Universities</option>
                {universities.slice(1).map(university => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="results-count">
            Showing {filteredFeedback.length} feedback{filteredFeedback.length !== 1 ? 's' : ''}
          </div>
        </div>
      </section>

      {/* Feedback Cards */}
      <section className="feedback-content">
        <div className="container">
          <div className="feedback-grid">
            {filteredFeedback.map(feedback => (
              <div key={feedback.id} className="feedback-card">
                <div className="feedback-header">
                  <div className="student-info">
                    <h3 className="student-name">{feedback.studentName}</h3>
                    <div className="student-details">
                      <span className="university">{feedback.university}</span>
                      <span className="separator">•</span>
                      <span className="department">{feedback.department}</span>
                    </div>
                  </div>
                  <div className="feedback-rating">
                    <div className="stars">
                      {renderStars(feedback.rating)}
                    </div>
                  </div>
                </div>

                <div className="subject-info">
                  <h4 className="subject-name">{feedback.subject}</h4>
                  <div className="subject-details">
                    <span className="semester">{feedback.semester}</span>
                    <span className="separator">•</span>
                    <span className="exam-date">{feedback.examDate}</span>
                  </div>
                </div>

                <div className="difficulty-badge">
                  <span 
                    className="difficulty-indicator"
                    style={{ backgroundColor: getDifficultyColor(feedback.difficulty) }}
                  >
                    {getDifficultyIcon(feedback.difficulty)} {feedback.difficulty.toUpperCase()}
                  </span>
                  <span className="prep-time">📅 {feedback.preparationTime}</span>
                </div>

                <div className="feedback-details">
                  <div className="detail-section">
                    <h5>🎯 Important Topics</h5>
                    <div className="topics-list">
                      {feedback.importantTopics.map((topic, index) => (
                        <span key={index} className="topic-tag">{topic}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h5>📝 Exam Pattern</h5>
                    <p className="exam-pattern">{feedback.examPattern}</p>
                  </div>

                  <div className="detail-section">
                    <h5>💡 Study Tips</h5>
                    <p className="study-tips">{feedback.tips}</p>
                  </div>

                  <div className="detail-section">
                    <h5>⏰ Time Management</h5>
                    <p className="time-management">{feedback.timeManagement}</p>
                  </div>

                  <div className="detail-section">
                    <h5>📚 Resources Used</h5>
                    <div className="resources-list">
                      {feedback.resources.map((resource, index) => (
                        <span key={index} className="resource-tag">{resource}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="feedback-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Share Your Experience</h2>
            <p>
              Help fellow students by sharing your exam experience and study tips. 
              Your feedback could be the key to someone's success!
            </p>
            <button className="btn btn-primary">Submit Your Feedback</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;