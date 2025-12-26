import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "./lib/supabase/server";

export async function proxy(req: NextRequest) {
	const res = NextResponse.next();

	const supabase = await createSupabaseServerClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return NextResponse.redirect(new URL("/auth/login", req.url));
	}

	return res;
}

export const config = {
	matcher: ["/tasks/:path*"],
};
