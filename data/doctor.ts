import { db } from "@/lib/db";

export const getAllDoctors = async () => {
	try {
		const doctors = await db.doctor.findMany({
			include: {
				user: true,
				Appointment: true,
				DoctorAvailability: true,
			},
		});

		return doctors;
	} catch {
		return null;
	}
};

export const getDoctorByUserId = async (userId: any) => {
	try {
		const doctor = await db.doctor.findFirst({
			where: {
				userId,
			},
			include: {
				user: true,
				Appointment: true,
				DoctorAvailability: true,
			},
		});

		return doctor;
	} catch {
		return null;
	}
};

export const getDoctorNameById = async (doctorId: any) => {
	try {
		const doctor = await db.doctor.findFirst({
			where: {
				id: doctorId,
			},
			select: {
				user: {
					select: {
						name: true,
					},
				},
			},
		});

		return doctor?.user.name;
	} catch {
		return null;
	}
};

export const getDoctorById = async (doctorId: any) => {
	try {
		const doctor = await db.doctor.findFirst({
			where: {
				id: doctorId,
			},
			include: {
				user: true,
				Appointment: true,
				DoctorAvailability: true,
			},
		});

		return doctor;
	} catch {
		return null;
	}
};

export const getDoctorAvailabilityByDoctorId = async (doctorId: any) => {
	try {
		const doctorAvailability = await db.doctorAvailability.findMany({
			where: {
				doctorId,
			},
		});

		return doctorAvailability;
	} catch {
		return null;
	}
};
