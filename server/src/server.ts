import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import {
  JoinRoomPayload,
  PlayerColor,
  PlayerJoinedPayload,
  RoomCreatedPayload,
  RoomErrorPayload,
  RoomJoinedPayload,
} from "./types";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const io = new Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGIN,
  },
});

type PlayerInfo = { socketId: string; playerName: string; color: PlayerColor };
const rooms: Map<string, PlayerInfo[]> = new Map();

const generateRoomCode = (): string => {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += digits[Math.floor(Math.random() * 10)];
  }
  return code;
};

function generateRoomCodeUnique(): string {
  let code: string;
  do {
    code = generateRoomCode();
  } while (rooms.has(code));
  rooms.set(code, []);
  return code;
}

io.on("connection", (socket: Socket) => {
  console.log("Connected to socket");
  console.log(socket.id);

  socket.on("joinRoom", (data: JoinRoomPayload) => {
    const { roomCode, playerName } = data;
    const roomPlayers = rooms.get(roomCode);

    if (!roomPlayers) {
      const err: RoomErrorPayload = { code: "ROOM_NOT_FOUND", message: "Room does not exist" };
      socket.emit("error", err);
      return;
    }

    if (roomPlayers.length >= 2) {
      const err: RoomErrorPayload = { code: "ROOM_FULL", message: "Room is full" };
      socket.emit("error", err);
      return;
    }

    // Determine color assignment
    const assignedColor: PlayerColor = roomPlayers.length === 0 ? "white" : "black";
    const player: PlayerInfo = { socketId: socket.id, playerName, color: assignedColor };
    roomPlayers.push(player);

    socket.join(roomCode);

    const joinedPayload: RoomJoinedPayload = {
      roomCode,
      color: assignedColor,
      players: roomPlayers.map((p) => ({ socketId: p.socketId, playerName: p.playerName, color: p.color })),
    };
    socket.emit("roomJoined", joinedPayload);

    const joinedBroadcast: PlayerJoinedPayload = {
      socketId: socket.id,
      playerName,
      color: assignedColor,
    };
    socket.to(roomCode).emit("playerJoined", joinedBroadcast);

    // If room now has 2 players, notify both clients they're ready to start
    if (roomPlayers.length === 2) {
      io.to(roomCode).emit("bothReady", {
        roomCode,
        players: roomPlayers.map((p) => ({ socketId: p.socketId, playerName: p.playerName, color: p.color })),
      });
    }

    console.log(`Socket ${socket.id} joined room ${roomCode} as ${assignedColor}`);
  });

  socket.on("leaveRoom", (roomCode: string) => {
    const roomPlayers = rooms.get(roomCode);
    if (roomPlayers) {
      const idx = roomPlayers.findIndex((p) => p.socketId === socket.id);
      if (idx !== -1) {
        roomPlayers.splice(idx, 1);
      }
      if (roomPlayers.length === 0) {
        rooms.delete(roomCode);
        console.log(`Room ${roomCode} deleted due to empty`);
      }
    }
    socket.leave(roomCode);
    socket.to(roomCode).emit("playerLeft", socket.id);
  });

  socket.on("createRoom", (playerName?: string) => {
    const roomCode = generateRoomCodeUnique();
    const player: PlayerInfo = { socketId: socket.id, playerName: playerName || "Player", color: "white" };
    rooms.get(roomCode)!.push(player);
    socket.join(roomCode);
    const payload: RoomCreatedPayload = { roomCode };
    socket.emit("roomCreated", payload);
    const joinedPayload: RoomJoinedPayload = {
      roomCode,
      color: "white",
      players: [{ socketId: player.socketId, playerName: player.playerName, color: "white" }],
    };
    socket.emit("roomJoined", joinedPayload);
    // Do not auto-navigate creator; wait for bothReady on the client
    console.log(`Room ${roomCode} created by player ${player.playerName} socket ${socket.id}`);
  });

  socket.on("disconnect", () => {
    // For each room the socket is in, update our rooms map
    for (const [roomCode, players] of rooms.entries()) {
      const idx = players.findIndex((p) => p.socketId === socket.id);
      if (idx !== -1) {
        players.splice(idx, 1);
        socket.to(roomCode).emit("playerLeft", socket.id);
        if (players.length === 0) {
          rooms.delete(roomCode);
          console.log(`Room ${roomCode} deleted due to empty`);
        }
      }
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


