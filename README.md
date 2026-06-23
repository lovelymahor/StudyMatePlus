# StudyMatePlus

Live demo: [https://studymateplus.vercel.app](https://studymateplus.vercel.app)

StudyMatePlus is a student-focused academic resource platform built to help learners find everything they need for exam preparation in one place. It brings together syllabus material, previous year question papers, feedback from other students, analytics, and community-driven study tools in a clean React experience backed by a Node.js API.

## Overview

Students often spend too much time searching across multiple websites, folders, and group chats for reliable academic material. StudyMatePlus reduces that friction by organizing study resources around the way students actually prepare for exams.

The platform currently focuses on:

- Syllabus browsing by university, department, and semester
- Previous year question papers with downloadable reports
- Student exam feedback and difficulty insights
- Notes, study resources, and contribution workflows
- Authenticated pages for a more personalized experience
- Supporting pages such as FAQ, privacy, about, contact, profile, and analytics

## Key features

- Responsive landing page with clear navigation into study resources
- Protected routes for authenticated users
- Syllabus and PYQ browsing experiences tailored for academic planning
- Feedback collection to capture exam difficulty, important topics, and preparation tips
- Analytics views for understanding resource trends
- Mind map, tasks, profile, and contribution sections for student productivity
- Light/dark theme support in the client UI

## Tech stack

### Frontend

- React 19
- React Router
- Framer Motion
- Chart.js / react-chartjs-2
- React Icons
- Axios

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Helmet and rate limiting for basic hardening
- Multer for file uploads
- PDF generation utilities

## Repository structure

```text
StudyMatePlus/
├── client/            # React frontend
├── server/            # Express / MongoDB backend
├── tools/             # Utility scripts
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- MongoDB connection string

## Local setup

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/StudyMatePlus.git
cd StudyMatePlus
```

### 2. Install dependencies

Install backend and frontend dependencies separately:

```bash
cd server
npm install

cd ..\client
npm install
```

### 3. Configure environment variables

Create a `.env` file in `server/` and add the required values.

Recommended variables:

```bash
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-strong-jwt-secret
CLIENT_URL=http://localhost:3000
OPENAI_API_KEY=optional-if-you-use-ai-features
```

If your frontend needs to point at a deployed backend or a different local API, set the client API URL as well:

```bash
REACT_APP_API_URL=http://localhost:5000
```

### 4. Run the application

Start the backend and frontend in separate terminals:

```bash
# Terminal 1
cd server
npm run dev

# Terminal 2
cd client
npm start
```

The frontend usually runs on `http://localhost:3000`, and the backend API runs on `http://localhost:5000`.

## Available scripts

### Server

- `npm run dev` — start the backend with Nodemon
- `npm start` — start the backend in production mode

### Client

- `npm start` — run the React development server
- `npm run build` — build the frontend for production
- `npm test` — run the React test suite

## Contributing

Contributions are welcome. A good workflow is:

1. Read the [CONTRIBUTING.md](./CONTRIBUTING.md) guide.
2. Check the Issues tab for an open task.
3. Create a branch for your work.
4. Make your changes and verify them locally.
5. Open a pull request with a clear summary of what changed.

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md) in all contributions and discussions.

## License

This project is licensed under the [MIT License](./LICENSE).

## Contact

For questions, suggestions, or collaboration ideas, please use the repository issues/discussions or connect through the project maintainer’s linked channels.

---

Built to make academic preparation a little less chaotic and a lot more organized.
