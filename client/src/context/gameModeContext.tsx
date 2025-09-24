import React, { createContext, useContext, useState } from "react";
import type { GameModeContextType, GameMode } from "../types/types";

const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

export const useGameModeContext = () => {
  const context = useContext(GameModeContext);
  if (!context) {
    throw new Error("useGameModeContext must be used within a GameModeProvider");
  }
  return context;
};

export const GameModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameMode, setGameMode] = useState<GameMode>("");

  return (
    <GameModeContext.Provider value={{ gameMode, setGameMode }}>
      {children}
    </GameModeContext.Provider>
  );
};