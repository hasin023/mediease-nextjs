import * as z from "zod";

export const ResetSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
});

export const LoginSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
	password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	email: z.string().email({ message: "Email is required" }),
	password: z.string().min(6, { message: "Minimum 6 characters required" }),
	role: z.enum(["PATIENT", "DOCTOR", "ADMIN", "null"]),
	patientType: z.enum(["STUDENT", "FACULTY", "STAFF", "null"]),
	specialization: z.string().optional().nullish(),
});

export const PatientSchema = z.object({
	dob: z.date().optional().nullish(),
	gender: z.enum(["Male", "Female", "NON-Binary"]).optional().nullish(),
	phone: z
		.string()
		.max(25, { message: "Phone number must be at most 25 characters" })
		.optional()
		.nullish(),
	bloodGroup: z
		.string()
		.max(10, { message: "Blood Group must be at most 10 characters" })
		.optional()
		.nullish(),
	address: z.string().optional().nullish(),
});

export const StudentInfoSchema = z.object({
	currentSemester: z.string().optional().nullish(),
	department: z
		.string()
		.max(50, { message: "Department must be at most 50 characters" })
		.optional()
		.nullish(),
	program: z
		.string()
		.max(50, { message: "Program must be at most 50 characters" })
		.optional()
		.nullish(),
	originCountry: z
		.string()
		.max(50, { message: "Origin Country must be at most 50 characters" })
		.optional()
		.nullish(),
});

export const FacultyInfoSchema = z.object({
	department: z
		.string()
		.max(50, { message: "Department must be at most 50 characters" })
		.optional()
		.nullish(),
	position: z
		.string()
		.max(50, { message: "Position must be at most 50 characters" })
		.optional()
		.nullish(),
	hireDate: z.date().optional().nullish(),
});

export const StaffInfoSchema = z.object({
	department: z
		.string()
		.max(50, { message: "Department must be at most 50 characters" })
		.optional()
		.nullish(),
	position: z
		.string()
		.max(50, { message: "Position must be at most 50 characters" })
		.optional()
		.nullish(),
	hireDate: z.date().optional().nullish(),
});

export const StudentPatientSchema = PatientSchema.merge(StudentInfoSchema);
export const FacultyPatientSchema = PatientSchema.merge(FacultyInfoSchema);
export const StaffPatientSchema = PatientSchema.merge(StaffInfoSchema);

export const AppointmentSchema = z.object({
	doctorId: z.string().min(1, { message: "Doctor is required" }),
	patientId: z.string().min(1, { message: "Patient is required" }),
	time: z.date().refine((value) => value.getTime() > Date.now(), {
		message: "Appointment time cannot be in the past",
	}),
	weekday: z.string().min(1, { message: "Weekday is required" }),
	reason: z.string().optional().nullish(),
});

export const MedicineSchema = z.object({
	medicineName: z.string().min(1, { message: "Medicine name is required" }),
	manufacturer: z.string().min(1, { message: "Manufacturer is required" }),
	description: z.string().min(1, { message: "Description is required" }),
});

export const TestSchema = z.object({
	testName: z.string().min(1, { message: "Test name is required" }),
	details: z.string().min(1, { message: "Destails is required" }),
});

export const PrescribedMedicineSchema = z.object({
	medicineId: z.string().min(1, { message: "Medicine is required" }),
	doseAmount: z.string().min(1, { message: "Dose amount is required" }),
	frequencyPerDay: z
		.string()
		.min(1, { message: "Frequency per day is required" }),
	durationInDays: z
		.string()
		.min(1, { message: "Duration in days is required" }),
});

export const PrescribedTestSchema = z.object({
	testId: z.string().min(1, { message: "Test is required" }),
});

export const PrescriptionSchema = z.object({
	appointmentId: z.string().min(1, { message: "Appointment ID is required" }),
	diagnosis: z.string().min(1, { message: "Diagnosis is required" }),
	treatment: z.string().min(1, { message: "Treatment is required" }),
	notes: z.string().optional(),
	prescribedMedicines: z.array(PrescribedMedicineSchema),
	prescribedTests: z.array(PrescribedTestSchema),
});

export const DoctorAvailabilitySchema = z.object({
	doctorId: z.string().min(1, { message: "Doctor is required" }),
	weekday: z.string().min(1, { message: "Weekday is required" }),
	startTime: z.date(),
	endTime: z.date(),
});

export const reimbursementRequestSchema = z.object({
	patientId: z.string(),
	appointmentId: z.string(),
	amount: z.string(),
	billImgUrl: z.string(),
	referralImgUrl: z.string().nullable().optional(),
	prescriptionImgUrl: z.string().nullable().optional(),
	status: z.string().default("PENDING"),
	submittedAt: z.date().default(new Date()),
});
