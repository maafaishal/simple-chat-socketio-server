import { Server } from "socket.io";
import express from "express";
import { createServer } from "node:http";

const port = process.env.PORT || 3001;

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://localhost:3000",
      "https://simple-chat-socketio.vercel.app",
    ],
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true
});

io.on("connection", (socket) => {
  socket.on("chat-message", (message: string, username: string) => {
    io.emit("chat-message", { message, username });
  });
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
