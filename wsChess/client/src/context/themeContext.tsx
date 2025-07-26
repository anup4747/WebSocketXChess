import React, { createContext, useContext, useState } from "react";
import type { GameThemeContextType } from "../types/types";

const GameThemeContext = createContext<GameThemeContextType | undefined>(undefined);

export const useGameThemeContext = () => {
  const context = useContext(GameThemeContext);
  if (!context) {
    throw new Error("useGameThemeContext must be used within a GameThemeProvider");
  }
  return context;
};

export const GameThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

    const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleTheme = () => setIsDark((prev) => !prev);
  const themeClasses = isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900';
  const cardClasses = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const inputClasses = isDark
    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500';
  const buttonClasses = isDark
    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300'
    : 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700';
  const primaryButtonClasses = isDark
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-blue-600 hover:bg-blue-700 text-white';
  return (
    <GameThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        themeClasses,
        cardClasses,
        inputClasses,
        buttonClasses,
        primaryButtonClasses
    }}
    >
      {children}
    </GameThemeContext.Provider>
  );
};