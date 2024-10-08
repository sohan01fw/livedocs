import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin:["http://localhost:3000","http://localhost:5173"]
  }
});



 io.on("connection", (socket) => {
  socket.on('msg',(msg)=>{
    io.emit('msg',msg);
  })

}) 


server.listen(8080, () => {
  console.log("server running at http://localhost:8080");
});
