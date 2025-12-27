import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { DataTable } from "@/features/tasks/components/data-table";
import { TASK_QUERY_KEY } from "@/features/tasks/constants";
import { getTasks } from "@/features/tasks/queries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getQueryClient } from "../get-query-client";

const PAGE = 0;
const LIMIT = 10;

export default async function Page() {
	const queryClient = getQueryClient();
	const supabase = await createSupabaseServerClient();

	await queryClient.prefetchQuery({
		queryKey: [TASK_QUERY_KEY, PAGE, LIMIT],
		queryFn: () => getTasks(supabase),
	});

	return (
		<div className="space-y-4">
			<h3 className="font-bold text-2xl">Tasks</h3>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<DataTable />
			</HydrationBoundary>
		</div>
	);
}
