"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { EditIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTask } from "../actions";
import { TASK_QUERY_KEY } from "../constants";

interface DataTableRowActionsProps<TData> {
	row: Row<TData>;
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const deleteMutation = useMutation({
		mutationFn: deleteTask,
		onSuccess: () => {
			toast.success("Delete task successfully!");
			queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="data-[state=open]:bg-muted size-8"
				>
					<MoreHorizontal />
					<span className="sr-only">Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<DropdownMenuItem
					onClick={() => {
						router.push(`/tasks/${row.getValue("id")}/update`);
					}}
				>
					<EditIcon />
					Edit
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						deleteMutation.mutateAsync(row.getValue("id"));
					}}
				>
					<Trash2Icon />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
