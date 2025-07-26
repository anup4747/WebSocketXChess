import express from "express"
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

io.on("connection", (socket) => {
  console.log("Connected to socket")
  console.log(socket.id);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
