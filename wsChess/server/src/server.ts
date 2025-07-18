const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const rooms = new Map();

io.on('connection', (socket) => {
  socket.on('create_room', (roomCode) => {
    if (!rooms.has(roomCode)) {
      rooms.set(roomCode, { players: [socket.id], color: 'w' });
      socket.join(roomCode);
      socket.emit('room_joined', { roomCode, color: 'w' });
    } else {
      socket.emit('room_joined', { roomCode, color: null });
    }
  });

  socket.on('join_room', (roomCode) => {
    if (rooms.has(roomCode) && rooms.get(roomCode).players.length < 2) {
      rooms.get(roomCode).players.push(socket.id);
      socket.join(roomCode);
      socket.emit('room_joined', { roomCode, color: 'b' });
      io.to(roomCode).emit('opponent_joined');
    } else {
      socket.emit('room_joined', { roomCode, color: null });
    }
  });

  socket.on('move', ({ roomCode, move }) => {
    io.to(roomCode).emit('move', move);
  });

  socket.on('disconnect', () => {
    for (const [roomCode, room] of rooms) {
      if (room.players.includes(socket.id)) {
        rooms.delete(roomCode);
        io.to(roomCode).emit('opponent_left');
        break;
      }
    }
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});