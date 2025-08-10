import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [musicLevel, setMusicLevel] = useState(() => {
    const savedMusicLevel = localStorage.getItem("musicLevel");
    return savedMusicLevel !== null ? Number(savedMusicLevel) : 40;
  });
  const [soundLevel, setSoundLevel] = useState(() => {
    const savedSoundLevel = localStorage.getItem("soundLevel");
    return savedSoundLevel !== null ? Number(savedSoundLevel) : 50;
  });

  useEffect(() => {
    localStorage.setItem("musicLevel", musicLevel.toString());
  }, [musicLevel]);

  useEffect(() => {
    localStorage.setItem("soundLevel", soundLevel.toString());
  }, [soundLevel]);
  return (
    <VolumeStateContext.Provider
      value={{
        musicLevel,
        soundLevel,
        setMusicLevel,
        setSoundLevel,
      }}
    >
      {children}
    </VolumeStateContext.Provider>
  );
};
