import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './HackathonGuidance.css';
import { useAuth } from '../context/AuthContext';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const categoryOptions = [
  { value: 'all', label: 'All' },
  { value: 'idea-validation', label: 'Idea Validation' },
  { value: 'team-building', label: 'Team Building' },
  { value: 'prototype', label: 'Prototype' },
  { value: 'pitching', label: 'Pitching' },
  { value: 'deployment', label: 'Deployment' },
  { value: 'judging', label: 'Judging' },
];

const fallbackExperts = [
  {
    _id: 'local-1',
    name: 'Aditi Sharma',
    campus: 'IIT Delhi',
    specialization: 'AI/ML Hackathons',
    bio: '3x national finalist. Helps teams with problem framing and scope control.',
    achievements: ['Smart India Hackathon Finalist', 'Winner @ CodeRush 2025'],
  },
  {
    _id: 'local-2',
    name: 'Rohan Verma',
    campus: 'NIT Trichy',
    specialization: 'MVP & Demo Strategy',
    bio: 'Focuses on rapid prototyping and presentation storytelling.',
    achievements: ['2x Inter-college Hack Winner'],
  },
];

const fallbackGuidance = [
  {
    _id: 'g-1',
    title: 'Validate your idea in 24 hours',
    category: 'idea-validation',
    content:
      'Talk to 5 real users, define one measurable problem statement, and reject features that do not improve your success metric.',
    expertId: { name: 'Aditi Sharma', campus: 'IIT Delhi', specialization: 'AI/ML Hackathons' },
    tags: ['MVP', 'Problem Statement', 'User Research'],
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'g-2',
    title: 'Pitch deck that wins judges',
    category: 'pitching',
    content:
      'Use this order: Problem → Why now → Solution demo → Impact metric → Business value → Roadmap. Keep total runtime under 5 minutes.',
    expertId: { name: 'Rohan Verma', campus: 'NIT Trichy', specialization: 'MVP & Demo Strategy' },
    tags: ['Pitch', 'Judging', 'Demo'],
    createdAt: new Date().toISOString(),
  },
];

const HackathonGuidance = () => {
  const { user, accessToken } = useAuth();

  const [experts, setExperts] = useState([]);
  const [guidanceList, setGuidanceList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [questionForm, setQuestionForm] = useState({
    studentName: user?.name || '',
    email: user?.email || '',
    topic: '',
    question: '',
  });

  useEffect(() => {
    document.title = 'StudyMatePlus | Hackathon Guidance';
  }, []);

  useEffect(() => {
    if (user) {
      setQuestionForm((prev) => ({ ...prev, studentName: user.name || '', email: user.email || '' }));
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      try {
        const [expertsRes, guidanceRes] = await Promise.all([
          axios.get(`${API_BASE}/api/hackathon/experts`),
          axios.get(`${API_BASE}/api/hackathon/guidance`),
        ]);

        setExperts(expertsRes.data?.data || []);
        setGuidanceList(guidanceRes.data?.data || []);
      } catch (err) {
        setError('Using sample guidance for now. Backend data will appear when API is available.');
        setExperts(fallbackExperts);
        setGuidanceList(fallbackGuidance);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredGuidance = useMemo(() => {
    if (selectedCategory === 'all') return guidanceList;
    return guidanceList.filter((item) => item.category === selectedCategory);
  }, [guidanceList, selectedCategory]);

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    setQuestionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitQuestion = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setError('');

    try {
      await axios.post(`${API_BASE}/api/hackathon/questions`, questionForm, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      });
      setSuccessMessage('Your question has been sent to campus hackathon experts.');
      setQuestionForm((prev) => ({ ...prev, topic: '', question: '' }));
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to submit question right now.';
      setError(message);
    }
  };

  return (
    <div className="hackathon-guidance-page">
      <section className="hg-hero">
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          🏆 Hackathon Guidance by Campus Experts
        </motion.h1>
        <p>
          Learn winning strategies for idea selection, rapid prototyping, and high-impact pitching from students who
          have already won big hackathons.
        </p>
      </section>

      {error && <p className="hg-banner hg-warning">{error}</p>}
      {successMessage && <p className="hg-banner hg-success">{successMessage}</p>}

      <section className="hg-section">
        <div className="hg-section-header">
          <h2>Campus Experts</h2>
        </div>
        <div className="hg-grid experts-grid">
          {(loading ? [] : experts).map((expert) => (
            <article className="hg-card" key={expert._id}>
              <h3>{expert.name}</h3>
              <p className="hg-meta">{expert.campus} · {expert.specialization}</p>
              <p>{expert.bio}</p>
              {Array.isArray(expert.achievements) && expert.achievements.length > 0 && (
                <ul className="hg-list">
                  {expert.achievements.map((achievement, index) => (
                    <li key={`${expert._id}-achievement-${index}`}>{achievement}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
          {!loading && experts.length === 0 && <p>No experts added yet.</p>}
        </div>
      </section>

      <section className="hg-section">
        <div className="hg-section-header">
          <h2>Guidance Library</h2>
          <select
            className="hg-select"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="hg-grid guidance-grid">
          {(loading ? [] : filteredGuidance).map((guidance) => (
            <article className="hg-card" key={guidance._id}>
              <p className="hg-chip">{guidance.category}</p>
              <h3>{guidance.title}</h3>
              <p>{guidance.content}</p>
              <p className="hg-meta">
                By {guidance.expertId?.name || 'Expert'} · {guidance.expertId?.campus || 'Campus'}
              </p>
              {Array.isArray(guidance.tags) && guidance.tags.length > 0 && (
                <div className="hg-tags">
                  {guidance.tags.map((tag, index) => (
                    <span key={`${guidance._id}-tag-${index}`}>#{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
          {!loading && filteredGuidance.length === 0 && <p>No guidance posts for this category yet.</p>}
        </div>
      </section>

      <section className="hg-section">
        <h2>Ask an Expert</h2>
        <form className="hg-form" onSubmit={handleSubmitQuestion}>
          <input
            type="text"
            name="studentName"
            value={questionForm.studentName}
            onChange={handleQuestionChange}
            placeholder="Your name"
            required
          />
          <input
            type="email"
            name="email"
            value={questionForm.email}
            onChange={handleQuestionChange}
            placeholder="Your email"
            required
          />
          <input
            type="text"
            name="topic"
            value={questionForm.topic}
            onChange={handleQuestionChange}
            placeholder="Topic (e.g., problem statement, pitch deck, deployment)"
            required
          />
          <textarea
            name="question"
            value={questionForm.question}
            onChange={handleQuestionChange}
            placeholder="Write your question"
            rows={5}
            required
          />
          <button type="submit">Submit Question</button>
        </form>
      </section>
    </div>
  );
};

export default HackathonGuidance;
