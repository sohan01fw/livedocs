import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { LogoutUser, UserController } from "../controllers/User.controller";

export const userRouter = express.Router();

userRouter.post("/user", ClerkExpressRequireAuth(), UserController);
userRouter.post("/logout-user", ClerkExpressRequireAuth(),LogoutUser);
