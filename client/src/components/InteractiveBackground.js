import React, { useEffect, useRef } from "react";

const InteractiveBackground = () => {
  const elementsRef = useRef([]);

  useEffect(() => {
    // Create floating interactive elements
    const createInteractiveElements = () => {
      const numberOfElements = 5;

      for (let i = 0; i < numberOfElements; i++) {
        const element = document.createElement("div");
        element.className = "interactive-bg-element";
        element.style.cssText = `
          position: fixed;
          width: ${50 + Math.random() * 100}px;
          height: ${50 + Math.random() * 100}px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(${Math.random() * 255}, ${
          Math.random() * 255
        }, ${Math.random() * 255}, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
          opacity: 0;
          transition: all 0.3s ease;
          left: ${Math.random() * window.innerWidth}px;
          top: ${Math.random() * window.innerHeight}px;
        `;
        document.body.appendChild(element);
        elementsRef.current.push(element);
      }
    };

    // Mouse movement handler
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      elementsRef.current.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        if (distance < 150) {
          element.style.opacity = "0.6";
          element.style.transform = `scale(${1.5 - distance / 300})`;
        } else {
          element.style.opacity = "0.2";
          element.style.transform = "scale(1)";
        }

        // Slowly move elements towards mouse
        const moveX = (x - centerX) * 0.01;
        const moveY = (y - centerY) * 0.01;

        element.style.left = `${rect.left + moveX}px`;
        element.style.top = `${rect.top + moveY}px`;
      });
    };

    // Scroll handler for parallax effect
    const handleScroll = () => {
      const scrollY = window.scrollY;

      elementsRef.current.forEach((element, index) => {
        const speed = 0.5 + index * 0.1;
        element.style.transform = `translateY(${scrollY * speed}px) ${
          element.style.transform
        }`;
      });
    };

    // Click handler for ripple effect
    const handleClick = (e) => {
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX - 25}px;
        top: ${e.clientY - 25}px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        animation: rippleEffect 0.8s ease-out forwards;
      `;

      document.body.appendChild(ripple);

      setTimeout(() => {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple);
        }
      }, 800);
    };

    // Add CSS for ripple animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes rippleEffect {
        0% {
          opacity: 1;
          transform: scale(0);
        }
        100% {
          opacity: 0;
          transform: scale(4);
        }
      }
      
      /* Additional floating animation for background elements */
      .interactive-bg-element {
        animation: floatAnimation 6s ease-in-out infinite;
      }
      
      @keyframes floatAnimation {
        0%, 100% {
          transform: translateY(0px) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) rotate(90deg);
        }
        50% {
          transform: translateY(-10px) rotate(180deg);
        }
        75% {
          transform: translateY(-30px) rotate(270deg);
        }
      }
    `;
    document.head.appendChild(style);

    createInteractiveElements();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);

      elementsRef.current.forEach((element) => {
        if (document.body.contains(element)) {
          document.body.removeChild(element);
        }
      });

      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }

      elementsRef.current = [];
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default InteractiveBackground;
