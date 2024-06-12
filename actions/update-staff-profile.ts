"use server";

import { StaffPatientSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";

export const updateStaffProfile = async (
	patientId: string,
	values: z.infer<typeof StaffPatientSchema>,
) => {
	const validatedFields = StaffPatientSchema.safeParse(values);

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
				staffInfo: true,
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

		if (existingPatient.staffInfo) {
			const staffInfoUpdateData: any = {};
			if (department !== undefined) staffInfoUpdateData.department = department;
			if (position !== undefined) staffInfoUpdateData.position = position;
			if (hireDate !== undefined) staffInfoUpdateData.hireDate = hireDate;

			const updatedStaffInfo = await db.staffInfo.update({
				where: {
					patientId: existingPatient.id,
				},
				data: staffInfoUpdateData,
			});
		}

		return { Success: "Profile updated successfully" };
	} catch (error) {
		console.error("Error updating user:", error);
		return { Error: "Failed to update profile" };
	}
};
