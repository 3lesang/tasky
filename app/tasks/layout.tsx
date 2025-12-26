import { UserNav } from "@/features/auth/components/user-nav";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="p-8 space-y-8">
			<div className="flex items-center justify-between gap-2">
				<div>
					<h2 className="text-2xl font-semibold tracking-tight">
						Welcome to Tasky!
					</h2>
					<p className="text-muted-foreground">Tasks management</p>
				</div>
				<UserNav />
			</div>
			{children}
		</div>
	);
}
