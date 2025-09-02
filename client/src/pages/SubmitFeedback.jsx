import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import "./SubmitFeedback.css"; // We will create this file next
import "./Feedback.css"; // Reusing some existing styles

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: "none" }}
            />
            <motion.span
              className="star"
              style={{
                cursor: "pointer",
                color: ratingValue <= (hover || rating) ? "#fbbf24" : "#d1d5db",
              }}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              ★
            </motion.span>
          </label>
        );
      })}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
};

const SubmitFeedback = () => {
  const [formData, setFormData] = useState({
    university: "",
    department: "",
    subjectName: "",
    semester: "",
    difficulty: "",
    overallRating: 0,
    importantTopics: "",
    studyTips: "",
    resourcesUsed: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const setRating = (value) => {
    setFormData({ ...formData, overallRating: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.university.trim())
      newErrors.university = "University is required.";
    if (!formData.subjectName.trim())
      newErrors.subjectName = "Subject Name is required.";
    if (!formData.semester) newErrors.semester = "Semester is required.";
    if (!formData.difficulty)
      newErrors.difficulty = "Exam Difficulty is required.";
    if (formData.overallRating === 0)
      newErrors.overallRating = "Overall Rating is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted Successfully:", formData);
      alert("Feedback submitted! Check the console for the data.");
      // Here you would typically send the data to a backend.
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  return (
    <motion.div
      className="submit-feedback-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="form-header">
          <h1>✍️ Share Your Exam Experience</h1>
          <p>
            Your insights can help countless other students succeed. Please fill
            out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="feedback-form" noValidate>
          {/* University & Department */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="university">University *</label>
              <input
                type="text"
                id="university"
                name="university"
                className={`form-input ${
                  errors.university ? "input-error" : ""
                }`}
                value={formData.university}
                onChange={handleChange}
                placeholder="e.g., Kerala University"
              />
              {errors.university && (
                <span className="error-message">{errors.university}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                className="form-input"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
            </div>
          </div>

          {/* Subject Name & Semester */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subjectName">Subject Name *</label>
              <input
                type="text"
                id="subjectName"
                name="subjectName"
                className={`form-input ${
                  errors.subjectName ? "input-error" : ""
                }`}
                value={formData.subjectName}
                onChange={handleChange}
                placeholder="e.g., Data Structures"
              />
              {errors.subjectName && (
                <span className="error-message">{errors.subjectName}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="semester">Semester *</label>
              <select
                id="semester"
                name="semester"
                className={`form-input ${errors.semester ? "input-error" : ""}`}
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.semester && (
                <span className="error-message">{errors.semester}</span>
              )}
            </div>
          </div>

          {/* Difficulty & Rating */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="difficulty">Exam Difficulty *</label>
              <select
                id="difficulty"
                name="difficulty"
                className={`form-input ${
                  errors.difficulty ? "input-error" : ""
                }`}
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy 😊</option>
                <option value="Moderate">Moderate 😐</option>
                <option value="Hard">Hard 😰</option>
              </select>
              {errors.difficulty && (
                <span className="error-message">{errors.difficulty}</span>
              )}
            </div>
            <div className="form-group">
              <label>Overall Rating *</label>
              <StarRating
                rating={formData.overallRating}
                setRating={setRating}
              />
              {errors.overallRating && (
                <span className="error-message">{errors.overallRating}</span>
              )}
            </div>
          </div>

          {/* Text Areas */}
          <div className="form-group">
            <label htmlFor="importantTopics">Important Topics</label>
            <textarea
              id="importantTopics"
              name="importantTopics"
              className="form-textarea"
              value={formData.importantTopics}
              onChange={handleChange}
              placeholder="List key topics, modules, or questions. (e.g., Trees, Graphs, Sorting)"
              rows="4"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="studyTips">Study Tips & Strategy</label>
            <textarea
              id="studyTips"
              name="studyTips"
              className="form-textarea"
              value={formData.studyTips}
              onChange={handleChange}
              placeholder="Share your preparation strategy, revision techniques, or any helpful tips."
              rows="6"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="resourcesUsed">Resources Used</label>
            <textarea
              id="resourcesUsed"
              name="resourcesUsed"
              className="form-textarea"
              value={formData.resourcesUsed}
              onChange={handleChange}
              placeholder="List any textbooks, websites, YouTube channels, or notes that helped you."
              rows="4"
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Feedback
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default SubmitFeedback;
