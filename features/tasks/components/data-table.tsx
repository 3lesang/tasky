"use client";

import { useQuery } from "@tanstack/react-query";
import {
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "@/features/tasks/components/data-table-toolbar";
import { createSupabaseClient } from "@/lib/supabase/client";
import { serializeFilters } from "@/lib/utils";
import { TASK_QUERY_KEY } from "../constants";
import { getTasks } from "../queries";
import { columns } from "./columns";

export function DataTable() {
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, 300);

	const supabase = createSupabaseClient();
	const filterKey = serializeFilters(columnFilters);

	const { data } = useQuery({
		queryKey: [
			TASK_QUERY_KEY,
			pagination.pageIndex,
			pagination.pageSize,
			filterKey,
			search
		],
		queryFn: () =>
			getTasks(supabase, {
				page: pagination.pageIndex,
				pageSize: pagination.pageSize,
				filters: columnFilters,
				search: debouncedSearch,
			}),
	});

	const table = useReactTable({
		data: data?.data ?? [],
		columns,
		rowCount: Number(data?.total),
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination,
		},
		enableRowSelection: true,
		manualPagination: true,
		manualFiltering: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});

	return (
		<div className="space-y-4">
			<div className="flex gap-2">
				<Input
					placeholder="Search tasks..."
					className="h-8 w-[150px] lg:w-[250px]"
					onChange={(e) => setSearch(e.currentTarget.value)}
				/>
				<div className="flex-1">
					<DataTableToolbar table={table} />
				</div>
			</div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<DataTablePagination table={table} />
		</div>
	);
}
