"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = UserController;
exports.LogoutUser = LogoutUser;
const server_1 = require("../server");
//handle create and update user.
async function UserController(req, res) {
    try {
        const { data } = req.body;
        if (!data || typeof data !== "object") {
            res.status(400).json({ msg: "Invalid user data format" });
            return;
        }
        const uData = data;
        const findUser = await server_1.prisma.user.findUnique({
            where: {
                id: uData.user_id,
            },
        });
        if (findUser === null) {
            const createUser = await server_1.prisma.user.create({
                data: {
                    id: uData.user_id,
                    email: uData.email,
                    fullname: uData.fullname,
                    name: uData.name,
                    imageUrl: uData.imageUrl,
                    isLoggedIn: uData.isLoggedIn,
                },
            });
            res.status(200).json({ msg: "sucessfull", data: createUser });
            return;
        }
        await server_1.prisma.user.update({
            where: {
                id: findUser.id,
            },
            data: {
                isLoggedIn: uData.isLoggedIn,
            },
        });
        res.status(200).json({ msg: "user already existed" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ errmsg: error, msg: "error during user operation" });
    }
}
async function LogoutUser(req, res) {
    try {
        const { data } = req.body;
        if (!data || typeof data !== "object") {
            res.status(400).json({ msg: "Invalid user data format" });
            return;
        }
        const uData = data;
        const findUser = await server_1.prisma.user.findUnique({
            where: {
                email: uData.email,
            },
        });
        if (!findUser) {
            res.status(404).json({ msg: "user not found" });
            return;
        }
        const logoutUser = await server_1.prisma.user.update({
            where: {
                email: uData.email,
            },
            data: {
                isLoggedIn: uData.isLoggedIn,
            },
        });
        res.status(200).json({ msg: "successfully logout user" });
    }
    catch (error) {
        res.status(500).json({ errmsg: error, msg: "error during logout user" });
    }
}
//# sourceMappingURL=User.controller.js.map