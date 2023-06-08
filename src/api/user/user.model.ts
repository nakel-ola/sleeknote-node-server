import { z } from "zod";

const UserSchema = z.object({
  id: z.bigint(),
  name: z.string().max(255),
  email: z.string().email(),
  emailVerifiedAt: z.date(),
  rememberToken: z.string().max(100),
  password: z.string().min(8),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type User = z.infer<typeof UserSchema>;

export { User, UserSchema };
