/**
 * API Testing Guide for StudyMatePlus Authentication System
 * 
 * Before testing, ensure:
 * 1. MongoDB Atlas connection is set up in server/.env
 * 2. Server is running: npm run dev (in /server directory)
 * 3. Port 5000 is accessible
 */

// ============= REGISTER ENDPOINT =============
// POST /api/auth/register

const registerTests = {
  // Test 1: Successful Registration
  success: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/register',
    headers: { 'Content-Type': 'application/json' },
    body: {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'securePass123'
    },
    expectedStatus: 201,
    expectedFields: ['token', 'user', 'message']
  },

  // Test 2: Missing required fields
  missingFields: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/register',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: 'jane@example.com'
      // Missing name and password
    },
    expectedStatus: 400,
    expectedMessage: 'errors'
  },

  // Test 3: Invalid email format
  invalidEmail: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/register',
    headers: { 'Content-Type': 'application/json' },
    body: {
      name: 'Jane Doe',
      email: 'not-an-email',
      password: 'securePass123'
    },
    expectedStatus: 400
  },

  // Test 4: Password too short
  shortPassword: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/register',
    headers: { 'Content-Type': 'application/json' },
    body: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123'
    },
    expectedStatus: 400
  },

  // Test 5: Duplicate email
  duplicateEmail: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/register',
    headers: { 'Content-Type': 'application/json' },
    body: {
      name: 'John Doe 2',
      email: 'john@example.com', // Same as Test 1
      password: 'securePass123'
    },
    expectedStatus: 400,
    expectedMessage: 'User already exists'
  }
};

// ============= LOGIN ENDPOINT =============
// POST /api/auth/login

const loginTests = {
  // Test 1: Successful Login
  success: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/login',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: 'john@example.com',
      password: 'securePass123'
    },
    expectedStatus: 200,
    expectedFields: ['token', 'user', 'message']
  },

  // Test 2: Wrong password
  wrongPassword: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/login',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: 'john@example.com',
      password: 'wrongPassword'
    },
    expectedStatus: 400,
    expectedMessage: 'Invalid credentials'
  },

  // Test 3: User not found
  userNotFound: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/login',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: 'nonexistent@example.com',
      password: 'securePass123'
    },
    expectedStatus: 400,
    expectedMessage: 'Invalid credentials'
  },

  // Test 4: Missing password
  missingPassword: {
    method: 'POST',
    url: 'http://localhost:5000/api/auth/login',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email: 'john@example.com'
    },
    expectedStatus: 400
  }
};

// ============= GET PROFILE ENDPOINT =============
// GET /api/auth/me (Protected)

const profileTests = {
  // Test 1: Valid token
  success: {
    method: 'GET',
    url: 'http://localhost:5000/api/auth/me',
    headers: {
      'Authorization': 'Bearer <token_from_login>'
    },
    expectedStatus: 200,
    expectedFields: ['_id', 'name', 'email', 'createdAt']
  },

  // Test 2: Missing token
  noToken: {
    method: 'GET',
    url: 'http://localhost:5000/api/auth/me',
    headers: {},
    expectedStatus: 401,
    expectedMessage: 'No token'
  },

  // Test 3: Invalid token
  invalidToken: {
    method: 'GET',
    url: 'http://localhost:5000/api/auth/me',
    headers: {
      'Authorization': 'Bearer invalid_token_12345'
    },
    expectedStatus: 401,
    expectedMessage: 'Token is not valid'
  }
};

// ============= UPDATE PROFILE ENDPOINT =============
// PUT /api/auth/update (Protected)

const updateTests = {
  // Test 1: Successful update
  success: {
    method: 'PUT',
    url: 'http://localhost:5000/api/auth/update',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <token_from_login>'
    },
    body: {
      name: 'John Updated',
      university: 'MIT',
      semester: 4,
      bio: 'Computer Science student'
    },
    expectedStatus: 200,
    expectedFields: ['user', 'message']
  },

  // Test 2: Without token
  noToken: {
    method: 'PUT',
    url: 'http://localhost:5000/api/auth/update',
    headers: { 'Content-Type': 'application/json' },
    body: { name: 'John Updated' },
    expectedStatus: 401
  }
};

// ============= CURL EXAMPLES =============
const curlExamples = `
# 1. Register a new user
curl -X POST http://localhost:5000/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePass123"
  }'

# Response:
# {
#   "message": "User registered successfully",
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": {
#     "id": "507f1f77bcf86cd799439011",
#     "name": "John Doe",
#     "email": "john@example.com",
#     "avatar": "https://avatar.iran.liara.run/public/boy"
#   }
# }

---

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "password": "securePass123"
  }'

---

# 3. Get current user profile (Protected route)
curl -X GET http://localhost:5000/api/auth/me \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

---

# 4. Update profile
curl -X PUT http://localhost:5000/api/auth/update \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \\
  -d '{
    "name": "John Updated",
    "university": "MIT",
    "semester": 4,
    "bio": "CS Student"
  }'
`;

module.exports = {
  registerTests,
  loginTests,
  profileTests,
  updateTests,
  curlExamples
};
