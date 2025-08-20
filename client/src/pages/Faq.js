import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Faq.css";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "📘 What resources are available on StudyMatePlus?",
      a: "You can access syllabus, previous year question papers (PYQs), notes, and study guides tailored for each branch."
    },
    {
      q: "💡 Is StudyMatePlus free to use?",
      a: "Yes! All resources are completely free for students. We believe in open access to learning materials."
    },
    {
      q: "📂 Can I contribute notes or PYQs?",
      a: "Absolutely! You can submit your notes, assignments, or question papers to help others in the community."
    },
    {
      q: "🔔 How do I stay updated with new uploads?",
      a: "You can subscribe to our newsletter or enable notifications to get alerts about new resources."
    },
    {
      q: "⚙️ Which branches are supported?",
      a: "Currently, CSE, ECE, ME, and CE branches are supported. More will be added soon!"
    },
    {
      q: "❓ How can I contact support?",
      a: "Reach out to us via the Contact section at the bottom of the page or email support@studymateplus.com."
    }
  ];

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Got Questions? <span className="brand-highlight">We’ve Got Answers</span>
            </h1>
            <p className="hero-subtitle">
              Explore frequently asked questions about StudyMatePlus, resources, and features.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="faq-section container">
        <h2 className="section-title">🙋 Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((item, idx) => (
            <motion.div
              key={idx}
              className={`faq-item ${openIndex === idx ? "active" : ""}`}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="faq-question">{item.q}</div>
              {openIndex === idx && <div className="faq-answer">{item.a}</div>}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section container">
        <h2 className="section-title">✨ Why Choose StudyMatePlus?</h2>
        <ul className="features-list">
          <li>📘 Free access to syllabus, notes, and PYQs</li>
          <li>📊 Analytics of most downloaded resources</li>
          <li>🤝 Community-driven contributions</li>
          <li>⚡ Fast and mobile-friendly platform</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section className="contact-section container">
        <h2 className="section-title">📩 Contact Us</h2>
        <p>
          Still have questions? Reach out to us at <b>support@studymateplus.com</b> or fill out the form below.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5"></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
            {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container container">
          <div className="footer-brand">
            <h3>📘 StudyMatePlus</h3>
            <p>Your one-stop solution for syllabus, notes & PYQs.</p>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/syllabus">📚 Syllabus</a></li>
              <li><a href="/pyq">📝 PYQs</a></li>
              <li><a href="/notes">📒 Notes</a></li>
              <li><a href="/faq">🙋 FAQ</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>📩 support@studymateplus.com</p>
            <p>🌍 www.studymateplus.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} StudyMatePlus. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default Faq;
