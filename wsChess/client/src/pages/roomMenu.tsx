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
import type { RoomMenuProps } from "../types/types";

const ChessRoomMenu: React.FC<RoomMenuProps> = ({
  isDark,
  themeClasses,
  buttonClasses,
  cardClasses,
  primaryButtonClasses,
  inputClasses,
  generatedRoomCode,
  generateRoomCode,
  toggleTheme,
  setGeneratedRoomCode,
  setPlayerName,
  playerName
}) => {
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [copied, setCopied] = useState(false);

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
      className={`h-screen w-full flex items-center justify-center p-8 transition-colors duration-300 ${themeClasses}`}
    >
      <div
        className={`w-full max-w-md rounded-3xl p-8 shadow-2xl border transition-all ${cardClasses}`}
      >
        {/* Theme Toggle */}
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
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
            <Crown className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold font-mono mb-2">Chess Rooms</h1>
          <p
            className={`text-sm font-mono ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Play chess with friends online
          </p>
        </div>

        {showCreateRoom && generatedRoomCode && (
          <div className="mb-6">
            <div
              className={`rounded-xl p-6 border ${
                isDark
                  ? "bg-green-900/30 border-green-700"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold font-mono text-green-500 mb-2">
                  Room Created!
                </h3>
                <p className="text-sm font-mono mb-4">
                  Share this code with your friend:
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className={`px-4 py-2 rounded-lg font-mono text-lg font-bold ${
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
                <p className="text-xs font-mono mt-4 opacity-70">
                  Waiting for opponent to join...
                </p>
              </div>
            </div>
            <button
              onClick={resetMenu}
              className={`w-full mt-4 px-6 py-3 rounded-xl font-mono transition-colors ${buttonClasses}`}
            >
              Back to Menu
            </button>
          </div>
        )}

        {!showCreateRoom && !showJoinRoom && (
          <div className="space-y-4">
            {/* Player Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-mono font-bold mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Enter your name..."
                className={`w-full px-4 py-3 rounded-xl border font-mono transition-colors ${inputClasses}`}
                maxLength={20}
              />
            </div>

            <button
              onClick={handleCreateRoom}
              disabled={!playerName.trim()}
              className={`w-full px-6 py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-3 ${
                playerName.trim()
                  ? primaryButtonClasses
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Create Room</span>
            </button>

            <button
              onClick={() => setShowJoinRoom(true)}
              disabled={!playerName.trim()}
              className={`w-full px-6 py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-3 ${
                playerName.trim()
                  ? buttonClasses
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
              }`}
            >
              <LogIn className="w-5 h-5" />
              <span>Join Room</span>
            </button>
            <Link to="/">
              <button
                className={`w-full px-6 py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-3 cursor-pointer ${buttonClasses}`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
            </Link>
          </div>
        )}

        {showJoinRoom && (
          <div className="space-y-4">
            <div className="mb-6">
              <label className="block text-sm font-mono font-bold mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Enter room code..."
                className={`w-full px-4 py-3 rounded-xl border font-mono transition-colors ${inputClasses}`}
                maxLength={6}
              />
            </div>

            <button
              onClick={handleJoinRoom}
              disabled={!roomCode.trim()}
              className={`w-full px-6 py-4 rounded-xl font-mono font-bold transition-colors flex items-center justify-center space-x-3 cursor-pointer ${
                roomCode.trim()
                  ? primaryButtonClasses
                  : "bg-gray-400 cursor-not-allowed text-gray-200"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Join Game</span>
            </button>

            <button
              onClick={resetMenu}
              className={`w-full px-6 py-3 rounded-xl font-mono transition-colors cursor-pointer ${buttonClasses}`}
            >
              Back to Menu
            </button>
          </div>
        )}

        <div
          className={`text-center text-xs font-mono mt-8 ${
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
