var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.tsx
var import_socket = require("socket.io");
var import_express = __toESM(require("express"));
var import_node_http = require("http");
var port = process.env.PORT || 3001;
var app = (0, import_express.default)();
var server = (0, import_node_http.createServer)(app);
var io = new import_socket.Server(server, {
  cors: {
    origin: [
      "https://localhost:3000",
      "https://simple-chat-socketio.vercel.app"
    ],
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true
  },
  allowEIO3: true
});
io.on("connection", (socket) => {
  socket.on("chat-message", (message, username) => {
    io.emit("chat-message", { message, username });
  });
});
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
