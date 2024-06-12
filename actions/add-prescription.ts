"use server";

import { getPrescriptionByAppointmentId } from "@/data/prescription";
import { db } from "@/lib/db";
import { PrescriptionSchema } from "@/schemas";
import type * as z from "zod";

export const addPrescription = async (
	values: z.infer<typeof PrescriptionSchema>,
) => {
	const validatedFields = PrescriptionSchema.safeParse(values);

	if (!validatedFields.success) {
		return { Error: "Invalid fields" };
	}

	const {
		appointmentId,
		diagnosis,
		treatment,
		notes,
		prescribedMedicines,
		prescribedTests,
	} = validatedFields.data;

	const existingPrescription =
		await getPrescriptionByAppointmentId(appointmentId);

	if (existingPrescription) {
		return { Error: "A prescription for this appointment already exists" };
	}

	await db.prescription.create({
		data: {
			appointmentId,
			diagnosis,
			treatment,
			notes,
			prescribedMedicines: {
				create: prescribedMedicines,
			},
			prescribedTests: {
				create: prescribedTests,
			},
		},
	});

	// Update appointment status
	await db.appointment.update({
		where: { id: appointmentId },
		data: { status: "PRESCRIBED" },
	});

	return { Success: "Successfully prescribed" };
};
