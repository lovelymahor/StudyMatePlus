import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 9999,
        backgroundColor: "#4f46e5",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "44px",
        height: "44px",
        fontSize: "1.2rem",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
}
