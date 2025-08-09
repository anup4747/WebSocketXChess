// context/roomContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSocketIO } from "./SocketIOContext";

type RoomContextType = {
  generatedRoomCode: string;
  setGeneratedRoomCode: (code: string) => void;
  createRoom: (playerName: string) => void;
  joinRoom: (code: string, playerName: string) => void;
  leaveRoom: () => void;
  resetRoom: () => void;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoomContext = () => {
  const ctx = useContext(RoomContext);
  if (!ctx) throw new Error("useRoomContext must be used within RoomProvider");
  return ctx;
};

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket, sendEvent } = useSocketIO();
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("roomCreated", (code: string) => {
      console.log("Successfully created:", code);
      setGeneratedRoomCode(code);
    });

    socket.on("roomJoined", (code: string) => {
      console.log("Successfully joined:", code);
      setGeneratedRoomCode(code);
    });

    return () => {
      socket?.off("roomCreated");
      socket?.off("roomJoined");
    };
  }, [socket]);

  const createRoom = (playerName: string) => {
    sendEvent("createRoom", playerName);
  };

  const joinRoom = (code: string, playerName: string) => {
    sendEvent("joinRoom", { roomCode: code, playerName });
  };

  const leaveRoom = () => {
    if (generatedRoomCode) {
      sendEvent("leaveRoom", generatedRoomCode);
      setGeneratedRoomCode("");
    }
  };

  const resetRoom = () => {
    setGeneratedRoomCode("");
  };

  return (
    <RoomContext.Provider
      value={{
        generatedRoomCode,
        setGeneratedRoomCode,
        createRoom,
        joinRoom,
        leaveRoom,
        resetRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
