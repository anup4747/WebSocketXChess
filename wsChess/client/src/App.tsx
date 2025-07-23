import "./App.css";
import Menu from "./pages/menu";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayOffline from "./pages/offline";
import InConstuction from "./pages/inConstruction";
import PageNotFound from "./pages/pageNotFound";
import ChessRoomMenu from "./pages/roomMenu";
import { GameThemeProvider, useGameThemeContext } from "./context/themeContext";
import { RoomProvider } from "./context/roomContext";
import { PlayerNameProvider } from "./context/playerName";

const AppContent: React.FC = () => {

  const {themeClasses} = useGameThemeContext();

  return (
    <section className={`flex flex-col items-center justify-center ${themeClasses}`} >
      <Routes>
        <Route path="/" element={<Menu/> } />
        <Route path="/playoffline" element={<PlayOffline />} />
        <Route path="/construction" element={<InConstuction />} />
        <Route path="/roommenu" element={<ChessRoomMenu />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </section>
  );
};

const App: React.FC = () => {
  return(
    <PlayerNameProvider>
      <GameThemeProvider>
        <RoomProvider>
          <AppContent/>
        </RoomProvider>
      </GameThemeProvider>
    </PlayerNameProvider>
  )
}


export default App;
