import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

// ─── Floating academic shapes ────────────────────────────────────────────────
const SHAPES = [
  { icon: '📚', x: 8,  y: 15, size: 2.2, delay: 0   },
  { icon: '🎓', x: 85, y: 10, size: 1.8, delay: 0.8 },
  { icon: '✏️', x: 12, y: 72, size: 1.5, delay: 1.6 },
  { icon: '🔬', x: 90, y: 65, size: 1.9, delay: 0.4 },
  { icon: '💡', x: 50, y: 5,  size: 1.6, delay: 1.2 },
  { icon: '🧠', x: 3,  y: 45, size: 1.4, delay: 2.0 },
  { icon: '📐', x: 92, y: 38, size: 1.7, delay: 0.6 },
  { icon: '🏆', x: 70, y: 88, size: 1.5, delay: 1.8 },
  { icon: '⚡', x: 25, y: 92, size: 1.3, delay: 1.0 },
  { icon: '🌟', x: 60, y: 18, size: 1.6, delay: 2.4 },
];

const STATS = [
  { value: 'Senior guidance', label: 'From mentors who have been there' },
  { value: 'Exam feedback', label: 'Improve after every mock and review' },
  { value: 'Previous papers', label: 'Practice with real exam patterns' },
  { value: 'Mind maps', label: 'Visual study paths for tough topics' },
];

const FEATURES = [
  { icon: '📖', title: 'Smart Notes',      desc: 'AI-powered organized notes for every subject'   },
  { icon: '🧑‍🏫', title: 'Senior Guidance', desc: 'Learn from senior tips, shortcuts, and direction' },
  { icon: '📝', title: 'Exam Feedback',    desc: 'See where you stand after practice and mock tests' },
  { icon: '📚', title: 'Previous Papers',  desc: 'Practice with exam-style questions and patterns'  },
];

// ─── Password strength calculator ────────────────────────────────────────────
const getPasswordStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8)   score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: '',        color: ''        },
    { label: 'Weak',    color: '#ef4444' },
    { label: 'Fair',    color: '#f97316' },
    { label: 'Good',    color: '#eab308' },
    { label: 'Strong',  color: '#22c55e' },
  ];
  return { score, ...map[score] };
};

// ─── Component ────────────────────────────────────────────────────────────────
const Login = () => {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, authLoading, navigate, from]);

  // ── Form state ────────────────────────────────────────────────────────────
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Active label for floating inputs
  const [focused, setFocused] = useState({});

  const emailRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    emailRef.current?.focus();
  }, []);

  // ── Client-side validation ────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.email.trim())                          e.email    = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))    e.email    = 'Enter a valid email.';
    if (!form.password)                              e.password = 'Password is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    if (serverError)  setServerError('');
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsSubmitting(true);
    setServerError('');

    try {
      const result = await login(form.email, form.password);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate(from, { replace: true }), 900);
      } else {
        setServerError(result.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      setServerError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`login-page ${mounted ? 'mounted' : ''}`}>

      {/* ── Animated background ── */}
      <div className="login-bg">
        <div className="login-bg-orb orb-1" />
        <div className="login-bg-orb orb-2" />
        <div className="login-bg-orb orb-3" />
        <div className="login-bg-grid" />
      </div>

      {/* ── Floating shapes ── */}
      <div className="login-shapes" aria-hidden="true">
        {SHAPES.map((s, i) => (
          <span
            key={i}
            className="login-shape"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}rem`,
              animationDelay: `${s.delay}s`,
            }}
          >
            {s.icon}
          </span>
        ))}
      </div>

      <div className="login-container">

        {/* ════════════ LEFT HERO PANEL ════════════ */}
        <div className="login-hero">
          <div className="login-hero-inner">

            {/* Brand */}
            <div className="login-brand">
              <img src="/logo.png" alt="StudyMate Plus" className="login-logo" />
            </div>

            {/* Headline */}
            <div className="login-headline">
              <h2>Unlock Your Full<br /><span className="login-gradient-text">Academic Potential</span></h2>
              <p className="login-hero-desc">
                Join thousands of students who are already learning smarter,
                not harder — with tools built for modern learners.
              </p>
            </div>

            {/* Stats */}
            <div className="login-stats">
              {STATS.map((s) => (
                <div key={s.label} className="login-stat">
                  <span className="login-stat-value">{s.value}</span>
                  <span className="login-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Feature pills */}
            <div className="login-features">
              {FEATURES.map((f) => (
                <div key={f.title} className="login-feature-pill">
                  <span className="login-feature-icon">{f.icon}</span>
                  <div>
                    <p className="login-feature-title">{f.title}</p>
                    <p className="login-feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative card */}
            <div className="login-hero-card" aria-hidden="true">
              <div className="login-hero-card-glow" />
              <span>🎯</span>
              <p>Ready to ace your exams?</p>
            </div>
          </div>
        </div>

        {/* ════════════ RIGHT FORM PANEL ════════════ */}
        <div className="login-form-panel">
          <div className={`login-card ${success ? 'success-state' : ''}`}>

            {/* Header */}
            <div className="login-card-header">
              <div className="login-card-icon">
                {success ? '✅' : '👋'}
              </div>
              <h2 className="login-card-title">
                {success ? 'Welcome back!' : 'Welcome back'}
              </h2>
              <p className="login-card-subtitle">
                {success
                  ? 'Redirecting to your dashboard…'
                  : 'Sign in to continue your learning journey'}
              </p>
            </div>

            {/* Server error banner */}
            {serverError && (
              <div className="login-alert login-alert-error" role="alert">
                <span>⚠️</span> {serverError}
              </div>
            )}

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div className={`login-field ${focused.email || form.email ? 'active' : ''} ${errors.email ? 'error' : ''}`}>
                <label htmlFor="email" className="login-label">Email Address</label>
                <div className="login-input-wrapper">
                  <span className="login-input-icon">✉️</span>
                  <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused((p) => ({ ...p, email: true }))}
                    onBlur={() => setFocused((p) => ({ ...p, email: false }))}
                    className="login-input"
                    placeholder="you@example.com"
                    disabled={isSubmitting || success}
                  />
                </div>
                {errors.email && <span className="login-field-error">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className={`login-field ${focused.password || form.password ? 'active' : ''} ${errors.password ? 'error' : ''}`}>
                <label htmlFor="password" className="login-label">Password</label>
                <div className="login-input-wrapper">
                  <span className="login-input-icon">🔒</span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    onFocus={() => setFocused((p) => ({ ...p, password: true }))}
                    onBlur={() => setFocused((p) => ({ ...p, password: false }))}
                    className="login-input"
                    placeholder="Enter your password"
                    disabled={isSubmitting || success}
                  />
                  <button
                    type="button"
                    className="login-pw-toggle"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && <span className="login-field-error">{errors.password}</span>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`login-btn ${isSubmitting ? 'loading' : ''} ${success ? 'success' : ''}`}
                disabled={isSubmitting || success}
              >
                {isSubmitting ? (
                  <><span className="login-btn-spinner" /> Signing in…</>
                ) : success ? (
                  '✓ Signed In!'
                ) : (
                  <>Sign In <span className="login-btn-arrow">→</span></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="login-divider"><span>New to StudyMate Plus?</span></div>

            {/* Register link */}
            <Link to="/register" className="login-register-btn">
              Create Free Account ✨
            </Link>

            {/* Footer */}
            <p className="login-footer-note">
              By signing in, you agree to our{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;