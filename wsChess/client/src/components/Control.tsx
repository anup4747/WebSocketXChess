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
      className={`mt-6 px-4 py-4 sm:px-6 sm:py-6 sm:p-6 w-full max-w-[700px] sm:w-[90vw] sm:max-w-[610px] md:max-w-[710px] rounded-2xl border transition-all duration-300 ${cardClasses}`}
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
          <p className={`text-sm sm:text-base md:text-lg font-mono font-bold ${getTurnColor()}`}>
            Turn: <span className="capitalize">{turn}</span>
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className={`p-2 sm:p-2.5 md:p-3 rounded-lg border transition-colors ${buttonClasses}`}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5 " /> : <Moon className="w-5 h-5 sm:w-4 sm:h-4 md:w-5 md:h-5" />}
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="flex-1">
          <button
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 md:py-4 rounded-xl font-mono font-bold cursor-pointer transition-colors ${primaryButtonClasses}`}
            onClick={resetGame}
          >
            <RotateCcw className="w-4 h-4" />
            <span className="text-sm sm:text-base md:text-lg">Reset Game</span>
          </button>
        </div>

        <Link to="/" className="flex-1">
          <button
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 md:py-4 rounded-xl font-mono font-bold cursor-pointer transition-colors ${buttonClasses}`}
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm sm:text-base md:text-lg">Exit</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Controls;
