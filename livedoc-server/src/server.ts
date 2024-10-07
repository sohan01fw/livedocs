import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path, { dirname, join } from "node:path";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(path.resolve("public/index.html"));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
app.post("/user", async (req, res) => {
  const x = await prisma.user.create({
    data: {
      email: "sohan@gmail.com",
      name: "sohan",
    },
  });
  res.send(x);
});
io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(8080, () => {
  console.log("server running at http://localhost:8080");
});
