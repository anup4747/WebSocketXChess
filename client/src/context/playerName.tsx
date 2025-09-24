import React, { createContext, useContext, useState } from "react";
import type { PlayerNameContextType } from "../types/types";

const PlayerNameContext = createContext<PlayerNameContextType | undefined>(undefined);

export const usePlayerNameContext = () => {
  const context = useContext(PlayerNameContext);
  if (!context) {
    throw new Error("usePlayerNameContext must be used within a PlayerNameContextProvider");
  }
  return context;
};

export const PlayerNameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  return (
    <PlayerNameContext.Provider
      value={{
        player1Name,
        setPlayer1Name,
        player2Name,
        setPlayer2Name
    }}
    >
      {children}
    </PlayerNameContext.Provider>
  );
};