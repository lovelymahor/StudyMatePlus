import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Feedback.css";
import { Link } from "react-router-dom";

const Feedback = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedUniversity, setSelectedUniversity] = useState("all");

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
      importantTopics: [
        "Trees",
        "Graphs",
        "Sorting Algorithms",
        "Dynamic Programming",
      ],
      examPattern:
        "3 sections: MCQs (20 marks), Short answers (40 marks), Long problems (40 marks)",
      tips: "Focus heavily on tree traversals and graph algorithms. Practice coding problems daily. Previous year papers are very helpful.",
      timeManagement: "Spent 40% time on basics, 60% on problem solving",
      resources: [
        "Textbook",
        "GeeksforGeeks",
        "Previous Papers",
        "YouTube tutorials",
      ],
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
      importantTopics: [
        "Z-Transform",
        "DFT & FFT",
        "FIR Filters",
        "IIR Filters",
      ],
      examPattern:
        "2 sections: Theory (60 marks), Numerical problems (40 marks)",
      tips: "Mathematical derivations are crucial. Practice numerical problems extensively. Understanding concepts is more important than memorizing.",
      timeManagement: "70% theory, 30% numericals",
      resources: ["Reference books", "MATLAB practice", "Online courses"],
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
      importantTopics: [
        "Laws of Thermodynamics",
        "Steam Tables",
        "Heat Engines",
        "Refrigeration",
      ],
      examPattern:
        "Mixed: 5 short questions (50 marks), 3 long problems (50 marks)",
      tips: "Memorize steam table values. Practice problem-solving daily. Understand the physical concepts behind formulas.",
      timeManagement: "Equal time for theory and numericals",
      resources: ["Class notes", "Standard textbooks", "Problem banks"],
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
      importantTopics: [
        "Sequences & Series",
        "Continuity",
        "Differentiability",
        "Riemann Integration",
      ],
      examPattern: "Proof-based: 6 questions, attempt any 4 (25 marks each)",
      tips: "Focus on understanding proofs rather than memorizing. Practice writing clear, logical arguments. Work through examples step by step.",
      timeManagement: "80% proof understanding, 20% problem practice",
      resources: ["Standard textbooks", "Proof writing guides", "Study groups"],
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
      importantTopics: [
        "Schrödinger Equation",
        "Wave Functions",
        "Operators",
        "Angular Momentum",
      ],
      examPattern: "Theory + Derivations: 4 long questions (25 marks each)",
      tips: "Master the mathematical formalism. Practice derivations multiple times. Understand physical interpretations of mathematical results.",
      timeManagement: "60% derivations, 40% conceptual understanding",
      resources: ["Griffiths textbook", "Video lectures", "Problem sets"],
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
      importantTopics: [
        "PID Controllers",
        "Stability Analysis",
        "Root Locus",
        "Frequency Response",
      ],
      examPattern: "Numerical heavy: 3 sections with increasing difficulty",
      tips: "MATLAB simulations helped a lot. Practice controller design problems. Understand stability criteria thoroughly.",
      timeManagement: "50% theory, 50% MATLAB practice",
      resources: ["Course materials", "MATLAB", "Industrial case studies"],
    },
  ];

  const universities = [
    "all",
    "Kerala University",
    "Calicut University",
    "Cochin University",
  ];
  const difficulties = ["all", "easy", "moderate", "hard"];

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesDifficulty =
      selectedFilter === "all" || feedback.difficulty === selectedFilter;
    const matchesUniversity =
      selectedUniversity === "all" ||
      feedback.university === selectedUniversity;
    return matchesDifficulty && matchesUniversity;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "#10b981";
      case "moderate":
        return "#f59e0b";
      case "hard":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "😊";
      case "moderate":
        return "😐";
      case "hard":
        return "😰";
      default:
        return "❓";
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span
        key={index}
        className={`star ${index < rating ? "filled" : ""}`}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      >
        ★
      </motion.span>
    ));
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardHover = {
    rest: {
      scale: 1,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="feedback">
      {/* Hero Section */}
      <motion.section
        className="feedback-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.div
            className="feedback-hero-content"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              🗣️ Student Feedback
            </motion.h1>
            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Real experiences from students who have taken the exams. Get
              insights into difficulty levels, important topics, exam patterns,
              and preparation strategies.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="feedback-stats"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="container">
          <motion.div
            className="stats-grid"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: "📊", number: "500+", label: "Student Reviews" },
              { icon: "🎓", number: "50+", label: "Subjects Covered" },
              { icon: "🏛️", number: "15+", label: "Universities" },
              { icon: "⭐", number: "4.2", label: "Avg. Helpfulness" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="stat-icon"
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.8, type: "spring" }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="stat-number"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1 + 1,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Filters Section */}
      <motion.section
        className="feedback-filters"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.2 }}
      >
        <div className="container">
          <motion.div
            className="filters-wrapper"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <motion.div className="filter-group" whileHover={{ scale: 1.02 }}>
              <label htmlFor="difficulty-filter">Filter by Difficulty:</label>
              <motion.select
                id="difficulty-filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="filter-select"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="all">All Difficulties</option>
                {difficulties.slice(1).map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </motion.select>
            </motion.div>

            <motion.div className="filter-group" whileHover={{ scale: 1.02 }}>
              <label htmlFor="university-filter">Filter by University:</label>
              <motion.select
                id="university-filter"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="filter-select"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="all">All Universities</option>
                {universities.slice(1).map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </motion.select>
            </motion.div>
          </motion.div>

          <motion.div
            className="results-count"
            key={filteredFeedback.length}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Showing {filteredFeedback.length} feedback
            {filteredFeedback.length !== 1 ? "s" : ""}
          </motion.div>
        </div>
      </motion.section>

      {/* Feedback Cards */}
      <motion.section className="feedback-content">
        <div className="container">
          <AnimatePresence>
            <motion.div
              className="feedback-grid"
              layout
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
            >
              {filteredFeedback.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  className="feedback-card"
                  layout
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.1, duration: 0.5 },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="feedback-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <div className="student-info">
                      <motion.h3
                        className="student-name"
                        whileHover={{ color: "#3b82f6" }}
                      >
                        {feedback.studentName}
                      </motion.h3>
                      <div className="student-details">
                        <span className="university">
                          {feedback.university}
                        </span>
                        <span className="separator">•</span>
                        <span className="department">
                          {feedback.department}
                        </span>
                      </div>
                    </div>
                    <div className="feedback-rating">
                      <div className="stars">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="subject-info"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <h4 className="subject-name">{feedback.subject}</h4>
                    <div className="subject-details">
                      <span className="semester">{feedback.semester}</span>
                      <span className="separator">•</span>
                      <span className="exam-date">{feedback.examDate}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="difficulty-badge"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <motion.span
                      className="difficulty-indicator"
                      style={{
                        backgroundColor: getDifficultyColor(
                          feedback.difficulty
                        ),
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {getDifficultyIcon(feedback.difficulty)}{" "}
                      {feedback.difficulty.toUpperCase()}
                    </motion.span>
                    <span className="prep-time">
                      📅 {feedback.preparationTime}
                    </span>
                  </motion.div>

                  <motion.div
                    className="feedback-details"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <div className="detail-section">
                      <h5>🎯 Important Topics</h5>
                      <div className="topics-list">
                        {feedback.importantTopics.map((topic, topicIndex) => (
                          <motion.span
                            key={topicIndex}
                            className="topic-tag"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.1 + topicIndex * 0.05 + 0.6,
                            }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "#e0f2fe",
                            }}
                          >
                            {topic}
                          </motion.span>
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
                      <p className="time-management">
                        {feedback.timeManagement}
                      </p>
                    </div>

                    <div className="detail-section">
                      <h5>📚 Resources Used</h5>
                      <div className="resources-list">
                        {feedback.resources.map((resource, resourceIndex) => (
                          <motion.span
                            key={resourceIndex}
                            className="resource-tag"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: index * 0.1 + resourceIndex * 0.05 + 0.8,
                            }}
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "#f0f9ff",
                            }}
                          >
                            {resource}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="feedback-cta"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="container">
          <motion.div
            className="cta-content"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.7 }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              Share Your Experience
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              Help fellow students by sharing your exam experience and study
              tips. Your feedback could be the key to someone&apos;s success!
            </motion.p>
            <Link to="/feedback/submit" style={{ textDecoration: "none" }}>
              <motion.button
                className="btn btn-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, type: "spring", stiffness: 300 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Your Feedback
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Feedback;
