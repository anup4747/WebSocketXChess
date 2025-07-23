import React, { createContext, useContext, useState } from "react";

interface RoomContextType {
  generateRoomCode: () => string;
  generatedRoomCode: string;
  setGeneratedRoomCode: (code: string) => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomContextProvider");
  }
  return context;
};

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [generatedRoomCode, setGeneratedRoomCode] = useState<string>("");
  
  const generateRoomCode = () => {
    const digits = "0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += digits[Math.floor(Math.random() * 10)];
    }
    setGeneratedRoomCode(code);
    return code
  };

  return(
    <RoomContext.Provider
    value={{
      generateRoomCode,
      generatedRoomCode,
      setGeneratedRoomCode          
    }}
    >
      {children}
    </RoomContext.Provider>
    );
};