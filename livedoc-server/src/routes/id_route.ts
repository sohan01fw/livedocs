import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { DocIdController } from "../controllers/Id.controller";
import express from "express";

export const idRouter = express.Router();


idRouter.get("/docId",ClerkExpressRequireAuth(),DocIdController)