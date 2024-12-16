import {
  DeleteDocs,
  DocIdController,
  GetDocs,
} from "../controllers/Id.controller";
import express from "express";

export const idRouter = express.Router();

idRouter.post("/docId", DocIdController);
idRouter.post("/get-docs", GetDocs);
idRouter.post("/del-docs", DeleteDocs);
