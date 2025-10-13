// context/roomContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSocketIO } from "./SocketIOContext";

interface RoomContextType  {
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
  const { socket, createRoom: createRoomEmit, joinRoom: joinRoomEmit, leaveRoom: leaveRoomEmit } = useSocketIO();
  const [generatedRoomCode, setGeneratedRoomCode] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("roomCreated", (payload: { roomCode: string }) => {
      setGeneratedRoomCode(payload.roomCode);
      console.log("Successfully created:", payload.roomCode);
    });

    socket.on("roomJoined", (payload: { roomCode: string }) => {
      setGeneratedRoomCode(payload.roomCode);
      console.log("Successfully joined:", payload.roomCode);
    });

    socket.on("leaveRoom", (code: string) => {
      setGeneratedRoomCode("");
      console.log("Room Closed:", code);
    });

    socket.on("error", (message: { message: string }) => {
      console.error("Error:", message.message);
    });

    return () => {
      socket?.off("roomCreated");
      socket?.off("roomJoined");
      socket?.off("leaveRoom");
      socket?.off("error");
    };
  }, [socket]);

  const createRoom = (playerName: string) => {
    createRoomEmit(playerName);
  };

  const joinRoom = (code: string, playerName: string) => {
    joinRoomEmit(code, playerName);
  };

  const leaveRoom = () => {
    if (generatedRoomCode) {
      leaveRoomEmit(generatedRoomCode);
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
