// client/src/components/FeedbackModal.js

import React, { useState, useEffect } from "react";
import "./FeedbackModal.css";

const API_URL =
  process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

const FeedbackModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    university: "",
    examName: "",
    difficulty: "Medium",
    feedback: "",
    tips: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ESC key close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatusMessage("Submitting feedback...");

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setStatusMessage("✅ Feedback submitted successfully!");

      setFormData({
        studentName: "",
        university: "",
        examName: "",
        difficulty: "Medium",
        feedback: "",
        tips: "",
      });

      if (onSuccess) {
        onSuccess();
      }

      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Feedback submission error:", error);

      setStatusMessage(
        `❌ ${error.message || "Failed to submit feedback"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        {/* Heading */}
        <h2>Share Your Exam Experience</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Name */}
          <div className="form-group">
            <label>Name (Optional)</label>

            <input
              type="text"
              name="studentName"
              placeholder="Your name"
              value={formData.studentName}
              onChange={handleChange}
            />
          </div>

          {/* University */}
          <div className="form-group">
            <label>University</label>

            <input
              type="text"
              name="university"
              placeholder="e.g. IIT Roorkee"
              value={formData.university}
              onChange={handleChange}
              required
            />
          </div>

          {/* Exam */}
          <div className="form-group">
            <label>Subject / Exam Name</label>

            <input
              type="text"
              name="examName"
              placeholder="e.g. DAA Midsem"
              value={formData.examName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Difficulty */}
          <div className="form-group">
            <label>Difficulty Level</label>

            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Very Hard">Very Hard</option>
            </select>
          </div>

          {/* Feedback */}
          <div className="form-group">
            <label>Your Feedback</label>

            <textarea
              name="feedback"
              rows="5"
              placeholder="How was the exam? Important topics? Pattern?"
              value={formData.feedback}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tips */}
          <div className="form-group">
            <label>Study Tips for Juniors</label>

            <textarea
              name="tips"
              rows="4"
              placeholder="Any preparation tips?"
              value={formData.tips}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="submit-form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : "Submit Feedback"}
          </button>
        </form>

        {/* Status Message */}
        {statusMessage && (
          <p className="status-message">
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;