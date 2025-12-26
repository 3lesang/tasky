"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
	LoginParams,
	ResetPasswordParams,
	SignUpParams,
	UpdatePasswordParams,
} from "./types";

export async function login(params: LoginParams) {
	const supabase = await createSupabaseServerClient();
	const { error, data } = await supabase.auth.signInWithPassword(params);
	if (error) throw error;
	return data;
}

export async function signUp({ email, password }: SignUpParams) {
	const supabase = await createSupabaseServerClient();
	const { error, data } = await supabase.auth.signUp({
		email,
		password,
	});
	if (error) throw error;
	return data;
}

export async function logout() {
	const supabase = await createSupabaseServerClient();
	await supabase.auth.signOut();
	redirect("/auth/login");
}

export async function resetPassword({ email }: ResetPasswordParams) {
	const supabase = await createSupabaseServerClient();
	const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/auth/update-password`,
	});
	if (error) throw error;
	return data;
}

export async function updatePassword({ password }: UpdatePasswordParams) {
	const supabase = await createSupabaseServerClient();
	const { error, data } = await supabase.auth.updateUser({ password });
	if (error) throw error;
	return data;
}
