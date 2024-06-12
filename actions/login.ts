"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import type * as z from "zod";

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

export const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { Error: "Invalid fields" };
	}

	const { email, password } = validatedFields.data;

	const existingUser = await getUserByEmail(email);
	if (!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
		return { Error: "Invalid credentials" };
	}

	const user = await signIn("credentials", {
		email,
		password,
		redirect: true,
		redirectTo: DEFAULT_LOGIN_REDIRECT,
	});

	if (!user) {
		return { Error: "Invalid credentials" };
	}

	return { Success: "Logged in" };
};
