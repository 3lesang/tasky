"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Row } from "@tanstack/react-table";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bulkUpdateTaskStatus } from "../actions";
import { TASK_QUERY_KEY } from "../constants";
import { statuses } from "../data";
import type { TaskStatus } from "../schemas";

interface StatusActionsProps<TData> {
	row: Row<TData>;
}

export function StatusActions<TData>({ row }: StatusActionsProps<TData>) {
	const queryClient = useQueryClient();
	const id = row.getValue("id");

	const updateMutation = useMutation({
		mutationFn: (value: TaskStatus) =>
			bulkUpdateTaskStatus([id as string], value),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});
	const status = statuses.find(
		(status) => status.value === row.getValue("status"),
	);

	if (!status) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Badge variant="secondary" className="cursor-pointer">
					{status.icon && (
						<status.icon className="text-muted-foreground size-4" />
					)}
					<span>{status.label}</span>
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{statuses.map((status) => (
					<DropdownMenuItem
						key={status.label}
						onClick={() => {
							updateMutation.mutateAsync(status.value as TaskStatus);
						}}
					>
						{status.icon && (
							<status.icon className="text-muted-foreground size-4" />
						)}
						{status.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
