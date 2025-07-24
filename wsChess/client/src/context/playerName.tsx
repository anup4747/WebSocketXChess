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
  const [playerName, setPlayerName] = useState("");

  return (
    <PlayerNameContext.Provider
      value={{
        playerName,
        setPlayerName
    }}
    >
      {children}
    </PlayerNameContext.Provider>
  );
};