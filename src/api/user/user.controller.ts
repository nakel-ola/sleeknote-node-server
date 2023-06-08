import type { Request, Response } from "express";
import { db } from "../../db/entities";

const getAllUsers = (req: Request, res: Response) => {};


/**
 * This function retrieves a user's information from a database based on their email and returns it as
 * a JSON response.
 * @param {Request} req - Request object, which contains information about the incoming HTTP request
 * such as headers, query parameters, and request body.
 * @param {Response} res - The `res` parameter is an object representing the HTTP response that will be
 * sent back to the client. It contains methods and properties that allow the server to send data,
 * headers, and status codes back to the client. In this specific code snippet, the `res` object is
 * used to send a
 * @returns This code defines an asynchronous function called `getUser` that takes in a `Request` and
 * `Response` object as parameters. The function tries to find a user in the database based on the
 * email address stored in the `req` object. If successful, it returns the user object with a status
 * code of 200. If there is an error, it returns the error object with a status code of
 */
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
