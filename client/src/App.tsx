import "./App.css";
import Menu from "./pages/menu";
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PlayChess from "./pages/chessPage";
import InConstuction from "./pages/inConstruction";
import PageNotFound from "./pages/pageNotFound";
import ChessRoomMenu from "./pages/roomMenu";
import ChessSettingsPage from "./pages/chessSettingPage";
import { GameThemeProvider, useGameThemeContext } from "./context/themeContext";
import { RoomProvider } from "./context/roomContext";
import { PlayerNameProvider } from "./context/playerName";
import { BoardStateProvider } from "./context/boardContext";
import { GameModeProvider } from "./context/gameModeContext";
import { PointsContextProvider } from "./context/pointsContext";
import { VolumeStateProvider } from "./context/volumeContext";
import { SocketIOProvider } from "./context/SocketIOContext";
import { AnimatePresence, motion } from "framer-motion";
import { BounceLoader } from "react-spinners";

const AppContent: React.FC = () => {
  const { themeClasses } = useGameThemeContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {isLoading && (
        <div
          className={`fixed inset-0 ${themeClasses} select-none flex items-center justify-center z-50`}
        >
          <motion.div
            className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-5xl sm:text-6xl lg:text-7xl font-bold font-mono mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: "easeOut" }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mr-4 font-bold"
            >
              ♘
            </motion.span>
            ChessLeague
            <br />
            <div className="w-full mt-5 flex items-center justify-center">
              <BounceLoader size={50} color="#4FD1C5" />
            </div>
          </motion.div>
        </div>
      )}

      <section
        className={`flex flex-col items-center justify-center h-screen ${themeClasses}`}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Menu />} />
            <Route path="/playoffline" element={<PlayChess />} />
            <Route path="/construction" element={<InConstuction />} />
            <Route path="/roommenu" element={<ChessRoomMenu />} />
            <Route path="/setting" element={<ChessSettingsPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AnimatePresence>
      </section>
    </>
  );
};

const App: React.FC = () => {
  return (
    <GameThemeProvider>
      <VolumeStateProvider>
        <GameModeProvider>
          <SocketIOProvider>
            <PlayerNameProvider>
              <RoomProvider>
                <BoardStateProvider>
                  <PointsContextProvider>
                    <AppContent />
                  </PointsContextProvider>
                </BoardStateProvider>
              </RoomProvider>
            </PlayerNameProvider>
          </SocketIOProvider>
        </GameModeProvider>
      </VolumeStateProvider>
    </GameThemeProvider>
  );
};

export default App;
