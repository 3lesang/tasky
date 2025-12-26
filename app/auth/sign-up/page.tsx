import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function Page() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle className="text-2xl">Sign up</CardTitle>
						<CardDescription>Create a new account</CardDescription>
					</CardHeader>
					<CardContent>
						<SignUpForm />
					</CardContent>
					<CardFooter>
						<div className="text-center text-sm">
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
