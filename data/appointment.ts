import { db } from "@/lib/db";

export const getAllAppointments = async () => {
	try {
		const appointments = await db.appointment.findMany({
			include: {
				doctor: true,
				patient: true,
				Prescription: true,
				ReimbursementRequest: true,
			},
		});

		return appointments;
	} catch {
		return null;
	}
};

export const getPatientSpecificAppointments = async (patientId: any) => {
	try {
		const appointments = await db.appointment.findMany({
			where: {
				patientId,
			},
			include: {
				doctor: true,
				patient: true,
				Prescription: true,
				ReimbursementRequest: true,
			},
		});

		return appointments;
	} catch {
		return null;
	}
};

export const getDoctorSpecificAppointments = async (doctorId: any) => {
	try {
		const appointments = await db.appointment.findMany({
			where: {
				doctorId,
			},
			include: {
				doctor: true,
				patient: true,
				Prescription: true,
				ReimbursementRequest: true,
			},
		});

		return appointments;
	} catch {
		return null;
	}
};

export const getPendingAppointments = async () => {
	try {
		const appointments = await db.appointment.findMany({
			where: {
				status: "PENDING",
			},
			include: {
				doctor: true,
				patient: true,
				Prescription: true,
				ReimbursementRequest: true,
			},
		});

		return appointments;
	} catch {
		return null;
	}
};

export const getAppointmentById = async (id: string) => {
	try {
		const appointment = await db.appointment.findUnique({
			where: {
				id,
			},
			include: {
				doctor: true,
				patient: true,
				Prescription: true,
				ReimbursementRequest: true,
			},
		});

		return appointment;
	} catch {
		return null;
	}
};

export const getAppointmentByTime = async (time: any) => {
	try {
		const appointment = await db.appointment.findFirst({
			where: {
				time,
				status: "PENDING",
			},
		});

		return appointment;
	} catch {
		return null;
	}
};

export const getAppointmentsByDoctorId = async (doctorId: string) => {
	try {
		const appointments = await db.appointment.findMany({
			where: {
				doctorId,
			},
			include: {
				patient: true,
				Prescription: true,
			},
		});

		return appointments;
	} catch {
		return null;
	}
};

export const getAppointmentsByPatientId = async (patientId: string) => {
	try {
		const appointments = await db.appointment.findMany({
			where: {
				patientId,
			},
			include: {
				doctor: true,
				Prescription: true,
				ReimbursementRequest: true,
			},
		});

		return appointments;
	} catch {
		return null;
	}
};
