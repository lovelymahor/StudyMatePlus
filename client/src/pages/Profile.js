import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaFileUpload,
  FaCommentDots,
  FaBookmark,
  FaFireAlt,
  FaMedal,
} from "react-icons/fa";
import "./Profile.css";
import './ScrollToTop.css';
import { useAuth, authAxios } from "../context/AuthContext";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [loadingStreak, setLoadingStreak] = useState(false);
  const [streakMessage, setStreakMessage] = useState("");

  const handleLogStudy = async () => {
    setLoadingStreak(true);
    setStreakMessage("");
    try {
      const res = await authAxios.post('/study-streak');
      if (res.data.success) {
        if (updateUser) updateUser(res.data.data.user);
        setStreakMessage(res.data.message);
      }
    } catch (error) {
      setStreakMessage("Failed to log study session.");
    } finally {
      setLoadingStreak(false);
    }
  };
  document.title = "StudyMatePlus | Profile";
  const [activeTab, setActiveTab] = useState("uploads");
  const profileUser = user || {
    name: "Your Profile",
    email: "",
    createdAt: null,
    avatar: "/logo.png",
  };

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
            src={profileUser.avatar || "/logo.png"}
            alt={`${profileUser.name || "User"} avatar`}
            className="profile-avatar"
            whileHover={{ scale: 1.05 }}
          />
          <div className="profile-text">
            <h1 className="profile-user-name">{profileUser.name}</h1>
            <p className="profile-user-email">{profileUser.email}</p>
            <p className="profile-join-date">
              {profileUser.createdAt
                ? `Joined on ${new Date(profileUser.createdAt).toLocaleDateString()}`
                : "Profile photo and account details appear here after sign in."}
            </p>
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

      <motion.div className="profile-streak-card" variants={fadeInUp}>
        <div className="streak-stats">
          <div className="streak-stat-item">
            <FaFireAlt className="streak-icon current" />
            <div className="streak-info">
              <h3>{profileUser.currentStreak || 0}</h3>
              <p>Current Streak</p>
            </div>
          </div>
          <div className="streak-stat-item">
            <FaFireAlt className="streak-icon longest" />
            <div className="streak-info">
              <h3>{profileUser.longestStreak || 0}</h3>
              <p>Longest Streak</p>
            </div>
          </div>
        </div>
        <div className="streak-actions">
           <button 
             className="log-study-btn" 
             onClick={handleLogStudy} 
             disabled={loadingStreak}
           >
             {loadingStreak ? "Logging..." : "Log Study Session"}
           </button>
           {streakMessage && <p className="streak-message">{streakMessage}</p>}
        </div>
        
        {profileUser.badges && profileUser.badges.length > 0 && (
          <div className="badges-container">
            <h4>Achievements</h4>
            <div className="badges-grid">
              {profileUser.badges.map((badge, idx) => (
                <div key={idx} className="badge-item">
                  <FaMedal className="badge-icon" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
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
