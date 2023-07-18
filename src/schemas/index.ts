import { z } from "zod";

// TODO: improve defaults errors messages
export const LogInSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(24),
  })
  .required();

// TODO: improve defaults errors messages
export const SignUpSchema = z.object({
  firstName: z.string().min(2).max(32),
  lastName: z.string().min(2).max(32),
  email: z.string().email(),
  password: z.string().min(8).max(24),
});
