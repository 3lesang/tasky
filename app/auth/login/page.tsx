import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm />
					</CardContent>
					<CardFooter>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?
							<Link
								href="/auth/sign-up"
								className="underline underline-offset-4"
							>
								Sign up
							</Link>
						</div>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
