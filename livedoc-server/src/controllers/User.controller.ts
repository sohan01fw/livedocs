import { Request, RequestHandler, Response } from "express";
import { prisma } from "../server";
interface User {
  email: string;
  name: string;
  fullname: string;
  user_id: string;
  imageUrl: string;
  isLoggedIn: boolean;
}

interface ResponseData {
  msg: string;
  data?: any;
  errmsg?: string;
}

//handle create and update user.
export async function UserController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { data } = req.body;

    if (!data || typeof data !== "object") {
      res.status(400).json({ msg: "Invalid user data format" });
      return;
    }
    const uData: User = data;
    const findUser = await prisma.user.findUnique({
      where: {
        id: uData.user_id,
      },
    });
    if (findUser === null) {
      const createUser = await prisma.user.create({
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
    await prisma.user.update({
      where: {
        id: findUser.id,
      },
      data: {
        isLoggedIn: uData.isLoggedIn,
      },
    });

    res.status(200).json({ msg: "user already existed" });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ errmsg: error, msg: "error during user operation" });
  }
}

//handle logout
type UserLogout = {
  name: string;
  email: string;
  isLoggedIn: boolean;
};
export async function LogoutUser(req: Request, res: Response): Promise<void> {
  try {
    const { data } = req.body;

    if (!data || typeof data !== "object") {
      res.status(400).json({ msg: "Invalid user data format" });
      return;
    }
    const uData: UserLogout = data;
    const findUser = await prisma.user.findUnique({
      where: {
        email: uData.email,
      },
    });

    if (!findUser) {
      res.status(404).json({ msg: "user not found" });
      return;
    }
    const logoutUser = await prisma.user.update({
      where: {
        email: uData.email,
      },
      data: {
        isLoggedIn: uData.isLoggedIn,
      },
    });
    res.status(200).json({ msg: "successfully logout user" });
  } catch (error) {
    res.status(500).json({ errmsg: error, msg: "error during logout user" });
  }
}
