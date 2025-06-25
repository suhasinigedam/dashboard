import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      setIsDark(true);
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 border-b h-16 z-10 flex items-center px-6 shadow-sm">
      <h1 className="text-xl font-semibold text-black dark:text-white flex-grow">
        Mini Dashboard
      </h1>

      <button
        onClick={toggleDarkMode}
        className="dark:bg-black bg-white px-3 py-1 rounded border border-gray-500 dark:border-gray-300 text-gray-700 dark:text-gray-300 focus:outline-none"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Navbar;
