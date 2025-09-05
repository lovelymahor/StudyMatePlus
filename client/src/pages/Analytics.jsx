import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import "./Analytics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Analytics = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Dummy Data
  const subjects = ["DSA", "DBMS", "CN", "OS", "Java", "Python"];
  const pyqCount = [25, 18, 10, 15, 20, 12];

  const barData = {
    labels: subjects,
    datasets: [
      {
        label: "PYQs by Subject",
        data: pyqCount,
        backgroundColor: "#ffd700",
        borderColor: "#ffed4a",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: subjects,
    datasets: [
      {
        label: "PYQ Distribution",
        data: pyqCount,
        backgroundColor: [
          "#FFD700",
          "#FFED4A",
          "#FFA500",
          "#FFA07A",
          "#87CEEB",
          "#9370DB",
        ],
      },
    ],
  };

  // State to track selected subject
  const [selectedSubject, setSelectedSubject] = useState("all");

  // Function to handle download
  const handleDownload = (subject) => {
    let fileUrl = "";
    switch (subject.toLowerCase()) {
      case "dsa":
        fileUrl = "/notes/dsa.pdf"; // Replace with actual path or URL
        break;
      case "dbms":
        fileUrl = "/notes/dbms.pdf"; // Replace with actual path or URL
        break;
      case "cn":
        fileUrl = "/notes/cn.pdf"; // Replace with actual path or URL
        break;
      case "os":
        fileUrl = "/notes/os.pdf"; // Replace with actual path or URL
        break;
      case "java":
        fileUrl = "/notes/java.pdf"; // Replace with actual path or URL
        break;
      case "python":
        fileUrl = "/notes/python.pdf"; // Replace with actual path or URL
        break;
      default:
        fileUrl = ""; // No download for 'all'
    }

    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `${subject}_notes.pdf`; // Customize filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="home">
      <div className="container">
        <motion.section
          className="hero"
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
        >
          <div className="hero-container">
            <motion.div className="hero-content" variants={fadeInUp}>
              <h1 className="hero-title">
                PYQ <span className="brand-highlight">Analytics</span>
              </h1>
              <p className="hero-subtitle">
                Visualize previous year questions trends subject-wise to
                prioritize your prep.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          className="analytics-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.div
            className="chart-container"
            variants={scaleIn}
            whileHover={{ y: -5, boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }}
          >
            <h2>PYQs by Subject (Bar Chart)</h2>
            <Bar data={barData} />
          </motion.div>
          <motion.div
            className="chart-container"
            variants={scaleIn}
            whileHover={{ y: -5, boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }}
          >
            <h2>PYQ Subject Distribution (Pie Chart)</h2>
            <Pie data={pieData} />
          </motion.div>
        </motion.section>

        <motion.section
          className="insights-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <motion.h2 variants={fadeInUp}>📊 Insights Summary</motion.h2>
          <motion.ul variants={staggerChildren}>
            <motion.li variants={fadeInUp}>
              📈 <strong>DSA</strong> has the highest number of PYQs – focus
              more on problem-solving practice.
            </motion.li>
            <motion.li variants={fadeInUp}>
              📘 <strong>DBMS</strong> and <strong>Java</strong> also have
              significant weightage in exams.
            </motion.li>
            <motion.li variants={fadeInUp}>
              🎯 Use this trend to plan your revision and mock test priorities.
            </motion.li>
          </motion.ul>
        </motion.section>

        <motion.section
          className="filter-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2>🎯 Filter by Subject</h2>
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
            }}
          >
            <option value="all">All Subjects</option>
            <option value="dsa">DSA</option>
            <option value="dbms">DBMS</option>
            <option value="cn">Computer Networks</option>
            <option value="os">Operating Systems</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </motion.section>

        <motion.section
          className="download-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.button
            className="download-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (selectedSubject !== "all") {
                handleDownload(selectedSubject);
              }
            }}
          >
            ⬇️ Download Notes (PDF)
          </motion.button>
        </motion.section>
      </div>
    </div>
  );
};

export default Analytics;
