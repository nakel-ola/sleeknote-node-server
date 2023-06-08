import { z } from "zod";

const RegisterSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string().email("Enter a vaild email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
  }),
});

type RegisterType = z.infer<typeof RegisterSchema>["body"];

const LoginSchema = z.object({
  body: z.object({
    email: z.string().email("Enter a vaild email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
  }),
});

type LoginType = z.infer<typeof LoginSchema>["body"];

const TokenResponse = z.object({
  access_token: z.string(),
});

type TokenResponse = z.infer<typeof TokenResponse>;

export { LoginSchema, LoginType, RegisterSchema, RegisterType, TokenResponse };
