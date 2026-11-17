// REACT_APP_API_URL is the backend origin, e.g. http://localhost:5000 (see README).
// A trailing slash or a trailing /api/auth from older setups is tolerated.
const rawBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const SERVER_BASE = rawBase.replace(/\/+$/, '').replace(/\/api\/auth$/, '');
export const AUTH_BASE = `${SERVER_BASE}/api/auth`;
