import { z } from "zod";

export const taskSchema = z.object({
	id: z.string(),
	status: z.string(),
	title: z.string(),
	description: z.string(),
});

export const createTaskSchema = z.object({
	title: z.string(),
	description: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
