export type LoginParams = {
	email: string;
	password: string;
};

export type SignUpParams = {
	email: string;
	password: string;
	options: {
		emailRedirectTo: string;
	};
};

export type ResetPasswordParams = {
	email: string;
};

export type UpdatePasswordParams = {
	password: string;
};
