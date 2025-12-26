import { BackButton } from "@/components/back-button";
import { CreateForm } from "@/features/tasks/components/create-form";

export default function Page() {
	return (
		<div className="space-y-4 max-w-3xl mx-auto">
			<div className="flex gap-2">
				<BackButton />
				<h3 className="font-bold text-2xl">Create Task</h3>
			</div>
			<CreateForm />
		</div>
	);
}
