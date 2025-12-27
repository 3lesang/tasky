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

export async function signUp(params: SignUpParams) {
	const supabase = await createSupabaseServerClient();
	const { error, data } = await supabase.auth.signUp({
		email: params.email,
		password: params.password,
	});
	if (error) throw error;
	return data;
}

export async function resetPassword({ email }: ResetPasswordParams) {
	const supabase = await createSupabaseServerClient();
	const { error, data } = await supabase.auth.resetPasswordForEmail(email);
	if (error) throw error;
	return data;
}

export async function updatePassword(params: UpdatePasswordParams) {
	const supabase = await createSupabaseServerClient();
	const { error, data } = await supabase.auth.updateUser(params);
	if (error) throw error;
	return data;
}

export async function logout() {
	const supabase = await createSupabaseServerClient();
	await supabase.auth.signOut();
	redirect("/auth/login");
}
