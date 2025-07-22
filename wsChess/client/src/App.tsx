import "./App.css";
import Menu from "./pages/menu";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayOffline from "./pages/offline";
import InConstuction from "./pages/inConstruction";
import PageNotFound from "./pages/pageNotFound";
import ChessRoomMenu from "./pages/roomMenu";
import { GameThemeProvider, useGameThemeContext } from "./context/themeContext";

const AppContent: React.FC = () => {

  const {isDark, themeClasses, buttonClasses, inputClasses, cardClasses, primaryButtonClasses, toggleTheme} = useGameThemeContext();

  const [generatedRoomCode, setGeneratedRoomCode] = React.useState("");
  const [playerName, setPlayerName] = React.useState("");

  const generateRoomCode = () => {
    const digits = "0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += digits[Math.floor(Math.random() * 10)];
    }
    setGeneratedRoomCode(code);
    return code
  };

  return (
    <section className={`flex flex-col items-center justify-center ${themeClasses}`} >
      {/* // bg-[#1c1c1c] */}
      <Routes>
        <Route path="/" element={<Menu/> } />
        <Route path="/playoffline" element={<PlayOffline />} />
        <Route path="/construction" element={<InConstuction />} />
        <Route path="/roommenu" element={<ChessRoomMenu generateRoomCode={generateRoomCode} generatedRoomCode={generatedRoomCode} setGeneratedRoomCode={setGeneratedRoomCode} playerName={playerName} setPlayerName={setPlayerName} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </section>
  );
};

const App: React.FC = () => {
  return(
    <GameThemeProvider>
      <AppContent/>
    </GameThemeProvider>
  )
}


export default App;
