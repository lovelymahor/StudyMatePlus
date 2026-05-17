// client/src/components/FeedbackModal.js
import React, { useState, useEffect } from "react";
import './FeedbackModal.css'; // This line connects the component to the CSS above

const FeedbackModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    university: '',
    examName: '',
    difficulty: 'Medium',
    feedback: '',
    tips: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to handle closing the modal with the Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('Submitting...');

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      setStatusMessage('Thank you! Your feedback has been submitted.');
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setStatusMessage(`Error: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Share Your Exam Experience</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentName">Name (Optional)</label>
            <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="university">University</label>
            <input type="text" id="university" name="university" value={formData.university} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="examName">Subject / Exam Name</label>
            <input type="text" id="examName" name="examName" value={formData.examName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty Level</label>
            <select id="difficulty" name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Very Hard">Very Hard</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea id="feedback" name="feedback" rows="4" value={formData.feedback} onChange={handleChange} required placeholder="How was the paper?"></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tips">Study Tips for Juniors</label>
            <textarea id="tips" name="tips" rows="3" value={formData.tips} onChange={handleChange} placeholder="e.g., 'Focus on Unit 2'"></textarea>
          </div>
          <button type="submit" className="submit-form-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default FeedbackModal;