import { z } from 'zod';

/**
 * Zod schema for user registration.
 */
export const RegisterSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

/**
 * TypeScript type inferred from RegisterSchema.
 */
export type RegisterRequestBody = z.infer<typeof RegisterSchema>;

/**
 * Zod schema for user login.
 */
export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

/**
 * TypeScript type inferred from LoginSchema.
 */
export type LoginRequestBody = z.infer<typeof LoginSchema>;
