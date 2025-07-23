import React, { createContext, useContext, useState } from "react";

interface PlayerNameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
}

const PlayerNameContext = createContext<PlayerNameContextType | undefined>(undefined);

export const usePlayerNameContext = () => {
  const context = useContext(PlayerNameContext);
  if (!context) {
    throw new Error("usePlayerNameContext must be used within a PlayerNameContextProvider");
  }
  return context;
};

export const PlayerNameContextProvider: React.FC<{ children: React.ReactNode }> = ({
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