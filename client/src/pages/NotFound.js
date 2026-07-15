import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh",
      textAlign: "center",
    }}>
      <h1 style={{ fontSize: "6rem", margin: "0", color: "#1a73e8" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Oops! Page Not Found</h2>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "0.75rem 2rem",
          backgroundColor: "#1a73e8",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;