// src/context/SocketIOContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
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
  bothReady: (payload: { roomCode: string; players: Array<{ socketId: string; playerName: string; color: PlayerColor }> }) => void;
};

interface ClientToServerEvents  {
  makeMove: (moveData: any) => void;
  joinRoom: (payload: { roomCode: string; playerName: string }) => void;
  leaveRoom: (roomCode: string) => void;
  createRoom: (playerName?: string) => void;
};

interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  createRoom: (playerName?: string) => void;
  joinRoom: (roomCode: string, playerName: string) => void;
  leaveRoom: (roomCode: string) => void;
  sendEvent: <K extends keyof ClientToServerEvents>(
    eventName: K,
    payload: Parameters<ClientToServerEvents[K]>[0]
  ) => void;
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
  // socket state for keep changing the socket 
  const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  // trigger/capture events from client 
  useEffect(() => {
    // set your custom ip address wifi or play locally in pc by setting the .env file
    const serverUrl = (import.meta as any).env?.VITE_SERVER_URL || `${window.location.protocol}//${window.location.hostname}:3000`;
    // or use
    // const serverUrl = "http://localhost:3000/"
    const newSocket = io(serverUrl); 
    setSocket(newSocket);
    
    newSocket.on("connect", () => {
      console.log("Socket.IO connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    // socket.on("roomCreated", (payload) => {
    //   console.log("Room created:", payload.roomCode);
    // });

    newSocket.on("roomJoined", (payload) => {
      console.log("Joined room:", payload.roomCode, "as", payload.color, payload.players);
    });

    newSocket.on("playerJoined", (payload) => {
      console.log("Player joined:", payload.playerName, payload.color);
    });

    newSocket.on("playerLeft", (socketId) => {
      console.log("Player left:", socketId);
    });

    newSocket.on("error", (msg) => {
      console.warn("Server error:", msg);
    });

    newSocket.on("updateBoard", (data) => {
      console.log("Received updateBoard event", data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // create room function which emits the "createRoom" event to the server to create room 
  const createRoom = (playerName?: string) => {
    if (socket && socket.connected) {
      socket.emit("createRoom", playerName);
    }
  };

  // join room function which emits the "joinRoom" event to the server to join room 
  const joinRoom = (roomCode: string, playerName: string) => {
    if (socket && socket.connected) {
      socket.emit("joinRoom", { roomCode, playerName });
    }
  };

  // leave room function which emits the "leaveRoom" event to the server to leave room 
  const leaveRoom = (roomCode: string) => {
    if (socket && socket.connected) {
      socket.emit("leaveRoom", roomCode);
    }
  };

  // send event function which emits the event to the server to send event 
  const sendEvent = <K extends keyof ClientToServerEvents>(
    eventName: K,
    payload: Parameters<ClientToServerEvents[K]>[0]
  ) => {
    if (socket && socket.connected) {
      // Spread to satisfy emit's variadic parameter typing
      (socket.emit as any)(eventName, payload);
    } else {
      console.warn("Socket.IO not connected. Cannot send event:", eventName);
    }
  };

  return (
    <SocketIOContext.Provider value={{ socket, createRoom, joinRoom, leaveRoom, sendEvent }}>
      {children}
    </SocketIOContext.Provider>
  );
};
