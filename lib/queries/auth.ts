import { createClient } from "@/lib/supabase/client";

type LoginParams = {
	email: string;
	password: string;
};

export async function login(params: LoginParams) {
	const supabase = createClient();
	const { error, data } = await supabase.auth.signInWithPassword(params);
	if (error) throw error;
	return data;
}

type SignUpParams = {
	email: string;
	password: string;
};

export async function signUp({ email, password }: SignUpParams) {
	const supabase = createClient();
	const { error, data } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
}
