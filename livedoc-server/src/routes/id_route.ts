import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { DeleteDocs, DocIdController, GetDocs } from "../controllers/Id.controller";
import express from "express";

export const idRouter = express.Router();


idRouter.post("/docId",ClerkExpressRequireAuth(),DocIdController)
idRouter.get("/get-docs",ClerkExpressRequireAuth(),GetDocs)
idRouter.post("/del-docs",ClerkExpressRequireAuth(),DeleteDocs)