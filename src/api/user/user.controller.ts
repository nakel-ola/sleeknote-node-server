import type { Request, Response } from "express";

const getAllUsers = (req: Request, res: Response) => {};
const getUser = (req: Request, res: Response) => {
  res.status(200).json({ message: "" });
};

export { getAllUsers, getUser };
