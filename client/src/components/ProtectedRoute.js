import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Wraps any route that requires authentication.
 * Redirects to /login with the original path saved in state,
 * so after login the user is sent back where they came from.
 *
 * Usage in App.js:
 *   <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  // Show nothing while auth state is being validated on mount
  if (loading) {
    return (
      <div
        style={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          color: 'var(--muted)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div className="auth-spinner" style={{ margin: '0 auto 1rem' }} />
          Verifying session…
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Preserve the page they tried to visit
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based guard (optional)
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;