"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { TaskStatus } from "./schemas";
import type { CreateTaskInput, UpdateTaskInput } from "./types";

async function getAuthenticatedClient() {
	const supabase = await createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		throw new Error(
			"User not authenticated. Cannot perform this action with RLS.",
		);
	}

	return { supabase, user };
}

export async function createTask(params: CreateTaskInput) {
	const { supabase, user } = await getAuthenticatedClient();

	const { data, error } = await supabase
		.from("tasks")
		.insert({ ...params, user_id: user.id })
		.select()
		.single();

	if (error) throw error;
	return data;
}

export async function updateTask({
	taskID,
	params,
}: {
	taskID: string;
	params: UpdateTaskInput;
}) {
	const { supabase } = await getAuthenticatedClient();

	const { data, error } = await supabase
		.from("tasks")
		.update(params)
		.select()
		.eq("id", taskID)
		.single();

	if (error) throw error;
	return data;
}

export async function deleteTask(taskID: string) {
	const { supabase } = await getAuthenticatedClient();

	const { data, error } = await supabase
		.from("tasks")
		.delete()
		.eq("id", taskID)
		.single();

	if (error) throw error;
	return data;
}

export async function bulkDeleteTask(taskIDs: string[]) {
	if (taskIDs.length === 0) return [];

	const { supabase } = await getAuthenticatedClient();

	const { data, error } = await supabase
		.from("tasks")
		.delete()
		.in("id", taskIDs);

	if (error) throw error;
	return data;
}

export async function bulkUpdateTaskStatus(
	taskIDs: string[],
	status: TaskStatus,
) {
	if (taskIDs.length === 0) return [];

	const { supabase } = await getAuthenticatedClient();

	const { data, error } = await supabase
		.from("tasks")
		.update({ status })
		.in("id", taskIDs)
		.select();

	if (error) throw error;
	return data;
}
