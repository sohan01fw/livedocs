import express from "express";
import { LogoutUser, UserController } from "../controllers/User.controller";

export const userRouter = express.Router();

userRouter.post("/user", UserController);
userRouter.post("/logout-user", LogoutUser);
