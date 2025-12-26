import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Check Your Email</CardTitle>
						<CardDescription>Password reset instructions sent</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							If you registered using your email and password, you will receive
							a password reset email.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
