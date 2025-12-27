import { CheckCircleIcon, CircleIcon, TimerIcon } from "lucide-react";

export const statuses = [
	{
		value: "todo",
		label: "Todo",
		icon: CircleIcon,
	},
	{
		value: "in-progress",
		label: "In Progress",
		icon: TimerIcon,
	},
	{
		value: "done",
		label: "Done",
		icon: CheckCircleIcon,
	},
];
