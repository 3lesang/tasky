import { columns, type Task } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Task[]> {
	return [
		{
			id: "728ed52f",
			status: "pending",
			title: "",
			description: "",
		},
	];
}

export default async function Page() {
	const data = await getData();
	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
