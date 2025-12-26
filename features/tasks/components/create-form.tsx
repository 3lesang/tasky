"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { createTask } from "../actions";
import { createTaskSchema } from "../schemas";

export function CreateForm() {
	const createMutation = useMutation({
		mutationFn: createTask,
		onSuccess: () => {
			toast.success("");
		},
	});

	const form = useForm({
		defaultValues: {
			title: "",
			description: "",
		},
		validators: {
			onSubmit: createTaskSchema,
		},
		onSubmit: ({ value }) => createMutation.mutateAsync(value),
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
			<div className="text-right">
				<Button
					type="submit"
					size="sm"
					disabled={createMutation.isPending}
				>
					{createMutation.isPending && <Spinner />}
					Save
				</Button>
			</div>
		</form>
	);
}
