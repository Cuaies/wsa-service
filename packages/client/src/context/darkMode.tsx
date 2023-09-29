import { FC, ReactNode, createContext, useEffect, useState } from "react";

/**
 * Represent the lightning mode context, which is used to toggle between dark and light mode.
 */
export const DarkModeContext = createContext<{
  darkMode: false;
  toggleDarkMode: () => void;
} | null>(null);

/**
 * Represent the lightning mode context provider, which is used to toggle between dark and light mode.
 */
export const DarkModeContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const local = localStorage.getItem("darkMode");
  const [darkMode, setDarkMode] = useState(local ? JSON.parse(local) : "false");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
