import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

interface GetTasksOptions {
	page?: number;
	pageSize?: number;
}

export async function getTasks(
	supabase: SupabaseClient<Database>,
	options: GetTasksOptions = {},
) {
	const { page = 0, pageSize = 10 } = options;
	const from = page * pageSize;
	const to = from + pageSize - 1;

	const { data, count, error } = await supabase
		.from("tasks")
		.select("*", { count: "exact" })
		.order("created_at", { ascending: false })
		.range(from, to);

	if (error) throw error;

	return {
		data: data,
		total: count,
		page,
		pageSize,
	};
}

export async function getTask(
	supabase: SupabaseClient<Database>,
	taskID: string,
) {
	const { data, error } = await supabase
		.from("tasks")
		.select("*", { count: "exact" })
		.eq("id", taskID)
		.single();

	if (error) throw error;

	return data;
}
