import React, { useState, useEffect } from "react";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  // Show button after scrolling
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Listen for scrolling
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "55px",
            height: "55px",
            fontSize: "24px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#facc15",
            color: "black",
            cursor: "pointer",
            zIndex: 1000,
            }}
        >
          ↑
        </button>
      )}
    </>
  );
}

export default BackToTop;