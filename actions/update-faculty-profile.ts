"use server";

import { FacultyPatientSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const updateFacultyProfile = async (
	patientId: string,
	values: z.infer<typeof FacultyPatientSchema>,
) => {
	const validatedFields = FacultyPatientSchema.safeParse(values);

	if (!validatedFields.success) {
		return { Error: "Invalid fields" };
	}

	const {
		dob,
		gender,
		phone,
		bloodGroup,
		address,
		department,
		position,
		hireDate,
	} = validatedFields.data;

	try {
		const existingPatient = await db.patient.findUnique({
			where: {
				id: patientId,
			},
			include: {
				facultyInfo: true,
			},
		});

		if (!existingPatient) {
			return { Error: "Patient not found" };
		}

		const patientUpdateData: any = {};
		if (dob !== undefined) patientUpdateData.dob = dob;
		if (gender !== undefined) patientUpdateData.gender = gender;
		if (phone !== undefined) patientUpdateData.phone = phone;
		if (bloodGroup !== undefined) patientUpdateData.bloodGroup = bloodGroup;
		if (address !== undefined) patientUpdateData.address = address;

		const updatedPatient = await db.patient.update({
			where: { id: existingPatient.id },
			data: patientUpdateData,
		});

		if (existingPatient.facultyInfo) {
			const facultyInfoUpdateData: any = {};
			if (department !== undefined)
				facultyInfoUpdateData.department = department;
			if (position !== undefined) facultyInfoUpdateData.position = position;
			if (hireDate !== undefined) facultyInfoUpdateData.hireDate = hireDate;

			const updatedFacultyInfo = await db.facultyInfo.update({
				where: {
					patientId: existingPatient.id,
				},
				data: facultyInfoUpdateData,
			});
		}

		return { Success: "Profile updated successfully" };
	} catch (error) {
		console.error("Error updating user:", error);
		return { Error: "Failed to update profile" };
	}
};
