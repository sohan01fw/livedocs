import { Request, Response } from "express";
import { uuid } from "../server";

export async function DocIdController(req:Request,res:Response) {
    try {
    res.json({ docId: uuid, msg: "successfully send Id" });
  } catch (error) {
    res.status(401).json({
      error: error,
      errorMsg: "unathorize user access. user need to login",
    });
  }

    
}