import React, { createContext, useContext, useState } from "react";
import type { VolumeStateContextType } from "../types/types";

const VolumeStateContext = createContext<VolumeStateContextType | undefined>(
  undefined
);

export const useVolumeStateContext = () => {
  const context = useContext(VolumeStateContext);
  if (!context) {
    throw new Error(
      "useVolumeStateContext must be used within a VolumeStateProvider"
    );
  }
  return context;
};

export const VolumeStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

    const [musicLevel, setMusicLevel] = useState(50);
    const [soundLevel, setSoundLevel] = useState(65);

  return (
    <VolumeStateContext.Provider
      value={{
        musicLevel,
        soundLevel,
        setMusicLevel,
        setSoundLevel
      }}
    >
      {children}
    </VolumeStateContext.Provider>
  );
};
