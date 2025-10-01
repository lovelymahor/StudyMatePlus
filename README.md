# 📘 StudyMatePlus

🔗 **Live Website**: [https://studymateplus.vercel.app](https://studymateplus.vercel.app)

**StudyMatePlus** is an open-source learning companion that centralizes **syllabus PDFs**, **previous year question papers (PYQs)**, **notes**, **mind maps**, **feedback & analytics**, and community **mentorship** resources in a clean, mobile‑friendly interface.

Our mission: reduce the time students waste hunting for authentic material and empower peer‑to‑peer learning.

---

## 🎯 Project Objective

Students often face difficulty finding authentic academic materials in one place. Information like syllabus PDFs, PYQs, and exam tips are scattered or unavailable. This project aims to build a platform that:

* Organizes syllabus and PYQs department-wise
* Includes student feedback on exam papers (e.g., difficulty levels, important topics)
* Connects juniors with seniors for mentoring and doubt clearing
* Supports **multiple universities and departments** in one place

---

## 🌟 Current & Planned Features

| Status | Feature |
| ------ | ------- |
| ✅ | Syllabus & PYQs navigation |
| ✅ | Feedback submission + listing (MongoDB backed when configured) |
| ✅ | Notes & resources section |
| ✅ | Mind Map editor (React Flow) |
| ✅ | Dark / Light theme + accessible color tokens |
| ✅ | Route‑level code splitting (performance) |
| ✅ | Social & meta tags (improved SEO) |
| 🚧 | Contributor mentorship / profile features |
| 🚧 | Analytics deep dive dashboards |
| 🗓️ | Real‑time mentoring / chat integration |

---

## 🛠️ Tech Stack

| Layer | Technology |
| ----- | ---------- |
| Frontend | React (CRA), React Router, Framer Motion, React Flow, Chart.js |
| Styling / Theming | Custom CSS with CSS variables (dark/light) |
| Backend | Node.js + Express 5 (beta) |
| Database | MongoDB via Mongoose (optional during frontend-only development) |
| Validation | express-validator |
| Tooling | nodemon, react-scripts, web‑vitals |
| Deployment | Vercel (frontend), TBD (backend) |

---

## 📁 Project Structure

```
StudyMatePlus/
├── client/                # Frontend code
├── server/                # Backend code
├── docs/                  # Diagrams, mockups
├── .github/               # Issue templates, PR templates
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .env.example
```

---

## 💻 Getting Started

### 1. Fork the Repository

Click on the **Fork** button on the top-right corner of this page to create your own copy.

### 2. Clone Your Fork

```bash
git clone https://github.com/your-username/StudyMatePlus.git
cd StudyMatePlus
```

### 3. Install Dependencies

```bash
# From repo root
npm install          # installs backend dependencies (server/)
cd client
npm install          # installs frontend dependencies
cd ..
```

### 4. Configure Environment Variables

Environment variables (server side) go in a root `.env` (never commit it). An example is provided in `.env.example`.

Minimum (backend optional during SEO / UI work):
```bash
PORT=5000
# If omitted the server still starts, but DB-backed endpoints will warn & skip persistence.
MONGO_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
```
If you add auth or JWT later you might extend with:
```bash
JWT_SECRET=your-secret-key-here
```

### 5. Run the Application (Development)

```bash
# Terminal 1 – backend (optional if only styling/SEO)
npm run dev                # starts server on http://localhost:5000

# Terminal 2 – frontend
cd client
npm start                  # dev server on http://localhost:3000
```

### 6. Production Build Preview (for accurate Lighthouse)
```bash
cd client
npm run build              # creates optimized build/
npx serve -s build -l 3000 # preview production at http://localhost:3000
```
Run Lighthouse against the production preview, not the dev server.

---

## 🧑‍💻 How to Contribute

We welcome contributors of **all experience levels**, especially **beginners** participating through **GirlScript Summer of Code (GSSoC) 2025** and beyond.

Follow the steps below to begin your contribution journey:

### 📄 Step 1: Read the Guidelines

* 📘 Read this `README.md`
* 📚 See [CONTRIBUTING.md](./CONTRIBUTING.md)
* 🤝 Follow our [Code of Conduct](./CODE_OF_CONDUCT.md)

### 🌐 Step 2: Choose an Issue

* Check the **Issues** tab for `good first issue` labels
* Comment on the issue you want to work on
* Wait for the maintainers to assign you the issue

### 🔧 Step 3: Make Your Changes

```bash
git checkout -b feat/<short-feature-name>
# commit early & often
git commit -m "feat: add <feature>"
```
Run production build locally for performance-related changes:
```bash
cd client
npm run build
```

### 📤 Step 4: Submit a Pull Request

* Push your changes: `git push origin feature-name`
* Open a Pull Request (PR) from your forked repository
* Link the issue number in your PR description

---

## ♿ Accessibility & SEO Improvements

Recent upgrades (Sept/Oct 2025):
* Added `<meta name="description">` + Open Graph + Twitter Card tags.
* Replaced placeholder / icon‑only links with descriptive text + `aria-label` & screen‑reader spans.
* Implemented route-based code splitting (`React.lazy`) to reduce initial JS bundle.
* Added `.sr-only` utility class for accessible hidden text.
* Avoided `href="#"` placeholders in favor of meaningful URLs or explicit actions.

Checklist for new contributions:
* Provide descriptive link text (no “click here”).
* Supply `alt` text for informative images (decorative images: `alt=""`).
* Prefer semantic headings with a single `<h1>` per page.
* Run Lighthouse in production build mode before PR if you changed performance‑critical code.

Next targeted improvements (help welcome): structured data (JSON-LD), sitemap.xml + robots.txt, bundle analysis docs, preloading critical assets.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 📞 Contact & Community

* Maintainer: [Lovely Mahour](https://www.linkedin.com/in/lovely-mahour-992316265/)
* Open a [GitHub Discussion](./discussions) or issue for support / ideas.
* Tag issues with `good first issue` for newcomers.

Let’s build a student-friendly platform together! 🚀
