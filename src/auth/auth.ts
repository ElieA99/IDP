import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isAuth = async (req: Request, res: Response) => {
  try {
    const auth = req.get("Authorization");

    if (!auth) {
      return res.status(401).json({ error: "Not Authorized" });
    }

    const token = auth.split("")[1];

    let decode;
    const jwtToken = process.env.JWT;
    decode = jwt.verify(token, jwtToken!);
  } catch (error) {
    return res.status(500).json({ error: "Error" });
  }
};
