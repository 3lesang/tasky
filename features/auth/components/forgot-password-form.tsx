"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { resetPassword } from "../actions";

export function ForgotPasswordForm() {
	const router = useRouter();

	const resetPasswordMutation = useMutation({
		mutationFn: resetPassword,
		onSuccess: () => {
			router.push("/auth/forgot-password-success");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const form = useForm({
		defaultValues: {
			email: "",
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<form.Field name="email">
				{(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid;
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>Email</FieldLabel>
							<Input
								id={field.name}
								type="email"
								placeholder="m@example.com"
								required
								value={field.state.value}
								onBlur={field.handleBlur}
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
				className="w-full"
				disabled={resetPasswordMutation.isPending}
			>
				{resetPasswordMutation.isPending && <Spinner />}
				{resetPasswordMutation.isPending ? "Sending..." : "Send reset email"}
			</Button>
		</form>
	);
}
