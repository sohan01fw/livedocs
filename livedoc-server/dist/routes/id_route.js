"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idRouter = void 0;
const Id_controller_1 = require("../controllers/Id.controller");
const express_1 = __importDefault(require("express"));
exports.idRouter = express_1.default.Router();
exports.idRouter.post("/docId", Id_controller_1.DocIdController);
exports.idRouter.post("/get-docs", Id_controller_1.GetDocs);
exports.idRouter.post("/del-docs", Id_controller_1.DeleteDocs);
//# sourceMappingURL=id_route.js.map