import type { ColumnFiltersState } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function serializeFilters(filters: ColumnFiltersState) {
  return filters
    .map((f) => {
      const value = Array.isArray(f.value) ? f.value.join(",") : f.value;
      return `${f.id}:${value}`;
    })
    .sort()
    .join("|");
}
