import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Analytics = () => {
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

  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                PYQ <span className="brand-highlight">Analytics</span>
              </h1>
              <p className="hero-subtitle">
                Visualize previous year questions trends subject-wise to prioritize your prep.
              </p>
            </div>
          </div>
        </section>

        <section className="analytics-section">
          <div className="chart-container">
            <h2>PYQs by Subject (Bar Chart)</h2>
            <Bar data={barData} />
          </div>
          <div className="chart-container">
            <h2>PYQ Subject Distribution (Pie Chart)</h2>
            <Pie data={pieData} />
          </div>
        </section>


        {/* 🔍 Insights Section */}
        <section className="insights-section">
          <h2>📊 Insights Summary</h2>
          <ul>
            <li>📈 <strong>DSA</strong> has the highest number of PYQs – focus more on problem-solving practice.</li>
            <li>📘 <strong>DBMS</strong> and <strong>Java</strong> also have significant weightage in exams.</li>
            <li>🎯 Use this trend to plan your revision and mock test priorities.</li>
          </ul>
        </section>

        {/* 🧩 Filter Section */}
        <section className="filter-section">
          <h2>🎯 Filter by Subject</h2>
          <select>
            <option value="all">All Subjects</option>
            <option value="dsa">DSA</option>
            <option value="dbms">DBMS</option>
            <option value="cn">Computer Networks</option>
            <option value="os">Operating Systems</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </section>

        {/* 📥 Download Button */}
        <section className="download-section">
          <button className="download-btn">⬇️ Download Report (PDF)</button>
        </section>

      </div>
    </div>
  );
};

export default Analytics;
