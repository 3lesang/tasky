"use client";

import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function BackButton() {
	const router = useRouter();

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			className="cursor-pointer"
			onClick={() => {
				router.back();
			}}
		>
			<ChevronLeftIcon />
		</Button>
	);
}
