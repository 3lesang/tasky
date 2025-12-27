import type { TablesInsert, TablesUpdate } from "@/types/supabase";

export type CreateTaskInput = Omit<
	TablesInsert<"tasks">,
	"id" | "created_at" | "user_id"
>;

export type UpdateTaskInput = Omit<
	TablesUpdate<"tasks">,
	"id" | "created_at" | "user_id"
>;
