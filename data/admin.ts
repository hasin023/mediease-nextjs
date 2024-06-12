import { db } from "@/lib/db";

export const getTotalPatients = async () => {
	try {
		const patientsCount = await db.patient.count();
		return patientsCount;
	} catch {
		return null;
	}
};

export const getTotalAppointments = async () => {
	try {
		const appointmentsCount = await db.appointment.count();
		return appointmentsCount;
	} catch {
		return null;
	}
};

export const getTotalDoctors = async () => {
	try {
		const doctorsCount = await db.doctor.count();
		return doctorsCount;
	} catch {
		return null;
	}
};

export const getTotalReimbursementRequests = async () => {
	try {
		const reimbursementRequestsCount = await db.reimbursementRequest.count();
		return reimbursementRequestsCount;
	} catch {
		return null;
	}
};
