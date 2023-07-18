import { LogInSchema, SignUpSchema } from "@/schemas";
import { z } from "zod";

export type LogInData = z.infer<typeof LogInSchema>;
export type SignUpData = z.infer<typeof SignUpSchema>;

export interface Todo {
  todo: string;
  isChecked: boolean;
}

export interface TodoWithId extends Todo {
  id: string;
}
