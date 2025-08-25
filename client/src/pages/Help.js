import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaUpload, FaCommentDots, FaUserGraduate, FaHandsHelping, FaEnvelope, FaPhone } from "react-icons/fa";

// Animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const Help = () => {
  const faqs = [
    {
      question: "How do I upload notes or study materials?",
      answer:
        "Navigate to your department and subject, then click 'Upload Notes'. Select your files, add a title and description, and submit.",
    },
    {
      question: "How can I access previous year question papers (PYQs)?",
      answer:
        "Go to the 'PYQs' section from the main menu. Use the filters to select your university, department, semester, and subject.",
    },
    {
      question: "How do I provide feedback on an exam paper?",
      answer:
        "After viewing a PYQ, click on the 'Feedback' button. Rate the paper and provide your comments. Your feedback will help future students.",
    },
    {
      question: "How can I connect with seniors for mentorship?",
      answer:
        "Visit the 'Mentorship' page, search for seniors in your department, and send them a request to start a chat.",
    },
  ];

  const steps = [
    { icon: <FaUserGraduate size={30} />, title: "Sign Up / Login", desc: "Create an account using your university email or Google login to access all features." },
    { icon: <FaBook size={30} />, title: "Browse Academic Resources", desc: "Use the syllabus and PYQs sections to find relevant materials for your courses." },
    { icon: <FaUpload size={30} />, title: "Upload Notes or Guides", desc: "Share study materials, notes, or guides to help your peers." },
    { icon: <FaCommentDots size={30} />, title: "Provide Feedback", desc: "Rate previous papers, share your exam experience, and help improve the platform." },
    { icon: <FaHandsHelping size={30} />, title: "Connect with Seniors", desc: "Use mentorship chat to ask questions and get guidance from experienced students." },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <motion.div
      className="help-page container mx-auto px-6 py-12"
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
    >
      {/* Hero */}
      <motion.div
        className="hero text-center bg-gradient-to-r from-blue-500 to-indigo-600 p-10 rounded-xl text-white mb-12"
        variants={fadeInUp}
      >
        <h1 className="text-4xl font-bold mb-4">Help & Support</h1>
        <p className="text-lg max-w-2xl mx-auto opacity-90">
          Find answers to common questions, get help using StudyMatePlus, and navigate through platform features with ease.
        </p>
      </motion.div>

      {/* Steps */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Getting Started</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="step-card p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:translate-y-2"
              variants={fadeInUp}
            >
              <div className="text-blue-600 mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`faq-item p-4 rounded-lg shadow-md ${openIndex === index ? "open" : ""}`}
              variants={fadeInUp}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="faq-question w-full flex justify-between items-center text-left font-semibold text-gray-700"
              >
                {faq.question}
                <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="faq-answer text-gray-600"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Go Home Button */}
      <div className="mt-16 text-center">
        <Link to="/" className="btn bg-blue-600 text-white py-2 px-8 rounded-lg shadow-md hover:bg-blue-700">Go Home</Link>
      </div>

      {/* Contact */}
      <motion.section className="mt-16 contact-info" variants={fadeInUp}>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Contact Support</h2>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-500 text-xl" />
            <a href="mailto:privacy@studymateplus.com" className="text-blue-600">privacy@studymateplus.com</a>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-blue-500 text-xl" />
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Help;
