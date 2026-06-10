import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Register.css';

const SHAPES = [
  { icon: '🚀', x: 6,  y: 10, size: 2.0, delay: 0   },
  { icon: '📚', x: 88, y: 8,  size: 1.8, delay: 0.7 },
  { icon: '🎓', x: 10, y: 75, size: 1.6, delay: 1.5 },
  { icon: '💡', x: 92, y: 70, size: 1.9, delay: 0.3 },
  { icon: '⭐', x: 48, y: 4,  size: 1.5, delay: 1.1 },
  { icon: '🧪', x: 2,  y: 45, size: 1.4, delay: 1.9 },
  { icon: '📐', x: 94, y: 35, size: 1.7, delay: 0.5 },
  { icon: '✨', x: 72, y: 90, size: 1.5, delay: 1.7 },
  { icon: '🌍', x: 22, y: 93, size: 1.3, delay: 0.9 },
  { icon: '🎯', x: 62, y: 15, size: 1.6, delay: 2.2 },
];

const BENEFITS = [
  '✅ Senior guidance when you need help most',
  '✅ AI-powered notes and mind maps',
  '✅ Exam feedback to guide your revision',
  '✅ Previous year papers for real practice',
  '✅ Personal analytics dashboard',
  '✅ Mobile-friendly, learn anywhere',
];

const getPasswordStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '', width: '0%' };
  let score = 0;
  if (pw.length >= 8)              score++;
  if (/[A-Z]/.test(pw))            score++;
  if (/[0-9]/.test(pw))            score++;
  if (/[^A-Za-z0-9]/.test(pw))    score++;
  const map = [
    { label: '',       color: '',        width: '0%'   },
    { label: 'Weak',   color: '#ef4444', width: '25%'  },
    { label: 'Fair',   color: '#f97316', width: '50%'  },
    { label: 'Good',   color: '#eab308', width: '75%'  },
    { label: 'Strong', color: '#22c55e', width: '100%' },
  ];
  return { score, ...map[score] };
};

const Register = () => {
  const { register, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, authLoading, navigate]);

  const [form, setForm] = useState({
    name: '', email: '', university: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPw,  setShowPw]  = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const [focused, setFocused] = useState({});
  const [step, setStep] = useState(1); // 1 = personal info, 2 = credentials
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  const nameRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
    nameRef.current?.focus();
  }, []);

  const pwStrength = getPasswordStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                e.name            = 'Name is required.';
    else if (form.name.trim().length < 2)                 e.name            = 'Name must be at least 2 characters.';
    if (!form.email.trim())                               e.email           = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email))         e.email           = 'Enter a valid email.';
    if (!form.password)                                   e.password        = 'Password is required.';
    else if (form.password.length < 8)                    e.password        = 'Minimum 8 characters.';
    else if (!/[A-Z]/.test(form.password))                e.password        = 'Must include an uppercase letter.';
    else if (!/[0-9]/.test(form.password))                e.password        = 'Must include a number.';
    if (form.confirmPassword !== form.password)           e.confirmPassword = 'Passwords do not match.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
    if (serverError)  setServerError('');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((p) => ({ ...p, avatar: 'Please choose an image file.' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setAvatarPreview(result);
      setAvatarFile(file);
      setErrors((p) => ({ ...p, avatar: '' }));
    };
    reader.readAsDataURL(file);
  };

  // Step 1 → 2
  const handleNextStep = () => {
    const e = {};
    if (!form.name.trim())                e.name  = 'Name is required.';
    else if (form.name.trim().length < 2) e.name  = 'At least 2 characters.';
    if (!form.email.trim())               e.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsSubmitting(true);
    setServerError('');

    try {
      const payload = new FormData();
      payload.append('name', form.name);
      payload.append('email', form.email);
      payload.append('university', form.university || '');
      payload.append('password', form.password);
      payload.append('confirmPassword', form.confirmPassword);
      if (avatarFile) {
        payload.append('avatar', avatarFile);
      }

      const result = await register(payload);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => navigate('/', { replace: true }), 1000);
      } else {
        setServerError(result.message || 'Registration failed.');
      }
    } catch (err) {
      setServerError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`register-page ${mounted ? 'mounted' : ''}`}>

      {/* Background */}
      <div className="reg-bg">
        <div className="reg-bg-orb orb-a" />
        <div className="reg-bg-orb orb-b" />
        <div className="reg-bg-orb orb-c" />
        <div className="reg-bg-grid" />
      </div>

      {/* Shapes */}
      <div className="reg-shapes" aria-hidden="true">
        {SHAPES.map((s, i) => (
          <span key={i} className="reg-shape" style={{
            left: `${s.x}%`, top: `${s.y}%`,
            fontSize: `${s.size}rem`, animationDelay: `${s.delay}s`,
          }}>{s.icon}</span>
        ))}
      </div>

      <div className="reg-container">

        {/* ════ LEFT PANEL ════ */}
        <div className="reg-hero">
          <div className="reg-hero-inner">
            {/* Brand */}
            <div className="reg-brand">
              <img src="/logo.png" alt="StudyMate Plus" className="reg-logo" />
            </div>

            <div className="reg-hero-text">
              <h2>Start Your Journey<br /><span className="reg-gradient">Today for Free</span></h2>
              <p className="reg-hero-desc">
                Get senior guidance, exam feedback, and previous papers in one
                focused study space built to help you improve faster.
              </p>
            </div>

            {/* Benefits list */}
            <div className="reg-benefits">
              {BENEFITS.map((b) => (
                <p key={b} className="reg-benefit-item">{b}</p>
              ))}
            </div>

            {/* Trust badge */}
            <div className="reg-trust">
              <span>🔒</span>
              <p>Your data is encrypted and never shared. Privacy-first by design.</p>
            </div>
          </div>
        </div>

        {/* ════ RIGHT FORM ════ */}
        <div className="reg-form-panel">
          <div className={`reg-card ${success ? 'reg-success-state' : ''}`}>

            {/* Step indicator */}
            <div className="reg-steps">
              <div className={`reg-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
                <span>{step > 1 ? '✓' : '1'}</span>
                <p>Your Info</p>
              </div>
              <div className="reg-step-line" />
              <div className={`reg-step ${step >= 2 ? 'active' : ''} ${success ? 'done' : ''}`}>
                <span>{success ? '✓' : '2'}</span>
                <p>Security</p>
              </div>
            </div>

            {/* Header */}
            <div className="reg-card-header">
              <div className="reg-card-icon">{success ? '🎉' : step === 1 ? '👤' : '🔐'}</div>
              <h2 className="reg-card-title">
                {success ? 'Welcome aboard!' : step === 1 ? 'Create Account' : 'Secure Your Account'}
              </h2>
              <p className="reg-card-subtitle">
                {success
                  ? 'Taking you to your dashboard…'
                  : step === 1
                  ? 'Tell us a little about yourself'
                  : 'Choose a strong password'}
              </p>
            </div>

            {serverError && (
              <div className="reg-alert" role="alert">
                <span>⚠️</span> {serverError}
              </div>
            )}

            <form className="reg-form" onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit} noValidate>

              {/* ── STEP 1 ── */}
              {step === 1 && (
                <div className="reg-step-fields">
                  {/* Name */}
                  <div className={`reg-field ${focused.name || form.name ? 'active' : ''} ${errors.name ? 'error' : ''}`}>
                    <label htmlFor="name" className="reg-label">Full Name</label>
                    <div className="reg-input-wrap">
                      <span className="reg-input-icon">👤</span>
                      <input
                        ref={nameRef} id="name" name="name" type="text"
                        autoComplete="name" value={form.name} onChange={handleChange}
                        onFocus={() => setFocused(p => ({ ...p, name: true }))}
                        onBlur={() => setFocused(p => ({ ...p, name: false }))}
                        className="reg-input" placeholder="Your full name"
                        disabled={isSubmitting || success}
                      />
                    </div>
                    {errors.name && <span className="reg-field-err">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className={`reg-field ${focused.email || form.email ? 'active' : ''} ${errors.email ? 'error' : ''}`}>
                    <label htmlFor="email" className="reg-label">Email Address</label>
                    <div className="reg-input-wrap">
                      <span className="reg-input-icon">✉️</span>
                      <input
                        id="email" name="email" type="email"
                        autoComplete="email" value={form.email} onChange={handleChange}
                        onFocus={() => setFocused(p => ({ ...p, email: true }))}
                        onBlur={() => setFocused(p => ({ ...p, email: false }))}
                        className="reg-input" placeholder="you@example.com"
                        disabled={isSubmitting || success}
                      />
                    </div>
                    {errors.email && <span className="reg-field-err">{errors.email}</span>}
                  </div>

                  {/* University (optional) */}
                  <div className={`reg-field ${focused.university || form.university ? 'active' : ''}`}>
                    <label htmlFor="university" className="reg-label">University <span className="reg-optional">(optional)</span></label>
                    <div className="reg-input-wrap">
                      <span className="reg-input-icon">🏛️</span>
                      <input
                        id="university" name="university" type="text"
                        value={form.university} onChange={handleChange}
                        onFocus={() => setFocused(p => ({ ...p, university: true }))}
                        onBlur={() => setFocused(p => ({ ...p, university: false }))}
                        className="reg-input" placeholder="Your university or college"
                        disabled={isSubmitting || success}
                      />
                    </div>
                  </div>

                  <button type="submit" className="reg-btn">

                  <div className={`reg-field ${avatarPreview ? 'active' : ''} ${errors.avatar ? 'error' : ''}`}>
                    <label htmlFor="avatar" className="reg-label">Profile Photo <span className="reg-optional">(for your profile)</span></label>
                    <div className="reg-avatar-picker">
                      <div className="reg-avatar-preview">
                        <img src={avatarPreview || '/logo.png'} alt="Profile preview" />
                      </div>
                      <div className="reg-avatar-actions">
                        <input
                          id="avatar"
                          name="avatar"
                          type="file"
                          accept="image/*"
                          capture="user"
                          onChange={handleAvatarChange}
                          className="reg-avatar-input"
                          disabled={isSubmitting || success}
                        />
                        <p className="reg-avatar-help">Use your camera or upload a clear photo. You can change it later in profile.</p>
                      </div>
                    </div>
                    {errors.avatar && <span className="reg-field-err">{errors.avatar}</span>}
                  </div>
                    Continue <span className="reg-btn-arrow">→</span>
                  </button>
                </div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <div className="reg-step-fields">
                  {/* Password */}
                  <div className={`reg-field ${focused.password || form.password ? 'active' : ''} ${errors.password ? 'error' : ''}`}>
                    <label htmlFor="password" className="reg-label">Password</label>
                    <div className="reg-input-wrap">
                      <span className="reg-input-icon">🔒</span>
                      <input
                        id="password" name="password" type={showPw ? 'text' : 'password'}
                        autoComplete="new-password" value={form.password} onChange={handleChange}
                        onFocus={() => setFocused(p => ({ ...p, password: true }))}
                        onBlur={() => setFocused(p => ({ ...p, password: false }))}
                        className="reg-input" placeholder="Minimum 8 characters"
                        disabled={isSubmitting || success}
                      />
                      <button type="button" className="reg-pw-toggle" onClick={() => setShowPw(p => !p)} tabIndex={-1}
                        aria-label={showPw ? 'Hide' : 'Show'}>
                        {showPw ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {/* Strength bar */}
                    {form.password && (
                      <div className="reg-pw-strength">
                        <div className="reg-pw-bar">
                          <div className="reg-pw-fill" style={{ width: pwStrength.width, background: pwStrength.color }} />
                        </div>
                        <span style={{ color: pwStrength.color }}>{pwStrength.label}</span>
                      </div>
                    )}
                    {errors.password && <span className="reg-field-err">{errors.password}</span>}
                  </div>

                  {/* Confirm Password */}
                  <div className={`reg-field ${focused.confirmPassword || form.confirmPassword ? 'active' : ''} ${errors.confirmPassword ? 'error' : ''}`}>
                    <label htmlFor="confirmPassword" className="reg-label">Confirm Password</label>
                    <div className="reg-input-wrap">
                      <span className="reg-input-icon">🔑</span>
                      <input
                        id="confirmPassword" name="confirmPassword" type={showCpw ? 'text' : 'password'}
                        autoComplete="new-password" value={form.confirmPassword} onChange={handleChange}
                        onFocus={() => setFocused(p => ({ ...p, confirmPassword: true }))}
                        onBlur={() => setFocused(p => ({ ...p, confirmPassword: false }))}
                        className="reg-input" placeholder="Re-enter password"
                        disabled={isSubmitting || success}
                      />
                      <button type="button" className="reg-pw-toggle" onClick={() => setShowCpw(p => !p)} tabIndex={-1}
                        aria-label={showCpw ? 'Hide' : 'Show'}>
                        {showCpw ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {/* Match indicator */}
                    {form.confirmPassword && (
                      <span className={`reg-match ${form.password === form.confirmPassword ? 'match' : 'mismatch'}`}>
                        {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                      </span>
                    )}
                    {errors.confirmPassword && <span className="reg-field-err">{errors.confirmPassword}</span>}
                  </div>

                  <div className="reg-step2-actions">
                    <button type="button" className="reg-back-btn" onClick={() => setStep(1)}>
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className={`reg-btn reg-btn-submit ${isSubmitting ? 'loading' : ''} ${success ? 'success' : ''}`}
                      disabled={isSubmitting || success}
                    >
                      {isSubmitting ? (
                        <><span className="reg-spinner" /> Creating Account…</>
                      ) : success ? (
                        '✓ Account Created!'
                      ) : (
                        <>Create Account 🚀</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* Login link */}
            <div className="reg-login-row">
              <span>Already have an account?</span>
              <Link to="/login" className="reg-login-link">Sign in →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;