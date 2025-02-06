// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// interface ThemeContextType {
//   isDarkMode: boolean;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// // ✅ Custom hook to use the ThemeContext
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// };

// // ✅ ThemeProvider Component
// export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme) {
//       setIsDarkMode(savedTheme === "dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsDarkMode((prevMode) => {
//       const newMode = !prevMode;
//       localStorage.setItem("theme", newMode ? "dark" : "light");
//       return newMode;
//     });
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       <div className={isDarkMode ? "dark" : ""}>{children}</div>
//     </ThemeContext.Provider>
//   );
// };