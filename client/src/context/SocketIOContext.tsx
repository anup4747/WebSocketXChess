// src/context/SocketIOContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type PlayerColor = "white" | "black";

interface RoomCreatedPayload {
  roomCode: string;
}

interface RoomJoinedPayload {
  roomCode: string;
  color: PlayerColor;
  players: Array<{ socketId: string; playerName: string; color: PlayerColor }>;
}

interface PlayerJoinedPayload {
  socketId: string;
  playerName: string;
  color: PlayerColor;
}

interface RoomErrorPayload {
  code: "ROOM_NOT_FOUND" | "ROOM_FULL" | "INVALID_REQUEST";
  message: string;
}

interface ServerToClientEvents  {
  updateBoard: (data: any) => void;
  playerJoined: (payload: PlayerJoinedPayload) => void;
  roomCreated: (payload: RoomCreatedPayload) => void;
  roomJoined: (payload: RoomJoinedPayload) => void;
  playerLeft: (socketId: string) => void;
  error: (payload: RoomErrorPayload) => void;
};

interface ClientToServerEvents  {
  makeMove: (moveData: any) => void;
  joinRoom: (payload: { roomCode: string; playerName: string }) => void;
  leaveRoom: (roomCode: string) => void;
  createRoom: (playerName?: string) => void;
};

interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
  createRoom: (playerName?: string) => void;
  joinRoom: (roomCode: string, playerName: string) => void;
  leaveRoom: (roomCode: string) => void;
};

const SocketIOContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketIO = () => {
  const context = useContext(SocketIOContext);
  if (!context) {
    throw new Error("useSocketIO must be used within a SocketIOProvider");
  }
  return context;
};

export const SocketIOProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3000"); 
    socketRef.current = socket;
    
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket.IO connected:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket.IO disconnected");
    });

    socket.on("roomCreated", (payload) => {
      console.log("Room created:", payload.roomCode);
    });

    socket.on("roomJoined", (payload) => {
      console.log("Joined room:", payload.roomCode, "as", payload.color, payload.players);
    });

    socket.on("playerJoined", (payload) => {
      console.log("Player joined:", payload.playerName, payload.color);
    });

    socket.on("playerLeft", (socketId) => {
      console.log("Player left:", socketId);
    });

    socket.on("error", (msg) => {
      console.warn("Server error:", msg);
    });

    socket.on("updateBoard", (data) => {
      console.log("Received updateBoard event", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createRoom = (playerName?: string) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("createRoom", playerName);
    }
  };

  const joinRoom = (roomCode: string, playerName: string) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("joinRoom", { roomCode, playerName });
    }
  };

  const leaveRoom = (roomCode: string) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("leaveRoom", roomCode);
    }
  };

  return (
    <SocketIOContext.Provider value={{ socket: socketRef.current, isConnected, createRoom, joinRoom, leaveRoom }}>
      {children}
    </SocketIOContext.Provider>
  );
};
