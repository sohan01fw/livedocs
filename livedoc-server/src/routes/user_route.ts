import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { UserController } from "../controllers/User.controller";

export const userRouter = express.Router();


userRouter.post("/user",ClerkExpressRequireAuth(),UserController)
