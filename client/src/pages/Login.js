import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

// ─── Floating Academic Shapes ────────────────────────────────────────────────
const SHAPES = [
  { icon: '📚', x: 5,  y: 12, size: 2.2, delay: 0   },
  { icon: '🎓', x: 88, y: 8,  size: 2.0, delay: 0.8 },
  { icon: '✏️', x: 8,  y: 80, size: 1.8, delay: 1.6 },
  { icon: '🔬', x: 92, y: 75, size: 2.1, delay: 0.4 },
  { icon: '💡', x: 48, y: 5,  size: 1.8, delay: 1.2 },
  { icon: '🧠', x: 3,  y: 48, size: 1.6, delay: 2.0 },
  { icon: '📐', x: 94, y: 40, size: 1.8, delay: 0.6 },
  { icon: '🏆', x: 72, y: 88, size: 1.7, delay: 1.8 },
];

const STATS = [
  { value: 'Senior Guidance', label: 'From expert mentors' },
  { value: 'Exam Feedback',   label: 'Mock review analysis' },
  { value: 'Previous Papers', label: 'Real exam patterns' },
  { value: 'Mind Maps',       label: 'Visual study paths' },
];

const FEATURES = [
  { icon: '📖', title: 'Smart Notes',     desc: 'AI-powered structured notes for all subjects' },
  { icon: '🧑‍🏫', title: 'Senior Guidance', desc: 'Direct tips & shortcuts from experienced seniors' },
  { icon: '📝', title: 'Exam Feedback',   desc: 'Detailed performance review after every mock test' },
  { icon: '📚', title: 'Previous Papers', desc: 'Comprehensive archives with authentic patterns' },
];

const Login = () => {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, authLoading, navigate, from]);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focused, setFocused] = useState({});

  const emailRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    emailRef.current?.focus();
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.email.trim())                   e.email    = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email    = 'Enter a valid email address.';
    if (!form.password)                       e.password = 'Password is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    if (serverError)  setServerError('');
  };

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
        setServerError(result.message || 'Login failed. Please verify your credentials.');
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

      {/* Background Orbs & Grid */}
      <div className="login-bg">
        <div className="login-bg-orb orb-1" />
        <div className="login-bg-orb orb-2" />
        <div className="login-bg-orb orb-3" />
        <div className="login-bg-grid" />
      </div>

      {/* Floating Shapes */}
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

        {/* Left Hero Panel */}
        <div className="login-hero">
          <div className="login-hero-inner">

            {/* Standout Logo Badge */}
            <div className="login-brand">
              <div className="login-logo-badge">
                <img src="/logo.png" alt="StudyMate Plus" className="login-logo" />
              </div>
              <div>
                <h1 className="login-brand-name">StudyMate Plus</h1>
                <p className="login-brand-tagline">Academic Excellence Platform</p>
              </div>
            </div>

            {/* Headline */}
            <div className="login-headline">
              <h2>
                Unlock Your Full<br />
                <span className="login-gradient-text">Academic Potential</span>
              </h2>
              <p className="login-hero-desc">
                Join thousands of students learning smarter with AI-powered notes, real mock analytics, and senior mentorship.
              </p>
            </div>

            {/* Stats Row */}
            <div className="login-stats">
              {STATS.map((s) => (
                <div key={s.label} className="login-stat">
                  <span className="login-stat-value">{s.value}</span>
                  <span className="login-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Feature Grid */}
            <div className="login-features">
              {FEATURES.map((f) => (
                <div key={f.title} className="login-feature-pill">
                  <span className="login-feature-icon">{f.icon}</span>
                  <div className="login-feature-text">
                    <p className="login-feature-title">{f.title}</p>
                    <p className="login-feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Form Panel */}
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
                  : 'Sign in to access your dashboard'}
              </p>
            </div>

            {/* Error Banner */}
            {serverError && (
              <div className="login-alert login-alert-error" role="alert">
                <span>⚠️</span> {serverError}
              </div>
            )}

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit} noValidate>

              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Submit CTA */}
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

            <div className="login-divider"><span>New to StudyMate Plus?</span></div>

            <Link to="/register" className="login-register-btn">
              Create Free Account ✨
            </Link>

            <p className="login-footer-note">
              By signing in, you agree to our{' '}
              <Link to="/privacy">Terms of Service & Privacy Policy</Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;