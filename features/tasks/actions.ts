// import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CreateTaskParams } from "./types";

export async function createTask(params: CreateTaskParams) {
	// const supabase = await createSupabaseServerClient();
	console.log(params);
	// const { error, data } = await supabase.auth.updateUser({});
	// if (error) throw error;
	// return data;
}
