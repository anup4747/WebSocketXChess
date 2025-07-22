// Menu Component
import { Link } from "react-router-dom";
import React from "react";
import { Settings, Computer, User, CloudOff, Sun, Moon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGameThemeContext } from "../context/themeContext";

const Menu: React.FC = () => {
  const {isDark, buttonClasses, cardClasses, toggleTheme, themeClasses} = useGameThemeContext();
  const sentences = [
    "Make your move, master the board.",
    "Strategy awaits—choose your play.",
    "Checkmate begins with a single move.",
    "Challenge the board, claim your glory.",
    "Pawns to kings, every move counts.",
    "Outwit, outplay, outlast.",
    "The board is set—your move.",
    "Unleash your inner grandmaster.",
    "Tactics and triumph, one move away.",
    "Enter the game, rewrite the endgame.",
  ];
  const [currentSentence, setCurrentSentence] = useState(sentences[0]);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const animateText = () => {
      gsap.fromTo(
        paragraphRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    };

    animateText(); // Initial animation
    const interval = setInterval(() => {
      setCurrentSentence((prev) => {
        const currentIndex = sentences.indexOf(prev);
        const nextIndex = (currentIndex + 1) % sentences.length;
        return sentences[nextIndex];
      });
      animateText(); 
    }, 3000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full ${themeClasses}`}
    >
      <div
        className={`w-full max-w-md rounded-3xl p-14 shadow-2xl border transition-all ${cardClasses}`}
      >
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-colors ${buttonClasses}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold font-mono mb-2">
            Wanna Play Chess?
          </h1>
          <div className="overflow-hidden">
            <p
              ref={paragraphRef}
              className={`text-sm font-mono ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {currentSentence}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link to="/construction">
            <button
              className={`w-full px-6 py-3 rounded-xl flex items-center justify-center space-x-3 font-mono transition-colors cursor-pointer ${buttonClasses}`}
            >
              <Computer className="w-5 h-5" />
              <span>Play with Computer</span>
            </button>
          </Link>
          <Link to="/roommenu">
            <button
              className={`w-full px-6 py-3 rounded-xl flex items-center justify-center space-x-3 font-mono transition-colors cursor-pointer ${buttonClasses}`}
            >
              <User className="w-5 h-5" />
              <span>Play Multiplayer</span>
            </button>
          </Link>
          <Link to="/playoffline">
            <button
              className={`w-full px-6 py-3 rounded-xl flex items-center justify-center space-x-3 font-mono transition-colors cursor-pointer ${buttonClasses}`}
            >
              <CloudOff className="w-5 h-5" />
              <span>Play Offline</span>
            </button>
          </Link>
          <Link to="/construction">
            <button
              className={`w-full px-6 py-3 rounded-xl flex items-center justify-center space-x-3 font-mono transition-colors cursor-pointer ${buttonClasses}`}
            >
              <Settings className="w-5 h-5" />
              <span>Setting</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
