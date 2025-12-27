"use client";

import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import type { TaskRow } from "../schemas";
import { DataTableRowActions } from "./data-table-row-actions";
import { StatusActions } from "./status-actions";

export const columns: ColumnDef<TaskRow>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className="translate-y-[2px]"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
				className="translate-y-[2px]"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "id",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="ID" />
		),
		cell: ({ row }) => <div>{row.getValue("id")}</div>,
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: "title",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => {
			return (
				<Link href={`/tasks/${row.getValue("id")}/update`}>
					<p className="truncate font-medium hover:underline">
						{row.getValue("title")}
					</p>
				</Link>
			);
		},
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: "description",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Description" />
		),
		cell: ({ row }) => {
			return (
				<p className="w-32 line-clamp-1 truncate font-medium">
					{row.getValue("description")}
				</p>
			);
		},
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: "status",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		cell: ({ row }) => <StatusActions row={row} />,
		enableSorting: false,
		enableHiding: true,
		enableColumnFilter: false,
	},
	{
		accessorKey: "created_at",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Created At" />
		),
		cell: ({ row }) => {
			return <p>{new Date(row.getValue("created_at")).toLocaleString()}</p>;
		},
		enableSorting: false,
		enableHiding: true,
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
];
