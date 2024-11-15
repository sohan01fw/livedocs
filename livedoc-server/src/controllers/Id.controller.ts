import { Request, Response } from "express";
import { prisma, uuid } from "../server";
interface Doc {
  userId: string;
  title: string;
  content: object;
}
export async function DocIdController(
  req: Request<{}, Doc>,
  res: Response
): Promise<void> {
  try {
    const { data } = req.body;
    if (!data || typeof data !== "object") {
      res.status(400).json({ msg: "data format not valid" });
      return;
    }
    const docData: Doc = data;
    const findUser = await prisma.user.findUnique({
      where: {
        user_id: docData?.userId,
      },
    });
    if (!findUser) {
      res.status(404).json({ msg: "user doesn't existed" });
      return;
    }
    const createNewDoc = await prisma.doc.create({
      data: {
        title: docData.title,
        user:{
          connect:{
            id:(findUser.id)
          }
        }
      },
    });
    res.status(200).json({ msg: "successfully", data: createNewDoc });
  } catch (error) {
    res.status(500).json({
      error: error,
      errorMsg: "error while creating new doc",
    });
  }
}
