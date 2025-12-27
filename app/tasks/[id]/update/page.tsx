import { getQueryClient } from "@/app/get-query-client";
import { BackButton } from "@/components/back-button";
import { UpdateForm } from "@/features/tasks/components/update-form";
import { TASK_QUERY_KEY } from "@/features/tasks/constants";
import { getTask } from "@/features/tasks/queries";
import type { TaskRow } from "@/features/tasks/schemas";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const queryClient = getQueryClient();
	
	const supabase = await createSupabaseServerClient();

	await queryClient.prefetchQuery({
		queryKey: [TASK_QUERY_KEY, id],
		queryFn: () => getTask(supabase, id),
	});

	const task = queryClient.getQueryData<TaskRow>([TASK_QUERY_KEY, id]);

	return (
		<div className="space-y-4 max-w-3xl mx-auto">
			<div className="flex gap-2">
				<BackButton />
				<h3 className="font-bold text-2xl">{task?.id}</h3>
			</div>
			<UpdateForm />
		</div>
	);
}
