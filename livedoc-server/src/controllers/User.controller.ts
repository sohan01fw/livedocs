import { Request, Response } from "express";

export async function UserController(req: Request, res: Response) {
  try {
    const {data} = req.body;
    console.log(data);
    res.json({msg:"sucessfull"})
    
  } catch (error) {
    res.status(500).json({ errmsg: error,msg:"hey" });
  }
}
