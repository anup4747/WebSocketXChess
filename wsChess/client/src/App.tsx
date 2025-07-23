import "./App.css";
import Menu from "./pages/menu";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayOffline from "./pages/offline";
import InConstuction from "./pages/inConstruction";
import PageNotFound from "./pages/pageNotFound";
import ChessRoomMenu from "./pages/roomMenu";
import { GameThemeProvider, useGameThemeContext } from "./context/themeContext";
import { RoomContextProvider, useRoomContext } from "./context/roomContext";

const AppContent: React.FC = () => {

  const {themeClasses} = useGameThemeContext();

  const {generatedRoomCode, setGeneratedRoomCode} = useRoomContext();
  const [playerName, setPlayerName] = React.useState("");


  return (
    <section className={`flex flex-col items-center justify-center ${themeClasses}`} >
      {/* // bg-[#1c1c1c] */}
      <Routes>
        <Route path="/" element={<Menu/> } />
        <Route path="/playoffline" element={<PlayOffline />} />
        <Route path="/construction" element={<InConstuction />} />
        <Route path="/roommenu" element={<ChessRoomMenu playerName={playerName} setPlayerName={setPlayerName} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </section>
  );
};

const App: React.FC = () => {
  return(
    <GameThemeProvider>
      <RoomContextProvider>
        <AppContent/>
      </RoomContextProvider>
    </GameThemeProvider>
  )
}


export default App;
