import type { Request, Response } from "express";
import { LoginType, RegisterType } from "./auth.model";

const login = (req: Request<{}, LoginType>, res: Response) => {
  console.log(req.body);

  res.json({ message: "Login here" });
};

const register = (req: Request<{}, RegisterType>, res: Response) => {
  console.log(req.body);
  res.json({ message: "Register here" });
};

const logout = (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "Logout here" });
};

export { login, logout, register };
