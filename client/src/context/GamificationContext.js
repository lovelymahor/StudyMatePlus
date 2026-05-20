import React, { createContext, useState, useEffect, useContext } from 'react';

const GamificationContext = createContext();

export const useGamification = () => useContext(GamificationContext);

export const GamificationProvider = ({ children }) => {
  const [streak, setStreak] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [lastActive, setLastActive] = useState(null);

  useEffect(() => {
    // Load from local storage
    const storedStreak = parseInt(localStorage.getItem('studyMate_streak') || '0', 10);
    const storedTokens = parseInt(localStorage.getItem('studyMate_tokens') || '0', 10);
    const storedLastActive = localStorage.getItem('studyMate_lastActive');

    setTokens(storedTokens);

    const today = new Date().toDateString();

    if (storedLastActive) {
      const lastActiveDate = new Date(storedLastActive);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (storedLastActive === today) {
        // Already active today, streak remains the same
        setStreak(storedStreak);
      } else if (lastActiveDate.toDateString() === yesterday.toDateString()) {
        // Active yesterday, increment streak
        setStreak(storedStreak + 1);
        localStorage.setItem('studyMate_streak', (storedStreak + 1).toString());
      } else {
        // Missed a day (or more), reset streak
        setStreak(1);
        localStorage.setItem('studyMate_streak', '1');
      }
    } else {
      // First time user
      setStreak(1);
      localStorage.setItem('studyMate_streak', '1');
    }

    setLastActive(today);
    localStorage.setItem('studyMate_lastActive', today);
  }, []);

  const addTokens = (amount) => {
    const newTotal = tokens + amount;
    setTokens(newTotal);
    localStorage.setItem('studyMate_tokens', newTotal.toString());
  };

  return (
    <GamificationContext.Provider value={{ streak, tokens, addTokens }}>
      {children}
    </GamificationContext.Provider>
  );
};
