import type { SupabaseClient } from "@supabase/supabase-js";
import type { ColumnFiltersState } from "@tanstack/react-table";
import type { Database } from "@/types/supabase";

interface GetTasksOptions {
	page?: number;
	pageSize?: number;
	filters?: ColumnFiltersState;
	search?: string;
}

export async function getTasks(
	supabase: SupabaseClient<Database>,
	options: GetTasksOptions = {},
) {
	const { page = 0, pageSize = 10, filters, search } = options;
	const from = page * pageSize;
	const to = from + pageSize - 1;

	let query = supabase
		.from("tasks")
		.select("*", { count: "exact" })
		.order("created_at", { ascending: false })
		.range(from, to);

	if (filters) {
		for (const filter of filters) {
			if (filter.id) {
				query = query.in(filter.id, filter?.value as string[]);
			}
		}
	}

	if (search) {
		query = query.like("title", `%${search}%`);
	}

	const { data, count, error } = await query;

	if (error) throw error;

	return {
		data,
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
