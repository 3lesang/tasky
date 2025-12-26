import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle className="text-2xl">Reset Your Password</CardTitle>
						<CardDescription>
							Type in your email and we&apos;ll send you a link to reset your
							password
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ForgotPasswordForm />
					</CardContent>
					<CardFooter>
						<div className="mt-4 text-center text-sm">
							Already have an account?
							<Link href="/auth/login" className="underline underline-offset-4">
								Login
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
