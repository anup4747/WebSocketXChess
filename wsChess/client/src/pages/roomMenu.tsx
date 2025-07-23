import React, { useState } from "react";
import {
  Crown,
  Users,
  Plus,
  LogIn,
  Moon,
  Sun,
  Copy,
  Check,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGameThemeContext } from "../context/themeContext";
import { useRoomContext } from "../context/roomContext";
import { usePlayerNameContext } from "../context/playerName";

const ChessRoomMenu: React.FC = () => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);
  const {isDark, themeClasses, toggleTheme, cardClasses, primaryButtonClasses, buttonClasses, inputClasses} = useGameThemeContext();
  const {generatedRoomCode, setGeneratedRoomCode, generateRoomCode} = useRoomContext();
  const {playerName, setPlayerName} = usePlayerNameContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Capitalize first letter, keep rest as typed
    const capitalizedValue = value
      ? value.charAt(0).toUpperCase() + value.slice(1)
      : '';
    setPlayerName(capitalizedValue);
  };

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedRoomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy room code");
    }
  };

  const handleCreateRoom = () => {
    if (playerName.trim()) {
      const code = generateRoomCode();
      console.log(" code is ",code)
      setShowCreateRoom(true);
      console.log("Creating room with code:", code, "Player:", playerName);
    }
  };

  const handleJoinRoom = () => {
    if (playerName.trim() && roomCode.trim()) {
      console.log("Joining room:", roomCode, "Player:", playerName);
      // Handle join room logic here
    }
  };

  const resetMenu = () => {
    setShowCreateRoom(false);
    setShowJoinRoom(false);
    setPlayerName("");
    setRoomCode("");
    setGeneratedRoomCode("");
    setCopied(false);
  };

  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300 ${themeClasses}`}
    >
      <div
        className={`w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-md rounded-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all ${cardClasses}`}
      >
        {/* Theme Toggle */}
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

        <div className="text-center mb-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3 sm:mb-4">
            <Crown className="w-8 h-8 sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-3xl font-bold font-mono mb-2">Chess Rooms</h1>
          <p
            className={`text-xs sm:text-sm font-mono ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Play chess with friends online
          </p>
        </div>

        {showCreateRoom && generatedRoomCode && (
          <div className="mb-4 sm:mb-6">
            <div
              className={`rounded-xl p-4 sm:p-6 border ${
                isDark
                  ? "bg-green-900/30 border-green-700"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3  sm:mb-4">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-bold font-mono text-green-500 mb-2">
                  Room Created!
                </h3>
                <p className="text-sm font-mono mb-3 sm:mb-4">
                  Share this code with your friend:
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className={`px-3 sm:px-4 py-2 rounded-lg font-mono text-base sm:text-lg font-bold ${
                      isDark ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    {generatedRoomCode}
                  </div>
                  <button
                    onClick={copyRoomCode}
                    className={`p-2 rounded-lg transition-colors ${buttonClasses}`}
                    title="Copy room code"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs font-mono mt-3 sm:mt-4 opacity-70">
                  Waiting for opponent to join...
                </p>
              </div>
            </div>
            <button
              onClick={resetMenu}
              className={`w-full mt-3 sm:mt-4 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-mono transition-colors text-sm sm:text-base ${buttonClasses}`}
            >
              Back to Menu
            </button>
          </div>
        )}

        {!showCreateRoom && !showJoinRoom && (
          <div className="space-y-3 sm:space-y-4">
            {/* Player Name Input */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-mono font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={handleNameChange}
                placeholder="Enter your name..."
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border font-mono transition-colors text-sm sm:text-base ${inputClasses}`}
                maxLength={20}
              />
            </div>

            <button
              onClick={handleCreateRoom}
              disabled={!playerName.trim()}
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base ${
                playerName.trim()
                  ? primaryButtonClasses
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
              }`}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Create Room</span>
            </button>

            <button
              onClick={() => setShowJoinRoom(true)}
              disabled={!playerName.trim()}
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base  ${
                playerName.trim()
                  ? buttonClasses
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
              }`}
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"/>
              <span>Join Room</span>
            </button>
            <Link to="/">
              <button
                className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-2 sm:space-x-3 cursor-pointer text-sm sm:text-base ${buttonClasses}`}
              >
                <Home className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>Home</span>
              </button>
            </Link>
          </div>
        )}

        {showJoinRoom && (
          <div className="space-y-3 sm:space-y-4">
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-sm font-mono font-bold mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Enter room code..."
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border font-mono transition-colors text-sm sm:text-base ${inputClasses}`}
                maxLength={6}
              />
            </div>

            <button
              onClick={handleJoinRoom}
              disabled={!roomCode.trim()}
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-2 sm:space-x-3 cursor-pointer text-sm sm:text-base ${
                roomCode.trim()
                  ? primaryButtonClasses
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Join Game</span>
            </button>

            <button
              onClick={resetMenu}
              className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-mono transition-colors cursor-pointer text-sm sm:text-base ${buttonClasses}`}
            >
              Back to Menu
            </button>
          </div>
        )}

        <div
          className={`text-center text-xs font-mono  mt-6 sm:mt-8 ${
            isDark ? "text-gray-500" : "text-gray-400"
          }`}
        >
          Chess Game v1.0
        </div>
      </div>
    </div>
  );
};

export default ChessRoomMenu;
