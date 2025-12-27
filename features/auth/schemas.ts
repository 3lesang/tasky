import * as z from "zod";

export const loginSchema = z.object({
	email: z.email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = z
	.object({
		email: z.email("Invalid email address"),
		password: z.string().min(6, "Password must be at least 6 characters"),
		repeatPassword: z.string().min(6, "Please repeat your password"),
	})
	.refine((data) => data.password === data.repeatPassword, {
		path: ["repeatPassword"],
		message: "Passwords do not match",
	});

export const resetPasswordSchema = z.object({
	email: z.email("Invalid email"),
});

export const updatePasswordSchema = z.object({
	password: z.string().min(6, "Password must be at least 6 characters"),
});
