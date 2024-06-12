"use server";

import { db } from "@/lib/db";
import { DoctorAvailabilitySchema } from "@/schemas";
import * as z from "zod";

export const addAvailability = async (
	values: z.infer<typeof DoctorAvailabilitySchema>,
) => {
	const validatedFields = DoctorAvailabilitySchema.safeParse(values);

	if (!validatedFields.success) {
		return { Error: "Invalid fields" };
	}

	const { doctorId, weekday, startTime, endTime } = validatedFields.data;

	await db.doctorAvailability.create({
		data: {
			doctorId,
			weekday,
			startTime,
			endTime,
		},
	});

	return { Success: "Availability successfully added" };
};
