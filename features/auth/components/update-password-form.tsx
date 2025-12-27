"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { updatePassword } from "../actions";
import { updatePasswordSchema } from "../schemas";

export function UpdatePasswordForm() {
	const router = useRouter();

	const updatePasswordMutation = useMutation({
		mutationFn: updatePassword,
		onSuccess: () => {
			router.push("/");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const form = useForm({
		defaultValues: {
			password: "",
		},
		validators: {
			onSubmit: updatePasswordSchema,
		},
		onSubmit: ({ value }) => updatePasswordMutation.mutateAsync(value),
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<form.Field name="password">
				{(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>New password</FieldLabel>
							<Input
								id={field.name}
								type="password"
								placeholder="New password"
								required
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								aria-invalid={isInvalid}
							/>
							{isInvalid && <FieldError errors={field.state.meta.errors} />}
						</Field>
					);
				}}
			</form.Field>
			<Button
				type="submit"
				className="w-full cursor-pointer"
				disabled={updatePasswordMutation.isPending}
			>
				{updatePasswordMutation.isPending && <Spinner />}
				{updatePasswordMutation.isPending ? "Saving..." : "Save new password"}
			</Button>
		</form>
	);
}
