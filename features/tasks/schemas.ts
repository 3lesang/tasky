import { z } from "zod";
import type { Database } from "@/types/supabase";

export const TaskStatusEnum = z.enum(["todo", "in-progress", "done"]);

export const createTaskSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string(),
	status: TaskStatusEnum,
});

export type TaskRow = Database["public"]["Tables"]["tasks"]["Row"];
export type TaskStatus = Database["public"]["Enums"]["task_status"];
