"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocIdController = DocIdController;
exports.GetDocs = GetDocs;
exports.DeleteDocs = DeleteDocs;
const server_1 = require("../server");
async function DocIdController(req, res) {
    try {
        const { data } = req.body;
        if (!data || typeof data !== "object") {
            res.status(400).json({ msg: "data format not valid" });
            return;
        }
        const docData = data;
        const findUser = await server_1.prisma.user.findUnique({
            where: {
                id: docData?.user_id,
            },
        });
        if (!findUser) {
            res.status(404).json({ msg: "user doesn't existed" });
            return;
        }
        const createNewDoc = await server_1.prisma.doc.create({
            data: {
                title: docData.title,
                user: {
                    connect: {
                        id: findUser.id,
                    },
                },
            },
        });
        res.status(200).json({ msg: "successfully", data: createNewDoc });
    }
    catch (error) {
        res.status(500).json({
            error: error,
            errorMsg: "error while creating new doc",
        });
    }
}
async function GetDocs(req, res) {
    try {
        const { data } = req.body;
        if (!data || typeof data !== "object") {
            res.status(400).json({ msg: "data format not valid" });
            return;
        }
        const docData = data;
        const getDocs = await server_1.prisma.doc.findMany({
            where: {
                userId: docData.user_id,
            },
        });
        res.status(200).json({ data: getDocs, msg: "successfully retirve docs" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "failed to get docs" });
    }
}
async function DeleteDocs(req, res) {
    try {
        const { data } = req.body;
        await server_1.prisma.doc.delete({
            where: {
                id: data.docId,
            },
        });
        res.status(200).json({ data: {}, msg: "successfully remove doc" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "failed to delete docs" });
    }
}
//# sourceMappingURL=Id.controller.js.map