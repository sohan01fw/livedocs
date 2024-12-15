import express, { Request, RequestHandler, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { idRouter } from "../src/routes/id_route";
import { userRouter } from "../src/routes/user_route";
export const uuid = uuidv4();

export const prisma = new PrismaClient();
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
  }),
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
interface docDataDb {
  docId: string;
  content: object;
}
interface fetchData {
  docId: string;
}
interface getData {
  docId: string;
  userId: string;
}
const findDoc = async (docId: string) => {
  try {
    const doc = await prisma.doc.findUnique({
      where: {
        id: docId,
      },
    });
    return doc;
  } catch (error) {
    return error;
  }
};

io.on("connection", (socket) => {
  socket.on("get-doc", async (data: getData) => {
    const getDoc = await findDoc(data.docId);
    if (!getDoc) {
      socket.broadcast.emit("error", "doc not found!");
    }
    socket.join(data.userId);

    //console.log(`Client joined room: ${data.userId}`);

    socket.emit("load-data", getDoc.content);

    socket.on("doc-text", (delta) => {
      socket.broadcast.emit("receive-text", delta);
    });

    socket.on("save-doc", async (data: docDataDb) => {
      try {
        const updateDoc = await prisma.doc.update({
          where: {
            id: data.docId,
          },
          data: {
            content: data.content,
          },
        });
      } catch (error) {
        console.log(error);
        socket.emit(error);
      }
    });
  });
});

server.listen(8080, () => {
  console.log("server running at http://localhost:8080");
});
