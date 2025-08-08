import React, { useState, useMemo } from "react";
import "./PYQs.css";

const PYQs = () => {
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const universities = ["Select University", "LPU", "DU", "JNU"];
  
  // Sample papers data (remains the same)
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

  // Memoized lists of available options based on selections
  const availableDepartments = useMemo(() => {
    if (!selectedUniversity) return [];
    return [...new Set(
      samplePapers
        .filter(paper => paper.university === selectedUniversity)
        .map(paper => paper.department)
    )];
  }, [selectedUniversity]);

  const availableSemesters = useMemo(() => {
    if (!selectedUniversity || !selectedDepartment) return [];
    return [...new Set(
      samplePapers
        .filter(paper => paper.university === selectedUniversity && paper.department === selectedDepartment)
        .map(paper => paper.semester)
    )];
  }, [selectedUniversity, selectedDepartment]);

  const availableSubjects = useMemo(() => {
    if (!selectedUniversity || !selectedDepartment || !selectedSemester) return [];
    return [...new Set(
      samplePapers
        .filter(paper => paper.university === selectedUniversity && paper.department === selectedDepartment && paper.semester === selectedSemester)
        .map(paper => paper.subject)
    )];
  }, [selectedUniversity, selectedDepartment, selectedSemester]);

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
      <section className="pyqs-hero">
        <div className="container">
          <div className="pyqs-hero-content">
            <h1>Access Previous Year Question Papers</h1>
          </div>
        </div>
      </section>

      <section className="pyqs-selection">
        <div className="container">
          <div className="pyqs-form">
            {/* University Dropdown */}
            <div className="form-group">
              <label htmlFor="university">University</label>
              <select
                id="university"
                value={selectedUniversity}
                onChange={(e) => {
                  setSelectedUniversity(e.target.value);
                  setSelectedDepartment("");
                  setSelectedSemester("");
                  setSelectedSubject("");
                }}
              >
                <option value="" disabled>Select University</option>
                {universities.slice(1).map((uni, idx) => (
                  <option key={idx} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </div>

            {/* Department Dropdown */}
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setSelectedSemester("");
                  setSelectedSubject("");
                }}
                disabled={!selectedUniversity}
              >
                <option value="" disabled>Select Department</option>
                {availableDepartments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester Dropdown */}
            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value);
                  setSelectedSubject("");
                }}
                disabled={!selectedUniversity || !selectedDepartment}
              >
                <option value="" disabled>Select Semester</option>
                {availableSemesters.map((sem, idx) => (
                  <option key={idx} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Dropdown */}
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                disabled={!selectedUniversity || !selectedDepartment || !selectedSemester}
              >
                <option value="" disabled>Select Subject</option>
                {availableSubjects.map((subj, idx) => (
                  <option key={idx} value={subj}>
                    {subj}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section (remains the same) */}
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