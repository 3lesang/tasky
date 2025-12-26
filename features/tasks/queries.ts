import type { Task } from "./schemas";

export async function getTasks(): Promise<Task[]> {
	return [
		{
			id: "728ed52f",
			status: "pending",
			title: "",
			description: "",
		},
	];
}
