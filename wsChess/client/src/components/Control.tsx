import React from "react";
import { Link } from "react-router-dom";
import type { ControlProps } from "../types/types";
import { LogOut, RotateCcw, Sun, Moon } from "lucide-react";
import { useGameThemeContext } from "../context/themeContext";

const Controls: React.FC<ControlProps> = ({
  turn,
  resetGame,
}) => {
  const {isDark, buttonClasses, cardClasses, primaryButtonClasses, toggleTheme} = useGameThemeContext();
  
  const getTurnColor = () => {
    if (turn === "white") {
      return isDark ? "text-gray-200" : "text-gray-800";
    } else {
      return isDark ? "text-gray-300" : "text-gray-700";
    }
  };

  return (
    <section
      className={`mt-6 p-6 rounded-2xl border transition-all duration-300 ${cardClasses}`}
    >
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-3 h-3 rounded-full ${
              turn === "white"
                ? "bg-gray-200 border-2 border-gray-800"
                : "bg-gray-800 border-2 border-gray-300"
            }`}
          ></div>
          <p className={`text-lg font-mono font-bold ${getTurnColor()}`}>
            Turn: <span className="capitalize">{turn}</span>
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg border transition-colors ${buttonClasses}`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <button
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-mono font-bold cursor-pointer transition-colors ${primaryButtonClasses}`}
            onClick={resetGame}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Game</span>
          </button>
        </div>

        <Link to="/" className="flex-1">
          <button
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-mono font-bold cursor-pointer transition-colors ${buttonClasses}`}
          >
            <LogOut className="w-4 h-4" />
            <span>Exit</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Controls;
