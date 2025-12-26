import {
	CheckCircleIcon,
	CircleIcon,
	CircleOffIcon,
	TimerIcon,
} from "lucide-react";

export const labels = [
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "feature",
		label: "Feature",
	},
	{
		value: "documentation",
		label: "Documentation",
	},
];

export const statuses = [
	{
		value: "todo",
		label: "Todo",
		icon: CircleIcon,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: TimerIcon,
	},
	{
		value: "done",
		label: "Done",
		icon: CheckCircleIcon,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: CircleOffIcon,
	},
];
