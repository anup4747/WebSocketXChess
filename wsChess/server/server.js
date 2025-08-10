import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const activeRooms = new Set();

const generateRoomCode = () => {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += digits[Math.floor(Math.random() * 10)];
  }
  return code;
};

function generateRoomCodeUnique() {
  let code;
  do {
    code = generateRoomCode(); // your existing random code generator
  } while (activeRooms.has(code));
  activeRooms.add(code);
  return code;
}

io.on("connection", (socket) => {
  console.log("Connected to socket");
  console.log(socket.id);

  socket.on("joinRoom", (data) => {
    const { roomCode, playerName } = data;
    socket.join(roomCode);
    socket.to(roomCode).emit("playerJoined", { socketId: socket.id, playerName });
    socket.emit("roomJoined", roomCode);
    console.log(`Socket ${socket.id} joined room ${roomCode}`);
  });

  socket.on("leaveRoom", (roomCode) => {
    socket.leave(roomCode);
    socket.to(roomCode).emit("playerLeft", socket.id);
  });

  socket.on("createRoom", () => {
    const roomCode = generateRoomCodeUnique(); // your own function for unique codes
    socket.join(roomCode);
    socket.emit("roomCreated", roomCode); // send the code back to creator
    console.log(`Room ${roomCode} created by socket ${socket.id}`);
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms]; // includes socket.id by default
    rooms.forEach((room) => {
      if (room !== socket.id) {
        // skip default room (socket's own id)
        socket.to(room).emit("playerLeft", socket.id);
        const currentRoom = io.sockets.adapter.rooms.get(room);
        if (!currentRoom || currentRoom.size === 0) {
          activeRooms.delete(room);
          console.log(`Room ${room} deleted due to empty`);
        }
      }
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
