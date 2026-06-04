<div align="center">

<img src="./client/src/pages/logo.png" alt="StudyMatePlus Logo" width="120" />

# 📘 StudyMatePlus

**Your all-in-one academic resource hub for college students.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-studymateplus.vercel.app-4f46e5?style=for-the-badge)](https://studymateplus.vercel.app)
[![MIT License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)
[![GSSoC 2025](https://img.shields.io/badge/GSSoC-2025-f97316?style=for-the-badge)](https://gssoc.girlscript.tech)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47a248?style=for-the-badge&logo=mongodb)](https://mongodb.com)

[![GitHub Stars](https://img.shields.io/github/stars/lovelymahour/StudyMatePlus?style=social)](https://github.com/lovelymahour/StudyMatePlus/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/lovelymahour/StudyMatePlus?style=social)](https://github.com/lovelymahour/StudyMatePlus/network/members)
[![GitHub Issues](https://img.shields.io/github/issues/lovelymahour/StudyMatePlus)](https://github.com/lovelymahour/StudyMatePlus/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

</div>

---

## 📋 Table of Contents

- [📖 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [📄 Available Pages & Modules](#-available-pages--modules)
- [🤝 Contributing](#-contributing)
- [🗺️ Future Roadmap](#️-future-roadmap)
- [📜 License](#-license)
- [🌟 Support](#-support)
- [📞 Contact](#-contact)

---

## 📖 About the Project

**StudyMatePlus** is an open-source, student-first academic resource platform designed to eliminate the common frustration of scattered study materials. College students often struggle to find verified syllabi, previous year question papers (PYQs), and exam tips in one reliable place.

StudyMatePlus solves this by providing a **centralized, community-driven hub** where students can:

- 📂 Access syllabus and PYQs organized by university, semester, and subject
- 💬 Read and submit peer feedback on exam papers
- 📝 Take and manage personal notes
- ✅ Track tasks and study goals
- 🧠 Create and visualize mind maps for complex topics
- 📊 Analyze study patterns through an analytics dashboard

> Built with love for the student community. Open source. Always free.

---

## ✨ Features

### 📚 Academic Resources
| Feature | Description |
|---|---|
| **Syllabus Browser** | Filter and access syllabi by university, department & semester |
| **PYQ Repository** | Browse previous year question papers with filters |
| **Notes Manager** | Create, save, and manage personal study notes |
| **Task Manager / Todo** | Track study tasks and deadlines |

### 💡 Smart Tools
| Feature | Description |
|---|---|
| **Mind Map Editor** | Visual, interactive mind map builder using ReactFlow |
| **Analytics Dashboard** | Study pattern insights powered by Chart.js |
| **Feedback System** | Submit and browse peer exam feedback with difficulty ratings |

### 🌐 Platform & Community
| Feature | Description |
|---|---|
| **Contribute Page** | Built-in page to guide open-source contributors |
| **FAQ Section** | Answers to common student and contributor questions |
| **Contact & About** | Team info and community communication |
| **Privacy Policy** | Transparent data handling documentation |
| **Dark / Light Theme** | Full theme toggle support via ThemeProvider |
| **Mobile Responsive** | Clean, mobile-friendly interface throughout |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React.js** | ^19.1.1 | UI framework |
| **React Router DOM** | ^7.7.1 | Client-side routing |
| **Framer Motion** | ^12.23.12 | Animations & transitions |
| **ReactFlow** | ^11.11.4 | Mind map editor |
| **Chart.js + react-chartjs-2** | ^4.5.0 / ^5.3.0 | Analytics charts |
| **Lucide React + React Icons** | ^0.540.0 / ^5.5.0 | Icon libraries |
| **Axios** | ^1.12.1 | HTTP client |
| **html-to-image** | ^1.11.13 | Mind map export |
| **UUID** | ^11.1.0 | Unique ID generation |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | LTS | JavaScript runtime |
| **Express.js** | ^5.1.0 | REST API framework |
| **Mongoose** | ^8.17.0 | MongoDB ODM |
| **express-validator** | ^7.2.1 | Input validation & sanitization |
| **dotenv** | ^17.2.1 | Environment variable management |
| **cors** | ^2.8.5 | Cross-origin resource sharing |
| **nodemon** | ^3.1.10 | Development auto-reload |

### Deployment
| Service | Purpose |
|---|---|
| **Vercel** | Frontend hosting |
| **MongoDB Atlas** | Cloud database |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   Browser / Client               │
│                                                 │
│  ┌────────────┐   ┌────────────┐  ┌──────────┐  │
│  │ React SPA  │   │React Router│  │ Framer   │  │
│  │  (Pages &  │──▶│  (Routes)  │  │ Motion   │  │
│  │ Components)│   └────────────┘  └──────────┘  │
│  └─────┬──────┘                                  │
│        │ Axios HTTP Requests                     │
└────────┼────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│              Backend (Express.js)                │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  POST /api/feedback  (with validation)   │   │
│  │  GET  /api/feedbacks                     │   │
│  │  GET  /  (health check)                  │   │
│  └──────────────┬───────────────────────────┘   │
└─────────────────┼───────────────────────────────┘
                  │ Mongoose ODM
                  ▼
┌─────────────────────────────────────────────────┐
│              MongoDB Atlas (Database)            │
│                                                 │
│   Collections: feedbacks                        │
└─────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
StudyMatePlus/
│
├── client/                         # React frontend application
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── Navbar.js           # Top navigation bar
│   │   │   ├── Navbar.css
│   │   │   ├── FeedbackModal.js    # Feedback modal component
│   │   │   ├── FeedbackModal.css
│   │   │   ├── Calendar.js         # Calendar component
│   │   │   └── scrolltotop.js      # Scroll-to-top utility
│   │   │
│   │   ├── pages/                  # Route-level page components
│   │   │   ├── Home.js             # Landing page
│   │   │   ├── Syllabus.js         # Syllabus browser
│   │   │   ├── Notes.jsx           # Notes manager
│   │   │   ├── PYQs.js             # Previous Year Questions
│   │   │   ├── Feedback.js         # Browse feedback
│   │   │   ├── SubmitFeedback.js   # Submit exam feedback
│   │   │   ├── Analytics.js        # Study analytics dashboard
│   │   │   ├── MindMapEditor.js    # Interactive mind map tool
│   │   │   ├── Todo.js             # Task manager
│   │   │   ├── Contribute.js       # Contribution guide page
│   │   │   ├── About.js            # About page
│   │   │   ├── Contact.js          # Contact page
│   │   │   ├── Faq.js              # FAQ page
│   │   │   ├── Privacy.js          # Privacy policy
│   │   │   └── Profile.js          # User profile
│   │   │
│   │   ├── theme/                  # Theme system
│   │   │   └── ThemeProvider.js    # Dark/light mode context
│   │   │
│   │   ├── App.js                  # Root component & routes
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   │
│   └── package.json
│
├── server/                         # Express.js backend
│   ├── index.js                    # Server entry point & API routes
│   └── package.json
│
├── .env.example                    # Environment variable template
├── .gitignore
├── CONTRIBUTING.md                 # Contribution guidelines
├── CODE_OF_CONDUCT.md              # Community code of conduct
├── LICENSE                         # MIT License
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or above recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

---

### Installation

**Step 1: Fork the repository**

Click the **Fork** button on the top-right corner of this page to create your own copy.

**Step 2: Clone your fork**

```bash
git clone https://github.com/<your-username>/StudyMatePlus.git
cd StudyMatePlus
```

**Step 3: Install backend dependencies**

```bash
cd server
npm install
```

**Step 4: Install frontend dependencies**

```bash
cd ../client
npm install
```

---

### Environment Variables

**Server (`server/.env`)**

Create a `.env` file inside the `server/` directory using the provided example:

```bash
cp .env.example server/.env
```

Then fill in your values:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string-here
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the backend server runs on | `5000` |
| `MONGO_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/studymateplus` |

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

### Running Locally

You need **two terminals** to run the full application.

**Terminal 1 — Start the backend server:**

```bash
cd server
npm run dev
# Server runs at http://localhost:5000
```

**Terminal 2 — Start the frontend:**

```bash
cd client
npm start
# React app runs at http://localhost:3000
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)** to view the app.

---

## 📄 Available Pages & Modules

| Route | Page | Description |
|---|---|---|
| `/` | 🏠 Home | Landing page with platform overview |
| `/syllabus` | 📚 Syllabus | Browse syllabus by university & semester |
| `/notes` | 📝 Notes | Create and manage personal notes |
| `/pyqs` | 📄 PYQs | Previous year question papers |
| `/feedback` | 💬 Feedback | Browse student exam feedback |
| `/feedback/submit` | ✍️ Submit Feedback | Submit your own exam feedback |
| `/analytics` | 📊 Analytics | Study analytics & progress charts |
| `/tasks` | ✅ Todo | Task and study goal tracker |
| `/mindmap` | 🧠 Mind Map Editor | Visual mind map builder |
| `/contribute` | 🤝 Contribute | Open-source contribution guide |
| `/about` | ℹ️ About | About the platform & team |
| `/contact` | 📞 Contact | Contact & community links |
| `/faq` | ❓ FAQ | Frequently asked questions |
| `/privacy` | 🔒 Privacy | Privacy policy |
| `/profile` | 👤 Profile | User profile page |

---

## 🤝 Contributing

We welcome contributors of **all experience levels** — especially first-timers participating in **GirlScript Summer of Code (GSSoC) 2025**!

### Contribution Workflow

```
1. Fork  →  2. Clone  →  3. Create Branch  →  4. Make Changes  →  5. Push  →  6. Open PR
```

**Step 1 — Read the docs**
- 📘 [README.md](./README.md)
- 📚 [CONTRIBUTING.md](./CONTRIBUTING.md)
- 🤝 [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

**Step 2 — Pick an issue**
- Browse the [Issues tab](https://github.com/lovelymahour/StudyMatePlus/issues)
- Look for `good first issue` or `help wanted` labels
- Comment on the issue to get it assigned before starting

**Step 3 — Create your branch**

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Step 4 — Make your changes & commit**

```bash
git add .
git commit -m "feat: add your descriptive commit message"
```

**Step 5 — Push & open a Pull Request**

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub and link the related issue number in the PR description.

> 💡 **Tip:** Keep PRs focused and small. One feature or fix per PR is preferred.

---

## 🗺️ Future Roadmap

Here are planned improvements and features for upcoming versions:

- [ ] 🔐 **Authentication** — Google / university email-based login
- [ ] 💬 **Senior-Student Chat** — Mentoring and doubt-clearing forum
- [ ] 📤 **Upload System** — Allow students to upload notes and guides
- [ ] 🏫 **Multi-University Support** — Expand beyond single institutions
- [ ] 🔔 **Notifications** — Exam reminders and deadline alerts
- [ ] 🌍 **i18n / Localization** — Multi-language support
- [ ] 📱 **Progressive Web App (PWA)** — Offline access & installability
- [ ] ⭐ **Resource Rating System** — Upvote helpful notes and PYQs

Want to work on one of these? Check the [Issues tab](https://github.com/lovelymahour/StudyMatePlus/issues) or open a new one!

---

## 🌍 Open Source

StudyMatePlus is proudly open source and part of **GirlScript Summer of Code (GSSoC) 2025**.

- All contributions are welcome — code, design, documentation, and bug reports
- We follow the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 🌟 Support

If you find StudyMatePlus useful, please consider:

- ⭐ **Starring this repository** — it helps others discover the project
- 🍴 **Forking and contributing** — every contribution counts
- 📢 **Sharing** with fellow students who could benefit

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/lovelymahour/StudyMatePlus?style=for-the-badge&color=f59e0b)](https://github.com/lovelymahour/StudyMatePlus/stargazers)

**⭐ Star this repo to show your support! ⭐**

</div>

---

## 📞 Contact

Have a question, suggestion, or just want to say hi?

- 💼 **LinkedIn**: [Lovely Mahour](https://www.linkedin.com/in/lovely-mahour-992316265/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/lovelymahour/StudyMatePlus/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/lovelymahour/StudyMatePlus/discussions)

---

<div align="center">

Made with ❤️ for students, by students.

**Let's build a better study experience together! 🚀**

</div>
