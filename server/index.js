const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const app = express();

const httpServer = http.createServer(app);
const port = process.env.PORT || 5555;

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.get("/api/users", (req, res) => {
  return res.status(200).json({
    name: "tuan",
    age: 10,
  });
});

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("get-user", (data) => {
    console.log(data);
    console.log(`user ${data?.name} connected`);
  });
});

httpServer.listen(port, () => console.log("server is running on port " + port));
