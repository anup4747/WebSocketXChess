import { Link } from "react-router-dom";
import React from "react";
import { Settings, Computer, User, CloudOff, Sun, Moon } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGameThemeContext } from "../context/themeContext";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Menu: React.FC = () => {
  const {isDark, buttonClasses, cardClasses, toggleTheme, themeClasses} = useGameThemeContext();
  const sentences = [
    "Make your move, master the board.",
    "Strategy awaits—choose your play.",
    "Checkmate begins with a single move.",
    "Pawns to kings, every move counts.",
    "Outwit, outplay, outlast.",
    "The board is set—your move.",
    "Unleash your inner grandmaster.",
    "Tactics and triumph, one move away.",
    "Enter the game, rewrite the endgame.",
    "Every piece has a purpose—find yours.",
    "Think ahead, strike smart.",
    "One board. Infinite possibilities.",
    "Dominate with every decision.",
    "Play bold. Win smarter.",
    "Not just a game—it's your legacy.",
    "The game favors the fearless.",
    "Where mind meets mastery.",
    "Master the moment, own the match.",
    "See the end before the first move.",
    "Check your fear. Then check your opponent."
  ];
  const [currentSentence, setCurrentSentence] = useState(sentences[0]);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null> (null)

  useGSAP(() => {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -40, scale:0.7 },
        { opacity: 1, y: 0,scale:1, duration: 3, delay: 3, ease:"back" }
      );
    });

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
      className={`flex flex-col items-center justify-center min-h-screen w-full px-4 sm:px-6 lg:px-8  ${themeClasses}`}
    >
      <div
        ref={menuRef}
        className={`w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md rounded-3xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 shadow-2xl border transition-all ${cardClasses}`}
      >
        <div className="flex justify-end mb-4 sm:mb-6">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-colors ${buttonClasses}`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>

        <div className="text-center mb-8 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-mono mb-2">
            Wanna Play Chess?
          </h1>
          <div className="overflow-hidden px-2 sm:px-0">
            <p
              ref={paragraphRef}
              className={`text-sm sm:text-sm font-mono ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {currentSentence}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <Link to="/construction">
            <button
              className={`w-full  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl flex items-center justify-center space-x-2 sm:space-x-3 font-mono transition-colors cursor-pointer text-sm sm:text-base ${buttonClasses}`}
            >
              <Computer className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Play with Computer</span>
            </button>
          </Link>
          <Link to="/roommenu">
            <button
              className={`w-full  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl flex items-center justify-center space-x-2 sm:space-x-3 font-mono transition-colors cursor-pointer text-sm sm:text-base ${buttonClasses}`}
            >
              <User className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Play Multiplayer</span>
            </button>
          </Link>
          <Link to="/playoffline">
            <button
              className={`w-full  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl flex items-center justify-center space-x-2 sm:space-x-3 font-mono transition-colors cursor-pointer text-sm sm:text-base ${buttonClasses}`}
            >
              <CloudOff className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Play Offline</span>
            </button>
          </Link>
          <Link to="/construction">
            <button
              className={`w-full  px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl flex items-center justify-center space-x-2 sm:space-x-3 font-mono transition-colors cursor-pointer text-sm sm:text-base ${buttonClasses}`}
            >
              <Settings className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Setting</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
