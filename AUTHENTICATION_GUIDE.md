# 🔐 Authentication System Implementation Guide

StudyMatePlus now has a complete JWT-based authentication system with user registration, login, and profile management.

---

## 📋 Table of Contents

1. [Features](#features)
2. [Setup Instructions](#setup-instructions)
3. [Architecture](#architecture)
4. [Testing](#testing)
5. [API Documentation](#api-documentation)
6. [Troubleshooting](#troubleshooting)

---

## ✨ Features

✅ **User Registration** - Create new accounts with email validation
✅ **Secure Login** - JWT-based authentication with password hashing (bcrypt)
✅ **Protected Routes** - Frontend route protection for authenticated users
✅ **Profile Management** - View and update user profile information
✅ **Token Persistence** - Automatic session maintenance via localStorage
✅ **Logout** - Clear session and tokens
✅ **Form Validation** - Client and server-side validation
✅ **Password Security** - Bcrypt hashing with salt rounds

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB Atlas account (for cloud database)

### Backend Setup

1. **Install dependencies** (Already done)
   ```bash
   cd server
   npm install bcrypt jsonwebtoken dotenv
   ```

2. **Configure MongoDB Atlas**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free account and cluster
   - Get your connection string

3. **Update .env file**
   ```bash
   # server/.env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/studymateplus
   JWT_SECRET=your_strong_random_string_here_change_this_in_production
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   Expected output:
   ```
   > nodemon index.js
   Server running on http://localhost:5000
   ✅ MongoDB connected!
   ```

### Frontend Setup

1. **Install dependencies** (Already done)
   ```bash
   cd client
   npm install jwt-decode
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at http://localhost:3000

---

## 🏗️ Architecture

### Backend Structure

```
server/
├── models/
│   └── User.js                 # User schema with password hashing
├── middleware/
│   └── auth.js                 # JWT verification middleware
├── routes/
│   └── auth.js                 # Authentication endpoints
├── index.js                    # Express app configuration
└── .env                        # Environment variables
```

### Frontend Structure

```
client/src/
├── context/
│   └── AuthContext.js          # Global auth state management
├── components/
│   ├── ProtectedRoute.js       # Route protection wrapper
│   └── Navbar.js               # Updated with auth UI
├── pages/
│   ├── Login.js                # Login page
│   └── Register.js             # Registration page
└── App.js                      # Routes configuration
```

---

## 🧪 Testing

### Run Backend Tests

```bash
cd server
node AUTH_TESTS.js
```

**Expected Output:**
```
✅ All tests passed! Authentication system is ready.
📊 Test Results: 15/15 passed
Success Rate: 100.0%
```

### Run Frontend Tests

```bash
cd client
node src/FRONTEND_TESTS.js
```

**Expected Output:**
```
✅ All frontend tests passed!
📊 Test Results: 15/15 passed
Success Rate: 100.0%
```

### Manual API Testing with cURL

**1. Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**Expected Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://avatar.iran.liara.run/public/boy"
  }
}
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

**3. Get user profile (Protected):**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**4. Update profile:**
```bash
curl -X PUT http://localhost:5000/api/auth/update \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "name": "John Updated",
    "university": "MIT",
    "semester": 4,
    "bio": "CS Student"
  }'
```

### Frontend Testing (Manual)

1. **Navigate to register page:**
   - Go to http://localhost:3000/register
   - Fill in the form with:
     - Name: "Test User"
     - Email: "test@example.com"
     - Password: "TestPass123"
     - Confirm Password: "TestPass123"
   - Click "Create Account"
   - Expected: Redirected to `/profile`

2. **Check navbar:**
   - User profile icon should appear in navbar
   - Logout button should be available
   - Sign In/Sign Up links should be gone

3. **Logout:**
   - Click the logout icon in navbar
   - Expected: Redirected to home, localStorage cleared

4. **Login:**
   - Go to http://localhost:3000/login
   - Use the credentials from registration
   - Click "Sign In"
   - Expected: Redirected to profile page

5. **Protected route test:**
   - Try accessing `/profile` without logging in
   - Expected: Redirected to `/login`

---

## 📚 API Documentation

### Endpoints

#### 1. Register
- **Route:** `POST /api/auth/register`
- **Body:**
  ```json
  {
    "name": "string (required)",
    "email": "string (required, valid email)",
    "password": "string (required, min 6 chars)"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "User registered successfully",
    "token": "JWT token",
    "user": { "id", "name", "email", "avatar" }
  }
  ```

#### 2. Login
- **Route:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "string (required)",
    "password": "string (required)"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Logged in successfully",
    "token": "JWT token",
    "user": { "id", "name", "email", "avatar", "university" }
  }
  ```

#### 3. Get Current User
- **Route:** `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):** Full user object

#### 4. Update Profile
- **Route:** `PUT /api/auth/update`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "string (optional)",
    "university": "string (optional)",
    "semester": "number (optional)",
    "bio": "string (optional)"
  }
  ```
- **Response (200):**
  ```json
  {
    "message": "Profile updated",
    "user": { updated user object }
  }
  ```

---

## 🛡️ Security Features

1. **Password Hashing**
   - Uses bcrypt with 10 salt rounds
   - Passwords never stored in plaintext

2. **JWT Tokens**
   - Tokens expire in 7 days
   - Verified on every protected endpoint
   - Stored in httpOnly cookies (recommended)

3. **Input Validation**
   - Email format validation
   - Password strength requirements
   - XSS prevention via express-validator

4. **Database**
   - MongoDB with Mongoose
   - Unique email constraint
   - Automatic timestamp tracking

---

## 🔧 Troubleshooting

### MongoDB Connection Error

**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Verify MongoDB Atlas connection string in `.env`
2. Check IP whitelist in MongoDB Atlas (allow 0.0.0.0/0 for development)
3. Ensure network connectivity

### JWT Token Invalid

**Problem:** `Token is not valid`

**Solution:**
1. Verify `Authorization` header format: `Bearer <token>`
2. Check token hasn't expired (7 days)
3. Ensure `JWT_SECRET` matches between registration and verification

### CORS Issues

**Problem:** Requests from frontend are blocked

**Solution:**
1. Verify CORS is enabled in backend: `app.use(cors())`
2. Frontend URL matches allowed origins
3. Credentials are properly configured

### Frontend Form Validation

**Problem:** Form shows errors but user info seems correct

**Common Issues:**
- Password confirmation doesn't match
- Email format invalid
- Missing required fields
- Password less than 6 characters

### User Doesn't Persist After Refresh

**Problem:** Logged-in user is lost after page refresh

**Solution:**
- Check if token is stored in localStorage
- Verify `AuthContext` calls `fetchCurrentUser()` on mount
- Check browser console for errors

---

## 📝 Future Enhancements

- [ ] Google OAuth integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Two-factor authentication
- [ ] Role-based access control (RBAC)
- [ ] Social login (GitHub, Discord)
- [ ] Refresh token rotation

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review test output: `AUTH_TESTS.js` and `FRONTEND_TESTS.js`
3. Check browser console and server logs
4. Open an issue on GitHub with detailed error messages

---

**Happy coding! 🚀**
