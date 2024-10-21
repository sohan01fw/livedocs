import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
const id = uuidv4();

const prisma = new PrismaClient();
const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"],
  },
});
app.use(cors());

//Defining normal server api
app.get("/docId", ClerkExpressRequireAuth(), (req: Request, res: Response) => {
  try {
    res.json({ docId: id, msg: "successfully send Id" });
  } catch (error) {
    res.status(401).json({
      error: error,
      errorMsg: "unathorize user access. user need to login",
    });
  }
});
//@ts-ignore
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});
//@ts-ignore
/* app.get('/users',ClerkExpressRequireAuth(), async (req, res) => {
   res.send("ok")
}); */
io.use(async (socket, next) => {
  try {
    
  const token = socket.handshake.auth.token;
 if (!token) {
    const err = new Error("not authorized!");
    next(err);
  }
  next()
  } catch (error) {
next(new Error("Authentication error: "+ error.message))    
  }
  
});
//Defining socket server
io.on("connection", (socket) => {
  socket.on("roomId", (id) => {
    socket.join(id);
    console.log(`Client joined room: ${id}`);
  });

  socket.on("msg", (msg) => {
    const { text, roomId } = msg;

    io.to(roomId).emit("msg", text);
  });
});

server.listen(8080, () => {
  console.log("server running at http://localhost:8080");
});
