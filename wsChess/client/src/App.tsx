import "./App.css";
import Menu from "./pages/menu";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayOffline from "./pages/offline";
import InConstuction from "./pages/inConstruction";
import PageNotFound from "./pages/pageNotFound";
import ChessRoomMenu from "./pages/roomMenu";

const App: React.FC = () => {

  const [isDark, setIsDark] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const themeClasses = isDark
    ? "bg-gray-900 text-gray-100"
    : "bg-gray-50 text-gray-900";

  const cardClasses = isDark
    ? "bg-gray-800 border-gray-700"
    : "bg-white border-gray-200";

  const inputClasses = isDark
    ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500";

  const buttonClasses = isDark
    ? "bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300"
    : "bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-700";

  const primaryButtonClasses = isDark
    ? "bg-blue-600 hover:bg-blue-700 text-white"
    : "bg-blue-600 hover:bg-blue-700 text-white";

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <section className={`flex flex-col items-center justify-center ${themeClasses}`} >
      {/* // bg-[#1c1c1c] */}
      <Routes>
        <Route path="/" element={<Menu buttonClasses={buttonClasses} cardClasses={cardClasses} isDark={isDark} toggleTheme={toggleTheme} themeClasses={themeClasses}/>} />
        <Route path="/playoffline" element={<PlayOffline toggleTheme={toggleTheme} buttonClasses={buttonClasses} cardClasses={cardClasses} primaryButtonClasses={primaryButtonClasses} themeClasses={themeClasses} isDark={isDark} />} />
        <Route path="/construction" element={<InConstuction buttonClasses={buttonClasses} themeClasses={themeClasses} />} />
        <Route path="/roommenu" element={<ChessRoomMenu isDark={isDark} themeClasses={themeClasses} buttonClasses={buttonClasses} cardClasses={cardClasses} primaryButtonClasses={primaryButtonClasses} inputClasses={inputClasses} toggleTheme={toggleTheme} />} />
        <Route path="*" element={<PageNotFound buttonClasses={buttonClasses} themeClasses={themeClasses} />} />
      </Routes>

    </section>
  );
};

export default App;
