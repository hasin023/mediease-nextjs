"use server";

import { StudentPatientSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const updateStudentProfile = async (
	patientId: string,
	values: z.infer<typeof StudentPatientSchema>,
) => {
	const validatedFields = StudentPatientSchema.safeParse(values);

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
		currentSemester,
		program,
		originCountry,
	} = validatedFields.data;

	try {
		const existingPatient = await db.patient.findUnique({
			where: {
				id: patientId,
			},
			include: {
				studentInfo: true,
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

		if (existingPatient.studentInfo) {
			const studentInfoUpdateData: any = {};
			if (currentSemester !== undefined)
				studentInfoUpdateData.currentSemester = currentSemester;
			if (department !== undefined)
				studentInfoUpdateData.department = department;
			if (program !== undefined) studentInfoUpdateData.program = program;
			if (originCountry !== undefined)
				studentInfoUpdateData.originCountry = originCountry;

			const updatedStudentInfo = await db.studentInfo.update({
				where: {
					patientId: existingPatient.id,
				},
				data: studentInfoUpdateData,
			});
		}

		return { Success: "Profile updated successfully" };
	} catch (error) {
		console.error("Error updating user:", error);
		return { Error: "Failed to update profile" };
	}
};
