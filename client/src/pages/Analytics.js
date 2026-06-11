import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { authAxios } from '../context/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from "react-icons/fa";
import './Analytics.css';
import './ScrollToTop.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Analytics = () => {
  document.title = "StudyMatePlus | Analytics";
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Dummy Data
  const subjects = ['DSA', 'DBMS', 'CN', 'OS', 'Java', 'Python'];
  const pyqCount = [25, 18, 10, 15, 20, 12];

  const barData = {
    labels: subjects,
    datasets: [
      {
        label: 'PYQs by Subject',
        data: pyqCount,
        backgroundColor: '#ffd700',
        borderColor: '#ffed4a',
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: subjects,
    datasets: [
      {
        label: 'PYQ Distribution',
        data: pyqCount,
        backgroundColor: [
          '#FFD700', '#FFED4A', '#FFA500', '#FFA07A', '#87CEEB', '#9370DB'
        ],
      },
    ],
  };

  // State to track selected subject
  const [selectedSubject, setSelectedSubject] = useState('all');

  // State for the scroll-to-top button
  const [showScroll, setShowScroll] = useState(false);

  // Effect to handle scroll events for the button
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 300) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 300) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const downloadAnalyticsPdf = async () => {
    const serverBase = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth').replace(/\/api\/auth$/, '');
    const response = await authAxios.post(
      `${serverBase}/api/reports/analytics.pdf`,
      { selectedSubject, subjects, pyqCount },
      { responseType: 'blob' }
    );

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pyq-analytics-report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
                Visualize previous year questions trends subject-wise to prioritize your prep.
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
          <motion.div className="chart-container" variants={scaleIn} whileHover={{ y: -5, boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }}>
            <h2>PYQs by Subject (Bar Chart)</h2>
            <Bar data={barData} />
          </motion.div>
          <motion.div className="chart-container" variants={scaleIn} whileHover={{ y: -5, boxShadow: "0 12px 28px rgba(0,0,0,0.1)" }}>
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
            <motion.li variants={fadeInUp}>📈 <strong>DSA</strong> has the highest number of PYQs – focus more on problem-solving practice.</motion.li>
            <motion.li variants={fadeInUp}>📘 <strong>DBMS</strong> and <strong>Java</strong> also have significant weightage in exams.</motion.li>
            <motion.li variants={fadeInUp}>🎯 Use this trend to plan your revision and mock test priorities.</motion.li>
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
            onClick={() => downloadAnalyticsPdf()}
          >
            ⬇️ Download Analytics PDF
          </motion.button>
        </motion.section>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            key="scrollTop"
            className="scroll-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
     </div>
   );
};

export default Analytics;