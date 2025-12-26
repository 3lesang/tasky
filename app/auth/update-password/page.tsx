import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { UpdatePasswordForm } from "@/features/auth/components/update-password-form";

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<div className="flex flex-col gap-6">
					<Card className="border-0 shadow-none">
						<CardHeader>
							<CardTitle className="text-2xl">Reset Your Password</CardTitle>
							<CardDescription>
								Please enter your new password below.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<UpdatePasswordForm />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
