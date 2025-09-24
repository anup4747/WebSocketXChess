import React, { useState, useRef, useEffect } from "react";
import {
  Settings,
  Home,
  Volume2,
  Music,
  Palette,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGameThemeContext } from "../context/themeContext";
import { useVolumeStateContext } from "../context/volumeContext";

const ChessSettingsPage: React.FC = () => {
  const { isDark, themeClasses, cardClasses, buttonClasses, inputClasses, toggleTheme } = useGameThemeContext();
  
  const {musicLevel, soundLevel, setMusicLevel,setSoundLevel} = useVolumeStateContext(); 
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themeOptions = [
    { value: "light", label: "Light Mode", icon: Sun },
    { value: "dark", label: "Dark Mode", icon: Moon },
    { value: "system", label: "System Default", icon: Monitor },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowThemeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleMusicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMusicLevel(parseInt(e.target.value));
  };

  const handleSoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoundLevel(parseInt(e.target.value));
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
    setShowThemeDropdown(false);
  };


  const selectedThemeOption = themeOptions.find(option => option.value === selectedTheme);

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${themeClasses}`}>
      <div className={`w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${cardClasses}`}>
        
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
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-3 sm:mb-4">
            <Settings className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-mono mb-2">Settings</h1>
          <p className={`text-xs sm:text-sm font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Customize your chess experience
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <Music className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-mono font-bold">Background Music</h3>
                <p className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Adjust music volume level
                </p>
              </div>
              <span className={`text-sm font-mono font-bold ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                {musicLevel}%
              </span>
            </div>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="100"
                value={musicLevel}
                onChange={handleMusicChange}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                } slider`}
                style={{
                  background: `linear-gradient(to right, ${isDark ? "#3b82f6" : "#2563eb"} 0%, ${isDark ? "#3b82f6" : "#2563eb"} ${musicLevel}%, ${isDark ? "#374151" : "#e5e7eb"} ${musicLevel}%, ${isDark ? "#374151" : "#e5e7eb"} 100%)`
                }}
              />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-mono font-bold">Sound Effects</h3>
                <p className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Adjust sound effects volume
                </p>
              </div>
              <span className={`text-sm font-mono font-bold ${isDark ? "text-green-400" : "text-green-600"}`}>
                {soundLevel}%
              </span>
            </div>
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="100"
                value={soundLevel}
                onChange={handleSoundChange}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                } slider`}
                style={{
                  background: `linear-gradient(to right, ${isDark ? "#10b981" : "#059669"} 0%, ${isDark ? "#10b981" : "#059669"} ${soundLevel}%, ${isDark ? "#374151" : "#e5e7eb"} ${soundLevel}%, ${isDark ? "#374151" : "#e5e7eb"} 100%)`
                }}
              />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-mono font-bold">Theme</h3>
                <p className={`text-xs font-mono ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                  Choose your preferred theme
                </p>
              </div>
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border font-mono transition-colors text-sm sm:text-base flex items-center justify-between ${inputClasses}`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {selectedThemeOption && (
                    <selectedThemeOption.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                  <span>{selectedThemeOption?.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${showThemeDropdown ? "rotate-180" : ""}`} />
              </button>
              
              {showThemeDropdown && (
                <div className={`absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-lg z-10 overflow-hidden ${cardClasses}`}>
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleThemeSelect(option.value)}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 flex items-center space-x-2 sm:space-x-3 font-mono text-sm sm:text-base transition-colors hover:${isDark ? "bg-gray-700" : "bg-gray-50"} ${
                        selectedTheme === option.value ? (isDark ? "bg-gray-700" : "bg-gray-100") : ""
                      }`}
                    >
                      <option.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>


          <Link to="/" className="block">
            <button
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-2 sm:space-x-3 cursor-pointer text-sm sm:text-base ${buttonClasses}`}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Back to Home</span>
            </button>
          </Link>
        </div>

        <div className={`text-center text-xs font-mono mt-6 sm:mt-8 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
          Chess Game Settings v1.0
        </div>
      </div>

      <style tsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${isDark ? "#3b82f6" : "#2563eb"};
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${isDark ? "#3b82f6" : "#2563eb"};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ChessSettingsPage;