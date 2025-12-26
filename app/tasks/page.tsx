import { columns } from "@/features/tasks/components/columns";
import { DataTable } from "@/features/tasks/components/data-table";
import { getTasks } from "@/features/tasks/queries";

export default async function Page() {
	const data = await getTasks();
	return (
		<div className="space-y-4">
			<h3 className="font-bold text-2xl">Tasks</h3>
			<DataTable columns={columns} data={data} />
		</div>
	);
}
