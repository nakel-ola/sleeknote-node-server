import type { Request, Response } from "express";
import { db } from "../../db/entities";

const getAllUsers = (req: Request, res: Response) => {};
const getUser = async (req: Request, res: Response) => {
  try {
    const user = await db.users.findOne({
      where: {
        email: (req as any).user.email,
      },
      select: ["id", "name", "email", "updatedAt", "createdAt"],
    });

    res.status(200).json(user);
  } catch (error: any) {
    return res.status(400).json(error);
  }
};

export { getAllUsers, getUser };
