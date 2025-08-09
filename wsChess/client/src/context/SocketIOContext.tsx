// src/context/SocketIOContext.tsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type ServerToClientEvents = {
  // Define your inbound socket events here, e.g.
  updateBoard: (data: any) => void;
  playerJoined: (playerName: string) => void;
  // add more as needed
};

type ClientToServerEvents = {
  // Define your outbound socket events with payloads here, e.g.
  makeMove: (moveData: any) => void;
  joinRoom: (roomCode: string, playerName: string) => void;
  leaveRoom: () => void;
  // add more as needed
};

type SocketContextType = {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
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
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const socket = io("http://localhost:3000"); // <-- replace with your server URL
    socketRef.current = socket;
    
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Socket.IO connected:", socket.id);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket.IO disconnected");
    });

    // Room events
    socket.on("roomCreated", (code) => {
      console.log("Room created:", code);
      // e.g. update RoomContext generatedRoomCode
    });

    socket.on("roomJoined", (code) => {
      console.log("Joined room:", code);
    });

    socket.on("playerJoined", (playerName) => {
      console.log("Player joined:", playerName);
    });

    socket.on("playerLeft", (playerName) => {
      console.log("Player left:", playerName);
    });

     socket.on("error", (msg) => {
      console.warn("Server error:", msg);
    });

    // Example server event handlers: add your own here if needed
    socket.on("updateBoard", (data) => {
      console.log("Received updateBoard event", data);
      // You may want to emit a React event or context update here
    });
1
    return () => {
      socket.disconnect();
    };
  }, []);

  // Generic send event function
  const sendEvent = <K extends keyof ClientToServerEvents>(
    eventName: K,
    payload: Parameters<ClientToServerEvents[K]>[0]
  ) => {
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit(eventName, payload);
    } else {
      console.warn("Socket.IO not connected. Cannot send event:", eventName);
    }
  };

  return (
    <SocketIOContext.Provider value={{ socket: socketRef.current, isConnected, sendEvent }}>
      {children}
    </SocketIOContext.Provider>
  );
};
