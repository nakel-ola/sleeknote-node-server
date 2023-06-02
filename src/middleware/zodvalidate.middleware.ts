import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const zodvalidate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parse = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parse.body;
      req.query = parse.query;
      req.params = parse.params;
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };

export default zodvalidate;
