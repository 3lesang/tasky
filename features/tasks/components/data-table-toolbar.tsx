"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Table } from "@tanstack/react-table";
import { CheckIcon, Trash2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DataTableViewOptions } from "@/components/data-table-view-options";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { bulkDeleteTask, bulkUpdateTaskStatus } from "../actions";
import { TASK_QUERY_KEY } from "../constants";
import { statuses } from "../data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
	table: Table<TData>;
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const isFiltered = table.getState().columnFilters.length > 0;

	const [open, setOpen] = useState(false);

	const selectedRowIds: string[] = table
		.getFilteredSelectedRowModel()
		.rows.map((row) => row.getValue("id"));

	const updateMutation = useMutation({
		mutationFn: (value: { taskIDs: string[] }) =>
			bulkUpdateTaskStatus(value.taskIDs, "done"),
		onSuccess: () => {
			table.resetRowSelection();
			queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const bulkDeleteMutation = useMutation({
		mutationFn: bulkDeleteTask,
		onSuccess: () => {
			table.resetRowSelection();
			queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
			setOpen(false);
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-1 items-center gap-2">
				{table.getColumn("status") && (
					<DataTableFacetedFilter
						column={table.getColumn("status")}
						title="Status"
						options={statuses}
					/>
				)}
				{isFiltered && (
					<Button
						variant="ghost"
						size="sm"
						onClick={() => table.resetColumnFilters()}
					>
						Reset
						<X />
					</Button>
				)}
				{selectedRowIds.length > 0 && (
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								onClick={() => table.resetColumnFilters()}
							>
								{selectedRowIds.length} Delete
								<Trash2Icon />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you absolutely sure?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will permanently remove
									your data from our servers.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button
									type="button"
									onClick={() => bulkDeleteMutation.mutateAsync(selectedRowIds)}
									disabled={bulkDeleteMutation.isPending}
								>
									{bulkDeleteMutation.isPending && <Spinner />}
									Delete
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				)}
				{selectedRowIds.length > 0 && (
					<Button
						variant="ghost"
						size="sm"
						onClick={() =>
							updateMutation.mutateAsync({ taskIDs: selectedRowIds })
						}
					>
						<CheckIcon />
						Mark done
					</Button>
				)}
			</div>
			<div className="flex items-center gap-2">
				<DataTableViewOptions table={table} />
				<Button
					size="sm"
					className="cursor-pointer"
					onClick={() => {
						router.push("/tasks/create");
					}}
				>
					Add Task
				</Button>
			</div>
		</div>
	);
}
