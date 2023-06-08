import type { Request, Response } from "express";

const getAllUsers = (req: Request, res: Response) => {};
const getUser = (req: Request, res: Response) => {

  // req.headers.authorization
  res.status(200).json({ 
    id: "...",
    name: "...",
    email: "...",
    password: "...",
    createdAt: "...",
    updatedAt: "...",
  });
};

export { getAllUsers, getUser };
