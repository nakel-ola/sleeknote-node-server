import * as argon from "argon2";
import type { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { MsgType } from "../../../typing.d";
import { db } from "../../db/entities";
import { LoginType, RegisterType, TokenResponse } from "./auth.model";

/**
 * This is a function that registers a new user by hashing their password, creating a token,
 * and saving their information to a database.
 * @param req - The request object containing information about the incoming HTTP request, including
 * the request body, headers, and query parameters.
 * @param res - The `res` parameter is an object representing the HTTP response that will be sent back
 * to the client. It contains methods and properties that allow you to set the response status,
 * headers, and body. In this specific function, the response can either be a JSON object containing an
 * access token or a message
 * @returns a JSON response with an access_token property if the user is successfully registered, or a
 * JSON response with a message property if something went wrong during the registration process.
 */
const register = async (
  req: Request<{}, {}, RegisterType>,
  res: Response<TokenResponse | MsgType>
) => {
  try {
    const { email, password, name } = req.body;

    const user = await db.users.findOneBy({ email });

    if (user) return res.json({ message: `Something went worng!` });

    const hash = await argon.hash(password);

    const token = signToken(name, email);

    const createdUser = await db.users
      .create({
        rememberToken: token,
        email,
        name,
        password: hash,
      })
      .save();

    return res.json({ access_token: token });
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * This is a function that handles user login, verifies their credentials, generates a
 * token, and updates the user's remember token in the database.
 * @param req - The `req` parameter is an object of type `Request` from the Express.js library. It
 * represents the HTTP request that was sent to the server and contains information such as the request
 * headers, query parameters, and request body.
 * @param res - The `res` parameter is the response object that will be sent back to the client with
 * the result of the login function. It can either contain a token response or a message response
 * depending on the outcome of the function.
 * @returns a JSON response with either an access token or a message indicating that the user was not
 * found or that something went wrong during the login process.
 */
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

    const token = signToken(user.name, user.email);

    const updatedUser = await db.users.update(
      {
        id: user.id,
      },
      {
        rememberToken: token,
      }
    );

    if (updatedUser.affected === 0) throw new Error("Something went wrong");

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

/**
 * This is a function that signs a JSON Web Token (JWT) with a given name, email, and
 * optional expiration date.
 * @param {string} name - A string representing the name of the user for whom the token is being
 * generated.
 * @param {string} email - The email parameter is a string that represents the email address of the
 * user for whom the token is being generated.
 * @param {string} [expires] - The `expires` parameter is an optional string that specifies the
 * expiration time of the JWT token. If provided, it sets the time after which the token will no longer
 * be valid. If not provided, the token will not have an expiration time and will be valid until
 * manually revoked or deleted.
 * @returns a JSON Web Token (JWT) that contains the name and email of the user, signed with a secret
 * key and with an optional expiration time.
 */
const signToken = (name: string, email: string, expires?: string) => {
  const payload = {
    name,
    email,
  };

  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  const token = sign(payload, secret, { expiresIn });

  return token;
};

export { login, logout, register };
