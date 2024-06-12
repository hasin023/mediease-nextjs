import { db } from "@/lib/db";

export const getAllReimburstments = async () => {
	try {
		const reimburstments = await db.reimbursementRequest.findMany({
			include: {
				Appointment: true,
				Patient: true,
			},
		});

		return reimburstments;
	} catch {
		return null;
	}
};

export const getReimburstmentById = async (reimburstmentId: any) => {
	try {
		const reimburstment = await db.reimbursementRequest.findFirst({
			where: {
				id: reimburstmentId,
			},
			include: {
				Appointment: true,
				Patient: true,
			},
		});

		return reimburstment;
	} catch {
		return null;
	}
};

export const getReimburstmentByAppointmentId = async (appointmentId: any) => {
	try {
		const reimburstment = await db.reimbursementRequest.findFirst({
			where: {
				appointmentId: appointmentId,
			},
			include: {
				Appointment: true,
				Patient: true,
			},
		});

		return reimburstment;
	} catch {
		return null;
	}
};
