import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaFileUpload,
  FaCommentDots,
  FaBookmark,
} from "react-icons/fa";
import "./Profile.css";

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  joinDate: "Joined on August 29, 2025",
  avatar: "https://avatar.iran.liara.run/public/boy",
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("uploads");

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const renderContent = () => {
    const contentData = {
      uploads: {
        icon: <FaFileUpload />,
        text: "You haven't uploaded any materials yet.",
      },
      feedback: { icon: <FaCommentDots />, text: "No feedback submitted yet." },
      bookmarks: {
        icon: <FaBookmark />,
        text: "Your bookmarked items will appear here.",
      },
    };

    const currentContent = contentData[activeTab];

    return (
      <motion.div
        key={activeTab}
        className="content-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="content-icon">{currentContent.icon}</div>
        <p>{currentContent.text}</p>
      </motion.div>
    );
  };

  return (
    <motion.div
      className="profile-page"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div className="profile-header-card" variants={fadeInUp}>
        <div className="profile-info">
          <motion.img
            src={user.avatar}
            alt="User Avatar"
            className="profile-avatar"
            whileHover={{ scale: 1.05 }}
          />
          <div className="profile-text">
            <h1 className="profile-user-name">{user.name}</h1>
            <p className="profile-user-email">{user.email}</p>
            <p className="profile-join-date">{user.joinDate}</p>
          </div>
        </div>
        <motion.button
          className="edit-profile-btn-modern"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUserEdit />
          <span>Edit Profile</span>
        </motion.button>
      </motion.div>

      <motion.div className="profile-tabs-container" variants={fadeInUp}>
        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === "uploads" ? "active" : ""}`}
            onClick={() => setActiveTab("uploads")}
          >
            My Uploads
          </button>
          <button
            className={`tab-btn ${activeTab === "feedback" ? "active" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            My Feedback
          </button>
          <button
            className={`tab-btn ${activeTab === "bookmarks" ? "active" : ""}`}
            onClick={() => setActiveTab("bookmarks")}
          >
            My Bookmarks
          </button>
        </div>
      </motion.div>

      <motion.div className="profile-content" variants={fadeInUp}>
        {renderContent()}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
