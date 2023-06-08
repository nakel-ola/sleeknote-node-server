import * as argon from "argon2";
import type { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { MsgType } from "../../../typing.d";
import { db } from "../../db/entities";
import { LoginType, RegisterType, TokenResponse } from "./auth.model";

const register = async (
  req: Request<{}, {}, RegisterType>,
  res: Response<TokenResponse | MsgType>
) => {
  try {
    const { email, password, name } = req.body;

    const user = await db.users.findOneBy({ email });

    if (user) return res.json({ message: `Something went worng!` });

    const hash = await argon.hash(password);

    const createdUser = db.users.create({
      email,
      name,
      password: hash,
    });

    const savedUser = await createdUser.save();

    const token = signToken(savedUser.id.toString(), savedUser.email);

    return res.json({ access_token: token });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const login = async (
  req: Request<{}, {}, LoginType>,
  res: Response<TokenResponse | MsgType>
) => {
  try {
    const { email, password } = req.body;

    const user = await db.users.findOneBy({ email });

    if (!user) return res.json({ message: `User with ${email} not found` });

    const pwMatches = await argon.verify(user.password, password);

    if (!pwMatches) return res.json({ message: "Something want wrong" });

    const token = signToken(user.id, user.email);

    return res.json({ access_token: token });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

const logout = (req: Request, res: Response) => {
  console.log(req.body);
  res.json({ message: "Logout here" });
};

const signToken = (userId: string | number, email: string, expires?: string) => {
  const payload = {
    sub: userId,
    email,
  };

  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  const token = sign(payload, secret, { expiresIn });

  return token;
};

export { login, logout, register };
