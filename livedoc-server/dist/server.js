"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.uuid = void 0;
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const client_1 = require("@prisma/client");
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const id_route_1 = require("./routes/id_route");
const user_route_1 = require("./routes/user_route");
exports.uuid = (0, uuid_1.v4)();
exports.prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://192.168.100.61:5173"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    },
});
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://192.168.100.61:5173"], // Replace with your frontend origin
    credentials: true, // Allow cookies
    allowedHeaders: ["Authorization", "Content-Type"],
}));
app.use(user_route_1.userRouter);
app.use(id_route_1.idRouter);
app.get("/", (req, res) => {
    res.send("welcome to livedoc server");
});
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
    }
    catch (error) {
        next(new Error("Authentication error: " + error.message));
    }
});
const findDoc = async (docId) => {
    try {
        const doc = await exports.prisma.doc.findUnique({
            where: {
                id: docId,
            },
        });
        return doc;
    }
    catch (error) {
        return error;
    }
};
io.on("connection", (socket) => {
    socket.on("get-doc", async (data) => {
        const getDoc = await findDoc(data.docId);
        if (!getDoc) {
            socket.broadcast.emit("error", "doc not found!");
        }
        socket.join(data.userId);
        //console.log(`Client joined room: ${data.userId}`);
        socket.emit("load-data", getDoc);
        socket.on("doc-text", (delta) => {
            socket.broadcast.emit("receive-text", delta);
        });
        socket.on("save-doc", async (data) => {
            try {
                const updateDoc = await exports.prisma.doc.update({
                    where: {
                        id: data.docId,
                    },
                    data: {
                        content: [
                            {
                                data: data.content,
                                timestamp: data.timestamp,
                                clientVersion: data.clientVersion,
                            },
                        ],
                    },
                });
            }
            catch (error) {
                console.log(error);
                socket.emit(error);
            }
        });
    });
});
server.listen(8080, () => {
    console.log("server running at http://localhost:8080");
});
//# sourceMappingURL=server.js.map