import React, { useState } from "react";
import "./PYQs.css";

const PYQs = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const universities = ["Select University", "LPU", "DU", "JNU"];
  const departments = ["Select Department", "Engineering", "Science", "Arts"];
  const semesters = [
    "Select Semester",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
  ];
  const subjects = [
    "Select Subject",
    "Mathematics",
    "Physics",
    "Computer Science",
  ];

  // Sample papers data
  const samplePapers = [
    {
      id: 1,
      university: "LPU",
      department: "Engineering",
      semester: "4th",
      subject: "Computer Science",
      uploader: "Harish",
      date: "2024-05-20",
    },
    {
      id: 2,
      university: "DU",
      department: "Science",
      semester: "3rd",
      subject: "Mathematics",
      uploader: "Ananya Gupta",
      date: "2023-12-10",
    },
    {
      id: 3,
      university: "JNU",
      department: "Science",
      semester: "2nd",
      subject: "Physics",
      uploader: "Ravi Verma",
      date: "2022-06-15",
    },
    {
      id: 4,
      university: "LPU",
      department: "Engineering",
      semester: "4th",
      subject: "Computer Science",
      uploader: "Sneha Singh",
      date: "2023-11-02",
    },
  ];

  // Filter papers based on selected options
  const filteredPapers = samplePapers.filter(
    (paper) =>
      paper.university === selectedUniversity &&
      paper.department === selectedDepartment &&
      paper.semester === selectedSemester &&
      paper.subject === selectedSubject
  );

  return (
    <div className="pyqs-page">
      {/* Hero Section */}
      <section className="pyqs-hero">
        <div className="container">
          <div className="pyqs-hero-content">
            <h1>Access Previous Year Question Papers</h1>
          </div>
        </div>
      </section>

      {/* Selection Section */}
      <section className="pyqs-selection">
        <div className="container">
          <div className="pyqs-form">
            {/* University */}
            <div className="form-group">
              <label htmlFor="university">University</label>
              <select
                id="university"
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
              >
                {universities.map((uni, idx) => (
                  <option
                    key={idx}
                    value={idx !== 0 ? uni : ""}
                    disabled={idx === 0}
                  >
                    {uni}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map((dept, idx) => (
                  <option
                    key={idx}
                    value={idx !== 0 ? dept : ""}
                    disabled={idx === 0}
                  >
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {semesters.map((sem, idx) => (
                  <option
                    key={idx}
                    value={idx !== 0 ? sem : ""}
                    disabled={idx === 0}
                  >
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((subj, idx) => (
                  <option
                    key={idx}
                    value={idx !== 0 ? subj : ""}
                    disabled={idx === 0}
                  >
                    {subj}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pyqs-results">
        <div className="container">
          {selectedUniversity &&
          selectedDepartment &&
          selectedSubject &&
          selectedSemester ? (
            <div className="pyqs-results-box">
              <h2>
                Previous Year Question Papers for{" "}
                <strong>{selectedSubject}</strong> – {selectedSemester}{" "}
                Semester, {selectedDepartment} Department, {selectedUniversity}
              </h2>

              {filteredPapers.length > 0 ? (
                <div className="pyqs-cards-grid">
                  {filteredPapers.map((paper) => (
                    <div key={paper.id} className="pyq-card">
                      <h3>{paper.subject}</h3>
                      <p>Uploaded on: {paper.date}</p>
                      <p>Uploader: {paper.uploader}</p>
                      <button>View ➜</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="prompt">No papers found for selected filters.</p>
              )}
            </div>
          ) : (
            <p className="prompt">
              Please select university, department, semester, and subject to
              view available question papers.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PYQs;
