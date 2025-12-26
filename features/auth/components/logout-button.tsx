import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "../actions";

export function LogoutItem() {
	return (
		<form action={logout}>
			<DropdownMenuItem asChild>
				<button type="submit" className="w-full text-left">
					Log out
				</button>
			</DropdownMenuItem>
		</form>
	);
}
