import { createSeedClient } from "@snaplet/seed";

const user = {
	instance_id: "00000000-0000-0000-0000-000000000000",
	id: "9e984d07-be67-46f9-8d10-319b1e821afe",
	aud: "authenticated",
	role: "authenticated",
	email: "demo@gmail.com",
	encrypted_password:
		"$2a$10$ce8dnflHPYss1XT2A1CA7u1qTm7FJsmTWtmTzmyyYvi2ZRF/6InEa",
	email_confirmed_at: "2025-12-27 11:59:04.493914+00",
	invited_at: null,
	confirmation_token: "",
	confirmation_sent_at: null,
	recovery_token: "",
	recovery_sent_at: null,
	email_change_token_new: "",
	email_change: "",
	email_change_sent_at: null,
	last_sign_in_at: "2025-12-27 11:59:10.933824+00",
	raw_app_meta_data: {
		provider: "email",
		providers: ["email"],
	},
	raw_user_meta_data: {
		email_verified: true,
	},
	is_super_admin: null,
	created_at: "2025-12-27 11:59:04.488951+00",
	updated_at: "2025-12-27 11:59:10.937312+00",
	phone: null,
	phone_confirmed_at: null,
	phone_change: "",
	phone_change_token: "",
	phone_change_sent_at: null,
	confirmed_at: "2025-12-27 11:59:04.493914+00",
	email_change_token_current: "",
	email_change_confirm_status: 0,
	banned_until: null,
	reauthentication_token: "",
	reauthentication_sent_at: null,
	is_sso_user: false,
	deleted_at: null,
	is_anonymous: false,
};

async function main() {
	const seed = await createSeedClient({ dryRun: true });

	await seed.users([user]);
	await seed.tasks((x) =>
		x(100, {
			status: "todo",
			user_id: user.id,
		}),
	);

	process.exit();
}

main();
