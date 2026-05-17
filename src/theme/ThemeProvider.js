import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("smp_theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("smp_theme", theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => {
      const stored = window.localStorage.getItem("smp_theme");
      if (!stored) setTheme(e.matches ? "dark" : "light");
    };
    if (media.addEventListener) media.addEventListener("change", listener);
    else media.addListener(listener);
    return () => {
      if (media.removeEventListener) media.removeEventListener("change", listener);
      else media.removeListener(listener);
    };
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);


