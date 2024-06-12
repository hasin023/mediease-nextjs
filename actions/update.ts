"use server";

import { RegisterSchema } from "@/schemas";
import type * as z from "zod";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

export const update = async (
	id: string,
	values: z.infer<typeof RegisterSchema>,
) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { Error: "Invalid fields" };
	}

	const { name, email, password, role, patientType } = validatedFields.data;
	const hashedPassword = bcrypt.hashSync(password, salt);

	try {
		const existingUser = await getUserById(id);

		if (!existingUser) {
			return { Error: "User not found" };
		}

		await db.user.update({
			where: { id },
			data: {
				name,
				email,
				password: hashedPassword,
				role,
				patientType,
			},
		});

		return { Success: "User updated successfully" };
	} catch (error) {
		console.error("Error updating user:", error);
		return { Error: "Failed to update user" };
	}
};
