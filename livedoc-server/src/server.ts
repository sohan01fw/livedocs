import express, { Request, RequestHandler, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { idRouter } from "../src/routes/id_route";
import { userRouter } from "../src/routes/user_route";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
export const uuid = uuidv4();

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
  },
});
/* app.use(cors({
  origin:["http://localhost:3000", "http://localhost:5173"]

})); */

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend origin
    credentials: true, // Allow cookies
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(userRouter);
app.use(idRouter);

//@ts-ignore
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      const err = new Error("not authorized!");
      next(err);
    }
    next();
  } catch (error) {
    next(new Error("Authentication error: " + error.message));
  }
});
//Defining socket server

 io.on("connection", (socket) => {
  socket.on("db-data",(data)=>{
    
  })
  /* socket.on("msg",(delta)=>{
    socket.broadcast.emit("receive-msg",delta);
  })
  socket.on("roomId", (id) => {
    socket.join(id);
    console.log(`Client joined room: ${id}`);
  });

  socket.on("msg", (msg) => {
    const { text, roomId } = msg;

    io.to(roomId).emit("msg", text);
  }); */
}); 

server.listen(8080, () => {
  console.log("server running at http://localhost:8080");
});