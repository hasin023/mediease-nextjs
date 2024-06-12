"use server";

import { db } from "@/lib/db";

export const CancelAppointment = async (appointmentId: any) => {
	try {
		await db.appointment.update({
			where: { id: appointmentId },
			data: {
				status: "CANCELLED",
			},
		});

		return { success: true };
	} catch (error) {
		return { success: false, error: "Failed to reject request" };
	}
};
