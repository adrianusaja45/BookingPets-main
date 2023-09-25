require("dotenv").config();

const express = require("express");
const app = express();
const routers = require("./routers");
const PORT = process.env.PORT;
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routers);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("send_message", (message) => console.log(message));
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server berjalan di port ${process.env.PORT || 3000}`);
});

module.exports = io;
