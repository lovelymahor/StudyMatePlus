import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';
import './ScrollToTop.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-content">
            
            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send us a message</h2>
              
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Message sent successfully!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              <h2>Contact Information</h2>
              
              <div className="info-item">
                <div className="info-icon">📧</div>
                <div className="info-content">
                  <h3>Email</h3>
                  <p>support@studymateplus.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📱</div>
                <div className="info-content">
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h3>Address</h3>
                  <p>123 Education Street<br/>Learning City, LC 12345<br/>India</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">⏰</div>
                <div className="info-content">
                  <h3>Business Hours</h3>
                  <p>Monday - Friday<br/>9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
              
              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="#" className="social-icon">Facebook</a>
                  <a href="#" className="social-icon">Twitter</a>
                  <a href="#" className="social-icon">LinkedIn</a>
                  <a href="#" className="social-icon">Instagram</a>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>How quickly will you respond?</h3>
              <p>We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            
            <div className="faq-item">
              <h3>Can I request specific study materials?</h3>
              <p>Absolutely! Let us know what materials you need and we'll help you find them.</p>
            </div>
            
            <div className="faq-item">
              <h3>How do I report a problem?</h3>
              <p>Use the contact form above or email us directly at support@studymateplus.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;