import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

const getTokenString = (value: string): string => value?.split("Bearer ")[1];

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) throw new Error("Permission denied");

    const token = getTokenString(req.headers.authorization);

    if (!token) throw new Error("Permission denied");

    const decodedToken = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decodedToken) throw new Error("Permission denied");

    (req as any).user = {
      name: decodedToken.name,
      email: decodedToken.email,
    };

    next();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};

export default authMiddleware;
