import { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Theme Context
// The context will hold the theme state and a function to toggle it.
const ThemeContext = createContext();

// A custom hook to make using the theme context cleaner
export const useTheme = () => useContext(ThemeContext);

// 2. Create the Theme Provider component
// This component will wrap the entire application and manage the theme state.
export const ThemeProvider = ({ children }) => {
  // Use a state variable to hold the current theme.
  // We initialize it by checking localStorage for a saved preference.
  // If no preference is found, it defaults to 'light'.
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // Use a useEffect hook to update the 'theme' class on the HTML element
  // and to save the preference to localStorage whenever the theme changes.
  useEffect(() => {
    // Get the body element directly
    const body = window.document.body;

    // Remove old theme classes to prevent conflicts
    body.classList.remove('dark-theme', 'light-theme');
    
    // Add the new theme class
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.add('light-theme');
    }

    // Persist the user's preference
    localStorage.setItem('theme', theme);

  }, [theme]);

  // The function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme and the toggle function to the children components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};