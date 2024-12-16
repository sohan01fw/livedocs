import { Request, Response } from "express";
import { prisma, uuid } from "../server";
interface Doc {
  userId: string;
  title: string;
  content: object;
}
export async function DocIdController(
  req: Request<{}, Doc>,
  res: Response,
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
        id: docData?.userId,
      },
    });
    if (!findUser) {
      res.status(404).json({ msg: "user doesn't existed" });
      return;
    }
    const createNewDoc = await prisma.doc.create({
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
  } catch (error) {
    res.status(500).json({
      error: error,
      errorMsg: "error while creating new doc",
    });
  }
}

export async function GetDocs(req: Request, res: Response) {
  try {
    const getDocs = await prisma.doc.findMany();
    res.status(200).json({ data: getDocs, msg: "successfully retirve docs" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed to get docs" });
  }
}

export async function DeleteDocs(req: Request, res: Response) {
  try {
    const { data } = req.body;
    await prisma.doc.delete({
      where: {
        id: data.docId,
      },
    });
    res.status(200).json({ data: {}, msg: "successfully remove doc" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "failed to delete docs" });
  }
}
