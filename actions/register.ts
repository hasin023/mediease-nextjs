"use server";

import { RegisterSchema } from "@/schemas";
import type * as z from "zod";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);
	if (!validatedFields.success) {
		return { Error: "Invalid fields" };
	}

	const { name, email, password, role, patientType, specialization } =
		validatedFields.data;
	const hashedPassword = bcrypt.hashSync(password, salt);
	const existingUser = await getUserByEmail(email);
	if (existingUser) {
		return { Error: "Email already exists" };
	}

	const newUser = await db.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
			role,
			patientType,
		},
		select: {
			id: true,
		},
	});

	if (role === "PATIENT") {
		const newPatient = await db.patient.create({
			data: {
				user: {
					connect: {
						id: newUser.id,
					},
				},
			},
			select: {
				id: true,
			},
		});

		switch (patientType) {
			case "STUDENT":
				await db.studentInfo.create({
					data: {
						patient: {
							connect: {
								id: newPatient.id,
							},
						},
					},
				});
				break;
			case "FACULTY":
				await db.facultyInfo.create({
					data: {
						patient: {
							connect: {
								id: newPatient.id,
							},
						},
					},
				});
				break;
			case "STAFF":
				await db.staffInfo.create({
					data: {
						patient: {
							connect: {
								id: newPatient.id,
							},
						},
					},
				});
				break;
			default:
				break;
		}
	} else if (role === "DOCTOR") {
		await db.doctor.create({
			data: {
				user: {
					connect: {
						id: newUser.id,
					},
				},
				specialization,
			},
		});
	}

	return { Success: "User registered" };
};
