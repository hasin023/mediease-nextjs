import { auth } from "@/auth";
import AppointmentCard from "@/components/patient/appointment-card";
import FilterSection from "@/components/patient/filter-section";
import { getPatientSpecificAppointments } from "@/data/appointment";
import { getPatientByUserId } from "@/data/patient";

const MedicalRecords = async () => {
	const session = await auth();
	const patient = await getPatientByUserId(session?.user.id);
	const appointments = await getPatientSpecificAppointments(patient?.id);

	appointments?.sort((a, b) => {
		if (a.status === "PENDING" && b.status !== "PENDING") return -1;
		if (a.status !== "PENDING" && b.status === "PENDING") return 1;
		return 0;
	});

	return (
		<div className="flex flex-col py-8 px-24 gap-2">
			<div className="mb-4">
				<h4 className="text-2xl font-semibold text-navy-700 dark:text-white">
					Appointment Records
				</h4>
				<p className="text-base text-gray-600">
					View all your appointment records below &rarr;
				</p>
			</div>

			{appointments?.length === 0 && (
				<div className="flex items-center justify-center h-40">
					<p className="text-lg text-gray-500">No appointments found</p>
				</div>
			)}

			{appointments?.map((appointment) => (
				<AppointmentCard key={appointment.id} appointment={appointment} />
			))}
		</div>
	);
};

export default MedicalRecords;
