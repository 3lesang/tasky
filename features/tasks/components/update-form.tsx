"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { createSupabaseClient } from "@/lib/supabase/client";
import { updateTask } from "../actions";
import { TASK_QUERY_KEY } from "../constants";
import { statuses } from "../data";
import { getTask } from "../queries";
import { createTaskSchema, type TaskStatus } from "../schemas";

export function UpdateForm() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { id } = useParams();

	const supabase = createSupabaseClient();

	const getTaskQuery = useQuery({
		queryKey: [TASK_QUERY_KEY, id],
		queryFn: () => getTask(supabase, id as string),
	});

	const updateMutation = useMutation({
		mutationFn: updateTask,
		onSuccess: () => {
			toast.success("Update task successfully");
			queryClient.invalidateQueries({ queryKey: [TASK_QUERY_KEY] });
			router.push("/tasks");
		},
		onError: (err) => {
			toast.error(err.message);
		},
	});

	const form = useForm({
		defaultValues: {
			title: getTaskQuery.data?.title ?? "",
			description: getTaskQuery.data?.description ?? "",
			status: getTaskQuery.data?.status as TaskStatus,
		},
		validators: {
			onSubmit: createTaskSchema,
		},
		onSubmit: ({ value }) =>
			updateMutation.mutateAsync({ taskID: id as string, params: value }),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<form.Field name="title">
				{(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>Title</FieldLabel>
							<Input
								type="text"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Title"
								aria-invalid={isInvalid}
							/>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			</form.Field>
			<form.Field name="description">
				{(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>Description</FieldLabel>
							<Textarea
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="Type your description here."
								aria-invalid={isInvalid}
								className="resize-none"
							/>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			</form.Field>
			<form.Field name="status">
				{(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>Status</FieldLabel>
							<Select
								name={field.name}
								value={field.state.value}
								onValueChange={(value: TaskStatus) => field.handleChange(value)}
							>
								<SelectTrigger
									id="form-tanstack-select-language"
									aria-invalid={isInvalid}
									className="min-w-[120px]"
								>
									<SelectValue placeholder="Select" />
								</SelectTrigger>
								<SelectContent position="item-aligned">
									{statuses.map((status) => (
										<SelectItem key={status.value} value={status.value}>
											{status.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			</form.Field>
			<div className="text-right">
				<Button
					type="submit"
					size="sm"
					className="cursor-pointer"
					disabled={updateMutation.isPending}
				>
					{updateMutation.isPending && <Spinner />}
					Save
				</Button>
			</div>
		</form>
	);
}
